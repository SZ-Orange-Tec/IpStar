<template>
  <div class="residential-proxy space-y-6 column">
    <div class="w-full p-5 board rounded">
      <!-- 头部区域 -->
      <div class="w-full between mb-8">
        <div class="v_center space-x-3">
          <div class="iconbox rounded-lg vh_center">
            <ResidentialProxyIcon :size="28" :stroke-width="1.5" />
          </div>
          <div>
            <h1 class="font-medium">住宅代理</h1>
            <p class="grey-80 text-sm">9000万+安全性住宅代理，高匿名性和低检测率。</p>
          </div>
        </div>
        <div class="flex space-x-4">
          <ip-button class="h-9 text-sm min-w-[120px] px-5" type="primary_border">充值</ip-button>
          <ip-button class="h-9 text-sm min-w-[120px] px-5" type="primary">开始使用</ip-button>
        </div>
      </div>

      <!-- 数据卡片区域 -->
      <div class="grid grid-cols-3 gap-6">
        <!-- 剩余流量卡片 -->
        <div class="bg-green-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <strong class="text-lg font-semibold">0.00 MB</strong>
          </div>
          <div class="text-sm">
            <p class="grey-60">剩余流量</p>
          </div>
        </div>

        <!-- 今天消耗卡片 -->
        <div class="bg-yellow-50 rounded-lg p-5 space-y-2">
          <div class="v_center space-x-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <strong class="text-lg font-semibold">0.00 MB</strong>
          </div>
          <div class="between text-sm">
            <p class="grey-60">今天消耗</p>
            <button class="px-4 py-1 rounded-full text-yellow-600 bg-white border border-yellow-200 text-sm">详情</button>
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

    <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="p-2 rounded tab text-sm">
      <TabItem :value="0" label="使用指南" class="h-9 px-5 min-w-[140px]" />
      <TabItem :value="1" label="数据图表" class="h-9 px-5 min-w-[140px]" />
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
import { ref } from "vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import { House as ResidentialProxyIcon } from "lucide-vue-next"

const active = ref(1) // 0:guide 1:echart
const activeStyle = {
  backgroundColor: "hsl(var(--foreground))",
  borderRadius: "4px",
  "--activeTextColor": "#ffffff",
  top: 0,
  bottom: 0,
}
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
