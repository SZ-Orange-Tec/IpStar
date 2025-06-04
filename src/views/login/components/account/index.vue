<template>
  <div class="login_account space-y-5">
    <div class="form space-y-2">
      <p class="text-sm">{{ t("login_spec.label1") }}</p>
      <div class="v_center input_box transition-color">
        <MailIcon :size="18" class="flex-shrink-0 icon" />
        <input type="text" v-model="email" class="flex-1 text-sm" :placeholder="t('Email')" />
      </div>
    </div>

    <div class="btn pointer vh_center space-x-2 transition-color" @click="submit" :class="{ disabled: btnLoading }">Next</div>

    <p class="other_login_title text-sm">{{ t("login_spec.Or") }}</p>
    <div class="other_login between space-x-5">
      <!-- 谷歌登录 -->
      <div class="vh_center space-x-2 flex-1 transition-color pointer" @click="handlerGoogleLogin" :class="{ loading: googleLoading }">
        <img src="@/assets/images/login/google.png" alt="google" width="22" height="22" />
        <span>Google</span>
        <span class="ip-loading" v-if="googleLoading"></span>
      </div>
      <!-- github登录 -->
      <div class="vh_center space-x-2 flex-1 transition-color pointer" @click="handlerGithubLogin" :class="{ loading: githubLoading }">
        <img src="@/assets/images/login/github.png" alt="github" width="28" height="28" />
        <span>Github</span>
        <span class="ip-loading" v-if="githubLoading"></span>
      </div>
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
import userStore from "@/store/user"
import layoutStore from "@/store/layout"
import Message from "@/components/message/message"
import { Mail as MailIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(["update:modelValue", "next"])

const router = useRouter()
const { token } = loginStore()
const { lang } = settingStore()
const { getUserInfo } = userStore()
const { registerAward } = layoutStore()

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
      "/google.html&client_id=93460351239-lpknvoier4sf0r2larho3l8n87po6o48.apps.googleusercontent.com",
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
          // 获取用户信息
          await getUserInfo()
          // 是否有注册奖励
          const has = await hasRegisterAward()
          registerAward.value = has
          router.push("/layout")
        })
        .catch((err) => {
          console.log(err)
          Message.error("Login Failed,Please try again")
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
    "https://github.com/login/oauth/authorize?client_id=5800f6ede67189ccd659&scope=user:email&state=" +
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
          store.commit("setToken", res.data.token)
          // 获取用户信息
          await store.dispatch("getUserInfo")
          // 是否有注册奖励
          const has = await hasRegisterAward()
          store.commit("layout/updateState", {
            key: "registerAward",
            value: has,
          })
          router.push("/layout")
        })
        .catch((err) => {
          console.log(err)
          Message.error("Login Failed,Please try again")
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
