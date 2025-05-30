<template>
  <div class="pc-help">
    <div class="help_heart">
      <!-- 标题 -->
      <div class="title">
        <h1>{{$t('PCHelp.title')}}</h1>
      </div>
      <!-- 选项块 -->
      <div class="help_select">
        <div class="block" :class="{select:index===idx}" v-for="item,index in domList" :key="index" @click="selectBlock(index)">
          <h1>{{item.h1}}</h1>
          <p>{{item.p}}</p>
        </div>
      </div>
      <!-- @mouseout="mousemove" @mouseleave="mouseleave" -->
      <button @click="gotoDocum">
        <p>{{$t('PCHelp.btnTxt')}}</p>
        <div class="arrow-wrapper">
          <div class="arrow"></div>
        </div>
        <!-- <div class="test"  :style="`top:${layerY}px;left:${layerX}px;`"></div> -->
      </button>
      <!-- 文档块 -->
      <div class="txt_document" v-if="idx===0">
        <!-- left -->
        <div class="left" v-for="item,index in GettingList" :key="index">
          <div class="box" v-for="j,i in item" :key="i" @click="collapseClick(j.id)">
            <Collapse :bol="collapseIdx===j.id" :info="j"/>
          </div>
        </div>
      </div>
      <div class="txt_document" v-if="idx===1">
        <!-- left -->
        <div class="left" v-for="item,index in IntegrationList" :key="index">
          <div class="box" v-for="j,i in item" :key="i" @click="collapseClick(j.id)">
            <Collapse :bol="collapseIdx===j.id" :info="j"/>
          </div>
        </div>
      </div>
      <div class="txt_document" v-if="idx===2">
        <!-- left -->
        <div class="left" v-for="item,index in FAQlist" :key="index">
          <div class="box" v-for="j,i in item" :key="i" @click="collapseClick(j.id)">
            <Collapse :bol="collapseIdx===j.id" :info="j"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import Collapse from "../components/collapse/collapse.vue"
import settingStore from "@/store/setting"

const {lang}=settingStore()

const idx=ref(0)
const collapseIdx=ref(0)
const domList=ref([])
const GettingList=ref([])
const IntegrationList=ref([])
const FAQlist=ref([])


function mousemove (e) {
  this.layerY = e.offsetY
  this.layerX = e.offsetX
}
function mouseleave (e) {
  this.layerY = e.offsetY
  this.layerX = e.offsetX
}
// 切换帮助中心
function selectBlock (index) {
  this.idx = index
  this.collapseIdx = null
}
// 当前展开的问答
function collapseClick (id) {
  if (this.collapseIdx === id) {
    this.collapseIdx = null
    return
  }
  this.collapseIdx = id
}
// 文档跳转
function gotoDocum () {
  if (this.idx === 0) {
    this.$store.commit('setIsdocument', 'Getting')
    this.$store.commit('setDocumentIdx', '0-0')
    this.$router.push('/help_document')
  } else if (this.idx === 1) {
    this.$store.commit('setIsdocument', 'Help')
    this.$store.commit('setDocumentIdx', '1-0')
    this.$router.push('/help_document')
  } else if (this.idx === 2) {
    this.$store.commit('setIsdocument', 'FAQ')
    this.$store.commit('setDocumentIdx', '2-0')
    this.$router.push('/help_document')
  }
}
// 获取数据
async function getInfo(){
  const {
    default:{
      dom,
      Getting,
      Integration,
      FAQ
    }
  } = lang.value==='en' ? await import('./info.en') : await import('./info.zh')

  domList.value=dom
  GettingList.value=Getting
  IntegrationList.value=Integration
  FAQlist.value=FAQ
}

onMounted(()=>{
  getInfo()
})
</script>

<style lang="less" scoped>
  @import url('./help.less');
</style>
