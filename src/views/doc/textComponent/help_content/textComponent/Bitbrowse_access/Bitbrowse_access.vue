<template>
  <div class="space-y-5">
    <p class="title1 text-2xl">{{ t("broswer_spec._1_1_title") }}</p>

    <ul class="space-y-5">
      <li v-for="(item, index) in list" :key="index" class="column space-y-2">
        <p class="title2">{{ item.h4 }}</p>
        <div class="content">{{ item.p }}</div>
        <div class="column_center w-full">
          <img :src="item.img" alt="Access In Android one" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const list = ref([])
async function getInfo() {
  const en = localStorage.getItem("lang") === "en"
  const { Bitbrowse } = en ? await import("../info.en") : await import("../info.zh")
  list.value = Bitbrowse
}
getInfo()
</script>

<style lang="less" scoped></style>
