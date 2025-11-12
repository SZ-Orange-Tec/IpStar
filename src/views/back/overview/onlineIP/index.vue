<template>
  <div class="w-full space-y-6">
    <div class="w-full board relative p-5 space-y-3 rounded column">
      <div class="v_center flex-wrap gap-3">
        <div class="tab v_center text-sm rounded">
          <div
            class="pointer whitespace-nowrap h-9 px-5 v_center transition-colors duration-300"
            @click="updateActive(0)"
            :class="{ active: active === 0 }"
          >
            7 {{ $t("Day") }}
          </div>
          <div
            class="pointer whitespace-nowrap h-9 px-5 v_center transition-colors duration-300"
            @click="updateActive(1)"
            :class="{ active: active === 1 }"
          >
            30 {{ $t("Day") }}
          </div>
        </div>
        <el-date-picker
          v-model="dayRange"
          type="daterange"
          format="YYYY-MM-DD"
          :clearable="false"
          class="transition-all duration-300"
          style="height: 36px; width: 260px"
          @change="ipLineDraw"
        />
      </div>

      <div class="w-full column relative echart">
        <div class="w-full h-full relative" v-loading="drawing">
          <div id="ipEchart" class="w-full h-full" v-show="hasIpData"></div>
          <div class="w-full h-full null_data" v-show="!hasIpData">
            <el-empty description="No Data"></el-empty>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full rounded space-y-5 p-5 board">
      <div class="table_box w-full">
        <el-table :data="network">
          <el-table-column :label="t('overview_spec.Country_or_Region')" min-width="200">
            <template #default="scope">
              <span :class="['flag-icon', 'flag-icon-' + scope.row.code]"></span>
              <span style="margin-left: 10px">{{ lang === "zh" ? scope.row.country_cn : scope.row.country }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="t('overview_spec.Country_Code')" min-width="150">
            <template #default="scope">
              <p style="text-transform: uppercase">{{ scope.row.code }}</p>
            </template>
          </el-table-column>
          <el-table-column :label="t('overview_spec.Number_of_country_IPs')" prop="ips_count" min-width="200"></el-table-column>
          <el-table-column :label="t('overview_spec.Network_Status')" min-width="200">
            <template #default="scope">
              <tableProgress :percent="scope.row.avaiable" type="network"></tableProgress>
            </template>
          </el-table-column>
          <el-table-column :label="t('Load')" min-width="200">
            <template #default="scope">
              <tableProgress :percent="scope.row.used" type="load"></tableProgress>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <ip-button type="black" class="h-8 px-3 text-sm" :disabled="isNetwork" v-if="network.length < total" @click="viewMore">
        <div class="v_center space-x-2">
          <span class="ip-loading" v-if="isNetwork"></span>
          <span>{{ t("overview_spec.View_More") }}</span>
        </div>
      </ip-button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue"
import { IpDataList } from "@/api/layout"
import { addDays, format } from "date-fns"
import tableProgress from "../../components/progress/progress.vue"
import IpButton from "@/components/button/button.vue"
import { useI18n } from "vue-i18n"
import settingStore from "@/store/setting"
import { roundToDecimal } from "../../../../utils/tools"
import { CountryList } from "../../../../api/layout"

const { t } = useI18n()
const { lang } = settingStore()

// ip搜索
const dayRange = ref([addDays(new Date(), -6), new Date()])
const active = ref(0) // 0:按天 1：按时
async function updateActive(index) {
  active.value = index
  if (index === 0) {
    dayRange.value = [addDays(new Date(), -6), new Date()]
  } else {
    dayRange.value = [addDays(new Date(), -29), new Date()]
  }
  ipLineDraw()
}

// echart
const hasIpData = ref(false)
const drawing = ref(false)
let ipEchartResize, echart, iplist
async function setIpEchart(data) {
  const ip = data.reduce(
    (pre, next) => {
      pre.date.push(next.date)
      pre.count.push(next.count)
      return pre
    },
    { date: [], count: [] }
  )
  const ipdom = document.getElementById("ipEchart")
  if (!echart) {
    const { default: _ } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")
    echart = _.init(ipdom)

    ipEchartResize = () => {
      echart.resize()
    }
    window.addEventListener("resize", ipEchartResize)
  }

  const option = {
    grid: {
      top: 40,
      left: 60,
      bottom: 40,
      right: 40,
    },
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
        margin: 20,
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
      },
      data: ip.date,
    },
    yAxis: {
      // max: 4,
      axisLabel: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#B5B5B5",
        margin: 30,
        formatter(val) {
          if (val > 1000000) {
            return `${val / 1000000} M`
          } else if (val > 1000) {
            return `${val / 1000} K`
          } else {
            return val
          }
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
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100,
        bottom: 10,
        right: 30,
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
    series: [
      {
        type: "line",
        // showSymbol: false, // 开启移入显示 具体数值
        // showAllSymbol: true,
        // symbolSize: 10,
        // symbol: 'rect',
        symbolSize: 8, // 拐点大小
        symbol: "circle",
        itemStyle: {
          color: "#e5e7eb",
          // borderColor: '#fce5c1',
          // borderWidth: 5,
          shadowColor: "rgba(39, 114, 240, 0.5)",
          shadowBlur: 6,
          // shadowOffsetX: -3,
          // shadowOffsetY: -3
        },

        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(39, 114, 240, 0.5)", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(39, 114, 240, 0.2)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(39, 114, 240, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#666666",
            fontSize: 14,
          },
          formatter(res) {
            const val = res.value
            if (val > 1000000) {
              return `${roundToDecimal(val / 1000000)} M`
            } else if (val > 1000) {
              return `${roundToDecimal(val / 1000)} K`
            } else {
              return val
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
        data: ip.count,
      },
    ],
  }
  echart.setOption(option)
}
async function ipLineDraw() {
  try {
    drawing.value = true
    const start = format(dayRange.value[0], "yyyy-MM-dd")
    const end = format(dayRange.value[1], "yyyy-MM-dd")
    const { data } = await IpDataList({
      start_date: start,
      end_date: end,
    })

    iplist = data.toReversed()

    hasIpData.value = Boolean(data.length)
    if (!hasIpData.value) return

    nextTick(() => {
      setIpEchart(iplist).then(() => {
        drawing.value = false
      })
    })
  } catch (err) {
    console.log(err)
    drawing.value = false
  }
}

// 获取国家数据
const network = ref([])
const isNetwork = ref(false)
async function getCountryList() {
  try {
    isNetwork.value = true
    let arr = network.value
    const { data } = await CountryList({
      page_index: page.value,
      page_size: size.value,
    })
    total.value = data.count
    const list = data.list.map((item) => {
      item.code = item.code.toLowerCase()
      return item
    })
    arr = arr.concat(list)
    network.value = arr
  } catch (err) {
    console.log(err)
  } finally {
    isNetwork.value = false
  }
}
function viewMore() {
  if (isNetwork.value) return
  page.value++
  getCountryList()
}

// 分页
const total = ref(10)
const page = ref(1)
const size = ref(10)
function handleCurrentChange(val) {
  page.value = val
  getTableData()
}
function handleSizeChange(val) {
  size.value = val
  getTableData()
}

onMounted(() => {
  ipLineDraw()
  getCountryList()
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

.table_box {
  :deep(.el-table) {
    height: 100%;
    border: 1px solid #ebeef5;
    thead {
      .el-table__cell {
        background-color: #f2f3f5;
        .cell {
          color: hsl(var(--foreground));
        }
      }
    }

    // 去掉bottom横线
    .el-table__inner-wrapper::before {
      height: 0px;
    }
  }
}
</style>
