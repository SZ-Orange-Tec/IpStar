<template>
  <div class="right_side h-full column space-y-5">
    <!-- <div class="w-full price board column_center px-4 py-5 rounded-md space-y-3">
      <div class="v_center space-x-2">
        <img src="@/assets/images/products/house.webp" width="30" height="30" alt="" />
        <strong>{{ $t("overview_spec.guide_title") }}</strong>
      </div>
      <p class="text-sm text-center">{{ $t("overview_spec.guide_des") }}</p>

      <div class="text-sm v_center space-x-2">
        <div class="v_center space-x-1">
          <span class="grey-60">{{ $t("overview_spec.lowest") }}</span>
          <strong>${{ lowestPrice / 100 }}/GB</strong>
        </div>
        <span class="tag text-xs font-medium px-2 rounded-full v_center">{{ $t("Never_Expires") }}</span>
      </div>

      <ip-button type="primary" @click="router.push('/products?buy=1')" class="h-9 w-full text-sm" style="max-width: 400px">
        <div class="vh_center space-x-2">
          <ShoppingCart :size="14" />
          <span>{{ $t("Buy_now") }}</span>
        </div>
      </ip-button>
    </div> -->

    <div class="resource board ounded-md w-full">
      <div class="header v_center space-x-2 px-5">
        <Book :size="14" class="primary" />
        <strong class="font-semibold">{{ $t("Resources") }}</strong>
      </div>
      <div class="px-3 pb-5">
        <p class="text-sm h-10 v_center px-2">{{ $t("overview_spec.guide_learn") }}</p>
        <ul class="text-[15px]">
          <!-- <li class="between h-10 px-2 rounded-md pointer" @click="isDashboard = true">
            <div class="v_center space-x-2">
              <FileText :size="18" />
              <span>{{ $t("Statistics") }}</span>
            </div>
            <ChevronRight :size="14" />
          </li> -->
          <li class="between h-10 px-2 rounded-md pointer" @click="router.push('/doc')">
            <div class="v_center space-x-2">
              <ShieldUser :size="18" />
              <span>{{ $t("User_Guide") }}</span>
            </div>
            <ChevronRight :size="14" />
          </li>
          <li class="between h-10 px-2 rounded-md pointer" @click="router.push('/help')">
            <div class="v_center space-x-2">
              <MessageCircleQuestion :size="18" />
              <span>{{ $t("FAQ") }}</span>
            </div>
            <ChevronRight :size="14" />
          </li>
        </ul>
      </div>
    </div>

    <div class="w-full service column_center board rounded-md py-5 px-5 space-y-4 text-sm">
      <img src="@/assets/images/overview/chatPop.svg" width="30" alt="" />
      <p class="text-center font-medium">{{ $t("overview_spec.service_des") }}</p>
      <p class="font-normal">{{ $t("Email") }}：support@ipstar.io</p>

      <div class="v_center w-full or space-x-3 grey-40">{{ $t("Or") }}</div>

      <ip-button @click="openService" type="border" class="h-9 w-full text-sm">{{ $t("overview_spec.contact") }}</ip-button>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight, Book, FileText, ShieldUser, MessageCircleQuestion, ShoppingCart } from "lucide-vue-next"
import layoutStore from "@/store/layout"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import IpButton from "@/components/button/button.vue"

const { t } = useI18n()
const router = useRouter()

const { lowestPrice, getLowestPrice } = layoutStore()
if (!lowestPrice.value) {
  getLowestPrice()
}

function openService() {
  window.$crisp.push(["do", "chat:show"])
  window.$crisp.push(["do", "chat:open"])
}
</script>

<style lang="less" scoped>
.right_side {
  .price {
    .tag {
      height: 24px;
      background-color: #ffec9f;
      color: #7a4b03;
    }
  }
  .resource {
    & > .header {
      height: 50px;
      border-bottom: 1px solid #f3f4f9;
    }
    ul {
      li {
        &:hover {
          background-color: hsl(var(--primary) / 5%);
        }
      }
    }
  }

  .service {
    .or {
      &::before,
      &::after {
        content: "";
        display: block;
        flex: 1;
        height: 1px;
        background-color: #f3f4f9;
      }
    }
  }
}
</style>
