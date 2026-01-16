<template>
  <div>
    <IpDialog v-model="show" class="mask">
      <div class="mask_bck w-full md:max-w-[400px] xl:max-w-[440px] rounded relative p-2">
        <div class="mask_content bg-white h-full rounded column_center pt-10 pb-2 px-2">
          <h1 class="text-xl md:text-xl xl:text-2xl font-medium">{{ t("award_title") }}</h1>
          <div class="text-3xl md:text-5xl xl:text-6xl text-[#d355c7] mt-6">
            <strong class="text-5xl md:text-7xl xl:text-9xl font-medium">{{ newer_promotion.name_count }}</strong>
            <span class="font-semibold">{{ newer_promotion.name_unit }}</span>
          </div>
          <div class="text-2xl md:text-3xl xl:text-4xl mt-6 text-[#524499] flex items-end space-x-5 align-baseline">
            <span class="font-semibold">{{ t("Only") }}</span>
            <strong class="text-6xl md:text-7xl xl:text-9xl font-medium">${{ newer_promotion.price / 100 }}</strong>
          </div>
          <p class="underline mt-10 max-w-[360px] font-medium">
            {{ t("award_desc", { total: newer_promotion.residential_size, mobile: newer_promotion.mobile_size, days: newer_promotion.days }) }}
          </p>
          <IpButton @click="buyNewUserAward" type="primary" class="px-5 min-w-[180px] vh_center h-11 mt-6 !bg-[#524499]">{{ t("Buy_Now") }}</IpButton>
          <p class="text-[10px] mt-6">{{ t("award_tip") }}</p>
        </div>
        <div class="close vh_center pointer transition-color absolute right-3 md:-right-8 top-3 md:-top-8" @click="close">
          <CloseIcon :size="14" :strokeWidth="3.5" />
        </div>
      </div>
    </IpDialog>

    <!-- 支付弹窗 -->
    <teleport to="body">
      <PayPopup ref="payPopupRef" v-model="isPayPopup" :order_data="order_data">
        <template #detail>
          <div class="order_detail">
            <h2>{{ t("Order_detail") }}</h2>
            <ul class="detail" v-if="product.isAward">
              <li class="between">
                <span>{{ t("Name") }}</span>
                <span>{{ t("award_title") }}</span>
              </li>
              <li class="between">
                <span>{{ t("Traffic") }}</span>
                <span>
                  {{ t("Residential_Proxies") }} {{ newer_promotion.residential_size }}
                  +
                  {{ t("Phone_Proxies") }} {{ newer_promotion.mobile_size }}
                </span>
              </li>
              <li class="between">
                <span>{{ t("Duration") }}</span>
                <span>{{ t("Never_Expires") }}</span>
              </li>
              <!-- <li class="text-sm grey-60 translate-y-5" style="font-size: 14px">
                {{ t("award_desc", { total: newer_promotion.total_size, mobile: newer_promotion.mobile_size, days: newer_promotion.days }) }}
              </li> -->
              <li class="between">
                <span>{{ t("Total") }}</span>
                <span>${{ product?.price / 100 }}</span>
              </li>
            </ul>
            <div class="btn vh_center">
              <ip-button type="primary" class="px-3 h-10" @click="orderNewUserAward">
                <div class="v_center space-x-2">
                  <span class="ip-loading" v-if="loading"></span>
                  <span>{{ t("Submit") }}</span>
                </div>
              </ip-button>
            </div>
          </div>
        </template>
      </PayPopup>
    </teleport>
  </div>
</template>

<script setup>
import PayPopup from "../pay_popup/pay_popup.vue"
import IpDialog from "@/components/dialog/index.vue"
import IpButton from "@/components/button/button.vue"
import { X as CloseIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import layoutStore from "@/store/layout"
import { endOfToday } from "date-fns"
import { useRoute, useRouter } from "vue-router"
import Message from "@/components/message/message.js"
import loginStore from "@/store/login"
import { platNewUserAwardOrder } from "@/api/product"
import { ref } from "vue"

const { t } = useI18n()
const { newer_promotion } = layoutStore()
const { isLogin } = loginStore()

const show = defineModel()
function close() {
  show.value = false
  localStorage.setItem("award_new_user", endOfToday().getTime())
}

const router = useRouter()
const route = useRoute()
function toBuy() {
  close()
  if (isLogin.value) {
    const target = /\/overview|\/products|\/billings|\/proxy$|\/api|\/settings/.test(route.path) ? "/residential" : "/pricing/residential"
    router.push(target)
  } else {
    router.push("/login")
    Message({
      type: "info",
      message: t("login_first"),
    })
  }
}

// 新手奖励下单
const isPayPopup = ref(false)
const order_data = ref(null)
const payPopupRef = ref(null)
const product = ref(null)
const loading = ref(false)
function buyNewUserAward() {
  if (!isLogin.value) {
    router.push("/login")
    close()
    Message({
      type: "info",
      message: t("login_first"),
    })
    return
  }
  product.value = {
    isAward: true,
    code: newer_promotion.value.code,
    days: newer_promotion.value.days,
    pack_size: t("Residential_Proxies") + newer_promotion.value.residential_size + "+" + t("Phone_Proxies") + newer_promotion.value.mobile_size,
    price: newer_promotion.value.price,
  }
  isPayPopup.value = true
}
async function orderNewUserAward() {
  try {
    loading.value = true
    const { data } = await platNewUserAwardOrder({
      pcode: product.value.code,
    })
    order_data.value = {
      order_no: data.order_no,
      order_price: data.order_price,
      order_usdt_price: data.order_usdt_price,
      desc_3: product.value.pack_size,
      desc_4: "",
    }
    payPopupRef.value.toggleDetail(false)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.mask {
  background-color: hsl(var(--dialog-wrap) / 40%) !important;
  ::v-deep .dialog_container {
    margin: 15vh auto;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mask_bck {
    background-color: #a993f9;
    // border: 6px solid #a993f9;
    // border-top-width: 16px;
    // border-left-width: 16px;

    .mask_content {
      position: relative;
      // left: -10px;
      // top: -10px;
    }

    .close {
      margin-top: 0;
      width: 26px;
      height: 26px;
      border-radius: 15px;
      color: #a993f9;
      font-weight: bold;
      z-index: 1;
      border: 3px solid #a993f9;
      &:hover {
        color: #fff;
        background-color: #a993f9;
      }
    }
  }
}
</style>

<style lang="less">
.order_detail {
  // padding: 0 80px;
  & > h2 {
    font-size: 18px;
    font-weight: bold;
  }
  & > .detail {
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    border-radius: 8px;

    & > li {
      width: 100%;
      font-size: 15px;
      span.orange {
        color: #fc7f46;
      }
      span.grey {
        color: hsl(var(--foreground) / 30%);
      }
    }
    & > li + li {
      margin-top: 20px;
    }
    & > li:last-child {
      margin-top: 30px;
      padding: 30px 0 10px;
      border-top: 1px solid #eee;
      & > span:last-child {
        color: #fd550a;
        font-size: 17px;
        i {
          font-size: 15px;
          font-weight: 400;
          text-decoration: line-through;
          color: #666;
        }
      }
    }
  }
  & > .btn {
    padding-top: 20px;
    .el-button {
      height: 40px;
      padding: 0 40px;
      background-color: #f4b121;
      color: #fff;
      border: none;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
