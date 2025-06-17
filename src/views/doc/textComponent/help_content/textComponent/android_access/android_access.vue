<template>
  <div class="android space-y-5">
    <div class="space-y-2">
      <p class="title1 text-2xl">{{ t("android_spec._1_1_title") }}</p>
      <div class="content">{{ t("android_spec._1_1_des") }}</div>
    </div>

    <div class="space-y-2">
      <p class="title2">{{ t("android_spec._2_1_title") }}</p>
      <div class="content" v-html="t('android_spec._2_1_des')"></div>
    </div>

    <ul class="space-y-5">
      <li v-for="(item, index) in list" :key="index" class="column space-y-2">
        <p class="title2">{{ item.h4 }}</p>
        <div class="content">{{ item.p }}</div>
        <div class="column_center w-full">
          <img :src="item.img" alt="Access In Android one" />
        </div>
      </li>
    </ul>

    <div class="content">{{ t("android_spec._2_2_des") }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const list = ref([])
async function getInfo() {
  const en = localStorage.getItem("lang") === "en"
  const { Android } = en ? await import("../info.en") : await import("../info.zh")
  list.value = Android
}
getInfo()
</script>

<style lang="less" scoped></style>
