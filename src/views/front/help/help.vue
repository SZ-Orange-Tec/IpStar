<template>
  <div class="help relative">
    <div class="box">
      <div class="container column_center space-y-10">
        <i18n-t keypath="help_spec.title" tag="p" scope="global" class="text-3xl title">
          <template #title>
            <span class="primary_text">{{ t("help_spec.title_slot") }}</span>
          </template>
        </i18n-t>

        <!-- 选项块 -->
        <div class="select w-full space-x-10">
          <div
            class="flex-1 select-item pointer transition-color space-y-4"
            :class="{ active: index === idx }"
            v-for="(item, index) in domList"
            :key="index"
            @click="selectBlock(index)"
          >
            <h1 class="text-lg title">{{ item.h1 }}</h1>
            <p class="text-sm description">{{ item.p }}</p>
          </div>
        </div>

        <IpButton type="primary" class="btn px-10 h-10" @click="gotoDocum">
          <p>{{ t("help_spec.more") }}</p>
        </IpButton>

        <!-- 文档块 -->
        <div class="txt_document w-full space-x-10" v-if="idx === 0">
          <!-- left -->
          <div class="left" v-for="(item, index) in GettingList" :key="index">
            <div class="box" v-for="(j, i) in item" :key="i" @click="collapseClick(j.id)">
              <Collapse :bol="collapseIdx === j.id" :info="j" />
            </div>
          </div>
        </div>
        <div class="txt_document w-full space-x-10" v-if="idx === 1">
          <!-- left -->
          <div class="left" v-for="(item, index) in IntegrationList" :key="index">
            <div class="box" v-for="(j, i) in item" :key="i" @click="collapseClick(j.id)">
              <Collapse :bol="collapseIdx === j.id" :info="j" />
            </div>
          </div>
        </div>
        <div class="txt_document w-full space-x-10" v-if="idx === 2">
          <!-- left -->
          <div class="left" v-for="(item, index) in FAQlist" :key="index">
            <div class="box" v-for="(j, i) in item" :key="i" @click="collapseClick(j.id)">
              <Collapse :bol="collapseIdx === j.id" :info="j" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="background">
      <StarPlay />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import Collapse from "../components/collapse/collapse.vue"
import settingStore from "@/store/setting"
import IpButton from "@/components/button/button.vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import StarPlay from "@/views/front/components/starPlay/gptstar.vue"

const router = useRouter()
const { t } = useI18n()
const { en, isDocument, documentIdx } = settingStore()

const idx = ref(0)
const collapseIdx = ref(0)
const domList = ref([])
const GettingList = ref([])
const IntegrationList = ref([])
const FAQlist = ref([])

// 切换帮助中心
function selectBlock(index) {
  idx.value = index
  collapseIdx.value = null
}
// 当前展开的问答
function collapseClick(id) {
  if (collapseIdx.value === id) {
    collapseIdx.value = null
    return
  }
  collapseIdx.value = id
}
// 文档跳转
function gotoDocum() {
  if (idx.value === 0) {
    isDocument.value = "Getting"
    documentIdx.value = "0-0"
    router.push("/doc")
  } else if (idx.value === 1) {
    isDocument.value = "Help"
    documentIdx.value = "1-0"
    router.push("/doc")
  } else if (idx.value === 2) {
    isDocument.value = "FAQ"
    documentIdx.value = "2-0"
    router.push("/doc")
  }
}
// 获取数据
async function getInfo() {
  const {
    default: { dom, Getting, Integration, FAQ },
  } = en.value ? await import("./info.en") : await import("./info.zh")

  domList.value = dom
  GettingList.value = Getting
  IntegrationList.value = Integration
  FAQlist.value = FAQ
}

watch(en, () => {
  getInfo()
})

onMounted(() => {
  getInfo()
})
</script>

<style lang="less" scoped>
@import url("./help.less");
</style>
