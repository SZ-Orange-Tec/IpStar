<template>
  <!-- id=HeaderGift  在header组件中用于计算HeaderGift的高度 -->
  <div class="gift relative" ref="giftRef" v-if="show" @mouseenter="cancelTimeout" @mouseleave="resetTimeout">
    <div class="w-full gift_box flex">
      <div v-if="registerAward && !isLogin" class="gift_content v_center flex-wrap md:vh_center gap-1 md:gap-3" ref="registerRef">
        <div class="v_center gap-2">
          <Tag class="hidden md:block icon" :size="20" />
          <i18n-t keypath="gift_spec.sign_up" tag="p" class="text-xs sm:text-base">
            <template #gift>
              <span class="primary font-medium">{{ giftText }}</span>
            </template>
          </i18n-t>
        </div>

        <div class="link_btn v_center space-x-1 pointer text-sm md:text-base" @click="router.push('/login')">
          <span class="font-medium">{{ t("Free_Trial") }}</span>
          <MoveRight :size="16" class="arrow" />
        </div>
      </div>
      <!-- <div class="gift_content hot v_center flex-wrap md:vh_center gap-1 md:gap-3" ref="hotRef">
        <div class="v_center space-x-3">
          <img src="@/assets/images/home/sale.png" width="35" alt="" />
          <i18n-t keypath="gift_spec.hot_active" tag="p" scope="global" class="text-xs sm:text-base">
            <template #discount>
              <span class="font-medium" style="color: #ffd075"> {{ t("gift_spec.hot_discount") }} </span>
            </template>
            <template #off>
              <span class="font-medium" style="color: #2eddff"> {{ t("gift_spec.hot_off") }} </span>
            </template>
          </i18n-t>
        </div>

        <div class="red_btn rounded-full h-8 px-5 text-sm v_center pointer transition-colors duration-300" @click="toBuy">{{ t("Buy_Now") }}</div>
      </div> -->
      <div v-if="promotion" class="gift_content hot v_center flex-wrap md:vh_center gap-1 md:gap-3" ref="hotRef">
        <div class="v_center space-x-3">
          <img src="@/assets/images/home/sale.png" width="35" alt="" />
          <i18n-t keypath="gift_spec.hot_active" tag="p" scope="global" class="text-xs sm:text-base">
            <template #discount>
              <i18n-t keypath="gift_spec.hot_discount" tag="span" scope="global" class="font-medium" style="color: #ffd075">
                <template #num>{{ discount_rate_text }}</template>
              </i18n-t>
            </template>
            <template #off>
              <i18n-t keypath="gift_spec.hot_off" tag="span" scope="global" class="font-medium" style="color: #2eddff">
                <template #num>{{ register_days }}</template>
              </i18n-t>
            </template>
          </i18n-t>
        </div>

        <div class="red_btn rounded-full h-8 px-5 text-sm v_center pointer transition-colors duration-300" @click="toBuy">{{ t("Buy_Now") }}</div>
      </div>
    </div>

    <div class="close pointer vh_center white">
      <CloseIcon :size="14" @click="close" />
    </div>
  </div>
</template>

<script setup>
import { Tag } from "lucide-vue-next"
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
// import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import settingStore from "../../../../store/setting"
import anime from "animejs/lib/anime.es.js"
import { platDataConfig } from "@/api/home"
import loginStore from "../../../../store/login"
import layoutStore from "../../../../store/layout"
import { MoveRight, X as CloseIcon } from "lucide-vue-next"
import { formatSizeUnits } from "../../../../utils/tools"

const { t } = useI18n()
const router = useRouter()
const { isLogin } = loginStore()
const { en } = settingStore()
const { registerAward, gift, promotion, register_days, discount_rate, getConfig } = layoutStore()

const giftText = computed(() => formatSizeUnits(gift.value))
const discount_rate_text = computed(() => (en.value ? 100 - discount_rate.value + "%" : discount_rate.value / 10))
const giftRef = ref(null)
async function isShowGift() {
  try {
    const start = Date.now()
    await getConfig()
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
    // registerAward.value = data.register_award
    // gift.value = data.award_packsize ?? 0

    open()
  } catch (err) {
    console.log(err.message)
  }
}

// 关闭
const local_show = Boolean(Number(sessionStorage.getItem("showGift") ?? 1))
const show = ref(local_show)
function open() {
  show.value = local_show

  if (!show.value) return
  if (!(registerAward.value && !isLogin.value) && !promotion.value) return

  nextTick(() => {
    anime({
      targets: giftRef.value,
      height: {
        value: [0, giftRef.value.scrollHeight],
        easing: "easeOutQuad",
      }, // 明确指定起始和结束值
      duration: 300,
      complete: () => {
        startTimeout()
      },
    })
  })
}
function close() {
  anime({
    targets: giftRef.value,
    height: {
      value: [giftRef.value.scrollHeight, 0],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    duration: 100,
    complete: () => {
      show.value = false
      sessionStorage.setItem("showGift", Number(show.value))
    },
  })
}
watch(isLogin, () => {
  if (!isLogin.value) {
    open()
  }
})

let timer
let registerRef = ref(null)
let hotRef = ref(null)
function startTimeout() {
  clearTimeout(timer)
  if (!registerAward.value) {
    return
  }
  timer = setTimeout(() => {
    // active.value = active.value === 0 ? 1 : 0
    startAnimate()
    startTimeout()
  }, 5000)
}
function cancelTimeout() {
  clearTimeout(timer)
}
function resetTimeout(e) {
  startTimeout()
}
function startAnimate() {
  if (!registerRef.value || !hotRef.value) return
  // debugger
  const { left: register_left, right: register_right } = registerRef.value.getBoundingClientRect()
  const { left: hot_left, right: hot_right } = hotRef.value.getBoundingClientRect()
  const register_width = register_right - register_left
  const hot_width = hot_right - hot_left

  anime({
    targets: registerRef.value,
    translateX: {
      value: [(register_left / register_width) * 100 + "%", ((register_left - register_width) / register_width) * 100 + "%"],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    duration: 300,
    complete: () => {
      if (register_left <= 0) {
        registerRef.value.style.transform = `translateX(100%)`
      }
    },
  })
  anime({
    targets: hotRef.value,
    translateX: {
      value: [((hot_left - hot_width) / hot_width) * 100 + "%", ((hot_left - hot_width * 2) / hot_width) * 100 + "%"],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    duration: 300,
    complete: () => {
      if (hot_left <= 0) {
        hotRef.value.style.transform = `translateX(0)`
      }
    },
  })
}
function toBuy() {
  router.push("/pricing/residential")
}

onMounted(() => {
  if (registerAward.value) {
    nextTick(() => {
      if (!giftRef.value) return
      const dom = giftRef.value
      dom.style.height = dom.scrollHeight + "px"

      startTimeout()
    })
  } else {
    isShowGift()
  }
})
</script>

<style lang="less" scoped>
@import url("./headerGift.less");
</style>
