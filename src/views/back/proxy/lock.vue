<template>
  <div class="w-full h-full column_center space-y-4 board rounded-md lock" style="justify-content: center">
    <img src="@/assets/images/products/lock.png" width="60" alt="" />
    <span class="text-lg primary">{{ t("proxy_spec.no_buy") }}</span>

    <!-- <div class="column_center space-y-2">
          <strong class="text-2xl">{{ t("proxy_spec.unlock_title") }}</strong>
          <p>{{ t("proxy_spec.unlock_desc") }}</p>
        </div> -->
    <ip-button type="black" @click="toBuy" class="px-5 h-9 text-sm" style="margin-top: 1.5rem">
      <div class="vh_center space-x-2">
        <ShoppingCart :size="14" />
        <span>{{ t("Buy_now") }}</span>
      </div>
    </ip-button>
  </div>
</template>

<script setup>
import IpButton from "@/components/button/button.vue"
import { ShoppingCart } from "lucide-vue-next"
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()

const router = useRouter()
const active = inject("active_tab")
function toBuy() {
  switch (active.value) {
    case 0:
      router.push("/residential")
      break
    case 1:
      router.push("/unlimited")
      break
    case 2:
      router.push("/mobile")
      break
    case 3:
      router.push("/data_center")
      break
    default:
      router.push("/residential")
      break
  }
}
</script>
