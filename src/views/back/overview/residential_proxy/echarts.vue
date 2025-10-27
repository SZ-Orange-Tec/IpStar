<template>
  <div>
    <!-- 流量消耗趋势 -->
    <div class="w-full column md:flex gap-5 items-stretch echart_table" :class="{ echart_table_layout: isDashboard }">
      <div class="echart column space-y-5 w-full md:flex-1">
        <div class="card flex-1 rounded-md board column space-y-2">
          <div class="label column" style="align-items: stretch">
            <!-- 文字 -->
            <div class="text v_center space-x-5" ref="textRef">
              <div @click="selectEchart(0)" class="pointer transition-colors" :class="{ active: echartIndex === 0 }">
                {{ $t("overview_spec.day_compare") }}
              </div>
              <div @click="selectEchart(1)" class="pointer transition-colors" :class="{ active: echartIndex === 1 }">
                {{ $t("overview_spec.hour_compare") }}
              </div>
            </div>
            <!-- 滑块 -->
            <div class="slider rounded-full relative">
              <div class="bar rounded-full absolute" :style="barStyle"></div>
            </div>
          </div>

          <div class="w-full flex-1 column relative">
            <div v-show="echartIndex === 0" class="outflow_echart flex-1 w-full rounded-md relative">
              <!-- 时间选择 -->
              <div class="w-full h-full" id="echartDay" v-show="dayLine.length > 0"></div>
              <div class="null_data" v-show="!dayLine.length > 0">
                <el-empty description="No Data"></el-empty>
              </div>
              <Picker class="echart_picker" @dateChange="dateChange" />
            </div>

            <div v-show="echartIndex === 1" class="day_echart flex-1 w-full relative rounded-md">
              <div class="w-full h-full" id="echartTime" v-show="!Nodata"></div>
              <div class="null_data" v-show="Nodata">
                <el-empty description="No Data"></el-empty>
              </div>
              <div class="v_center picker">
                <Calendar :size="16" />
                <el-date-picker
                  v-model="timeVal"
                  type="date"
                  prefix-icon="null"
                  @change="input"
                  format="YYYY-MM-DD"
                  :clearable="false"
                  placeholder="option date"
                  style="width: 110px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { platCustomerReport, platCustomerReportRealTime } from "@/api/layout"

// 分时统计
async function getRealTime(date = new Date()) {
  try {
    let { data } = await platCustomerReportRealTime({
      start_time: `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} 00:00:00`,
      end_time: `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} 23:59:59`,
    })
    if (!data.length) {
      this.Nodata = true
    } else {
      this.Nodata = false
    }
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
  }
}
async function setEchart(xData, serData) {
  const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

  const myEchart = echart.init(document.getElementById("echartDay"))
  const option = {
    title: {
      text: this.en ? "5-Day Comparison" : "5 天对比",
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
  myEchart.setOption(option)
  // console.log(option, 'option')
  // this.loadingEchart.close()
  this.dateEchartResize = () => {
    myEchart.resize()
  }
  window.addEventListener("resize", this.dateEchartResize)
}

// 分天 数据图
const dayLine = ref([])
async function getDayLineData() {
  try {
    let { data } = await platCustomerReport({
      start_time: `${starDate.year}-${addZero(starDate.month)}-${addZero(starDate.day)}`,
      end_time: `${endDate.year}-${addZero(endDate.month)}-${addZero(endDate.day)}`,
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
  } catch (error) {
    console.log(error.message)
  }
}
async function setLine(xData, serData) {
  const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

  const myEchart = echart.init(document.getElementById("echartTime"))
  const option = {
    title: {
      text: this.en ? "Real time traffic" : "实时流量",
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
  myEchart.setOption(option)
  // this.loadingLine.close()
  this.lineEchartResize = () => {
    myEchart.resize()
  }
  window.addEventListener("resize", this.lineEchartResize)
}
</script>

<style lang="less" scoped></style>
