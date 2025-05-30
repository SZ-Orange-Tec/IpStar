<template>
  <div class="pc-overview column">
    <!-- 我的订阅 -->
    <div class="subscribe" v-show="activeIndex === 0">
      <!-- left_echarts -->
      <div class="echarts_left column">
        <!-- 已有&&流出 -->
        <div class="flow">
          <!-- 现有流量 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("PCOverview.residualFlowText") }}</h2>
              <img src="../../../assets/pc_img/layout_img/residual flow.png" width="70" height="70" />
            </div>
            <div class="box_bottom v_center">
              <div class="number">
                <div v-if="unlimited">
                  <span>{{ $t("PCProductList.unlimited") }}</span>
                </div>
                <NumberCounter v-else :value="quantityOfFlow.remain.num" :unit="quantityOfFlow.remain.unit" />
              </div>
            </div>
          </div>
          <!-- 今日消耗 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("PCOverview.consumptionTodayText") }}</h2>
              <img src="../../../assets/pc_img/layout_img/consumption today.png" width="70" height="70" />
            </div>
            <div class="box_bottom v_center">
              <p class="number">
                <NumberCounter :value="quantityOfFlow.consume.num" :unit="quantityOfFlow.consume.unit" />
              </p>
              <div class="btn v_center pointer" @click="updateActiveIndex(2)">
                {{ $t("PCOverview.detail") }}
              </div>
            </div>
          </div>
          <!-- 当前在线 IP 总数 -->
          <div class="box column">
            <div class="box_top between">
              <h2>{{ $t("PCOverview.onlineIp") }}</h2>
            </div>
            <div class="box_bottom v_center">
              <p class="number">
                <NumberCounter :value="quantityOfFlow.remain.count" :unit="quantityOfFlow.consume.count" />
              </p>
              <div class="btn v_center pointer" @click="updateActiveIndex(1)">
                {{ $t("PCOverview.detail") }}
              </div>
            </div>
          </div>
        </div>

        <!-- 日流出 echarts -->
        <div class="outflow_echart">
          <!-- 时间选择 -->
          <div class="myEchart" v-show="tableData.length > 0"></div>
          <div class="null_data" v-show="!tableData.length > 0">
            <!-- <el-empty description="No Data"></el-empty> -->
          </div>
          <Picker class="echart_picker" @dateChange="dateChange" />
        </div>
        <!-- 实时流出 echarts-->
        <div class="day_echart">
          <div class="line_echart" v-show="!Nodata"></div>
          <div class="null_data" v-show="Nodata">
            <!-- <el-empty description="No Data"></el-empty> -->
          </div>
          <!-- <el-date-picker
            v-model="timeVal"
            type="date"
            prefix-icon="null"
            class="picker"
            @change="input"
            format="dd.MM.yyyy"
            :clearable="false"
            placeholder="option date"
          >
          </el-date-picker> -->
          <img src="../../../assets/pc_img/layout_img/calendar.png" alt="calendar" />
        </div>
      </div>
      <!-- date flow -->
      <div class="right column">
        <div class="notice" v-if="noticeText">
          <h2>{{ $t("PCOverview.notice") }}</h2>
          <div class="notice_box">
            <div ref="noticeText" :class="{ scroll: isNoticeScroll }">
              <p>{{ noticeText }}</p>
            </div>
            <div class="mark"></div>
          </div>
        </div>

        <div class="date_flow">
          <!-- <el-table :data="tableData" style="width: 100%; border-radius: 10px" v-if="tableData.length > 0">
            <el-table-column prop="date" label="Date"></el-table-column>
            <el-table-column prop="flow" label="Traffic">
              <template #default="scope">
                <p>{{ scope.row.flow }} <i class="unit">GB</i></p>
              </template>
            </el-table-column>
          </el-table> -->
          <!-- <div class="null_data" v-else>
            <el-empty description="No Data"></el-empty>
          </div> -->
        </div>
      </div>
    </div>

    <!-- 平台在线IP -->
    <div class="ip" v-show="activeIndex === 1">
      <div class="ip_echart">
        <div id="ipEchart" v-show="hasIpData"></div>
        <div class="null_data" v-show="!hasIpData">
          <!-- <el-empty description="No Data"></el-empty> -->
        </div>
        <Picker class="echart_picker" :defaultDate="ipdefault" :pickerOptions="pickerOptions" @dateChange="ipDateChange" />
      </div>

      <div class="table">
        <!-- <el-table :data="network" border :header-row-style="tableHeaderStyle">
          <el-table-column :label="$t('PCOverview.table.country')">
            <template #default="scope">
              <span :class="['flag-icon', 'flag-icon-' + scope.row.code]"></span>
              <span style="margin-left: 10px">{{ lang === "zh" ? scope.row.country_cn : scope.row.country }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('PCOverview.table.code')">
            <template #default="scope">
              <p style="text-transform: uppercase">{{ scope.row.code }}</p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('PCOverview.table.ip_count')" prop="ips_count"></el-table-column>
          <el-table-column :label="$t('PCOverview.table.network')">
            <template #default="scope">
              <tableProgress :percent="scope.row.avaiable" type="network"></tableProgress>
            </template>
          </el-table-column>
          <el-table-column :label="$t('PCOverview.table.load')">
            <template #default="scope">
              <tableProgress :percent="scope.row.used" type="load"></tableProgress>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="more vh_center pointer" v-if="network.length < page.total" @click="viewMore">
          <i class="el-icon-loading" v-show="isNetwork"></i>
          {{ $t("PCOverview.viewmore") }}
        </div>
      </div>
    </div>

    <!-- 余额明细 -->
    <div class="balance" v-show="activeIndex === 2">
      <!-- <el-table highlight-current-row v-loading="loading" :data="balanceData" style="width: 100%">
        <el-table-column prop="id" :label="$t('PCOverview.balanceHeader.id')"></el-table-column>
        <el-table-column prop="datetime" :label="$t('PCOverview.balanceHeader.date')"></el-table-column>
        <el-table-column prop="pack_size" :label="$t('PCOverview.balanceHeader.traffic')">
          <template #default="scope">
            <span
              :style="{
                color: scope.row.log_type == 0 ? '#f14c36' : '#0dbc79',
              }"
              >{{ scope.row.pack_size }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="new_ip_count" :label="$t('PCOverview.balanceHeader.newIp')"></el-table-column>
        <el-table-column prop="request_ip_count" :label="$t('PCOverview.balanceHeader.ip')"></el-table-column>
        <el-table-column prop="request_count" :label="$t('PCOverview.balanceHeader.request')"></el-table-column>
        <el-table-column :label="$t('PCOverview.balanceHeader.type')">
          <template #default="scope">
            <span v-if="scope.row.log_type == 0" style="color: #f14c36">{{ $t("PCOverview.balanceHeader.consumption") }}</span>
            <span v-else-if="scope.row.log_type == 1" style="color: #0dbc79">{{ $t("PCOverview.balanceHeader.recharge") }}</span>
            <span v-else-if="scope.row.log_type == 2" style="color: #0dbc79">{{ $t("PCOverview.balanceHeader.rewards") }}</span>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- 分页 -->
      <!-- <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="tabPage"
        :page-size="tabSize"
        layout="total, prev, pager, next, jumper"
        :total="tabTotal"
      >
      </el-pagination> -->
    </div>

    <div class="place v_center">
      <i @click="updateActiveIndex(0)" v-if="activeIndex !== 0" class="el-icon-arrow-left pointer"></i>
      <span>{{ $t("PCHeader.userDropdown.dropdownOne") }}</span>
      <div class="search" v-if="activeIndex === 2">
        <!-- <el-date-picker v-model="balanceDate" :editable="false" :clearable="false" type="date" format="dd.MM.yyyy" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue"
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
import "flag-icon-css/css/flag-icons.css"

// 组件引入
import Picker from "../components/picker/picker.vue"
import tableProgress from "../components/progress/progress.vue"
import NumberCounter from "@/views/front/components/NumberCounter/NumberCounter.vue"
import userStore from "@/store/user"

const { unlimited } = userStore()
const { lang } = userStore()

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

// echarts实例
let echart = null
let loadingEchart = null
let loadingTable = null
let loadingLine = null

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
