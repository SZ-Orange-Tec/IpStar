<template>
  <div ref="triggerRef" class="h-0" style="background: transparent"></div>
  <div class="header_box" :class="{ shadow: shadow }">
    <HeaderGift v-if="registerAward && !isLogin" @load="setStickyTop" />
    <header class="header" :class="{ home_header: isHome }">
      <div class="container flex w-full h-full">
        <div class="flex-1 v_center h-full min-w-0">
          <div>
            <img v-show="!isHome || (isHome && shadow)" sizes="(max-width:112px) 56px,24px" src="@/assets/images/logo.png" style="height: 36px" />
            <img v-show="isHome && !shadow" sizes="(max-width:112px) 56px,24px" src="@/assets/images/logo_white.png" style="height: 36px" />
            <!-- <img
              sizes="(max-width:112px) 56px,24px"
              src="@/assets/images/logo_white.png"
              srcset="@/assets/images/logo_white.png 56w, @/assets/images/logo_white@2x.png 112w"
              style="height: 36px"
            /> -->
          </div>
          <ul class="navigator hidden lg:v_center h-full whitespace-nowrap font-medium" @mouseenter="loadFront">
            <li
              @click="navigate('/home')"
              class="slider_bck slider_bck_center h-full v_center pointer transition-color"
              :class="{ active: activePath === '/home' }"
            >
              {{ $t("Home") }}
            </li>
            <li
              @click="navigate('/pricing')"
              class="slider_bck slider_bck_center h-full v_center pointer transition-color"
              :class="{ active: activePath === '/pricing' }"
            >
              <div class="v_center space-x-1">
                <div>{{ $t("Pricing") }}</div>
                <div v-if="lowestPrice" class="tag text-xs rounded-full font-semibold">${{ lowestPrice }}/GB</div>
              </div>
            </li>
            <li
              @click="navigate('/relation')"
              class="slider_bck slider_bck_center h-full v_center pointer transition-color"
              :class="{ active: activePath === '/relation' }"
            >
              {{ $t("Contact") }}
            </li>
            <li
              @click="navigate('/help')"
              class="slider_bck slider_bck_center h-full v_center pointer transition-color"
              :class="{ active: activePath === '/help' }"
            >
              {{ $t("Help") }}
            </li>
          </ul>
        </div>

        <div class="v_center h-full space-x-3">
          <DropDown placement="bottom" class="block lg:hidden" @onChange="loadFront">
            <template #label="{ open }">
              <IpButton :class="{ open: open }" type="ghost" class="icon_btn">
                <Menu :size="18" />
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
                <IpButton :class="{ open: open }" type="normal" class="user_icon">
                  <div class="vh_center space-x-2 shrink-0 w-full h-full">
                    <!-- <img src="@/assets/images/home/lang.svg" width="22" height="22" alt="" /> -->
                    <LangIcon :size="18" />
                    <div class="slider_bck slider_bck_left">
                      <span class="hidden md:block" v-if="lang === 'zh'">简体中文</span>
                      <span class="hidden md:block" v-if="lang === 'en'">English</span>
                    </div>
                    <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
                  </div>
                </IpButton>
              </template>
              <template #menu>
                <div class="menu column text-sm">
                  <div class="menu_item px-2 rounded-md pointer transition-color v_center" @click="toggleLang('zh')">中文</div>
                  <div class="menu_item px-2 rounded-md pointer transition-color v_center" @click="toggleLang('en')">English</div>
                </div>
              </template>
            </DropDown>

            <!-- 登录 -->
            <div class="btn_sum" v-if="!token">
              <IpButton type="primary" class="h-8 text-sm px-5" @click="$router.push('/login')">{{ t("Sign_in") }}</IpButton>
              <!-- <el-button @click="$router.push('/sign_in')">{{$t('PCHeader.btnSumOne')}} <i class="el-icon-right"></i> </el-button> -->
              <!-- <el-button type="primary" @click="$router.push('/register')">{{$t('PCHeader.btnSumTwo')}}</el-button> -->
            </div>

            <!-- 用户 -->
            <DropDown v-else placement="bottom" @onChange="userDropChange">
              <template #label="{ open }">
                <IpButton :class="{ open: open }" type="normal" class="user_icon">
                  <div class="v_center shrink-0 space-x-2 h-full">
                    <img src="@/assets/images/home/user.png" width="30" height="30" alt="" />
                    <div class="slider_bck slider_bck_left">
                      <p class="username hidden md:block">{{ username_simple }}</p>
                    </div>
                    <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
                  </div>
                </IpButton>
              </template>
              <template #menu>
                <ul class="menu text-sm">
                  <!-- <li @click="navigate('/overview')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("Overview") }}</li>
                  <li @click="navigate('/products')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("Products") }}</li>
                  <li @click="navigate('/billings')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("Billings") }}</li>
                  <li @click="navigate('/proxy')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("Proxy") }}</li>
                  <li @click="navigate('/generate_api')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("API") }}</li>
                  <li @click="navigate('/settings')" class="menu_item px-2 rounded pointer transition-color v_center">{{ t("Settings") }}</li> -->

                  <li @click="navigate('/overview')" class="menu_item px-2 rounded pointer transition-color v_center">
                    <div class="v_center space-x-2">
                      <UserCenterIcon :size="16" />
                      <span>{{ t("Dashboard") }}</span>
                    </div>
                  </li>
                  <li @click="signOut" class="menu_item px-2 rounded pointer transition-color v_center">
                    <div class="v_center space-x-2">
                      <SignOutIcon :size="16" />
                      <span>{{ t("Sign_out") }}</span>
                    </div>
                  </li>
                </ul>
              </template>
            </DropDown>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import DropDown from "@/components/dropdown/dropdown.vue"
