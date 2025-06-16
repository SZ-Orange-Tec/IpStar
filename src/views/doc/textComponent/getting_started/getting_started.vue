<template>
  <div class="start">
    <div class="container column space-y-5">
      <h3 class="title1 text-2xl">{{ $t("start_spec.title1") }}</h3>
      <div class="p_box">{{ $t("start_spec.desc") }}</div>

      <div class="space-y-5">
        <div class="space-y-2">
          <h3 class="title2">{{ $t("start_spec.title2_1_title") }}</h3>
          <div class="p_box">
            {{ $t("start_spec.title2_1_des") }}
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="title2">{{ $t("start_spec.title2_2_title") }}</h3>
          <div class="p_box">{{ $t("start_spec.title2_2_des") }}</div>
        </div>

        <div class="space-y-2">
          <h3 class="title2">{{ $t("start_spec.title2_3_title") }}</h3>

          <div class="space-y-5">
            <div class="space-y-2">
              <h4 class="title3">{{ $t("start_spec.title3_1_title") }}</h4>
              <div class="p_box">{{ $t("start_spec.title3_1_des") }}</div>
            </div>

            <div class="space-y-2">
              <h4 class="title3">{{ $t("start_spec.title3_2_title") }}</h4>
              <div class="p_box">{{ $t("start_spec.title3_2_des") }}</div>
            </div>

            <div class="space-y-2">
              <h4 class="title3">{{ $t("start_spec.title3_3_title") }}</h4>
              <div class="p_box">{{ $t("start_spec.title3_3_des") }}</div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="title2">{{ $t("start_spec.title2_4_title") }}</h3>
          <div class="p_box">{{ $t("start_spec.title2_4_des") }}</div>
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
@import url("./getting_started.less");
</style>
