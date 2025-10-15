<template>
  <div class="productTabbar vh_center">
    <!-- 个人 企业 -->
    <div class="tabbar v_center space-x-1 font-medium">
      <div class="h-full px-5 vh_center pointer" :class="{ active: active === 0 }" @click="select(0)">{{ $t("Personal") }}</div>

      <div class="h-full px-5 vh_center pointer" :class="{ active: active === 1 }" @click="select(1)">
        <div class="v_center space-x-1">
          <span class="white-nowrap">{{ $t("Enterprise") }}</span>
          <div v-if="lowestPrice" class="tag text-xs rounded-full font-semibold">${{ lowestPrice }}/GB</div>
        </div>
      </div>
    </div>

    <!-- 无限 -->
    <div class="unlimited vh_center pointer" v-if="false" :class="{ active: active === 2 }" @click="select(2)">
      <img v-if="active === 2" src="@/assets/pc_img/products_img/路径备份.png" alt="" height="18" />
      <img v-else src="@/assets/pc_img/products_img/路径.png" alt="" height="18" />
      <em>{{ $t("productList_spec.permanent") }}</em>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue"

const homeData = inject("homeData")
const lowestPrice = computed(() => (homeData?.lowestPrice ?? 0) / 100)

const emit = defineEmits(["select"])
const active = ref(0)
function select(index) {
  active.value = index
  emit("select", index)
}
</script>

<style lang="less" scoped>
@import "./tabbar.less";
</style>
