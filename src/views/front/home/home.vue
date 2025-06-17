<template>
  <div class="home w-full">
    <!-- 介绍 -->
    <div class="introduce box relative">
      <div class="container column_center">
        <div class="column_center space-y-5">
          <i18n-t keypath="home_spec.intro_title" tag="p" scope="global" class="text-center title text-3xl font-bold">
            <template #primary>
              <span class="primary_text">{{ t("home_spec.intro_title_slot") }}</span>
            </template>
          </i18n-t>
          <p class="text-center description">{{ t("home_spec.intro_desc") }}</p>
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
            <span class="description text-sm">IP</span>
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
          <p class="text-xs description">"Fast speed and strong anony-<br />mity highly recommended.</p>
        </div>
        <!-- <div class="intro2 img_box">
          <img src="@/assets/images/home/intro2.png" />
        </div> -->
        <div class="intro3 img_box">
          <img src="@/assets/images/home/intro3.png" />
        </div>
      </div>

      <div class="background">
        <StarPlay />
      </div>
    </div>

    <!-- 优势 split -->
    <div class="advantage box split">
      <div class="container column_center">
        <div class="h-full relative">
          <ul class="v_center space-x-10">
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p>{{ t("home_spec.adv1") }}</p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p>{{ t("home_spec.adv2") }}</p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p>{{ t("home_spec.adv3") }}</p>
            </li>
            <li class="v_center space-x-2">
              <StarIcon :size="16" :strokeWidth="0" fill="#10b981" />
              <p>{{ t("home_spec.adv4") }}</p>
            </li>
          </ul>

          <div class="trans"></div>
        </div>
      </div>
    </div>

    <!-- 为什么选择 -->
    <div class="box why_choose">
      <div class="container column_center">
        <p class="title text-3xl font-bold">
          {{ t("home_spec.why") }}
          <span class="primary_txt">IpStar</span>
        </p>

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
              <p class="description text-sm text-center">{{ t("home_spec.why2_desc") }}</p>
            </div>
          </li>
          <li class="flex-1">
            <div class="img_box">
              <img src="@/assets/images/home/why3.png" />
            </div>
            <div class="column_center space-y-3 px-3 content">
              <p class="title text-base">{{ t("home_spec.why3_title") }}</p>
              <p class="description text-sm text-center">{{ t("home_spec.why3_desc") }}</p>
            </div>
          </li>
        </ul>

        <div class="w-full between mt-16">
          <div class="column">
            <div class="v_center space-x-2">
              <ToggleLeft :size="16" fill="#10b981" color="#10b981" />
              <p class="description text-xs">{{ t("home_spec.more") }}</p>
            </div>
            <p class="title text-3xl font-bold">{{ t("home_spec.automatic") }}</p>
          </div>

          <p class="description">{{ t("home_spec.instant") }}</p>
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
            <i18n-t keypath="home_spec.world_title" tag="p" scope="global" class="title text-3xl font-bold">
              <template #primary>
                <span class="primary_text">{{ t("home_spec.world_title_slot") }}</span>
              </template>
            </i18n-t>
            <p class="description text-sm">{{ t("home_spec.world_desc") }}</p>
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

          <div class="content">
            <div class="container column h-full">
              <div class="text space-y-2 text-2xl font-bold">
                <p class="v_center space-x-2">
                  <span class="green">{{ countryCount }}</span>
                  <span>{{ t("home_spec.world_span") }}</span>
                </p>
                <p class="v_center space-x-2">
                  <span class="green">{{ ipsCount }} M+</span>
                  <span>IPS</span>
                </p>
              </div>
            </div>
          </div>

          <div v-for="item in mapData" :key="item.name" class="country v_center space-x-2" :class="item.name">
            <img :src="item.icon" width="36" alt="" />
            <div class="country-box v_center h-8 space-x-2 px-3 text-xs">
              <div class="dot vh_center"></div>
              <span>{{ item.value }} </span>
              <span class="primary_text">IPS+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- app -->
    <div class="app box">
      <div class="container column_center">
        <p class="title text-3xl font-bold text-center">{{ t("home_spec.app_title") }}</p>

        <ul class="v_center space-x-5 mt-8" style="flex-wrap: wrap">
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

        <img src="@/assets/images/home/app.png" alt="" />
      </div>
    </div>

    <!-- package -->
    <div class="package box">
      <div class="container">
        <div class="column_center space-y-5">
          <p class="title text-3xl font-bold text-center">{{ t("home_spec.package_title") }}</p>
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
import { ref, computed, onMounted } from "vue"
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
import StarPlay from "@/views/front/components/starPlay/gptstar.vue"

const router = useRouter()
const { t } = useI18n()
const { en } = settingStore()
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

// 视频加载完成
const startLoadVideo = ref(false)
function videoLoaded(e) {
  e.target.style.opacity = 1
}
function bgLoaded() {
  startLoadVideo.value = true
}

// 转换computed

// 转换methods
const getDataConfig = async function () {
  try {
    const { data } = await platDataConfig()
    isAward.value = data.register_award
  } catch (err) {
    console.log(err)
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

  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })

  mapData.value = data.countries.map((item) => {
    const key = `/src/assets/images/home/country/${item.country}.png`
    return {
      name: item.country,
      value: (item.ip_count / 10000).toFixed(2),
      icon: countryImg[key].default,
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
    ElMessageBox.confirm(
      en.value ? "You can contact customer service to apply for a 500M trial traffic pack." : "您可以联系客服申请500M的试用流量包。",
      en.value ? "Tip" : "温馨提示",
      {
        cancelButtonText: en.value ? "I know" : "我知道了",
        confirmButtonText: en.value ? "Contact No" : "立即联系",
        center: true,
        callback: (action) => {
          if (action === "confirm") {
            window.$crisp.push(["do", "chat:open"])
          }
        },
      }
    )
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
onMounted(() => {
  // scroll()
  getDataConfig()
  IpMap()
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
