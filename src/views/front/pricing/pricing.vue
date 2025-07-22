<template>
  <div class="pricing">
    <!-- pricing_content -->

    <div class="box price relative">
      <div class="container">
        <div class="column_center space-y-10">
          <div class="text-lg sm:text-2xl lg:text-3xl column_center space-y-5">
            <i18n-t keypath="pricing_spec.des" tag="p" scope="global" class="text-center title md:whitespace-pre-wrap">
              <template #price>
                <span class="primary_text">${{ lowestPrice }}/GB</span>
              </template>
            </i18n-t>

            <span class="text-lg sm:text-2xl lg:text-3xl description">IPs: 50M+/day</span>
          </div>

          <div class="price_main w-full relative" ref="product">
            <ProductList :tabbar="true" :pack="5"></ProductList>

            <img
              src="@/assets/images/pricing/star.png"
              class="float_img star hidden md:block"
              :style="{ opacity: showImg ? 1 : 0 }"
              width="80"
              height="80"
              alt=""
            />
            <img
              src="@/assets/images/pricing/star_move.png"
              class="float_img star_move hidden md:block"
              :style="{ opacity: showImg ? 1 : 0 }"
              width="149"
              height="66"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="background" style="padding-top: 67.9%" :style="{ opacity: showImg ? 1 : 0 }">
        <div class="img w-full" :style="{ top: top }">
          <img src="@/assets/images/pricing/background.png" @load="bgLoaded" class="w-full" alt="" />
        </div>
      </div>
    </div>

    <div class="column_center pay">
      <div class="w-full" style="max-width: 638px">
        <IpImage :width="638" :height="84">
          <img v-lazy src="@/assets/images/pricing/pay.png" alt="" />
        </IpImage>
      </div>
      <p class="primary_text">{{ t("pricing_spec.payment") }}</p>

      <div class="column_center scroll w-full">
        <div class="w-full" style="max-width: 28px">
          <IpImage :width="32" :height="143">
            <img v-lazy src="@/assets/images/pricing/scroll.png" width="28" alt="" />
          </IpImage>
        </div>
      </div>
    </div>

    <div class="world box" v-lazy="IpMap">
      <div class="container">
        <div class="w-full relative">
          <IpImage :width="1271" :height="498">
            <img v-lazy src="@/assets/images/home/world.webp" class="bg" alt="" />
          </IpImage>

          <div class="content">
            <div class="container column">
              <div class="text space-y-2 text-lg sm:text-2xl font-bold">
                <p class="v_center space-x-2">
                  <span class="green">{{ countryCount }}</span>
                  <span>{{ t("pricing_spec.world_span") }}</span>
                </p>
                <p class="v_center space-x-2">
                  <span class="green">{{ ipsCount }} M+</span>
                  <span>IPS</span>
                </p>
              </div>
            </div>

            <div class="country_box">
              <div v-for="item in mapData" :key="item.name" class="country v_center space-x-2" :class="item.name">
                <img v-lazy :src="item.icon" width="36" alt="" />
                <div class="detail v_center h-8 space-x-2 px-3 text-xs whitespace-nowrap">
                  <div class="dot vh_center"></div>
                  <span>{{ item.value }} </span>
                  <span class="primary_text">IPS+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { platDataIndex } from "@/api/home"
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
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

// 背景图片计算top
const top = ref(0)
const product = ref(null)
const showImg = ref(false)
function computeTop() {
  const width = window.innerWidth
  const imgWidth = 1431
  const imgHeight = 972
  const percent = 0.49 // 顶部到地球的高度占比
  const productTop = product.value.getBoundingClientRect().top - 60 //产品列表距离顶部的距离

  const height = (imgHeight / imgWidth) * width

  top.value = roundToDecimal(0 - height * percent + productTop, 0) + "px"
}
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
  computeTop()
  getIndexData()
  window.addEventListener("resize", computeTop)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", computeTop)
})
</script>

<style lang="less" scoped>
@import url("./pricing.less");
</style>
