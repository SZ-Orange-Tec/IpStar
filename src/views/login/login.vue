<template>
  <div class="login">
    <div class="container column">
      <div class="title">{{ t("Sign_in") }}</div>

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

    <div class="welcome text-3xl">
      <div>{{ t("login_spec.your") }}</div>
      <div class="liner">IP STAR!</div>
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
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"

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

// 方法定义
function whatsapp() {
  window.open("https://web.whatsapp.com/send?phone=85253457877")
}

function facebook() {
  window.open("https://www.facebook.com/profile.php?id=100087652609159")
}

function scisp_chat() {
  window.$crisp.push(["do", "chat:open"])
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

onMounted(() => {
  import("@/views/back/layout.vue")
})

// meta信息
// defineOptions({
//   name: "LOGIN",
//   metaInfo: {
//     meta: [
//       {
//         name: "keyWords",
//         content: "login",
//       },
//       {
//         name: "description",
//         content: "This is the login page",
//       },
//     ],
//   },
// })
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
