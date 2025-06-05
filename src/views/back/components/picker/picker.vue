<template>
  <div class="pc-picker">
    <el-date-picker
      v-model="dateArr"
      type="daterange"
      :default-value="new Date()"
      :picker-options="pickerOptions"
      range-separator="to"
      format="dd.MM.yyyy"
      prefix-icon="null"
      start-placeholder="start time"
      end-placeholder="end time"
      @change="input"
    >
    </el-date-picker>
    <img src="../../../../../assets/pc_img/layout_img/calendar.png" alt="" class="icon_calendar" />
    <img src="../../../../../assets/pc_img/layout_img/calendar.png" alt="" class="icon_calendar" />
  </div>
</template>

<script>
import { ElDatePicker } from "element-plus"
export default {
  name: "PicKer",
  components: {
    ElDatePicker,
  },
  props: {
    defaultDate: {
      type: Array,
      default() {
        return []
      },
    },
    pickerOptions: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      // 接收时间
      dateArr: null,
      // 开始时间
      star_date: null,
      // 结束时间
      end_date: null,
    }
  },
  mounted() {
    if (!this.defaultDate.length) {
      // 获取当前月份
      this.getCurrentTime()
    } else {
      const start = this.defaultDate[0].split("-")
      const end = this.defaultDate[1].split("-")
      this.star_date = {
        year: start[0],
        month: start[1],
        day: start[2],
      }
      this.end_date = {
        year: end[0],
        month: end[1],
        day: end[2],
      }
      this.dateArr = this.defaultDate
    }
  },
  methods: {
    input() {
      const startDate = this.dateArr[0].toLocaleDateString().split("/")
      const endDate = this.dateArr[1].toLocaleDateString().split("/")
      this.star_date = {
        year: startDate[0],
        month: startDate[1],
        day: startDate[2],
      }
      this.end_date = {
        year: endDate[0],
        month: endDate[1],
        day: endDate[2],
      }
      this.$emit("dateChange", { starDate: this.star_date, endDate: this.end_date })
    },
    // 获取当前月份区间
    getCurrentTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      let monthEnd = null
      const thirtyOne = [12, 10, 8, 7, 5, 3]
      const thirty = [11, 9, 6, 4]
      if (thirtyOne.includes(Number(month))) {
        monthEnd = 31
      } else if (thirty.includes(Number(month))) {
        monthEnd = 30
      } else {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          monthEnd = 29
        } else {
          monthEnd = 28
        }
      }
      this.star_date = {
        year,
        month,
        day: "01",
      }
      this.end_date = {
        year,
        month,
        day: monthEnd,
      }
      this.dateArr = [`${year}-${month}-01`, `${year}-${month}-${monthEnd}`]
      this.$emit("dateChange", { starDate: this.star_date, endDate: this.end_date })
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./picker.less");
</style>
