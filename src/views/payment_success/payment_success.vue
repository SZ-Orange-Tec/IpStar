<template>
  <div class="pc-payment_success">
    <div class="sticky_note">
      <img src="../../assets/img/succeed cancel.png" alt="" />
      <h1>{{ $t("PCPaymentSuccess.h1") }}</h1>
      <div class="line"></div>
      <ul>
        <li>
          <span>{{ $t("PCPaymentSuccess.span[0]") }}： </span><span>${{ orderPrice / 100 }}</span>
        </li>
        <li>
          <span>{{ $t("PCPaymentSuccess.span[1]") }}： </span><span>{{ patternPayment }}</span>
        </li>
      </ul>
    </div>
    <el-button @click="drop_out">OK</el-button>
    <p>{{ $t("PCPaymentSuccess.p[0]") }} {{ num }} {{ $t("PCPaymentSuccess.p[1]") }}</p>

    <div class="mask column_center space-y-2" v-if="loading">
      <span class="ip-loading"></span>
      <p>To obtain payment results, please wait</p>
    </div>
  </div>
</template>

<script>
import { platCustomerOrdersCheckIsPaid } from "@/api/home"
import detect from "@/utils/detect"
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
        detect.payment({
          price: this.orderPrice,
          order: this.orderNo,
        })
        // 更新用户信息
        if (this.$store.state.user_info && !this.$store.state.user_info.is_purchase) {
          // 更新本地用户数据
          const info = await this.$store.dispatch("getUserInfo")
          // const info = this.$store.state.user_info
          this.$store.commit("setUserInfo", { ...info, is_purchase: true })
          localStorage.setItem("user_info", JSON.stringify({ ...info, is_purchase: true }))
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
      this.$store.commit("layout/setIsProduc", false)
      this.$router.push("/products")
    },
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
