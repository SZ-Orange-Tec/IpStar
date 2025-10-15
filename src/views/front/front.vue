<template>
  <div class="front">
    <Header />

    <router-view />

    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/header/header.vue"
import Footer from "./components/footer/footer.vue"
import { onMounted, provide, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { platDataIndex } from "../../api/home"

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

// 首页数据
const homeData = reactive({
  lowestPrice: 0,
  partners: 0,
  onlineIp: 0,
  ipsCount: 0,
  countrys: 0,
})
async function getHomeData() {
  try {
    const { data } = await platDataIndex()
    const { lowest_price: lowestPrice, partners_count: partners, online_ip_count: onlineIp, ips_count: ipsCount, country_count: countrys } = data

    homeData.lowestPrice = lowestPrice
    homeData.partners = partners
    homeData.onlineIp = onlineIp
    homeData.ipsCount = ipsCount
    homeData.countrys = countrys
  } catch (error) {
    console.log(error.message)
  }
}
provide("homeData", homeData)
getHomeData()

onMounted(() => {
  // 预加载登录页
  window.addEventListener("load", loadLogin)
})
</script>

<style lang="less" scoped>
@import url("./front.less");
</style>
