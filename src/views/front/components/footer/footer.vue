<template>
  <footer class="footer">
    <!-- serve -->
    <div class="serve box font-normal">
      <div class="container">
        <div class="nav column lg:flex">
          <div class="logo between lg:column gap-10">
            <div>
              <img src="@/assets/images/logo_white.png" alt="" />
            </div>
            <div class="contact space-y-1">
              <strong class="white font-medium">{{ t("Contact_Us") }}</strong>
              <a href="mailto:support@ipstar.io" class="v_center space-x-2">
                <Mail :size="16" class="leading-none" />
                <p>support@ipstar.io</p>
              </a>
            </div>
          </div>

          <div class="flex-1 w-full flex justify-between flex-wrap">
            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Products") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <a href="/product/residentail">{{ t("Residential_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/product/rotating">{{ t("Rotating_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/mobile-proxy">{{ t("Phone_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/unlimited-residential-proxy">{{ t("Unlimited_Residential_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/product/data_center">{{ t("Data_Center_Proxies") }}</a>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Price") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <a href="/pricing/residential">{{ t("Residential_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/pricing/unlimited">{{ t("Unlimited_Residential_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/pricing/mobile">{{ t("Phone_Proxies") }}</a>
                </li>
                <li class="pointer">
                  <a href="/pricing/data_center">{{ t("Data_Center_Proxies") }}</a>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Scenes") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <a href="/home/data_collection">{{ t("footer_spec.scene1") }}</a>
                </li>
                <li class="pointer">
                  <a href="/home/search_engine">{{ t("footer_spec.scene2") }}</a>
                </li>
                <li class="pointer">
                  <a href="/home/social_media">{{ t("footer_spec.scene3") }}</a>
                </li>
                <li class="pointer">
                  <a href="/home/bill">{{ t("footer_spec.scene4") }}</a>
                </li>
                <li class="pointer">
                  <a href="/home/ai_model">{{ t("footer_spec.scene5") }}</a>
                </li>
                <li class="pointer">
                  <a href="/home/market#scence">{{ t("footer_spec.scene6") }}</a>
                </li>
              </ul>
            </div>

            <div class="space-y-3">
              <strong class="white font-medium">{{ t("Get_Help") }}</strong>
              <ul class="list text-sm space-y-3">
                <li class="pointer">
                  <a href="/doc">{{ t("footer_spec.document") }}</a>
                </li>
                <li class="pointer">
                  <a href="/help">{{ t("footer_spec.question") }}</a>
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
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router"
import loginStore from "@/store/login"
import { Sparkles } from "lucide-vue-next"
import Message from "@/components/message/message"
import IpButton from "@/components/button/button.vue"
import { Mail } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import settingsStore from "@/store/setting"
import HomeTitle from "../homeTitle.vue"
import { useI18n } from "vue-i18n"
const { isLogin } = loginStore()

const router = useRouter()
const { t } = useI18n()
const { en } = settingsStore()

// 邮箱跳转
function gotoEmail() {
  window.open("mailto:support@ipstar.io")
}
</script>

<style lang="less" scoped>
@import url("./footer.less");
</style>
