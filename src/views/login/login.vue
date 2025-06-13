<template>
  <div class="login vh_center">
    <div class="background">
      <!-- <img class="bck" src="@/assets/images/login/video_bck.webp" @load="bgLoaded" alt="" />
      <video
        v-if="startLoadVideo"
        type="video/mp4"
        poster="https://img1.wsimg.com/isteam/videos/uA41GmyyG8IMaxXdb"
        autoplay
        loop
        muted
        playsinline
        class="bck"
        src="https://websites.godaddy.com/categories/v4/videos/raw/video/uA41GmyyG8IMaxXdb"
        style="opacity: 0"
        @canplaythrough="videoLoaded"
      ></video> -->
      <StarPlay />
    </div>

    <div class="container column">
      <div class="title w-full text-center">{{ t("Sign_in") }}</div>

      <div class="w-full">
        <Account v-model="account" @next="next" v-if="status === 'account'" />
        <Password
          v-model:password="password"
          v-model:input="captcha.input"
          :captchaId="captcha.id"
          :image="captcha.image"
          @updateCaptcha="getGraphicCode"
          @next="next"
          @back="back"
          v-else-if="status === 'password'"
        />
        <VerifyCode v-model="code" :account="account" @next="next" @back="back" v-else-if="status === 'code'" />
        <ResetPassword v-model="password" @next="next" v-else-if="status === 'reset'" />
      </div>
    </div>

    <div class="welcome space-y-5">
      <ip-button type="border" class="back_btn" @click="toHome">
        <div class="v_center space-x-1">
          <ChevronLeft :size="22"></ChevronLeft>
          <span class="text-base">{{ t("Home") }}</span>
        </div>
      </ip-button>
      <div class="text-3xl">
        <div>{{ t("login_spec.your") }}</div>
        <div class="liner">IP STAR!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Account from "./components/account/index.vue"
import Password from "./components/password/index.vue"
import VerifyCode from "./components/code/index.vue"
import ResetPassword from "./components/reset/index.vue"
import { checkCustomer, platCaptcha, platCustomerLogin, platCustomerRegister, platCustomerVerifycode } from "@/api/login"
import detect from "@/utils/detect"
import { platDataConfig } from "@/api/home"
import loginStore from "@/store/login"
import userStore from "@/store/user"
import layoutStore from "@/store/layout"
import settingsStore from "@/store/setting"
import { ref } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { ChevronLeft } from "lucide-vue-next"
import StarPlay from "@/views/front/components/starPlay/gptstar.vue"

const { t } = useI18n()

const router = useRouter()
const { registerAward } = layoutStore()
const { Login } = loginStore()
const { getUserInfo } = userStore()
const { en } = settingsStore()
// 响应式数据
const account = ref("")
const password = ref("")
const captcha = ref({
  input: "",
  id: "",
  image: "",
})
const code = ref("")
const status = ref("account") // account, password, code, reset

// 预加载后台
async function loadBack() {
  await import(/*webpackChunkName:'layout'*/ "@/views/back/layout.vue")
  await import(/*webpackChunkName:'overview'*/ "@/views/back/overview/overview.vue")
  await import(/*webpackChunkName:'products'*/ "@/views/back/products/products.vue")
  await import(/*webpackChunkName:'billings'*/ "@/views/back/billings/billings.vue")
  await import(/*webpackChunkName:'proxy'*/ "@/views/back/proxy/proxy.vue")
  await import(/*webpackChunkName:'api'*/ "@/views/back/API/api.vue")
  await import(/*webpackChunkName:'settings'*/ "@/views/back/settings/settings.vue")
}

// 视频加载完成
const startLoadVideo = ref(false)
function videoLoaded(e) {
  e.target.style.opacity = 1
}
function bgLoaded() {
  startLoadVideo.value = true
  loadBack()
}

async function getGraphicCode() {
  const { data } = await platCaptcha({
    a: Math.random() * 10,
  })
  captcha.value = {
    input: "",
    captchaId: data.captcha_id,
    image: data.image,
  }
}

async function hasRegisterAward() {
  try {
    const { data } = await platDataConfig()
    return data.register_award
  } catch (err) {
    console.log(err)
    return false
  }
}

async function next(func) {
  try {
    switch (status.value) {
      case "account":
        {
          const {
            data: { exist },
          } = await checkCustomer({ email: account.value })
          if (!exist) {
            await platCustomerVerifycode({
              email: account.value,
              type: 1,
            })
          } else {
            await getGraphicCode()
          }
          status.value = exist ? "password" : "code"
        }
        break
      case "password":
        {
          const { input, captchaId } = captcha.value
          const { data } = await platCustomerLogin({
            email: account.value,
            password: password.value,
            captcha_id: captchaId,
            captcha_value: input,
          })
          localStorage.setItem("token", data.token)
          Login(data.token)
          getUserInfo()
          const has = await hasRegisterAward()
          registerAward.value = has
          await import("@/views/back/layout.vue")
          router.push("/overview")

          Message({
            type: "success",
            message: en ? "Login successfully" : "登录成功",
          })
        }
        break
      case "code":
        status.value = "reset"
        break
      case "reset":
        {
          const { data } = await platCustomerRegister({
            username: account.value,
            email: account.value,
            password: password.value,
            code: code.value,
          })
          localStorage.setItem("token", data.token)
          Login(data.token)
          getUserInfo()
          const has = await hasRegisterAward()
          registerAward.value = has
          await import("@/views/back/layout.vue")
          router.push("/overview")
          detect.register()
        }
        break
      default:
        console.log("Error Status:", status.value)
        break
    }
  } catch (err) {
    console.log(err.message)
  }
  func && func()
}

function back() {
  switch (status.value) {
    case "password":
      status.value = "account"
      break
    case "code":
      status.value = "account"
      break
    case "reset":
      status.value = "code"
      break
    default:
      console.log(status.value)
      break
  }
}

function toHome() {
  try {
    router.go(-1)
  } catch (err) {
    router.replace("/home")
  }
}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
