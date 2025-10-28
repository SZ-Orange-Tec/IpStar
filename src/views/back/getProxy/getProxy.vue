<template>
  <div class="column space-y-6">
    <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="p-2 rounded tab text-sm">
      <TabItem :value="0" label="账密提取" class="h-9 px-5 min-w-[140px]" />
      <TabItem :value="1" label="API 提取" class="h-9 px-5 min-w-[140px]" />
    </Tab>

    <div class="w-full box-border board p-5 rounded"></div>
  </div>
</template>

<script setup>
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import { ref } from "vue"

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
</style>
