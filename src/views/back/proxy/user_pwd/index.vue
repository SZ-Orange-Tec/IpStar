<template>
  <div class="w-full grey-80">
    <div class="w-full document board space-y-6 rounded-lg p-6">
      <h1 class="text-2xl font-medium black">{{ t("proxy_spec.combo_title") }}</h1>

      <div class="space-y-3">
        <h2 class="font-medium black">1. {{ t("proxy_spec.combo1_title") }}</h2>
        <i18n-t keypath="proxy_spec.combo1_desc" tag="p" scope="global">
          <template #position>
            <span class="font-medium">{{ t("proxy_spec.combo1_position") }}</span>
          </template>
        </i18n-t>
        <!-- <p>{{ t("proxy_spec.find_your_info") }}：</p> -->

        <div class="info-box space-y-2">
          <p>{{ t("Proxy_UserName") }}：{{ proxy_user }}</p>
          <p>{{ t("Proxy_Password") }}：{{ proxy_pass }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="font-medium black">2. {{ t("proxy_spec.combo2_title") }}</h2>
        <p>{{ t("proxy_spec.combo2_desc") }}：</p>
        <div class="info-box">"user-ipstr-keeptime-country-N"</div>
        <p>{{ t("proxy_spec.params_desc") }}：</p>

        <div class="space-y-2">
          <div class="v_center">
            <strong class="font-medium black" style="width: 120px">user</strong>
            <span>{{ t("Proxy_UserName") }}</span>
          </div>
          <div class="v_center">
            <strong class="font-medium black" style="width: 120px">ipstr</strong>
            <span>{{ t("proxy_spec.what_ipstr") }}</span>
          </div>
          <div class="v_center">
            <strong class="font-medium black" style="width: 120px">keeptime</strong>
            <span>{{ t("proxy_spec.what_keeptime") }}</span>
          </div>
          <div class="v_center">
            <strong class="font-medium black" style="width: 120px">country</strong>
            <span>{{ t("proxy_spec.what_country") }}</span>
          </div>
          <div class="v_center">
            <strong class="font-medium black" style="width: 120px">N</strong>
            <span>{{ t("proxy_spec.what_N") }}</span>
          </div>
        </div>

        <p>{{ t("proxy_spec.combo2_example") }}：</p>
        <div class="info-box">"{{ proxy_user }}-123RsAYBc-0-US-N"</div>

        <div class="note px-3 py-3 rounded column md:flex gap-2 text-sm">
          <strong class="flex-shrink-0 major font-medium">{{ t("Note") }}:</strong>
          <div class="note_proxy space-y-2">
            <p>{{ t("proxy_spec.combo2_tip") }}</p>
            <p>{{ t("proxy_spec.note_proxy") }}</p>
            <ol class="space-y-2">
              <li class="space-y-2">
                <p>{{ t("proxy_spec.note_proxy1") }}</p>
                <div class="code">{{ proxy_user }}-rot-0-N-N</div>
              </li>
              <li class="space-y-2">
                <p>{{ t("proxy_spec.note_proxy2") }}</p>
                <div class="code">{{ proxy_user }}-12345678-0-U-N</div>
              </li>
              <li class="space-y-2">
                <p>{{ t("proxy_spec.note_proxy3") }}</p>
                <div class="code">{{ proxy_user }}-12345678-0-N-N-M</div>
                <p>{{ t("proxy_spec.note_proxy_end") }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="font-medium black">3. {{ t("proxy_spec.combo3_title") }}</h2>
        <p>{{ t("proxy_spec.combo3_desc") }}：</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="item in ipPool" :key="item.url" class="pool-item p-5 space-y-2 rounded-lg">
            <strong class="font-medium">{{ item.title }}：</strong>
            <p>{{ item.url }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="font-medium black">4. {{ t("proxy_spec.combo4_title") }}</h2>
        <div class="info-box">
          <p>user：{{ proxy_user }}-12345678-0-BR-N</p>
          <p>pass: {{ proxy_pass }}</p>
          <p>sock5 {{ t("Port") }}：9135</p>
          <p>http {{ t("Port") }}：9139</p>
        </div>

        <h4>SOCKS5 {{ t("Expample") }}：</h4>
        <div class="info-box">curl --socks5 {{ proxy_user }}-12345678-0-BR-N:{{ proxy_pass }}@pv5.connpnt134.com:9135 https://ipinfo.io</div>

        <h4>HTTP {{ t("Expample") }}：</h4>
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
.document {
  background-color: hsl(var(--background));
  .note {
    border: 1px solid hsl(var(--major) / 20%);
    background-color: hsl(var(--major) / 6%);
    .note_proxy {
      ol {
        padding-left: 12px;
        .code {
          // padding: 0 12px;
          background-color: hsl(var(--background));
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 6px 12px;
          &::before {
            content: '"';
          }
          &::after {
            content: '"';
          }
        }
      }
    }
  }

  .info-box {
    background-color: hsl(var(--foreground) / 3%);
    // border-left: 4px solid #3498db;
    border: 1px solid hsl(var(--foreground) / 5%);
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 12px;
    font-size: 15px;
  }
  .pool-item {
    background-color: hsl(var(--success) / 5%);
    border: 1px solid hsl(var(--success) / 20%);
    // background-color: #e5f8f0;
    // border: 1px solid #aceace;
  }
}
</style>
