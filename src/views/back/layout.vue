<template>
  <div class="pc-layout">
    <!-- 侧边栏  -->
    <div class="sidebar hidden lg:column h-full">
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
      <div class="mask_content column_center space-y-7">
        <img src="../../assets/pc_img/layout_img/Gift bag.webp" alt="Gift bag" />
        <h2 class="text-lg md:text-xl">{{ t("navbar_spec.gift") }}</h2>
        <div class="w-full">
          <p :class="lang" class="text-base">{{ t("navbar_spec.expire") }}</p>
        </div>
        <div class="w-full space-y-5 text-sm">
          <IpButton type="primary" class="w-full h-10" @click="isMask = false">
            {{ t("navbar_spec.start_use") }}
          </IpButton>
          <IpButton type="border" class="w-full h-10 primary-btn transition-colors" @click="toTutorial">
            {{ t("navbar_spec.view_tutorial") }}
          </IpButton>
          <!-- <p @click="closeMask">{{ t("navbar_spec.get") }}</p> -->
        </div>
      </div>
    </IpDialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
// import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import NavMenu from "./components/menu/menu.vue"
import { useI18n } from "vue-i18n"
import { differenceInMinutes } from "date-fns"
import { platDataConfig } from "@/api/home"
import IpDialog from "@/components/dialog/index.vue"
import IpButton from "@/components/button/button.vue"

const { getUserInfo } = userStore()

const { t } = useI18n()

// 赠送流量弹窗相关
const isMask = ref(false)
async function judgeMask() {
  try {
    const { create_time } = await getUserInfo()

    const { data } = await platDataConfig()
    const hasAward = data.register_award

    const isNew = isNewUser(create_time)
    const newUserMask = sessionStorage.getItem("newUserMask")

    if (isNew && !newUserMask && hasAward) {
      isMask.value = true
      sessionStorage.setItem("newUserMask", 1)
    }
  } catch (err) {
    console.log(err.message)
  }
}
function isNewUser(create_time) {
  const date = new Date(create_time)
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())

  return differenceInMinutes(new Date(), new Date(utc)) < 3
}

// 跳转教程
function toTutorial() {
  // detect.gift()
  isMask.value = false

  window.open(location.origin + "/doc")
}

// 生命周期钩子
onMounted(() => {
  // judgeMask()
})
</script>

<style lang="less" scoped>
@import url("./layout.less");
</style>

<style>
.board {
  background: hsl(var(--background));
  /* border: 1px solid ; */
  /* box-shadow: 0px 5px 16px 0px rgba(187, 187, 187, 0.57), 0px 0px 16px 0px #ffffff, 4px 4px 5px 0px rgba(255, 255, 255, 0.42); */
}
</style>
