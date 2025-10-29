<template>
  <div class="w-full column">
    <!-- search -->
    <div class="v_center space-x-3">
      <div class="tab v_center text-sm rounded">
        <div class="pointer h-9 px-3 v_center transition-colors duration-300" @click="updateActive(0)" :class="{ active: active === 0 }">
          {{ t("overview_spec.day_compare") }}
        </div>
        <div class="pointer h-9 px-3 v_center transition-colors duration-300" @click="updateActive(1)" :class="{ active: active === 1 }">
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
    <div class="w-full column relative echart" v-loading="loading">
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

const { en } = settingStore()
const { t } = useI18n()

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
    })
    timeLineData.value = data
    if (!timeLineData.value.length) return

    data = data.sort((a, b) => {
      return b.time < a.time ? 1 : -1
    })
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
    title: {
      text: en.value ? "Real time traffic" : "实时流量",
      textStyle: { color: "#999999", fontSize: 14, fontWeight: "normal" },
      padding: [20, 0, 0, 20],
    },
    grid: { left: 60, top: 60, bottom: 40, right: 60, containLabel: true },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100,
        bottom: 10,
        right: 8,
        left: 30,
        height: 20,
        borderColor: "transparent",
        showDetail: false,
        fillerColor: "rgba(39, 114, 240, .3)",
        backgroundColor: "rgba(39, 114, 240, 0.1)",
        handleStyle: {
          color: "rgba(39, 114, 240, 0.57)",
        },
        moveHandleSize: 0,
        moveHandleStyle: {
          opacity: 1,
        },
        dataBackground: {
          areaStyle: {
            color: "rgba(39, 114, 240, 1)",
          },
        },
      },
      {
        type: "inside",
        dataBackground: "#0ff",
        showDetail: false,
      },
    ],
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#B5B5B5",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
      },
      data: xData(),
    },
    yAxis: {
      // max: 4,
      axisLabel: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
        margin: 30,
        formatter(val) {
          return `${val}MB`
        },
      },
      axisTick: {
        // y轴刻度线
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#B5B5B5",
          type: "dashed", // 虚线
        },
      },
    },
    tooltip: {
      trigger: "axis",
      padding: [12, 17, 20, 23],
      textStyle: { color: "#424242" },
      renderMode: "html",
      className: "tooltip",
      axisPointer: {
        lineStyle: {
          // type: 'solid',
          // width: 3,
          color: "rgba(39, 114, 240,1)",
        },
      },
      formatter() {
        return null
      },
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false, // 开启移入显示 具体数值
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
                color: "rgba(39, 114, 240, 0)", // 0% 处的颜色
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
        showAllSymbol: true,
        // symbol: 'image://路径',
        symbol: `image://${new URL("../../../assets/pc_img/overview_img/peak point.png", import.meta.url).href}`,
        symbolSize: 20,
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#191D26",
            fontSize: 14,
          },
          formatter: function (res) {
            if (res.value) {
              return res.value + "MB"
            } else {
              return 0
            }
          },
        },
        // 关闭 提示框
        // tooltip: {
        //   show: false
        // },
        lineStyle: {
          color: "rgba(39, 114, 240,1)",
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
    })
    data = data.sort((a, b) => {
      return b.date_short < a.date_short ? -1 : 1
    })
    dayLine.value = data.map((item) => {
      return {
        date: item.date_short,
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
    title: {
      text: en.value ? "5-Day Comparison" : "5 天对比",
      textStyle: { color: "#999999", fontSize: 16, fontWeight: "normal" },
      padding: [20, 0, 0, 20],
    },
    grid: { left: 40, top: 60, bottom: 40, right: 60, containLabel: true },

    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100,
        bottom: 10,
        right: 8,
        left: 30,
        height: 20,
        borderColor: "transparent",
        showDetail: false,
        fillerColor: "rgba(39, 114, 240, .3)",
        backgroundColor: "rgba(39, 114, 240, 0.1)",
        handleStyle: {
          color: "rgba(39, 114, 240, 0.57)",
        },
        moveHandleSize: 0,
        moveHandleStyle: {
          opacity: 1,
        },
        dataBackground: {
          areaStyle: {
            color: "rgba(39, 114, 240, 1)",
          },
        },
      },
      {
        type: "inside",
        dataBackground: "#0ff",
        showDetail: false,
      },
    ],
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#B5B5B5",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
      },
      data: xData(),
    },
    yAxis: {
      // max: 4,
      axisLabel: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
        margin: 30,
        formatter(val) {
          return `${val}GB`
        },
      },
      axisTick: {
        // y轴刻度线
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#B5B5B5",
          type: "dashed", // 虚线
        },
      },
    },
    tooltip: {
      trigger: "axis",
      padding: [12, 17, 20, 23],
      textStyle: { color: "#424242" },
      renderMode: "html",
      className: "tooltip",
      axisPointer: {
        lineStyle: {
          color: "rgba(39, 114, 240, 1)",
        },
      },
      formatter() {
        return null
      },
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false, // 开启移入显示 具体数值
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
        showAllSymbol: true,
        // symbol: 'image://路径',
        // symbol: `image://${new URL("../../../assets/pc_img/overview_img/peak point.png", import.meta.url).href}`,
        symbolSize: 10,
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#191D26",
            fontSize: 14,
          },
          formatter: function (res) {
            if (res.value) {
              return res.value + "GB"
            } else {
              return 0
            }
          },
        },
        // 关闭 提示框
        // tooltip: {
        //   show: false
        // },
        lineStyle: {
          color: "rgba(39, 114, 240, 1)",
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
  height: 400px;
}
</style>
