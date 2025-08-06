<template>
  <div class="relative">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { track_active } from "@/utils/detect"

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
  // 测试
  window.CRISP_WEBSITE_ID = "16e899c6-af05-4ef0-96ec-55f69cee3d9f"
  // // 线上
  // window.CRISP_WEBSITE_ID = "5f7424dc-8221-4aaa-841e-0f255962b76e"
  ;(function () {
    const d = document
    const s = d.createElement("script")
    s.src = "https://client.crisp.chat/l.js"
    s.async = 1
    d.getElementsByTagName("head")[0].appendChild(s)
  })()
  // 更换颜色
  window.$crisp.push(["config", "color:theme", ["orange"]])
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

onMounted(() => {
  // 等待所有资源加载完成
  window.addEventListener("load", () => {
    initGoogleTrack()
    initCrisp()
  })
})
</script>

<style scoped></style>
