<template>
  <div class="w-full column">
    <!-- search -->
    <div class="v_center flex-wrap gap-3">
      <div class="tab v_center text-sm rounded">
        <div class="pointer h-9 px-3 v_center transition-colors duration-300 ellipsis" @click="updateActive(0)" :class="{ active: active === 0 }">
          {{ t("overview_spec.day_compare") }}
        </div>
        <div class="pointer h-9 px-3 v_center transition-colors duration-300 ellipsis" @click="updateActive(1)" :class="{ active: active === 1 }">
          {{ t("overview_spec.hour_compare") }}
        </div>
      </div>
      <el-date-picker
        v-model="dayRange"
        :type="active === 0 ? 'daterange' : 'date'"
        format="YYYY-MM-DD"
        :clearable="false"
        class="transition-all duration-300"
        style="height: 36px"
        @change="search"
      />
      <!-- <ip-button type="primary" class="h-9 px-5" @click="search">{{ t("Search") }}</ip-button> -->
    </div>

    <!-- echart -->
    <div class="w-full column relative echart mt-6" v-loading="loading">
      <div v-show="active === 0" class="w-full h-full rounded-md relative">
        <div class="w-full h-full" id="echartDay" v-show="showDay"></div>
        <div class="null_data w-full h-full" v-show="!showDay">
          <el-empty description="No Data"></el-empty>
        </div>
      </div>

      <div v-show="active === 1" class="w-full h-full relative rounded-md">
        <div class="w-full h-full" id="echartTime" v-show="showTime"></div>
        <div class="null_data w-full h-full" v-show="!showTime">
          <el-empty description="No Data"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { platCustomerReport, platCustomerReportRealTime } from "@/api/layout"
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import IpButton from "@/components/button/button.vue"
import { addDays, format } from "date-fns"
import { useI18n } from "vue-i18n"
import settingStore from "../../../../store/setting"
import { watch } from "vue"
import { roundToDecimal } from "../../../../utils/tools"

const { en } = settingStore()
const { t } = useI18n()

// props
const proxyType = inject("proxyType", 0)

// tab
const active = ref(0) // 0:按天 1：按时
function updateActive(index) {
  active.value = index
  let temp = dayRange.value
  if (index === 0) {
    dayRange.value = oldDay ?? [addDays(new Date(), -7), addDays(new Date(), -1)]
    oldDay = temp
    !showDay.value && getDayLineData()
  } else {
    dayRange.value = oldDay ?? new Date()
    oldDay = temp
    !showTime.value && getRealTime()
  }
}

// 搜索
let oldDay
const dayRange = ref()
// const day = ref()
const loading = ref(false)
function search() {
  // oldDay = dayRange.value
  if (active.value === 0) {
    getDayLineData()
  } else {
    getRealTime()
  }
}

