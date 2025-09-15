<template>
  <header class="header">
    <div class="container between w-full h-full">
      <div>
        <img
          sizes="(max-width:112px) 56px,24px"
          src="@/assets/images/logo.png"
          srcset="@/assets/images/logo.png 56w, @/assets/images/logo@2x.png 112w"
          style="height: 36px"
        />
      </div>

      <div class="v_center h-full space-x-3">
        <ul class="navigator hidden lg:v_center text-base px-3 h-full whitespace-nowrap" @mouseenter="loadFront">
          <li @click="navigate('/home')" class="px-8 h-full v_center pointer transition-color" :class="{ active: activePath === '/home' }">
            {{ $t("Home") }}
          </li>
          <li @click="navigate('/pricing')" class="px-8 h-full v_center pointer transition-color" :class="{ active: activePath === '/pricing' }">
            {{ $t("Pricing") }}
          </li>
          <li @click="navigate('/relation')" class="px-8 h-full v_center pointer transition-color" :class="{ active: activePath === '/relation' }">
            {{ $t("Contact") }}
          </li>
          <li @click="navigate('/help')" class="px-8 h-full v_center pointer transition-color" :class="{ active: activePath === '/help' }">
            {{ $t("Help") }}
          </li>
        </ul>
        <DropDown placement="bottom" class="block lg:hidden" @onChange="loadFront">
          <template #label="{ open }">
            <IpButton :class="{ open: open }" type="ghost" class="icon_btn">
              <Menu :size="20" />
            </IpButton>
          </template>
          <template #menu>
            <ul class="menu p-2 text-sm">
              <li
                @click="navigate('/home')"
                :class="{ active: activePath === '/home' }"
                class="menu_item px-2 rounded-md pointer transition-color v_center"
              >
                {{ t("Home") }}
              </li>
              <li
                @click="navigate('/pricing')"
                :class="{ active: activePath === '/pricing' }"
                class="menu_item px-2 rounded-md pointer transition-color v_center"
              >
                {{ t("Pricing") }}
              </li>
              <li
                @click="navigate('/relation')"
                :class="{ active: activePath === '/relation' }"
                class="menu_item px-2 rounded-md pointer transition-color v_center"
              >
                {{ t("Contact") }}
              </li>
              <li
                @click="navigate('/help')"
                :class="{ active: activePath === '/help' }"
                class="menu_item px-2 rounded-md pointer transition-color v_center"
              >
                {{ t("Help") }}
              </li>
            </ul>
          </template>
        </DropDown>

        <div class="v_center space-x-3 shink-0">
          <!-- 语言 -->
          <DropDown placement="bottom" class="shink-0">
            <template #label="{ open }">
              <IpButton :class="{ open: open }" type="ghost" class="icon_btn">
                <div class="vh_center space-x-2 shrink-0 w-full h-full">
                  <img src="@/assets/images/home/lang.svg" width="22" height="22" alt="" />
                </div>
              </IpButton>
            </template>
            <template #menu>
              <div class="p-2 text-sm">
                <div class="menu column">
                  <div class="menu_item px-2 rounded-md pointer transition-color v_center" @click="toggleLang('zh')">中文</div>
                  <div class="menu_item px-2 rounded-md pointer transition-color v_center" @click="toggleLang('en')">English</div>
                </div>
              </div>
            </template>
          </DropDown>

          <!-- 登录 -->
          <div class="btn_sum" v-if="!token">
            <IpButton type="primary" class="h-8 text-sm px-3" @click="$router.push('/login')">{{ t("Sign_in") }}</IpButton>
            <!-- <el-button @click="$router.push('/sign_in')">{{$t('PCHeader.btnSumOne')}} <i class="el-icon-right"></i> </el-button> -->
            <!-- <el-button type="primary" @click="$router.push('/register')">{{$t('PCHeader.btnSumTwo')}}</el-button> -->
          </div>

          <!-- 用户 -->
          <DropDown v-else placement="bottom" @onChange="userDropChange">
            <template #label="{ open }">
              <IpButton :class="{ open: open }" type="ghost" class="user_icon">
                <div class="v_center shrink-0 space-x-2">
                  <CircleUser :size="24" :stroke-width="1" />
                  <p class="username hidden md:block">{{ username }}</p>
                  <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
                </div>
              </IpButton>
            </template>
            <template #menu>
              <ul class="menu p-2 text-sm">
                <li @click="navigate('/overview')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Overview") }}</li>
                <li @click="navigate('/products')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Products") }}</li>
                <li @click="navigate('/billings')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Billings") }}</li>
                <li @click="navigate('/proxy')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Proxy") }}</li>
                <li @click="navigate('/generate_api')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("API") }}</li>
                <li @click="navigate('/settings')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Settings") }}</li>
                <li class="menu-split my-1"></li>
                <li @click="signOut" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Sign_out") }}</li>
              </ul>
            </template>
          </DropDown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import DropDown from "@/components/dropdown/dropdown.vue"
import IpButton from "@/components/button/button.vue"
import { CircleUser, Menu, ChevronDown } from "lucide-vue-next"
import loginStore from "@/store/login"
import settingStore from "@/store/setting"
import { useRouter, useRoute } from "vue-router"
import { loadLocaleMessages, setI18nLanguage } from "@/language/index"
import userStore from "@/store/user"
import { useI18n } from "vue-i18n"
import { computed } from "vue"

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { token, OutLogin } = loginStore()
const { lang } = settingStore()
const { username } = userStore()

// 路由
const activePath = computed(() => route.path)
function navigate(path) {
  // 跳转路由
  if (router.currentRoute.value.path === path) {
    return
  }
  router.push(path)
}

// 切换语言
async function toggleLang(locale) {
  lang.value = locale
  localStorage.setItem("lang", locale)

  const path = route.name
  if (path) {
    await loadLocaleMessages(path, locale)
  }

  setI18nLanguage(locale)
}

// 用户下拉菜单
function userDropChange(status) {
  if (status) {
    loadBack()
  }
}
// 预加载后台
async function loadBack() {
  await import(/*webpackChunkName:'layout'*/ "@/views/back/layout.vue")
  await import(/*webpackChunkName:'overview'*/ "@/views/back/overview/overview.vue")
  await import(/*webpackChunkName:'products'*/ "@/views/back/products/products.vue")
  await import(/*webpackChunkName:'billings'*/ "@/views/back/billings/billings.vue")
}
// 预加载前台
async function loadFront() {
  await import(/*webpackChunkName:'pricing'*/ "@/views/front/pricing/pricing.vue")
  await import(/*webpackChunkName:'relation'*/ "@/views/front/relation/relation.vue")
  await import(/*webpackChunkName:'help'*/ "@/views/front/help/help.vue")
}

// 退出
function signOut() {
  OutLogin()
}
</script>

<style lang="less" scoped>
@import url("./header.less");
</style>
