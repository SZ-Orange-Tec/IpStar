<template>
  <div class="v_center h-10 rounded-md px-3 copyItem">
    <span class="grey-40">{{ label }}</span>
    <span class="primary text flex-1">{{ text }}</span>
    <CopyIcon v-if="!iscopy" :size="14" class="grey-40 pointer" @click="copy" />
    <CopySuccessIcon v-else :size="14" class="primary" />
  </div>
</template>

<script setup>
import { Copy as CopyIcon, CopyCheck as CopySuccessIcon } from "lucide-vue-next"
import { ref, toRefs } from "vue"
import copyText from "@/utils/copyText"

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
})
const { text } = toRefs(props)

const iscopy = ref(false)
async function copy() {
  try {
    await copyText(text.value)
    iscopy.value = true
    setTimeout(() => {
      iscopy.value = false
    }, 1500)
  } catch (error) {
    console.error("复制失败:", error)
  }
}
</script>

<style lang="less" scoped>
.copyItem {
  background-color: hsl(var(--primary) / 5%);
  .text {
    padding-right: 3rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
