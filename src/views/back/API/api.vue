<template>
  <div class="api h-full">
    <NavBar>
      <template #default>
        <div class="place v_center space-x-5">
          <span @click="active = 0" class="pointer" :class="{ active: active === 0 }">{{ $t("PCLayout.columnList[4]") }}</span>
          <span @click="active = 1" class="pointer" :class="{ active: active === 1 }">{{ $t("PCLayout.columnList[5]") }}</span>
        </div>
      </template>
    </NavBar>

    <div class="w-full main column flex-1">
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

const active = ref(0)
</script>

<style lang="less" scoped>
@import url("./api.less");
</style>
