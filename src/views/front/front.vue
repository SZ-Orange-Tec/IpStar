<template>
  <div class="pc-home">
    <Header />
    
    <router-view />

    <Footer v-if="isFooter" />
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'

export default {
  // name: 'PCHome',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      isFooter: true
    }
  },
  mounted () {
    // this.scroll_window()
  },
  methods: {
    // 访问 facebook
    facebook () {
      window.open('https://www.facebook.com/profile.php?id=100087652609159')
    },
    // what
    whatsapp () {
      window.open('https://web.whatsapp.com/send?phone=85253457877')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./front.less');
</style>
