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
          <template v-for="(item, index) in column_list" :key="index">
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
        {{ $t("PCLayout.tip[0]") }}<span @click="$router.push('/help_document')">{{ $t("PCLayout.tip[1]") }}</span>
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
          <div class="document_icon" @mousemove="DocMousemove" @mouseleave="DocMouseleave" @click="gotoDocum">
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
import { ref, computed, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import detect from "@/utils/detect"
import settingsStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"

const { getUserInfo } = userStore()
const { lang } = settingsStore()
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

// 侧边栏数据
const column_list = ref([
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
    path: "/obtain_proxy",
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
])

// 方法
const nav_exchange = (index, item) => {
  if (item.name === "Products") {
    // store.commit("layout/setIsProduc", false)
  }
  idx.value = index
  place_name.value = item.name
  router.push(item.path)
}

const animationFn = () => {
  bol.value = true
}

const animationFn1 = () => {
  bol.value = false
}

const gotoPay = () => {
  // store.commit("layout/setIsProduc", true)
  router.push("/products")
}

const DocMousemove = () => {
  imgBol.value = false
}

const DocMouseleave = () => {
  imgBol.value = true
}

const gotoDocum = () => {
  // store.commit("setIsdocument", "Getting")
  // store.commit("setDocumentIdx", "0-0")
  router.push("/help_document")
}

const maskFn = (bol) => {
  detect.gift()
  localStorage.setItem("mask", false)
  // store.commit("layout/setIsMask", "false")
  if (!bol) {
    // store.commit("setIsdocument", "Help")
    // store.commit("setDocumentIdx", "1-0")
    router.push("/help_document")
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
    column_list.value.forEach((item, index) => {
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
  // 预加载组件
  // import("@/views/layout/overview/overview.vue")
  // import("@/views/layout/products/products.vue")
  // import("@/views/layout/billings/billings.vue")
  // import("@/views/layout/obtain_proxy/obtain_proxy.vue")
  // import("@/views/layout/settings/settings.vue")
  // import("@/views/layout/api_config/api_config.vue")
})

// Meta 信息
defineOptions({
  name: "LayOut",
  metaInfo: {
    meta: [
      {
        name: "keyWords",
        content: "layout",
      },
      {
        name: "description",
        content: "This is the layout page",
      },
    ],
  },
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
