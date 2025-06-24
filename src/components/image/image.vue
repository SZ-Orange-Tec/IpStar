<template>
  <div class="w-full relative" :style="{ 'padding-top': paddingTop }">
    <div class="img w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// 根据宽度 等比例缩放组件
import { onMounted, useSlots } from "vue"
import { roundToDecimal } from "../../utils/tools"

const props = defineProps({
  width: Number,
  height: Number,
  fit: {
    // fill contain cover none
    type: String,
    default: "cover",
  },
})
const { width, height } = props
// const fit = toRef(props, "fit")
const paddingTop = roundToDecimal(height / width) * 100 + "%"
</script>

<style lang="less" scoped>
.img {
  position: absolute;
  inset: 0;
  // object-fit: cover;
  :slotted(img) {
    width: 100%;
  }
}
</style>
