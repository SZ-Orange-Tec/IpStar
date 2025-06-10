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

// 预加载
function loadLogin() {
  import(/* webpackChunkName: "login" */ "@/views/login/login.vue")
  import("@/assets/images/login/video_bck.webp").then((res) => {
    console.log(res)
  })
}

onMounted(() => {
  loadLogin()
})
</script>

<style lang="less" scoped>
@import url("./front.less");
</style>
