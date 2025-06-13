<template>
  <div class="relative">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

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
  window.CRISP_WEBSITE_ID = "49fbe609-c4f4-409a-9b94-2a7410735fb2"
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

// 路由重定向
// const route = useRoute()
// const router = useRouter()
// if (!route.path || route.path === "/") {
//   router.replace("/home")
// }

onMounted(() => {
  initCrisp()
})
</script>

<style scoped></style>
