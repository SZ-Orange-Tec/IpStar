<template>
  <div class="pc-layout">
    <!-- 侧边栏  -->
    <div class="sidebar relative hidden md:column h-full shrink-0">
      <!-- logo -->
      <NavMenu />
    </div>
    <!-- right -->
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
    </div>

    <!-- 遮罩层 -->
    <!-- <div class="mask" v-if="isMask"> -->

    <IpDialog v-model="isMask" class="mask">
      <div class="mask_content space-y-5">
        <header class="text-3xl font-semibold">{{ t("mask_spec.title") }} <span class="success">IpStar!</span></header>
        <p class="des">
          {{ t("mask_spec.desc") }}
          <i18n-t tag="span" keypath="mask_spec.desc2" scope="global" v-if="gift !== 0">
            <template #traffic>
              <span class="primary font-semibold">{{ giftText }}</span>
            </template>
          </i18n-t>
        </p>
        <ul class="advant grid grid-cols-3 gap-4 rounded-lg">
          <li class="column_center space-y-2">
            <div class="icon_box vh_center">
              <img src="@/assets/images/overview/buy.png" alt="" />
            </div>
            <div class="text-center font-medium">{{ t("mask_spec.adv1") }}</div>
          </li>
          <li class="column_center space-y-2">
            <div class="icon_box vh_center">
              <img src="@/assets/images/overview/kpi.png" alt="" />
            </div>
            <div class="text-center font-medium">{{ t("mask_spec.adv2") }}</div>
          </li>
          <li class="column_center space-y-2">
            <div class="icon_box vh_center">
              <img src="@/assets/images/overview/proxy.png" alt="" />
            </div>
            <div class="text-center font-medium">{{ t("mask_spec.adv3") }}</div>
          </li>
        </ul>
        <div class="btn_box flex gap-5 text-sm">
          <IpButton type="primary_border" class="vh_center h-10" @click="isMask = false"> {{ t("mask_spec.cancel") }} </IpButton>
          <IpButton type="primary" class="vh_center h-10" @click="openContact"> {{ t("mask_spec.confirm") }} </IpButton>
        </div>

        <div class="close vh_center pointer transition-color" @click="isMask = false">
          <CloseIcon :size="16" />
        </div>
        <img loading="lazy" width="220" src="@/assets/images/overview/gift2.webp" class="hot" />
      </div>
    </IpDialog>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref } from "vue"
// import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import NavMenu from "./components/menu/menu.vue"
import { useI18n } from "vue-i18n"
import { differenceInMinutes } from "date-fns"
import IpDialog from "@/components/dialog/index.vue"
import IpButton from "@/components/button/button.vue"
import useWidthTag from "../../composables/useWidthTag"
import { X as CloseIcon } from "lucide-vue-next"
import layoutStore from "../../store/layout"
import { formatSizeUnits } from "../../utils/tools"
import Menu from "./components/menu/menu.vue"

const { getUserInfo } = userStore()
const { gift, getConfig } = layoutStore()
const giftText = computed(() => formatSizeUnits(gift.value))

const { t } = useI18n()

const { tag: widthTag } = useWidthTag()
const layout = computed(() => (widthTag.value === "xs" ? "total, prev, pager, next" : "total, prev, pager, next, sizes, jumper"))
provide("paginationLayout", layout)

// 赠送流量弹窗相关
const isMask = ref(false)
async function judgeMask() {
  try {
    const { create_time, pack_remain, username } = await getUserInfo()

    const data = await getConfig()
    const hasAward = data.register_award

    const isNew = isNewUser(create_time)
    const newUserMask = sessionStorage.getItem("newUserMask") === username

    if (isNew && !newUserMask && hasAward) {
      if (!gift.value) {
        gift.value = pack_remain * 1024
      }
      isMask.value = true
      sessionStorage.setItem("newUserMask", username)
    }
  } catch (err) {
    console.log(err.message)
  }
}
function isNewUser(create_time) {
  const date = new Date(create_time)
  // const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())

  return differenceInMinutes(new Date(), date) < 3
}
function openContact() {
  isMask.value = false
  window.$crisp.push(["do", "chat:open"])
}

// 跳转教程
function toTutorial() {
  // detect.gift()
  isMask.value = false

  window.open(location.origin + "/doc")
}

// 预加载后台
async function loadBack() {
  await import(/*webpackChunkName:'proxy'*/ "@/views/back/proxy/proxy.vue")
  await import(/*webpackChunkName:'purchase'*/ "@/views/back/purchase/purchase.vue")
  await import(/*webpackChunkName:'residential'*/ "@/views/back/residential/residential.vue")
  await import(/*webpackChunkName:'unlimited'*/ "@/views/back/unlimited/unlimited.vue")
  await import(/*webpackChunkName:'mobile'*/ "@/views/back/mobile/mobile.vue")
  await import(/*webpackChunkName:'data_center'*/ "@/views/back/data_center/data_center.vue")
  await import(/*webpackChunkName:'settings'*/ "@/views/back/settings/settings.vue")
  await import(/*webpackChunkName:'whitelist'*/ "@/views/back/whitelist/whitelist.vue")
  await import(/*webpackChunkName:'account'*/ "@/views/back/account/index.vue")
}

// 生命周期钩子
onMounted(() => {
  judgeMask()
  // !username.value && getUserInfo()
})
</script>

<style lang="less" scoped>
@import url("./layout.less");
</style>

<style lang="less">
.sidebar {
  width: 260px;
  @media screen and (max-width: 1536px) {
    width: 66px;
  }
}
.board {
  background: hsl(var(--background));
  /* border: 1px solid ; */
  /* box-shadow: 0px 5px 16px 0px rgba(187, 187, 187, 0.57), 0px 0px 16px 0px #ffffff, 4px 4px 5px 0px rgba(255, 255, 255, 0.42); */
}
</style>
