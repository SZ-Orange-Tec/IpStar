<template>
  <IpDialog v-model="isShow">
    <div class="pc-popup_content" v-if="!isFrom">

      <!-- 订单详情 -->
      <div v-if="this.isDetail">
        <slot name="detail"></slot>
      </div>

      <!-- 下单支付 -->
      <div class="order_buy" v-else>
        <!-- 产品信息 -->
        <div class="product_message" v-if="processIdx===1">
          <h1>$ {{order_data.order_price/100}}</h1>
          <p>{{order_data.desc_3}}</p>
          <p>{{order_data.desc_4}}</p>
        </div>
        <!-- 支付方式 -->
        <div class="pay_manner" v-if="processIdx===1">
          <ul class="choice_area">
            <li @click="selectPay('stripe')">
              <img v-if="isManmer===1" src="@/assets/img/pitch on.png" alt="" class="icon_img_choice">
              <img v-else src="@/assets/img/Not selected.png"  alt="" class="icon_img_choice">
              <img src="@/assets/img/stripe.png" alt="" class="img_choice">
              <p>{{$t('PCPayPopup.choiceArea[0]')}}</p>
            </li>
            <li @click="selectPay('coingate')">
              <img v-if="isManmer===3" src="@/assets/img/pitch on.png" alt="" class="icon_img_choice">
              <img v-else src="@/assets/img/Not selected.png" alt="" class="icon_img_choice">
              <img src="@/assets/img/taida.png" alt="" class="img_coingate_pay">
              <p>{{$t('PCPayPopup.choiceArea[3]')}}</p>
            </li>
          </ul>
          <p>{{$t('PCPayPopup.p')}}</p>
        </div>
        <!-- paypal支付 -->
        <div class="pay_result" v-if="processIdx===2&&isManmer===2">
          <img src="@/assets/img/paypal.png" alt="">
          <img src="@/assets/img/succeed cancel.png" alt="succeed cancel">
        </div>
        <!-- USDT支付 -->
        <div class="usdt_result" v-if="processIdx===2&&isManmer===3">
          <p class="title">{{$t('PCPayPopup.usdt[0]')}}</p>
          <p class="des">{{$t('PCPayPopup.usdt[1]')}}</p>
          <div class="wallet">{{$t('PCPayPopup.usdt[2]')}}</div>
          <img :src="usdtInfo?.pay_img_url" alt="">
          <strong>USDT-TRC20</strong>
          <span class="tip">*{{$t('PCPayPopup.usdt[3]')}}</span>
          <!-- <p class="split">{{$t('PCPayPopup.usdt[4]')}}</p> -->
          <p class="split"></p>
          <div class="info">
            <p>
              <strong>{{$t('PCPayPopup.usdt[5]')}}</strong>
            </p>
            <div class="text">{{ order_data.order_usdt_price }} USDT</div>
            <p>
              <strong>{{$t('PCPayPopup.usdt[6]')}}</strong>
            </p>
            <div class="text">{{ usdtInfo?.address }}</div>
          </div>
          <div class="loading" v-if="showProcess">
            <h1>{{$t('PCPayPopup.usdt[7]')}}</h1>
            <p>{{$t('PCPayPopup.usdt[8]')}}<br /> {{$t('PCPayPopup.usdt[9]')}} <strong>{{$t('PCPayPopup.usdt[10]')}}</strong></p>
            <div class="process">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="myGradient">
                    <stop offset="50%" stop-color="#dbe3fe" />
                    <stop offset="100%" stop-color="#fff" />
                  </linearGradient>
                </defs>
                <circle class="bck_circle" cx="50" cy="50" r="38"></circle>
                <circle class="pro_circle" cx="50" cy="50" r="38" :stroke-dashoffset="strokeOffset"></circle>
                <circle class="bor_circle" cx="50" cy="50" r="30" stroke="url(#myGradient)"></circle>
              </svg>
              <p class="percent">{{percent}}%</p>
            </div>
            <p class="footer">{{$t('PCPayPopup.usdt[11]')}}</p>
          </div>
        </div>
        <!-- btn_sum -->
        <div class="btn_sum">
          <!-- <el-button @click="next" v-if="processIdx===1" :loading="btnLoading">{{$t('PCPayPopup.btnTxt')}}</el-button> -->
          <div id="paypal-button-container" v-if="processIdx===2&&isManmer===2">
            <!-- <p>loading....</p> -->
          </div>
        </div>
      </div>

      <!-- close -->
      <div class="close vh_center pointer" @click="handleClose">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <!-- stripe支付 -->
    <form @submit.prevent="handleSubmit" v-else>
      <div class="stripe_logo">
        <img src="@/assets/img/stripe.png" alt="">
        <p>stripe</p>
      </div>
      <div id="pay" />
      <transition name="fade">
        <div v-show="isLoading" class="loading_pay">loading...</div>
      </transition>
      <!-- <el-button native-type="submit" id="submit" type="primary" round>
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">{{$t('PCPayPopup.btnTxtTwo')}}</span>
      </el-button> -->
    </form>
  </IpDialog>
