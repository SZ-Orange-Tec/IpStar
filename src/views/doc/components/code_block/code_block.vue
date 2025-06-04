<template>
  <div class="pc-code_block" @mousemove="show=true" @mouseleave="show=false">
     <prism-editor class="my-editor height-300" aria-disabled v-model="codeText" :highlight="highlighter" :tabSize="4" readonly ></prism-editor>
     <div class="copy_btn" @click="Copy" v-if="show">
      <p><span v-if="bol">copied</span>copy</p>
     </div>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

// import highlighting library
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
export default {
  name: 'PCCodeBlock',
  components: {
    PrismEditor
  },
  props: {
    code: {
      type: String
    }
  },
  data () {
    return {
      codeText: this.code,
      bol: false,
      show: false
    }
  },
  methods: {
    // 代码块高亮
    highlighter (code) {
      return highlight(code, languages.js)
    },
    // 复制
    Copy () {
      this.bol = true
      setTimeout(() => {
        this.bol = false
      }, 1500)
      // 创建input标签
      const input = document.createElement('input')
      // 将input的值设置为需要复制的内容
      input.value = this.codeText
      // 添加input标签
      document.body.appendChild(input)
      // 选中input标签
      input.select()
      // 执行复制
      document.execCommand('copy')
      // 移除input标签
      document.body.removeChild(input)
    }
  }
}
</script>
<style lang="less" scoped>
  @import url('./code_block.less');
</style>
