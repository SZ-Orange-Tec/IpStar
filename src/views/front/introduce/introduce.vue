<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative">
      <div class="container space-y-10">
        <div class="space-y-10 text">
          <p class="title text-lg sm:text-2xl lg:text-3xl font-bold md:whitespace-pre-wrap" style="line-height: 1.5">
            {{ t(`home_spec.${secondName}.title`) }}
          </p>
          <p class="opacity-90 md:whitespace-pre-wrap">{{ t(`home_spec.${secondName}.desc`) }}</p>
        </div>

        <div class="v_center space-x-5" style="align-items: stretch">
          <IpButton type="major" class="h-10 w-40" @click="toLogin">{{ t("home_spec.start_now") }}</IpButton>
          <IpButton type="border" class="h-10 w-40" @click="router.push('/pricing')">{{ t("home_spec.view_try") }}</IpButton>
        </div>

        <div class="flex space-x-5 text-sm">
          <ul class="space-y-5" v-for="(item, index) in tag" :key="index">
            <li class="v_center space-x-2" v-for="i in item" :key="index + '-' + i">
              <CircleCheck :size="16" class="primary" />
              <p>{{ t(`home_spec.${secondName}.tag${i}`) }}</p>
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
        <div class="space-y-5" v-lazy="showSlow">
          <h4 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">{{ t(`home_spec.country`) }}</h4>
          <p class="text-center">{{ t(`home_spec.country_desc`) }}</p>
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

    <!-- 为什么选择 -->
    <div class="box why_choose">
      <div class="container column_center">
        <p class="title text-lg sm:text-2xl lg:text-3xl font-bold" v-lazy="showSlow">
          {{ t("home_spec.why") }}
          <span class="primary">IpStar</span>
        </p>

        <ul class="three column gap-8 md:v_center">
          <li class="pointer flex-1 transition-colors" @click="toHomeSecond('introduce')" v-lazy="showSlow">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:105px) 105px,89px" src="@/assets/images/home/why1.png" srcset="@/assets/images/home/why1.png 105w" />
            </div>

            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-bold text-center">{{ t("home_spec.why1_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why1_desc") }}</p>
            </div>
          </li>
          <li class="pointer flex-1 transition-colors" @click="toHomeSecond('efficient')" v-lazy="showSlow">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:90px) 96px,102px" src="@/assets/images/home/why2.png" srcset="@/assets/images/home/why2.png 96w" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-bold text-center">{{ t("home_spec.why2_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why2_desc") }}</p>
            </div>
          </li>
          <li class="pointer flex-1 transition-colors" @click="router.push('/pricing')" v-lazy="showSlow">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:90px) 105px,104px" src="@/assets/images/home/why3.png" srcset="@/assets/images/home/why3.png 105w" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-bold text-center">{{ t("home_spec.why3_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why3_desc") }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 覆盖多种应用场景 -->
    <div class="box auto">
      <div class="container">
        <div class="space-y-5 w-full" v-lazy="showSlow">
          <h3 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">{{ t("home_spec.cases_title") }}</h3>

          <p class="text-center">{{ t("home_spec.cases_desc") }}</p>
        </div>

        <div class="auto_content w-full" v-lazy="showSlow">
          <ul class="four flex" v-lazy="loadHoverImg">
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('data_collection')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four1.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active1.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four1_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four1_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('search_engine')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four2.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active2.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four2_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four2_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('social_media')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four3.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active3.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four3_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four3_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('ecommerce')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four4.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active4.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four4_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four4_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('market')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four5.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active5.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four5_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four5_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('bill')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four6.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active6.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four6_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four6_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('brand')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four7.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active7.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four7_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four7_desc") }}</p>
                </div>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/4" @click="toHomeSecond('ai_model')">
              <div class="pointer transition-colors space-y-5">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy src="@/assets/images/home/four8.webp" alt="" />
                  <img v-lazy src="@/assets/images/home/four_active8.webp" alt="" />
                </div>
                <div class="content flex-1 space-y-2">
                  <p class="text-center font-bold">{{ t("home_spec.four8_title") }}</p>
                  <p class="description text-sm">{{ t("home_spec.four8_desc") }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="w-full pack_title column_center space-y-5" v-lazy="showSlow">
          <p class="title text-lg sm:text-2xl lg:text-3xl font-bold text-center md:whitespace-pre-wrap">{{ t("home_spec.package_title") }}</p>

          <p class="description green">{{ t("home_spec.package_desc") }}</p>
        </div>
      </div>
    </div>

    <!-- package -->
    <div class="package box">
      <div class="container" v-lazy="showSlow">
        <div class="packlist" v-lazy="() => (isProduct = true)">
          <ProductList :tabbar="false" :pack="5" v-if="isProduct"></ProductList>
        </div>
      </div>
    </div>

    <div class="box question">
      <div class="container space-y-10">
        <div class="title" v-lazy="showSlow">
          <h3 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">常见问题</h3>
        </div>

        <div class="content space-y-5">
          <Question v-lazy="showSlow">
            <template #header> {{ t("question_spec.title1") }} </template>
            <template #content>
              <i18n-t keypath="question_spec.desc1" class="whitespace-pre-wrap" tag="p" scope="global">
                <template #product>
                  <a href="https://www.ipstar.io/product" target="_blank">https://www.ipstar.io/product</a>
                </template>
                <template #pricing>
                  <a href="https://www.ipstar.io/pricing" target="_blank">https://www.ipstar.io/pricing</a>
                </template>
              </i18n-t>
            </template>
          </Question>
          <Question v-lazy="showSlow">
            <template #header> {{ t("question_spec.title2") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc2") }}</p>
            </template>
          </Question>
          <Question v-lazy="showSlow">
            <template #header> {{ t("question_spec.title3") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc3") }}</p>
            </template>
          </Question>
          <Question v-lazy="showSlow">
            <template #header> {{ t("question_spec.title4") }} </template>
            <template #content>
              <p>{{ t("question_spec.desc4") }}</p>
            </template>
          </Question>
          <Question v-lazy="showSlow">
            <template #header> {{ t("question_spec.title5") }} </template>
            <template #content>
              <p class="whitespace-pre-wrap">{{ t("question_spec.desc5") }}</p>
            </template>
          </Question>
          <Question v-lazy="showSlow">
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
import { roundToDecimal } from "@/utils/tools"
import { track_gift } from "@/utils/detect"
import Confirm from "@/components/confirm/confirm"
import Message from "@/components/message/message"
import position from "../../../components/dialog/position"
// import GoogleLoginButton from "../components/googleLoginBtn/index.vue"
// import HomeTitle from "../components/homeTitle.vue"
import Question from "../components/question/question.vue"

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { en } = settingStore()
const { isLogin, token } = loginStore()

// 路由参数
const nameReg = /general|efficient|data_collection|search_engine|social_media|ecommerce|market|bill|brand|ai_model/
const secondName = computed(() => (nameReg.test(route.params.name) ? route.params.name : "general"))

const tag = computed(() => {
  return secondName.value === "efficient"
    ? [[1, 2, 3]]
    : secondName.value === "data_collection"
    ? [[1, 2]]
    : secondName.value === "general"
    ? [
        [1, 2, 3],
        [4, 5, 6],
      ]
    : [
        [1, 2],
        [3, 4],
      ]
})

// 异步组件
const isProduct = ref(false) // 是否加载product
const ProductList = defineAsyncComponent(() => import("../components/product_list/product_list.vue"))

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

// 累计用户
// const totalUser = ref(-1)
const partner = ref(-1)
const onlineIps = ref(-1)
const lowestPrice = ref(0.25)
async function getUserIps() {
  try {
    const result = homeData ?? (await platDataIndex())
    const { data } = result
    homeData = result

    partner.value = 0
    onlineIps.value = 0
    lowestPrice.value = data.lowest_price ? data.lowest_price / 100 : 0.25
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
        ? "We have already granted you a default authorization of 50M for testing traffic. You can contact us to apply for an additional 500M of testing traffic."
        : "我们已经默认授权给您50M的测试流量，您可以联系我们申请额外500M的测试流量。",
      cancelText: en.value ? "Later" : "以后再说",
      confirmText: en.value ? "Contact Now" : "立即联系",
      success: () => {
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

onMounted(() => {
  IpMap()
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