</template>

<script>
import { platCustomerOrderPay, platPaymentOrderPaypal, platPaymentOrderPaypalApprove, platPaymentOrderBitpay, platPaymentOrderTronUSDT, platCheckTronTransaction, platCustomerOrdersCheckIsPaid, platPaymentStripe } from '@/api/home'
import { loadStripe } from '@stripe/stripe-js'
import { loadScript } from '@paypal/paypal-js'
import detect from '@/utils/detect'
import { debounce } from '@/utils/tools'
import IpDialog from "@/components/dialog/index.vue"
export default {
  name: 'PayPopup',
  props: {
    order_data: {
      type: Object,
      default: () => { }
    }
  },
  components:{
    IpDialog
  },
  data () {
    this.path = ''
    return {
      // 订单详情
      isDetail: true,
      isShow: false,
      elements: null,
      stripe: null,
      isFrom: false,

      isLoading: true,
      // 订单ID
      paypal_order_id: null,
      // 支付方式
      isManmer: 1,
      // 支付步骤
      processIdx: 1,
      // USDT
      usdtInfo: {},
      // 环形进度数
      dashoffset: 0,
      // 是否展示环形进度条
      showProcess: false,
      btnLoading: false
    }
  },
  computed: {
    strokeOffset ({ dashoffset }) {
      return dashoffset < 1 ? 236.9 : 19.9 * (12 - dashoffset)
    },
    percent () {
      return Math.round(this.dashoffset / 12 * 100)
    }
  },
  methods: {
    // 发起stripe网页支付
    async stripeCheck () {
      try {
        const pre = /www/.test(location.href) ? 'has' : 'no'
        const orderNo = this.order_data.order_no
        const price = this.order_data.order_price
        const type = this.isManmer
        const origin = process.env.NODE_ENV === 'production' ? 'https://www.' + location.host.replace('www.', '') + '/stripe.html' : 'https://test.tomato-proxy.com/stripe.html'

        const successUrl = `${origin}?pre=${pre}&orderNo=${orderNo}&type=${type}&price=${price}`

        const { data } = await platPaymentStripe({
          order_no: this.order_data.order_no,
          success_url: successUrl,
          cancel_url: location.href
        })
        if (data.pay_url) {
          window.location.href = data.pay_url
          // this.openWindow(data.pay_url)
        } else {
          this.$message.error('Connect Scripe Error')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 打开窗口
    openWindow (url) {
      // window.open(url, '_blank')
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth
      const targetW = Math.min(windowWidth, 600)
      const targetH = Math.min(windowHeight, 700)
      const left = windowWidth - targetW > 0 ? Math.floor((windowWidth - targetW) / 2) : windowWidth
      const top = windowHeight - targetH > 0 ? Math.floor((windowHeight - targetH) / 2) : windowHeight
      const a = document.createElement('a')
      a.href = 'javascript:void(0)'
      a.style = 'display:none'
      a.onclick = () => {
        window.open(url, 'Stripe', `width=${targetW}, height=${targetH},left=${left},top=${top}`)
      }
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        a.remove()
      }, 1000)
      this.stripeSuccess = debounce((event) => {
        if (event.data.from === 'stripe') {
          this.checkOrder()
          this.payState = 'waiting'
          this.isShow = false
          this.showSuccess = true
          window.onmessage = () => { }
        }
      }, 500)
      // window.addEventListener('message', this.stripeSuccess)
      window.onmessage = this.stripeSuccess
    },
    // 关闭弹窗
    handleClose (done) {
      this.isShow = false
      this.isFrom = false
      this.isManmer = 1
      this.processIdx = 1
    },
    // 支付
    async click_pay () {
      try {
        const { data } = await platCustomerOrderPay({
          order_no: this.order_data.order_no
        })
        // 初始化
        this.isFrom = true
        this.btnLoading = false
        this.initStripe(data.client_secret)
      } catch {
        this.btnLoading = false
      }
    },
    // 初始化
    async initStripe (clientSecret) {
      // 初始化stripe
      // 密钥
      const stripe = await loadStripe(process.env.VUE_APP_SECRET_KEY) // 环境变量
      this.stripe = stripe
      const appearance = {
        theme: 'flat',
        variables: {
          fontFamily: ' "Gill Sans", sans-serif',
          fontLineHeight: '1.5',
          borderRadius: '10px',
          colorBackground: '#F6F8FA',
          colorPrimaryText: '#262626'
        },
        rules: {
          '.Block': {
            backgroundColor: 'var(--colorBackground)',
            boxShadow: 'none',
            padding: '12px'
          },
          '.Input': {
            padding: '12px'
          },
          '.Input:disabled, .Input--invalid:disabled': {
            color: 'lightgray'
          },
          '.Tab': {
            padding: '10px 12px 8px 12px',
            border: 'none'
          },
          '.Tab:hover': {
            border: 'none',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
          },
          '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
          },
          '.Label': {
            fontWeight: '500'
          }
        },
        labels: 'floating',
        locale: 'auto'
      }
      // console.log(stripe, 'stripe')
      // stripe.updatePaymentIntent({
      //   amount: 1099,
      //   currency: 'usd',
      //   setup_future_usage: 'off_session'
      // })
      this.elements = stripe.elements({ clientSecret, appearance })
      const paymentElement = this.elements.create('payment', {
        layout: {
          type: 'accordion' // accordion&&tabs
        }
        // paymentMethodOrder: []
        // defaultValues: {
        //   billingDetails: {
        //     name: '张三',
        //     email: 'whlvue@163.com',
        //     address: {
        //       line1: '中国',
        //       line2: '广东省',
        //       city: '深圳市',
        //       country: '中国'
        //     }
        //   }
        // }
      })
      paymentElement.mount('#pay')
      // 优化首次加载时间过长
      const dom = document.querySelector('iframe')
      dom.onload = () => {
        setTimeout(() => {
          this.isLoading = false
        }, 0)
      }
    },
    // 购买跳转
    async handleSubmit (e) {
      e.preventDefault()
      this.setLoading(true)
      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // 请确保将此更改为您的支付完成页面
          return_url: `${this.path}#/payment_success?price=${this.order_data.order_price}&orderNo=${this.order_data.order_no}&type=${this.isManmer}`
        }
        // https://localhost
      })
      // console.log(error)
      /*
          只有当出现即时错误时，才会到达这一点
          确认付款。否则，您的客户将被重定向到
          你的“return_url”。对于一些像iDEAL这样的支付方式，你的客户会
          首先重定向到一个中间站点，然后授权支付
          重定向到' return_url '
        */
      if (error.type === 'card_error' || error.type === 'validation_error') {
        console.log(error.message, 'error')
        this.$message({
          message: error.message,
          type: 'error'
        })
      } else {
        this.$message({
          message: 'An unexpected error occurred.',
          type: 'error'
        })
      }
      this.setLoading(false)
    },
    // 显示付款提交上的旋转器
    setLoading (isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector('#submit').disabled = true
        document.querySelector('#spinner').classList.remove('hidden')
        document.querySelector('#button-text').classList.add('hidden')
      } else {
        document.querySelector('#submit').disabled = false
        document.querySelector('#spinner').classList.add('hidden')
        document.querySelector('#button-text').classList.remove('hidden')
      }
    },
    // 发起paypal 支付
    Paypal () {
      loadScript({ 'client-id': process.env.VUE_APP_SECRET_PAYPAL }).then((Paypal) => {
        Paypal.Buttons({
          createOrder: this.createOrder,
          onApprove: this.onApprove
        }).render('#paypal-button-container')
      })
    },
    // 调用服务器设置支付
    createOrder (data, actions) {
      return platPaymentOrderPaypal({
        order_no: this.order_data.order_no
      }).then(({ data }) => {
        this.paypal_order_id = data.paypal_order_id
        return data.paypal_order_id
      })
    },
    // 调用服务器来完成支付
    onApprove (data, actions) {
      return platPaymentOrderPaypalApprove({
        paypal_order_id: this.paypal_order_id
      }).then((orderData) => {
        // 三种情况需要处理:
        // (1)可恢复的instrumentation . declined ->调用动作.restart()
        // (2)其他不可恢复错误->显示失败消息
        // (3)交易成功->显示确认或谢谢
        // 此示例读取从服务器传播的v2/checkout/orders捕获响应
        // 你可以为你的'orderData'使用不同的API或结构
        const errorDetail = Array.isArray(orderData.details) && orderData.details[0]
        if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
          return actions.restart(`${this.path}#/billings`) // 可恢复状态，每:
          // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
        }
        if (errorDetail) {
          let msg = 'Sorry, your transaction could not be processed.'
          if (errorDetail.description) msg += '\n\n' + errorDetail.description
          if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')'
          return this.$message({
            message: msg,
            type: 'error'
          }) // 显示失败消息(尽量避免在生产环境中发出警报)
        }
        // 成功捕获!为了演示目的:
        // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2))
        this.$router.push(`/payment_success?price=${this.order_data.order_price}&orderNo=${this.order_data.order_no}&type=${this.isManmer}`)
        // 关闭支付弹出层
        this.handleClose()
        // 替换上面的内容以在页面中显示成功信息。
        // const element = document.getElementById('paypal-button-container');

        // 元素。innerHTML = ";

        // 元素。innerHTML = '<h3>谢谢您的付款!</h3>';

        // 或者转到另一个URL: actions.redirect(' thank_u .html');
      })
    },
    // 下一步
    next () {
      this.btnLoading = true
      detect.createOrder()
      if (this.isManmer === 1 && this.processIdx === 1) {
        // stripe 支付
        // this.click_pay()
        this.stripeCheck()
        return
      }
      this.processIdx++
      if (this.processIdx === 2 && this.isManmer === 2) {
        // paypal 支付
        this.Paypal()
      } else if (this.processIdx === 2 && this.isManmer === 3) {
        // coingate 支付
        this.getCoingate()
        this.$nextTick(() => {
          this.checkIsQrcode()
        })
      }
      this.btnLoading = false
    },
    async checkIsQrcode () {
      try {
        const { data } = await platCheckTronTransaction({
          order_no: this.order_data.order_no
        })
        if (!this.isShow) return
        if (data.matched) {
          this.showProcess = true
          setTimeout(() => {
            this.stepProcess()
          }, 5000)
        } else {
          setTimeout(() => {
            this.checkIsQrcode()
          }, 3000)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async checkIsPay () {
      try {
        const { data } = await platCustomerOrdersCheckIsPaid({
          order_no: this.order_data.order_no
        })
        if (!this.isShow) return
        if (data.is_paid) {
          this.is_paid = true
          if (this.dashoffset === 11 && this.endTime) {
            const space = Date.now() - this.endTime
            const delay = 5000 - space > 0 ? 10000 - space : 0
            this.endTime = null
            setTimeout(() => {
              this.stepProcess()
            }, delay)
          }
        } else {
          setTimeout(() => {
            this.checkIsPay()
          }, 1500)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 环形进度条
    stepProcess () {
      this.dashoffset += 1
      if (this.dashoffset === 10) {
        this.checkIsPay()
      }
      if (this.dashoffset === 11 && !this.is_paid) {
        this.endTime = Date.now()
        return
      }
      if (this.dashoffset === 12) {
        this.showProcess = false
        detect.payment({
          price: this.order_data.order_usdt_price * 100,
          currency: 'USD',
          order: this.order_data.order_no
        })
        this.$router.push(`/payment_success?price=${this.order_data.order_usdt_price * 100}&orderNo=${this.order_data.order_no}&type=${this.isManmer}`)
      }
      if (this.dashoffset < 12) {
        setTimeout(() => {
          this.stepProcess()
        }, 5000)
      }
    },
    // 选择支付方式
    selectPay (type) {
      if (type === 'stripe') {
        this.isManmer = 1
      } else if (type === 'paypal') {
        this.isManmer = 2
      } else if (type === 'coingate') {
        this.isManmer = 3
      }
    },
    // 发起Bition 支付
    getBition () {
      platPaymentOrderBitpay({
        order_no: this.order_data.order_no
      }).then(({ data }) => {
        window.open(data.pay_url)
        // 关闭弹出层
        this.handleClose()
      }).finally(() => {
        this.btnLoading = false
      })
    },
    // 发起coingate 支付
    async getCoingate () {
      try {
        const { data } = await platPaymentOrderTronUSDT({
          order_no: this.order_data.order_no
        })
        this.usdtInfo = Object.freeze(data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    isShow (val) {
      if (!val) return
      this.path = window.location.href.split('#')[0]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./pay_popup.less');
.fade-leave {
  opacity: 0.8;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
  // transform: translateY(-50px);
}
</style>
