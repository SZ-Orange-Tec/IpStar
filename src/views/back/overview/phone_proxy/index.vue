<template>
  <div class="space-y-6 column">
    <div class="w-full p-5 board rounded space-y-3">
      <!-- 头部区域 -->
      <div class="w-full column md:between gap-3">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center shrink-0">
            <PhoneProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="text-lg font-medium">{{ t("menu_spec.phone_proxy") }}</h1>
            <p class="grey-80 text-sm">{{ t("overview_spec.mobile_adv") }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button @click="router.push('/mobile')" class="h-9 text-sm min-w-[120px] px-5" type="black">{{ t("Add_funds") }}</ip-button>
          <ip-button @click="router.push('/proxy')" class="h-9 text-sm min-w-[120px] px-5" type="border">{{ t("Start_now") }}</ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-2 gap-6">
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
            <!-- <button @click="isBalance = true" class="px-4 text-xs h-8 rounded-full text-yellow-600 bg-white border border-yellow-200">
              {{ t("Details") }}
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="w-full py-5 px-6 board rounded">
      <Echart />
      <!-- <Bandwidth v-show="active === 0" />
      <Concurrent v-show="active === 1" /> -->
    </div>
  </div>
</template>

<script setup>
import ipButton from "@/components/button/button.vue"
import Echart from "./echart.vue"
import { nextTick, onActivated, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { Smartphone as PhoneProxyIcon } from "lucide-vue-next"
import { useRouter } from "vue-router"
import anime from "animejs/lib/anime.es.js"
import Message from "@/components/message/message"
import { roundToDecimal } from "@/utils/tools"
import { platCustomerReportOverview } from "@/api/layout"

const { t } = useI18n()
const router = useRouter()

// 获取流量数据
const remain_num = ref(0)
const remain_unit = ref("")
const consume_num = ref(0)
const consume_unit = ref("")
async function getTrafficData() {
  try {
    const { data } = await platCustomerReportOverview()
    const remain = +data.mobi_remain.split(" ")[0]
    remain_unit.value = data.mobi_remain.split(" ")[1]
    const consume = +data.mobi_consume.split(" ")[0]
    consume_unit.value = data.mobi_consume.split(" ")[1]

    nextTick(() => {
      numberAnimation(remain * 100, (charged) => {
        remain_num.value = roundToDecimal(charged / 100)
      })
      numberAnimation(consume * 100, (charged) => {
        consume_num.value = roundToDecimal(charged / 100)
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