// 分时统计
const timeLineData = ref([])
const showTime = computed(() => {
  return timeLineData.value.length > 0
})
let timeEchart, timeResize
async function getRealTime(date = new Date()) {
  try {
    loading.value = true
    const day = format(dayRange.value, "yyyy-MM-dd")
    let { data } = await platCustomerReportRealTime({
      start_time: `${day} 00:00:00`,
      end_time: `${day} 23:59:59`,
      prd_type: proxyType.value,
    })
    timeLineData.value = data
    if (!timeLineData.value.length) return

    // data = data.sort((a, b) => {
    //   return new Date(day + " " + b.time).getTime() < new Date(day + " " + a.time).getTime() ? 1 : -1
    // })
    setLine(
      () => {
        return data.map((item) => item.time)
      },
      () => {
        return data.map((item) => item.pack_size)
      }
    )
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}
async function setLine(xData, serData) {
  if (!timeEchart) {
    const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")
    timeEchart = echart.init(document.getElementById("echartTime"))
    timeResize = () => {
      timeEchart && timeEchart.resize()
    }
    window.addEventListener("resize", timeResize)
  } else {
    timeEchart.clear()
  }
  const option = {
    // title: {
    //   text: "单位 / (GB)",
    //   textAlign: "center",
    //   left: 40,
    //   textVerticalAlign: "top",
    //   textStyle: {
    //     color: "rgba(146,147,153,.5)",
    //     fontSize: 10,
    //     fontWeight: "normal",
    //     ontFamily: "Outfit, Noto Sans SC, sans-serif, serif",
    //   },
    // },
    grid: { left: "left", top: 20, right: 40, bottom: 10, containLabel: true },
    // dataZoom: [
    //   {
    //     show: true,
    //     start: 0,
    //     end: 100,
    //     bottom: 10,
    //     right: 8,
    //     left: 30,
    //     height: 20,
    //     borderColor: "transparent",
    //     showDetail: false,
    //     fillerColor: "rgba(39, 114, 240, .3)",
    //     backgroundColor: "rgba(39, 114, 240, 0.1)",
    //     handleStyle: {
    //       color: "rgba(39, 114, 240, 0.57)",
    //     },
    //     moveHandleSize: 0,
    //     moveHandleStyle: {
    //       opacity: 1,
    //     },
    //     dataBackground: {
    //       areaStyle: {
    //         color: "rgba(39, 114, 240, 1)",
    //       },
    //     },
    //   },
    //   {
    //     type: "inside",
    //     dataBackground: "#0ff",
    //     showDetail: false,
    //   },
    // ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#E6E7F1",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#E0E6F1",
        },
      },
      axisLabel: {
        margin: 8,
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
        fontSize: 12,
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

        const useage = value.toFixed(2) + "GB"

        const html = `
        <div class="grey-60 font-medium" style="font-family: Outfit, Noto Sans SC, sans-serif, serif">
          <span>${name}</span>
          <p>
            ${t("Traffic_Usage")}:
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
                color: "rgba(39, 114, 240, 0.8)", // 0% 处的颜色
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
  timeEchart.setOption(option)
}

// 分天 数据图
const dayLine = ref([])
const showDay = computed(() => {
  return dayLine.value.length > 0
})
let dayEchart, dayResize
async function getDayLineData() {
  try {
    loading.value = true
    let { data } = await platCustomerReport({
      start_time: format(dayRange.value[0], "yyyy-MM-dd"),
      end_time: format(dayRange.value[1], "yyyy-MM-dd"),
      prd_type: proxyType.value,
    })
    // data = data.sort((a, b) => {
    //   return new Date(b.date_short).getTime() < new Date(a.date_short).getTime() ? -1 : 1
    // })
    dayLine.value = data.map((item) => {
      return {
        date: item.date,
        flow: item.pack_size,
      }
    })
    nextTick(() => {
      setEchart(
        () => {
          return dayLine.value.map((item) => item.date)
        },
        () => {
          return dayLine.value.map((item) => item.flow)
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
    dayEchart = echart.init(document.getElementById("echartDay"))
    dayResize = () => {
      dayEchart && dayEchart.resize()
    }
    window.addEventListener("resize", dayResize)
  } else {
    dayEchart.clear()
  }

  const option = {
    grid: { left: "left", top: 20, right: 40, bottom: 10, containLabel: true },

    // dataZoom: [
    //   {
    //     show: true,
    //     start: 0,
    //     end: 100,
    //     bottom: 10,
    //     right: 8,
    //     left: 30,
    //     height: 20,
    //     borderColor: "transparent",
    //     showDetail: false,
    //     fillerColor: "rgba(39, 114, 240, .3)",
    //     backgroundColor: "rgba(39, 114, 240, 0.1)",
    //     handleStyle: {
    //       color: "rgba(39, 114, 240, 0.57)",
    //     },
    //     moveHandleSize: 0,
    //     moveHandleStyle: {
    //       opacity: 1,
    //     },
    //     dataBackground: {
    //       areaStyle: {
    //         color: "rgba(39, 114, 240, 1)",
    //       },
    //     },
    //   },
    //   {
    //     type: "inside",
    //     dataBackground: "#0ff",
    //     showDetail: false,
    //   },
    // ],
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
        margin: 8,
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

        const useage = value.toFixed(2) + "GB"

        const html = `
        <div class="grey-60 font-medium" style="font-family: Outfit, Noto Sans SC, sans-serif, serif">
          <span>${name}</span>
          <p>
            ${t("Traffic_Usage")}:
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
  // console.log(option, 'option')
  // this.loadingEchart.close()
}

// onMounted(() => {
//   updateActive(0)
// })

// v-show 不能使用mounted
const activeTab = inject("active")
watch(activeTab, (newVal) => {
  if (newVal === 1 && !dayEchart && !timeEchart) {
    updateActive(0)
  }
})

onBeforeUnmount(() => {
  timeEchart = null
  timeResize = null
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
