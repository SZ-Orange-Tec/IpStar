<template>
  <div class="pc-docs_help" @click="dom">
    <!-- 索引栏 -->
    <div v-show="!isPurchase" class="docs_help_sidebar">
      <ul class="document_bar">
        <li v-for="(item, index) in column" :key="index" @click="jump(item.id)">
          <p :class="{ h: item.type === 'title', color: activeStep === item.id }">{{ item.text }}</p>
        </li>
      </ul>
      <!-- 开关 -->
      <!-- <div class="side_switch" @click="drawer=!drawer">
        <span></span>
      </div> -->
    </div>

    <!-- 文档 -->
    <div class="container" ref="container">
      <div class="for" v-for="(item, index) in APIARR" :key="index">
        <h3 v-if="item.titleType === 'h3'" :id="item.id">{{ item.title }}</h3>
        <p :class="{ color: item.pIdx === idx }" v-show="item.type === 'bigParagraph'" v-for="(i, idx) in item.text" :key="idx">
          {{ i }}
          <template v-if="item.aIdx === idx">
            <a href="javascript:;" v-if="isPurchase">{{ item.a[idx] }}</a>
            <a href="javascript:;" v-if="!isPurchase"> http://***/v1/</a>
            <span class="upgrade" @click="$router.push('/products')" v-if="!isPurchase">({{ $t("PCHomePage.upgrade.buy") }})</span>
          </template>
        </p>
        <ul v-if="item.type === 'request'" class="proxy_endpoints">
          <li v-for="(j, jdx) in item.content" :key="jdx">
            <span>{{ j.span }}</span>
            <p>{{ j.p }}</p>
          </li>
        </ul>
        <h4 v-if="item.titleType === 'h4'" :id="item.id">{{ item.title }}</h4>
        <div class="code_set" v-if="item.type === 'codeBlock'">
          <!-- 代码块 -->
          <prism-editor
            class="my-editor height-300"
            aria-disabled
            v-model="item.codeText"
            :highlight="highlighter"
            :tabSize="4"
            readonly
            line-numbers
          ></prism-editor>
        </div>
        <div class="me_table" v-if="item.type === 'table'">
          <table>
            <thead>
              <tr>
                <th v-for="(th, thdx) in item.thead" :key="thdx">{{ th }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tbody, bodydx) in item.tbody" :key="bodydx">
                <td v-for="(td, tdx) in tbody" :key="tdx">{{ td }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- ---国家代码------- -->
      <h2 id="country_code">Country code</h2>
      <!-- en 国家代码 -->
      <table class="code_table">
        <tbody>
          <tr v-for="(item, index) in enCodeList.Country" :key="index">
            <td v-for="i in item" :key="i">{{ i }}</td>
          </tr>
        </tbody>
      </table>
      <h2 id="us_state_code">US State Code</h2>
      <table class="code_table">
        <tbody>
          <tr v-for="(item, index) in enCodeList.UsState" :key="index">
            <td v-for="i in item" :key="i">{{ i }}</td>
          </tr>
        </tbody>
      </table>
      <h2 id="zg_code">国家代码</h2>
      <table class="code_table">
        <tbody>
          <tr v-for="(item, index) in cnCodeList.nation" :key="index">
            <td v-for="i in item" :key="i">{{ i }}</td>
          </tr>
        </tbody>
      </table>
      <h2 id="mg_code">美国州代码</h2>
      <table class="code_table">
        <tbody>
          <tr v-for="(item, index) in cnCodeList.philadelphia" :key="index">
            <td v-for="i in item" :key="i">{{ i }}</td>
          </tr>
        </tbody>
      </table>
      <div class="tip" v-if="!isPurchase">
        {{ $t("PCHomePage.upgrade.see_doc[0]") }} <span @click="$router.push('/products')">{{ $t("PCHomePage.upgrade.see_doc[1]") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import enCode from "./json/code_en.json"
import cnCode from "./json/code_cn.json"
import enAPI from "./json/enAPI"
import cnAPI from "./json/cnAPI"
// import Prism Editor
import { PrismEditor } from "vue-prism-editor" //
import "vue-prism-editor/dist/prismeditor.min.css" // import the styles somewhere
// import highlighting library (you can use any library you want just return html string)
import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css" // import syntax highlighting styles
import settingStore from "@/store/setting"
import userStore from "@/store/user"
export default {
  name: "DocsHelp",
  components: {
    PrismEditor,
  },
  data() {
    return {
      enCodeList: enCode,
      cnCodeList: cnCode,
      APIARR: null,
      // 索引栏
      // drawer: true,
      // 侧边书签
      column: [],
      idx: 0,
      activeStep: "basic_api", // 默认选中的锚点的key值
      offsetTop: 0,
      // 记录当前经过的标题
      bookmark: [],
      oldScrollTop: 0,
    }
  },
  // mounted () {
  //   window.addEventListener('scroll', this.scroll, true)
  // },
  // beforeDestroy () {
  //   window.removeEventListener('scroll', this.scroll, false)
  // },
  // created () {
  //   const arr = [...cnCode.nation, ...cnCode.philadelphia]
  //   const newArr = []
  //   arr.forEach((item) => {
  //     item.forEach((i) => {
  //       newArr.push({
  //         label: `${i.split(': ')[0]}-${i.split(': ')[1]}`,
  //         value: i.split(': ')[0]
  //       })
  //     })
  //   })
  //   console.log(newArr, 'newArr')
  // },
  methods: {
    // 事件委托
    dom($event) {
      const dom = document.querySelector(".docs_help_sidebar")
      if (!dom.contains($event.target)) {
        // 点击在dom外
        this.drawer = false
      }
    },
    // 侧边栏选中
    sidebarFn(index, { scrollTop }) {
      this.idx = index
      const dom = document.querySelector(".pc-docs_help")
      const step = parseInt(scrollTop / (2 * 20))
      let current = 0
      let start = dom.scrollTop
      let t = setInterval(() => {
        if (start < scrollTop) {
          start += step + 10
          if (start >= scrollTop) {
            clearInterval(t)
            start = scrollTop
            t = null
          }
        } else {
          start -= step + 1000
          if (start <= scrollTop) {
            clearInterval(t)
            start = scrollTop
            t = null
          }
        }
        if (current === start) {
          return
        }
        current = start
        dom.scrollTop = current
        // this.num = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') + ' ' + this.unit
      }, 10)
    },
    // scroll (e) {
    //   const box = document.querySelector('.pc-docs_help')
    //   // console.dir(box, 'box')
    //   // 若当前设置的滚动高度大于实际滚动的高度，即为锚点跳转，不再设置选中的锚点
    //   if (this.offsetTop > box.scrollTop) {
    //     this.offsetTop = 0
    //   }
    //   // 可视化 窗口高度
    //   const boxHeight = box.clientHeight - 400
    //   // 向下滚
    //   if (box.scrollTop > this.oldScrollTop) {
    //     this.oldScrollTop = box.scrollTop
    //     // console.log(box.scrollTop, 'top')
    //     this.$t('PCDocsHelp.column').some((item, index) => {
    //       if (this.bookmark.includes(item.id)) return false
    //       const dom = document.querySelector('#' + item.id)
    //       const top = dom.offsetTop - box.scrollTop
    //       // console.log(top, boxHeight)
    //       if (top <= boxHeight) {
    //         this.activeStep = item.id
    //         this.bookmark.push(item.id)
    //         console.log(this.bookmark, 'addbookmark')
    //         return true
    //       } else {
    //         return false
    //       }
    //     })
    //   } else {
    //     this.oldScrollTop = box.scrollTop
    //     const dom = document.querySelector('#' + this.bookmark[this.bookmark.length - 1])
    //     const top = dom.offsetTop - box.scrollTop
    //     if (top > boxHeight) {
    //       // this.activeStep = item.id
    //       // this.bookmark.push(item.id)
    //       this.bookmark.splice(this.bookmark.length - 1, 1)
    //       this.activeStep = this.bookmark[this.bookmark.length - 1]
    //       console.log(this.bookmark, 'removebookmark')
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    //   // const totalH = 0
    //   // this.$t('PCDocsHelp.column').some(anchor => {
    //   //   // const scrollItem = document.getElementById(anchor.id)// 锚点对应的模块
    //   //   // totalH = totalH + scrollItem.offsetTop
    //   //   // console.log(scrollItem.offsetTop, 'scrollItem.offsetTop')
    //   //   // console.log(anchor.id, 'anchor.id')
    //   //   // console.log(box.scrollTop, 'box.scrollTop')
    //   //   // const judge = box.scrollTop > totalH && box.scrollTop - totalH <= 50
    //   //   // if (judge) {
    //   //   //   this.activeStep = anchor.id
    //   //   //   return true
    //   //   // } else {
    //   //   //   return false
    //   //   // }
    //   //   console.log(anchor.id)
    //   //   return anchor.id
    //   // })
    // },
    jump(id) {
      this.activeStep = id // 设置选中的锚点为当前点击的
      const container = this.$refs.container
      // const box = document.querySelector('.pc-docs_help')
      const scrollItem = document.getElementById(id)
      // 锚点对应的模块与最近的一个具有定位的祖宗元素顶部的距离
      this.offsetTop = scrollItem.offsetTop
      container.scrollTo({
        top: scrollItem.offsetTop,
        behavior: "smooth",
      })
    },
    async getSlideBar() {
      const { default: column } = this.en ? await import("./json/slidebar.en") : await import("./json/slidebar.zh")
      this.column = column
    },
    async getApiCode() {
      const { default: api } = this.en ? await import("./json/enAPI") : await import("./json/cnAPI")
      this.APIARR = api
    },
  },
  mounted() {
    this.getSlideBar()
    this.getApiCode()
  },
  setup() {
    const { lang, en } = settingStore()
    const { is_purchase: isPurchase } = userStore()
    const highlighter = (code) => {
      return prism.highlight(code, prism.languages.js)
    }
    return { lang, en, isPurchase, highlighter }
  },
}
</script>

<style lang="less" scoped>
@import url("./docs_help.less");
</style>
