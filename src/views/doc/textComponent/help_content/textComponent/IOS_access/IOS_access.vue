<template>
  <div class="space-y-5">
    <div>
      <p class="title1 text-2xl">{{ t("ios_spec._1_1_title") }}</p>
    </div>

    <div class="space-y-2">
      <p class="title2">{{ t("ios_spec._2_1_title") }}</p>
      <i18n-t keypath="ios_spec._2_1_des" tag="div" scope="global" class="content">
        <template #link>
          <a href="https://apps.apple.com/us/app/shadowrocket/id932747118">{{ t("click_here_to_download") }}</a>
        </template>
      </i18n-t>
    </div>

    <ul class="space-y-5">
      <li v-for="(item, index) in list" :key="index" class="column space-y-2">
        <p class="title2">{{ item.h4 }}</p>
        <div class="content">{{ item.p }}</div>
        <div class="column_center w-full">
          <img :src="item.img" alt="IOS Access one" />
        </div>
      </li>
    </ul>

    <div>
      <div class="content">{{ t("ios_spec._2_2_des") }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const list = ref([])
async function getInfo() {
  const en = localStorage.getItem("lang") === "en"
  const { IOS } = en ? await import("../info.en") : await import("../info.zh")
  list.value = IOS
}
getInfo()
</script>

<style lang="less" scoped></style>
