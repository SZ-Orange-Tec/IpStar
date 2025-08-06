<template>
  <div class="api h-full column">
    <NavBar>
      <template #default>
        <div class="place column" style="align-items: stretch">
          <!-- 文字 -->
          <div class="text v_center space-x-5" ref="textRef">
            <div @click="select(0)" class="pointer transition-colors" :class="{ active: active === 0 }">
              <span class="hidden sm:inline">API</span>
              {{ t("Construction") }}
            </div>
            <!-- <span @click="active = 1" class="pointer" :class="{ active: active === 1 }">
              <span class="hidden sm:inline">API</span>
              {{ t("Reference") }}
            </span> -->
            <div @click="select(1)" class="pointer transition-colors" :class="{ active: active === 1 }">
              {{ t("api_spec.combo") }}
            </div>
          </div>
          <!-- 滑块 -->
          <div class="slider rounded-full relative">
            <div class="bar rounded-full absolute" :style="barStyle"></div>
          </div>
        </div>
      </template>
    </NavBar>

    <div class="flex-1 w-full main column px-3 md:px-5" :class="{ 'flex-1': active === 1 }">
      <ApiConfig v-show="active === 0"></ApiConfig>

      <!-- <DocsHelp v-show="active === 1"></DocsHelp> -->
      <UserPwd v-show="active === 1"></UserPwd>
    </div>
  </div>
</template>

<script setup>
import ApiConfig from "./api_config/api_config.vue"
// import DocsHelp from "./docs_help/docs_help.vue"
import UserPwd from "./user_pwd/user_pwd.vue"
// import IpButton from "@/components/button/button.vue"
import NavBar from "../components/navbar/navbar.vue"
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const active = ref(0) // 0: 构造文档 2:账密组合

const barStyle = ref({ width: 0, left: 0 })
const textRef = ref(null)

function select(index) {
  active.value = index

  const parentLeft = textRef.value.getBoundingClientRect().left
  const sonLeft = textRef.value.children[index].getBoundingClientRect().left
  const offsetleft = sonLeft - parentLeft

  const width = textRef.value.children[index].clientWidth

  barStyle.value = {
    width: `${width}px`,
    left: `${offsetleft}px`,
  }
}

onMounted(() => {
  select(0)
})
</script>

<style lang="less" scoped>
@import url("./api.less");
</style>