import IpButton from "@/components/button/button.vue"
import { CircleUser, Menu, ChevronDown, Globe as LangIcon, LayoutDashboard as UserCenterIcon, LogOut as SignOutIcon } from "lucide-vue-next"
import loginStore from "@/store/login"
import settingStore from "@/store/setting"
import { useRouter, useRoute } from "vue-router"
import { loadLocaleMessages, setI18nLanguage } from "@/language/index"
import userStore from "@/store/user"
import { useI18n } from "vue-i18n"
import { computed, inject, onMounted, ref } from "vue"
import layoutStore from "@/store/layout"
import { platDataConfig } from "@/api/home"
import { defineAsyncComponent } from "vue"

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { token, OutLogin, isLogin } = loginStore()
const { lang } = settingStore()
const { username_simple } = userStore()
const { registerAward } = layoutStore()

const homeData = inject("homeData")
const lowestPrice = computed(() => homeData.lowestPrice / 100)

// 路由
const activePath = computed(() => route.path)
const isHome = computed(() => "/home" === activePath.value)
function navigate(path) {
  // 跳转路由
  if (route.path === path) {
    return
  }
  router.push(path)
}

// 阴影
const shadow = ref(false) //阴影
const triggerRef = ref(null)
// 滚动是节流的,有时候监听不到所以用IntersectionObserver
function initShadowObserve() {
  function callback(entries) {
    entries.forEach((entrie) => {
      shadow.value = !entrie.isIntersecting
    })
  }
  const shadowObserver = new IntersectionObserver(callback)

  shadowObserver.observe(triggerRef.value)
}

// 赠送流量
const HeaderGift = defineAsyncComponent(() => import("../headerGift/headerGift.vue"))
async function isShowGift() {
  try {
    const { data } = await platDataConfig()
    registerAward.value = data.register_award
  } catch (err) {
    console.log(err.message)
  }
}
const stickyTop = ref("px")
function setStickyTop(value) {
  stickyTop.value = value
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

onMounted(() => {
  initShadowObserve()
  isShowGift()
})
</script>

<style lang="less" scoped>
@import url("./header.less");
</style>
