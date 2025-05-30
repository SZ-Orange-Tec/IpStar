<template>
  <div class="pc-help_document">
    <div class="side_bar">
      <img v-if="!isCollapse" :src="logos[0]" alt="logo" @click="$router.push('/home')">
      <img v-else :src="logos[1]" alt="logo" @click="$router.push('/home')" class="minLogo">
      <el-menu :default-active="documentIdx" @select="pitchOnMenu" @open="pitchOnMenu" unique-opened :collapse="isCollapse">
        <el-submenu :index="index+''" v-for="item,index in menuData" :key="item.id">
          <template slot="title">
            <div class="item" @click="selectDocument(item,index)">
              <img :src="item.icon" alt="">
              <span>{{item.label}}</span>
            </div>
          </template>
          <template v-for="i,idx in item.children">
            <div :key="i.id">
              <el-menu-item-group>
                <el-menu-item :index="index+'-'+idx" v-if="!i.children" :class="{pitch_on:defaultActive===index+'-'+idx}">{{i.label}}</el-menu-item>
              </el-menu-item-group>
              <el-submenu :index="index+'-'+idx" v-if="i.children">
                <template slot="title">
                  <span @click="selectDocument(i,index+'-'+idx)">{{i.label}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="index+'-'+idx+'-'+k" v-for="j,k in i.children" :key="j.id" :class="{pitch_on:defaultActive===index+'-'+idx+'-'+k}">{{j.label}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
          </template>
        </el-submenu>
      </el-menu>
      <el-button class="el-icon-s-operation" @click="isCollapse = !isCollapse"></el-button>
    </div>
    <!-- 文本区 -->
    <div class="text_content">
      <GettingText v-if="$store.state.isdocument==='Getting'" />
      <FAQText v-else-if="$store.state.isdocument==='FAQ'" />
      <HelpText v-else-if="$store.state.isdocument==='Help'" :name="helpName" :sonName="sonName" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PCHelpDocument',
  metaInfo: {
    meta: [
      {
        // set meta
        name: 'keyWords',
        content: 'help_document'
      },
      {
        name: 'description',
        content: 'This is the help_document page'
      }
    ]
  },
  components: {
    GettingText: () => import('./textComponent/getting_started/getting_started.vue'),
    FAQText: () => import('./textComponent/FAQ/FAQ.vue'),
    HelpText: () => import('./textComponent/help_content/help_content.vue')
  },
  computed: {
    ...mapState(['documentIdx']),
    isPurchase () {
      return this.$store.state.token && this.$store.state.user_info?.pack_remain > 0
    }
  },
  data () {
    return {
      menuData: [],
      // 一级菜单
      OneGrade: null,
      // 当前选中项 索引
      defaultActive: null,
      // help name
      helpName: 'Access_Android',
      // 第三级name
      sonName: null,
      isCollapse: false,
      logos: [
        require('../../assets/pc_img/header_img/ipflare-logo.png'),
        require('../../assets/pc_img/help_document_img/logo.png')
      ],
      first: true
    }
  },
  created () {
    const { documentIdx, isdocument } = this.$route.query
    if (this.$route.query.documentIdx) {
      this.$store.commit('setIsdocument', isdocument)
      this.$store.commit('setDocumentIdx', documentIdx)
    }
    const data = this.$t('PCHelpDocument.menuData')
    if (!this.isPurchase) {
      this.menuData = [data[0], data[2]]
    } else {
      this.menuData = data
    }
    this.pitchOnMenu('0-0')
  },
  methods: {
    // 切换文档
    selectDocument (item, index) {
      // 当前点击的父级菜单 (样式修改)
      if (index + '' !== 'undefined') {
        if (index.toString().length === 1) {
          this.OneGrade = index + ''
        }
        if (item.children) {
          this.defaultActive = index + '-' + '0'
        } else {
          this.defaultActive = index
        }
      }
      // 一级文档修改
      if (item.name === 'Getting' || item.topName === 'Getting') {
        if (this.$store.state.isdocument !== 'Getting') {
          this.$store.commit('setIsdocument', item.topName === 'Getting' ? item.topName : item.name)
        }
      } else if (item.name === 'FAQ' || item.topName === 'FAQ') {
        if (this.$store.state.isdocument !== 'FAQ') {
          this.$store.commit('setIsdocument', item.topName === 'FAQ' ? item.topName : item.name)
        }
      } else if (item.name === 'Help' || item.topName === 'Help') {
        // console.log(this.$store.state.isdocument)
        if (this.$store.state.isdocument === 'Help' && item.hierarchy === 3) {
          if (item.hierarchy === 2) {
            if (this.$store.state.isdocument !== item.parentName) {
              this.$store.commit('setIsdocument', item.parentName)
            }
            this.helpName = item.name
          } else if (item.hierarchy === 3) {
            if (this.helpName !== item.parentName) {
              this.helpName = item.parentName
            }
            this.sonName = item.name
          }
          // 开启子级首个目录
          if (item.name === 'Fingerprint_Browser') {
            this.sonName = 'ADSPower'
          } else if (item.name === 'Code_API_Access') {
            this.sonName = 'Go'
          }
          return
        }
        this.helpName = 'Access_Android'
        this.$store.commit('setIsdocument', item.topName === 'Help' ? item.topName : item.name)
      }
      // 二级文档 修改
      if (item.hierarchy === 2) {
        // 检查一级文档是否修改
        if (this.$store.state.isdocument !== item.parentName) {
          this.$store.commit('setIsdocument', item.parentName)
        }
        this.helpName = item.name
        // 三级文档修改
      } else if (item.hierarchy === 3) {
        // 检查二级文档是否修改
        if (this.helpName !== item.parentName) {
          this.helpName = item.parentName
        }
        this.sonName = item.name
      }
      // 开启子级首个目录
      if (item.name === 'Fingerprint_Browser') {
        this.sonName = 'ADSPower'
      } else if (item.name === 'Code_API_Access') {
        this.sonName = 'Go'
      }
      // 首次进入
      if (this.first) {
        this.first = false
        return
      }
      // 滚动
      this.scroll(item.scrollTop)
    },
    // 滚动事件
    scroll (top) {
      this.$nextTick(() => {
        const dom = document.querySelector('.text_content')
        this.assistScroll(dom, top)
      })
    },
    // 辅助滚动器
    assistScroll (dom, scrollTop) {
      const step = parseInt((scrollTop) / (2 * 100))
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
    },
    // 当前选中的 菜单栏
    pitchOnMenu (key) {
      if (!key) return
      this.$store.commit('setDocumentIdx', key)
      const arr = key.split('-')
      if (arr.length === 2) {
        this.selectDocument(this.menuData[arr[0]].children[arr[1]], key)
      } else if (arr.length === 3) {
        this.selectDocument(this.menuData[arr[0]].children[arr[1]].children[arr[2]], key)
      }
    }
  },
  watch: {
    documentIdx: {
      handler (val) {
        this.pitchOnMenu(val)
      },
      immediate: false
    }
    // isPurchase: {
    //   handler (val) {
    //     const data = this.$t('PCHelpDocument.menuData')
    //     if (val) {
    //       this.menuData = data
    //     } else {
    //       this.menuData = data.splice(1, 1)
    //     }
    //   },
    //   immediate: true
    // }
  }
}
</script>

<style lang="less" scoped>
@import url('./help_document.less');
</style>
