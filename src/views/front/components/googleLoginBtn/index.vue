<template>
  <div class="googleLoginBtn transition-color pointer" @click="handlerGoogleLogin" :class="{ loading: googleLoading }">
    <div class="vh_center space-x-2 h-10">
      <img src="@/assets/images/login/google.png" alt="google" width="22" height="22" />
      <span>{{ t("home_spec.google_login") }}</span>
      <span class="ip-loading" v-if="googleLoading"></span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { GoogleLogin } from "@/api/login"
import loginStore from "../../../../store/login"
import { track_register } from "@/utils/detect"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import { debounce } from "@/utils/tools"

const { t } = useI18n()
const { token } = loginStore()

const router = useRouter()

let getGoogleInfo
const googleLoading = ref(false)
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
// async function handlerGoogleLogin(access_token) {
//   try {
//     googleLoading.value = true

//     const { data } = await GoogleLogin({ token: access_token })

//     token.value = data.token
//     localStorage.setItem("token", data.token)

//     track_register()

//     router.replace("/overview")
//   } catch (err) {
//     Message({
//       type: "warning",
//       message: "Login Failed,Please try again",
//     })
//   } finally {
//     googleLoading.value = false
//   }
// }
// function judgeHasGoogleToken() {
//   function getQueryVariable(variable) {
//     const query = window.location.search.substring(1) || window.location.href
//     const vars = query.split("&")
//     for (let i = 0; i < vars.length; i++) {
//       const pair = vars[i].split("=")
//       if (pair[0] === variable) {
//         return pair[1]
//       }
//     }
//     return false
//   }
//   const code = getQueryVariable("access_token")

//   return code
// }
// function jumpGoogleLogin() {
//   if (googleLoading.value) return

//   const url =
//     "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&state=3EAB37D9D5310BFE" +
//     "&redirect_uri=" +
//     window.location.origin +
//     "/home" +
//     "&client_id=" +
//     import.meta.env.VITE_GOOGLE_CLIENT_ID

//   location.href = url
// }

onMounted(async () => {
  loadBack()
  //   const token = judgeHasGoogleToken()
  //   if (!token) return

  //   await handlerGoogleLogin(token)
})
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
