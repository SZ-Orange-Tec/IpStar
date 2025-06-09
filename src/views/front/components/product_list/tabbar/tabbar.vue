<template>
  <div class="productTabbar vh_center">
    <!-- 个人 企业 -->
    <div class="tabbar v_center space-x-1">
      <div class="h-full flex-1 vh_center pointer" :class="{ active: active === 0 }" @click="select(0)">Personal</div>

      <div class="h-full flex-1 vh_center pointer" :class="{ active: active === 1 }" @click="select(1)">Enterprise</div>
    </div>

    <!-- 无限 -->
    <div class="unlimited vh_center pointer" v-if="false" :class="{ active: active === 2 }" @click="select(2)">
      <img v-if="active === 2" src="@/assets/pc_img/products_img/路径备份.png" alt="" height="18" />
      <img v-else src="@/assets/pc_img/products_img/路径.png" alt="" height="18" />
      <em>{{ $t("PCProductList.permanent") }}</em>
    </div>
  </div>
</template>

<script>
export default {
  name: "PCProductTabbar",
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    select(index) {
      this.active = index
      this.$emit("select", index)
    },
  },
}
</script>

<style lang="less" scoped>
@import "./tabbar.less";
</style>
