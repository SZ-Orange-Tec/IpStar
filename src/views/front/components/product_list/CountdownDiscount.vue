<template>
  <div class="v_center h-9 countdown text-[13px] md:text-sm whitespace-nowrap">
    <div class="v_center h-full label px-2">{{ t("productList_spec.pending") }}</div>
    <div class="v_center h-full px-2">{{ countdown.h }} {{ t("productList_spec.h") }} {{ countdown.m }} {{ t("productList_spec.m") }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, toRefs } from "vue"
import { useI18n } from "vue-i18n"
import { addZero } from "../../../../utils/tools"

const { t } = useI18n()

//props
const props = defineProps({
  time: {
    type: String,
    default: "2025-11-26 23:45:00",
  },
})
const emit = defineEmits(["clear"])
const { time: lastTime } = toRefs(props)

// 倒计时
const countdown = ref({
  h: 23,
  m: 59,
})
let timer = null

function updateCountdown() {
  if (timer) clearTimeout(timer)

  const end = new Date(lastTime.value).getTime()
  const now = Date.now()

  if (now > end) {
    countdown.value.h = "00"
    countdown.value.m = "00"
    // emit("clear")
    return
  }

  console.log("countdown")

  const Min = 1000 * 60

  const diff = end - now
  countdown.value = {
    h: addZero(Math.floor(diff / (Min * 60))),
    m: addZero(Math.floor((diff % (Min * 60)) / Min)),
  }

  const delay = Min - Math.floor(diff % Min)
  timer = setTimeout(() => {
    updateCountdown()
  }, delay)
}

onMounted(() => {
  updateCountdown()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style lang="less" scoped>
.countdown {
  border-radius: 20px;
  color: #d5182d;
  background-color: #fff3f8;
  .label {
    border-radius: 20px 0 20px 20px;
    background-color: #d5182d;
    color: #fff;
  }
}
</style>
