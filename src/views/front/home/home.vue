<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative">
      <div class="container">
        <div class="space-y-10">
          <i18n-t
            keypath="home_spec.intro_title"
            tag="p"
            scope="global"
            class="title text-lg sm:text-2xl lg:text-3xl font-bold md:whitespace-pre-wrap"
            style="line-height: 2"
          >
            <template #primary>
              <span class="major">${{ lowestPrice }}/GB</span>
            </template>
          </i18n-t>
          <p class="opacity-90 md:whitespace-pre-wrap">{{ t("home_spec.intro_desc") }}</p>
        </div>

        <div class="my-16 v_center space-x-5" style="align-items: stretch">
          <template v-if="!isLogin">
            <IpButton type="major" class="h-10 w-40" @click="toLogin">{{ t("home_spec.start_now") }}</IpButton>
            <GoogleLoginButton v-if="!isLogin" />
          </template>
          <template v-else>
            <IpButton type="primary" class="h-10 px-5" @click="giftPacks">{{ t("home_spec.more_try") }}</IpButton>
            <IpButton type="ghost" class="h-10 w-40 px-5 tutorial transition-color" @click="$router.push('/doc')">
              <div class="between w-full h-full">
                <span>{{ t("home_spec.tutorials") }}</span>
                <button>
                  <MoveRight />
                </button>
              </div>
            </IpButton>
          </template>
        </div>

        <div class="v_center data rounded-md !items-stretch" v-lazy="getUserIps">
          <div class="column_center px-3">
            <strong class="title text-2xl" style="height: 2rem">
              <template v-if="partner !== -1">{{ partner }} +</template>
            </strong>
            <span class="description text-sm whitespace-pre-wrap text-center">{{ t("home_spec.partner") }}</span>
            <!-- <span class="description text-sm whitespace-pre-wrap">{{ t("home_spec.users") }}</span> -->
          </div>
          <div class="bg-current w-[1px] mx-5" style="color: #eef5ff"></div>
          <div class="column_center px-3">
            <strong class="title text-2xl" style="height: 2rem">
              <template v-if="onlineIps !== -1">{{ onlineIps }}</template>
            </strong>
            <span class="description text-sm whitespace-pre-wrap text-center">{{ t("home_spec.online") }}</span>
          </div>
        </div>
      </div>

      <div class="background">
        <!-- <StarPlay /> -->
      </div>
    </div>

    <!-- 优势 split -->
    <div class="advantage box">
      <div class="container column_center relative">
        <div class="h-full">
          <ul class="column_center !items-stretch gap-5 md:v_center">
            <li class="v_center space-x-2">
              <StarIcon :size="16" fill="currentColor" class="major" />
              <p class="whitespace-pre-wrap sm:whitespace-normal">{{ t("home_spec.adv1") }}</p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" fill="currentColor" class="major" />
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv2") }}</p>
            </li>
            <!-- <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p>{{ t("home_spec.adv3") }}</p>
            </li> -->
            <li class="v_center space-x-2">
              <StarIcon :size="16" fill="currentColor" class="major" />
              <p class="whitespace-pre-wrap">{{ t("home_spec.adv4") }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 为什么选择 -->
    <div class="box why_choose">
      <div class="container column_center">
        <p class="title text-lg sm:text-2xl lg:text-3xl font-bold">
          {{ t("home_spec.why") }}
          <span class="primary_text">IpStar</span>
        </p>

        <ul class="three column gap-8 md:v_center">
          <li class="flex-1">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:105px) 105px,89px" src="@/assets/images/home/why1.png" srcset="@/assets/images/home/why1.png 105w" />
            </div>

            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-bold text-center">{{ t("home_spec.why1_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why1_desc") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box vh_center">
              <img v-lazy sizes="(max-width:90px) 96px,102px" src="@/assets/images/home/why2.png" srcset="@/assets/images/home/why2.png 96w" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <h3 class="font-bold text-center">{{ t("home_spec.why2_title") }}</h3>
              <p class="text-sm text-center">{{ t("home_spec.why2_desc") }}</p>
            </div>
          </li>
          <li class="flex-1">
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

    <!-- 自动且即时交付 -->
    <div class="box auto">
      <div class="container column_center">
        <div class="auto_header column md:between mt-16 gap-2">
          <div class="column">
            <div class="v_center space-x-2">
              <ToggleLeft :size="16" fill="#10b981" color="#10b981" />
              <p class="description text-xs whitespace-nowrap md:whitespace-pre-wrap">{{ t("home_spec.more") }}</p>
            </div>
            <p class="title text-lg sm:text-2xl lg:text-3xl font-bold whitespace-normal md:whitespace-pre-wrap">{{ t("home_spec.automatic") }}</p>
          </div>

          <p class="description whitespace-normal md:whitespace-pre-wrap">{{ t("home_spec.instant") }}</p>
        </div>

        <div class="auto_content w-full">
          <ul class="four grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <li class="flex-1 column rounded-lg">
              <div class="img_box vh_center" :width="300" :height="270">
                <img v-lazy src="@/assets/images/home/four1.png" alt="" />
              </div>
              <div class="content flex-1 px-3 space-y-2 column">
                <p class="font-bold">{{ t("home_spec.four1_title") }}</p>
                <p class="description text-xs">{{ t("home_spec.four1_desc") }}</p>
              </div>
            </li>
            <li class="flex-1 column rounded-lg">
              <div class="img_box vh_center" :width="300" :height="270">
                <img v-lazy src="@/assets/images/home/four2.png" alt="" />
              </div>
              <div class="content flex-1 px-3 space-y-2 column">
                <p class="font-bold">{{ t("home_spec.four2_title") }}</p>
                <p class="description text-xs">{{ t("home_spec.four2_desc") }}</p>
              </div>
            </li>
            <li class="flex-1 column rounded-lg">
              <div class="img_box vh_center" :width="300" :height="270">
                <img v-lazy src="@/assets/images/home/four3.png" alt="" />
              </div>
              <div class="content flex-1 px-3 space-y-2 column">
                <p class="font-bold">{{ t("home_spec.four3_title") }}</p>
                <p class="description text-xs">{{ t("home_spec.four3_desc") }}</p>
              </div>
            </li>
            <li class="flex-1 column rounded-lg">
              <div class="img_box vh_center" :width="300" :height="270">
                <img v-lazy src="@/assets/images/home/four4.png" alt="" />
              </div>
              <div class="content flex-1 px-3 space-y-2 column">
                <p class="font-bold">{{ t("home_spec.four4_title") }}</p>
                <p class="description text-xs">{{ t("home_spec.four4_desc") }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="w-full world_split column_center space-x-5">
          <HomeTitle>
            <i18n-t keypath="home_spec.world_title" tag="p" scope="global" class="title text-lg sm:text-2xl lg:text-3xl font-bold">
              <template #primary>
                <span class="primary_text">{{ t("home_spec.world_title_slot") }}</span>
              </template>
            </i18n-t>
          </HomeTitle>
          <p class="description text-sm">{{ t("home_spec.world_desc") }}</p>
        </div>
      </div>
    </div>

    <div class="world box" v-lazy="IpMap">
      <div class="container between">
        <div class="img_box flex-1">
          <img src="@/assets/images/home/world.png" height="400" alt="" />
        </div>

        <div class="content h-full py-3 box-border">
          <div class="space-y-5">
            <h3 class="primary text-lg font-bold">Accurate coverage</h3>
            <p class="text-sm">
              90 million real residential agency IPs,helpingCovering over 200 countries and providing over enterpriseseasily expand their global
              business
            </p>
          </div>

          <div class="space-y-5">
            <p class="font-medium">premiumresources</p>

            <ul class="column space-y-3">
              <li class="v_center space-x-1">
                <div class="w-4 h-4 primary bg-current rounded-full vh_center">
                  <Check :size="12" color="white" />
                </div>
                <p>lected high-quality IP resources</p>
              </li>
              <li class="v_center space-x-1">
                <div class="w-4 h-4 primary bg-current rounded-full vh_center">
                  <Check :size="12" color="white" />
                </div>
                <p>And continuously optimize the IP pool</p>
              </li>
              <li class="v_center space-x-1">
                <div class="w-4 h-4 primary bg-current rounded-full vh_center">
                  <Check :size="12" color="white" />
                </div>
                <p>Ensure a smooth and stable online experience</p>
              </li>
              <li class="v_center space-x-1">
                <div class="w-4 h-4 primary bg-current rounded-full vh_center">
                  <Check :size="12" color="white" />
                </div>
                <p>Enhance user experience</p>
              </li>
            </ul>

            <ip-button type="major" class="h-8 px-3">Learn More</ip-button>
          </div>
        </div>
      </div>
    </div>

    <!-- app -->
    <div class="app box">
      <div class="container column_center">
        <HomeTitle>
          <p class="title text-lg sm:text-2xl lg:text-3xl font-bold text-center md:whitespace-pre-wrap">{{ t("home_spec.app_title") }}</p>
        </HomeTitle>

        <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-8 text-xs sm:text-sm" style="flex-wrap: wrap">
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.e_commerce") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.media") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.model_training") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.ad_tech") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.serp_seo") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.finance") }}</p>
          </li>
        </ul>

        <img v-lazy src="@/assets/images/home/app.webp" alt="" />

        <div class="w-full pack_title column_center space-y-5">
          <HomeTitle>
            <p class="title text-lg sm:text-2xl lg:text-3xl font-bold text-center md:whitespace-pre-wrap">{{ t("home_spec.package_title") }}</p>
          </HomeTitle>
          <p class="description green">{{ t("home_spec.package_desc") }}</p>
        </div>
      </div>
    </div>

    <!-- package -->
    <div class="package box">
      <div class="container">
        <div v-lazy="() => (isProduct = true)">
          <ProductList :tabbar="false" :pack="5" v-if="isProduct"></ProductList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, nextTick } from "vue"
import { platDataIndex } from "@/api/home"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { MoveRight, Star as StarIcon, ToggleLeft, Dot, Code, Laptop, Check } from "lucide-vue-next"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import vLazy from "@/directive/lazy"
import IpImage from "@/components/image/image.vue"
import anime from "animejs/lib/anime.es.js"
import { roundToDecimal } from "@/utils/tools"
import { track_gift } from "@/utils/detect"
import Confirm from "@/components/confirm/confirm"
import Message from "@/components/message/message"
import position from "../../../components/dialog/position"
import GoogleLoginButton from "../components/googleLoginBtn/index.vue"
import HomeTitle from "../components/homeTitle.vue"

const router = useRouter()
const { t } = useI18n()
const { en } = settingStore()
const { isLogin, token } = loginStore()

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
      value: (item.ip_count / 10000).toFixed(2),
      icon: countryImg[key].default,
    }
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
  router.push("/login")
  Message({
    type: "info",
    message: t("gift_spec.sign_up", { gift: "50M" }),
  })
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
@import url("./home.less");
</style>
