<template>
  <div class="FAQ">
    <div class="container space-y-5">
      <p class="title1 text-2xl">{{ t("faq_spec._1_1_title") }}</p>

      <div class="space-y-5">
        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_1_title") }}</p>
          <div class="content">{{ t("faq_spec._2_1_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_2_title") }}</p>
          <div class="content">{{ t("faq_spec._2_2_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_3_title") }}</p>
          <div class="content">{{ t("faq_spec._2_3_des") }}</div>
        </div>
      </div>

      <p class="title1 text-2xl">{{ t("faq_spec._1_2_title") }}</p>

      <div class="space-y-5">
        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_4_title") }}</p>
          <div class="content" v-html="t('faq_spec._2_4_des')"></div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_5_title") }}</p>
          <div class="content" v-html="t('faq_spec._2_5_des')"></div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_6_title") }}</p>
          <div class="content">{{ t("faq_spec._2_6_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_7_title") }}</p>
          <div class="content">{{ t("faq_spec._2_7_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_8_title") }}</p>
          <div class="content">{{ t("faq_spec._2_8_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_9_title") }}</p>
          <div class="content">{{ t("faq_spec._2_9_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_10_title") }}</p>
          <div class="content">{{ t("faq_spec._2_10_des") }}</div>
        </div>

        <div class="space-y-2">
          <p class="title2">{{ t("faq_spec._2_11_title") }}</p>
          <div class="content">{{ t("faq_spec._2_11_des") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style lang="less" scoped>
@import url("./FAQ.less");
</style>
