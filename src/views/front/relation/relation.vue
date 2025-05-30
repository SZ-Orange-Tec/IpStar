<template>
  <div class="pc-relation">
    <div class="contact_us">
      <div class="contact_us_heat">
        <h1>{{$t('PCRelation.contactUsHeat.h1')}}</h1>
        <p>{{$t('PCRelation.contactUsHeat.p')}}</p>

        <div class="email_contact">
          <h4>{{$t('PCRelation.emailContact.h4')}}</h4>
          <div class="input_sum">
            <div class="input_hr">
              <p>{{$t('PCRelation.emailContact.inputHr.pOne')}}</p>
              <input type="text" v-model.trim="fullName" :placeholder="$t('PCRelation.emailContact.inputHr.placeholderOne')" autofocus="autofocus">
            </div>
            <div class="input_hr">
              <p>{{$t('PCRelation.emailContact.inputHr.pTwo')}}</p>
              <input type="text" v-model.trim="email" :placeholder="$t('PCRelation.emailContact.inputHr.placeholderTwo')">
            </div>
            <div class="input_hr">
              <p>{{$t('PCRelation.emailContact.inputHr.pThree')}}</p>
              <textarea cols="25" rows="5" v-model.trim="content"></textarea>
            </div>
          </div>
          <el-button @click="leave_word">{{$t('PCRelation.emailContact.btnText')}}</el-button>
        </div>
      </div>
    </div>
    <div class="message_us">
      <ul class="message_us_heat column">
        <li>
          <img @click="scisp_chat" src="../../../assets/pc_img/contact_img/phone call.png" alt="phone call">
          <div @click="scisp_chat" class="text_sum">
            <p>{{$t('PCRelation.messageUsHeat.liOne.pOne')}}</p>
            <p>{{$t('PCRelation.messageUsHeat.liOne.pTwo')}}</p>
          </div>
        </li>
        <li>
          <img @click="gotoEmail" src="../../../assets/pc_img/contact_img/mailbox.png" alt="mailbox">
          <div @click="gotoEmail" class="text_sum">
            <p>{{$t('PCRelation.messageUsHeat.liTwo')}}</p>
            <p>support@ipflare.com</p>
          </div>
        </li>
        <li>
          <img src="../../../assets/pc_img/contact_img/shield.png" alt="shield">
          <div class="text_sum">
            <p>{{$t('PCRelation.messageUsHeat.liThree')}}</p>
            <div class="img_sum">
              <img @click="twitter" src="../../../assets/pc_img/contact_img/tuite_black.png" alt="">
              <!-- <img @click="whatsapp" src="../../../assets/pc_img/contact_img/green phone.png" alt="">
              <img @click="facebook" src="../../../assets/pc_img/contact_img/Facebook.png" alt=""> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { platCustomerLeaveMessage } from '@/api/home'
export default {
  name: 'RelaTion',
  metaInfo: {
    meta: [
      {
        // set meta
        name: 'keyWords',
        content: 'relation'
      },
      {
        name: 'description',
        content: 'This is the relation page'
      }
    ]
  },
  data () {
    return {
      fullName: '',
      email: '',
      content: ''
    }
  },
  methods: {
    // 客户留言
    leave_word () {
      const {
        fullName,
        email,
        content
      } = this
      if (fullName && email && content) {
        platCustomerLeaveMessage({
          fullname: fullName, // string
          email, // string
          content // string
        }).then(() => {
          this.$alert('We have received your messages, and we will contact you as soon as possible.', 'warm prompt', {
            confirmButtonText: 'OK',
            showClose: false,
            callback: action => {
              this.fullName = ''
              this.email = ''
              this.content = ''
            }
          })
        })
      } else {
        this.$message({
          message: 'Please complete!',
          type: 'error'
        })
      }
    },
    // twitter
    twitter () {
      window.open('https://twitter.com/Ipflare913')
    },
    // what
    whatsapp () {
      window.open('https://web.whatsapp.com/send?phone=85253457877')
    },
    // 访问 facebook
    facebook () {
      window.open('https://www.facebook.com/profile.php?id=100087652609159')
    },
    // srisp 即时聊天
    scisp_chat () {
      // console.log('点击')
      window.$crisp.push(['do', 'chat:open'])
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
@import url('./relation.less');
</style>
