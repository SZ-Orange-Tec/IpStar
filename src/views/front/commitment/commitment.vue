<template>
  <div class="pc-commitment">
    <!-- <Header class="commitment_header" /> -->
    <div class="commitment_content">
      <h1>{{ $t("PCCommitment.h1") }}</h1>
      <p class="home_do">
        <a href="javascript:;" @click="$router.push('/home')">{{ $t("PCCommitment.p[0]") }}</a> {{ $t("PCCommitment.p[1]") }}
      </p>
      <h2>{{ $t("PCCommitment.h2") }}</h2>
      <p class="min_p">
        {{ $t("PCCommitment.p[2]") }} <a href="https://oag.ca.gov/privacy/ccpa">{{ $t("PCCommitment.p[3]") }}</a>
      </p>
      <h4>{{ $t("PCCommitment.h4") }}</h4>
      <p class="min_p">{{ $t("PCCommitment.p[4]") }}</p>
      <p class="min_p">{{ $t("PCCommitment.p[5]") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommiTment",
  components: {
    // Header: () => import("../components/header/header.vue"),
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
@import url("./commitment.less");
</style>
