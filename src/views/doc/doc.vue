<template>
  <div class="doc flex">
    <div class="slide flex-shrink-0 space-y-10">
      <img v-if="!isCollapse" :src="logos[0]" alt="logo" @click="$router.push('/home')" />
      <img v-else :src="logos[1]" alt="logo" @click="$router.push('/home')" class="minLogo" />

      <div class="menu space-y-2" ref="menuRef">
        <div class="menu_item" v-for="(item, index) in menuData" :key="item.id">
          <div class="menu_name between h-10 text-base pointer transition-color" @click="toggleMenu(index)">
            <span>{{ item.label }}</span>
            <ChevronRight :size="16" v-if="item.children.length > 0" class="icon" />
          </div>

          <div class="menu_child">
            <div
              class="menu_child_item v_center h-8 text-sm pointer transition-color"
              :class="{ pitch: documentIdx === index + '-' + childIndex }"
              v-for="(child, childIndex) in item.children"
              :key="child.id"
              @click="pitchOnMenu(index + '-' + childIndex)"
            >
              <p>{{ child.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文本区 -->
    <div class="text_content">
      <GettingText v-if="isDocument === 'Getting'" />
      <FAQText v-else-if="isDocument === 'FAQ'" />
      <HelpText v-else-if="isDocument === 'Help'" :name="helpName" :sonName="sonName" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, defineAsyncComponent } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import settingStore from "@/store/setting"
import userStore from "@/store/user"
import { ChevronRight } from "lucide-vue-next"
import anime from "animejs/lib/anime.es"

const { isDocument, documentIdx, en } = settingStore()
const { is_purchase } = userStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 组件引入
const GettingText = defineAsyncComponent(() => import("./textComponent/getting_started/getting_started.vue"))
const FAQText = defineAsyncComponent(() => import("./textComponent/FAQ/FAQ.vue"))
const HelpText = defineAsyncComponent(() => import("./textComponent/help_content/help_content.vue"))

// 响应式数据

const OneGrade = ref(null)
const defaultActive = ref(null)
const helpName = ref("Access_Android")
const sonName = ref(null)

const logos = [
  new URL("../../assets/pc_img/header_img/ipflare-logo.png", import.meta.url).href,
  new URL("../../assets/pc_img/help_document_img/logo.png", import.meta.url).href,
]
const first = ref(true)

// 菜单
const menuData = ref([])
const menuRef = ref(null)
const isCollapse = ref(false) // 菜单栏是否折叠

function toggleMenu(index) {
  // 切换菜单展开
  const menu = menuRef.value
  const menuItem = menu.children[index]
  const menuChild = menuItem.children[1]
  const expand = menuData.value[index].expand

  anime({
    targets: menuChild,
    height: expand ? 0 : menuChild.scrollHeight,
    duration: 300,
    easing: "easeOutQuad",
    complete: () => {
      menuData.value[index].expand = !expand
    },
  })
}
function pitchOnMenu(key) {
  // 选择菜单
  if (!key) return
  isDocument.value = key
  const arr = key.split("-")
  if (arr.length === 2) {
    selectDocument(menuData.value[arr[0]].children[arr[1]], key)
  } else if (arr.length === 3) {
    selectDocument(menuData.value[arr[0]].children[arr[1]].children[arr[2]], key)
  }
}
function selectDocument(item, index) {
  // 当前点击的父级菜单 (样式修改)
  if (index + "" !== "undefined") {
    if (index.toString().length === 1) {
      OneGrade.value = index + ""
    }
    if (item.children) {
      defaultActive.value = index + "-" + "0"
    } else {
      defaultActive.value = index
    }
  }
  // 一级文档修改
  if (item.name === "Getting" || item.topName === "Getting") {
    if (isDocument.value !== "Getting") {
      isDocument.value = item.topName === "Getting" ? item.topName : item.name
    }
  } else if (item.name === "FAQ" || item.topName === "FAQ") {
    if (isDocument.value !== "FAQ") {
      isDocument.value = item.topName === "FAQ" ? item.topName : item.name
    }
  } else if (item.name === "Help" || item.topName === "Help") {
    if (isDocument.value === "Help" && item.hierarchy === 3) {
      if (item.hierarchy === 2) {
        if (isDocument.value !== item.parentName) {
          isDocument.value = item.parentName
        }
        helpName.value = item.name
      } else if (item.hierarchy === 3) {
        if (helpName.value !== item.parentName) {
          helpName.value = item.parentName
        }
        sonName.value = item.name
      }
      // 开启子级首个目录
      if (item.name === "Fingerprint_Browser") {
        sonName.value = "ADSPower"
      } else if (item.name === "Code_API_Access") {
        sonName.value = "Go"
      }
      return
    }
    helpName.value = "Access_Android"
    isDocument.value = item.topName === "Help" ? item.topName : item.name
  }
  // 二级文档 修改
  if (item.hierarchy === 2) {
    // 检查一级文档是否修改
    if (isDocument.value !== item.parentName) {
      isDocument.value = item.parentName
    }
    helpName.value = item.name
    // 三级文档修改
  } else if (item.hierarchy === 3) {
    // 检查二级文档是否修改
    if (helpName.value !== item.parentName) {
      helpName.value = item.parentName
    }
    sonName.value = item.name
  }
  // 开启子级首个目录
  if (item.name === "Fingerprint_Browser") {
    sonName.value = "ADSPower"
  } else if (item.name === "Code_API_Access") {
    sonName.value = "Go"
  }
  // 首次进入
  if (first.value) {
    first.value = false
    return
  }
  // 滚动
  scroll(item.scrollTop)
}

function scroll(top) {
  nextTick(() => {
    const dom = document.querySelector(".text_content")
    assistScroll(dom, top)
  })
}

function assistScroll(dom, scrollTop) {
  const step = parseInt(scrollTop / (2 * 100))
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
      start -= step + 100
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
  }, 10)
}

async function init() {
  const { documentIdx, isdocument } = route.query
  if (route.query.documentIdx) {
    isDocument.value = isdocument
    documentIdx.value = documentIdx
  }
  const { default: data } = en.value ? await import("./menu.en") : await import("./menu.zh")
  if (!is_purchase.value) {
    menuData.value = [data[0], data[2]]
  } else {
    menuData.value = data
  }
  pitchOnMenu("0-0")
}
init()

// 监听器
watch(
  documentIdx,
  (val) => {
    pitchOnMenu(val)
  },
  { immediate: false }
)
</script>

<style lang="less" scoped>
@import url("./doc.less");
</style>
