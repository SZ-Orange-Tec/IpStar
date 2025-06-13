<template>
  <div class="pc-overview column">
    <!-- 我的订阅 -->
    <div class="subscribe" v-show="activeIndex === 0">
      <!-- left_echarts -->
      <div class="echarts_left column space-y-5">
        <div class="flow">
          <!-- 现有流量 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("overview_spec.Residual_Traffic") }}</h2>
              <img src="../../../assets/pc_img/layout_img/residual flow.png" width="70" height="70" />
            </div>
            <div class="box_bottom v_center">
              <div class="number">
                <div v-if="unlimited">
                  <span>{{ $t("Unlimited") }}</span>
                </div>
                <NumberCounter v-else :value="quantityOfFlow.remain.num" :unit="quantityOfFlow.remain.unit" />
              </div>
            </div>
          </div>
          <!-- 今日消耗 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("overview_spec.Consumption_Today") }}</h2>
              <img src="../../../assets/pc_img/layout_img/consumption today.png" width="70" height="70" />
            </div>
            <div class="box_bottom v_center">
              <p class="number">
                <NumberCounter :value="quantityOfFlow.consume.num" :unit="quantityOfFlow.consume.unit" />
              </p>
              <div class="btn v_center pointer" @click="updateActiveIndex(2)">
                {{ $t("Details") }}
              </div>
            </div>
          </div>
          <!-- 当前在线 IP 总数 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("overview_spec.Total_IPs_Available") }}</h2>
            </div>
            <div class="box_bottom v_center">
              <p class="number">
                <NumberCounter :value="quantityOfFlow.remain.count" :unit="quantityOfFlow.consume.count" />
              </p>
              <div class="btn v_center pointer" @click="updateActiveIndex(1)">
                {{ $t("Details") }}
              </div>
            </div>
          </div>
        </div>

        <div class="outflow_echart flex-1 w-full">
          <!-- 时间选择 -->
          <div class="myEchart" v-show="tableData.length > 0"></div>
          <div class="null_data" v-show="!tableData.length > 0">
            <el-empty description="No Data"></el-empty>
          </div>
          <Picker class="echart_picker" @dateChange="dateChange" />
        </div>

        <!-- 实时流出 echarts-->
        <div class="day_echart flex-1 w-full">
          <div class="line_echart" v-show="!Nodata"></div>
          <div class="null_data" v-show="Nodata">
            <el-empty description="No Data"></el-empty>
          </div>
          <el-date-picker
            v-model="timeVal"
            type="date"
            prefix-icon="null"
            class="picker"
            @change="input"
            format="DD.MM.YYYY"
            :clearable="false"
            placeholder="option date"
          >
          </el-date-picker>
          <img src="../../../assets/pc_img/layout_img/calendar.png" alt="calendar" />
        </div>
      </div>

      <div class="right column">
        <div class="notice" v-if="noticeText">
          <h2>{{ $t("overview_spec.Notifications") }}</h2>
          <div class="notice_box">
            <div ref="noticeTextRef" :class="{ scroll: isNoticeScroll }">
              <p>{{ noticeText }}</p>
            </div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="date_flow">
          <!-- <ip-table :data="tableData">
            <ip-table-column label="Date" prop="date" />
            <ip-table-column label="Traffic" prop="flow" />
          </ip-table> -->
          <el-table :data="tableData" style="width: 100%; border-radius: 10px" v-if="tableData.length > 0">
            <el-table-column prop="date" :label="t('Date')"></el-table-column>
            <el-table-column prop="flow" :label="t('Traffic')">
              <template #default="scope">
                <p>{{ scope.row.flow }} <i class="unit">GB</i></p>
              </template>
            </el-table-column>
          </el-table>
          <div class="null_data" v-else>
            <el-empty description="No Data"></el-empty>
          </div>
        </div>
      </div>
    </div>

    <!-- 平台在线IP -->
    <div class="ip w-full" v-show="activeIndex === 1">
      <div class="ip_echart">
        <div id="ipEchart" v-show="hasIpData"></div>
        <div class="null_data" v-show="!hasIpData">
          <!-- <el-empty description="No Data"></el-empty> -->
        </div>
        <Picker class="echart_picker" :defaultDate="ipdefault" :pickerOptions="pickerOptions" @dateChange="ipDateChange" />
      </div>

      <div class="table w-full">
        <el-table :data="network" border :header-row-style="tableHeaderStyle">
          <el-table-column :label="$t('overview_spec.Country_or_Region')">
            <template #default="scope">
              <span :class="['flag-icon', 'flag-icon-' + scope.row.code]"></span>
              <span style="margin-left: 10px">{{ lang === "zh" ? scope.row.country_cn : scope.row.country }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('overview_spec.Country_Code')">
            <template #default="scope">
              <p style="text-transform: uppercase">{{ scope.row.code }}</p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('overview_spec. Number_of_country_IPs')" prop="ips_count"></el-table-column>
          <el-table-column :label="$t('overview_spec.Network_Status')">
            <template #default="scope">
              <tableProgress :percent="scope.row.avaiable" type="network"></tableProgress>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Load')">
            <template #default="scope">
              <tableProgress :percent="scope.row.used" type="load"></tableProgress>
            </template>
          </el-table-column>
        </el-table>
        <div class="more vh_center pointer" v-if="network.length < page.total" @click="viewMore">
          <i class="el-icon-loading" v-show="isNetwork"></i>
          {{ $t("overview_spec.View_More") }}
        </div>
      </div>
    </div>

    <!-- 余额明细 -->
    <div class="balance w-full" v-show="activeIndex === 2">
      <el-table highlight-current-row v-loading="loading" :data="balanceData" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="datetime" :label="$t('Date')"></el-table-column>
        <el-table-column prop="pack_size" :label="$t('Traffic')">
          <template #default="scope">
            <span
              :style="{
                color: scope.row.log_type == 0 ? '#f14c36' : '#0dbc79',
              }"
              >{{ scope.row.pack_size }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="new_ip_count" :label="$t('overview_spec.Number_of_new_Ips')"></el-table-column>
        <el-table-column prop="request_ip_count" :label="$t('overview_spec.Number_Of_IPs')"></el-table-column>
        <el-table-column prop="request_count" :label="$t('overview_spec.Number_Of_Requests')"></el-table-column>
        <el-table-column :label="$t('Type')">
          <template #default="scope">
            <span v-if="scope.row.log_type == 0" style="color: #f14c36">{{ $t("overview_spec.consumption") }}</span>
            <span v-else-if="scope.row.log_type == 1" style="color: #0dbc79">{{ $t("overview_spec.recharge") }}</span>
            <span v-else-if="scope.row.log_type == 2" style="color: #0dbc79">{{ $t("overview_spec.rewards") }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="tabPage"
        :page-size="tabSize"
        layout="total, prev, pager, next, jumper"
        :total="tabTotal"
      >
      </el-pagination>
    </div>

    <div class="place v_center">
      <i @click="updateActiveIndex(0)" v-if="activeIndex !== 0" class="el-icon-arrow-left pointer"></i>
      <span>{{ $t("PCHeader.userDropdown.dropdownOne") }}</span>
      <div class="search" v-if="activeIndex === 2">
        <el-date-picker v-model="balanceDate" :editable="false" :clearable="false" type="date" format="DD.MM.YYYY" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  platCustomerReportOverview,
  platCustomerReport,
  platCustomerReportRealTime,
  IpDataList,
  CountryList,
  CustomerBalances,
  Notice,
} from "@/api/layout"
import { formatSizeUnits, getDate, addZero } from "@/utils/tools"

// 组件引入
import Picker from "../components/picker/picker.vue"
import tableProgress from "../components/progress/progress.vue"
import NumberCounter from "@/views/front/components/NumberCounter/NumberCounter.vue"
import userStore from "@/store/user"
// import IpTable from "@/components/table/table.vue"
// import IpTableColumn from "@/components/table/table-column.vue"
import settingStore from "@/store/setting"
import { ElDatePicker, ElPagination, ElEmpty, ElTable, ElTableColumn } from "element-plus"

const { unlimited } = userStore()
const { lang } = settingStore()

const { t } = useI18n()

// 状态定义
const activeIndex = ref(0)
const timeVal = ref(new Date())
const noticeText = ref("")
const isNoticeScroll = ref(false)
const hasIpData = ref(false)
const Nodata = ref(false)
const loading = ref(false)
const isNetwork = ref(false)
const balanceDate = ref(new Date())
const tableData = ref([])
const network = ref([])
const balanceData = ref([])
const iplist = ref([])

// 按天图表 echarts
let echart = null
let loadingEchart = null
let loadingTable = null
let loadingLine = null
// 初始化 实时echarts
async function setEchart(xData, serData) {
  const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

  const myEchart = echart.init(document.querySelector(".myEchart"))
  const option = {
    title: {
      text: t("PCOverview.EchartTextOne"),
      textStyle: { color: "#999999", fontSize: 16, fontWeight: "normal" },
      padding: [38, 0, 0, 35],
    },
    grid: { left: 60, top: 100, bottom: 40, right: 60, containLabel: true },

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
        fillerColor: "rgba(244, 177, 34, .3)",
        backgroundColor: "rgba(244, 177, 34, 0.1)",
        handleStyle: {
          color: "rgba(244, 177, 34, 0.57)",
        },
        moveHandleSize: 0,
        moveHandleStyle: {
          opacity: 1,
        },
        dataBackground: {
          areaStyle: {
            color: "rgba(244, 177, 34, 1)",
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
          color: "#FDB713",
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
          normal: {
            color: {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(244, 177, 34, 0)", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(244, 177, 34, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(244, 177, 34, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
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
          normal: {
            color: "#FDB713",
          },
        },
        data: serData(),
      },
    ],
  }
  myEchart.setOption(option)
  // this.loadingEchart.close()
  // this.dateEchartResize = () => {
  //   myEchart.resize()
  // }
  // window.addEventListener("resize", this.dateEchartResize)
}

// 分页相关
const page = reactive({
  index: 1,
  size: 20,
  total: 0,
})

const tabPage = ref(1)
const tabSize = ref(10)
const tabTotal = ref(10)

// IP图表相关
const ipStartDate = ref("")
const ipdefault = ref([])
const DAY = 1000 * 60 * 60 * 24

const pickerOptions = {
  disabledDate(time) {
    const now = getDate(new Date())
    const DAY = 1000 * 60 * 60 * 24
    const yesterday = new Date(now + " 00:00:00").getTime() - DAY
    const str = time.getTime()
    return str + DAY * 30 < yesterday || str > yesterday
  },
  onPick: ({ maxDate, minDate }) => {
    if (maxDate) {
      this.ipStartDate = ""
    } else {
      this.ipStartDate = minDate
    }
  },
}

// 流量数据
const quantityOfFlow = reactive({
  remain: {
    num: null,
    unit: null,
    count: null,
  },
  consume: {
    num: "",
    unit: "",
    count: "",
  },
})

// 消耗数据相关
const balanceColumns = ref([
  { title: "Date", key: "date" },
  { title: "Traffic", key: "flow" },
  { title: "New IP", key: "newIp" },
  { title: "IP", key: "ip" },
  { title: "Request", key: "request" },
])
// 表格样式
const tableHeaderStyle = {
  "background-color": "#f9f7f5",
  color: "#353535",
  "font-size": "14px",
}

// 方法定义
const updateActiveIndex = (index) => {
  activeIndex.value = index
  if (index === 2 && !balanceData.value.length) {
    getBalanceData()
  }
}

const splitUnit = (str) => {
  if (!str) {
    return { num: "0.00", unit: "MB" }
  }
  const num = str.split(" ")[0]
  const unit = str.split(" ")[1]
  return { num, unit }
}

// 获取用户流量数据
const getUserQuantity = async () => {
  try {
    const { data } = await platCustomerReportOverview()
    return data
  } catch (err) {
    console.log(err)
    return {
      consume: "",
      remain: "",
    }
  }
}

// 获取实时统计数据
const getRealTime = async (date) => {
  // loadingLine = Loading.service({
  //   target: document.querySelector(".day_echart"),
  // })
  try {
    let { data } = await platCustomerReportRealTime({
      start_time: `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} 00:00:00`,
      end_time: `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} 23:59:59`,
    })

    if (!data.length) {
      Nodata.value = true
    } else {
      Nodata.value = false
    }

    data = data.sort((a, b) => (b.time < a.time ? 1 : -1))

    // 这里需要实现setLine方法
    await setLine(
      () => data.map((item) => item.time),
      () => data.map((item) => item.pack_size)
    )
  } catch (err) {
    // loadingLine.close()
  }
}

// 获取通知
const getNotice = async () => {
  try {
    const { data } = await Notice()
    const notice = {
      zh: data.zh_cn,
      en: data.en,
      ru: data.ru,
    }
    noticeText.value = notice[lang.value]
    nextTick(() => {
      noticeScroll()
    })
  } catch (err) {
    console.log(err)
  }
}

// 通知滚动
const noticeTextRef = ref(null)
const noticeScroll = () => {
  const notice = noticeTextRef.value
  const limit = notice.parentNode.clientHeight
  const noticeHeight = notice.clientHeight
  if (noticeHeight > limit - 40) {
    isNoticeScroll.value = true
    const duration = Math.ceil(((noticeHeight - limit) / limit) * 7) + 7
    notice.style = `--parentHeight:${limit - 20}px;animation-duration:${duration}s`
  }
}

// 分页处理
const handleCurrentChange = (val) => {
  tabPage.value = val
  getBalanceData()
}

// 获取余额数据
const getBalanceData = async () => {
  try {
    loading.value = true
    const { data } = await CustomerBalances({
      page_index: tabPage.value,
      page_size: tabSize.value,
      day_date: getDate(balanceDate.value),
    })
    tabTotal.value = data.count

    const arr = data.list.map((item) => {
      item.pack_size = item.pack_size > 0 ? "+" + formatSizeUnits(item.pack_size) : "-" + formatSizeUnits(Math.abs(item.pack_size))
      return item
    })
    balanceData.value = Object.freeze(arr)
    loading.value = false
  } catch (err) {
    console.log(err)
    loading.value = false
  }
}

// 获取IP数据列表
const getIpdataList = async (start, end) => {
  try {
    const { data } = await IpDataList({
      start_date: start,
      end_date: end,
    })
    const iplist = data.toReversed()
    if (data.length) {
      hasIpData.value = true
    }
    return iplist
  } catch (err) {
    console.log(err)
  }
}

// 获取国家列表
const getCountryList = async () => {
  const scrollTop = document.querySelector(".pc-overview").parentNode.scrollTop
  try {
    isNetwork.value = true
    let arr = network.value
    const { data } = await CountryList({
      page_index: page.index,
      page_size: page.size,
    })
    page.total = data.count
    const list = data.list.map((item) => {
      item.code = item.code.toLowerCase()
      return item
    })
    arr = arr.concat(list)
    network.value = Object.freeze(arr)
    isNetwork.value = false
    nextTick(() => {
      document.querySelector(".pc-overview").parentNode.scrollTop = scrollTop
    })
  } catch (err) {
    console.log(err)
    isNetwork.value = false
  }
}

// IP日期变更
const ipDateChange = async ({ endDate, starDate }) => {
  const startDay = +starDate.day
  const endDay = +endDate.day
  const start = `${starDate.year}-${starDate.month < 10 ? "0" + starDate.month : starDate.month}-${startDay < 10 ? "0" + startDay : startDay}`
  const end = `${endDate.year}-${endDate.month < 10 ? "0" + endDate.month : endDate.month}-${endDay < 10 ? "0" + endDay : endDay}`
  const iplistData = await getIpdataList(start, end)
  iplist.value = iplistData
  nextTick(() => {
    setIpEchart(iplistData)
  })
}

// 查看更多
const viewMore = () => {
  page.index++
  getCountryList()
}

// 日期变更
const dateChange = async ({ endDate, starDate }) => {
  // loadingEchart = Loading.service({
  //   target: document.querySelector(".outflow_echart"),
  // })
  // loadingTable = Loading.service({
  //   target: document.querySelector(".date_flow"),
  // })

  let { data } = await platCustomerReport({
    start_time: `${starDate.year}-${addZero(starDate.month)}-${addZero(starDate.day)}`,
    end_time: `${endDate.year}-${addZero(endDate.month)}-${addZero(endDate.day)}`,
  })

  data = data.sort((a, b) => (b.date_short < a.date_short ? -1 : 1))
  tableData.value = data.map((item) => ({
    date: item.date_short,
    flow: item.pack_size,
  }))
  // loadingTable.close()
}

// 初始化在线IP
const initOnlineIp = async () => {
  const start = ipdefault.value[0]
  const end = ipdefault.value[1]

  const iplistData = await getIpdataList(start, end)
  iplist.value = iplistData
  const count = iplistData[iplistData.length - 1]?.count ?? 0
  let number
  if (lang.value === "zh") {
    number = Math.round((count / 10000) * 100) / 100
    number += "-万"
  } else {
    number = Math.round(count / 1000)
    number += "-K"
  }
  return number
}

// 时间输入处理
const input = (val) => {
  getRealTime(val)
}

// 设置IP图表
const setIpEchart = async (data) => {
  const ip = data.reduce(
    (pre, next) => {
      pre.date.push(next.date)
      pre.count.push(next.count)
      return pre
    },
    { date: [], count: [] }
  )

  const ipdom = document.getElementById("ipEchart")
  if (echart === null) {
    const { default: _ } = await import("@/utils/echarts")
    echart = _.init(ipdom)
  }

  const title = t("PCOverview.onlineIp")
  const option = {
    title: {
      text: title,
      textStyle: { color: "#353535", fontSize: 16, fontWeight: "normal" },
      padding: [30, 0, 0, 30],
    },
    grid: {
      top: 80,
      left: 110,
      bottom: 80,
      right: 30,
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
      axisLabel: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#666",
        margin: 30,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#B5B5B5",
          type: "dashed",
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
        fillerColor: "rgba(244, 177, 34, .3)",
        backgroundColor: "rgba(244, 177, 34, 0.1)",
        handleStyle: {
          color: "rgba(244, 177, 34, 0.57)",
        },
        moveHandleSize: 0,
        moveHandleStyle: {
          opacity: 1,
        },
        dataBackground: {
          areaStyle: {
            color: "rgba(244, 177, 34, 1)",
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
        symbolSize: 8,
        symbol: "circle",
        itemStyle: {
          color: "#FDB713",
          shadowColor: "#FDB713",
          shadowBlur: 6,
        },
        areaStyle: {
          color: "#fffaf5",
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#666666",
            fontSize: 14,
          },
          formatter(res) {
            if (lang.value === "zh") {
              return Math.round((res.value / 10000) * 100) / 100 + "万"
            } else {
              return Math.round((res.value / 1000) * 100) / 100 + "K"
            }
          },
        },
        lineStyle: {
          normal: {
            color: "#FDB713",
          },
        },
        data: ip.count,
      },
    ],
  }

  if (echart === null) {
    echart.setOption(option)
    window.addEventListener("resize", ipEchartResize)
  } else {
    echart.clear()
    echart.setOption(option)
    window.removeEventListener("resize", ipEchartResize)
    window.addEventListener("resize", ipEchartResize)
  }
}

// 图表resize处理函数
const ipEchartResize = () => {
  echart?.resize()
}

const dateEchartResize = () => {
  myEchart?.resize()
}

const lineEchartResize = () => {
  lineEchart?.resize()
}

// 初始化
onMounted(async () => {
  const yesterday = new Date(Date.now() - DAY)
  const enddate = new Date(yesterday - DAY * 9)
  const start = getDate(enddate)
  const end = getDate(yesterday)
  ipdefault.value = [start, end]

  // 获取用户流量与消耗IP
  const [quantityData, count] = await Promise.all([getUserQuantity(), initOnlineIp()])

  const obj = {
    remain: splitUnit(quantityData.remain),
    consume: splitUnit(quantityData.consume),
  }
  obj.remain.count = count.split("-")[0]
  obj.consume.count = count.split("-")[1]

  Object.assign(quantityOfFlow, obj)

  // 获取实时统计
  getRealTime(new Date())

  // 获取国家列表
  getCountryList()

  // 获取通知
  getNotice()

  // 加载国家国旗
  import("flag-icon-css/css/flag-icons.css")
})

// 清理工作
onBeforeUnmount(() => {
  echart = null
  window.removeEventListener("resize", ipEchartResize)
  window.removeEventListener("resize", dateEchartResize)
  window.removeEventListener("resize", lineEchartResize)
})

// 监听数据变化
watch(
  tableData,
  (val) => {
    if (val.length > 0) {
      nextTick(() => {
        setEchart(
          () => val.map((item) => item.date),
          () => val.map((item) => item.flow)
        )
      })
    } else {
      loadingEchart?.close()
    }
  },
  { deep: true }
)

watch(activeIndex, (val) => {
  if (val === 1) {
    nextTick(() => {
      setIpEchart(iplist.value)
    })
  }
})

watch(balanceDate, () => {
  getBalanceData()
})

// 导出组件
defineExpose({
  updateActiveIndex,
  getRealTime,
  getUserQuantity,
})
</script>

<style lang="less" scoped>
@import url("./overview.less");
</style>
