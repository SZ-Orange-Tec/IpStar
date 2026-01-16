<template>
  <div class="purchase column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
      <template #nav>
        <div class="w-full">
          <Tab v-model="active" :active-style="activeStyle" activeTextColor="hsl(var(--foreground) / 90%)" class="tab grey-60 font-medium v_center">
            <TabItem :value="0" class="tab-item">{{ t("menu_spec.residential_proxy") }}</TabItem>
            <TabItem :value="1" class="tab-item">{{ t("menu_spec.unlimited_proxy") }}</TabItem>
            <TabItem :value="4" class="tab-item">{{ t("menu_spec.static_proxy") }}</TabItem>
            <TabItem :value="2" class="tab-item">{{ t("menu_spec.phone_proxy") }}</TabItem>
            <TabItem :value="3" class="tab-item">{{ t("menu_spec.data_proxy") }}</TabItem>
          </Tab>
        </div>
      </template>
    </NavBar>

    <div class="box-border flex-1 min-h-0 overflow-y-auto w-full p-4 md:p-6">
      <keep-alive>
        <component :is="activeComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/navbar/navbar.vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import ResidentialProxy from "./residential_proxy/index.vue"
import UnlimitedProxy from "./unlimited_proxy/index.vue"
import PhoneProxy from "./phone_proxy/index.vue"
import DataCenterProxy from "./data_proxy/index.vue"
import StaticProxy from "./static/index.vue"
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import { computed } from "vue"

const { t } = useI18n()

// tabbar
const active = ref(0) // 0:residential_proxy 1:unlimited_proxy 2:phone_proxy 3:data_proxy
const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  bottom: 0,
}
function selectActive(e) {
  if (e.target.tagName === "UL") return

  function findLi(dom) {
    if (dom.tagName === "LI") return dom
    return findLi(dom.parentElement)
  }

  const li = findLi(e.target)
  const value = +li.dataset.active
  if (typeof value !== "number") return

  active.value = value
}

// 活跃组件
const activeComponent = computed(() => {
  switch (active.value) {
    case 0:
      return ResidentialProxy
    case 1:
      return UnlimitedProxy
    case 2:
      return PhoneProxy
    case 3:
      return DataCenterProxy
    case 4:
      return StaticProxy
    default:
      return ResidentialProxy
  }
})
</script>

<style lang="less" scoped>
.tab {
  .tab-item {
    height: 44px;
  }
  .tab-item + .tab-item {
    margin-left: 36px;
  }
}
</style>
