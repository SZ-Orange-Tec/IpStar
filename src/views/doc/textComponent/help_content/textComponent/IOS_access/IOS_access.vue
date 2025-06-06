<template>
  <div class="pc-IOS_access">
    <div class="IOS_access_text">
      <h3>{{ $t("PCIosAccess.h3") }}</h3>
      <h4>{{ $t("PCIosAccess.h4") }}</h4>
      <div class="p_box">
        <p>
          {{ $t("PCIosAccess.pBox.one[0]") }} <a href="javascript:;" @click="open">{{ $t("PCIosAccess.pBox.one[1]") }}</a
          >. {{ $t("PCIosAccess.pBox.one[2]") }}
        </p>
      </div>
      <ul class="step_box">
        <li v-for="(item, index) in list" :key="index">
          <h4>{{ item.h4 }}</h4>
          <div class="p_box" style="width: 416px">
            <p>{{ item.p }}</p>
          </div>
          <img :src="item.img" alt="IOS Access one" />
        </li>
      </ul>
      <div class="p_box">
        <p class="note">{{ $t("PCIosAccess.pBox.two") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PCIOSAccess",
  data() {
    return {
      list: [],
    }
  },
  methods: {
    open(url) {
      window.open(url)
    },
    async getInfo() {
      const en = localStorage.getItem("lang") === "en"
      const { IOS } = en ? await import("../info.en") : await import("../info.zh")

      this.list = IOS
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
@import url("./IOS_access.less");
</style>
