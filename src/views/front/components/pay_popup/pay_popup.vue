<template>
  <ip-dialog v-model="isShow" class="pay_popup">
    <template #default="{ close }">
      <div class="container">
        <div class="pc-popup_content" v-if="!isFrom">
          <!-- 订单详情 -->
          <div v-if="isDetail">
            <slot name="detail"></slot>
          </div>

          <!-- 下单支付 -->
          <div class="order_buy" v-else>
            <!-- 产品信息 -->
            <div class="product_message" v-if="processIdx === 1">
              <h1>$ {{ order_data.order_price / 100 }}</h1>
              <p>{{ order_data.desc_3 }}</p>
              <p>{{ order_data.desc_4 }}</p>
            </div>
            <!-- 支付方式 -->
            <div class="pay_manner" v-if="processIdx === 1">
              <ul class="choice_area">
                <li @click="selectPay('stripe')">
                  <img v-if="isManmer === 1" src="@/assets/img/pitch on.png" alt="" class="icon_img_choice" />
                  <img v-else src="@/assets/img/Not selected.png" alt="" class="icon_img_choice" />
                  <img src="@/assets/img/stripe.png" alt="" class="img_choice" />
                  <p>{{ $t("payPopup_spec.strip") }}</p>
                </li>
                <li @click="selectPay('coingate')">
                  <img v-if="isManmer === 3" src="@/assets/img/pitch on.png" alt="" class="icon_img_choice" />
                  <img v-else src="@/assets/img/Not selected.png" alt="" class="icon_img_choice" />
                  <img src="@/assets/img/taida.png" alt="" class="img_coingate_pay" />
                  <p>{{ $t("payPopup_spec.usdt") }}</p>
                </li>
              </ul>
              <p class="whitespace-pre-wrap">{{ $t("payPopup_spec.tip") }}</p>
            </div>
            <!-- paypal支付 -->
            <div class="pay_result" v-if="processIdx === 2 && isManmer === 2">
              <img src="@/assets/img/paypal.png" alt="" />
              <img src="@/assets/img/succeed cancel.png" alt="succeed cancel" />
            </div>
            <!-- USDT支付 -->
            <div class="usdt_result" v-if="processIdx === 2 && isManmer === 3">
              <p class="title">{{ $t("payPopup_spec.usdt1") }}</p>
              <p class="des">{{ $t("payPopup_spec.usdt2") }}</p>
              <div class="wallet">{{ $t("payPopup_spec.usdt3") }}</div>
              <img :src="usdtInfo?.pay_img_url" alt="" />
              <strong>USDT-TRC20</strong>
              <span class="tip">*{{ $t("payPopup_spec.usdt4") }}</span>
              <p class="split"></p>
              <div class="info">
                <p>
                  <strong>{{ $t("payPopup_spec.usdt5") }}</strong>
                </p>
                <div class="text">{{ order_data.order_usdt_price }} USDT</div>
                <p>
                  <strong>{{ $t("payPopup_spec.usdt6") }}</strong>
                </p>
                <div class="text">{{ usdtInfo?.address }}</div>
              </div>
              <div class="loading" v-if="showProcess">
                <h1>{{ $t("payPopup_spec.usdt7") }}</h1>
                <p>
                  {{ $t("payPopup_spec.usdt8") }}<br />
                  {{ $t("payPopup_spec.usdt9") }} <strong>{{ $t("payPopup_spec.usdt10") }}</strong>
                </p>
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
                  <p class="percent">{{ percent }}%</p>
                </div>
                <p class="footer">{{ $t("payPopup_spec.usdt11") }}</p>
              </div>
            </div>
            <!-- btn_sum -->
            <div class="btn_sum">
              <ip-button type="primary" class="px-5 h-10" @click="next" v-if="processIdx === 1">
                <div class="v_center space-x-2">
                  <span class="ip-loading" v-if="btnLoading"></span>
                  <span>{{ $t("Next") }}</span>
                </div>
              </ip-button>
              <div id="paypal-button-container" v-if="processIdx === 2 && isManmer === 2">
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
            <img src="@/assets/img/stripe.png" alt="" />
            <p>stripe</p>
          </div>
          <div id="pay" />
          <transition name="fade">
            <div v-show="isLoading" class="loading_pay">loading...</div>
          </transition>
        </form>

        <div class="close vh_center pointer transition-color" @click="isShow = false">
          <CloseIcon :size="16" />
        </div>
      </div>
    </template>
  </ip-dialog>
</template>

