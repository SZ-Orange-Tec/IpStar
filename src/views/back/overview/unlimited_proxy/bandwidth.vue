<template>
  <div class="column">
    <div class="text-lg font-semibold mb-5">{{ t("Bandwidth_Usage") }}</div>
    <div class="">
      <div class="v_center flex-wrap gap-3">
        <div class="tab v_center text-sm rounded">
          <div
            class="pointer whitespace-nowrap h-9 px-5 v_center transition-colors duration-300"
            @click="updateActive(0)"
            :class="{ active: active === 0 }"
          >
            7 {{ t("Day") }}
          </div>
          <div
            class="pointer whitespace-nowrap h-9 px-5 v_center transition-colors duration-300"
            @click="updateActive(1)"
            :class="{ active: active === 1 }"
          >
            30 {{ t("Day") }}
          </div>
        </div>
        <el-date-picker
          v-model="dayRange"
          type="daterange"
          format="YYYY-MM-DD"
          :clearable="false"
          class="transition-all duration-300"
          style="height: 36px; width: 260px"
        />
        <ip-button type="primary" class="h-9 px-5 text-sm" @click="getDayLineData">{{ t("Search") }}</ip-button>
      </div>
    </div>

    <div class="w-full column relative echart mt-6">
      <div class="w-full h-full relative" v-loading="loading">
        <div class="w-full h-full" id="echartTime" v-show="show"></div>
        <div class="w-full h-full vh_center" v-show="!show">
          <el-empty description="No Data"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue"
import IpButton from "@/components/button/button.vue"
import { addDays, format } from "date-fns"
import { platCustomerReport } from "@/api/layout"
import { roundToDecimal } from "../../../../utils/tools"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

// tab
const active = ref(0) // 0:按天 1：按时
function updateActive(index) {
  active.value = index
  if (index === 0) {
    dayRange.value = [addDays(new Date(), -6), new Date()]
  } else {
    dayRange.value = [addDays(new Date(), -29), new Date()]
  }
}

// 折线图
const dayRange = ref()
const loading = ref(false)
const show = ref(false)
let dayEchart, dayResize
async function getDayLineData() {
  try {
    loading.value = true
    let { data } = await platCustomerReport({
      start_time: format(dayRange.value[0], "yyyy-MM-dd"),
      end_time: format(dayRange.value[1], "yyyy-MM-dd"),
      prd_type: 1,
    })
    data = data.sort((a, b) => {
      return b.date_short < a.date_short ? -1 : 1
    })
    data = data.map((item) => {
      const flow = item.pack_size * 1024 // mb
      const Day = 86400
      return {
        date: item.date_short,
        flow: roundToDecimal((flow / Day) * 8, 2),
      }
    })
    show.value = data.length > 0
    if (!show.value) return

    nextTick(() => {
      setEchart(
        () => {
          return data.map((item) => item.date)
        },
        () => {
          return data.map((item) => item.flow)
        }
      )
    })
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}
async function setEchart(xData, serData) {
  if (!dayEchart) {
    const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")
    dayEchart = echart.init(document.getElementById("echartTime"))
    dayResize = () => {
      dayEchart && dayEchart.resize()
    }
    window.addEventListener("resize", dayResize)
  } else {
    dayEchart.clear()
  }

  const option = {
    // title: {
    //   text: en.value ? "5-Day Comparison" : "5 天对比",
    //   textStyle: { color: "#999999", fontSize: 16, fontWeight: "normal" },
    //   padding: [20, 0, 0, 20],
    // },
    grid: { left: "left", top: 20, right: 40, bottom: 10, containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#B5B5B5",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#3B82F6",
        },
      },
      axisLabel: {
        margin: 16,
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#7F8188",
      },
      data: xData(),
    },
    yAxis: {
      type: "value",
      // max: 4,
      axisLabel: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#7F8188",
        margin: 12,
        formatter(val) {
          return val <= 1 ? val.toFixed(2) : val
        },
      },
      axisTick: {
        // y轴刻度线
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#E0E6F1",
          type: "solid", // 虚线
        },
      },
    },
    tooltip: {
      trigger: "axis",
      padding: 10,
      textStyle: { color: "7F8188" },
      renderMode: "html",
      appendTo: document.body,
      axisPointer: {
        lineStyle: {
          color: "#B9BEC9",
        },
      },
      formatter(params) {
        const { name, value } = params[0]

        const useage = value + " Mbps"

        const html = `
        <div class="grey-60 font-medium" style="font-family: Outfit, Noto Sans SC, sans-serif, serif">
          <span>${name}</span>
          <p>
            ${t("Bandwidth_Usage")}:
            <span class="black font-medium">${useage}</span>
          </p>
        </div>`

        return html
      },
    },
    series: [
      {
        type: "line",
        smooth: true,
        // showSymbol: false, // 开启移入显示 具体数值
        areaStyle: {
          // 覆盖区域的渐变色
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(39, 114, 240,0.7)", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(39, 114, 240, 0.5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(39, 114, 240, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        // showAllSymbol: true,
        // symbol: 'image://路径',
        // symbol: `image://${new URL("../../../assets/pc_img/overview_img/peak point.png", import.meta.url).href}`,
        symbolSize: 5,
        label: {
          show: false,
        },
        lineStyle: {
          color: "#3B82F6",
        },
        data: serData(),
      },
    ],
  }
  dayEchart.setOption(option)
}

onMounted(() => {
  updateActive(0)
  getDayLineData()
})

onBeforeUnmount(() => {
  dayEchart = null
  dayResize = null
})
</script>

<style lang="less" scoped>
.tab {
  border: 1px solid hsl(var(--border));

  .active {
    background-color: hsl(var(--foreground) / 3%);
    color: hsl(var(--primary));
  }
}

.echart {
  height: 300px;
}
</style>
