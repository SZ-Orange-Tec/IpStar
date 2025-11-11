<template>
  <div class="header_pop column">
    <header class="header w-full">
      <div class="between w-full h-full">
        <div class="flex-1 v_center h-full min-w-0">
          <div class="pointer" @click="navigate('/home')">
            <img sizes="(max-width:112px) 56px,24px" src="@/assets/images/logo.png" style="height: 36px" />
          </div>
        </div>

        <div class="v_center h-full space-x-3" @click="show = false">
          <CloseIcon :size="24" class="pointer" :strokeWidth="2.5" />
        </div>
      </div>
    </header>

    <div class="menu w-full flex-1 min-h-0 overflow-y-auto text-lg space-y-2">
      <div @click="navigate('/home')" class="menu-item font-medium v_center">{{ t("Home") }}</div>

      <Collapse>
        <template #header>
          <div class="menu-item font-medium v_center">{{ t("Products") }}</div>
        </template>
        <template #content>
          <div class="column text-lg grey-60 px-3">
            <div @click="navigate('/product/residentail')" class="second-item font-medium v_center">{{ t("Residential_Proxies") }}</div>
            <div @click="navigate('/product/rotating')" class="second-item font-medium v_center">{{ t("Rotating_Proxies") }}</div>
            <div @click="navigate('/mobile-proxy')" class="second-item font-medium v_center">{{ t("Phone_Proxies") }}</div>
            <div @click="navigate('/unlimited-residential-proxy')" class="second-item font-medium v_center">
              {{ t("Unlimited_Residential_Proxies") }}
            </div>
            <div @click="navigate('/product/data_center')" class="second-item font-medium v_center">{{ t("Data_Center_Proxies") }}</div>
          </div>
        </template>
      </Collapse>
      <Collapse>
        <template #header>
          <div class="menu-item font-medium v_center">{{ t("Pricing") }}</div>
        </template>
        <template #content>
          <div class="column text-lg grey-60 px-3">
            <div @click="navigate('/pricing/residentail')" class="second-item font-medium v_center">{{ t("Residential_Proxies") }}</div>
            <div @click="navigate('/pricing/rotation')" class="second-item font-medium v_center">{{ t("Rotating_Proxies") }}</div>

            <div @click="navigate('/pricing/mobile')" class="second-item font-medium v_center">{{ t("Phone_Proxies") }}</div>

            <div @click="navigate('/pricing/unlimited')" class="second-item font-medium v_center">
              {{ t("Unlimited_Residential_Proxies") }}
            </div>

            <div @click="navigate('/pricing/data_center')" class="second-item font-medium v_center">{{ t("Data_Center_Proxies") }}</div>
          </div>
        </template>
      </Collapse>

      <div @click="navigate('/relation')" class="menu-item font-medium v_center">{{ t("Contact") }}</div>
      <div @click="navigate('/help')" class="menu-item font-medium v_center">{{ t("Help") }}</div>

      <Collapse>
        <template #header>
          <div class="menu-item font-medium v_center">{{ t("Language") }}</div>
        </template>
        <template #content>
          <div class="column text-lg grey-60 px-3">
            <div class="second-item font-medium v_center" @click="toggleLang('zh')">简体中文</div>
            <div class="second-item font-medium v_center" @click="toggleLang('en')">English</div>
          </div>
        </template>
      </Collapse>
    </div>

    <div v-if="isLogin" class="btn_box w-full text-lg space-y-5">
      <IpButton @click="navigate('/overview')" type="primary" class="w-full h-full vh_center btn">{{ t("Dashboard") }}</IpButton>

      <IpButton @click="signOut" type="primary_border" class="w-full h-full vh_center btn">{{ t("Sign_out") }}</IpButton>
    </div>
    <div v-else class="btn_box w-full text-lg space-y-5">
      <IpButton @click="navigate('/login')" type="primary" class="w-full h-full vh_center btn">{{ t("Sign_in") }}</IpButton>
      <IpButton @click="navigate('/login')" type="primary_border" class="w-full h-full vh_center btn">{{ t("Register") }}</IpButton>
    </div>
  </div>
</template>

<script setup>
import Collapse from "@/components/collapse/collapse.vue"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { X as CloseIcon } from "lucide-vue-next"
import loginStore from "../../../../store/login"
import { useRoute, useRouter } from "vue-router"
import { loadLocaleMessages, setI18nLanguage } from "@/language/index"
import settingStore from "../../../../store/setting"
import { nextTick } from "vue"

const show = defineModel()
const router = useRouter()
const route = useRoute()
const { lang } = settingStore()
const { t } = useI18n()
const { isLogin, OutLogin } = loginStore()

// 退出
function signOut() {
  OutLogin()
  nextTick(() => {
    show.value = false
  })
}

// 跳转
async function navigate(url) {
  await router.push(url)
  show.value = false
}

// 切换语言
async function toggleLang(locale) {
  lang.value = locale
  localStorage.setItem("lang", locale)

  const path = route.name
  if (path) {
    await loadLocaleMessages(path, locale)
  }

  show.value = false

  setI18nLanguage(locale)
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
