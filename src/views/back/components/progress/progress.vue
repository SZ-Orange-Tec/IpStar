<template>
  <div class="pc-progress v_center">
    <div class="progress" :class="{ load: type === 'load' }">
      <div
        class="percent"
        :class="{
          blue: type === 'load' || (type === 'network' && percent < 50),
          green: type === 'network' && percent >= 50,
        }"
        :style="{ width: percent + '%' }"
      ></div>
    </div>
    <template v-if="type === 'network'">
      <span v-if="percent >= 80">{{ $t("Excellent") }}</span>
      <span v-else-if="percent >= 50">{{ $t("Good") }}</span>
      <span v-else-if="percent < 50">{{ $t("Average") }}</span>
    </template>
    <template v-else-if="type === 'load'">
      <span v-if="percent < 50">{{ $t("Low") }}</span>
      <span v-else-if="percent < 80">{{ $t("Medium") }}</span>
      <span v-else>{{ $t("High") }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "PCTableProgress",
  props: {
    percent: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
.pc-progress {
  .progress {
    width: 100px;
    height: 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
    overflow: hidden;
    box-shadow: inset 0 0 1px #ccc;
    .percent {
      height: 100%;
      box-sizing: border-box;
      // margin-right: 2px;
      position: relative;
      // &::after {
      //   position: absolute;
      //   right: 0;
      //   top: 0;
      //   content: '';
      //   display: block;
      //   width: 1px;
      //   height: 100%;
      //   background-color: #fff;
      // }
    }
    .blue {
      background-color: #7ecdf5;
    }
    .green {
      background-color: #69b91e;
    }
  }
  .load.progress {
    background-color: #69b91e;
  }
  & > span {
    font-size: 14px;
    margin-left: 10px;
    color: #606266;
  }
  // & > span.blue {
  //   color: #61bdeb;
  // }
  // & > span.green {
  //   color: #8ee13f;
  // }
}
</style>
