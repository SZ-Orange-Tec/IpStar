<template>
  <!-- id=HeaderGift  在header组件中用于计算HeaderGift的高度 -->
  <div class="gift" ref="giftRef" v-show="registerAward && !isLogin">
    <div class="container between sm:vh_center gap-2">
      <div class="v_center gap-2">
        <Tag class="hidden md:block icon" :size="20" />
        <i18n-t keypath="gift_spec.sign_up" tag="p" scope="global" class="text-xs sm:text-base">
          <!-- <template #gift>
            <span class="major_text font-medium"> 50 MB </span>
          </template> -->
        </i18n-t>
      </div>

      <div class="btn v_center rounded-full text-xs md:text-sm whitespace-nowrap">
        <div class="text h-full rounded-full hidden lg:v_center">{{ t("Limited_Time_Only") }}</div>
        <div @click="router.push('/login')" class="trial font-medium px-5 h-full v_center rounded-full pointer transition-color">
          {{ t("Free_Trial") }}
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
import anime from "animejs/lib/anime.es.js"
import { platDataConfig } from "@/api/home"
import loginStore from "../../../../store/login"
import layoutStore from "../../../../store/layout"

const { t } = useI18n()
const router = useRouter()
const { isLogin } = loginStore()
const { registerAward } = layoutStore()

const giftRef = ref(null)
async function isShowGift() {
  try {
    const start = Date.now()
    const { data } = await platDataConfig()
    const end = Date.now()
    await new Promise((resolve) => {
      if (end - start > 1000) {
        resolve()
      } else {
        setTimeout(() => {
          resolve()
        }, 1000 - (end - start))
      }
    })
    registerAward.value = data.register_award

    nextTick(() => {
      anime({
        targets: giftRef.value,
        height: {
          value: [0, giftRef.value.scrollHeight],
          easing: "easeOutQuad",
        }, // 明确指定起始和结束值
        duration: 200,
      })
    })
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(() => {
  console.log(registerAward.value)
  if (registerAward.value) {
    nextTick(() => {
      if (!giftRef.value) return
      const dom = giftRef.value
      dom.style.height = dom.scrollHeight + "px"
    })
  } else {
    isShowGift()
  }
})
</script>

<style lang="less" scoped>
@import url("./headerGift.less");
</style>
