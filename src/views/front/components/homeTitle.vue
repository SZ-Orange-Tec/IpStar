<template>
  <div class="title w-full v_center !items-stretch space-x-5">
    <div class="left flex-1 v_center"></div>

    <slot></slot>

    <div class="right flex-1 v_center"></div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.title {
  .left,
  .right {
    // height: 36px;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      flex: 1;
    }
    &::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: hsl(var(--primary));
    }
  }
  .left {
    &::before {
      background: linear-gradient(to right, transparent, hsl(var(--primary)));
    }
  }
  .right {
    flex-direction: row-reverse;
    &::before {
      background: linear-gradient(to left, transparent, hsl(var(--primary)));
    }
  }
}
</style>
