<template>
  <div class="front">
    <HeaderGift v-if="registerAward && !isLogin" @load="setStickyTop" />

    <Header :style="{ top: stickyTop }" />

    <router-view />

    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/header/header.vue"
import Footer from "./components/footer/footer.vue"
import { defineAsyncComponent, onMounted, computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { platDataConfig } from "@/api/home"
import layoutStore from "@/store/layout"
import loginStore from "@/store/login"

const { registerAward } = layoutStore()
const { isLogin } = loginStore()

// 预加载
function loadLogin() {
  import(/* webpackChunkName: "login" */ "@/views/login/login.vue").then(() => {
    window.removeEventListener("load", loadLogin)
  })
}

// 获取配置 是否展示礼包
const HeaderGift = defineAsyncComponent(() => import("./components/headerGift/headerGift.vue"))
async function isShowGift() {
  try {
    const { data } = await platDataConfig()
    registerAward.value = data.register_award
  } catch (err) {
    console.log(err.message)
  }
}

// 计算粘性定位的top值
// 计算粘性定位的top值
const stickyTop = ref(0)
function setStickyTop(value) {
  stickyTop.value = value
}

// 路由重定向
const route = useRoute()
const router = useRouter()
if (!route.path || route.path === "/") {
  router.replace("/home")
}

onMounted(() => {
  // 预加载登录页
  window.addEventListener("load", loadLogin)

  isShowGift()
})
</script>

<style lang="less" scoped>
@import url("./front.less");
</style>
