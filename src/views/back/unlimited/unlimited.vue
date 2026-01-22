<template>
  <div class="column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
      <template #nav>
        <div class="w-full">
          <Tab
            ref="tabRef"
            v-model="active"
            :active-style="activeStyle"
            @change="activeChange"
            activeTextColor="hsl(var(--foreground) / 90%)"
            class="tab grey-60 font-medium v_center"
          >
            <TabItem :value="0" class="tab-item">{{ t("Price") }}</TabItem>
            <TabItem :value="1" class="tab-item">{{ t("Get_Proxy") }}</TabItem>
            <TabItem :value="2" class="tab-item">{{ t("Billing") }}</TabItem>
          </Tab>
        </div>
      </template>
    </NavBar>

    <div class="box-border flex-1 min-h-0 overflow-y-auto w-full sm:p-4 md:p-6">
      <Price v-if="active === 0" />
      <!-- <GetProxy v-if="active === 1" /> -->
      <Billing v-if="active === 2" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/navbar/navbar.vue"
import Price from "./price/index.vue"
// import GetProxy from "./proxy/index.vue"
import Billing from "./billing/index.vue"
import { useI18n } from "vue-i18n"
import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const tabRef = ref(false)
const queryActive = computed(() => (route.query?.active ? Number(route.query?.active) : 0))
watch(queryActive, (val) => {
  tabRef.value.handleTabClick(val)
})
// 头部nav tab
const active = ref(queryActive.value) // 0:Price 1:Get_Proxy 2:Billing
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
