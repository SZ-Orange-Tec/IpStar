<template>
  <div class="pc-login">
    <div class="container column_center">
      <div class="back v_center space-x-1 pointer" v-if="status !== 'account'" @click="back">
        <i class="el-icon-arrow-left"></i>
        <strong>{{ $t("Back") }}</strong>
      </div>
      <div class="header column_center space-y-4">
        <img src="@/assets/pc_img/footer_img/ipflare-logo.png" alt="" />
        <strong>IPFLARE</strong>
      </div>

      <div class="main">
        <Account v-model="account" @next="next" v-if="status === 'account'" />
        <Password
          v-model:password="password"
          v-model:input="captcha.input"
          :captchaId="captcha.id"
          :image="captcha.image"
          @updateCaptcha="getGraphicCode"
          @next="next"
          v-else-if="status === 'password'"
        />
        <VerifyCode v-model="code" :account="account" @next="next" v-else-if="status === 'code'" />
        <ResetPassword v-model="password" @next="next" v-else-if="status === 'reset'" />
      </div>

      <div class="loading vh_center" v-if="loading">
        <span class="chat-loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "./components/account/index.vue"
import Password from "./components/password/index.vue"
import VerifyCode from "./components/code/index.vue"
import ResetPassword from "./components/reset/index.vue"
import { checkCustomer, platCaptcha, platCustomerLogin, platCustomerRegister, platCustomerVerifycode } from "@/api/login"
import detect from "@/utils/detect"
import { platDataConfig } from "@/api/home"
import loginStore from "../../store/login"
import userStore from "../../store/user"

export default {
  name: "LOGIN",
  components: {
    Account,
    Password,
    VerifyCode,
    ResetPassword,
  },
  metaInfo: {
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "login",
      },
      {
        name: "description",
        content: "This is the login page",
      },
    ],
  },
  data() {
    return {
      // 谷歌登录 github登录 loading
      loading: false,
      // 账号
      account: "",
      password: "",
      // 图形验证码
      captcha: {
        input: "",
        id: "",
        image: "",
      },
      // 邮箱验证码
      code: "",
      status: "account", // account password code reset
      transitionName: null,
    }
  },
  provide() {
    return {
      setLoading: (val) => {
        this.loading = val
      },
    }
  },
  methods: {
    // what
    whatsapp() {
      window.open("https://web.whatsapp.com/send?phone=85253457877")
    },
    // 访问 facebook
    facebook() {
      window.open("https://www.facebook.com/profile.php?id=100087652609159")
    },
    // srisp 即时聊天
    scisp_chat() {
      // console.log('点击')
      window.$crisp.push(["do", "chat:open"])
    },
    // next
    async next(func) {
      try {
        switch (this.status) {
          case "account":
            {
              // 判断用户是否存在
              const {
                data: { exist },
              } = await checkCustomer({ email: this.account })
              if (!exist) {
                await platCustomerVerifycode({
                  email: this.account,
                  type: 1,
                })
              } else {
                await this.getGraphicCode()
              }
              this.status = exist ? "password" : "code"
            }
            break
          case "password":
            {
              const { input, captchaId } = this.captcha
              const { data } = await platCustomerLogin({
                email: this.account,
                password: this.password,
                captcha_id: captchaId,
                captcha_value: input,
              })
              // 存储token
              localStorage.setItem("token", data.token)
              this.Login(data.token)
              // 获取用户信息
              this.getUserInfo()
              // 是否有注册奖励
              const has = await this.hasRegisterAward()
              this.$store.commit("layout/updateState", {
                key: "registerAward",
                value: has,
              })

              // 引入资源
              await import("@/views/back/layout.vue")

              this.$router.push("/layout")
            }

            break
          case "code":
            this.status = "reset"
            break
          case "reset":
            {
              const { data } = await platCustomerRegister({
                username: this.account,
                email: this.account,
                password: this.password,
                code: this.code,
              })
              // 存储token
              localStorage.setItem("token", data.token)
              Login(data.token)
              // 获取用户信息
              this.getUserInfo()
              // 是否有注册奖励
              const has = await this.hasRegisterAward()
              this.$store.commit("layout/updateState", {
                key: "registerAward",
                value: has,
              })

              // 引入资源
              await import("@/views/back/layout.vue")

              this.$router.push("/layout")
              detect.register()
            }
            break
          default:
            console.log("Error Status:", this.status)
            break
        }
      } catch (err) {
        console.log(err.message)
      }

      func && func()
    },
    // 获取配置
    async hasRegisterAward() {
      try {
        const { data } = await platDataConfig()
        return data.register_award
      } catch (err) {
        console.log(err)
        return false
      }
    },
    // 获取图形码
    async getGraphicCode() {
      const { data } = await platCaptcha({
        a: Math.random() * 10,
      })
      this.captcha = {
        input: "",
        captchaId: data.captcha_id,
        image: data.image,
      }
    },
    back() {
      switch (this.status) {
        case "password":
          this.status = "account"
          break
        case "code":
          this.status = "account"
          break
        case "reset":
          this.status = "code"
          break
        default:
          console.log(this.status)
          break
      }
    },
  },
  mounted() {
    import("@/views/back/layout.vue")
  },
  setup() {
    const { Login } = loginStore()
    const { getUserInfo } = userStore()
    return {
      Login,
      getUserInfo,
    }
  },
}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
