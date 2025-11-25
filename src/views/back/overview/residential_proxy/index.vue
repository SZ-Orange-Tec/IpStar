<template>
  <div class="residential-proxy space-y-6 column">
    <div class="w-full p-5 board rounded space-y-5">
      <!-- 头部区域 -->
      <div class="w-full column md:between gap-3">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center shrink-0">
            <ResidentialProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="font-medium">{{ t("menu_spec.residential_proxy") }}</h1>
            <p class="grey-80 text-sm">{{ t("overview_spec.residential_adv") }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button @click="router.push('/residential')" class="h-9 text-sm min-w-[120px] px-5" type="black">{{ t("Add_funds") }}</ip-button>
          <ip-button @click="router.push('/proxy')" class="h-9 text-sm min-w-[120px] px-5" type="border">{{ t("Start_now") }}</ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 剩余流量卡片 -->
        <div class="bg-green-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <strong class="text-lg font-semibold">{{ remain_num }} {{ remain_unit }}</strong>
          </div>
          <div class="text-sm">
            <p class="grey-60">{{ t("Residual_Traffic") }}</p>
          </div>
        </div>

        <!-- 今天消耗卡片 -->
        <div class="bg-yellow-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <strong class="text-lg font-semibold">{{ consume_num }} {{ consume_unit }}</strong>
          </div>
          <div class="between flex-wrap gap-2 text-sm">
            <p class="grey-60">{{ t("Consumption_Today") }}</p>
            <button @click="isBalance = true" class="px-4 text-sm h-8 rounded-full text-yellow-600 bg-white border border-yellow-200">
              {{ t("Details") }}
            </button>
          </div>
        </div>

        <!-- 当前在线IP总数卡片 -->
        <div class="bg-blue-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <strong class="text-lg font-semibold">{{ online_ip }} {{ online_ip_unit }}</strong>
          </div>
          <div class="between flex-wrap gap-2 text-sm">
            <p class="grey-60">{{ t("Total_IPs_Available") }}</p>
            <button @click="isOnlineIp = true" class="px-4 text-sm h-8 rounded-full text-blue-600 bg-white border border-blue-200">
              {{ t("Details") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="p-2 rounded tab text-sm">
      <TabItem :value="0" :label="t('User_Guide')" class="h-9 px-5 min-w-[140px]" />
      <TabItem :value="1" :label="t('Traffic_Usage')" class="h-9 px-5 min-w-[140px]" />
    </Tab>

    <div class="w-full p-5 board rounded">
      <Guide v-show="active === 0" />
      <Echarts v-show="active === 1" />
    </div>
  </div>
</template>

<script setup>
import ipButton from "@/components/button/button.vue"
import Guide from "./guide.vue"
import Echarts from "./echarts.vue"
import { computed, inject, nextTick, onMounted, provide, reactive, ref, watch } from "vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import { House as ResidentialProxyIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import anime from "animejs/lib/anime.es.js"
import { platCustomerReportOverview } from "@/api/layout"
import Message from "@/components/message/message"
import { roundToDecimal } from "../../../../utils/tools"
import { useRouter } from "vue-router"
import settingStore from "../../../../store/setting"

const { t } = useI18n()
const router = useRouter()
const { en } = settingStore()

// 切换余额详情
const isBalance = inject("isBalance")
const isOnlineIp = inject("isOnlineIp")

// 切换tab
const active = ref(0) // 0:guide 1:echart
const activeStyle = {
  backgroundColor: "hsl(var(--foreground))",
  borderRadius: "4px",
  "--activeTextColor": "#ffffff",
  top: 0,
  bottom: 0,
}
provide("active", active)

// 获取流量数据
const remain_num = ref(0)
const remain_unit = ref("")
const consume_num = ref(0)
const consume_unit = ref("")
const online_ip = ref(0)
const online_ip_unit = computed(() => {
  return !en.value ? "万" : " K"
})
watch(en, () => {
  const online = !en.value ? Math.floor(online_ip.value ?? 15308000 / 10000) : Math.floor(online_ip.value ?? 15308000 / 1000)
  online_ip.value = 0
  nextTick(() => {
    numberAnimation(online, (charged) => {
      online_ip.value = Math.floor(charged)
    })
  })
})
async function getTrafficData() {
  try {
    const { data } = await platCustomerReportOverview()
    const remain = +data.remain.split(" ")[0]
    remain_unit.value = data.remain.split(" ")[1]
    const consume = +data.consume.split(" ")[0]
    consume_unit.value = data.consume.split(" ")[1]
    const online = !en.value ? Math.floor(data.online_ip ?? 15308000 / 10000) : Math.floor(data.online_ip ?? 15308000 / 1000)

    nextTick(() => {
      numberAnimation(remain * 100, (charged) => {
        remain_num.value = roundToDecimal(charged / 100)
      })
      numberAnimation(consume * 100, (charged) => {
        consume_num.value = roundToDecimal(charged / 100)
      })
      numberAnimation(online, (charged) => {
        online_ip.value = Math.floor(charged)
      })
    })
  } catch (error) {
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerReportOverview failed",
    })
  }
}
function numberAnimation(target, callback) {
  const ipObj = { charged: 0 }
  anime({
    targets: ipObj,
    charged: target,
    round: Math.floor(target / 10),
    easing: "linear",
    update: () => callback(ipObj.charged),
  })
}

onMounted(() => {
  getTrafficData()
})
</script>

<style lang="less" scoped>
.tab {
  background-color: hsl(var(--background));
}
.iconbox {
  width: 50px;
  height: 50px;
  background-color: hsl(var(--primary) / 8%);
  background-color: #eff6ff;
  position: relative;
  transition: background-color 0.3s ease-in-out;
  border: 1px solid hsl(var(--primary) / 5%);
  &::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-25%, -25%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle at center, hsl(var(--primary) / 15%) 30%, transparent);
    // background-color: hsl(var(--primary) / 15%);
    border-radius: 50%;
  }
}
</style>
