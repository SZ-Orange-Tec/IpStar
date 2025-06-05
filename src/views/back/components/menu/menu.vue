<template>
  <div class="menu column h-full space-y-5">
    <div class="logo" @click="$router.push('/home')">
      <img src="@/assets/pc_img/layout_img/ipflare-logo.png" alt="logo" />
    </div>
    <div class="column flex-1">
      <ul>
        <template v-for="(item, index) in menuData" :key="index">
          <li class="v_center pointer" v-if="index === 1 || index === 4">
            <em>{{ index === 1 ? "PLANS" : "PROXIES" }}</em>
          </li>
          <li class="v_center pointer" v-else :class="{ pitch_on: idx === index }" v-show="item.isShow" @click="jumpPath(index, item)">
            <img :src="idx !== index ? item.url_dark : item.url_bright" alt="" />
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
import { ref } from "vue"
import { useRouter } from "vue-router"
import layoutStore from "@/store/layout"
import { useI18n } from "vue-i18n"

const { isProduc } = layoutStore()
const router = useRouter()
const { t } = useI18n()

// 响应式状态
const idx = ref(0)
const bol = ref(false)
const transitionName = ref(null)

const menuData = ref([])
function getSlideList() {
  menuData.value = [
    {
      url_bright: new URL("@/assets/pc_img/layout_img/gaikuang_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/gaikuang.png", import.meta.url),
      name: t("menu_spec.Overview"),
      path: "/overview",
      width: 26,
      height: 26,
      isShow: true,
    },
    {},
    {
      url_bright: new URL("@/assets/pc_img/layout_img/chanping_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/chanping.png", import.meta.url),
      name: t("menu_spec.Products"),
      path: "/products",
      width: 27,
      height: 26,
      isShow: true,
    },
    {
      url_bright: new URL("@/assets/pc_img/layout_img/dingdan_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/dingdan.png", import.meta.url),
      name: t("menu_spec.Billings"),
      path: "/billings",
      isShow: true,
    },
    {},
    {
      url_bright: new URL("@/assets/pc_img/layout_img/tiqu_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/tiqu.png", import.meta.url),
      name: t("menu_spec.Proxy"),
      path: "/proxy",
      isShow: true,
    },
    {
      url_bright: new URL("@/assets/pc_img/layout_img/api_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/api.png", import.meta.url),
      name: t("menu_spec.API"),
      path: "/api",
      isShow: true,
    },
    {
      url_bright: new URL("@/assets/pc_img/layout_img/shezhi_light.png", import.meta.url),
      url_dark: new URL("@/assets/pc_img/layout_img/shezhi.png", import.meta.url),
      name: t("menu_spec.Settings"),
      path: "/settings",
      isShow: true,
    },
  ]
}
function jumpPath(index, item) {
  if (item.path === "/products") {
    isProduc.value = false
  }
  idx.value = index
  router.push(item.path)
}

getSlideList()
</script>

<style lang="less" scoped>
@import "./menu.less";
</style>
