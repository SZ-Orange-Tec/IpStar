<template>
  <div class="login vh_center" :style="{ height: height }">
    <!-- <div class="background"> -->
    <!-- <StarPlay /> -->
    <!-- </div> -->

    <div class="box w-full">
      <div class="container column_center md:between gap-5">
        <div class="form column rounded-lg">
          <div class="title w-full text-center">
            <template v-if="/^forget/.test(status)">{{ t("login_spec.forgot") }}</template>
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

        <div class="right column w-full">
          <div class="img_box flex-1 hidden md:block">
            <img
              sizes="(max-width: 1024px) 290px, 400px"
              src="@/assets/images/login/bg-logo.png"
              srcset="@/assets/images/login/bg-logo.png 290w, @/assets/images/login/bg-logo@2x.png 580w"
              alt=""
            />
          </div>

          <div class="welcome space-y-5 column !items-end py-10">
            <ip-button type="border" class="back_btn" @click="toHome">
              <div class="v_center space-x-1">
                <span class="text-sm">{{ t("Home") }}</span>
                <ChevronRight :size="18"></ChevronRight>
              </div>
            </ip-button>
            <div class="text-lg sm:text-2xl lg:text-3xl v_center sm:column sm:!items-end gap-2">
              <div class="primary">{{ t("login_spec.your") }}</div>
              <div class="text-base major">IPSTAR!</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg_left">
      <img
        v-lazy
        sizes="(max-width: 1024px) 600px, 1200"
        src="@/assets/images/login/bg-left.png"
        srcset="@/assets/images/login/bg-left.png 773w, @/assets/images/login/bg-left@2x.png 1546w"
      />
    </div>
    <div class="bg_right">
      <img
        v-lazy
        sizes="(max-width: 1024px) 150px, 300px"
        src="@/assets/images/login/bg-right.png"
        srcset="@/assets/images/login/bg-right.png 201w, @/assets/images/login/bg-right@2x.png 401w"
      />
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
import { track_register } from "@/utils/detect"
import loginStore from "@/store/login"
import settingsStore from "@/store/setting"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { ChevronRight } from "lucide-vue-next"
// import StarPlay from "@/views/front/components/starPlay/gptstar.vue"
import { platCustomerResetpass } from "../../api/login"
import useWindowHeight from "../../composables/useWindowHeight"
import vLazy from "@/directive/lazy"
import userStore from "../../store/user"

const { t } = useI18n()

const router = useRouter()
const { token } = loginStore()
const { en } = settingsStore()
const { getUserInfo } = userStore()

const { height } = useWindowHeight()

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
          // 保存token
          localStorage.setItem("token", data.token)
          token.value = data.token

          await getUserInfo()
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
          // 保存token
          localStorage.setItem("token", data.token)
          token.value = data.token

          await getUserInfo()
          router.push("/overview")

          track_register()
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
        // 保存token
        localStorage.setItem("token", data.token)
        token.value = data.token

        await getUserInfo()
        router.push("/overview")

        Message({
          type: "success",
          message: en ? "Login successfully" : "登录成功",
        })
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
  router.push("/home")
}

onMounted(() => {
  loadBack()
})
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
