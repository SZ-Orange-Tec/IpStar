<template>
  <div class="pc-ADSPower_access">
    <div class="ADSPower_access_text">
      <h3>{{ $t("PCAdsPowerAccess.h3") }}</h3>
      <ul class="step_box">
        <li v-for="(item, index) in list" :key="index">
          <h4>{{ item.h4 }}</h4>
          <div class="p_box">
            <p>{{ item.p }}</p>
          </div>
          <img :src="item.img" alt="IOS Access one" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PCADSPowerAccess",
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getInfo() {
      const en = localStorage.getItem("lang") === "en"
      const { Power } = en ? await import("../info.en") : await import("../info.zh")

      this.list = Power
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
@import url("./ADSPower_access.less");
</style>
