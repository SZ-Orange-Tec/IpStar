<template>
  <div class="pc-overview column">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="main w-full flex flex-1 p-5 gap-5">
      <div class="flex-1">
        <ul class="tab board px-2 py-5 rounded flex" @click="selectActive">
          <li :class="{ focus: active === 0 }" class="pointer flex-1 column p-5 rounded-md" data-active="0">
            <strong class="font-medium text-sm">{{ t("menu_spec.residential_proxy") }}</strong>
            <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
          </li>
          <li :class="{ focus: active === 1 }" class="pointer flex-1 column p-5 rounded-md" data-active="1">
            <strong class="font-medium text-sm">{{ t("menu_spec.unlimited_proxy") }}</strong>
            <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
          </li>
          <li :class="{ focus: active === 2 }" class="pointer flex-1 column p-5 rounded-md" data-active="2">
            <strong class="font-medium text-sm">{{ t("menu_spec.phone_proxy") }}</strong>
            <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
          </li>
          <li :class="{ focus: active === 3 }" class="pointer flex-1 column p-5 rounded-md" data-active="3">
            <strong class="font-medium text-sm">{{ t("menu_spec.data_proxy") }}</strong>
            <span class="grey-80 text-xs">{{ $t("overview_spec.starting_from") }} $0.35/GB </span>
          </li>
          <li class="focus" :style="focusStyle"></li>
        </ul>
      </div>

      <div class="" style="width: 320px"></div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import NavBar from "../components/navbar/navbar.vue"
import { ref } from "vue"

const { t } = useI18n()

// tabbar
const active = ref(0) // 0:residential_proxy 1:unlimited_proxy 2:phone_proxy 3:data_prox y
const focusStyle = ref({ width: 0, height: 0 })
function selectActive(e) {
  if (e.target.tagName === "UL") return

  function findLi(dom) {
    if (dom.tagName === "LI") return dom
    return findLi(dom.parentElement)
  }

  const li = findLi(e.target)
  const value = +li.dataset.active
  if (typeof value !== "number") return

  active.value = value
}
</script>

<style lang="less" scoped>
@import url("./overview.less");
</style>
