<template>
  <div class="pc-account-detail column space-y-3">
    <h5>{{ $t("account_spec.detail") }}</h5>
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('account_spec.usage')" name="usage"></el-tab-pane>
      <el-tab-pane :label="$t('account_spec.assign_record')" name="record"></el-tab-pane>
      <el-tab-pane :label="$t('account_spec.realtime')" name="realTime"></el-tab-pane>
    </el-tabs>

    <div class="search v_center space-x-2">
      <el-date-picker
        v-if="activeTab === 'realTime'"
        v-model="searchForm.day"
        type="date"
        @change="search"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-date-picker
        v-else
        type="daterange"
        v-model="searchForm.date"
        @change="search"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="To"
        placeholder="date"
      ></el-date-picker>

      <el-select v-model="searchForm.account" @change="search" placeholder="请选择">
        <el-option :label="$t('account_spec.all')" value="all"></el-option>
        <el-option v-for="item in accountList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <!-- <el-input v-model="searchForm.account" @input="searchDebounce" :placeholder="$t('account_spec.sub_account')" style="width:300px"></el-input> -->
    </div>

    <div class="flex-1 tablebox" v-loading="loading">
      <el-table v-if="activeTab === 'usage'" :data="tableData" ref="usageTable" height="100%">
        <el-table-column prop="date" :label="$t('account_spec.use_time')"></el-table-column>
        <el-table-column :label="$t('account_spec.account')">
          <template #default="scope">
            <div class="v_center space-x-2">
              <p>{{ scope.row.account }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remain" :label="$t('account_spec.traffic')"></el-table-column>
      </el-table>
      <el-table v-else-if="activeTab === 'record'" :data="tableData" ref="recordTable" height="100%">
        <el-table-column prop="sub_account" :label="$t('account_spec.account')" />
        <el-table-column prop="create_time" :label="$t('account_spec.assign_time')" />
        <el-table-column prop="amount" :label="$t('account_spec.assign_traffic')" />
        <el-table-column prop="remain" :label="$t('account_spec.remain_traffic')" />
      </el-table>
      <div v-else-if="activeTab === 'realTime'" class="day_echart" v-loading="loading">
        <div id="usageLine" class="line_echart" v-show="!Nodata"></div>
        <div class="null_data" v-show="Nodata">
          <el-empty description="No Data"></el-empty>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="activeTab !== 'realTime'">
      <el-pagination
        layout="total, sizes, prev, pager, next"
        :total="page.total"
        :current-page="page.index"
        :page-sizes="[10, 20, 30, 40]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { platAccountAssignRecord, platAccountRealTime, platAccountSelect, platAccountUsage } from "@/api/account"
import { debounce, formatSizeUnits } from "@/utils/tools"
import { format } from "date-fns"

export default {
  name: "AccountDetail",
  data() {
    return {
      Nodata: false,
      loading: false,
      activeTab: "usage",
      searchForm: {
        date: [],
        account: "all",
        day: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      },
      tableData: [],
      accountList: [],
      page: {
        index: 1,
        size: 10,
        total: 0,
      },
    }
  },
  watch: {
    activeTab: {
      handler() {
        this.searchForm = {
          day: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          date: [],
          account: "all",
        }
        this.tableData = []
        this.page.total = 0
        this.$nextTick(() => {
          this.search()
        })
      },
    },
  },
  methods: {
    search() {
      this.page.index = 1
      if (this.activeTab === "usage") {
        this.$refs.usageTable.doLayout()
        this.getUsage()
      } else if (this.activeTab === "record") {
        this.$refs.recordTable.doLayout()
        this.getRecord()
      } else if (this.activeTab === "realTime") {
        this.getRealTime()
      }
    },
    async getUsage() {
      try {
        this.loading = true
        const { account, date } = this.searchForm
        const params = {
          account: account === "all" ? "" : account,
          page_index: this.page.index,
          page_size: this.page.size,
        }
        if (date.length) {
          params.start_time = date[0] + " 00:00:00"
          params.end_time = date[1] + " 23:59:59"
        }
        const { data } = await platAccountUsage(params)
        this.tableData = data.list.map((item) => {
          item.amount = `${item.amount} GB`
          item.remain = formatSizeUnits(+item.packsize)
          return item
        })
        this.page.total = data.count
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async getRecord() {
      try {
        this.loading = true
        const { account, date } = this.searchForm
        const params = {
          account: account === "all" ? "" : account,
          page_index: this.page.index,
          page_size: this.page.size,
        }
        if (date.length) {
          params.start_time = date[0] + " 00:00:00"
          params.end_time = date[1] + " 23:59:59"
        }
        const { data } = await platAccountAssignRecord(params)

        this.tableData = data.list.map((item) => {
          item.amount = `${item.amount} GB`
          const isOver = item.packsize < 0
          item.remain = (isOver ? "-" : "") + formatSizeUnits(Math.abs(item.packsize))
          return item
        })
        this.page.total = data.count
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async getRealTime() {
      try {
        this.loading = true
        const { account, day } = this.searchForm
        const params = {
          account: account === "all" ? "" : account,
          start_time: day + " 00:00:00",
          end_time: day + " 23:59:59",
        }
        let { data } = await platAccountRealTime(params)

        this.Nodata = !data.length

        if (this.Nodata) return

        data = data.sort((a, b) => {
          return b.time < a.time ? 1 : -1
        })

        this.$nextTick(() => {
          this.setLine(
            () => {
              return data.map((item) => item.time)
            },
            () => {
              return data.map((item) => item.packsize)
            }
          )
        })
      } catch (error) {
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    async getAccountList() {
      try {
        const { data } = await platAccountSelect()
        this.accountList = data
      } catch (error) {
        console.log(error.message)
      }
    },
    handleCurrentChange(val) {
      this.page.index = val
      if (this.activeTab === "usage") {
        this.$refs.usageTable.doLayout()
        this.getUsage()
      } else if (this.activeTab === "record") {
        this.$refs.recordTable.doLayout()
        this.getRecord()
      } else if (this.activeTab === "realTime") {
        this.getRealTime()
      }
    },
    handleSizeChange(val) {
      this.page.size = val
      this.search()
    },
    async setLine(xData, serData) {
      const { default: echart } = await import(/* webpackChunkName:'echarts' */ "@/utils/echarts")

      const dom = document.getElementById("usageLine")
      const myEchart = echart.init(dom)
      const option = {
        title: {
          text: this.$t("PCOverview.EchartTextTwo"),
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
            symbol: `image://${require("@/assets/pc_img/overview_img/peak point.png")}`,
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

      if (this.lineEchartResize) {
        window.removeEventListener("resize", this.lineEchartResize)
      }

      this.lineEchartResize = () => {
        myEchart.resize()
      }
      window.addEventListener("resize", this.lineEchartResize)
    },
  },
  created() {
    this.searchDebounce = debounce(this.search.bind(this), 500)
  },
  mounted() {
    this.search()
    this.getAccountList()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.lineEchartResize)
  },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
