<template>
  <div class="pc-api">
    <div class="place v_center">
      <span @click="active = 0" class="pointer" :class="{ active: active === 0 }">{{ $t("PCLayout.columnList[4]") }}</span>
      <span @click="active = 1" class="pointer" :class="{ active: active === 1 }">{{ $t("PCLayout.columnList[5]") }}</span>
    </div>

    <div class="main">
      <ApiConfig v-show="active === 0"></ApiConfig>

      <DocsHelp v-show="active === 1"></DocsHelp>
    </div>
  </div>
</template>

<script setup>
import ApiConfig from "./api_config/api_config.vue"
import DocsHelp from "./docs_help/docs_help.vue"

const active = ref(0)
</script>

<style lang="less" scoped>
@import url("./api.less");
</style>