<script setup>
import {
  platCustomerOrderPay,
  platPaymentOrderPaypal,
  platPaymentOrderPaypalApprove,
  platPaymentOrderBitpay,
  platPaymentOrderTronUSDT,
  platCheckTronTransaction,
  platCustomerOrdersCheckIsPaid,
  platPaymentStripe,
} from "@/api/home"
import { loadStripe } from "@stripe/stripe-js"
import { loadScript } from "@paypal/paypal-js"
import detect from "@/utils/detect"
import { debounce } from "@/utils/tools"
import IpDialog from "@/components/dialog/index.vue"
import { X as CloseIcon } from "lucide-vue-next"
import { ref, computed, watch, onMounted, nextTick } from "vue"
import { useRouter } from "vue-router"
import IpButton from "@/components/button/button.vue"
import settingStore from "@/store/setting.js"

const router = useRouter()
const { en } = settingStore()

// Props
const props = defineProps({
  order_data: {
    type: Object,
    default: () => ({}),
  },
})
const isShow = defineModel({ type: Boolean })

// 响应式状态
const path = ref(window.location.href.split("#")[0])
const isDetail = ref(true)
const elements = ref(null)
const stripe = ref(null)
const isFrom = ref(false)
const isLoading = ref(true)
const paypal_order_id = ref(null)
const isManmer = ref(1)
const processIdx = ref(1)
const usdtInfo = ref({})
const dashoffset = ref(0)
const showProcess = ref(false)
const btnLoading = ref(false)
const is_paid = ref(false)
const endTime = ref(null)

// 计算属性
const strokeOffset = computed(() => {
  return dashoffset.value < 1 ? 236.9 : 19.9 * (12 - dashoffset.value)
})

const percent = computed(() => {
  return Math.round((dashoffset.value / 12) * 100)
})

// 方法
function handleClose() {
  isShow.value = false
  isFrom.value = false
  isManmer.value = 1
  processIdx.value = 1
}

async function stripeCheck() {
  try {
    const pre = /www/.test(location.href) ? "has" : "no"
    const orderNo = props.order_data.order_no
    const price = props.order_data.order_price
    const type = isManmer.value
    const origin =
      process.env.NODE_ENV === "production"
        ? "https://www." + location.host.replace("www.", "") + "/stripe.html"
        : "https://test.tomato-proxy.com/stripe.html"

    const successUrl = `${origin}?pre=${pre}&orderNo=${orderNo}&type=${type}&price=${price}`

    const { data } = await platPaymentStripe({
      order_no: props.order_data.order_no,
      success_url: successUrl,
      cancel_url: location.href,
    })
    if (data.pay_url) {
      window.location.href = data.pay_url
    } else {
      Message({
        type: "warning",
        message: en.value ? "Connect Scripe Error" : "连接 Scripe 错误",
      })
    }
  } catch (err) {
    console.log(err)
  }
}

function openWindow(url) {
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth
  const targetW = Math.min(windowWidth, 600)
  const targetH = Math.min(windowHeight, 700)
  const left = windowWidth - targetW > 0 ? Math.floor((windowWidth - targetW) / 2) : windowWidth
  const top = windowHeight - targetH > 0 ? Math.floor((windowHeight - targetH) / 2) : windowHeight
  const a = document.createElement("a")
  a.href = "javascript:void(0)"
  a.style = "display:none"
  a.onclick = () => {
    window.open(url, "Stripe", `width=${targetW}, height=${targetH},left=${left},top=${top}`)
  }
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    a.remove()
  }, 1000)

  const stripeSuccess = debounce((event) => {
    if (event.data.from === "stripe") {
      checkOrder()
      payState.value = "waiting"
      isShow.value = false
      showSuccess.value = true
      window.onmessage = () => {}
    }
  }, 500)
  window.onmessage = stripeSuccess
}

async function click_pay() {
  try {
    const { data } = await platCustomerOrderPay({
      order_no: props.order_data.order_no,
    })
    isFrom.value = true
    btnLoading.value = false
    initStripe(data.client_secret)
  } catch {
    btnLoading.value = false
  }
}

async function initStripe(clientSecret) {
  const stripeInstance = await loadStripe(import.meta.env.VITE_SECRET_KEY)
  stripe.value = stripeInstance

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow: "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
    labels: "floating",
    locale: "auto",
  }

  elements.value = stripe.value.elements({ clientSecret, appearance })
  const paymentElement = elements.value.create("payment", {
    layout: {
      type: "accordion",
    },
  })
  paymentElement.mount("#pay")

  const dom = document.querySelector("iframe")
  dom.onload = () => {
    setTimeout(() => {
      isLoading.value = false
    }, 0)
  }
}

async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)
  const { error } = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: `${path.value}payment_success?price=${props.order_data.order_price}&orderNo=${props.order_data.order_no}&type=${isManmer.value}`,
    },
  })

  if (error.type === "card_error" || error.type === "validation_error") {
    Message({
      type: "warning",
      message: error.message,
    })
  } else {
    Message({
      type: "warning",
      message: "An unexpected error occurred.",
    })
  }
  setLoading(false)
}

function setLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#submit").disabled = true
    document.querySelector("#spinner").classList.remove("hidden")
    document.querySelector("#button-text").classList.add("hidden")
  } else {
    document.querySelector("#submit").disabled = false
    document.querySelector("#spinner").classList.add("hidden")
    document.querySelector("#button-text").classList.remove("hidden")
  }
}

function Paypal() {
  loadScript({ "client-id": import.meta.env.VITE_SECRET_PAYPAL }).then((Paypal) => {
    Paypal.Buttons({
      createOrder,
      onApprove,
    }).render("#paypal-button-container")
  })
}

function createOrder() {
  return platPaymentOrderPaypal({
    order_no: props.order_data.order_no,
  }).then(({ data }) => {
    paypal_order_id.value = data.paypal_order_id
    return data.paypal_order_id
  })
}

function onApprove(data, actions) {
  return platPaymentOrderPaypalApprove({
    paypal_order_id: paypal_order_id.value,
  }).then((orderData) => {
    const errorDetail = Array.isArray(orderData.details) && orderData.details[0]
    if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
      return actions.restart(`${path.value}#/billings`)
    }
    if (errorDetail) {
      let msg = "Sorry, your transaction could not be processed."
      if (errorDetail.description) msg += "\n\n" + errorDetail.description
      if (orderData.debug_id) msg += " (" + orderData.debug_id + ")"
      return Message({
        message: msg,
        type: "warning",
      })
    }
    router.push(`/payment_success?price=${props.order_data.order_price}&orderNo=${props.order_data.order_no}&type=${isManmer.value}`)
    handleClose()
  })
}

function next() {
  btnLoading.value = true
  detect.createOrder()
  if (isManmer.value === 1 && processIdx.value === 1) {
    stripeCheck()
    return
  }
  processIdx.value++
  if (processIdx.value === 2 && isManmer.value === 2) {
    Paypal()
  } else if (processIdx.value === 2 && isManmer.value === 3) {
    getCoingate()
    nextTick(() => {
      checkIsQrcode()
    })
  }
  btnLoading.value = false
}

async function checkIsQrcode() {
  try {
    const { data } = await platCheckTronTransaction({
      order_no: props.order_data.order_no,
    })
    if (!isShow.value) return
    if (data.matched) {
      showProcess.value = true
      setTimeout(() => {
        stepProcess()
      }, 5000)
    } else {
      setTimeout(() => {
        checkIsQrcode()
      }, 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

async function checkIsPay() {
  try {
    const { data } = await platCustomerOrdersCheckIsPaid({
      order_no: props.order_data.order_no,
    })
    if (!isShow.value) return
    if (data.is_paid) {
      is_paid.value = true
      if (dashoffset.value === 11 && endTime.value) {
        const space = Date.now() - endTime.value
        const delay = 5000 - space > 0 ? 10000 - space : 0
        endTime.value = null
        setTimeout(() => {
          stepProcess()
        }, delay)
      }
    } else {
      setTimeout(() => {
        checkIsPay()
      }, 1500)
    }
  } catch (err) {
    console.log(err)
  }
}

function stepProcess() {
  dashoffset.value += 1
  if (dashoffset.value === 10) {
    checkIsPay()
  }
  if (dashoffset.value === 11 && !is_paid.value) {
    endTime.value = Date.now()
    return
  }
  if (dashoffset.value === 12) {
    showProcess.value = false
    detect.payment({
      price: props.order_data.order_usdt_price * 100,
      currency: "USD",
      order: props.order_data.order_no,
    })
    router.push(`/payment_success?price=${props.order_data.order_usdt_price * 100}&orderNo=${props.order_data.order_no}&type=${isManmer.value}`)
  }
  if (dashoffset.value < 12) {
    setTimeout(() => {
      stepProcess()
    }, 5000)
  }
}

function selectPay(type) {
  if (type === "stripe") {
    isManmer.value = 1
  } else if (type === "paypal") {
    isManmer.value = 2
  } else if (type === "coingate") {
    isManmer.value = 3
  }
}

function getBition() {
  platPaymentOrderBitpay({
    order_no: props.order_data.order_no,
  })
    .then(({ data }) => {
      window.open(data.pay_url)
      handleClose()
    })
    .finally(() => {
      btnLoading.value = false
    })
}

async function getCoingate() {
  try {
    const { data } = await platPaymentOrderTronUSDT({
      order_no: props.order_data.order_no,
    })
    usdtInfo.value = Object.freeze(data)
  } catch (err) {
    console.log(err)
  }
}

defineExpose({
  toggleDetail: (value) => {
    isDetail.value = value
  },
})
// 监听
// watch(
//   () => isShow.value,
//   (val) => {
//     if (!val) return
//     path.value = window.location.href.split("#")[0]
//   }
// )
</script>

<style lang="less" scoped>
@import url("./pay_popup.less");
.fade-leave {
  opacity: 0.8;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
}
</style>
