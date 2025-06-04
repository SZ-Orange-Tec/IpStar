<template>
  <div class="pricing">
    <!-- pricing_content -->

    <div class="box price">
      <div class="container">
        <div class="column_center space-y-10">
          <div class="text-3xl column_center space-y-5">
            <p v-html="t('pricing_spec.des')" class="text-center"></p>

            <span class="text-lg">IPs: 50M+/day</span>
          </div>

          <div class="price_main">
            <ProductList :tabbar="false" :pack="5"></ProductList>
          </div>
        </div>
      </div>
    </div>

    <div class="box split payment">
      <div class="container column_center">
        <div class="w-full relative column_center space-y-5">
          <div class="flex space-x-10">
            <img src="../../../assets/pc_img/pricing_img/Paypal.png" alt="" />
            <img src="../../../assets/pc_img/pricing_img/Visa.png" alt="" />
            <img src="../../../assets/pc_img/pricing_img/yinlian.png" alt="" />
            <img src="../../../assets/pc_img/pricing_img/mastercard.png" alt="" />
            <img src="../../../assets/pc_img/pricing_img/USDT.png" alt="" />
          </div>
          <h1>{{ t("pricing_spec.payment") }}</h1>

          <div class="trans"></div>
        </div>
      </div>
    </div>

    <div class="box country">
      <div class="container">
        <div class="column_center">
          <p class="text-3xl">{{ t("pricing_spec.popular") }}</p>
          <ul class="gird">
            <li v-for="(item, index) in areaList" :key="index" class="v_center space-x-3">
              <img :src="item.imgUrl" alt="" width="47" />
              <div class="text">
                <p>{{ item.p }}</p>
                <span>{{ item.span }}</span>
              </div>
            </li>
          </ul>
          <p @click="moreCountry" class="pointer" v-html="t('pricing_spec.support')"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import loginStore from "@/store/login"
import ProductList from "../components/product_list/product_list.vue"
import Message from "@/components/message/message"
import settingStore from "@/store/setting"
const { t } = useI18n()

// meta信息
// defineOptions({
//   name: "PriCing",
//   metaInfo: {
//     meta: [
//       {
//         name: "keyWords",
//         content: "pricing",
//       },
//       {
//         name: "description",
//         content: "This is the pricing page",
//       },
//     ],
//   },
// })

const router = useRouter()
const { token } = loginStore()
const { en } = settingStore()

// 响应式数据)
const areaList = ref([
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/united states.png", import.meta.url).href,
    p: "United States",
    span: "894,243 IPs",
  },
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/brazil.png", import.meta.url).href,
    p: "Brazil",
    span: "5,054,208 IPs",
  },
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/australia.png", import.meta.url).href,
    p: "Australia",
    span: "379,344 IPs",
  },
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/france.png", import.meta.url).href,
    p: "France",
    span: "1,592,304 IPs",
  },
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/canada.png", import.meta.url).href,
    p: "Canada",
    span: "586,688 IPs",
  },
  {
    imgUrl: new URL("../../../assets/pc_img/pricing_img/malaysia.png", import.meta.url).href,
    p: "Malaysia",
    span: "868,208 IPs",
  },
])

// 方法
const moreCountry = () => {
  if (!token) {
    Message({
      type: "warning",
      message: en ? "Please login to view more countries" : "请登录查看更多国家",
    })
    router.push("/login")
  } else {
    router.push("/overview")
  }
}
</script>

<style lang="less" scoped>
@import url("./pricing.less");
</style>
