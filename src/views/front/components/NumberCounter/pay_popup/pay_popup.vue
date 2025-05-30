<template>
  <el-dialog :visible.sync="isShow" :show-close="false" :before-close="handleClose">
    <div class="pc-popup_content" v-if="!isFrom">
      <!-- flow_path 流程 -->
      <div class="flow_path">
        <div class="confirm_order">
          <img src="../../assets/img/confirm order.png" alt="">
          <p :class="{color:processIdx===1}"><i v-show="processIdx===1"></i>Confirm Order</p>
        </div>
        <p class="line"></p>
        <div class="online_payment">
          <img src="../../assets/img/online payment.png" alt="">
          <p :class="{color:processIdx>1}"><i v-show="processIdx>1"></i>Online payment</p>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order_form" v-if="processIdx===1">
        <div class="order_message">
          <h1>$ {{order_data.order_price/100}}</h1>
          <div>
            <img src="../../assets/img/green cancel.png" alt="">
            <p>{{order_data.desc_3}}</p>
          </div>
          <div>
            <img src="../../assets/img/green cancel.png" alt="">
            <p>{{order_data.desc_4}}</p>
          </div>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay_manner" v-else-if="processIdx===2">
        <h3>Payment Method</h3>
        <ul class="choice_area">
          <li @click="selectPay('stripe')">
            <img :src="isManmer===1?require('../../assets/img/pitch on.png'):require('../../assets/img/Not selected.png')" alt="" class="icon_img_choice">
            <img src="../../assets/img/stripe.png" alt="" class="img_choice">
            <p>Stripe, Debit & Credit Card (Visa,MasterCard,UnionPay,JCB...)</p>
          </li>
          <li @click="selectPay('paypal')">
            <img :src="isManmer===2?require('../../assets/img/pitch on.png'):require('../../assets/img/Not selected.png')" alt="" class="icon_img_choice">
            <img src="../../assets/img/min paypal.png" alt="" class="img_choice_pay">
            <p>Paypal + Guest Credit Card Payments</p>
          </li>
          <li @click="selectPay('bition')">
            <img :src="isManmer===3?require('../../assets/img/pitch on.png'):require('../../assets/img/Not selected.png')" alt="" class="icon_img_choice">
            <img src="../../assets/img/bition.png" alt="" class="img_choice_pay">
            <p>Bitypay: crypto coins, such as Bitcoin,USDT,USDC,TRX</p>
          </li>
        </ul>
      </div>
      <!-- 支付 -->
      <div class="pay_result" v-if="processIdx===3&&isManmer===2">
        <img :src="payImgUrl[1]" alt="">
        <img src="../../assets/img/succeed cancel.png" alt="">
      </div>
      <!-- btn_sum -->
      <div class="btn_sum">
        <el-button @click="next" v-if="processIdx<3" :loading="btnLoading">next</el-button>
        <div id="paypal-button-container" v-if="processIdx>2&&isManmer===2">
          <!-- <p>loading....</p> -->
        </div>
      </div>
    </div>
    <form @submit.prevent="handleSubmit" v-else>
      <div class="stripe_logo">
        <img src="../../assets/img/stripe.png" alt="">
        <p>stripe</p>
      </div>
      <div id="pay" />
      <transition name="fade">
        <div v-show="isLoading" class="loading_pay">loading...</div>
      </transition>
      <el-button native-type="submit" id="submit" type="primary" round>
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </el-button>
    </form>
  </el-dialog>
</template>

<script>
import { platCustomerOrderPay, platPaymentOrderPaypal, platPaymentOrderPaypalApprove, platPaymentOrderBitpay } from '@/api/home'
import { loadStripe } from '@stripe/stripe-js'
import { loadScript } from '@paypal/paypal-js'
export default {
  name: 'PayPopup',
  props: {
    order_data: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      isShow: false,
      elements: null,
      stripe: null,
      isFrom: false,
      path: '',
      isLoading: true,
      // 订单ID
      paypal_order_id: null,
      // 支付方式
      isManmer: 1,
      // 支付步骤
      processIdx: 1,
      // 支付图片路径
      payImgUrl: [
        require('@/assets/img/stripe.png'),
        require('@/assets/img/paypal.png')
      ],
      btnLoading: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose (done) {
      this.isShow = false
      this.isFrom = false
      this.isManmer = 1
      this.processIdx = 1
    },
    // 支付
    async click_pay () {
      // console.log(this.order_data, 'this.order_data')
      const { data } = await platCustomerOrderPay({
        order_no: this.order_data.order_no
      })
      // 初始化
      this.isFrom = true
      this.btnLoading = false
      this.initStripe(data.client_secret)
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
      if (this.isManmer === 1 && this.processIdx === 2) {
        // stripe 支付
        this.click_pay()
        return
      } else if (this.isManmer === 3 && this.processIdx === 2) {
        // Bition 支付
        this.getBition()
        return
      }
      this.processIdx++
      if (this.processIdx === 3 && this.isManmer === 2) {
        // paypal 支付
        this.Paypal()
      }
      this.btnLoading = false
    },
    // 选择支付方式
    selectPay (type) {
      this.isManmer = type === 'stripe' ? 1 : type === 'paypal' ? 2 : type === 'bition' ? 3 : ''
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
