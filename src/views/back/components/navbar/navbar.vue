<template>
  <div class="navbar w-full between h-10 px-3 md:px-5">
    <div class="left v_center space-x-2">
      <div class="v_center font-bold">
        <slot :title="name"></slot>
      </div>

      <DropDown placement="bottom" class="block lg:hidden">
        <template #label="{ open }">
          <IpButton :class="{ open: open }" type="ghost" class="menu_btn">
            <Menu :size="20" />
          </IpButton>
        </template>
        <template #menu>
          <ul class="menu p-2 text-sm whitespace-nowrap">
            <li @click="jumpPath('/home')" class="menu_item px-2 rounded-md pointer transition-color v_center space-x-2">
              <House :size="16" />
              <p>{{ t("Home") }}</p>
            </li>
            <li class="menu-split"></li>
            <li
              v-for="item in menuData"
              :key="item.name"
              @click="jumpPath(item.path)"
              :class="{ active: path === item.path }"
              class="menu_item px-2 rounded-md pointer transition-color v_center space-x-2"
            >
              <component :is="item.icon" :size="16"></component>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </template>
      </DropDown>
    </div>

    <div class="v_center space-x-3">
      <IpButton type="ghost" class="btn px-2 h-8 text-sm" v-if="isProduc">
        <div class="v_center space-x-2 pointer" @click="toPay('list')">
          <ClipboardList :size="16" />
          <p class="hidden sm:block">{{ t("My_product_list") }}</p>
        </div>
      </IpButton>

      <IpButton type="ghost" class="btn px-2 h-8 text-sm" v-else>
        <div class="v_center space-x-2 pointer" @click="toPay('buy')">
          <ShoppingCart :size="18" />
          <p class="hidden sm:block">{{ t("Order_new") }}</p>
        </div>
      </IpButton>

      <IpButton type="ghost" class="btn px-2 h-8 text-sm" @click="toDocument">
        <div class="v_center space-x-1 pointer">
          <FileQuestion :size="18" />
          <p class="hidden sm:block">{{ t("User_manual") }}</p>
        </div>
      </IpButton>
    </div>
  </div>
</template>

<script setup>
import { ClipboardList, FileQuestion, House, Menu, Settings, ShoppingCart, ChartLine, PrinterCheck, LaptopMinimalCheck } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import DropDown from "@/components/dropdown/dropdown.vue"

const router = useRouter()
const route = useRoute()
const { isProduc } = layoutStore()

const { t } = useI18n()

const pathMap = {
  "/overview": t("menu_spec.Overview"),
  "/products": t("menu_spec.Products"),
  "/billings": t("menu_spec.Billings"),
  "/proxy": t("menu_spec.Proxy"),
  "/generate_api": t("menu_spec.API"),
  "/settings": t("menu_spec.Settings"),
}
const name = computed(() => pathMap[route.path] ?? "")

const path = computed(() => route.path)
const menuData = [
  {
    icon: ChartLine,
    name: t("menu_spec.Overview"),
    path: "/overview",
  },
  {
    icon: ShoppingCart,
    name: t("menu_spec.Products"),
    path: "/products",
  },
  {
    icon: ClipboardList,
    name: t("menu_spec.Billings"),
    path: "/billings",
  },
  {
    icon: PrinterCheck,
    name: t("menu_spec.Proxy"),
    path: "/proxy",
  },
  {
    icon: LaptopMinimalCheck,
    name: t("menu_spec.API"),
    path: "/generate_api",
  },
  {
    icon: Settings,
    name: t("menu_spec.Settings"),
    path: "/settings",
  },
]
function jumpPath(path) {
  if (path === "/products") {
    isProduc.value = false
  }
  router.push(path)
}

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
