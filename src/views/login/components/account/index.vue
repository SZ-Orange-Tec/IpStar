<template>
  <div class="pc-login_account space-y-4">
    <p>{{ $t("PCLogin.p") }}</p>

    <div class="form space-y-2">
      <p>{{ $t("PCSignIn.email.span") }}</p>
      <ip-input v-model="email" class="w-full"></ip-input>
    </div>

    <div
      class="btn pointer vh_center space-x-2"
      @click="submit"
      :class="{ disabled: btnLoading }"
    >
      <span v-if="btnLoading" class="chat-loading"></span>
      <strong>{{ $t("PCHeader.btnSumOne") }}</strong>
    </div>

    <p class="other_login_title">{{ $t("PCSignIn.p[4]") }}</p>
    <div class="other_login column space-y-4">
      <!-- 谷歌登录 -->
      <div class="google" @click="handlerGoogleLogin">
        <span>
          <svg
            t="1711592951385"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4401"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 512c0-27.761778-2.56-54.897778-7.281778-81.294222H512v182.044444h233.585778c-12.856889 52.849778-45.056 96.711111-88.689778 126.919111l145.066667 113.777778c64.796444-62.805333 107.804444-146.944 125.496889-240.696889 6.144-32.654222 11.207111-66.104889 11.207111-100.750222z"
              fill="#4A8FF3"
              p-id="4402"
            ></path>
            <path
              d="M507.448889 238.933333c66.446222 0 127.260444 24.291556 174.364444 64.455111l127.715556-129.024A446.464 446.464 0 0 0 507.448889 56.888889C331.605333 56.888889 179.427556 158.72 105.187556 307.086222l146.944 115.2C288.881778 315.562667 389.290667 238.933333 507.448889 238.933333z"
              fill="#EC4D3C"
              p-id="4403"
            ></path>
            <path
              d="M656.839111 739.726222a262.428444 262.428444 0 0 1-149.447111 45.340445c-118.499556 0-219.192889-77.084444-255.658667-184.32l-146.887111 115.541333C178.915556 864.995556 331.320889 967.111111 507.392 967.111111c122.254222 0 221.980444-43.406222 294.513778-113.607111l-145.066667-113.777778z"
              fill="#3AB15C"
              p-id="4404"
            ></path>
            <path
              d="M237.112889 512c0-31.459556 5.347556-61.610667 15.018667-89.713778L105.187556 307.086222A456.590222 456.590222 0 0 0 56.888889 512c0 73.500444 17.351111 142.848 47.957333 204.288l146.944-115.598222A275.342222 275.342222 0 0 1 237.112889 512z"
              fill="#FDC608"
              p-id="4405"
            ></path>
          </svg>
        </span>
        Google
      </div>
      <!-- github登录 -->
      <div class="github" @click="handlerGithubLogin">
        <span>
          <svg
            t="1711592704071"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2503"
            width="200"
            height="200"
          >
            <path
              d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"
              fill="#000000"
              p-id="2504"
            ></path>
          </svg>
        </span>
        Github
      </div>
    </div>
  </div>
</template>

<script>
import { platDataConfig } from "@/api/home"
import { GithubLogin, GoogleLogin } from "@/api/login"
import { debounce } from "@/utils/tools"
import IpInput from "@/components/input/input.vue"
import loginStore from "@/store/login"
import settingStore from "@/store/setting"
import Message from "@/components/message/message"

