<template>
  <div class="number-grow-warp text-2xl">
    <span ref="numberGrow" :style="{ visibility: !!unit ? 'visible' : 'hidden' }" :data-time="time" class="number-grow">{{
      Thousands(num) + " " + (unit !== "none" ? unit : "")
    }}</span>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import { Thousands } from "@/utils/tools"

const props = defineProps({
  time: {
    type: Number,
    default: 1,
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  unit: {
    type: String,
    default: "",
  },
})

const num = ref(null)
const numberGrow = ref(null)

const startNumberGrow = () => {
  const step = parseInt(props.value / (props.time * 100))
  let current = 0
  let start = 0
  let t = setInterval(() => {
    start += step + 10
    if (start >= props.value) {
      clearInterval(t)
      start = props.value
      t = null
    }
    if (current === start) {
      return
    }
    current = start
    num.value = current
  }, 10)
}

watchEffect(() => {
  if (!props.value) return
  startNumberGrow()
})
</script>
