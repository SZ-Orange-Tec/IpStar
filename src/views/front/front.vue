<template>
  <div class="front">
    <HomeBg class="home_bg w-full" v-if="homeHeight" :height="homeHeight" />

    <Header />

    <router-view />

    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/header/header.vue"
import Footer from "./components/footer/footer.vue"
import { onMounted, provide, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { platDataIndex } from "../../api/home"
import HomeBg from "./components/homeBg.vue"

const homeHeight = ref(0)
provide("homeHeight", homeHeight)

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
getHomeData()

onMounted(() => {
  // 预加载登录页
  window.addEventListener("load", loadLogin)
})
</script>

<style lang="less" scoped>
@import url("./front.less");
</style>

<style lang="less">
.box_wrap {
  padding: 0 2.5rem;
  & > .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 0;
    .content {
      margin-top: 60px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0 1rem;
    & > .container {
      padding: 2rem 0;
    }
  }
}
</style>
