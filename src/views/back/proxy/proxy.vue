<template>
  <div class="column h-full">
    <NavBar>
      <template #default="{ title }">
        <div class="v_center space-x-2" @click="back">
          <ChevronLeft :size="16" class="pointer" />
          <span>{{ title }}</span>
        </div>
      </template>
      <template #nav>
        <div class="w-full">
          <Tab v-model="active" :active-style="activeStyle" activeTextColor="hsl(var(--foreground) / 90%)" class="tab grey-60 font-medium v_center">
            <TabItem :value="0" class="tab-item">{{ t("User_Pass_Auth") }}</TabItem>
            <TabItem :value="1" class="tab-item">{{ t("API_Auth") }}</TabItem>
          </Tab>
        </div>
      </template>
    </NavBar>

    <div class="flex-1 min-h-0 overflow-y-auto w-full box-border column p-6 gap-6">
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
// import Tabs from "./tabs.vue"
import { provide, ref } from "vue"
import userStore from "../../../store/user"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { ChevronLeft } from "lucide-vue-next"

const { t } = useI18n()
const route = useRoute()
const { is_purchase } = userStore()

// 头部nav tab
const active = ref(0)
const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  bottom: 0,
}

const router = useRouter()
function back() {
  try {
    router.back()
  } catch (error) {
    router.push("/overview")
  }
}
</script>

<style lang="less" scoped>
// .tab {
//   padding: 6px;
// }
.tab {
  background-color: hsl(var(--background));
  .tab-item {
    height: 44px;
  }
  .tab-item + .tab-item {
    margin-left: 36px;
  }
}
</style>
