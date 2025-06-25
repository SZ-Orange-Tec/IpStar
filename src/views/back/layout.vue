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
    <div class="mask" v-if="isMask">
      <div class="mask_content">
        <img src="../../assets/pc_img/layout_img/Gift bag.webp" alt="Gift bag" />
        <h2 class="text-lg md:text-2xl">{{ t("navbar_spec.gift") }}</h2>
        <p :class="lang" class="text-base">{{ t("navbar_spec.expire") }}</p>
        <div class="btn_sum text-xl">
          <!-- @click="maskFn" -->
          <!-- <el-button @click="maskFn(1)">{{ t("PCLayout.gift[2]") }}</el-button> -->
          <p @click="closeMask">{{ t("navbar_spec.get") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import detect from "@/utils/detect"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import NavMenu from "./components/menu/menu.vue"
import { useI18n } from "vue-i18n"
import { differenceInMinutes } from "date-fns"
import { platDataConfig } from "@/api/home"

const { getUserInfo } = userStore()

const { t } = useI18n()

// 赠送流量弹窗相关
const isMask = ref(false)
async function judgeMask() {
  try {
    const { create_time } = await getUserInfo()

    const { data } = await platDataConfig()
    const hasAward = data.register_award

    if (isNewUser(create_time) && hasAward) {
      isMask.value = true
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
function closeMask() {
  detect.gift()
  isMask.value = false
}

// 生命周期钩子
onMounted(() => {
  judgeMask()
})
</script>

<style lang="less" scoped>
@import url("./layout.less");
// .fade-enter{
//   opacity: 0;
//   transform: translateY(-10px);
// }
// .fade-enter-to{
//   opacity: .5;
//   transition: all .4s linear;
// }
// .fade-leave{
//   opacity: .5;
// }
// .fade-leave-to{
//   opacity: 0;
//   transition: all .1s linear;
//   transform: translateY(10px);
// }
</style>
