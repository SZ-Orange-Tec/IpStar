<template>
  <Tab v-model="active" :active-style="activeStyle">
    <TabItem :value="0" class="flex-1">
      <div :class="{ focus: active === 0 }" class="pointer flex-1 column p-5 rounded-md" data-active="0">
        <div class="iconbox rounded-lg vh_center mb-2">
          <ResidentialProxyIcon :size="24" />
        </div>
        <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.residential_proxy") }}</strong>
        <span class="grey-80 text-xs">{{ t("Starting_from") }} $0.35/GB </span>
      </div>
    </TabItem>
    <TabItem :value="1" class="flex-1">
      <div :class="{ focus: active === 1 }" class="pointer flex-1 column p-5 rounded-md" data-active="1">
        <div class="iconbox rounded-lg vh_center mb-2">
          <UnlimitedProxyIcon :size="24" />
        </div>
        <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.unlimited_proxy") }}</strong>
        <span class="grey-80 text-xs">{{ t("Starting_from") }} $0.35/GB </span>
      </div>
    </TabItem>
    <TabItem :value="2" class="flex-1">
      <div :class="{ focus: active === 2 }" class="pointer flex-1 column p-5 rounded-md" data-active="2">
        <div class="iconbox rounded-lg vh_center mb-2">
          <PhoneProxyIcon :size="24" />
        </div>
        <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.phone_proxy") }}</strong>
        <span class="grey-80 text-xs">{{ t("Starting_from") }} $0.35/GB </span>
      </div>
    </TabItem>
    <TabItem :value="3" class="flex-1">
      <div :class="{ focus: active === 3 }" class="pointer flex-1 column p-5 rounded-md" data-active="3">
        <div class="iconbox rounded-lg vh_center mb-2">
          <DataProxyIcon :size="24" />
        </div>
        <strong class="font-medium text-[15px] leading-6">{{ t("menu_spec.data_proxy") }}</strong>
        <span class="grey-80 text-xs">{{ t("Starting_from") }} $0.35/GB </span>
      </div>
    </TabItem>
  </Tab>
</template>

<script setup>
import Tab from "@/components/tabbar/tab.vue"
import TabItem from "@/components/tabbar/tab-item.vue"
import {
  House as ResidentialProxyIcon,
  Infinity as UnlimitedProxyIcon,
  Smartphone as PhoneProxyIcon,
  Database as DataProxyIcon,
} from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const active = defineModel()

const activeStyle = {
  backgroundColor: "hsl(var(--primary) / 8%)",
  border: "1px solid hsl(var(--primary) / 90%)",
  borderRadius: "8px",
  transition: `all 500ms cubic-bezier(.29,1.42,.79,1)`,
  top: 0,
  bottom: 0,
}
</script>

<style lang="less" scoped>
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
.focus {
  .iconbox {
    background-color: #ffffff;
  }
}
</style>
