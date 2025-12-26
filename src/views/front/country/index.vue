<template>
  <div>
    <!-- banner -->
    <div class="box_wrap banner banner">
      <div class="container between">
        <div class="left max-w-xl w-full">
          <h1 class="text-3xl lg:text-5xl font-semibold leading-none">{{ t("country_spec.banner_title") }}</h1>
          <p class="text-base lg:text-lg grey-80 mt-5">{{ t("country_spec.banner_desc") }}</p>

          <div class="flex w-full mt-8">
            <div class="column space-y-5">
              <strong class="text-4xl font-semibold primary h-10">{{ ips }} {{ ips_unit }}</strong>
              <span class="text-[15px] grey-80 text-center">{{ t("country_spec.banner_usage_ip") }}</span>
            </div>
            <div class="column space-y-5 ml-16">
              <strong class="text-4xl font-semibold primary h-10">{{ country }} +</strong>
              <span class="text-[15px] grey-80 text-center">{{ t("country_spec.banner_region") }}</span>
            </div>
          </div>
          <IpButton type="primary" class="h-11 px-10 rounded-lg mt-16">{{ t("country_spec.banner_btn") }}</IpButton>
        </div>
        <div class="right hidden md:block">
          <img loading="lazy" width="560" height="560" src="@/assets/images/country/location_banne.png" style="visibility: visible" />
        </div>
      </div>
    </div>

    <!-- 热门国家IPS -->
    <div class="box_wrap bg-white">
      <div class="container">
        <h2 class="text-4xl font-medium">{{ t("Popular_Agency_Regions") }}</h2>

        <div class="content bg-[#F8FBFF] rounded-lg p-5">
          <ul class="grid grid-cols-4" v-if="mapData.length">
            <li class="v_center space-x-3 py-5" v-for="item in mapData" :key="item.name">
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

    <!-- 全部国家IPs -->
    <div class="box_wrap bg-white">
      <div class="container">
        <h2 class="text-4xl font-medium">{{ t("List_of_All_Regions") }}</h2>

        <div class="content">
          <template v-for="(country, key) in countries" :key="key">
            <div class="mt-10 primary text-[15px] font-medium">{{ en ? key : countryName[key] }}</div>
            <ul class="grid grid-cols-4 gap-4 mt-5">
              <li class="v_center space-x-3 px-3 py-5 rounded-lg bg-[#F8FBFF]" v-for="item in country" :key="item.code">
                <div class="w-9 h-9 shrink-0 vh_center">
                  <span class="text-2xl" :class="['flag-icon', 'flag-icon-' + item.code]"></span>
                </div>
                <div>
                  <strong class="text-base font-medium">{{ en ? item.country_en : item.country_zh }}</strong>
                  <p class="text-sm">{{ item.ips }} IPS+</p>
                </div>
              </li>
            </ul>
          </template>

          <div class="mt-10 vh_center">
            <span class="ip-loading text-lg" v-if="loading"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IpButton from "@/components/button/button.vue"
import { nextTick, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { platDataIndex } from "@/api/home"
import anime from "animejs/lib/anime.es.js"
import { CountryList } from "../../../api/layout"
import settingStore from "../../../store/setting"
import { useRoute } from "vue-router"
// 加载国家国旗
import("flag-icon-css/css/flag-icons.css")

const { t } = useI18n()
const { en } = settingStore()

// 首页数据
const ips = ref(0)
const ips_unit = ref("")
const country = ref(0)
async function IndexData() {
  const { data } = await platDataIndex()

  const ips_arr = toThousands(data.ips_count).split(",")
  const ips_count = ips_arr[0]
  ips_unit.value = ["", "K+", "M+", "B+"][ips_arr.length - 1]
  const country_count = data.country_count
  numberAnimation(ips_count, (charged) => {
    ips.value = charged
  })
  numberAnimation(country_count, (charged) => {
    country.value = charged
  })

  countryIps(data.countries)
}
function numberAnimation(target, callback) {
  const ipObj = { charged: 0 }
  anime({
    targets: ipObj,
    charged: target,
    round: 1, //Math.floor(target / 10),
    easing: "linear",
    update: () => callback(ipObj.charged),
  })
}

// 热门国家IPS
const mapData = ref([])
async function countryIps(countries) {
  const countryImg = await import.meta.glob("@/assets/images/home/country/*", { eager: true })
  mapData.value = countries.map((item) => {
    const country = item.code === "US" ? "USA" : item.country
    const key = `/src/assets/images/home/country/${country}.png`
    return {
      name: country,
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

// 所有国家Ips
const countries = ref({})
const loading = ref(true)
const page = {
  index: 1,
  size: 20,
  total: 0,
}
const countryName = {
  Africa: "非洲",
  Antarctica: "南极洲",
  Asia: "亚洲",
  Europe: "欧洲",
  Americas: "美洲",
  Oceania: "大洋洲",
}
async function getCountries() {
  const { index, size, total } = page
  if (total !== 0 && index * size >= total) {
    loading.value = false
    return
  }
  if (window.location.pathname !== "/country") return

  const { data } = await CountryList({
    orderby: "continent",
    page_index: index,
    page_size: size,
  })

  page.total = data.count

  const country = countries.value
  data.list.forEach((item) => {
    const key = item.continent
    const value = {
      country_en: item.country,
      country_zh: item.country_cn,
      code: item.code.toLowerCase(),
      ips: toThousands(item.ips_count),
    }
    if (country[key]) {
      country[key].push(value)
    } else {
      country[key] = [value]
    }
  })

  countries.value = country

  nextTick(() => {
    page.index++
    getCountries()
  })
}
onMounted(() => {
  IndexData()
  getCountries()
})
</script>

<style lang="less" scoped>
.banner {
  background-color: #f4f9ff;
  background-image: url("../../../assets/images/country/location_banner_bg.png");
  background-size: 100% 100%;
  height: 560px;
  width: 100%;
  .container {
    padding: 0;
  }
}
</style>
