<template>
  <footer class="pc-footer">
    <div class="footer_get_now">
      <div class="footer_heart">
        <h1>{{$t('PCFooter.footerGetNow.h1.one')}} <i>Ipflare </i> {{$t('PCFooter.footerGetNow.h1.two')}}</h1>
        <p>{{$t('PCFooter.footerGetNow.p')}}</p>
        <el-button type="warning" @click="goToPay">{{$t('PCFooter.footerGetNow.btnTxt')}} <i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
    <div class="footer_serve">
      <div class="footer_serve_heart">
        <div class="footer_serve_left">
          <img src="../../assets/pc_img/footer_img/ipflare-logo.png" alt="ipflare-logo">
          <ul>
            <li>
              <h3>{{$t('PCFooter.footer_serve.footerServeLeft.h3One')}}</h3>
              <ol>
                <li><a href="javascript:;" @click="goTologin">{{$t('PCFooter.footer_serve.footerServeLeft.olOne.aOne')}}</a></li>
                <li><a href="javascript:;" @click="goTologin">{{$t('PCFooter.footer_serve.footerServeLeft.olOne.aTwo')}}</a></li>
                <li><a href="javascript:;" @click="goTologin">{{$t('PCFooter.footer_serve.footerServeLeft.olOne.aThree')}}</a></li>
                <li><a href="javascript:;" @click="goTologin">{{$t('PCFooter.footer_serve.footerServeLeft.olOne.aFour')}}</a></li>
                <li><a href="javascript:;" @click="goTologin">{{$t('PCFooter.footer_serve.footerServeLeft.olOne.aFive')}}</a></li>
              </ol>
            </li>
            <li>
              <h3>{{$t('PCFooter.footer_serve.footerServeLeft.h3Two')}}</h3>
              <ol>
                <li><a href="javascript:;" @click="help_document('2-0')">{{$t('PCFooter.footer_serve.footerServeLeft.olTwo.aOne')}}</a></li>
                <li><a href="javascript:;" @click="help_document('0-0')">{{$t('PCFooter.footer_serve.footerServeLeft.olTwo.aTwo')}}</a></li>
                <li><a href="javascript:;" @click="goToApi">{{$t('PCFooter.footer_serve.footerServeLeft.olTwo.aThree')}}</a></li>
                <li><a href="javascript:;" @click="goTologin(2)">{{$t('PCFooter.footer_serve.footerServeLeft.olTwo.aFour')}}</a></li>
              </ol>
            </li>
            <li>
              <h3>{{$t('PCFooter.footer_serve.footerServeLeft.h3Three')}}</h3>
              <ol>
                <li><a href="/terms.html">{{$t('PCFooter.footer_serve.footerServeLeft.olThree.aOne')}}</a></li>
                <li><a href="/privacy.html">{{$t('PCFooter.footer_serve.footerServeLeft.olThree.aTwo')}}</a></li>
                <li><a href="javascript:;" @click="$router.push('/commitment')">{{$t('PCFooter.footer_serve.footerServeLeft.olThree.aThree')}}</a></li>
              </ol>
            </li>
          </ul>
        </div>
        <div class="footer_serve_right">
          <h4>{{$t('PCFooter.footer_serve.footerServeRight.h4')}}</h4>
          <!-- <p class="phone"><i>+</i>1 <span>716-631-0731</span></p> -->
          <p class="email" @click="gotoEmail">Email: support@ipflare.com</p>
          <div class="img_sum">
            <img src="../../assets/pc_img/contact_img/tuite_white.png" alt="twitter" @click="twitter_chat">
            <!-- <img src="../../assets/pc_img/footer_img/phone.png" alt="phone" @click="scisp_chat">
            <img src="../../assets/pc_img/footer_img/facebook.png" alt="facebook" @click="facebook">
            <img src="../../assets/pc_img/footer_img/phone_two.png" alt="phone" @click="whatsapp"> -->
          </div>
          <!-- <div class="house">
            <img src="../../assets/pc_img/footer_img/house.png" alt="house">
            <p>{{$t('PCFooter.footer_serve.footerServeRight.p')}}</p>
          </div> -->
          <img src="../../assets/pc_img/footer_img/half lock.png" alt="half lock">
        </div>
        <!-- <div class="line"></div> -->
      </div>
      <div class="declare">
        <p>{{$t('PCFooter.footer_serve.footerServeLeft.declare')}}</p>
        <p>{{$t('PCFooter.footer_serve.footerServeLeft.p')}}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooTer',
  methods: {
    // 去购买
    goToPay () {
      if (this.$store.state.token) {
        this.$store.commit('layout/setIsProduc', true)
        this.$router.push('/products')
      } else {
        this.$message({
          message: 'Please login first',
          type: 'warning'
        })
        this.$router.push('/sign_in')
      }
    },
    // 未登录去登录
    goTologin (key) {
      if (!this.$store.state.token) {
        this.$router.push('/login')
        this.$message({
          message: 'Please log in your account',
          type: 'warning'
        })
        return
      }
      switch (key) {
        case 1:
          this.$router.push('/help_document')
          this.$store.commit('setDocumentIdx', '0-2')
          break

        case 2:
          this.$router.push('/help_document')
          this.$store.commit('setDocumentIdx', '1-3-0')
          break

        default:
          this.$router.push('/layout')
          break
      }
    },
    // 去看API 文档
    goToApi () {
      if (this.$store.state.token) {
        this.$router.push('/docs_help')
      } else {
        this.$router.push('/login')
        this.$message({
          message: 'Please log in your account',
          type: 'warning'
        })
      }
    },
    // 跳转观看新手文档
    help_document (val) {
      this.$store.commit('setDocumentIdx', val)
      this.$router.push('/help_document')
    },
    twitter_chat () {
      window.open('https://twitter.com/Ipflare913')
    },
    // srisp 即时聊天
    scisp_chat () {
      // console.log('点击')
      window.$crisp.push(['do', 'chat:open'])
    },
    // 访问 facebook
    facebook () {
      window.open('https://www.facebook.com/profile.php?id=100087652609159')
    },
    // what
    whatsapp () {
      window.open('https://web.whatsapp.com/send?phone=85253457877')
    },
    // 邮箱跳转
    gotoEmail () {
      // 开启邮箱
      window.open('mailto:support@ipflare.com')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./footer.less');
</style>
