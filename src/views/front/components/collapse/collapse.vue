<template>
  <div class="pc-collapse" ref="collapseRef" :style="`height:${bol ? height : titleDom}px;`">
    <header class="title dom between text-sm" :class="{ select: bol }">
      <p class="font-medium text-lg">{{ info?.title }}</p>
      <ChevronRight :size="18" :class="{ down: bol }" style="transition: transform 0.3s" />
    </header>
    <div class="content_text space-y-3" @click.stop="fn" v-if="info?.type !== 'download'">
      <p v-for="(item, index) in info?.p" :key="index">
        <span v-if="item.type !== 'a'">{{ item.txt }}</span
        ><i v-if="item.type === 'followUp'" @click="goto(item.idx)">...>></i>
        <a href="javascript:;" @click="open(item.url)" v-if="item.type === 'a'">{{ item.txt }}</a>
      </p>
    </div>
    <div class="content_download" v-else @click.stop="fn">
      <ul>
        <li>
          <a href="https://ipstar.io/download/python.rar" @click="beforeDownload">
            Python
            <i class="el-icon-download"></i>
          </a>
        </li>
        <li>
          <a href="https://ipstar.io/download/php.rar" @click="beforeDownload">
            PHP
            <i class="el-icon-download"></i>
          </a>
        </li>
        <li>
          <a href="https://ipstar.io/download/java.rar" @click="beforeDownload">
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

<script setup>
import { ref, watch, nextTick, onMounted } from "vue"
import { useRouter } from "vue-router"
import { ChevronRight } from "lucide-vue-next"
import settingStore from "@/store/setting"
import loginStore from "@/store/login"
import Message from "@/components/message/message"

const props = defineProps({
  bol: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
})

const { token } = loginStore()
const router = useRouter()
const { isDocument, documentIdx, en } = settingStore()

const height = ref(null)
const titleDom = ref(null)
const collapseRef = ref(null)

// 下载之前验证是否登录
function beforeDownload(e) {
  if (!token.value) {
    Message({
      type: "warning",
      message: en.value ? "Please login first" : "请先登录",
    })
    e.preventDefault()
  }
}

function goto(idx) {
  // const routeUrl = router.resolve({
  //   path: "/doc",
  //   query: { isdocument: "Help", documentIdx: idx },
  // })
  // window.open(routeUrl.href)
  isDocument.value = "Help"
  documentIdx.value = idx
  router.push("/doc")
}

function dom() {
  const domHeight = collapseRef.value.children[1].scrollHeight
  titleDom.value = collapseRef.value.children[0].offsetHeight
  height.value = domHeight + titleDom.value + 6
}

// 跳转代码
function gotoDocum() {
  // const routeUrl = router.resolve({
  //   path: "/doc",
  //   query: { isdocument: "Help", documentIdx: "1-3-0" },
  // })
  // window.open(routeUrl.href)
  isDocument.value = "Help"
  documentIdx.value = "1-3-0"
  router.push("/doc")
}

function open(url) {
  window.open(url)
}

function fn() {}

watch(
  () => props.bol,
  (val) => {
    if (!val) return
    nextTick(() => {
      dom()
    })
  },
  { deep: true }
)

// 初始化
onMounted(() => {
  dom()
})
</script>

<style lang="less" scoped>
@import url("./collapse.less");
</style>
