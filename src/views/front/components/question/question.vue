<template>
  <div class="question pointer transition-colors" :class="{ 'border-primary': expand }" @click="toggleExpand">
    <div class="question_header between">
      <div class="font-medium">
        <slot name="header"></slot>
      </div>
      <div class="icon vh_center rounded-full" :class="{ 'primary-bg': expand }">
        <Plus :size="16" v-if="!expand" />
        <Minus :size="16" v-else />
      </div>
    </div>
    <div class="question_content" ref="contentRef">
      <div class="question_content_container text-sm">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Minus } from "lucide-vue-next"
import anime from "animejs/lib/anime.es.js"
import { ref } from "vue"

const expand = ref(false)
const contentRef = ref(null)

function toggleExpand() {
  const content = contentRef.value
  if (!expand.value) {
    // 展开动画
    content.style.overflow = "hidden" // 防止内容溢出
    anime({
      targets: content,
      height: content.scrollHeight, // 高度变为内容的高度
      duration: 200,
      easing: "easeInOutQuad",
    })
  } else {
    // 收起动画
    content.style.overflow = "hidden"
    anime({
      targets: content,
      height: 0, // 高度变为 0
      duration: 200, // 动画时长
      easing: "easeInOutQuad", // 缓动函数
    })
  }
  expand.value = !expand.value
}
</script>

<style lang="less" scoped>
@import "./question.less";
</style>
