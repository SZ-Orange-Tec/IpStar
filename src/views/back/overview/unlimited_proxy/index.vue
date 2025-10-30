<template>
  <div class="space-y-6 column">
    <div class="w-full p-5 board rounded">
      <!-- 头部区域 -->
      <div class="w-full between mb-8">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center shrink-0">
            <UnlimitedProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="font-medium">{{ t("menu_spec.unlimited_proxy") }}</h1>
            <p class="grey-80 text-sm">{{ t("overview_spec.unlimited_adv") }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button @click="router.push('/unlimited')" class="h-9 text-sm min-w-[120px] px-5" type="black">{{ t("Add_funds") }}</ip-button>
          <ip-button @click="router.push('/proxy')" class="h-9 text-sm min-w-[120px] px-5" type="border">{{ t("Start_now") }}</ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-3 gap-6">
        <!-- 剩余流量卡片 -->
        <div class="bg-green-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <strong class="text-lg font-semibold">{{ concurrent }}</strong>
          </div>
          <div class="text-sm">
            <p class="grey-60">{{ t("Concurrency") }}</p>
          </div>
        </div>

        <!-- 今天消耗卡片 -->
        <div class="bg-yellow-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <strong class="text-lg font-semibold">{{ bandwidth }}</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-60">{{ t("Bandwidth") }}</p>
            <!-- <button class="px-4 py-1 rounded-full text-yellow-600 bg-white border border-yellow-200 text-sm">详情</button> -->
          </div>
        </div>

        <!-- 当前在线IP总数卡片 -->
        <div class="bg-blue-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <strong class="text-lg font-semibold">{{ expireTime }}</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-60">{{ t("Expiration_time") }}</p>
            <!-- <button class="px-4 py-1 rounded-full text-blue-600 bg-white border border-blue-200 text-sm">详情</button> -->
          </div>
        </div>
      </div>
    </div>

    <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="p-2 rounded tab text-sm">
      <TabItem :value="0" :label="t('Bandwidth_Usage')" class="h-9 px-5 min-w-[140px]" />
      <TabItem :value="1" :label="t('Concurrent_Usage')" class="h-9 px-5 min-w-[140px]" />
    </Tab>

    <div class="w-full p-5 board rounded">
      <Bandwidth v-show="active === 0" />
      <Concurrent v-show="active === 1" />
    </div>
  </div>
</template>

<script setup>
import ipButton from "@/components/button/button.vue"
import Bandwidth from "./bandwidth.vue"
import Concurrent from "./concurrent .vue"
import { onMounted, provide, ref } from "vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import { useI18n } from "vue-i18n"
import { Infinity as UnlimitedProxyIcon } from "lucide-vue-next"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"

const { t } = useI18n()
const router = useRouter()

// tab
const active = ref(0) // 0:bandwidth 1:concurrent
const activeStyle = {
  backgroundColor: "hsl(var(--foreground))",
  borderRadius: "4px",
  "--activeTextColor": "#ffffff",
  top: 0,
  bottom: 0,
}
provide("active", active)

// 获取并发量数据
const concurrent = ref(0)
const bandwidth = ref(0)
const expireTime = ref("")
async function getData() {
  try {
    const { data } = await platCustomerReportOverview()

    const concurrent_num = data.concurrent
    const bandwidth_num = data.bandwidth

    nextTick(() => {
      numberAnimation(concurrent, concurrent_num)
      numberAnimation(bandwidth, bandwidth_num)
    })
  } catch (error) {
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerReportOverview failed",
    })
  }
}
function numberAnimation(data, target) {
  const ipObj = { charged: 0 }
  anime({
    targets: ipObj,
    charged: target,
    round: Math.floor(target / 10),
    easing: "linear",
    update: function () {
      data.value = roundToDecimal(ipObj.charged / 100)
    },
  })
}

onMounted(() => {
  getData()
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
