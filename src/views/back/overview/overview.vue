<template>
  <div class="pc-overview column">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="main flex-1 min-h-0 overflow-y-auto w-full flex p-6 gap-5">
      <div class="flex-1 min-w-0 space-y-5">
        <div class="board tab px-2 py-5 rounded">
          <Tab v-model="active" :active-style="activeStyle">
            <TabItem :value="0" class="flex-1">
              <div :class="{ focus: active === 0 }" class="pointer flex-1 column p-5 rounded-md" data-active="0">
                <div class="iconbox rounded-lg vh_center mb-2">
                  <ResidentialProxyIcon :size="24" />
                </div>
                <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.residential_proxy") }}</strong>
                <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
              </div>
            </TabItem>
            <TabItem :value="1" class="flex-1">
              <div :class="{ focus: active === 1 }" class="pointer flex-1 column p-5 rounded-md" data-active="1">
                <div class="iconbox rounded-lg vh_center mb-2">
                  <UnlimitedProxyIcon :size="24" />
                </div>
                <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.unlimited_proxy") }}</strong>
                <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
              </div>
            </TabItem>
            <TabItem :value="2" class="flex-1">
              <div :class="{ focus: active === 2 }" class="pointer flex-1 column p-5 rounded-md" data-active="2">
                <div class="iconbox rounded-lg vh_center mb-2">
                  <PhoneProxyIcon :size="24" />
                </div>
                <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.phone_proxy") }}</strong>
                <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
              </div>
            </TabItem>
            <TabItem :value="3" class="flex-1">
              <div :class="{ focus: active === 3 }" class="pointer flex-1 column p-5 rounded-md" data-active="3">
                <div class="iconbox rounded-lg vh_center mb-2">
                  <DataProxyIcon :size="24" />
                </div>
                <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.data_proxy") }}</strong>
                <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
              </div>
            </TabItem>
          </Tab>
        </div>

        <div>
          <ResidentialProxy v-if="active === 0" />
          <UnlimitedProxy v-if="active === 1" />
          <PhoneProxy v-if="active === 2" />
          <DataProxy v-if="active === 3" />
        </div>
      </div>

      <div class="" style="width: 380px">
        <RightSide />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import NavBar from "../components/navbar/navbar.vue"
import { ref } from "vue"
import ResidentialProxy from "./residential_proxy/index.vue"
import UnlimitedProxy from "./unlimited_proxy/index.vue"
import PhoneProxy from "./phone_proxy/index.vue"
import DataProxy from "./data_proxy/index.vue"
import RightSide from "./rightSide.vue"
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import {
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
} from "lucide-vue-next"

const { t } = useI18n()

// tabbar
const active = ref(2) // 0:residential_proxy 1:unlimited_proxy 2:phone_proxy 3:data_prox y
const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
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
</script>

<style lang="less" scoped>
.pc-overview {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  .tab {
    .focus {
      .iconbox {
        background-color: #ffffff;
      }
    }
  }

  .iconbox {
    width: 40px;
    height: 40px;
    background-color: hsl(var(--primary) / 8%);
    background-color: #eff6ff;
    position: relative;
    transition: background-color 0.3s ease-in-out;
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background-color: hsl(var(--primary) / 20%);
      border-radius: 50%;
    }
  }
}
</style>
