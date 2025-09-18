<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative">
      <div class="container space-y-10">
        <div class="space-y-10">
          <i18n-t
            keypath="home_spec.intro_title"
            tag="p"
            scope="global"
            class="title text-lg sm:text-2xl lg:text-3xl font-bold md:whitespace-pre-wrap"
            style="line-height: 1.5"
          >
            <template #primary>
              <span class="major">${{ lowestPrice }}/GB</span>
            </template>
          </i18n-t>
          <p class="opacity-90 md:whitespace-pre-wrap">{{ t("home_spec.intro_desc") }}</p>
        </div>

        <div class="v_center space-x-5" style="align-items: stretch">
          <template v-if="!isLogin">
            <IpButton type="major" class="h-10 w-40" @click="toLogin">{{ t("home_spec.start_now") }}</IpButton>
            <!-- <GoogleLoginButton v-if="!isLogin" /> -->
            <IpButton type="border" class="h-10 w-40">{{ t("home_spec.start_now") }}</IpButton>
          </template>
          <template v-else>
            <IpButton type="major" class="h-10 px-5" @click="giftPacks">{{ t("home_spec.more_try") }}</IpButton>
            <IpButton type="major" class="h-10 w-40 px-5 tutorial transition-color" @click="$router.push('/doc')">
              <div class="between w-full h-full">
                <span>{{ t("home_spec.tutorials") }}</span>
                <button>
                  <MoveRight />
                </button>
              </div>
            </IpButton>
          </template>
        </div>

        <div class="flex space-x-5 text-sm">
          <ul class="space-y-5">
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>消耗 GB 计费</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>API 账密组合提取</p>
            </li>
            <li class="v_center space-x-2">
              <CircleCheck :size="16" class="primary" />
              <p>有流行的代理软件和APP</p>
            </li>
          </ul>
          <ul class="space-y-5">
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
          </ul>
        </div>
      </div>

      <div class="background">
        <!-- <StarPlay /> -->
      </div>
    </div>

    <!-- 国家ip -->
    <div class="country box" v-lazy="IpMap">
      <div class="container">
        <div class="space-y-5">
          <h4 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">热门国家</h4>
          <p class="text-center">探索多元化解决方案，提升业务效率与安全性</p>
        </div>

        <div class="country_list">
          <ul class="flex">
            <li v-for="item in mapData" :key="item.name">
              <div class="column rounded-lg text-lg">
                <img :src="item.icon" alt="" width="36" height="36" />
                <span>{{ item.name }}</span>
                <span>{{ item.value }}M IPS+</span>
              </div>
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
      <div class="container">
        <div class="space-y-5 w-full">
          <HomeTitle>
            <h3 class="title text-center text-lg sm:text-2xl lg:text-3xl font-bold">IpStar住宅代理覆盖多种场景</h3>
          </HomeTitle>

          <p class="text-center">助力企业在多个场景中实现高效运作和安全保障</p>
        </div>

        <div class="auto_content w-full">
          <ul class="four flex">
            <li v-for="item in scene" :key="item.title">
              <div class="pointer">
                <div class="img_box vh_center" :width="300" :height="270">
                  <img v-lazy :src="item.icon" alt="" />
                </div>
                <div class="content flex-1 px-3 space-y-2 column">
                  <p class="font-bold">{{ item.title }}</p>
                  <p class="description text-xs">{{ item.des }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

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
        <div class="packlist" v-lazy="() => (isProduct = true)">
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

// 场景
const scene = [
  {
    icon: new URL("@/assets/images/home/four1.png", import.meta.url).href,
    title: t("home_spec.four1_title"),
    des: t("home_spec.four1_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four2.png", import.meta.url).href,
    title: t("home_spec.four2_title"),
    des: t("home_spec.four2_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four3.png", import.meta.url).href,
    title: t("home_spec.four3_title"),
    des: t("home_spec.four3_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four4.png", import.meta.url).href,
    title: t("home_spec.four4_title"),
    des: t("home_spec.four4_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four1.png", import.meta.url).href,
    title: t("home_spec.four5_title"),
    des: t("home_spec.four5_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four2.png", import.meta.url).href,
    title: t("home_spec.four6_title"),
    des: t("home_spec.four6_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four3.png", import.meta.url).href,
    title: t("home_spec.four7_title"),
    des: t("home_spec.four7_desc"),
  },
  {
    icon: new URL("@/assets/images/home/four4.png", import.meta.url).href,
    title: t("home_spec.four8_title"),
    des: t("home_spec.four8_desc"),
  },
]

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
@import url("./introduce.less");
</style>
