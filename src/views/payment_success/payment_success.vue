<template>
  <div class="pc-payment_success">
    <div class="sticky_note">
      <img src="../../assets/img/succeed cancel.png" alt="" />
      <h1>{{ $t("Payment_successful") }}</h1>
      <div class="line"></div>
      <ul>
        <li>
          <span>{{ $t("Amount_paid") }}： </span><span>${{ orderPrice / 100 }}</span>
        </li>
        <li>
          <span>{{ $t("Way") }}： </span><span>{{ patternPayment }}</span>
        </li>
      </ul>
    </div>
    <el-button @click="drop_out">OK</el-button>
    <p>{{ $t("payment_spec.second1") }} {{ num }} {{ $t("payment_spec.second2") }}</p>

    <div class="mask column_center space-y-2" v-if="loading">
      <span class="ip-loading"></span>
      <p>To obtain payment results, please wait</p>
    </div>
  </div>
</template>

<script>
import { platCustomerOrdersCheckIsPaid } from "@/api/home"
import { track_payment } from "@/utils/detect"
import userStore from "@/store/user"
import layoutStore from "../../store/layout"
export default {
  name: "PaymentSuccess",
  data() {
    return {
      orderNo: null,
      orderPrice: null,
      patternPayment: null,
      // 定时器
      time: null,
      minTime: null,
      // 加载状态
      loading: false,
      num: 10,
      // 是否购买完成
      is_paid: false,
    }
  },
  created() {
    const { type, price, orderNo } = this.$route.query
    this.patternPayment = +type === 1 ? "Stripe" : +type === 2 ? "Paypal" : +type === 3 ? "USDT" : ""
    this.orderNo = orderNo
    this.orderPrice = price
    // 开始查询订单是否完成
    this.begin()
  },
  methods: {
    begin() {
      this.loading = true
      // 查询订单是否支付完成
      this.payment_order()
        .then(({ data }) => {
          this.time = setInterval(() => {
            if (this.is_paid) {
              clearInterval(this.time)
              return
            }
            this.payment_order()
          }, 5000)
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 查询订单是否完成
    async payment_order() {
      const res = await platCustomerOrdersCheckIsPaid({
        order_no: this.orderNo,
      })
      this.is_paid = res.data.is_paid
      if (res.data.is_paid) {
        track_payment({
          price: this.orderPrice,
          order: this.orderNo,
        })
        // 更新用户信息
        if (this.username && !this.isPurchase) {
          // 更新本地用户数据
          await this.updateUserInfo()
        }
        this.loading = false
        this.minTime = setInterval(() => {
          if (this.num === 0) {
            this.drop_out()
            return
          }
          this.num--
        }, 1000)
      }
      return res
    },
    // 确认退出
    drop_out() {
      this.isProduc = false
      this.$router.push("/products")
    },
  },
  setup() {
    const { username, is_purchase: isPurchase, updateUserInfo } = userStore()
    const { isProduc } = layoutStore()
    return {
      username,
      isPurchase,
      updateUserInfo,
      isProduc,
    }
  },
  // 销毁
  beforeDestroy() {
    clearInterval(this.minTime)
    // clearInterval(this.time)
  },
}
</script>

<style lang="less" scoped>
@import url("./payment_success.less");
</style>
