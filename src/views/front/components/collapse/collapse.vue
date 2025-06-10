<template>
  <div class="pc-collapse" :style="`height:${bol ? height : titleDom}px;`">
    <header class="title dom between text-sm" :class="{ select: bol }">
      <p class="title">{{ info?.title }}</p>
      <ChevronRight :size="18" :class="{ down: bol }" style="transition: transform 0.3s" />
    </header>
    <div class="content_text text-sm space-y-3" @click.stop="fn" v-if="info?.type !== 'download'">
      <p v-for="(item, index) in info?.p" :key="index">
        <span v-if="item.type !== 'a'">{{ item.txt }}</span
        ><i v-if="item.type === 'followUp'" @click="goto(item.idx)">...>></i>
        <a href="javascript:;" @click="open(item.url)" v-if="item.type === 'a'">{{ item.txt }}</a>
      </p>
    </div>
    <div class="content_download" v-else @click.stop="fn">
      <ul>
        <li>
          <a href="https://ipflare.com/download/python.rar" @click="beforeDownload">
            Python
            <i class="el-icon-download"></i>
          </a>
        </li>
        <li>
          <a href="https://ipflare.com/download/php.rar" @click="beforeDownload">
            PHP
            <i class="el-icon-download"></i>
          </a>
        </li>
        <li>
          <a href="https://ipflare.com/download/java.rar" @click="beforeDownload">
            Java
            <i class="el-icon-download"></i>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="gotoDocum">
            More
            <i class="el-icon-d-arrow-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChevronRight } from "lucide-vue-next"
export default {
  name: "PCCollapse",
  components: {
    ChevronRight,
  },
  props: {
    bol: {
      type: Boolean,
    },
    info: {
      type: Object,
    },
  },
  data() {
    return {
      height: null,
      titleDom: null,
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  mounted() {
    this.dom()
  },
  methods: {
    // 下载之前验证是否登录
    beforeDownload(e) {
      if (!this.token) {
        this.$message.warning(this.$t("PCHomePage.clickPay"))
        e.preventDefault()
      }
    },
    goto(idx) {
      const routeUrl = this.$router.resolve({
        path: "/doc",
        query: { isdocument: "Help", documentIdx: idx },
      })
      window.open(routeUrl.href)
    },
    dom() {
      const domHeight = this.$el.children[1].offsetHeight
      this.titleDom = this.$el.children[0].offsetHeight
      this.height = domHeight + this.titleDom + 6
    },
    // 跳转代码
    gotoDocum() {
      const routeUrl = this.$router.resolve({
        path: "/doc",
        query: { isdocument: "Help", documentIdx: "1-3-0" },
      })
      window.open(routeUrl.href)
    },
    open(url) {
      window.open(url)
    },
    fn() {},
  },
  watch: {
    bol: {
      handler(val) {
        if (!val) return
        this.$nextTick(() => {
          this.dom()
        })
      },
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
@import url("./collapse.less");
</style>
