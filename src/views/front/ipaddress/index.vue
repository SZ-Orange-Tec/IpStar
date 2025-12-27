<template>
  <div>
    <div class="box_wrap banner bg-[#F1F8FF]">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-5xl font-semibold leading-none">{{ t("ipaddress_spec.title") }}</h1>
        <p class="text-base lg:text-lg grey-80 mt-5">{{ t("ipaddress_spec.desc") }}</p>

        <div class="w-full max-w-5xl">
          <div class="w-full">
            <span class="text-sm">{{ t("IP_Address") }}</span>

            <div class="v_center space-x-3 mt-1">
              <IpInput v-model="ip" class="flex-1 min-w-0 h-12 !text-base rounded-md !bg-white" placeholder="0.0.0.0" />
              <IpButton type="primary" class="h-12 px-5 min-w-32" @click="getIpInfo">{{ t("Search") }}</IpButton>
            </div>

            <div class="mt-5 flex gap-16 bg-white rounded-lg px-6 py-10 relative">
              <ul class="flex-1 min-w-0 column space-y-5">
                <li class="between w-full">
                  <strong class="font-medium">IP</strong>
                  <span class="text-sm grey-80">{{ info?.IP || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Country") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Country || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Latitude") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Latitude || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Longitude") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Longitude || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Mobile") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Mobile || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Usage_Type") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Usage_Type || "-" }}</span>
                </li>
              </ul>
              <ul class="flex-1 min-w-0 column space-y-5">
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Region") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Region || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("City") }}</strong>
                  <span class="text-sm grey-80">{{ info?.City || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("ISP") }}</strong>
                  <span class="text-sm grey-80">{{ info?.ISP || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Domain") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Domain || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Connection_Type") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Connection_Type || "-" }}</span>
                </li>
                <li class="between w-full">
                  <strong class="font-medium">{{ t("Browser") }}</strong>
                  <span class="text-sm grey-80">{{ info?.Browser || "-" }}</span>
                </li>
              </ul>

              <div class="absolute inset-0 vh_center bg-white/60 grey-40" v-show="loading">
                <span class="ip-loading" style="width: 1.5rem"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 来源 -->
    <div class="box_wrap bg-white">
      <div class="container column_center lg:v_center gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/ipaddress/section1.png" width="506" height="398" />
        </div>
        <div class="section_text space-y-4 column_center lg:column">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("ipaddress_spec.title") }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("ipaddress_spec.ip1_desc") }}
          </p>
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white">
      <div class="container column_center lg:v_center lg:!flex-row-reverse gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/ipaddress/section2.png" width="550" height="300" />
        </div>
        <div class="section_text space-y-4 column_center lg:column">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("ipaddress_spec.ip2_title") }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("ipaddress_spec.ip2_desc") }}
          </p>
        </div>
      </div>
    </div>

    <div class="box_wrap mt-12 bg-white">
      <div class="container rounded-3xl bg-[#EBF4FF] !px-12 !py-0 column_center lg:v_center lg:!flex-row-reverse gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/ipaddress/intro_img.png" width="523" height="523" />
        </div>
        <div class="column space-y-4 lg:space-y-6">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("ipaddress_spec.info_title") }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("ipaddress_spec.info_desc") }}
          </p>

          <ul class="space-y-2">
            <li class="v_center space-x-2">
              <Check :size="18" class="primary" />
              <span>{{ t("ipaddress_spec.info_dot1") }}</span>
            </li>
            <li class="v_center space-x-2">
              <Check :size="18" class="primary" />
              <span>{{ t("ipaddress_spec.info_dot2") }}</span>
            </li>
            <li class="v_center space-x-2">
              <Check :size="18" class="primary" />
              <span>{{ t("ipaddress_spec.info_dot3") }}</span>
            </li>
            <li class="v_center space-x-2">
              <Check :size="18" class="primary" />
              <span>{{ t("ipaddress_spec.info_dot4") }}</span>
            </li>
            <li class="v_center space-x-2">
              <Check :size="18" class="primary" />
              <span>{{ t("ipaddress_spec.info_dot5") }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="box_wrap mt-12 question">
      <div class="container space-y-10">
        <div class="title">
          <h3 class="text-3xl lg:text-5xl font-semibold">{{ t("FAQ") }}</h3>
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
import IpButton from "@/components/button/button.vue"
import IpInput from "@/components/input/input.vue"
import { nextTick, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { platDataIndex } from "@/api/home"
import anime from "animejs/lib/anime.es.js"
import { CountryList } from "../../../api/layout"
import settingStore from "../../../store/setting"
import { useRoute } from "vue-router"
import { Check } from "lucide-vue-next"
import Question from "../components/question/question.vue"
import { platToolsIpDetail } from "../../../api/tools"
import Message from "@/components/message/message"

const { t } = useI18n()
const { en } = settingStore()

// 查找IP
const ip = ref("")
const info = ref({
  IP: "",
  Country: "",
  Latitude: "",
  Longitude: "",
  Mobile: "",
  Usage_Type: "",
  Region: "",
  City: "",
  ISP: "",
  Domain: "",
  Connection_Type: "",
  Browser: "",
})
const loading = ref(true)
async function getIpInfo() {
  try {
    loading.value = true

    const result = await platToolsIpDetail({
      ip: ip.value,
    })

    const data = result.data.detail
    const IP = result?.data?.ip ?? ""

    const lang = en.value ? "en" : "zh-CN"

    const detail = {
      IP: IP,
      Country: data?.Country?.Names?.[lang] ?? "",
      Latitude: data?.Location?.Latitude ?? "",
      Longitude: data?.Location?.Longitude ?? "",
      Mobile: "",
      Usage_Type: "",
      Region: data?.Continent?.Names?.[lang] ?? "",
      City: data?.City?.Names?.[lang] ?? "",
      ISP: "",
      Domain: "",
      Connection_Type: "",
      Browser: getBrowserInfo().trim(),
    }

    info.value = detail
    if (!ip.value) {
      ip.value = IP
    }

    loading.value = false
  } catch (err) {
    loading.value = false
    console.log(err.message)
    Message({
      type: "warning",
      message: "Error:" + err.message,
    })
  }
}
function getBrowserInfo() {
  const userAgent = navigator.userAgent
  let browserName = ""
  let browserVersion = ""

  // 检测 Edge (Chromium版)
  if (userAgent.includes("Edg/")) {
    browserName = "Edge"
    browserVersion = userAgent.split("Edg/")[1].split(" ")[0]
  }
  // 检测 Chrome
  else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browserName = "Chrome"
    browserVersion = userAgent.split("Chrome/")[1].split(" ")[0]
  }
  // 检测 Firefox
  else if (userAgent.includes("Firefox")) {
    browserName = "Firefox"
    browserVersion = userAgent.split("Firefox/")[1]
  }
  // 检测 Safari
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari"
    const safariMatch = userAgent.match(/Version\/(\d+(\.\d+)*)/)
    browserVersion = safariMatch ? safariMatch[1] : "Unknown"
  }
  // 检测 IE
  else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
    browserName = "Internet Explorer"
    const ieMatch = userAgent.match(/(MSIE |rv:)(\d+(\.\d+)*)/)
    browserVersion = ieMatch ? ieMatch[2] : "Unknown"
  }
  // 检测 Opera
  else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
    browserName = "Opera"
    const operaMatch = userAgent.match(/(OPR|Opera)\/(\d+(\.\d+)*)/)
    browserVersion = operaMatch ? operaMatch[2] : "Unknown"
  }

  return `${browserName} ${browserVersion}`
}

onMounted(() => {
  getIpInfo()
})
</script>

<style lang="less" scoped>
.banner {
  .container {
    padding: 8rem 0;
    @media screen and (max-width: 1024px) {
      padding: 6rem 0;
    }
  }
}
</style>
