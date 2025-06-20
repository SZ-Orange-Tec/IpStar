<template>
  <div class="api h-full column">
    <NavBar>
      <template #default>
        <div class="place v_center space-x-5">
          <span @click="active = 0" class="pointer" :class="{ active: active === 0 }">
            <span class="hidden sm:inline">API</span>
            {{ t("Construction") }}
          </span>
          <span @click="active = 1" class="pointer" :class="{ active: active === 1 }">
            <span class="hidden sm:inline">API</span>
            {{ t("Reference") }}
          </span>
        </div>
      </template>
    </NavBar>

    <div class="flex-1 w-full main column px-3 md:px-5" :class="{ 'flex-1': active === 1 }">
      <ApiConfig v-show="active === 0"></ApiConfig>

      <DocsHelp v-show="active === 1"></DocsHelp>
    </div>
  </div>
</template>

<script setup>
import ApiConfig from "./api_config/api_config.vue"
import DocsHelp from "./docs_help/docs_help.vue"
// import IpButton from "@/components/button/button.vue"
import NavBar from "../components/navbar/navbar.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const active = ref(0)
</script>

<style lang="less" scoped>
@import url("./api.less");
</style>
