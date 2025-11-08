<template>
  <div class="menu group column w-full h-full space-y-5 overflow-y-auto">
    <div class="w-full logo v_center text-2xl pointer relative" @click="$router.push('/home')" :title="t('menu_spec.back_home')">
      <div class="back hidden 2xl:block group-hover:block">
        <ChevronsLeft :size="20" />
      </div>
      <img class="hidden 2xl:block group-hover:block" src="@/assets/images/logo.png" style="height: 36px" alt="" />
    </div>
    <div class="column flex-1 w-full">
      <ul class="space-y-1 column px-3 w-full">
        <template v-for="(item, index) in menuData" :key="index">
          <li
            class="box-border w-full v_center h-9 pointer space-x-2 text-[15px] font-medium menu-item"
            v-if="item.path"
            :class="{ pitch_on: idx === index }"
            v-show="item.isShow"
            @click="jumpPath(index)"
          >
            <component :is="item.icon" :size="17" :stroke-width="2" class="icon shrink-0"></component>
            <p class="hidden 2xl:block group-hover:block ellipsis" :class="idx === index ? 'color' : ''">{{ item.name }}</p>
          </li>
          <li class="h-9 v_center pointer grey-40 text-xs" v-else>
            <em class="hidden 2xl:block group-hover:block">{{ item.name }}</em>
          </li>
        </template>
      </ul>
    </div>
    <!-- <p class="tip text-sm">
      {{ $t("menu_spec.help") }}<span @click="$router.push('/doc')">{{ $t("menu_spec.manual") }}</span>
    </p> -->
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import layoutStore from "@/store/layout"
import { useI18n } from "vue-i18n"
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
} from "lucide-vue-next"
import settingStore from "@/store/setting"
import userStore from "@/store/user"

const { isProduc } = layoutStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { lang } = settingStore()

// 响应式状态
const idx = ref(0)

const menuData = ref([])
function getSlideList() {
  menuData.value = [
    {
      icon: OverviewIcon,
      name: t("menu_spec.overview"),
      path: "/overview",
      isShow: true,
    },
    { name: t("menu_spec.how_to_use") },
    {
      icon: GetProxyIcon,
      name: t("menu_spec.get_proxy"),
      path: "/proxy",
      isShow: true,
    },
    {
      icon: ComboIcon,
      name: t("menu_spec.purchases"),
      path: "/purchase",
      isShow: true,
    },
    { name: t("menu_spec.products") },
    {
      icon: ResidentialProxyIcon,
      name: t("menu_spec.residential_proxy"),
      path: "/residential",
      isShow: true,
    },
    {
      icon: UnlimitedProxyIcon,
      name: t("menu_spec.unlimited_proxy"),
      path: "/unlimited",
      isShow: true,
    },
    {
      icon: PhoneProxyIcon,
      name: t("menu_spec.phone_proxy"),
      path: "/mobile",
      isShow: true,
    },
    {
      icon: DataProxyIcon,
      name: t("menu_spec.data_proxy"),
      path: "/data_center",
      isShow: true,
    },
    { name: t("menu_spec.menu") },
    {
      icon: WhiteListIcon,
      name: t("menu_spec.white_list"),
      path: "/whitelist",
      isShow: true,
    },
    {
      icon: AccountIcon,
      name: t("menu_spec.sub_account"),
      path: "/sub_account",
      isShow: true,
    },
    {
      icon: SettingsIcon,
      name: t("menu_spec.setting"),
      path: "/settings",
      isShow: true,
    },
    { name: t("menu_spec.support") },
    {
      icon: HelpIcon,
      name: t("menu_spec.help"),
      path: "/doc",
      isShow: true,
    },
    {
      icon: QuestionIcon,
      name: t("menu_spec.question"),
      path: "/help",
      isShow: true,
    },
  ]
  focusPath(route.path)
}
function jumpPath(index) {
  const item = menuData.value[index]
  if (item.path === "/products") {
    isProduc.value = false
  }
  idx.value = index
  router.push(item.path)
}
function focusPath(path) {
  if (!menuData.value.length) return

  const index = menuData.value.findIndex((i) => i.path === path)
  if (index < 0) return

  idx.value = index
}

watch(
  () => route.path,
  (val) => {
    focusPath(val)
  }
)
watch(lang, (val) => {
  getSlideList()
})

getSlideList()
</script>

<style lang="less" scoped>
@import "./menu.less";
</style>
