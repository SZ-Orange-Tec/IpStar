<template>
  <div class="relative">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue"

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
  window.CRISP_WEBSITE_ID = "5f7424dc-8221-4aaa-841e-0f255962b76e"
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

onMounted(() => {
  initCrisp()
})
</script>

<style scoped></style>
