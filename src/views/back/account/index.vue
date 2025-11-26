<template>
  <div class="account column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full sm:px-4 lg:px-6">
      <SonAccount class="board p-5 mt-5 rounded-md" />
      <AccountDetail class="board p-5 my-5 rounded-md" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/navbar/navbar.vue"
import SonAccount from "./sonAccount/index.vue"
import AccountDetail from "./detail/index.vue"
</script>

<style lang="less" scoped>
// @import url("./index.less");
</style>
