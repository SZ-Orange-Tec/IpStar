<template>
  <div class="space-y-6 column">
    <div class="w-full p-5 board rounded">
      <!-- 头部区域 -->
      <div class="w-full between mb-8">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center">
            <DataProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="text-lg font-medium">{{ t("menu_spec.data_proxy") }}</h1>
            <p class="grey-80 text-sm">{{ t("overview_spec.data_center_adv") }}</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button @click="router.push('/data_center')" class="h-9 text-sm min-w-[120px] px-5" type="black">{{ t("Add_funds") }}</ip-button>
          <ip-button @click="router.push('/proxy')" class="h-9 text-sm min-w-[120px] px-5" type="border">{{ t("Start_now") }}</ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-3 gap-6">
        <!-- 剩余流量卡片 -->
        <div class="bg-green-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <strong class="text-lg font-semibold">{{ remain_num }} {{ remain_unit }}</strong>
          </div>
          <div class="text-sm">
            <p class="grey-60">{{ t("Remaining") }} IPs</p>
          </div>
        </div>

        <!-- 今天消耗卡片 -->
        <div class="bg-yellow-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <strong class="text-lg font-semibold">{{ consume_num }} {{ consume_unit }}</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-60">{{ t("Used") }} IPs</p>
            <!-- <button class="px-4 py-1 rounded-full text-yellow-600 bg-white border border-yellow-200 text-sm">详情</button> -->
          </div>
        </div>

        <!-- 当前在线IP总数卡片 -->
        <div class="bg-blue-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <strong class="text-lg font-semibold">2041.87 万</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-80">当前在线 IP 总数</p>
            <button class="px-4 py-1 rounded-full text-blue-600 bg-white border border-blue-200 text-sm">详情</button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full box-border py-5 px-6 board rounded">
      <Table />
    </div>
  </div>
</template>

<script setup>
import Table from "./table.vue"
import ipButton from "@/components/button/button.vue"
import { nextTick, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import anime from "animejs/lib/anime.es.js"
import Message from "@/components/message/message"
import { roundToDecimal } from "../../../../utils/tools"
import { platCustomerReportOverviewDataCenter } from "../../../../api/layout"
import { Database as DataProxyIcon } from "lucide-vue-next"

const { t } = useI18n()
const router = useRouter()

// 获取流量数据
const remain_num = ref(0)
const remain_unit = ref("")
const used_num = ref(0)
const used_unit = ref("")
async function getTrafficData() {
  try {
    const { data } = await platCustomerReportOverviewDataCenter()
    const remain = +data.remain.split(" ")[0]
    remain_unit.value = data.remain.split(" ")[1]
    const consume = +data.consume.split(" ")[0]
    used_unit.value = data.consume.split(" ")[1]

    nextTick(() => {
      numberAnimation(remain_num, remain * 100)
      numberAnimation(used_num, consume * 100)
    })
  } catch (error) {
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerReportOverviewDataCenter failed",
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
