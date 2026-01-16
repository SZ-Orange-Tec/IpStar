<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative">
      <div class="container space-y-10">
        <div class="space-y-10 text">
          <p class="title text-lg sm:text-2xl lg:text-3xl font-bold md:whitespace-pre-wrap" style="line-height: 1.5">
            {{ t(`intro_spec.${secondName}.title`) }}
          </p>
          <p class="opacity-90 md:whitespace-pre-wrap">{{ t(`intro_spec.${secondName}.desc`) }}</p>
        </div>

        <div class="v_center space-x-5" style="align-items: stretch">
          <IpButton type="major" class="h-10 w-40" @click="toLogin">{{ t("intro_spec.start_now") }}</IpButton>
          <IpButton type="border" class="h-10 w-40" @click="router.push('/pricing')">{{ t("intro_spec.view_try") }}</IpButton>
        </div>

        <div class="flex space-x-5 text-sm">
          <ul class="space-y-5" v-for="(item, index) in tag" :key="index">
            <li class="v_center space-x-2" v-for="i in item" :key="index + '-' + i">
              <CircleCheck :size="16" class="primary" />
              <p>{{ t(`intro_spec.${secondName}.tag${i}`) }}</p>
            </li>
          </ul>
          <!-- <ul class="space-y-5">
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>免费代理试用</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>HTTP（S/SOCKS5 &自定义）</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>轮换和粘性会话</p>
            </li>
          </ul> -->
        </div>
      </div>

      <div class="background">
        <!-- <StarPlay /> -->
      </div>
    </div>

    <!-- 国家ip -->
    <div class="country box">
      <div class="container">
        <div class="space-y-5">
          <h4 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">{{ t(`intro_spec.country`) }}</h4>
          <p class="text-center">{{ t(`intro_spec.country_desc`) }}</p>
        </div>

        <div class="country_list">
          <ul class="flex" v-if="mapData.length">
            <li class="w-1/2 md:w-1/3 lg:w-1/4" v-for="item in mapData" :key="item.name">
              <div class="column rounded-lg text-lg">
                <img v-lazy :src="item.icon" alt="" width="36" height="36" />
                <span>{{ item.name }}</span>
                <span>{{ item.value }} IPS+</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap why">
      <div class="container">
        <div class="font-medium text-center text-3xl">{{ t("home_spec.why_title") }}</div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits1.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why1_title") }}</div>
            <p>{{ t("home_spec.why1_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits2.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why2_title") }}</div>
            <p>{{ t("home_spec.why2_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits3.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why3_title") }}</div>
            <p>{{ t("home_spec.why3_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits4.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why4_title") }}</div>
            <p>{{ t("home_spec.why4_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits5.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why5_title") }}</div>
            <p>{{ t("home_spec.why5_desc") }}</p>
          </li>
          <li class="rounded-lg p-6 space-y-4 pointer">
            <img loading="lazy" width="40" height="40" src="@/assets/images/product/merits6.png" />
            <div class="text-lg font-medium">{{ t("home_spec.why6_title") }}</div>
            <p>{{ t("home_spec.why6_desc") }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 覆盖多种应用场景 -->
    <div class="box_wrap cases" ref="scenceRef">
      <div class="container">
        <div class="title text-3xl font-medium text-center">{{ t("intro_spec.cases_title") }}</div>

        <div class="content list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/home/data_collection" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/web.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four1_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four1_desc") }}</p>
          </a>
          <a href="/home/search_engine" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/seo.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four2_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four2_desc") }}</p>
          </a>
          <a href="/home/social_media" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/media.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four3_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four3_desc") }}</p>
          </a>
          <a href="/home/ecommerce" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/commerce.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four4_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four4_desc") }}</p>
          </a>
          <a href="/home/market" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/marketing.png" />
            <div class="font-medium text-lg">{{ t("intro_spec.four5_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four5_desc") }}</p>
          </a>
          <a href="/home/bill" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/ad.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four6_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four6_desc") }}</p>
          </a>
          <a href="/home/brand" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/brand.png" />
            <div class="font-medium text-lg">{{ t("intro_spec.four7_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four7_desc") }}</p>
          </a>
          <a href="/home/ai_model" class="item space-y-4">
            <img loading="lazy" width="36" height="36" src="@/assets/images/product/ai.webp" />
            <div class="font-medium text-lg">{{ t("intro_spec.four8_title") }}</div>
            <p class="grey-80">{{ t("intro_spec.four8_desc") }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- 代理 -->
    <div class="box_wrap proxy" v-lazy="getLowestPrice">
      <div class="container">
        <div class="space-y-5">
          <p class="text-xl lg:text-3xl font-semibold text-center md:whitespace-pre-wrap">
            {{ t("intro_spec.proxy_title") }}
          </p>
          <p class="text-center text-sm md:whitespace-pre-wrap">{{ t("intro_spec.proxy_desc") }}</p>
        </div>

        <div class="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="product_item residential">
            <div class="info">
              <img loading="lazy" src="@/assets/images/home/icon1.webp" width="48" height="48" />
              <div class="text-xl font-medium mt-4 leading-none">{{ t("Residential_Proxies") }}</div>
              <p class="mt-4">{{ t("intro_spec.residential_des") }}。</p>
              <ul class="space-y-3 text-sm grey-80 mt-5">
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("intro_spec.residential_adv1") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("intro_spec.residential_adv2") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("intro_spec.residential_adv3") }}</span>
                </li>
              </ul>
              <div class="between mt-7">
                <div class="left">
                  <div class="text-xs">{{ t("Starting_from") }}</div>
                  <div class="text-sm">
                    <span class="primary">$</span>
                    <b class="text-xl primary">{{ lowestPrice.residential }}</b>
                    <span>/GB</span>
                  </div>
                </div>

                <a href="/pricing/residential">
                  <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
                </a>
              </div>
            </div>
            <img loading="lazy" class="bg" src="@/assets/images/home/residential.webp" width="464" height="388" />
          </div>
          <div class="product_item space-y-4">
            <img loading="lazy" src="@/assets/images/home/icon2.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Phone_Proxies") }}</div>
            <p class="mt-4">{{ t("intro_spec.phone_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.phone_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.phone_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.phone_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.phone }}</b>
                  <span>/GB</span>
                </div>
              </div>

              <a href="/pricing/mobile">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon3.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Unlimited_Residential_Proxies") }}</div>
            <p class="mt-4">{{ t("intro_spec.unlimited_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.unlimited_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.unlimited_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.unlimited_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.unlimited }}</b>
                  <span>/{{ t("Day") }}</span>
                </div>
              </div>

              <a href="/pricing/unlimited">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon4.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Data_Center_Proxies") }}</div>
            <p class="mt-4">{{ t("intro_spec.data_center_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.data_center_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.data_center_adv2", { price: lowestPrice.data_center }) }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.data_center_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.data_center }}</b>
                  <span>/IP</span>
                </div>
              </div>

              <a href="/pricing/data_center">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon5.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("intro_spec.static_title") }}</div>
            <p class="mt-4">{{ t("intro_spec.static_desc") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.static_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.static_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("intro_spec.static_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.static }}</b>
                  <span>/IP</span>
                </div>
              </div>

              <a href="/pricing/static">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>

    <div class="box question">
      <div class="container space-y-10">
        <div class="title">
          <h3 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">{{ t("FAQ") }}</h3>
        </div>

        <div class="content space-y-5">
          <Question>
            <template #header> {{ t("question_spec.title1") }} </template>
            <template #content>
              <i18n-t keypath="question_spec.desc1" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #product>
                  <a href="https://www.ipstar.io/product/residential" target="_blank">https://www.ipstar.io/product/residential</a>
                </template>
                <template #pricing>
                  <a href="https://www.ipstar.io/pricing/residential" target="_blank">https://www.ipstar.io/pricing/residential</a>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title2") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc2") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title3") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc3") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title4") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc4") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title5") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("question_spec.desc5") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("question_spec.title6") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc6") }}</p>
            </template>
          </Question>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, nextTick, computed, onMounted } from "vue"
import { platDataIndex } from "@/api/home"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { MoveRight, Star as StarIcon, ToggleLeft, Dot, Code, Laptop, Check, CircleCheck } from "lucide-vue-next"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import { roundToDecimal, formatSizeUnits } from "@/utils/tools"
import { track_gift } from "@/utils/detect"
import Confirm from "@/components/confirm/confirm"
import Message from "@/components/message/message"
import position from "../../../components/dialog/position"
// import GoogleLoginButton from "../components/googleLoginBtn/index.vue"
// import HomeTitle from "../components/homeTitle.vue"
import Question from "../components/question/question.vue"
import layoutStore from "../../../store/layout"
import { platProductLowestPrices } from "@/api/product"
import {
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
  ChevronLeft,
} from "lucide-vue-next"

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { en } = settingStore()
const { isLogin, token } = loginStore()
const { registerAward, gift } = layoutStore()
const giftText = computed(() => formatSizeUnits(gift.value))

// 路由参数
const nameReg =
  /general|efficient|data_collection|search_engine|social_media|ecommerce|market|bill|brand|ai_model|residential|unlimited|mobile|data_center/
const secondName = computed(() => (nameReg.test(route.params.name) ? route.params.name : "general"))

const tag = computed(() => {
  return /efficient|mobile|data_center/.test(secondName.value)
    ? [[1, 2, 3]]
    : secondName.value === "data_collection"
      ? [[1, 2]]
      : /general|residential/.test(secondName.value)
        ? [
            [1, 2, 3],
            [4, 5, 6],
          ]
        : [
            [1, 2],
            [3, 4],
          ]
})

// 转换data为ref
const astrict = ref({
  num1: false,
  num2: false,
  num3: false,
  num4: false,
  num5: false,
  num6: false,
})
const step = ref(0)
const mapData = ref([])
const ipsCount = ref(null)
const ipsCountVal = ref(null)
const countryCount = ref(null)
const direction = ref("右")
const merchantTime = ref(null)

// 转换methods

function isInViewPortOfOne(dom) {
  let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  viewPortHeight = viewPortHeight - 280
  const offsetTop = dom.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight
}

let homeData // 首页数据
async function IpMap() {
  const result = homeData ?? (await platDataIndex())
  const { data } = result
  homeData = result

  const ip = 50 // data.ips_count
  const country = data.country_count
  ipsCount.value = 0
  countryCount.value = 0

  // 逐渐递增动画
  nextTick(() => {
    const ipobj = { charged: 0 }
    anime({
      targets: ipobj,
      charged: ip,
      round: 1,
      easing: "linear",
      update: function () {
        ipsCount.value = ipobj.charged
      },
    })
    const countryObj = { charged: 0 }
    anime({
      targets: countryObj,
      charged: country,
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
      // value: (item.ip_count / 10000).toFixed(2),
      value: toThousands(item.ip_count),
      icon: countryImg[key].default,
    }
  })
}
function toThousands(num) {
  // 先将数字转为字符串，并分割整数部分和小数部分
  let str = num.toString()
  let parts = str.split(".")
  let integerPart = parts[0]
  let decimalPart = parts.length > 1 ? "." + parts[1] : ""

  // 核心正则：从右往左，每三位数字前加一个逗号（但不能是开头）
  let reg = /(?!^)(?=(\d{3})+$)/g
  integerPart = integerPart.replace(reg, ",")

  return integerPart + decimalPart
}
function loadHoverImg() {
  import("@/assets/images/home/four_active1.webp")
  import("@/assets/images/home/four_active2.webp")
  import("@/assets/images/home/four_active3.webp")
  import("@/assets/images/home/four_active4.webp")
  import("@/assets/images/home/four_active5.webp")
  import("@/assets/images/home/four_active6.webp")
  import("@/assets/images/home/four_active7.webp")
  import("@/assets/images/home/four_active8.webp")
}

// 动画
function showSlow(e) {
  anime({
    targets: e,
    translateY: [200, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutQuart",
  })
}

// 跳转二级页面
function toHomeSecond(name) {
  router.push({
    name: "introduce",
    params: {
      name: name,
    },
  })
}
function toPriceSecond(name) {
  router.push({
    name: "pricing",
    params: {
      name: name,
    },
  })
  close()
}
function openService() {
  window.$crisp.push(["do", "chat:show"])
  window.$crisp.push(["do", "chat:open"])
}

// 累计用户
// const totalUser = ref(-1)
const partner = ref(-1)
const onlineIps = ref(-1)
async function getUserIps() {
  try {
    const result = homeData ?? (await platDataIndex())
    const { data } = result
    homeData = result

    partner.value = 0
    onlineIps.value = 0
    // 逐渐递增动画
    nextTick(() => {
      const ipObj = { charged: 0 }
      let ip = data?.online_ip_count ?? 3686927
      if (ip > Math.pow(10, 3)) {
        ip = roundToDecimal(ip / 1000, 2) + " K"
      }
      anime({
        targets: ipObj,
        charged: ip,
        round: 1,
        easing: "linear",
        update: function () {
          onlineIps.value = ipObj.charged
        },
      })
      const userObj = { charged: 0 }
      anime({
        targets: userObj,
        charged: data?.partners_count ?? 100,
        round: 1,
        easing: "linear",
        update: function () {
          partner.value = userObj.charged
        },
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

// 展示套餐数量
const pack = computed(() => {
  return !isLogin.value && registerAward.value ? 5 : 4
})

function merchantScroll() {
  merchantTime.value = setInterval(() => {
    if (direction.value === "右") {
      step.value += 2
      if (step.value >= 100) {
        step.value = 100
        direction.value = "左"
      }
    } else if (direction.value === "左") {
      step.value -= 2
      if (step.value <= 0) {
        step.value = 0
        direction.value = "右"
      }
    }
  }, 1000)
}

function toLogin() {
  if (isLogin.value) {
    router.push("/overview")
  } else {
    router.push("/login")
    Message({
      type: "info",
      message: t("gift_spec.sign_up", { gift: "50M" }),
    })
  }
}
function giftPacks(e) {
  // 领取礼包
  track_gift()

  if (token.value) {
    position.set({ x: e.clientX, y: e.clientY })
    Confirm({
      title: en.value ? "Prompt" : "温馨提示",
      message: en.value
        ? (gift.value > 0 ? `We have already granted you a default authorization of ${giftText.value} for testing traffic.` : "") +
          " You can contact us to apply for an additional 500M of testing traffic."
        : (gift.value > 0 ? `我们已经默认授权给您 ${giftText.value} 的测试流量` : "") + "您可以联系我们申请额外500M的测试流量。",
      cancelText: en.value ? "Later" : "以后再说",
      confirmText: en.value ? "Contact Now" : "立即联系",
      success: () => {
        window.$crisp.push(["do", "chat:show"])
        window.$crisp.push(["do", "chat:open"])
      },
    })
    return
  }

  router.push("/login")
}

function scroll() {
  const $el = document.querySelector(".pc-home_page").children[0].children[1].children
  function fn() {
    if (isInViewPortOfOne($el[0]) && !astrict.value.num1) {
      astrict.value.num1 = true
    }
    if (isInViewPortOfOne($el[1]) && !astrict.value.num2) {
      astrict.value.num2 = true
    }
    if (isInViewPortOfOne($el[2]) && !astrict.value.num3) {
      astrict.value.num3 = true
    }
    if (isInViewPortOfOne($el[3]) && !astrict.value.num5) {
      astrict.value.num5 = true
      if (!ipsCount.value) {
        IpMap().then(() => {
          ipsCountVal.value = ipsCount.value
        })
      } else {
        ipsCountVal.value = ipsCount.value
      }
    }
    if (isInViewPortOfOne($el[4]) && !astrict.value.num6) {
      astrict.value.num6 = true
      merchantScroll()
    }
    if (isInViewPortOfOne($el[5]) && !astrict.value.num4) {
      astrict.value.num4 = true
    }
  }
  window.addEventListener("scroll", fn)
  fn()
}

// 最低价格
const lowestPrice = ref({
  residential: "0.00",
  unlimited: "0.00",
  phone: "0.00",
  data_center: "0.00",
})
async function getLowestPrice() {
  try {
    const { data } = await platProductLowestPrices()
    const keys = ["residential", "unlimited", "phone", "data_center"]
    const target = {}
    data.forEach(({ prd_type, unit_price }) => {
      const key = keys[prd_type]
      target[key] = unit_price / 100
    })
    lowestPrice.value = target
  } catch (err) {
    console.log(err.message)
  }
}

// 滚动
const scenceRef = ref()
function scrollToScence() {
  const top = scenceRef.value.getBoundingClientRect().top
  console.log(top)
  window.scrollBy({
    top: top,
    behavior: "smooth",
  })
}

onMounted(() => {
  IpMap()
  if (/#scence/.test(window.location.href)) {
    setTimeout(() => {
      scrollToScence()
    }, 300)
  }
})
// 转换mounted
// onMounted(() => {
// scroll()
// getDataConfig()
// IpMap()
// })
</script>

<style lang="less" scoped>
.i-enter {
  transition: all 0.3s linear;
  transform: rotateX(-100deg);
  transform-origin: top;
  opacity: 0;
}

.i-enter-to {
  transition: all 0.3s linear;
  transform: rotateX(0deg);
  transform-origin: top;
  opacity: 1;
}
.i-leave {
  // transition: all .3s linear;
  transform: rotateX(0deg);
  transform-origin: top;
  opacity: 1;
}

.i-leave-to {
  transition: all 0.3s linear;
  transform: rotateX(70deg);
  transform-origin: top;
  opacity: 0;
}
@import url("./introduce.less");
</style>
