<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box">
      <div class="container column_center">
        <div class="column_center space-y-5">
          <p class="text-center title text-3xl" v-html="t('home_spec.intro_title')"></p>
          <p class="text-center description" v-html="t('home_spec.intro_desc')"></p>
        </div>

        <div class="my-16 v_center space-x-5">
          <IpButton type="primary" class="h-12 w-40 text-base" @click="giftPacks">{{ t("home_spec.try") }}</IpButton>
          <IpButton type="neutral" class="h-12 w-40 text-base px-3" @click="$router.push('/doc')">
            <div class="between w-full h-full">
              <span>{{ t("home_spec.tutorials") }}</span>
              <button>
                <MoveRight />
              </button>
            </div>
          </IpButton>
        </div>

        <div class="v_center">
          <div class="column_center px-5">
            <strong class="title text-2xl">15324</strong>
            <span class="description text-sm">{{ t("home_spec.Accumulated") }}</span>
            <span class="description text-sm">{{ t("home_spec.users") }}</span>
          </div>
          <div class="column_center px-5">
            <strong class="title text-2xl">1220</strong>
            <span class="description text-sm">{{ t("home_spec.online") }}</span>
            <span class="description text-sm">{{ t("home_spec.users") }}</span>
          </div>
        </div>

        <div class="intro1 img_box">
          <img src="@/assets/images/home/intro1.png" />
        </div>
        <div class="intro2 img_box space-y-4">
          <div class="v_center space-x-2">
            <img src="@/assets/images/home/intro_avatar.png" width="45" height="45" alt="" />
            <p>Noah Johnoson</p>
          </div>

          <div class="v_center space-x-2">
            <StarIcon :size="14" fill="hsl(var(--success))" color="hsl(var(--success))" v-for="item in 5" :key="item" />
            <span class="text-xs description">5.0</span>
          </div>

          <p class="text-lg title">IPStar is stable and <br />easy to use</p>
          <p class="text-xs description">"Fast speed and strong anonymit-<br />yhighly recommended.</p>
        </div>
        <!-- <div class="intro2 img_box">
          <img src="@/assets/images/home/intro2.png" />
        </div> -->
        <div class="intro3 img_box">
          <img src="@/assets/images/home/intro3.png" />
        </div>
      </div>
    </div>

    <!-- 优势 split -->
    <div class="advantage box split mt-10">
      <div class="container column_center">
        <div class="h-full relative">
          <ul class="v_center space-x-10">
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p v-html="t('home_spec.adv1')"></p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p v-html="t('home_spec.adv2')"></p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p v-html="t('home_spec.adv3')"></p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p v-html="t('home_spec.adv4')"></p>
            </li>
          </ul>

          <div class="trans"></div>
        </div>
      </div>
    </div>

    <!-- 为什么选择 -->
    <div class="box why_choose">
      <div class="container column_center">
        <p class="title text-3xl">Why Choose <span class="primary_text">IpStar</span></p>

        <ul class="three v_center space-x-8">
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/why1.png" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <p class="title text-base">{{ t("home_spec.why1_title") }}</p>
              <p class="description text-sm text-center">{{ t("home_spec.why1_desc") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/why2.png" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <p class="title text-base">{{ t("home_spec.why2_title") }}</p>
              <p class="description text-sm text-center" v-html="t('home_spec.why2_desc')"></p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/why3.png" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <p class="title text-base">{{ t("home_spec.why3_title") }}</p>
              <p class="description text-sm text-center" v-html="t('home_spec.why3_desc')"></p>
            </div>
          </li>
        </ul>

        <div class="w-full between mt-16">
          <div class="column">
            <div class="v_center space-x-2">
              <ToggleLeft :size="16" fill="#10b981" color="#10b981" />
              <p class="description text-xs">{{ t("home_spec.more") }}</p>
            </div>
            <p class="title text-3xl" v-html="t('home_spec.automatic')"></p>
          </div>

          <p class="description" v-html="t('home_spec.instant')"></p>
        </div>

        <ul class="four v_center space-x-4">
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/four1.png" alt="" />
            </div>
            <div class="content px-3 space-y-2">
              <p class="description text-xs">{{ t("home_spec.four1_desc") }}</p>
              <p class="title text-base">{{ t("home_spec.four1_title") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/four2.png" alt="" />
            </div>
            <div class="content px-3 space-y-2">
              <p class="description text-xs">{{ t("home_spec.four2_desc") }}</p>
              <p class="title text-base">{{ t("home_spec.four2_title") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/four3.png" alt="" />
            </div>
            <div class="content px-3 space-y-2">
              <p class="description text-xs">{{ t("home_spec.four3_desc") }}</p>
              <p class="title text-base">{{ t("home_spec.four3_title") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/four4.png" alt="" />
            </div>
            <div class="content px-3 space-y-2">
              <p class="description text-xs">{{ t("home_spec.four4_desc") }}</p>
              <p class="title text-base">{{ t("home_spec.four4_title") }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- world split -->
    <div class="world_split box split mt-16">
      <div class="container column_center">
        <div class="h-full relative">
          <div class="column_center space-x-5">
            <p class="title text-3xl" v-html="t('home_spec.world_title')"></p>
            <p class="description text-sm" v-html="t('home_spec.world_desc')"></p>
          </div>

          <div class="trans"></div>
        </div>
      </div>
    </div>

    <!-- world -->
    <div class="world box">
      <div class="container">
        <div class="w-full relative" style="padding-top: 39.8%">
          <div class="bg">
            <img src="@/assets/images/home/world.webp" class="bg" alt="" />
          </div>

          <img src="@/assets/images/home/light.png" class="light" width="32" height="32" style="left: 20%; top: 30%" alt="" />
          <img src="@/assets/images/home/light.png" class="light" width="32" height="32" style="left: 30%; bottom: 13%" alt="" />
          <img src="@/assets/images/home/light.png" class="light" width="32" height="32" style="left: 50%; top: 43%" alt="" />
          <img src="@/assets/images/home/light.png" class="light" width="32" height="32" style="right: 22%; top: 46%" alt="" />
          <img src="@/assets/images/home/light.png" class="light" width="32" height="32" style="right: 25%; bottom: 25%" alt="" />

          <div class="box content">
            <div class="container column h-full">
              <div class="text space-y-2 text-2xl font-bold">
                <p class="v_center space-x-2">
                  <span class="green">{{ ipsCount }} M+</span>
                  <span>IPS</span>
                </p>
                <p class="v_center space-x-2">
                  <span class="green">{{ countryCount }}</span>
                  <span>{{ t("home_spec.world_span") }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- app -->
    <div class="app box">
      <div class="container column_center">
        <p class="title text-3xl text-center" v-html="t('home_spec.app_title')"></p>

        <ul class="v_center space-x-5 mt-8">
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.e_commerce") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.any_game") }}</p>
          </li>
          <li class="v_center">
            <Dot :size="30" class="green" />
            <p class="description">{{ t("home_spec.file_transfer") }}</p>
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
      </div>
    </div>

    <!-- package -->
    <div class="package box">
      <div class="container">
        <div class="column_center space-y-5">
          <p class="title text-3xl text-center" v-html="t('home_spec.package_title')"></p>
          <p class="description text-base green">{{ t("home_spec.package_desc") }}</p>
        </div>

        <div class="mt-10">
          <KeepAlive>
            <ProductList :tabbar="false" :pack="5"></ProductList>
          </KeepAlive>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue"
import { platDataIndex, platDataConfig } from "@/api/home"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import ProductList from "../components/product_list/product_list.vue"
import { useRouter, useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
// import { ElMessage, ElNotification, ElMessageBox } from "element-plus"
import Message from "@/components/message/message.js"
import IpButton from "@/components/button/button.vue"
import { MoveRight, Star as StarIcon, ToggleLeft, Dot } from "lucide-vue-next"
import { ElMessageBox } from "element-plus"
import "element-plus/es/components/message-box/style/css"

const router = useRouter()
const { t } = useI18n()
const { gift, lang } = settingStore()
const { token } = loginStore()

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
const isgift = ref(false)
const isAward = ref(false)

// 转换computed
const ulWidth = computed(() => {
  return lang === "zh" ? "580px" : lang === "en" ? "800px" : "830px"
})

// 转换methods
const getDataConfig = async function () {
  try {
    const { data } = await platDataConfig()
    isAward.value = data.register_award
  } catch (err) {
    console.log(err)
  }
}

function goToPay() {
  if (token) {
    store.commit("layout/setIsProduc", true)
    router.push("/products")
  } else {
    Message({
      message: t("PCHomePage.goToPay"),
      type: "warning",
    })
    router.push("/sign_in")
  }
}

function isInViewPortOfOne(dom) {
  let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  viewPortHeight = viewPortHeight - 280
  const offsetTop = dom.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight
}

const IpMap = async function () {
  const { data } = await platDataIndex()
  ipsCount.value = 50 // data.ips_count
  countryCount.value = data.country_count
  mapData.value = data.countries.map((item) => {
    return {
      name: item.country,
      value: (item.ip_count / 10000).toFixed(2),
    }
  })
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

function giftPacks() {
  // 领取礼包
  if (token.value) {
    ElMessageBox.confirm(t("PCHomePage.giftBag.tip.message"), t("PCHomePage.giftBag.tip.title"), {
      cancelButtonText: t("PCHomePage.giftBag.tip.cancel"),
      confirmButtonText: t("PCHomePage.giftBag.tip.confirm"),
      center: true,
      callback: (action) => {
        if (action === "confirm") {
          window.$crisp.push(["do", "chat:open"])
        }
      },
    })
    return
  }
  router.push("/login")
  // ElNotification({
  //   title: "Hint",
  //   message: h("i", { style: "color: green" }, t("PCHomePage.hintTwo")),
  // })
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
onMounted(() => {
  // scroll()
  getDataConfig()
  IpMap()
})

// 定义组件
const hlNumberCounter = defineAsyncComponent(() => import("../components/NumberCounter/NumberCounter.vue"))

// meta信息
defineOptions({
  name: "PCHomePage",
  metaInfo: {
    meta: [
      {
        name: "keyWords",
        content: "home",
      },
      {
        name: "description",
        content: "This is the home page",
      },
    ],
  },
})
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
