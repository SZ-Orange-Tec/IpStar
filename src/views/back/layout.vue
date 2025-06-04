<template>
  <div class="pc-layout">
    <!-- 侧边栏  -->
    <div class="sidebar">
      <!-- logo -->
      <div class="logo" @click="$router.push('/home')" @mousemove="animationFn" @mouseleave="animationFn1" :class="{ animation: bol }">
        <img src="../../assets/pc_img/layout_img/ipflare-logo.png" alt="logo" />
      </div>
      <div class="column">
        <ul>
          <template v-for="(item, index) in menuData" :key="index">
            <li class="v_center pointer" v-if="index === 1 || index === 4">
              <em>{{ index === 1 ? "PLANS" : "PROXIES" }}</em>
            </li>
            <li class="v_center pointer" v-else :class="{ pitch_on: idx === index }" v-show="item.isShow" @click="nav_exchange(index, item)">
              <img :src="idx !== index ? item.url_dark : item.url_bright" alt="" />
              <p :class="idx === index ? 'color' : ''">{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>
      <p class="tip">
        {{ $t("PCLayout.tip[0]") }}<span @click="$router.push('/doc')">{{ $t("PCLayout.tip[1]") }}</span>
      </p>
    </div>
    <!-- right -->
    <div class="right_layout">
      <!-- 导航通栏 -->
      <div class="navber">
        <h1 class="place v_center" :style="{ opacity: path === '/overview' || path === '/api' ? 0 : 1 }">
          <i @click="$router.go(-1)" v-if="path === '/docs_help'" class="el-icon-arrow-left pointer"></i>
          <em>{{ place_name }}</em>
        </h1>
        <div class="right_box">
          <div class="purchase" @click="gotoPay" v-if="path !== '/products'">
            <i class="el-icon-plus"></i>
            <i class="el-icon-shopping-cart-1"></i>
            <p>{{ $t("PCLayout.rightBox[0]") }}</p>
          </div>
          <a href="javascript:;" v-else-if="isProduc" @click="$store.commit('layout/setIsProduc', false)">
            <i class="el-icon-s-goods"></i>
            {{ $t("PCLayout.rightBox[1]") }}
          </a>
          <div class="purchase" @click="$store.commit('layout/setIsProduc', true)" v-else>
            <i class="el-icon-plus"></i>
            <i class="el-icon-shopping-cart-1"></i>
            <p>{{ $t("PCLayout.rightBox[0]") }}</p>
          </div>
          <!-- 文档 -->
          <div class="document_icon" @mousemove="DocMousemove" @mouseleave="DocMouseleave" @click="toDocument">
            <img :src="imgBol ? documenIcon[0] : documenIcon[1]" alt="Help Center" />
            <p>{{ $t("PCLayout.rightBox[2]") }}</p>
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <!-- <transition :name="transitionName"> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
        </keep-alive>
        <!-- </transition> -->
        <!-- <transition :name="transitionName"> -->
        <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
        <!-- </transition> -->
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="isMask !== 'false' && registerAward">
      <div class="mask_content">
        <img src="../../assets/pc_img/layout_img/Gift bag.webp" alt="Gift bag" />
        <h2>{{ $t("PCLayout.gift[0]") }}</h2>
        <p :class="lang">{{ $t("PCLayout.gift[1]") }}</p>
        <div class="btn_sum">
          <!-- @click="maskFn" -->
          <!-- <el-button @click="maskFn(1)">{{ $t("PCLayout.gift[2]") }}</el-button> -->
          <p @click="maskFn(0)">{{ $t("PCLayout.gift[3]") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import detect from "@/utils/detect"
import settingsStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"

const { getUserInfo } = userStore()
const { lang, en } = settingsStore()
const { path, isProduc, isMask, registerAward } = layoutStore()
const router = useRouter()
const route = useRoute()

// 响应式状态
const imgBol = ref(true)
const idx = ref(0)
const place_name = ref("")
const bol = ref(false)
const transitionName = ref(null)

// 文档图片
const documenIcon = [
  new URL("@/assets/pc_img/layout_img/Help Center dark.png", import.meta.url),
  new URL("@/assets/pc_img/layout_img/Help Center bright.png", import.meta.url),
]

// 侧边栏

const menuData = ref([])
function getSlideList() {
  menuData.value = [
    {
      url_bright: new URL("../../assets/pc_img/layout_img/gaikuang_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/gaikuang.png", import.meta.url),
      name: "Overview", // 注意：这里需要使用 t 函数进行国际化
      path: "/overview",
      width: 26,
      height: 26,
      isShow: true,
    },
    {},
    {
      url_bright: new URL("../../assets/pc_img/layout_img/chanping_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/chanping.png", import.meta.url),
      name: "Products",
      path: "/products",
      width: 27,
      height: 26,
      isShow: true,
    },
    {
      url_bright: new URL("../../assets/pc_img/layout_img/dingdan_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/dingdan.png", import.meta.url),
      name: "Billings",
      path: "/billings",
      isShow: true,
    },
    {},
    {
      url_bright: new URL("../../assets/pc_img/layout_img/tiqu_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/tiqu.png", import.meta.url),
      name: "Obtain Proxy",
      path: "/proxy",
      isShow: true,
    },
    {
      url_bright: new URL("../../assets/pc_img/layout_img/api_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/api.png", import.meta.url),
      name: "API",
      path: "/api",
      isShow: true,
    },
    {
      url_bright: new URL("../../assets/pc_img/layout_img/shezhi_light.png", import.meta.url),
      url_dark: new URL("../../assets/pc_img/layout_img/shezhi.png", import.meta.url),
      name: "Settings",
      path: "/settings",
      isShow: true,
    },
  ]
}
getSlideList()

// 方法
function nav_exchange(index, item) {
  if (item.name === "Products") {
    // store.commit("layout/setIsProduc", false)
  }
  idx.value = index
  place_name.value = item.name
  router.push(item.path)
}

function animationFn() {
  bol.value = true
}

function animationFn1() {
  bol.value = false
}

function gotoPay() {
  // store.commit("layout/setIsProduc", true)
  router.push("/products")
}

function DocMousemove() {
  imgBol.value = false
}

function DocMouseleave() {
  imgBol.value = true
}

function toDocument() {
  router.push("/doc")
}

function maskFn(bol) {
  detect.gift()
  localStorage.setItem("mask", false)
  // store.commit("layout/setIsMask", "false")
  if (!bol) {
    // store.commit("setIsdocument", "Help")
    // store.commit("setDocumentIdx", "1-0")
    router.push("/doc")
  }
}

// 监听
watch(
  () => path.value,
  (val) => {
    if (val === "/docs_help") {
      place_name.value = "Help" // 需要使用 t 函数进行国际化
      return
    }
    menuData.value.forEach((item, index) => {
      if (item.path === val) {
        idx.value = index
        place_name.value = item.name
      }
    })
  },
  { immediate: true }
)

watch(
  () => route,
  (to, from) => {
    if (to.meta.index > from.meta.index) {
      transitionName.value = "slide-left"
    } else {
      transitionName.value = "slide-right"
    }
  }
)

// 生命周期钩子
onMounted(() => {
  getUserInfo()
})
</script>

<style lang="less" scoped>
@import url("./layout.less");
// .fade-enter{
//   opacity: 0;
//   transform: translateY(-10px);
// }
// .fade-enter-to{
//   opacity: .5;
//   transition: all .4s linear;
// }
// .fade-leave{
//   opacity: .5;
// }
// .fade-leave-to{
//   opacity: 0;
//   transition: all .1s linear;
//   transform: translateY(10px);
// }
</style>
