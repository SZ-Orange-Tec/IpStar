<template>
  <div class="w-full">
    <div class="w-full document space-y-5">
      <h1 class="text-lg md:text-2xl">{{ t("combo_spec.title") }}</h1>

      <div class="space-y-3">
        <h2 class="font-bold">1. {{ t("combo_spec.title1") }}</h2>
        <i18n-t keypath="combo_spec.find_your_info" tag="p" scope="global">
          <template #position>
            <strong>{{ t("combo_spec.position") }}</strong>
          </template>
        </i18n-t>
        <!-- <p>{{ t("combo_spec.find_your_info") }}：</p> -->

        <div class="info-box">
          <p>{{ t("combo_spec.username") }}：{{ proxy_user }}</p>
          <p>{{ t("combo_spec.password") }}：{{ proxy_pass }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <h2>2. {{ t("combo_spec.title2") }}</h2>
        <p>{{ t("combo_spec.proxy_format") }}：</p>
        <div class="info-box">"user-ipstr-keeptime-country-N"</div>

        <div class="space-y-2">
          <div class="v_center">
            <strong style="width: 120px">user</strong>
            <span>{{ t("combo_spec.username") }}</span>
          </div>
          <div class="v_center">
            <strong style="width: 120px">ipstr</strong>
            <span>{{ t("combo_spec.ipstr") }}</span>
          </div>
          <div class="v_center">
            <strong style="width: 120px">keeptime</strong>
            <span>{{ t("combo_spec.keeptime") }}</span>
          </div>
          <div class="v_center">
            <strong style="width: 120px">country</strong>
            <span>{{ t("combo_spec.country") }}</span>
          </div>
          <div class="v_center">
            <strong style="width: 120px">N</strong>
            <span>{{ t("combo_spec.suffix") }}</span>
          </div>
        </div>

        <p>{{ t("combo_spec.combo_example") }}：</p>
        <div class="info-box">"{{ proxy_user }}-123RsAYBc-0-US-N"</div>

        <div class="warning">{{ t("combo_spec.warn") }}</div>
      </div>

      <div class="space-y-3">
        <h2>3. {{ t("combo_spec.title3") }}</h2>
        <p>{{ t("combo_spec.ip_pool") }}：</p>

        <div class="ip-pool">
          <div v-for="item in ipPool" :key="item.url" class="ip-pool-item">
            <strong>{{ item.title }}：</strong>
            <p>{{ item.url }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h2>4. {{ t("combo_spec.title4") }}</h2>
        <div class="info-box">
          <p>user：{{ proxy_user }}-12345678-0-BR-N</p>
          <p>pass: {{ proxy_pass }}</p>
          <p>sock5 {{ t("combo_spec.port") }}：9135</p>
          <p>http {{ t("combo_spec.port") }}：9139</p>
        </div>

        <h4>SOCKS5 {{ t("combo_spec.proxy_expample") }}：</h4>
        <div class="info-box">curl --socks5 {{ proxy_user }}-12345678-0-BR-N:{{ proxy_pass }}@pv5.connpnt134.com:9135 https://ipinfo.io</div>

        <h4>HTTP {{ t("combo_spec.proxy_expample") }}：</h4>
        <div class="info-box">curl -x {{ proxy_user }}-12345678-0-BR-N:{{ proxy_pass }}@pv5.connpnt134.com:9139 https://ipinfo.io</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X as CloseIcon } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import settingStore from "@/store/setting"
import { onMounted, ref } from "vue"
import { platDataNodes } from "../../../../api/home"
import userStore from "@/store/user"

const { t } = useI18n()

const { en } = settingStore()

const { proxy_user, proxy_pass } = userStore()

// ip池
const ipPool = ref([])
async function getIpPool() {
  try {
    const { data } = await platDataNodes()
    const result = []
    const suffix = en.value ? "IP Pool Service Address" : "IP池服务地址"
    data.forEach((item) => {
      const country = item.group === "OM" ? (en.value ? "US" : "美国") : en.value ? "Comprehensive" : "综合"
      item.nodes.forEach((node, index) => {
        result.push({
          title: `${country} ${suffix} ${index + 1}`,
          url: node,
        })
      })
    })
    ipPool.value = result
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(() => {
  getIpPool()
})
</script>

<style lang="less" scoped>
@import url("./user_pwd.less");
</style>
