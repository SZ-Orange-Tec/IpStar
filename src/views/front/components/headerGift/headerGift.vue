<template>
  <!-- id=HeaderGift  在header组件中用于计算HeaderGift的高度 -->
  <div class="gift" ref="giftRef">
    <div class="container between sm:vh_center gap-2">
      <div class="v_center gap-2">
        <Tag class="hidden md:block icon" :size="20" />
        <i18n-t keypath="gift_spec.sign_up" tag="p" scope="global" class="text-xs sm:text-base">
          <template #gift>
            <span class="major_text font-medium"> 50 MB </span>
          </template>
        </i18n-t>
      </div>

      <div class="btn v_center rounded-full text-xs md:text-sm whitespace-nowrap">
        <div class="text h-full rounded-full hidden lg:v_center">{{ t("Limited_Time_Only") }}</div>
        <div @click="router.push('/login')" class="trial font-medium px-5 h-full v_center rounded-full pointer transition-color">
          {{ t("Start_Trial") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Tag } from "lucide-vue-next"
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
// import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import settingStore from "../../../../store/setting"

const { t } = useI18n()
const router = useRouter()
const { lang } = settingStore()

const emit = defineEmits(["load"])

const giftRef = ref(null)
onMounted(() => {
  emit("load", giftRef.value.clientHeight + "px")
})
watch(lang, () => {
  nextTick(() => {
    emit("load", giftRef.value.clientHeight + "px")
    console.log(giftRef.value.clientHeight)
  })
})
onBeforeUnmount(() => {
  emit("load", "0px")
})
</script>

<style lang="less" scoped>
@import url("./headerGift.less");
</style>
