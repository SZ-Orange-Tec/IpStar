<template>
  <div class="navbar w-full between h-10">
    <div class="left v_center font-bold">
      <slot :title="name"></slot>
    </div>

    <div class="v_center space-x-3">
      <IpButton type="ghost" class="btn px-2 h-8 text-sm" v-if="isProduc">
        <div class="v_center space-x-2 pointer" @click="toPay('list')">
          <ClipboardList :size="16" />
          <p>{{ t("My_product_list") }}</p>
        </div>
      </IpButton>

      <IpButton type="ghost" class="btn px-2 h-8 text-sm" v-else>
        <div class="v_center space-x-2 pointer" @click="toPay('buy')">
          <ShoppingCart :size="18" />
          <p>{{ t("Order_new") }}</p>
        </div>
      </IpButton>

      <IpButton type="ghost" class="btn px-2 h-8 text-sm" @click="toDocument">
        <div class="v_center space-x-1 pointer">
          <FileQuestion :size="18" />
          <p>{{ t("User_manual") }}</p>
        </div>
      </IpButton>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCart, ClipboardList, FileQuestion } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"

const router = useRouter()
const route = useRoute()
const { isProduc } = layoutStore()

const { t } = useI18n()

const pathMap = {
  "/overview": t("menu_spec.Overview"),
  "/products": t("menu_spec.Products"),
  "/billings": t("menu_spec.Billings"),
  "/proxy": t("menu_spec.Proxy"),
  "/api": t("menu_spec.API"),
  "/settings": t("menu_spec.Settings"),
}
const name = computed(() => pathMap[route.path] ?? "")

function toPay(key) {
  isProduc.value = key !== "list"
  if (route.path !== "/products") {
    router.push("/products")
  }
}
function toDocument() {
  router.push("/doc")
}
</script>

<style scoped lang="less">
@import "./navbar.less";
</style>
