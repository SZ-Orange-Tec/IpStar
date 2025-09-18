<template>
  <div class="pricing">
    <!-- pricing_content -->

    <div class="box price relative">
      <div class="container">
        <div class="column_center">
          <div class="header text-xl sm:text-2xl lg:text-4xl column_center space-y-5">
            <i18n-t keypath="pricing_spec.des" tag="p" scope="global" class="text-center title md:whitespace-pre-wrap">
              <template #price>
                <span class="major">${{ lowestPrice }}/GB</span>
              </template>
            </i18n-t>

            <span class="text-base sm:text-xl lg:text-2xl description">IPs: <span class="major">50M+</span>/day</span>

            <Tabbar @select="changeActive" class="tabbar text-base"></Tabbar>
          </div>

          <div class="product w-full relative">
            <ProductList :tabbar="false" :pack="5" ref="product"></ProductList>
          </div>
        </div>
      </div>

      <div class="background"></div>
    </div>

    <!-- <div class="column_center pay space-y-5">
      <div class="imgs w-full between space-x-5">
        <img v-lazy src="@/assets/images/pricing/pay1.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay2.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay3.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay4.png" height="48" alt="" />
        <img v-lazy src="@/assets/images/pricing/pay5.png" height="48" alt="" />
      </div>
      <p class="primary">{{ t("pricing_spec.payment") }}</p>
    </div> -->

    <div class="box plan">
      <div class="container between">
        <div class="text column space-y-10">
          <div class="space-y-5">
            <h3 class="text-xl font-bold">全方位流量管理解决方案</h3>
            <p>轻松管理数据使用量，提供全面的流量管理面板，实时统计数据让您精准监控住宅代理的使用情况，从而有效避免超出预算。</p>
          </div>

          <ul class="space-y-3">
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>实时流量监控</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>流量消耗明细</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>自定义流量上限</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>子账号权限管理</p>
            </li>
          </ul>
        </div>

        <div class="img_box">
          <img src="@/assets/images/pricing/product_plan.png" alt="" />
        </div>
      </div>
    </div>

    <div class="box plan">
      <div class="container between">
        <div class="img_box">
          <img src="@/assets/images/pricing/bighow.png" alt="" />
        </div>

        <div class="text column space-y-10">
          <div class="space-y-5">
            <h3 class="text-xl font-bold">全方位流量管理解决方案</h3>
            <p>轻松管理数据使用量，提供全面的流量管理面板，实时统计数据让您精准监控住宅代理的使用情况，从而有效避免超出预算。</p>
          </div>

          <ul class="space-y-3">
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>实时流量监控</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>流量消耗明细</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>自定义流量上限</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="22" class="icon" />
              <p>子账号权限管理</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="container space-y-10">
        <div class="space-y-5">
          <h3 class="text-lg sm:text-2xl lg:text-3xl font-bold text-center">轻松实现多种代码集成</h3>
          <p class="text-center">提供多种编程语言的爬虫示例及详尽的API参数说明，支持快速集成与应用</p>
        </div>

        <div class=""></div>
      </div>
    </div>

    <div class="box">
      <div class="container"></div>
    </div>
  </div>
</template>

<script setup>
import { platDataIndex } from "@/api/home"
import { nextTick, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import loginStore from "@/store/login"
import ProductList from "../components/product_list/product_list.vue"
import Message from "@/components/message/message"
import settingStore from "@/store/setting"
import { roundToDecimal } from "@/utils/tools"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import Tabbar from "../components/product_list/tabbar/tabbar.vue"
import { CircleCheck } from "lucide-vue-next"

const { t } = useI18n()

const router = useRouter()
const { token } = loginStore()
const { en } = settingStore()

// 地图数据
const mapData = ref([])
const ipsCount = ref(null)
const countryCount = ref(null)
async function IpMap() {
  const { data } = await platDataIndex()

  ipsCount.value = 0
  countryCount.value = 0

  // 逐渐递增动画
  nextTick(() => {
    const ipobj = { charged: 0 }
    anime({
      targets: ipobj,
      charged: 50, // data.ips_count,
      round: 1,
      easing: "linear",
      update: function () {
        ipsCount.value = ipobj.charged
      },
    })
    const countryObj = { charged: 0 }
    anime({
      targets: countryObj,
      charged: data.country_count,
      round: 1,
      easing: "linear",
      update: function () {
        countryCount.value = countryObj.charged
      },
    })
  })

  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })

  mapData.value = data.countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/home/country/${country}.png`
    return {
      name: country,
      value: (item.ip_count / 10000).toFixed(2),
      icon: countryImg[key].default,
    }
  })
}

//
const product = ref(null)
function changeActive(index) {
  product.value.changeActive(index)
}
// 更多国家
// const areaList = ref([
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/united states.png", import.meta.url).href,
//     p: "United States",
//     span: "894,243 IPs",
//   },
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/brazil.png", import.meta.url).href,
//     p: "Brazil",
//     span: "5,054,208 IPs",
//   },
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/australia.png", import.meta.url).href,
//     p: "Australia",
//     span: "379,344 IPs",
//   },
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/france.png", import.meta.url).href,
//     p: "France",
//     span: "1,592,304 IPs",
//   },
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/canada.png", import.meta.url).href,
//     p: "Canada",
//     span: "586,688 IPs",
//   },
//   {
//     imgUrl: new URL("../../../assets/pc_img/pricing_img/malaysia.png", import.meta.url).href,
//     p: "Malaysia",
//     span: "868,208 IPs",
//   },
// ])
// const moreCountry = () => {
//   if (!token) {
//     Message({
//       type: "warning",
//       message: en ? "Please login to view more countries" : "请登录查看更多国家",
//     })
//     router.push("/login")
//   } else {
//     router.push("/overview")
//   }
// }

const showImg = ref(false)
function bgLoaded(e) {
  console.log("load")
  showImg.value = true
}

// 获取最低价格
const lowestPrice = ref(0.25)
async function getIndexData() {
  try {
    const { data } = await platDataIndex()
    lowestPrice.value = data.lowest_price ? data.lowest_price / 100 : 0.25
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  getIndexData()
})
</script>

<style lang="less" scoped>
@import url("./pricing.less");
</style>
