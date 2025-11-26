<template>
  <div class="front" id="front">
    <!-- <HomeBg class="home_bg w-full" v-if="isHome && homeHeight" :height="homeHeight" /> -->

    <Header />

    <router-view />

    <Footer />

    <div class="linear_bg" v-if="isHome">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1738 487">
        <path d="M0 0h1420.92s713.43 457.505 0 485.868C707.502 514.231 0 0 0 0z" fill="url(#paint0_linear)"></path>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="0" x2="1049.98" y1="0" y2="912.68">
            <stop stop-color="currentColor" stop-opacity=".075"></stop>
            <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/header/header.vue"
import Footer from "./components/footer/footer.vue"
import { computed, onMounted, provide, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { platDataIndex } from "../../api/home"
import HomeBg from "./components/homeBg.vue"

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
const isHome = computed(() => route.path === "/home")
console.log(isHome.value)

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
  console.log(import.meta.env.MODE)
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
      .content {
        margin-top: 40px;
      }
    }
  }
}
</style>
