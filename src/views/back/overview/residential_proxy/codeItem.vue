<template>
  <div class="codeItem space-y-1">
    <div class="header text-sm between">
      <div>{{ label }}</div>
    </div>

    <div class="code px-3 py-2 rounded-md text-sm">
      <prism-editor class="my-editor" aria-disabled v-model="text" :highlight="highlighter" :tabSize="4" readonly></prism-editor>
      <ip-button type="ghost" class="copy_btn transition-opacity" @click="Copy" :class="{ show: bol }">
        <CopyIcon v-if="!bol" :size="14" />
        <CopySuccessIcon v-else :size="14" class="primary" />
      </ip-button>
    </div>
  </div>
</template>

<script setup>
import { PrismEditor } from "vue-prism-editor"
import "vue-prism-editor/dist/prismeditor.min.css"

// import highlighting library
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-bash" // 引入 bash 语言支持
import "prismjs/themes/prism-tomorrow.css"

import IpButton from "@/components/button/button.vue"
import { Copy as CopyIcon, CopyCheck as CopySuccessIcon } from "lucide-vue-next"
import { ref } from "vue"
import copyText from "@/utils/copyText"

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
})

const { text, label } = props

// 代码块高亮
function highlighter(code) {
  // return highlight(code, languages.text, "bash")
  return highlight(code, languages.bash, "bash")
}

// 复制
const bol = ref(false)
async function Copy() {
  bol.value = true
  await copyText(text)
  setTimeout(() => {
    bol.value = false
  }, 1500)
}
</script>

<style lang="less" scoped>
.codeItem {
  .header {
    // border-bottom: 1px solid #e2e8f0;
    font-weight: 400;
    color: #314158;
  }
  .code {
    border: 1px solid #e2e8f0;
    background-color: #282c34;
    position: relative;
    ::v-deep .my-editor {
      font-family: mononoki, Consolas, Liberation Mono, Menlo, Courier, monospace, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji,
        Segoe UI Symbol, Android Emoji, EmojiSymbols;
      // color: ;
      color: #abb2bf;
      textarea {
        display: none;
      }
    }
    .copy_btn {
      position: absolute;
      top: 8px;
      right: 12px;
      opacity: 0;
      color: #fff;
    }
    .show {
      opacity: 1;
    }
    &:hover {
      .copy_btn {
        opacity: 1;
      }
    }
  }
}
</style>
