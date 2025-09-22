<template>
  <div class="w-full not_found" :style="{ height: height }">
    <div class="container column_center space-y-5">
      <div class="animation column_center">
        <h1>404</h1>
        <TriangleAlert :size="80" />
      </div>
      <h2>{{ t("notfound_spec.tip") }}</h2>
      <p>{{ t("notfound_spec.des") }}</p>
      <IpButton type="primary" class="h-10 px-4 text-sm" @click="toHome">{{ t("notfound_spec.btn") }}</IpButton>
    </div>
  </div>
</template>

<script setup>
import { TriangleAlert } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const height = window.innerHeight + "px"

const { t } = useI18n()

const router = useRouter()
function toHome() {
  router.replace("/home")
}
</script>

<style lang="less" scoped>
.not_found {
  background-color: hsl(var(--background));
  .container {
    width: 100;
    max-width: 1200px;
    margin: 0 auto;
    h1 {
      font-size: 5rem;
      font-weight: 600;
      color: hsl(var(--foreground) / 50%);
    }
    h2 {
      font-weight: 300;
    }
    p {
      margin-bottom: 2rem;
      white-space: pre-wrap;
      text-align: center;
    }
    .animation {
      margin-top: 10vh;
      animation: float 3s ease-in-out infinite;
      color: hsl(var(--foreground) / 50%);
    }
    @keyframes float {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  }
}
</style>
