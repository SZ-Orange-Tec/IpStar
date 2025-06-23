<template>
  <div class="login vh_center" :style="{ height: height }">
    <div class="background">
      <StarPlay />
    </div>

    <div class="container column">
      <div class="title w-full text-center">
        <template v-if="/^forget/.test(status)">{{ t("Forgot_password") }}</template>
        <template v-else>{{ t("Sign_in") }}</template>
      </div>

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
          @forget="status = 'forget_email'"
          v-else-if="status === 'password'"
        />
        <VerifyCode v-model="code" :account="account" @next="next" @back="back" v-else-if="status === 'code' || status === 'forget_code'" />
        <ResetPassword v-model="password" @next="next" @back="back" v-else-if="status === 'reset' || status === 'forget_reset'" />

        <ForgetPassword v-model="account" @next="next" @back="back" v-else-if="status === 'forget_email'" />
      </div>

      <div class="loading vh_center" v-if="loading">
        <div class="column_center space-y-3">
          <span class="ip-loading"></span>
          <p>{{ t("Logging_in") }}</p>
        </div>
      </div>
    </div>

    <div class="welcome space-y-5">
      <ip-button type="border" class="back_btn" @click="toHome">
        <div class="v_center space-x-1">
          <ChevronLeft :size="22"></ChevronLeft>
          <span class="text-base">{{ t("Home") }}</span>
        </div>
      </ip-button>
      <div class="text-lg sm:text-2xl lg:text-3xl v_center sm:column gap-2">
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
import ForgetPassword from "./components/forget/index.vue"
import { checkCustomer, platCaptcha, platCustomerLogin, platCustomerRegister, platCustomerVerifycode } from "@/api/login"
import detect from "@/utils/detect"
import { platDataConfig } from "@/api/home"
import loginStore from "@/store/login"
import userStore from "@/store/user"
import layoutStore from "@/store/layout"
import settingsStore from "@/store/setting"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { ChevronLeft } from "lucide-vue-next"
import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import { platCustomerResetpass } from "../../api/login"

const { t } = useI18n()

const router = useRouter()
const { registerAward } = layoutStore()
const { Login } = loginStore()
const { getUserInfo } = userStore()
const { en } = settingsStore()

const height = window.innerHeight + "px"
// 响应式数据
const account = ref("")
const password = ref("")
const captcha = ref({
  input: "",
  id: "",
  image: "",
})
const code = ref("")
const status = ref("account") // account, password, code, reset, forget_email,forget_code,forget_reset
const loading = ref(false)
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
        await await platCustomerVerifycode({
          email: account.value,
          code: code.value,
        })
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
      case "forget_email":
        await platCustomerVerifycode({
          email: account.value,
          type: 2,
        })
        status.value = "forget_code"
        // Message({
        //   type:'success',
        //   message:en.value?''
        // })
        break
      case "forget_code":
        await await platCustomerVerifycode({
          email: account.value,
          code: code.value,
        })
        status.value = "forget_reset"
        password.value = ""
        break
      case "forget_reset":
        await platCustomerResetpass({
          email: account.value,
          code: code.value,
          password: password.value,
        })
        Message({
          type: "success",
          message: en.value ? "Successfully reset password" : "成功重置密码",
        })
        // 登录
        loading.value = true
        await getGraphicCode()
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

        status.value = "forget_reset"
        break
      default:
        console.log("Error Status:", status.value)
        break
    }
  } catch (err) {
    console.log(err.message)
  }
  loading.value = false
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
    case "forget_email":
      status.value = "password"
      break
    case "forget_code":
      status.value = "forget_email"
      break
    case "forget_reset":
      status.value = "forget_code"
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

onMounted(() => {
  loadBack()
})
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
