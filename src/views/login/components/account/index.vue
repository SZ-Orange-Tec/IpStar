<template>
  <div class="login_account space-y-5">
    <div class="form space-y-5">
      <p class="text-sm">{{ t("login_spec.label1") }}</p>
      <div class="v_center input_box transition-color">
        <MailIcon :size="18" class="flex-shrink-0 icon" />
        <input type="text" v-model.trim="email" class="flex-1 text-sm" :placeholder="t('Email')" />
      </div>
    </div>

    <IpButton type="primary" class="btn pointer vh_center space-x-2 transition-color" @click="submit" :class="{ disabled: btnLoading }">
      <span class="ip-loading" v-if="btnLoading"></span>
      <span>{{ t("Next") }}</span>
    </IpButton>

    <p class="other_login_title text-sm">{{ t("login_spec.Or") }}</p>
    <div class="other_login between space-x-5">
      <!-- 谷歌登录 -->
      <IpButton
        type="primary_border"
        class="vh_center h-9 text-sm space-x-2 flex-1 transition-color pointer"
        @click="handlerGoogleLogin"
        :disabled="googleLoading"
        :class="{ loading: googleLoading }"
      >
        <img src="@/assets/images/login/google.png" alt="google" width="22" height="22" />
        <span>Google</span>
        <span class="ip-loading" v-if="googleLoading"></span>
      </IpButton>
      <!-- github登录 -->
      <IpButton
        type="primary_border"
        class="vh_center h-9 text-sm space-x-2 flex-1 transition-color pointer github"
        @click="handlerGithubLogin"
        :disabled="githubLoading"
        :class="{ loading: githubLoading }"
      >
        <!-- <div class="icon">
          <img src="@/assets/images/login/github.svg" alt="github" width="30" height="30" />
        </div> -->
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
          <path
            d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"
          ></path>
        </svg>
        <span>Github</span>
        <span class="ip-loading" v-if="githubLoading"></span>
      </IpButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue"
import { useRouter } from "vue-router"
import { platDataConfig } from "@/api/home"
import { GithubLogin, GoogleLogin } from "@/api/login"
import { debounce } from "@/utils/tools"
import loginStore from "@/store/login"
import settingStore from "@/store/setting"
import Message from "@/components/message/message"
import { Mail as MailIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { track_register } from "@/utils/detect"
import IpButton from "@/components/button/button.vue"
import userStore from "../../../../store/user"

const { t } = useI18n()

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(["update:modelValue", "next"])

const router = useRouter()
const { token } = loginStore()
const { lang } = settingStore()
const { getUserInfo } = userStore()

const btnLoading = ref(false)

const email = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})

function submit() {
  if (!email.value) {
    const en = lang === "en"
    Message({
      type: "warning",
      message: en ? "Please enter your email address" : "请输入您的电子邮件",
    })
    return
  }
  btnLoading.value = true
  emit("next", () => {
    btnLoading.value = false
  })
}

let getGoogleInfo
let getGithubInfo
const googleLoading = ref(false)
const githubLoading = ref(false)

// google登录
function handlerGoogleLogin() {
  // 清除上一个
  window.removeEventListener("message", getGoogleInfo)
  window.open(
    "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&state=3EAB37D9D5310BFE&redirect_uri=" +
      window.location.origin +
      "/google.html&client_id=" +
      import.meta.env.VITE_GOOGLE_CLIENT_ID,
    "Google",
    "width=500, height=600,left=700,top=150"
  )
  getGoogleInfo = debounce((event) => {
    if (event.data.from === "google") {
      if (!event.data.code || event.data.code === "error") {
        window.removeEventListener("message", getGoogleInfo)
        return
      }
      const params = {
        token: event.data.code,
      }
      googleLoading.value = true
      GoogleLogin(params)
        .then(async (res) => {
          // 存储token
          token.value = res.data.token
          localStorage.setItem("token", res.data.token)

          track_register()

          await getUserInfo()

          router.replace("/overview")
        })
        .catch((err) => {
          console.log(err)
          Message({
            type: "warning",
            message: "Login Failed,Please try again",
          })
        })
        .finally(() => {
          googleLoading.value = false
          window.removeEventListener("message", getGoogleInfo)
        })
    }
  }, 500)
  window.addEventListener("message", getGoogleInfo)
}

// github登录
function handlerGithubLogin() {
  // 清除上一个
  window.removeEventListener("message", getGithubInfo)
  window.open(
    "https://github.com/login/oauth/authorize?client_id=Ov23liEEciOEnSYrVVFm&scope=user:email&state=" +
      (/www/.test(window.location.origin) ? "has" : "no") +
      "&redirect_uri=https://www." +
      location.host.replace("www.", "") +
      "/github.html",
    "Github",
    "width=500, height=600,left=700,top=150"
  )
  getGithubInfo = debounce((event) => {
    if (event.data.from === "github") {
      console.log("githubenter")
      if (!event.data.code || event.data.code === "error") {
        console.log("githuberr")
        window.removeEventListener("message", getGithubInfo)
        return
      }
      const params = {
        token: event.data.code,
      }
      githubLoading.value = true
      GithubLogin(params)
        .then(async (res) => {
          // 存储token
          localStorage.setItem("token", res.data.token)
          token.value = res.data.token

          track_register()

          await getUserInfo()

          router.replace("/overview")
        })
        .catch((err) => {
          console.log(err)
          Message({
            type: "warning",
            message: "Login Failed,Please try again",
          })
        })
        .finally(() => {
          githubLoading.value = false
          window.removeEventListener("message", getGithubInfo)
        })
    }
  }, 500)
  window.addEventListener("message", getGithubInfo)
}

// 获取配置
async function hasRegisterAward() {
  try {
    const { data } = await platDataConfig()
    return data.register_award
  } catch (err) {
    console.log(err)
    return false
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