export default {
  name: "PCLogin",
  setup() {
    const { token } = loginStore()
    const { lang } = settingStore()
    return {
      token,
      lang,
    }
  },
  props: {
    modelValue: String,
  },
  inject: ["setLoading"],
  data() {
    return {
      btnLoading: false,
    }
  },
  computed: {
    email: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("update:modelValue", val)
      },
    },
  },
  components: {
    IpInput,
  },
  methods: {
    submit() {
      if (!this.email) {
        const en = this.lang === "en"
        Message({
          type: "warning",
          message: en
            ? "Please enter your email address"
            : "请输入您的电子邮件",
        })
        return
      }
      this.btnLoading = true
      this.$emit("next", () => {
        this.btnLoading = false
      })
    },
    // google登录
    handlerGoogleLogin() {
      // 清除上一个
      window.removeEventListener("message", this.getGoogleInfo)
      window.open(
        "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&state=3EAB37D9D5310BFE&redirect_uri=" +
          window.location.origin +
          "/google.html&client_id=93460351239-lpknvoier4sf0r2larho3l8n87po6o48.apps.googleusercontent.com",
        "Google",
        "width=500, height=600,left=700,top=150"
      )
      // window.open('https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&access_type=online&state=google&redirect_uri=' + window.location.origin + '/google.html&client_id=1016316564446-8sg701dtokh3t4m5ivssl27a1a54n3gv.apps.googleusercontent.com', 'Google', 'width=500, height=600')
      this.getGoogleInfo = debounce((event) => {
        if (event.data.from === "google") {
          if (!event.data.code || event.data.code === "error") {
            window.removeEventListener("message", this.getGoogleInfo)
            return
          }
          // localStorage.setItem('google_token', event.data.code)
          const params = {
            token: event.data.code,
            // platform: 'pc'
          }
          // if (this.cid) params.channel = this.cid
          this.setLoading(true)
          GoogleLogin(params)
            .then(async (res) => {
              // 存储token
              localStorage.setItem("token", res.data.token)
              this.$store.commit("setToken", res.data.token)
              // 获取用户信息
              await this.$store.dispatch("getUserInfo")
              // 是否有注册奖励
              const has = await this.hasRegisterAward()
              this.$store.commit("layout/updateState", {
                key: "registerAward",
                value: has,
              })

              // 引入资源
              // await import("@/views/layout/layout.vue");

              this.$router.push("/layout")
            })
            .catch((err) => {
              console.log(err)
              this.$message.error("Login Failed,Please try again")
            })
            .finally(() => {
              this.setLoading(false)
              window.removeEventListener("message", this.getGoogleInfo)
            })
        }
      }, 500)
      window.addEventListener("message", this.getGoogleInfo)
    },
    // github登录
    handlerGithubLogin() {
      // 清除上一个
      window.removeEventListener("message", this.getGithubInfo)
      window.open(
        "https://github.com/login/oauth/authorize?client_id=5800f6ede67189ccd659&scope=user:email&state=" +
          (/www/.test(window.location.origin) ? "has" : "no") +
          "&redirect_uri=https://www." +
          location.host.replace("www.", "") +
          "/github.html",
        "Github",
        "width=500, height=600,left=700,top=150"
      )
      this.getGithubInfo = debounce((event) => {
        if (event.data.from === "github") {
          console.log("githubenter")
          if (!event.data.code || event.data.code === "error") {
            console.log("githuberr")
            window.removeEventListener("message", this.getGithubInfo)
            return
          }
          // localStorage.setItem('google_token', event.data.code)
          const params = {
            token: event.data.code,
            // platform: 'pc'
          }
          // if (this.cid) params.channel = this.cid
          this.setLoading(true)
          GithubLogin(params)
            .then(async (res) => {
              // 存储token
              localStorage.setItem("token", res.data.token)
              this.$store.commit("setToken", res.data.token)
              // 获取用户信息
              await this.$store.dispatch("getUserInfo")
              // 是否有注册奖励
              const has = await this.hasRegisterAward()
              this.$store.commit("layout/updateState", {
                key: "registerAward",
                value: has,
              })

              // 引入资源
              // await import("@/views/layout/layout.vue");

              this.$router.push("/layout")
            })
            .catch((err) => {
              console.log(err)
              this.$message.error("Login Failed,Please try again")
            })
            .finally(() => {
              this.setLoading(false)
              window.removeEventListener("message", this.getGithubInfo)
            })
        }
      }, 500)
      window.addEventListener("message", this.getGithubInfo)
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
  },
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
