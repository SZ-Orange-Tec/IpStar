<template>
  <div class="column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="flex-1 min-h-0 overflow-y-auto w-full box-border column p-6 gap-6">
      <div class="w-full box-border board rounded px-2 py-5">
        <Tabs v-model="active_tab" @change="handleTabChange" />
      </div>

      <Tab v-model="active" :active-style="activeStyle" activeTextColor="#ffffff" class="rounded tab">
        <TabItem :value="0" :label="t('User_Pass_Auth')" class="h-9 px-5 min-w-[140px]" />
        <TabItem :value="1" :label="t('API_Auth')" class="h-9 px-5 min-w-[140px]" />
      </Tab>

      <template v-if="is_purchase">
        <AccountWay v-if="active === 0" />
        <ApiWay v-if="active === 1" />
      </template>

      <Lock v-else />
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/navbar/navbar.vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import AccountWay from "./account_way/index.vue"
import ApiWay from "./api_way/index.vue"
import Lock from "./lock.vue"
import Tabs from "./tabs.vue"
import { provide, ref } from "vue"
import userStore from "../../../store/user"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"

const { t } = useI18n()
const route = useRoute()
const { is_purchase } = userStore()

// tabs
const active_tab = ref(Number(route.query?.tab ?? 0))
function handleTabChange(tab) {
  console.log("tab change")
}
provide("active_tab", active_tab)

// 选项卡
const active = ref(Number(route.query?.active ?? 0)) // 0:user_pass 1:api
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
  padding: 6px;
  background-color: hsl(var(--background));
}
</style>
