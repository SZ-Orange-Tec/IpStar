<template>
  <div class="menu group column w-full h-full space-y-5 overflow-y-auto">
    <div
      class="w-full logo pl-7 v_center text-2xl pointer relative opacity-0 2xl:opacity-100 group-hover:opacity-100 transition-opacity duration-100"
      @click="$router.push('/home')"
      :title="t('menu_spec.back_home')"
    >
      <div class="back">
        <ChevronsLeft :size="20" />
      </div>
      <img src="@/assets/images/logo.webp" class="himg" style="height: 36px" alt="" />
    </div>
    <div class="column flex-1 w-full">
      <ul class="space-y-1 column w-full" ref="menuRef">
        <template v-for="(item, index) in menuData" :key="index">
          <li class="block w-full" v-if="item.path" :id="'menu' + index">
            <div
              class="v_center h-9 pointer space-x-2 text-[15px] font-medium px-3 menu-item"
              :class="{ pitch_on: idx === index }"
              @click="selectMenu"
              :data-index="index"
            >
              <div class="v_center space-x-2 flex-1 min-w-0">
                <component :is="item.icon" :size="17" :stroke-width="2" class="icon shrink-0"></component>
                <p class="hidden 2xl:block group-hover:block ellipsis flex-1 min-w-0">{{ item.name }}</p>
              </div>
              <div class="hidden 2xl:block group-hover:block">
                <chevron-down :class="{ 'rotate-180': item.expand }" v-if="item.children && item.children.length > 0" :size="16" />
              </div>
            </div>

            <div class="w-full h-0 overflow-hidden" v-if="item.children && item.children.length > 0">
              <ul class="w-full column">
                <li
                  @click="jumpPath(child.path, child.idx)"
                  class="w-full pointer v_center space-x-2 h-8 px-3 text-sm font-medium text-gray-500 menu-item"
                  :class="{ black: idx === index && idx_child === cidx }"
                  v-for="(child, cidx) in item.children"
                  :key="child.path"
                >
                  <div class="w-[17px] h-full vh_center shrink-0">
                    <div class="w-1 h-1 rounded-full bg-current text-gray-200" :class="{ primary: idx === index && idx_child === cidx }"></div>
                  </div>
                  <p class="hidden 2xl:block group-hover:block ellipsis">{{ child.name }}</p>
                </li>
              </ul>
            </div>
          </li>
          <li class="w-full h-9 v_center pointer grey-40 text-xs px-3" v-else>
            <p class="opacity-0 2xl:opacity-100 group-hover:opacity-100 transition-opacity duration-100 ellipsis">{{ item.name }}</p>
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
import { nextTick, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
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
  MapPin as StaticResidentialProxyIcon,
  ChevronsLeft,
  ChevronDown,
  Dot,
} from "lucide-vue-next"
import settingStore from "@/store/setting"
import anime from "animejs/lib/anime.es.js"

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { lang } = settingStore()

// 响应式状态
const idx = ref(0)
const idx_child = ref(0)

