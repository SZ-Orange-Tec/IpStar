<template>
  <footer class="footer">
    <!-- serve -->
    <div class="serve box">
      <div class="container gap-4 md:gap-10 column md:flex !items-stretch flex-wrap">
        <div class="list flex-1 column md:column_center whitespace-nowrap">
          <div class="service column space-y-3 md:space-y-5">
            <p class="font-semibold">{{ t("Services") }}</p>
            <ul class="flex md:column md:space-y-2 flex-wrap text-sm font-light">
              <li class="btn">
                <a href="javascript:;" @click="goTologin">{{ t("footer_spec.Residential_Proxies") }}</a>
              </li>
              <li class="btn">
                <a href="javascript:;" @click="goTologin">{{ t("footer_spec.Proxy_IP_Locations") }}</a>
              </li>
              <li class="btn">
                <a href="javascript:;" @click="goTologin">{{ t("footer_spec.Proxy_API") }}</a>
              </li>
              <li class="btn">
                <a href="javascript:;" @click="goTologin">{{ t("footer_spec.Partner_Solutions") }}</a>
              </li>
              <li class="btn">
                <a href="javascript:;" @click="goTologin">{{ t("footer_spec.Custom_Solutions") }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="line"></div>

        <div class="list flex-1 between !items-stretch space-x-10 whitespace-nowrap">
          <div class="column space-y-3 md:space-y-5">
            <p class="font-semibold">{{ t("Help_center") }}</p>
            <ul class="column space-y-2 text-sm font-light">
              <li>
                <a href="javascript:;" @click="toDocument('FAQ')">{{ t("FAQ") }}</a>
              </li>
              <li>
                <a href="javascript:;" @click="toDocument('Getting')">{{ t("Getting_Start") }}</a>
              </li>
              <li>
                <a href="javascript:;" @click="jump('/generate_api')">{{ t("API_Reference") }}</a>
              </li>
              <li>
                <a href="javascript:;" @click="jump('/generate_api')">{{ t("Examples") }}</a>
              </li>
            </ul>
          </div>
          <div class="column space-y-3 md:space-y-5">
            <p class="font-semibold">{{ t("Legal") }}</p>
            <ul class="column space-y-2 text-sm font-light">
              <li>
                <a href="/terms.html">{{ t("Terms_Conditions") }}</a>
              </li>
              <li>
                <a href="/privacy.html">{{ t("Privacy_Policy") }}</a>
              </li>
              <li>
                <a href="javascript:;" @click="$router.push('/commitment')">{{ t("footer_spec.privicy") }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="line"></div>

        <div class="list flex-1 column space-y-5">
          <div class="space-y-3">
            <p class="font-semibold">{{ t("Connect_with_us") }}</p>
            <div class="column space-y-2">
              <div class="v_center copy_btn">
                <div class="px-2 whitespace-nowrap">Email: support@ipstar.io</div>
                <IpButton type="major" icon class="px-2 h-8 text-sm" @click="copyEmail"> <Copy :size="16" /> </IpButton>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="font-semibold">{{ t("footer_spec.Legal") }}</p>
            <p class="text-sm opacity-90 font-light">
              {{ t("footer_spec.tips") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full vh_center text-sm copyright">
      <p>{{ t("footer_spec.copyright") }}</p>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router"
import loginStore from "@/store/login"
import { Sparkles } from "lucide-vue-next"
import Message from "@/components/message/message"
import IpButton from "@/components/button/button.vue"
import { Copy, Twitter } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import settingsStore from "@/store/setting"
import HomeTitle from "../homeTitle.vue"
import { useI18n } from "vue-i18n"
const { isLogin } = loginStore()

const router = useRouter()
const { t } = useI18n()

const { documentIdx, isDocument, en } = settingsStore()

// 未登录去登录
function goTologin(key) {
  if (!isLogin.value) {
    router.push("/login")
    Message({
      message: "Please log in your account",
      type: "warning",
    })
    return
  }
  switch (key) {
    case 1:
      router.push("/doc")
      // store.commit("setDocumentIdx", "0-2")
      documentIdx.value = "0-2"
      break

    case 2:
      router.push("/doc")
      // store.commit("setDocumentIdx", "1-3-0")
      documentIdx.value = "1-3-0"
      break

    default:
      router.push("/overview")
      break
  }
}

// 跳转观看新手文档
function toDocument(val) {
  // store.commit("setDocumentIdx", val)
  if (!isLogin.value) {
    router.push("/login")
    Message({
      type: "warning",
      message: en.value ? "Please login first" : "请先登录",
    })
    return
  }
  const doc = ["Getting", "Help", "FAQ"]
  const index = doc.findIndex((i) => i === val)
  isDocument.value = val
  documentIdx.value = `${index}-0`

  router.push("/doc")
}
function jump(path) {
  if (!isLogin.value) {
    router.push("/login")
    return
  }
  router.push(path)
}

function toTwitter() {
  // 推特聊天
  window.open("https://twitter.com/Ipflare913")
}

// // srisp 即时聊天
// function scisp_chat() {
//   window.$crisp.push(["do", "chat:open"])
// }

// // 访问 facebook
// function facebook() {
//   window.open("https://www.facebook.com/profile.php?id=100087652609159")
// }

// // what
// function whatsapp() {
//   window.open("https://web.whatsapp.com/send?phone=85253457877")
// }

// 邮箱跳转
function gotoEmail() {
  window.open("mailto:support@ipstar.io")
}

// 复制邮箱
function copyEmail() {
  navigator.clipboard.writeText("support@ipstar.io")
  Message({
    message: en.value ? "Email copied" : "邮箱已复制",
    type: "success",
  })
}
</script>

<style lang="less" scoped>
@import url("./footer.less");
</style>
