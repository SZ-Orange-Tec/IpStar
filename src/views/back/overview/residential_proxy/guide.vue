<template>
  <div>
    <div class="new_guide rounded-md w-full md:flex-1 column !items-stretch space-y-7">
      <div class="text-lg md:text-xl font-semibold">
        <span class="primary">{{ $t("overview_spec.welcome1") }}</span>
        {{ $t("overview_spec.welcome2") }}
      </div>
      <div class="h-[1px] bg-current" style="color: hsl(var(--foreground) / 5%)"></div>

      <div class="space-y-2" style="margin-top: 0">
        <div class="space-y-2">
          <p class="black font-semibold text-lg">1. {{ $t("overview_spec.proxy_title") }}</p>
        </div>

        <div class="w-full">
          <div class="column md:v_center !items-stretch gap-2">
            <CopyItem class="flex-1" :label="$t('overview_spec.port')" text="9139(http) 9135(socks5)" />
            <CopyItem class="flex-1" :label="$t('overview_spec.proxy_user')" :text="proxy_user" />
            <CopyItem class="flex-1" :label="$t('overview_spec.proxy_pass')" :text="proxy_pass" />
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="space-y-2">
          <p class="black font-semibold text-lg">2. {{ $t("overview_spec.test1") }}</p>
          <p class="text-sm">{{ $t("overview_spec.test2") }}</p>
        </div>

        <div>
          <div class="w-full column !items-stretch space-y-4">
            <CodeItem v-for="item in ipPools" :key="item.label" :label="item.label" :text="item.text" />
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div class="space-y-2">
          <p class="black font-semibold text-lg">3. {{ $t("overview_spec.obtxy_title") }}</p>
        </div>

        <div class="btn_list space-y-5 pb-5">
          <p class="text-sm">{{ $t("overview_spec.way") }}</p>
          <div class="w-full v_center space-x-5">
            <ipButton type="border" class="flex-1" @click="router.push('/proxy?active=0')">
              <div class="vh_center space-x-2 py-3 w-full">
                <span>{{ $t("User_Pass_Auth") }}</span>
              </div>
            </ipButton>
            <ipButton type="border" class="flex-1">
              <div class="vh_center space-x-2 py-3 w-full" @click="router.push('/proxy?active=1')">
                <span>{{ $t("API_Auth") }}</span>
              </div>
            </ipButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CopyItem from "./copyItem.vue"
import CodeItem from "./codeItem.vue"
import { onMounted, ref } from "vue"
import userStore from "@/store/user"
import settingStore from "@/store/setting"
import IpButton from "@/components/button/button.vue"
import { useRouter } from "vue-router"

const { lang } = settingStore()
const router = useRouter()

// 用户代理信息
const { unlimited, isUsed, proxy_user, proxy_pass } = userStore()
// ip池
const ipPools = ref([
  "curl -x u2084euvahm-123RsAYBc-0-US-N:vae4draucd6p@pv3.connpnt134.com:9135 https://ipinfo.io",
  "curl --socks5 u2084euvahm-123RsAYBc-0-US-N:vae4draucd6p@pv2.connpnt134.com:9135 https://ipinfo.io",
  "curl -x u2084euvahm-123RsAYBc-0-US-N:vae4draucd6p@pv4.connpnt134.com:9135 https://ipinfo.io",
  "curl --socks5 u2084euvahm-123RsAYBc-0-US-N:vae4draucd6p@pv5.connpnt134.com:9135 https://ipinfo.io",
])
async function getIpPool() {
  try {
    const result = []
    const proto = ["HTTP(s)", "SOCKS5"]
    const host = ["pv3.connpnt134.com", "pv5.connpnt134.com", "pv2.connpnt134.com", "pv4.connpnt134.com"]
    const countrys = [
      { en: "US", zh: "美国", code: "US" },
      { en: "Germany", zh: "德国", code: "DE" },
      { en: "Russia", zh: "俄罗斯", code: "RU" },
      { en: "Random", zh: "随机", code: "N" },
    ]
    host.forEach((serve, index) => {
      const country = countrys[index]
      const name = country[lang.value] ?? country.en
      const code = country.code

      const idx = index % 2
      const port = idx === 0 ? 9139 : 9135
      result.push({
        label: `${name} ${proto[index % 2]}：`,
        text: `curl -${index % 2 === 0 ? "x" : "-socks5"} ${proxy_user.value}-123RsAYBc-0-${code}-N:${
          proxy_pass.value
        }@${serve}:${port} https://ipinfo.io -vv`,
      })
    })
    ipPools.value = result
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(() => {
  getIpPool()
})
</script>

<style lang="less" scoped></style>