const menuData = ref([])
const menuRef = ref(null)
function getSlideList() {
  menuData.value = [
    {
      icon: OverviewIcon,
      name: t("menu_spec.overview"),
      path: "/overview",
      idx: "overview",
    },
    { name: t("menu_spec.how_to_use") },
    {
      icon: GetProxyIcon,
      name: t("menu_spec.get_proxy"),
      path: "/proxy",
      idx: "proxy",
    },
    {
      icon: ComboIcon,
      name: t("menu_spec.purchases"),
      path: "/purchase",
      idx: "purchase",
    },
    { name: t("menu_spec.products") },
    {
      icon: ResidentialProxyIcon,
      name: t("menu_spec.residential_proxy"),
      path: "/residential",
      expand: false,
      children: [
        { idx: "residential-price", path: "/residential?active=0", name: t("Plans") },
        { idx: "proxy-copy", path: "/proxy", name: t("Get_Proxy") },
        { idx: "residential-billing", path: "/residential?active=2", name: t("Billing") },
      ],
    },
    {
      icon: UnlimitedProxyIcon,
      name: t("menu_spec.unlimited_proxy"),
      path: "/unlimited",
      idx: "unlimited",
      expand: false,
      children: [
        { idx: "unlimited-price", path: "/unlimited?active=0", name: t("Plans") },
        { idx: "proxy-copy", path: "/proxy", name: t("Get_Proxy") },
        { idx: "unlimited-billing", path: "/unlimited?active=2", name: t("Billing") },
      ],
    },
    {
      icon: StaticResidentialProxyIcon,
      name: t("menu_spec.static_proxy"),
      path: "/static",
      idx: "static",
      expand: false,
      children: [
        { idx: "static-price", path: "/static?active=0", name: t("Plans") },
        { idx: "static-management", path: "/static?active=2", name: t("Proxy_List") },
        { idx: "static-billing", path: "/static?active=3", name: t("Billing") },
      ],
    },
    {
      icon: PhoneProxyIcon,
      name: t("menu_spec.phone_proxy"),
      path: "/mobile",
      idx: "mobile",
      expand: false,
      children: [
        { idx: "mobile-price", path: "/mobile?active=0", name: t("Plans") },
        { idx: "proxy-copy", path: "/proxy", name: t("Get_Proxy") },
        { idx: "mobile-billing", path: "/mobile?active=2", name: t("Billing") },
      ],
    },
    {
      icon: DataProxyIcon,
      name: t("menu_spec.data_proxy"),
      path: "/data_center",
      idx: "data_center",
      expand: false,
      children: [
        { idx: "data_center-price", path: "/data_center?active=0", name: t("Plans") },
        { idx: "data_center-management", path: "/data_center?active=2", name: t("Proxy_List") },
        { idx: "data_center-billing", path: "/data_center?active=3", name: t("Billing") },
      ],
    },
    { name: t("menu_spec.menu") },
    {
      icon: WhiteListIcon,
      name: t("menu_spec.white_list"),
      path: "/whitelist",
      idx: "whitelist",
    },
    {
      icon: AccountIcon,
      name: t("menu_spec.sub_account"),
      path: "/sub_account",
      idx: "sub_account",
    },
    {
      icon: SettingsIcon,
      name: t("menu_spec.setting"),
      path: "/settings",
      idx: "settings",
    },
    { name: t("menu_spec.support") },
    {
      icon: HelpIcon,
      name: t("menu_spec.help"),
      path: "/doc",
      idx: "doc",
    },
    {
      icon: QuestionIcon,
      name: t("menu_spec.question"),
      path: "/help",
      idx: "help",
    },
  ]
  focusPath(route.path)
}
function selectMenu(e) {
  const index = +e.currentTarget.dataset.index
  const item = menuData.value[index]
  if (item.children && item.children.length > 0) {
    toggleMenu(index, e.currentTarget.nextSibling)
  } else {
    jumpPath(item.path, item.idx)
  }
}
function toggleMenu(index, content) {
  const menu = menuData.value

  const expand = menu[index].expand
  if (!expand) {
    // 展开动画
    anime({
      targets: content,
      height: content.scrollHeight, // 高度变为内容的高度
      duration: 200,
      easing: "easeInOutQuad",
    })
  } else {
    // 收起动画
    content.style.overflow = "hidden"
    anime({
      targets: content,
      height: 0, // 高度变为 0
      duration: 200, // 动画时长
      easing: "easeInOutQuad", // 缓动函数
    })
  }

  menu[index].expand = !expand
  menuData.value = menu
}
function jumpPath(path) {
  focusPath(path)
  router.push(path)
}
function focusPath(path) {
  if (!menuData.value.length) return

  const menu = menuData.value

  let child_idx
  const index = menu.findIndex((i) => {
    const reg = new RegExp(`^${i.path}`)
    const is = reg.test(path)
    if (is && i.path !== path) {
      child_idx = i.children.findIndex((c) => c.path === path)
    }
    return is
  })
  if (index < 0) return

  idx.value = index
  idx_child.value = child_idx

  if (child_idx && !menu[index].expand) {
    let dom
    for (let i = 0; i < menuRef.value.children.length; i++) {
      if (menuRef.value.children[i].id === "menu" + index) {
        dom = menuRef.value.children[i]
        break
      }
    }
    toggleMenu(index, dom.lastChild)
  }
}

// watch(
//   () => route.path,
//   (val) => {
//     focusPath(val)
//   },
// )
watch(lang, (val) => {
  getSlideList()
})

onMounted(() => {
  focusPath(route.fullPath)
})

getSlideList()
</script>

<style lang="less" scoped>
@import "./menu.less";
</style>
