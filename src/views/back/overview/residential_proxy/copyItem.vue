<template>
  <div class="v_center min-w-0 py-3 rounded-md px-3 copyItem text-sm space-x-2">
    <div class="whitespace-nowrap grey-40">{{ label }}</div>
    <div class="whitespace-nowrap primary text pointer" @click="copy(text1)">{{ text1 }}</div>
    <div class="whitespace-nowrap primary text pointer" v-if="text2" @click="copy(text2)">{{ text2 }}</div>
    <!-- <CopyIcon v-if="!iscopy" :size="14" class="grey-40 pointer" @click="copy" />
    <CopySuccessIcon v-else :size="14" class="primary" /> -->
  </div>
</template>

<script setup>
import { Copy as CopyIcon, CopyCheck as CopySuccessIcon } from "lucide-vue-next"
import { ref, toRefs } from "vue"
import copyText from "@/utils/copyText"
import Message from "@/components/message/message"
import settingStore from "@/store/setting"

const { en } = settingStore()
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
const { label, text } = props
const text1 = text.split(/\s+/)[0]
const text2 = text.split(/\s+/)[1]

const iscopy = ref(false)
async function copy(text) {
  try {
    text = text.replace(/\(http\)|\(socks5\)/, "")
    await copyText(text)
    iscopy.value = true
    Message({
      type: "success",
      duration: 1500,
      message: en.value ? "Copy success" : "复制成功",
    })
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
  padding-right: 3rem;
  .text {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: mononoki, Consolas, Liberation Mono, Menlo, Courier, monospace, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Segoe UI Symbol,
      Android Emoji, EmojiSymbols;
    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
}
</style>
