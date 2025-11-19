<template>
  <div class="column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
      <template #nav>
        <div class="w-full">
          <Tab
            v-model="active"
            :active-style="activeStyle"
            @change="activeChange"
            activeTextColor="hsl(var(--foreground) / 90%)"
            class="tab grey-60 font-medium v_center"
          >
            <TabItem :value="0" class="tab-item">{{ t("Price") }}</TabItem>
            <!-- <TabItem :value="1" class="tab-item">{{ t("Get_Proxy") }}</TabItem> -->
            <TabItem :value="2" class="tab-item">IP {{ t("Management") }}</TabItem>
            <TabItem :value="3" class="tab-item">{{ t("Billing") }}</TabItem>
          </Tab>
        </div>
      </template>
    </NavBar>

    <div class="box-border flex-1 min-h-0 overflow-y-auto w-full p-6">
      <Price v-if="active === 0" />
      <!-- <GetProxy v-if="active === 1" /> -->
      <Management v-if="active === 2" />
      <Billing v-if="active === 3" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/navbar/navbar.vue"
import Price from "./price/index.vue"
import Management from "./management/index.vue"
// import GetProxy from "./proxy/index.vue"
import Billing from "./billing/index.vue"
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import { useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()

// 头部nav tab
const active = ref(0) // 0:Price 1:Get_Proxy 2:IP Management 3:Billing
const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  bottom: 0,
}
function activeChange() {
  if (active.value === 1) {
    // 切换到账密提取页时，默认选中账密提取
    router.push("/proxy")
  }
}
</script>

<style lang="less" scoped>
.tab {
  .tab-item {
    height: 44px;
  }
  .tab-item + .tab-item {
    margin-left: 30px;
  }
}
</style>
