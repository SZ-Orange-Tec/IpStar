<template>
  <header class="header">
    <div class="container between w-full h-full">
      <h1 class="text-2xl">IPSTAR</h1>

      <div class="v_center h-full space-x-3">
        <ul class="navigator v_center text-base px-3 h-full">
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

        <div class="v_center space-x-5">
          <!-- 语言 -->
          <DropDown placement="bottom">
            <template #label="{ open }">
              <IpButton circle :class="{ open: open }" type="ghost">
                <div class="v_center space-x-2 shrink-0 w-full h-full">
                  <img src="@/assets/images/home/lang.png" height="32" alt="" />
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
            <IpButton type="primary" class="h-10 text-base px-5" @click="$router.push('/login')">{{ t("Sign_in") }}</IpButton>
            <!-- <el-button @click="$router.push('/sign_in')">{{$t('PCHeader.btnSumOne')}} <i class="el-icon-right"></i> </el-button> -->
            <!-- <el-button type="primary" @click="$router.push('/register')">{{$t('PCHeader.btnSumTwo')}}</el-button> -->
          </div>

          <!-- 用户 -->
          <DropDown v-else placement="bottom">
            <template #label="{ open }">
              <IpButton circle :class="{ open: open }" type="ghost">
                <div class="v_center shrink-0 space-x-2">
                  <CircleUser :size="25" :stroke-width="2" />
                  <p>{{ username }}</p>
                </div>
              </IpButton>
            </template>
            <template #menu>
              <ul class="menu p-2 text-sm">
                <li @click="navigate('/overview')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Overview") }}</li>
                <li @click="navigate('/products')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Products") }}</li>
                <li @click="navigate('/billings')" class="menu_item px-2 rounded-md pointer transition-color v_center">{{ t("Billings") }}</li>
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
import { CircleUser } from "lucide-vue-next"
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

// 退出
function signOut() {
  OutLogin()
}
</script>

<style lang="less" scoped>
@import url("./header.less");
</style>
