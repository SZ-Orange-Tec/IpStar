<template>
  <div class="pc-layout">
    <!-- 侧边栏  -->
    <div class="sidebar column h-full">
      <!-- logo -->
      <NavMenu />
    </div>
    <!-- right -->
    <div class="main px-5">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" v-if="isMask !== 'false' && registerAward">
      <div class="mask_content">
        <img src="../../assets/pc_img/layout_img/Gift bag.webp" alt="Gift bag" />
        <h2>{{ t("navbar_spec.gift") }}</h2>
        <p :class="lang">{{ t("navbar_spec.expire") }}</p>
        <div class="btn_sum">
          <!-- @click="maskFn" -->
          <!-- <el-button @click="maskFn(1)">{{ t("PCLayout.gift[2]") }}</el-button> -->
          <p @click="maskFn(0)">{{ t("navbar_spec.get") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import detect from "@/utils/detect"
import settingsStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import NavMenu from "./components/menu/menu.vue"
import { useI18n } from "vue-i18n"

const { getUserInfo } = userStore()
const { isMask, registerAward } = layoutStore()
const { isDocument, documentIdx } = settingsStore()
const router = useRouter()

const { t } = useI18n()

function maskFn(bol) {
  detect.gift()
  isMask.value = false
  if (!bol) {
    isDocument.value = "Help"
    documentIdx.value = "1-0"
    router.push("/doc")
  }
}

// 生命周期钩子
onMounted(() => {
  getUserInfo()
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
