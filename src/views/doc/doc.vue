<template>
  <div class="doc flex">
    <div class="slide flex-shrink-0 space-y-10" :class="{ expand: !isCollapse }">
      <!-- <img v-if="!isCollapse" :src="logos[0]" alt="logo" @click="$router.push('/home')" />
      <img v-else :src="logos[1]" alt="logo" @click="$router.push('/home')" class="minLogo" /> -->
      <div class="text-2xl space-x-2 hidden lg:v_center">
        <ip-button type="border" icon class="h-8 w-8" @click="router.go(-1)">
          <ChevronLeft />
        </ip-button>
        <!-- <span>IPSTAR</span> -->
        <img src="@/assets/images/logo.png" style="height: 36px" alt="" />
      </div>

      <div class="flex lg:hidden" style="justify-content: flex-end; margin-top: 0">
        <IpButton type="border" class="w-8 h-8" @click="isCollapse = true">
          <CloseIcon :size="16" color="hsl(var(--foreground))" />
        </IpButton>
      </div>

      <div class="menu space-y-2" ref="menuRef">
        <div class="menu_item" v-for="(item, index) in menuData" :key="item.id">
          <div class="menu_name between h-10 text-base pointer transition-color" @click="toggleMenu(index)">
            <span>{{ item.label }}</span>
            <ChevronRight :size="16" v-if="item.children.length > 0" class="icon" />
          </div>

          <div class="menu_child space-y-2">
            <div v-for="(child, childIndex) in item.children" key="child.id">
              <div
                class="v_center pointer transition-color menu_child_item"
                :class="{ pitch: documentIdx === index + '-' + childIndex, between: child.children?.length }"
                @click="pitchOnMenu(index + '-' + childIndex)"
              >
                <span>{{ child.label }}</span>
                <ChevronRight :size="16" v-if="child.children?.length > 0" class="icon" />
              </div>
              <div class="three_menu text-xs" v-if="child?.children?.length">
                <div
                  class="three_menu_item pointer"
                  :class="{
                    pitch: documentIdx === index + '-' + childIndex + '-' + threeIndex,
                  }"
                  v-for="(three, threeIndex) in child.children"
                  @click="pitchOnMenu(index + '-' + childIndex + '-' + threeIndex)"
                >
                  <span>{{ three.label }}</span>
                </div>
              </div>
            </div>
            <!-- <div class="menu_child_box text-sm space-y-2" v-for="(child, childIndex) in item.children" :key="child.id">
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 h-full column relative" style="overflow: auto">
      <div class="header w-full v_center h-10 px-3 block lg:hidden space-x-3">
        <ip-button type="border" class="h-8 px-3" @click="router.go(-1)">
          <div class="v_center space-x-2 text-sm">
            <ChevronLeft :size="16" />
            <span class="whitespace-nowrap">{{ t("Back") }}</span>
          </div>
        </ip-button>

        <ip-button type="border" class="px-3 h-8" @click="isCollapse = false">
          <div class="v_center space-x-2 text-sm">
            <Menu :size="16" />
            <span class="whitespace-nowrap">{{ t("Menu") }}</span>
          </div>
        </ip-button>
      </div>
      <!-- 文本区 -->
      <div class="text_content flex-1" v-if="loaded">
        <GettingText v-if="isDocument === 'Getting'" />
        <FAQText v-else-if="isDocument === 'FAQ'" />
        <HelpText v-else-if="isDocument === 'Help'" :name="helpName" :sonName="sonName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, defineAsyncComponent, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import settingStore from "@/store/setting"
// import userStore from "@/store/user"
import { ChevronRight, ChevronLeft, Menu, X as CloseIcon } from "lucide-vue-next"
import anime from "animejs/lib/anime.es"
import IpButton from "@/components/button/button.vue"
import { typeOf } from "../../utils/tools"
import i18n from "../../language"

