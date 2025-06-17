<template>
  <div class="commitment column_center w-full">
    <Header class="w-full" />

    <div class="flex-1 box">
      <div class="container">
        <div class="commitment_content">
          <h1>{{ t("commitment_spec.privicy") }}</h1>
          <p class="home_do">
            <a href="javascript:;" @click="$router.push('/home')">{{ t("Home") }}</a> | {{ t("commitment_spec.privicy") }}
          </p>
          <h2>{{ t("commitment_spec.right") }}</h2>
          <p class="min_p">
            {{ t("commitment_spec.des1") }} <a href="https://oag.ca.gov/privacy/ccpa">{{ t("commitment_spec.des2") }}</a>
          </p>
          <h4>{{ t("commitment_spec.exit") }}</h4>
          <p class="min_p">{{ t("commitment_spec.des3") }}</p>
          <p class="min_p">{{ t("commitment_spec.des4") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import Header from "../components/header/header.vue"

const { t } = useI18n()
</script>

<style lang="less" scoped>
@import url("./commitment.less");
</style>
