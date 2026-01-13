<template>
  <footer class="footer">
    <!-- serve -->
    <div class="serve box font-normal">
      <div class="container">
        <div class="nav column lg:flex">
          <!-- logo -->
          <div class="logo column sm:between lg:column gap-5">
            <div>
              <img src="@/assets/images/logo_white.webp" style="height: 36px" alt="" />
            </div>
            <div class="contact">
              <div class="column space-y-2">
                <strong class="white font-medium">{{ t("Contact_Us") }}</strong>
                <RouterLink to="mailto:support@ipstar.io" class="v_center space-x-2">
                  <Mail :size="16" class="leading-none" />
                  <p>support@ipstar.io</p>
                </RouterLink>
              </div>

              <div class="mt-4 column space-y-3">
                <strong class="white font-medium">{{ t("About_Us") }}</strong>

                <div class="v_center space-x-4 pay">
                  <a href="https://x.com/ipstar_proxy" class="pay-item v_center pointer hover:bg-slate-500">
                    <img height="25" src="@/assets/images/pay/twitter.svg" alt="" />
                  </a>
                  <div @click="openGT" class="pay-item v_center pointer hover:bg-slate-500">
                    <img height="25" src="@/assets/images/pay/telegram.svg" alt="" />
                  </div>
                </div>
              </div>

              <div class="v_center space-x-2 pay mt-4">
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/visa.svg" alt="" />
                </div>
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/mastercard.svg" alt="" />
                </div>
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/alipay.svg" alt="" />
                </div>
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/union.svg" alt="" />
                </div>
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/weixin.svg" alt="" />
                </div>
                <div class="pay-item v_center">
                  <img height="25" src="@/assets/images/pay/usdt.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 页面 -->
          <div class="flex-1 w-full flex gap-3 justify-between flex-wrap">
            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Products") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <RouterLink to="/product/residentail">{{ t("Residential_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/product/rotating">{{ t("Rotating_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/mobile-proxy">{{ t("Phone_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/unlimited-residential-proxy">{{ t("Unlimited_Residential_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/product/data_center">{{ t("Data_Center_Proxies") }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Price") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <RouterLink to="/pricing/residential">{{ t("Residential_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/pricing/unlimited">{{ t("Unlimited_Residential_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/pricing/mobile">{{ t("Phone_Proxies") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/pricing/data_center">{{ t("Data_Center_Proxies") }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Scenes") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <RouterLink to="/home/data_collection">{{ t("footer_spec.scene1") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/home/search_engine">{{ t("footer_spec.scene2") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/home/social_media">{{ t("footer_spec.scene3") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/home/bill">{{ t("footer_spec.scene4") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/home/ai_model">{{ t("footer_spec.scene5") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/home/market#scence">{{ t("footer_spec.scene6") }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Get_Help") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <RouterLink to="/doc">{{ t("footer_spec.document") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/help-center">{{ t("Help_Center") }}</RouterLink>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Resources") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <RouterLink to="/country">{{ t("Proxy_Location") }}</RouterLink>
                </li>
                <li class="pointer">
                  <a href="/blog">{{ t("Blog") }}</a>
                </li>
                <li class="pointer">
                  <RouterLink to="/proxy-checker">{{ t("Proxy_Detection_Tool") }}</RouterLink>
                </li>
                <li class="pointer">
                  <RouterLink to="/ipaddress">{{ t("IP_Lookup") }}</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="between policy text-sm">
          <div class="v_center space-x-3">
            <a href="/privacy.html">{{ t("Privacy_Policy") }}</a>
            <div class="split"></div>
            <a href="/terms.html">{{ t("Terms_of_Service") }}</a>
            <div class="split"></div>
            <a href="/refund.html">{{ t("Refund_Policy") }}</a>
          </div>

          <div v-if="en">@Copyright 2025 IPstar. All rights reserved.</div>
          <div v-else>© 版权所有 2025 IpStar。</div>
        </div>
      </div>
    </div>

    <IpDialog v-model="isQRcode" class="mask">
      <div class="mask_content space-y-5 column_center">
        <div class="image_box">
          <img src="@/assets/images/relation/tg.webp" alt="" />
        </div>
        <p class="font-semibold text-lg text-[#53845F] tracking-wider">@GLOBAL_IP_PROXY</p>
        <div class="close vh_center pointer transition-color black" @click="isQRcode = false">
          <CloseIcon :size="16" />
        </div>
      </div>
    </IpDialog>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router"
import loginStore from "@/store/login"
import { Sparkles } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import IpDialog from "@/components/dialog/index.vue"
import { isMobile } from "@/utils/tools"
import { Mail, X as CloseIcon } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import settingsStore from "@/store/setting"
import HomeTitle from "../homeTitle.vue"
import { useI18n } from "vue-i18n"
const { isLogin } = loginStore()
import { ref } from "vue"
import position from "@/components/dialog/position"

const router = useRouter()
const { t } = useI18n()
const { en } = settingsStore()

// 邮箱跳转
function gotoEmail() {
  window.open("mailto:support@ipstar.io")
}

// GT 二维码
const isQRcode = ref(false)
function openGT(e) {
  if (isMobile()) {
    window.open("https://t.me/global_ip_proxy")
  } else {
    position.set({ x: e.clientX, y: e.clientY })
    isQRcode.value = true
  }
}
</script>

<style lang="less" scoped>
@import url("./footer.less");
</style>