const { isDocument, documentIdx, en } = settingStore()
// const { is_purchase } = userStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 组件引入
const GettingText = defineAsyncComponent(() => import("./textComponent/getting_started/getting_started.vue"))
const FAQText = defineAsyncComponent(() => import("./textComponent/FAQ/FAQ.vue"))
const HelpText = defineAsyncComponent(() => import("./textComponent/help_content/help_content.vue"))

// 响应式数据

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
const isCollapse = ref(true) // 菜单栏是否折叠

function toggleMenu(index) {
  // 切换菜单展开
  const second = typeOf(index) === "String" // 二级菜单
  const arr = second ? index.split("-") : [index]

  const item = arr.reduce((pre, next) => {
    pre = typeOf(pre) === "Object" ? pre.children : pre
    return pre[+next]
  }, menuData.value)

  const menuDom = arr.reduce((dom, index) => {
    return dom.children[+index].lastChild
  }, menuRef.value)

  const expand = item.expand

  function animetion(dom, height) {
    return new Promise((resolve) => {
      anime({
        targets: dom,
        height: height,
        duration: 300,
        easing: "easeOutQuad",
        complete: () => {
          resolve()
        },
      })
    })
  }

  if (!second) {
    const height = expand ? 0 : menuDom.scrollHeight
    animetion(menuDom, height).then(() => (item.expand = !expand))
  } else {
    const dom = menuDom.parentNode.parentNode
    const childHeight = expand ? 0 : menuDom.scrollHeight

    const parentHeight = expand ? dom.scrollHeight - menuDom.scrollHeight : dom.scrollHeight + menuDom.scrollHeight

    animetion(dom, parentHeight)
    animetion(menuDom, childHeight).then(() => (item.expand = !expand))
  }
}
function pitchOnMenu(key) {
  const arr = key.split("-")
  const item = arr.reduce((pre, next) => {
    pre = typeOf(pre) === "Object" ? pre.children : pre
    return pre[+next]
  }, menuData.value)

  const hasChild = item?.children?.length > 1
  if (hasChild) {
    toggleMenu(key)
    return
  }

  // selectDocument(item, key)
  isDocument.value = arr.length > 2 ? item.topName : item.parentName
  documentIdx.value = key

  helpName.value = arr.length > 2 ? item.parentName : item.name
  sonName.value = item.name

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
  // 初始化菜单
  const { default: data } = en.value ? await import("./menu.en") : await import("./menu.zh")

  data.forEach((item) => {
    if (item.children.length) {
      item.expand = false
      item.children.forEach((child) => {
        if (child.children?.length) {
          child.expand = false
        }
      })
    }
  })

  // if (!is_purchase.value) {
  //   menuData.value = [data[0], data[2]]
  // } else {
  // }
  menuData.value = data

  nextTick(() => {
    const index = +documentIdx.value.split("-")[0]
    if (!isNaN(index)) {
      toggleMenu(index)
      pitchOnMenu(documentIdx.value)
    }
  })
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

// 加载语言
const loaded = ref(false) // 语言是否加载成功
async function loadLanguage() {
  const locale = i18n.global.locale
  const file = isDocument.value
  const need = ["Getting", "FAQ", "Help"]
  const { default: messages } = await import(/* webpackChunkName: "locale-[request]" */ `@/language/doc/${file}/${locale}.js`)
  i18n.global.mergeLocaleMessage(locale, messages)

  loaded.value = true

  // 异步加载其他需要的语言
  nextTick(async () => {
    const load = need.filter((i) => i !== file)
    load.forEach(async (i) => {
      const { default: messages } = await import(/* webpackChunkName: "locale-[request]" */ `@/language/doc/${i}/${locale}.js`)
      i18n.global.mergeLocaleMessage(locale, messages)
    })
  })
}

onMounted(() => {
  loadLanguage()
})
</script>

<style lang="less" scoped>
@import url("./doc.less");
</style>
