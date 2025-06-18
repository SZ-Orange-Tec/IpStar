<template>
  <div class="pc-home">
    <Header />

    <router-view />

    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/header/header.vue"
import Footer from "./components/footer/footer.vue"
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

// 预加载
function loadLogin() {
  import(/* webpackChunkName: "login" */ "@/views/login/login.vue").then(() => {
    window.removeEventListener("load", loadLogin)
  })
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
})
</script>

<style lang="less" scoped>
@import url("./front.less");
</style>
