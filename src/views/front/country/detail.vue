<template>
  <div>
    <!-- banner -->
    <div class="box_wrap banner bg-[#F4F9FF]">
      <div class="container between">
        <div class="left max-w-xl w-full column">
          <h1 class="text-4xl lg:text-5xl font-semibold">{{ country_name }} {{ t("Proxy") }}</h1>

          <span class="text-3xl lg:text-4xl font-semibold mt-6">{{ ips }} IPs</span>

          <p class="text-base lg:text-lg grey-80 mt-6">{{ t("country_detail.banner_desc") }}</p>
          <IpButton @click="toUse" type="primary" class="h-11 px-10 rounded-lg mt-12">{{ t("Get_Start_Now") }}</IpButton>
        </div>
        <div class="right hidden md:block">
          <img loading="lazy" width="661" height="320" src="@/assets/images/country/country_banner.png" style="visibility: visible" />
        </div>
      </div>
    </div>

    <!-- 来源 -->
    <div class="box_wrap bg-white">
      <div class="container column_center lg:v_center gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/country/section1.png" width="650" height="420" />
        </div>
        <div class="section_text space-y-4 column_center lg:column">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("country_detail.adv1_title", { country: country_name }) }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("country_detail.adv1_des", { country: country_name }) }}
          </p>
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white">
      <div class="container column_center lg:v_center lg:!flex-row-reverse gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/country/section2.png" width="520" height="404" />
        </div>
        <div class="section_text space-y-4 column_center lg:column">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("country_detail.adv2_title", { country: country_name }) }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("country_detail.adv2_des", { country: country_name }) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 为什么 -->
    <div class="box_wrap bg-[#F4F9FF]">
      <div class="container">
        <h2 class="text-3xl lg:text-4xl font-semibold text-center">{{ t("country_detail.why_title", { country: country_name }) }}</h2>

        <div class="content">
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            <li class="column space-y-4 lg:space-y-6">
              <img src="@/assets/images/country/icon1.png" width="64" height="64" alt="" />
              <h3 class="font-medium text-lg lg:text-xl">{{ t("country_detail.why1_title", { country: country_name }) }}</h3>
              <p class="grey-80">{{ t("country_detail.why1_desc", { country: country_name }) }}</p>
            </li>
            <li class="column space-y-4 lg:space-y-6">
              <img src="@/assets/images/country/icon2.png" width="64" height="64" alt="" />
              <h3 class="font-medium text-lg lg:text-xl">{{ t("country_detail.why2_title", { country: country_name }) }}</h3>
              <p class="grey-80">{{ t("country_detail.why2_desc", { country: country_name }) }}</p>
            </li>
            <li class="column space-y-4 lg:space-y-6">
              <img src="@/assets/images/country/icon3.png" width="64" height="64" alt="" />
              <h3 class="font-medium text-lg lg:text-xl">{{ t("country_detail.why3_title", { country: country_name }) }}</h3>
              <p class="grey-80">{{ t("country_detail.why3_desc", { country: country_name }) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 流行国家IPS -->
    <div class="box_wrap">
      <div class="container">
        <h2 class="text-3xl lg:text-4xl font-semibold text-center">IpStar {{ t("Popular_Countries") }}</h2>

        <div class="content">
          <ul class="grid grid-cols-4 gap-5">
            <li class="v_center space-x-3 py-5 bg-[#F8FBFF] rounded-lg" v-for="item in mapData" :key="item.name">
              <div class="w-9 h-9 shrink-0">
                <img loading="lazy" :src="item.icon" alt="" />
              </div>
              <div>
                <strong class="text-base font-medium">{{ item.name }}</strong>
                <p class="text-sm">{{ item.value }} IPS+</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="box_wrap">
      <div class="container">
        <div class="title">
          <h3 class="text-3xl lg:text-4xl font-semibold text-center">{{ t("FAQ") }}</h3>
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
import Question from "../components/question/question.vue"
import { ref, onMounted, computed, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { CountryList } from "../../../api/layout"
import { Thousands } from "../../../utils/tools"
import settingStore from "../../../store/setting"
import { platDataIndex } from "../../../api/home"
import { useRouter } from "vue-router"
import loginStore from "../../../store/login"

const { t } = useI18n()
const { en } = settingStore()
const { isLogin } = loginStore()

const route = useRoute()
const code = computed(() => route.params.code ?? "us")

// 国家IP
const country_en = ref("")
const country_zh = ref("")
const country_name = computed(() => (en.value ? country_en.value : country_zh.value))
const ips = ref("")
async function getCountryIps(code) {
  const { data } = await CountryList({
    code,
  })

  const country = data.list[0] ?? {
    ips_count: 1964788,
    country: "",
    country_cn: "美国",
  }
  ips.value = Thousands(country.ips_count)
  country_en.value = country.country
  country_zh.value = country.country_cn
}
watch(
  code,
  (val) => {
    getCountryIps(val)
  },
  {
    immediate: true,
  }
)

// 热门国家IPS
const mapData = ref([])
async function IndexData() {
  const { data } = await platDataIndex()
  countryIps(data.countries)
}
async function countryIps(countries) {
  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })
  mapData.value = countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/home/country/${country}.png`
    return {
      name: country,
      value: Thousands(item.ip_count),
      icon: countryImg[key].default,
    }
  })
}

// 跳转
const router = useRouter()
function toUse() {
  if (isLogin.vlaue) {
    router.push("/overview")
  } else {
    router.push("/login")
  }
}

onMounted(() => {
  IndexData()
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
