<template>
  <div class="navbar w-full">
    <div class="nav_header box-border w-full between h-10 px-3 md:px-5">
      <div class="left v_center space-x-2">
        <div class="v_center font-medium text-lg">
          <slot :title="name"></slot>
        </div>

        <DropDown placement="bottom" class="block lg:hidden">
          <template #label="{ open }">
            <IpButton :class="{ open: open }" type="ghost" class="menu_btn">
              <Menu :size="20" />
            </IpButton>
          </template>
          <template #menu>
            <ul class="menu p-2 text-sm whitespace-nowrap">
              <li @click="jumpPath('/home')" class="menu_item px-2 rounded-md pointer transition-color v_center space-x-2">
                <ResidentialProxyIcon :size="16" />
                <p>{{ t("Home") }}</p>
              </li>
              <li class="menu-split"></li>
              <li
                v-for="item in menuData"
                :key="item.name"
                @click="jumpPath(item.path)"
                :class="{ active: path === item.path }"
                class="menu_item px-2 rounded-md pointer transition-color v_center space-x-2"
              >
                <component :is="item.icon" :size="16"></component>
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </template>
        </DropDown>
      </div>

      <div class="v_center space-x-3 h-full">
        <IpButton type="normal" class="user_icon" v-if="isProduc">
          <div class="v_center space-x-2 pointer" @click="toPay('list')">
            <ClipboardList :size="16" />
            <div class="slider_bck slider_bck_left">
              <p class="hidden sm:block">{{ t("My_product_list") }}</p>
            </div>
          </div>
        </IpButton>

        <IpButton type="normal" class="user_icon" v-else>
          <div class="v_center space-x-2 pointer" @click="toPay('buy')">
            <ComboIcon :size="16" />
            <div class="slider_bck slider_bck_left">
              <p class="hidden sm:block">{{ t("Order_new") }}</p>
            </div>
          </div>
        </IpButton>

        <div class="split"></div>

        <!-- 语言 -->
        <DropDown placement="bottom" class="shink-0">
          <template #label="{ open }">
            <IpButton :class="{ open: open }" type="normal" class="user_icon">
              <div class="vh_center space-x-1 shrink-0 w-full h-full">
                <!-- <img src="@/assets/images/home/lang.svg" width="22" height="22" alt="" /> -->
                <LangIcon :size="16" />
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

        <div class="split"></div>

        <!-- 用户 -->
        <DropDown placement="bottom">
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
              <li @click="jumpPath('/Settings')" class="menu_item px-2 rounded pointer transition-color v_center">
                <div class="v_center space-x-2">
                  <SettingsIcon :size="16" />
                  <span>{{ t("Settings") }}</span>
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
    <div class="nav_bottom px-3 md:px-5">
      <slot name="nav"></slot>
    </div>
  </div>
</template>

<script setup>
import {
  ChartLine as OverviewIcon,
  FileCode as GetProxyIcon,
  ShoppingCart as ComboIcon,
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
  NotepadText as WhiteListIcon,
  Contact as AccountIcon,
  Settings as SettingsIcon,
  BookMarked as HelpIcon,
  MessageCircleQuestion as QuestionIcon,
  ChevronsLeft,
  ChevronDown,
  Menu,
  ClipboardList,
  Globe as LangIcon,
  LogOut as SignOutIcon,
} from "lucide-vue-next"
import layoutStore from "@/store/layout"
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import DropDown from "@/components/dropdown/dropdown.vue"
import settingStore from "@/store/setting"
import userStore from "@/store/user"
import { loadLocaleMessages, setI18nLanguage } from "@/language/index"
import loginStore from "@/store/login"
import { watch } from "vue"

const router = useRouter()
const route = useRoute()
const { isProduc } = layoutStore()
const { username_simple } = userStore()
const { lang } = settingStore()
const { OutLogin } = loginStore()

const { t } = useI18n()

const name = ref("")
function getName() {
  const pathMap = {
    "/overview": t("menu_spec.overview"),
    "/get_proxy": t("menu_spec.get_proxy"),
    "/purchase": t("menu_spec.combo"),
    "/residential_proxy": t("menu_spec.residential_proxy"),
    "/unlimited_proxy": t("menu_spec.unlimited_proxy"),
    "/phone_proxy": t("menu_spec.phone_proxy"),
    "/data_proxy": t("menu_spec.data_proxy"),
    "/whitelist": t("menu_spec.white_list"),
    "/sub_account": t("menu_spec.sub_account"),
    "/settings": t("menu_spec.setting"),
    "/help": t("menu_spec.help"),
    "/question": t("menu_spec.question"),
  }
  name.value = pathMap[route.path] ?? ""
}
watch(lang, () => getName(), {
  immediate: true,
})

const path = computed(() => route.path)
const menuData = [
  {
    icon: OverviewIcon,
    name: t("menu_spec.overview"),
    path: "/overview",
  },
  {
    icon: GetProxyIcon,
    name: t("menu_spec.get_proxy"),
    path: "/get_proxy",
  },
  {
    icon: ComboIcon,
    name: t("menu_spec.combo"),
    path: "/purchase",
  },
  {
    icon: ResidentialProxyIcon,
    name: t("menu_spec.residential_proxy"),
    path: "/residential_proxy",
  },
  {
    icon: UnlimitedProxyIcon,
    name: t("menu_spec.unlimited_proxy"),
    path: "/unlimited_proxy",
  },
  {
    icon: PhoneProxyIcon,
    name: t("menu_spec.phone_proxy"),
    path: "/phone_proxy",
  },
  {
    icon: DataProxyIcon,
    name: t("menu_spec.data_proxy"),
    path: "/data_proxy",
  },
  {
    icon: WhiteListIcon,
    name: t("menu_spec.white_list"),
    path: "/whitelist",
  },
  {
    icon: AccountIcon,
    name: t("menu_spec.sub_account"),
    path: "/sub_account",
  },
  {
    icon: SettingsIcon,
    name: t("menu_spec.setting"),
    path: "/settings",
  },
  {
    icon: HelpIcon,
    name: t("menu_spec.help"),
    path: "/help",
  },
  {
    icon: QuestionIcon,
    name: t("menu_spec.question"),
    path: "/question",
  },
]
function jumpPath(path) {
  if (path === "/products") {
    isProduc.value = false
  }
  router.push(path)
}

function toPay(key) {
  isProduc.value = key !== "list"
  if (route.path !== "/products") {
    router.push("/products")
  }
}

// 切换语言
async function toggleLang(locale) {
  const path = route.name
  if (path) {
    await loadLocaleMessages(path, locale)
  }

  lang.value = locale
  localStorage.setItem("lang", locale)

  setI18nLanguage(locale)
}

// 退出
function signOut() {
  OutLogin()
  router.replace("/home")
}
</script>

<style scoped lang="less">
@import "./navbar.less";
</style>
