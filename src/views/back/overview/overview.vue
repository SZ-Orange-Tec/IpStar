<template>
  <div class="pc-overview column">
    <NavBar>
      <template #default="{ title }">
        <div class="place v_center space-x-2">
          <ip-button type="ghost" icon class="h-8 w-8" @click="updateActiveIndex(0)" v-if="activeIndex !== 0">
            <ChevronLeft />
          </ip-button>
          <span>{{ title }}</span>
          <div class="search" v-if="activeIndex === 2">
            <el-date-picker v-model="balanceDate" :editable="false" :clearable="false" type="date" format="dd.MM.yyyy" style="width: 8rem" />
          </div>
        </div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 px-3 md:px-5">
      <!-- 我的订阅 -->
      <div class="subscribe column xl:flex items-stretch w-full gap-5" v-show="activeIndex === 0">
        <div class="echarts_left w-full column gap-5">
          <div class="flow gap-3 md:gap-5">
            <div class="box flex-1 column space-y-5 p-2 sm:p-4">
              <div class="box_top w-full between">
                <p class="">{{ $t("overview_spec.Residual_Traffic") }}</p>
                <img class="hidden md:block" src="@/assets/images/overview/Gauge.png" width="36" />
                <!-- <Gauge :size="50" color="#ffcc53" /> -->
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

            <div class="box flex-1 column space-y-5 p-2 sm:p-4">
              <div class="box_top w-full between">
                <p>{{ $t("overview_spec.Consumption_Today") }}</p>
                <img class="hidden md:block" src="@/assets/images/overview/control.png" width="36" />
                <!-- <SlidersVertical :size="40" color="hsl(var(--major))" /> -->
              </div>
              <div class="box_bottom column sm:between pointer">
                <p class="number">
                  <NumberCounter :value="quantityOfFlow.consume.num" :unit="quantityOfFlow.consume.unit" />
                </p>
                <ip-button type="primary" class="px-2 md:px-5 h-8 text-xs md:text-sm" @click="updateActiveIndex(2)">
                  {{ $t("Details") }}
                </ip-button>
                <!-- <div class="btn v_center" @click="updateActiveIndex(2)">{{ $t("overview_spec.detail") }}</div> -->
              </div>
            </div>

            <div class="box flex-1 column md:column_between space-y-5 p-2 sm:p-4">
              <div class="box_top between">
                <p>{{ $t("overview_spec.Total_IPs_Available") }}</p>
              </div>
              <div class="box_bottom column sm:between w-full">
                <p class="number">
                  <NumberCounter :value="quantityOfFlow.remain.count" :unit="quantityOfFlow.consume.count" />
                </p>
                <ip-button type="primary" class="px-2 md:px-5 h-8 text-xs md:text-sm" @click="updateActiveIndex(1)">
                  {{ $t("Details") }}
                </ip-button>
                <!-- <div class="btn v_center pointer" @click="updateActiveIndex(1)">{{ $t("overview_spec.detail") }}</div> -->
              </div>
            </div>
          </div>

          <div class="w-full column md:flex gap-5 items-stretch echart_table">
            <div class="echart column space-y-5 w-full md:flex-1">
              <div class="outflow_echart flex-1 w-full rounded-md relative">
                <!-- 时间选择 -->
                <div class="w-full h-full" id="echartDay" v-show="tableData.length > 0"></div>
                <div class="null_data" v-show="!tableData.length > 0">
                  <el-empty description="No Data"></el-empty>
                </div>
                <Picker class="echart_picker" @dateChange="dateChange" />
              </div>

              <div class="day_echart flex-1 w-full relative rounded-md">
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
                    format="dd.MM.yyyy"
                    :clearable="false"
                    placeholder="option date"
                    style="width: 110px"
                  />
                </div>
              </div>
            </div>

            <div class="table_box xl:hidden">
              <el-table :data="tableData" v-if="tableData.length > 0">
                <el-table-column prop="date" :label="$t('Date')"></el-table-column>
                <el-table-column prop="flow" :label="$t('Traffic')">
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
        <!-- date flow -->
        <div class="right h-full hidden xl:column space-y-5">
          <div class="notice" v-if="noticeText">
            <h2 class="text-base font-bold">{{ $t("Notifications") }}</h2>
            <div class="notice_box">
              <div ref="noticeText" :class="{ scroll: isNoticeScroll }">
                <p class="text-sm">{{ noticeText }}</p>
              </div>
              <div class="mark"></div>
            </div>
          </div>

          <div class="date_flow table_box flex-1 min-h-0">
            <el-table :data="tableData" style="width: 100%; border-radius: 10px" v-if="tableData.length > 0">
              <el-table-column prop="date" :label="$t('Date')"></el-table-column>
              <el-table-column prop="flow" :label="$t('Traffic')">
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
      <div class="ip w-full space-y-5" v-show="activeIndex === 1">
        <div class="ip_echart w-full">
          <div id="ipEchart" v-show="hasIpData"></div>
          <div class="null_data" v-show="!hasIpData">
            <el-empty description="No Data"></el-empty>
          </div>
          <Picker class="echart_picker" :defaultDate="ipdefault" :pickerOptions="pickerOptions" @dateChange="ipDateChange" />
        </div>

        <div class="table_box w-full rounded-md space-y-5">
          <el-table :data="network" border>
            <el-table-column :label="$t('overview_spec.Country_or_Region')" min-width="200">
              <template #default="scope">
                <span :class="['flag-icon', 'flag-icon-' + scope.row.code]"></span>
                <span style="margin-left: 10px">{{ lang === "zh" ? scope.row.country_cn : scope.row.country }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('overview_spec.Country_Code')" min-width="150">
              <template #default="scope">
                <p style="text-transform: uppercase">{{ scope.row.code }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="$t('overview_spec.Number_of_country_IPs')" prop="ips_count" min-width="200"></el-table-column>
            <el-table-column :label="$t('overview_spec.Network_Status')" min-width="400">
              <template #default="scope">
                <tableProgress :percent="scope.row.avaiable" type="network"></tableProgress>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Load')" min-width="400">
              <template #default="scope">
                <tableProgress :percent="scope.row.used" type="load"></tableProgress>
              </template>
            </el-table-column>
          </el-table>
          <ip-button type="border" class="h-8 px-3" v-if="network.length < page.total" @click="viewMore">
            {{ $t("overview_spec.View_More") }}
          </ip-button>
        </div>
      </div>

      <!-- 余额明细 -->
      <div class="balance w-full column" v-show="activeIndex === 2">
        <div class="w-full flex-1">
          <div class="table_box w-full">
            <el-table highlight-current-row v-loading="loading" :data="balanceData" style="width: 100%">
              <!-- <el-table-column prop="name" :label="$t('PCProducts.tableHeader.name')"></el-table-column> -->
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="datetime" :label="$t('Date')" min-width="100"></el-table-column>
              <el-table-column prop="pack_size" :label="$t('Traffic')" min-width="100">
                <template #default="scope">
                  <span :style="{ color: scope.row.log_type == 0 ? '#f14c36' : '#0dbc79' }">{{ scope.row.pack_size }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="new_ip_count" :label="$t('overview_spec.Number_of_new_Ips')" min-width="200"></el-table-column>
              <el-table-column prop="request_ip_count" :label="$t('overview_spec.Number_Of_IPs')" min-width="200"></el-table-column>
              <el-table-column prop="request_count" :label="$t('overview_spec.Number_Of_Requests')" min-width="220"></el-table-column>
              <el-table-column :label="$t('Type')" min-width="140">
                <template #default="scope">
                  <span v-if="scope.row.log_type == 0" style="color: #f14c36">{{ $t("overview_spec.consumption") }}</span>
                  <span v-else-if="scope.row.log_type == 1" style="color: #0dbc79">{{ $t("overview_spec.recharge") }}</span>
                  <span v-else-if="scope.row.log_type == 2" style="color: #0dbc79">{{ $t("overview_spec.rewards") }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination vh_center">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="tabPage"
            :page-size="tabSize"
            layout="total, prev, pager, next, jumper"
            :total="tabTotal"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
// 国家国旗

import userStore from "@/store/user"
import settingStore from "@/store/setting"
import NavBar from "../components/navbar/navbar.vue"
import Picker from "../components/picker/picker.vue"
import NumberCounter from "@/views/front/components/NumberCounter/NumberCounter.vue"
import tableProgress from "../components/progress/progress.vue"
import { Calendar, ChevronLeft, Gauge, SlidersVertical } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
// import * as echarts from 'echarts'
let echart = null
export default {
  name: "OverView",
  components: {
    NavBar,
    Picker,
    NumberCounter,
    tableProgress,
    Calendar,
    ChevronLeft,
    IpButton,
    Gauge,
    SlidersVertical,
  },
  data() {
    this.page = {
      index: 1,
      size: 20,
      total: 0,
    }
    this.tableHeaderStyle = {
      "background-color": "#f9f7f5",
      color: "#353535",
      "font-size": "14px",
    }
    return {
      // ip直线图选择的开始日期
      ipStartDate: "",
      pickerOptions: Object.freeze({
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
      }),
      // tabbar index
      activeIndex: 0,
      hasIpData: false,
      // ip折线图默认时间
      ipdefault: [],
      // 国家地区负载表
      network: [],
      // 获取国家地区表格loading
      isNetwork: false,
      // 表格流量数据
      tableData: [],
      // 用户流量
      quantityOfFlow: {
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
      },
      // loading
      loadingEchart: null,
      loadingLine: null,
      loadingTable: null,
      // 时间选择
      timeVal: new Date(),
      // nodata
      Nodata: false,
      // 余额表格loading
      loading: false,
      // 余额表格data
      balanceData: [],
      tabTotal: 10,
      tabPage: 1,
      tabSize: 10,
      // 余额表筛选日期参数
      balanceDate: new Date(),
      // 通知
      noticeText: "",
      // 通知滚动
      isNoticeScroll: false,
    }
  },
  computed: {
    unlimited() {
      return this.$store.state.user_info?.unlimited ?? false
    },
  },
  created() {
    const DAY = 1000 * 60 * 60 * 24
    const yesterday = new Date(Date.now() - DAY)
    const enddate = new Date(yesterday - DAY * 9)
    const start = getDate(enddate)
    const end = getDate(yesterday)
    this.ipdefault = [start, end]
  },
  mounted() {
    // 用户 流量 与消耗  ip
    Promise.all([this.getUserQuantity(), this.initOnlineIp()]).then((res) => {
      const data = res[0]
      const count = res[1]

      const obj = {
        remain: this.splitUnit(data.remain),
        consume: this.splitUnit(data.consume),
      }
      obj.remain.count = count.split("-")[0]
      obj.consume.count = count.split("-")[1]

      this.quantityOfFlow = obj
    })
    // 实时统计
    this.getRealTime(new Date())
    // // 国家列表
    this.getCountryList()
    // 通知
    this.getNotice()
    // 加载国家国旗
    import("flag-icon-css/css/flag-icons.css")
  },
  methods: {
    // 获取通知
    async getNotice() {
      try {
        const { data } = await Notice()
        const notice = {
          zh: data.zh_cn,
          en: data.en,
          ru: data.ru,
        }
        this.noticeText = notice[this.lang]
        this.$nextTick(() => {
          this.noticeScroll()
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 通知滚动
    noticeScroll() {
      const notice = this.$refs.noticeText
      // if(notice.clientHeight)
      const limit = notice.parentNode.clientHeight
      const noticeHeight = notice.clientHeight
      if (noticeHeight > limit - 40) {
        this.isNoticeScroll = true
        const duration = Math.ceil(((noticeHeight - limit) / limit) * 7) + 7
        notice.style = `--parentHeight:${limit - 20}px;animation-duration:${duration}s`
      }
    },
    handleCurrentChange(val) {
      this.tabPage = val
      this.getBalanceData()
    },
    // 获取流量数据
    async getBalanceData() {
      try {
        this.loading = true
        const { data } = await CustomerBalances({
          page_index: this.tabPage,
          page_size: this.tabSize,
          day_date: getDate(this.balanceDate),
        })
        this.tabTotal = data.count

        const arr = data.list.map((item) => {
          item.pack_size = item.pack_size > 0 ? "+" + formatSizeUnits(item.pack_size) : "-" + formatSizeUnits(Math.abs(item.pack_size))
          return item
        })
        this.balanceData = Object.freeze(arr)
        this.loading = false
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    // 修改activeIndex
    updateActiveIndex(index) {
      this.activeIndex = index
      if (index === 2 && !this.balanceData.length) {
        this.getBalanceData()
      }
    },
    // 在线ip数量初始化
    async initOnlineIp() {
      const start = this.ipdefault[0]
      const end = this.ipdefault[1]

      const iplist = await this.getIpdataList(start, end)
      this.iplist = iplist
      const count = iplist[iplist.length - 1]?.count ?? 0
      let number
      if (this.lang === "zh") {
        number = Math.round((count / 10000) * 100) / 100
        number += "-万"
      } else {
        number = Math.round(count / 1000)
        number += "-K"
      }
      return number
    },
    // 初始化 实时echarts
    async setEchart(xData, serData) {
      const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

      const myEchart = echart.init(document.getElementById("echartDay"))
      const option = {
        title: {
          text: this.en ? "5-Day Comparison" : "5 天对比",
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
      // console.log(option, 'option')
      // this.loadingEchart.close()
      this.dateEchartResize = () => {
        myEchart.resize()
      }
      window.addEventListener("resize", this.dateEchartResize)
    },
    // 初始化 line_echarts
    async setLine(xData, serData) {
      const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

      const myEchart = echart.init(document.getElementById("echartTime"))
      const option = {
        title: {
          text: this.$t("overview_spec.EchartTextTwo"),
          textStyle: { color: "#999999", fontSize: 14, fontWeight: "normal" },
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
              normal: {
                color: "#FDB713",
              },
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
    },
    async setIpEchart(data) {
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
        const { default: _ } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")
        echart = _.init(ipdom)
      }
      const lang = this.lang
      const title = this.$t("overview_spec.onlineIp")
      // console.log(title)
      const option = {
        title: {
          text: title,
          textStyle: { color: "#fff", fontSize: 16, fontWeight: "normal" },
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
          // max: 4,
          axisLabel: {
            fontFamily: "Roboto",
            fontSize: 12,
            color: "#B5B5B5",
            margin: 30,
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
              shadowColor: "FDB#713",
              shadowBlur: 6,
              // shadowOffsetX: -3,
              // shadowOffsetY: -3
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
                if (lang === "zh") {
                  return Math.round((res.value / 10000) * 100) / 100 + "万"
                } else {
                  return Math.round((res.value / 1000) * 100) / 100 + "K"
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
            data: ip.count,
          },
        ],
      }
      if (echart === null) {
        echart.setOption(option)
        this.ipEchartResize = () => {
          echart.resize()
        }
        window.addEventListener("resize", this.ipEchartResize)
      } else {
        echart.clear()
        echart.setOption(option)
        window.removeEventListener("resize", this.ipEchartResize)
        this.ipEchartResize = () => {
          echart.resize()
        }
        window.addEventListener("resize", this.ipEchartResize)
      }
    },
    // 获取ip时间表
    async getIpdataList(start, end) {
      try {
        const { data } = await IpDataList({
          start_date: start,
          end_date: end,
        })
        // this.iplist = Object.freeze(data)
        const iplist = data.toReversed()
        if (data.length) {
          this.hasIpData = true
        }
        return iplist
      } catch (err) {
        console.log(err)
      }
    },
    // 获取国家数据
    async getCountryList() {
      const scrollTop = this.$el.parentNode.scrollTop
      try {
        this.isNetwork = true
        let arr = this.network
        const { data } = await CountryList({
          page_index: this.page.index,
          page_size: this.page.size,
        })
        this.page.total = data.count
        const list = data.list.map((item) => {
          item.code = item.code.toLowerCase()
          return item
        })
        arr = arr.concat(list)
        this.network = Object.freeze(arr)
        this.isNetwork = false
        this.$nextTick(() => {
          this.$el.parentNode.scrollTop = scrollTop
        })
      } catch (err) {
        console.log(err)
        this.isNetwork = false
      }
    },
    async ipDateChange({ endDate, starDate }) {
      const startDay = +starDate.day
      const endDay = +endDate.day
      const start = `${starDate.year}-${starDate.month < 10 ? "0" + starDate.month : starDate.month}-${startDay < 10 ? "0" + startDay : startDay}`
      const end = `${endDate.year}-${endDate.month < 10 ? "0" + endDate.month : endDate.month}-${endDay < 10 ? "0" + endDay : endDay}`
      const iplist = await this.getIpdataList(start, end)
      this.iplist = iplist
      this.$nextTick(() => {
        this.setIpEchart(iplist)
      })
    },
    // 查看更多
    viewMore() {
      this.page.index++
      this.getCountryList()
    },
    // 时间选择
    async dateChange({ endDate, starDate }) {
      let { data } = await platCustomerReport({
        start_time: `${starDate.year}-${addZero(starDate.month)}-${addZero(starDate.day)}`,
        end_time: `${endDate.year}-${addZero(endDate.month)}-${addZero(endDate.day)}`,
      })
      // const newArr = []
      data = data.sort((a, b) => {
        return b.date_short < a.date_short ? -1 : 1
      })
      this.tableData = data.map((item) => {
        return {
          date: item.date_short,
          flow: item.pack_size,
        }
      })
      // console.log(data, 'data')
    },
    // 获取 用户剩余流量 && 今日消耗
    async getUserQuantity() {
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
    },
    // 获取实时统计的数据
    async getRealTime(date) {
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
        this.setLine(
          () => {
            return data.map((item) => item.time)
          },
          () => {
            return data.map((item) => item.pack_size)
          }
        )
      } catch {}
    },
    // 切割单位
    splitUnit(str) {
      if (!str) {
        return { num: "0.00", unit: "MB" }
      }
      const num = str.split(" ")[0]
      const unit = str.split(" ")[1]
      return { num, unit }
    },
    // 时间选择
    input(val) {
      this.getRealTime(val)
    },
  },
  watch: {
    tableData: {
      handler(val) {
        if (val.length > 0) {
          this.$nextTick(() => {
            this.setEchart(
              () => {
                // const newArr =
                // return newArr.sort((a, b) => { return b < a ? 1 : -1 })
                return this.tableData.map((item) => item.date)
              },
              () => {
                return this.tableData.map((item) => item.flow)
              }
            )
          })
        } else {
          // this.loadingEchart.close()
        }
      },
      deep: true,
    },
    activeIndex(val) {
      if (val === 1) {
        this.$nextTick(() => {
          this.setIpEchart(this.iplist)
        })
      }
    },
    ipStartDate(val) {
      console.log(val)
      if (!val) {
        this.pickerOptions = Object.freeze({
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
        })
      } else {
        const start = val.getTime()
        const now = new Date(getDate(new Date()) + " 00:00:00")
        const DAY = 1000 * 60 * 60 * 24
        const yesterday = now.getTime() - DAY
        this.pickerOptions = Object.freeze({
          disabledDate(time) {
            const str = time.getTime()
            return str !== start && str !== yesterday
          },
          onPick: ({ maxDate, minDate }) => {
            if (maxDate) {
              this.ipStartDate = ""
            } else {
              this.ipStartDate = minDate
            }
          },
        })
      }
    },
    balanceDate(val) {
      this.getBalanceData()
    },
  },
  beforeDestroy() {
    echart = null
    window.removeEventListener("resize", this.ipEchartResize)
    window.removeEventListener("resize", this.dateEchartResize)
    window.removeEventListener("resize", this.lineEchartResize)
  },
  setup() {
    const { lang, en } = settingStore()
    const { unlimited } = userStore()
    return {
      en,
      lang,
      unlimited,
    }
  },
}
</script>

<style lang="less" scoped>
@import url("./overview.less");
</style>
