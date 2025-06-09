<template>
  <div class="menu column h-full space-y-5">
    <div class="logo text-2xl pointer" @click="$router.push('/home')">IPSTAR</div>
    <div class="column flex-1">
      <ul class="space-y-1">
        <template v-for="(item, index) in menuData" :key="index">
          <li class="v_center pointer grey text-xs" v-if="index === 1 || index === 4">
            <em>{{ index === 1 ? "PLANS" : "PROXIES" }}</em>
          </li>
          <li class="v_center pointer space-x-2" v-else :class="{ pitch_on: idx === index }" v-show="item.isShow" @click="jumpPath(index, item)">
            <component :is="item.icon" :size="18"></component>
            <p :class="idx === index ? 'color' : ''">{{ item.name }}</p>
          </li>
        </template>
      </ul>
    </div>
    <p class="tip text-sm">
      {{ $t("PCLayout.tip[0]") }}<span @click="$router.push('/doc')">{{ $t("PCLayout.tip[1]") }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import layoutStore from "@/store/layout"
import { useI18n } from "vue-i18n"
import { Settings, ClipboardList, ShoppingCart, ChartLine, PrinterCheck, LaptopMinimalCheck } from "lucide-vue-next"

const { isProduc } = layoutStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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
      path: "/api",
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
function jumpPath(index, item) {
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
  route.path,
  (val) => {
    focusPath(val)
  },
  {
    immediate: true,
  }
)

getSlideList()
</script>

<style lang="less" scoped>
@import "./menu.less";
</style>
