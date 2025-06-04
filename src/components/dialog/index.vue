<template>
  <div class="chat-dialog column_center">
    <div class="dialog_container" ref="container" :style="transformOrigin">
      <slot :close="close"></slot>
    </div>
  </div>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js"
import position from "./position"
import { roundToDecimal } from "@/utils/tools"
import { onMounted, ref } from "vue"

const show = defineModel({ type: Boolean })

// 开启 关闭动画

// 获取位置
const transformOrigin = ref("")
const container = ref(null)
function getPosition() {
  const { x, y } = position.get()
  const { left, top, right, bottom } = container.value.getBoundingClientRect()
  const originX = x ? roundToDecimal(x - left) : roundToDecimal((right - left) / 2)
  const originY = y ? roundToDecimal(y - top) : roundToDecimal((bottom - top) / 2)
  transformOrigin.value = `transform-origin:${originX}px ${originY}px`
}

function close() {
  const target = container.value

  target.style.backgroundColor = "hsl(var(--dialog-wrap) / 0%)"
  anime({
    targets: target.children[0],
    opacity: {
      value: [1, 0],
      easing: "easeInQuart",
    }, // 明确指定起始和结束值
    scale: {
      value: [1, 0],
      easing: "easeInQuart",
    },
    duration: 150,
    complete: () => {
      show.value = false
    },
  })
}
function open() {
  const target = container.value

  target.style.backgroundColor = "hsl(var(--dialog-wrap) / 70%)"

  anime({
    targets: target.children[0],
    opacity: {
      value: [0, 1],
      easing: "easeOutQuad",
    }, // 明确指定起始和结束值
    scale: {
      value: [0, 1],
      easing: "easeOutQuad",
    },
    duration: 150,
  })
}

onMounted(() => {
  getPosition()
  open()
})
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
