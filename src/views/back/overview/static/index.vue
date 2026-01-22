<template>
  <div class="space-y-6 column">
    <div class="w-full p-5 board rounded space-y-3">
      <!-- 头部区域 -->
      <div class="w-full column md:between gap-3">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center">
            <DataProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="text-lg font-medium">{{ t("menu_spec.static_proxy") }}</h1>
            <p class="grey-80 text-sm">{{ t("overview_spec.static_adv") }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button @click="router.push('/static')" class="h-9 text-sm min-w-[120px] px-5" type="black">{{ t("Add_funds") }}</ip-button>
          <ip-button @click="router.push('/static?active=2')" class="h-9 text-sm min-w-[120px] px-5" type="border">
            {{ t("Proxy_List") }}
          </ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-2 gap-6">
        <!-- 剩余流量卡片 -->
        <div class="bg-green-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <strong class="text-lg font-semibold">{{ ip_num }} IPs</strong>
          </div>
          <div class="text-sm">
            <p class="grey-60">{{ t("Remaining") }} IP</p>
          </div>
        </div>

        <!-- 今天消耗卡片 -->
        <div class="bg-yellow-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <strong class="text-lg font-semibold">{{ expire_ip_num }} IPs</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-60">{{ t("Used") }} IP</p>
            <!-- <button class="px-4 py-1 rounded-full text-yellow-600 bg-white border border-yellow-200 text-sm">详情</button> -->
          </div>
        </div>
      </div>
    </div>

    <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="p-2 rounded tab text-sm">
      <TabItem :value="0" :label="t('List_of_Proxies')" class="h-9 px-5 min-w-[140px]" />
      <TabItem :value="1" :label="t('Traffic_Usage')" class="h-9 px-5 min-w-[140px]" />
    </Tab>

    <div class="w-full p-5 board rounded">
      <Table v-show="active === 0" />
      <Echarts v-show="active === 1" />
    </div>
  </div>
</template>

<script setup>
import Table from "./table.vue"
import Echarts from "../residential_proxy/echarts.vue"
import ipButton from "@/components/button/button.vue"
import { nextTick, onMounted, ref, provide } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import anime from "animejs/lib/anime.es.js"
import Message from "@/components/message/message"
import { roundToDecimal } from "../../../../utils/tools"
import { platCustomerReportOverview } from "../../../../api/layout"
import { Database as DataProxyIcon } from "lucide-vue-next"

const { t } = useI18n()
const router = useRouter()

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
const ip_num = ref(0)
const expire_ip_num = ref(0)
// const online_ip_unit = computed(() => {
//   return !en.value ? "万" : " K"
// })
// watch(en, () => {
//   nextTick(() => {
//     numberAnimation(online, (charged) => {
//       online_ip.value = Math.floor(charged)
//     })
//   })
// })
async function getTrafficData() {
  try {
    const { data } = await platCustomerReportOverview()
    const ip = data.static_ip_num
    const expire_ip = data.static_ip_expire_num

    nextTick(() => {
      numberAnimation(ip, (charged) => {
        ip_num.value = Math.floor(charged)
      })
      numberAnimation(expire_ip, (charged) => {
        expire_ip_num.value = Math.floor(charged)
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
