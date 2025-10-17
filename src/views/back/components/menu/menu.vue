<template>
  <div class="menu column h-full space-y-5">
    <div class="w-full logo v_center text-2xl pointer relative" @click="$router.push('/home')" :title="t('menu_spec.back_home')">
      <div class="back">
        <ChevronsLeft :size="20" />
      </div>
      <img src="@/assets/images/logo.png" style="height: 36px" alt="" />
    </div>
    <div class="column flex-1">
      <ul class="space-y-1">
        <template v-for="(item, index) in menuData" :key="index">
          <li class="v_center pointer grey text-xs" v-if="index === 1 || index === 4">
            <em>{{ index === 1 ? "PLANS" : "PROXIES" }}</em>
          </li>
          <li
            class="v_center pointer space-x-2 text-[15px] font-medium"
            v-else
            :class="{ pitch_on: idx === index }"
            v-show="item.isShow"
            @click="jumpPath(index)"
          >
            <component :is="item.icon" :size="16" :stroke-width="1.5"></component>
            <p :class="idx === index ? 'color' : ''">{{ item.name }}</p>
          </li>
        </template>
      </ul>
    </div>
    <p class="tip text-sm">
      {{ $t("menu_spec.help") }}<span @click="$router.push('/doc')">{{ $t("menu_spec.manual") }}</span>
    </p>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import layoutStore from "@/store/layout"
import { useI18n } from "vue-i18n"
import {
  Settings,
  ClipboardList,
  ShoppingCart,
  ChartLine,
  PrinterCheck,
  LaptopMinimalCheck,
  ChevronsLeft,
  NotepadText as WhiteListIcon,
  Contact as AccountIcon,
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
      icon: ChartLine,
      name: t("menu_spec.Overview"),
      path: "/overview",
      isShow: true,
    },
    {},
    {
      icon: ShoppingCart,
      name: t("menu_spec.Products"),
      path: "/products",
      isShow: true,
    },
    {
      icon: ClipboardList,
      name: t("menu_spec.Billings"),
      path: "/billings",
      isShow: true,
    },
    {},
    {
      icon: PrinterCheck,
      name: t("menu_spec.Proxy"),
      path: "/proxy",
      isShow: true,
    },
    {
      icon: LaptopMinimalCheck,
      name: t("menu_spec.API"),
      path: "/generate_api",
      isShow: true,
    },
    {
      icon: WhiteListIcon,
      name: t("Whitelist"),
      path: "/whitelist",
      isShow: true,
    },
    {
      icon: AccountIcon,
      name: t("Sub_Account"),
      path: "/account",
      isShow: true,
    },
    {
      icon: Settings,
      name: t("menu_spec.Settings"),
      path: "/settings",
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
    console.log(val)
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
