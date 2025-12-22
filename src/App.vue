<template>
  <div class="relative">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { track_active } from "@/utils/detect"
import { useRoute } from "vue-router"
import { useHead, useSeoMeta } from "unhead"
import { useI18n } from "vue-i18n"
import { isPrerendering } from "./utils/tools"

const route = useRoute()

const { t, locale } = useI18n()
const lang = locale.value === "en" ? "en-US" : "zh-CN"
const entry = locale.value === "en" ? "https://ipstar.io/home" : "https://ipstar.io/zh/home"
useHead(window.__UNHEAD__, {
  htmlAttrs: { lang },
  link: [
    { rel: "canonical", href: entry },
    { rel: "icon", href: "/icon/favicon.ico", sizes: "any" },
    { rel: "icon", href: "/icon/favicon.svg", sizes: "any", type: "image/svg+xml" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/icon/apple-touch-icon.png" },
  ],
  title: t("site.title"),
  meta: [
    { name: "description", content: t("site.description") },
    { name: "keywords", content: t("site.keywords") },
    // { name: "theme-color", content: "#0000FF" },
    // { name: "color-scheme", content: "light dark" },
  ],
  ogType: "website",
  ogUrl: entry,
  ogLocale: lang,
  ogSiteName: "IpStar",

  // 社交分享SEO
  ogTitle: t("site.title"),
  ogDescription: t("site.description"),
  twitterTitle: t("site.title"),
  twitterDescription: t("site.description"),
  // no longer explicitly used by X but may be useful for SEO
  twitterSite: "@example",
  twitterCreator: "@example",
  // og image
  ogImage: {
    url: "/icon/web-app-manifest-192x192.png",
    width: 192,
    height: 192,
    alt: "Ipstar.io",
    type: "image/png",
  },
  twitterImage: {
    url: "/icon/web-app-manifest-192x192.png",
    width: 192,
    height: 192,
    alt: "Ipstar.io",
    type: "image/png",
  },
  twitterCard: "summary", // or summary
})

// function captureError(e){
//   console.log('enter')
//   console.log('error',e)
// }
// onMounted(()=>{
//   console.log('mounted')
//   window.addEventListener('error',captureError)
//   window.addEventListener('unhandledrejection', captureError);
// })

// 聊天助手
function initCrisp() {
  window.CRISP_RUNTIME_CONFIG = {
    locale: localStorage.getItem("lang"),
  }
  window.$crisp = []
  // // 测试
  // window.CRISP_WEBSITE_ID = "16e899c6-af05-4ef0-96ec-55f69cee3d9f"
  // 线上
  window.CRISP_WEBSITE_ID = "5f7424dc-8221-4aaa-841e-0f255962b76e"
  ;(function () {
    const d = document
    const s = d.createElement("script")
    s.id = "crisp"
    s.src = "https://client.crisp.chat/l.js"
    s.async = 1
    d.getElementsByTagName("head")[0].appendChild(s)
  })()
  // 更换颜色
}

// google 追踪代码
function initGoogleTrack(count = 2) {
  const script = document.createElement("script")
  script.id = "google"
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-17264345186"
  document.body.append(script)

  script.onload = function () {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag("js", new Date())
    gtag("config", "AW-17264345186")

    // 网页加载完成 浏览
    track_active()
  }

  script.onerror = function () {
    if (count > 0) {
      initGoogleTrack(--count)
    }
  }
}
// google 追踪代码
function initGoogleTrack2(count = 2) {
  const script = document.createElement("script")
  script.id = "google2"
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-20D3CNNJ9R"
  document.body.append(script)

  script.onload = function () {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag("js", new Date())
    gtag("config", "G-20D3CNNJ9R")
  }

  script.onerror = function () {
    if (count > 0) {
      initGoogleTrack2(--count)
    }
  }
}

onMounted(() => {
  // 等待所有资源加载完成
  window.addEventListener("load", () => {
    if (!isPrerendering()) {
      initGoogleTrack()
      initGoogleTrack2()
      initCrisp()
    }
  })
})
</script>

<style scoped>
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0.6;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
