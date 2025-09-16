<template>
  <!-- id=HeaderGift  在header组件中用于计算HeaderGift的高度 -->
  <div class="gift">
    <div class="container column sm:v_center sm:justify-end space-x-2">
      <div class="v_center space-x-2">
        <Tag :size="25" class="icon" />
        <i18n-t keypath="gift_spec.sign_up" tag="p" scope="global">
          <template #gift>
            <span class="major_text text-lg font-medium"> 50 MB </span>
          </template>
        </i18n-t>
      </div>

      <div class="btn v_center rounded-full text-sm whitespace-nowrap">
        <div class="text h-full v_center rounded-full text-xs">{{ t("Limited_Time_Only") }}</div>
        <div @click="router.push('/login')" class="trial px-5 h-full v_center rounded-full pointer transition-color">{{ t("Start_Trial") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Tag } from "lucide-vue-next"
// import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()
</script>

<style lang="less" scoped>
@import url("./headerGift.less");
</style>
