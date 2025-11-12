<template>
  <div class="w-full column space-y-6">
    <div class="w-full box-border board rounded p-5 text-sm space-y-5">
      <strong class="font-medium text-lg">{{ t("Options") }}</strong>
      <!-- 计数 -->
      <div class="space-y-1">
        <span>{{ t("Count") }}</span>
        <div class="countbox column gap-3 sm:flex">
          <el-slider v-model="count" show-input :min="min_count" :disabled="stype === 3" :max="max_count" />
          <!-- <div class="slider-demo-block">
           </div>
           <SliderCount v-model="count" :min="min_count" :max="max_count" />
           <el-input-number class="number h-10" v-model="count" :min="min_count" :max="max_count"></el-input-number> -->
        </div>
      </div>

      <div class="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="space-y-1">
          <span>{{ t("Proxy") }}</span>
          <el-select @change="changeStype" v-model="stype" :placeholder="$t('Proxy')">
            <el-option :value="0" :label="t('menu_spec.residential_proxy')"></el-option>
            <el-option :value="1" :label="t('menu_spec.unlimited_proxy')"></el-option>
            <el-option :value="2" :label="t('menu_spec.phone_proxy')"></el-option>
            <el-option :value="3" :label="t('Rotation_Proxies')"></el-option>
          </el-select>
        </div>

        <div class="space-y-1">
          <span>{{ t("Country") }}</span>
          <el-select filterable v-model="formInline.country" :filter-method="dataFilter" @visible-change="changeCountry" placeholder="国家">
            <el-option v-for="item in countryData" :key="item.value" :value="item.value" :label="item.label">
              <div>
                <span :class="['flag-icon', 'flag-icon-' + item.value.toLowerCase()]"></span>
                {{ item.label }}
              </div>
            </el-option>
          </el-select>
        </div>
        <div class="space-y-1">
          <span>{{ t("Protocol") }}</span>
          <el-select v-model="formInline.protocol" placeholder="协议">
            <el-option label="SOCKS5" value="0"></el-option>
            <el-option label="HTTP/HTTPS" value="1"></el-option>
          </el-select>
        </div>
        <div class="space-y-1">
          <span>IP {{ t("Duration") }}</span>
          <el-select v-model="formInline.IPtime" placeholder="IP 轮换时间" :disabled="stype === 3">
            <el-option v-for="item in IPtimeOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
        <div class="space-y-1">
          <span>{{ t("Format") }}</span>
          <el-select v-model="formInline.format" placeholder="格式">
            <el-option v-for="item in formatList" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
        <div class="" style="align-self: end">
          <ip-button type="primary" class="px-5 h-9" @click="generateURL">{{ t("Generate") }} API {{ t("Link") }}</ip-button>
        </div>
      </div>

      <!-- 网址 -->
      <div class="">
        <p class="text-base">{{ t("proxy_spec.url") }} {{ t("proxy_spec.base") }}</p>
        <div class="column md:v_center w-full gap-3 mt-2">
          <IpInput class="w-full h-10 rounded" v-model="url" :placeholder="t('proxy_spec.placeholder')"></IpInput>
          <div class="space-x-3 v_center text-sm whitespace-nowrap">
            <ip-button type="primary" class="h-10 px-5" @click="copyUrl">{{ t("Copy_link") }}</ip-button>
            <ip-button type="primary_border" class="h-10 px-5" @click="openUrl">{{ t("Open_link") }}</ip-button>
          </div>
        </div>
        <div class="note px-3 py-2 rounded flex space-x-2 mt-5">
          <div class="flex-shrink-0 major font-medium">{{ t("Note") }}:</div>
          <ol class="flex-1">
            <li>1. {{ t("proxy_spec.note1") }}</li>
            <li>2. {{ t("proxy_spec.note2") }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="w-full box-border board rounded p-5 text-sm space-y-5">
      <strong class="font-medium text-lg">{{ t("Link_Information") }}</strong>
      <!-- 参数声明 -->
      <div class="space-y-1">
        <span>{{ t("Parameter") }}</span>
        <div class="params rounded px-3 py-3 w-full">
          <ul class="flex flex-wrap justify-between">
            <li class="v_center">
              <div class="px-2 rounded">count</div>
              <span class="ml-3">COUNT</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">resptype</div>
              <span class="ml-3">FORMAT:TXT JSON</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">regions</div>
              <span class="ml-3">COUNTRY</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">protocol</div>
              <span class="ml-3">PROTOCOL</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="space-y-1">
        <span>{{ t("Example") }}</span>
        <div class="example w-full">
          <template v-if="formInline.format === '0'">
            {"code":0,"msg":"","data":[{"server":"***.com","port":9000,"user":"username","pass":"password","ptype":"http"}]}
          </template>
          <template v-else-if="formInline.format === '1'"> {"code":0,"msg":"","data":["serve : port : username : password"]} </template>
          <template v-else-if="formInline.format === '2'">
            serve : port : username : password <br />
            ***.com : 8080 : u2084sjtsait-V4PKcdfWCe-0-AG-N : n856naue
          </template>
        </div>
      </div>

      <div class="space-y-1">
        <h4>{{ t("Result") }}</h4>
        <div class="params rounded px-3 py-3 w-full">
          <ul class="flex flex-wrap justify-between" v-if="formInline.format === '2'">
            <li class="v_center">
              <div class="px-2 rounded">serve</div>
              <span class="ml-3">SERVE</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">port</div>
              <span class="ml-3">PORT</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">username</div>
              <span class="ml-3">USERNAME</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">code</div>
              <span class="ml-3">PASSWORD</span>
            </li>
          </ul>
          <ul class="flex flex-wrap justify-between" v-else>
            <li class="v_center">
              <div class="px-2 rounded">Msg</div>
              <span class="ml-3">Status Code</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">data</div>
              <span class="ml-3">Messages</span>
            </li>
            <li class="v_center">
              <div class="px-2 rounded">password</div>
              <span class="ml-3">IP-list</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <DialogCombo v-model="dialogCombo" style="margin-top: 0"></DialogCombo> -->
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { debounce } from "@/utils/tools"
import settingStore from "@/store/setting"
import userStore from "@/store/user"
import layoutStore from "@/store/layout"

import "element-plus/es/components/message-box/style/css"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import Confirm from "@/components/confirm/confirm"
import position from "@/components/dialog/position"
import IpButton from "@/components/button/button.vue"
import IpInput from "@/components/input/input.vue"

const route = useRoute()
const router = useRouter()
const { en } = settingStore()
const { isProduc } = layoutStore()
const { apiKey, is_purchase: isPurchase } = userStore()

const { t } = useI18n()

// 表单
const formInline = ref({
  // form
  country: "",
  protocol: "0",
  format: "0",
  IPtime: "0",
})

const stype = ref(route.query?.type ?? 0)
function changeStype(type) {
  stype.value = type
  count.value = type === 3 ? 1 : 50
  IPtime.value = type === 3 ? "0" : IPtime.value
  url.value = ""
}

const IPtime = ref("0") // duration
const IPtimeOption = ref()
const formatList = [
  // format
  { value: "0", label: "JSON" },
  { value: "1", label: t("Simplified") + " JSON" },
  { value: "2", label: "TXT" },
]
const url = ref("")

// 国家相关
let allCountry = [] // 国家
const countryData = ref(null)
// 获取国家/时长数据
async function getData() {
  let { country, duration } = en.value ? await import("../account_way/info/en") : await import("../account_way/info/zh")
  allCountry = country
  countryData.value = sortCountry(country)
  formInline.value = {
    ...formInline.value,
    country: country[0].value,
  }

  IPtimeOption.value = duration

  // 加载国家国旗
  import("flag-icon-css/css/flag-icons.css")
}
//按首字母排序国家
function sortCountry(arr) {
  const first = arr[0]
  arr = arr.slice(1)
  let temp
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const a = arr[j].value.charAt(0)
      const b = arr[j + 1].value.charAt(0)
      if (a > b) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return [first].concat(arr)
}
function dataFilter(val) {
  const reg = new RegExp(val.toUpperCase())
  if (val) {
    const arr = allCountry.filter((item) => reg.test(item.label.toUpperCase()))
    countryData.value = Object.freeze(arr)
  } else {
    countryData.value = Object.freeze(allCountry)
  }
}
const debouncedDataFilter = debounce(dataFilter, 300)
function changeCountry(status) {
  if (status) {
    countryData.value = Object.freeze(allCountry)
  }
}

watch(
  formInline,
  () => {
    url.value = ""
  },
  { deep: true }
)

// 滑动块
const min_count = ref(1) // 数量
const max_count = ref(500)
const count = ref(50)
const mid_count = computed(() => max_count.value / 2)
const percentWidth = computed(() => Math.round((count.value / max_count.value) * 100))
function moveStart(e) {
  const total = e.target.closest(".process").clientWidth
  const unit = total / max_count.value
  const startCount = count.value
  const startX = e.clientX
  const fun = (e) => {
    const nowX = e.clientX
    const trans = nowX - startX
    if (min_count.value < count.value && count.value < max_count.value) {
      const percent = Math.round(((unit * startCount + trans) / total) * 100)
      count.value = Math.round((percent / 100) * max_count.value)
    } else if ((min_count.value === count.value && trans > 0) || (count.value === max_count.value && trans < 0)) {
      const percent = Math.round(((unit * startCount + trans) / total) * 100)
      count.value = Math.round((percent / 100) * max_count.value)
    }
  }
  const remove = () => {
    document.body.removeEventListener("mousemove", fun)
    document.body.removeEventListener("mouseup", remove)
  }
  document.body.addEventListener("mousemove", fun, { passive: false })
  document.body.addEventListener("mouseup", remove)
  e.preventDefault()
}
function clickCount(e) {
  const findTarget = (dom) => {
    if (dom.className === "process") return dom
    return findTarget(dom.parentNode)
  }
  const target = findTarget(e.target)
  const total = target.clientWidth
  const offsetX = e.offsetX
  const percent = Math.round((offsetX / total) * 100)
  count.value = Math.round((percent / 100) * max_count.value)
}

async function generateURL(e) {
  if (!isPurchase.value) {
    position.set({ x: e.clientX, y: e.clientY })
    Confirm({
      title: t("Prompt"),
      message: en.value ? "Your balance is low, are you heading to a subscription package?" : "您的余额不足，是否前往购买套餐?",
      confirmText: t("OK"),
      cancelText: t("Cancel"),
      success: () => {
        isProduc.value = true
        router.push("/products")
      },
    })
    return
  }
  const baseUrl = "https://service.ipstar.io/v1/obtain_proxy_endpoints"
  const countVal = count.value
  const protocol = formInline.value.protocol
  const region = formInline.value.country === "ALL" ? "" : formInline.value.country
  const resptype = formInline.value.format
  const keepTime = formInline.value.IPtime
  const { default: md5 } = await import(/*webpackChunkName:'js-md5'*/ "js-md5")
  const sign = md5(apiKey.value + protocol + countVal + region)
  const params = `?apikey=${
    apiKey.value
  }&count=${countVal}&protocol=${protocol}&region=${region}&resptype=${resptype}&sign=${sign}&keeptime=${keepTime}&proxytype=${
    stype.value
  }&rd=${Date.now()}`
  url.value = baseUrl + params
}

function copyUrl() {
  if (!url.value) return
  if ("clipboard" in navigator && window.isSecureContext) {
    const text = url.value
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Message({
          type: "success",
          message: en.value ? "Copy Success" : "复制成功",
        })
      })
      .catch((err) => {
        Message({
          type: "warning",
          message: (en.value ? "Copy failed\n" : "复制失败\n") + err.message,
        })
      })
  } else {
    const text = url.value
    const input = document.createElement("textarea")
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand("Copy")
    Message({
      type: "success",
      message: en.value ? "Copy Success" : "复制成功",
    })
    input.remove()
  }
}

function openUrl() {
  if (!url.value) return
  window.open(url.value)
}

// 账密组合相关
// const dialogCombo = ref(false)
// function openCombo(e) {
//   position.set({ x: e.clientX, y: e.clientY })
//   dialogCombo.value = true
// }

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.countbox {
  :deep(.el-slider) {
    .el-slider__bar {
      background-color: hsl(var(--primary) / 80%);
    }
    .el-slider__button {
      border-color: hsl(var(--primary) / 80%);
    }
  }
}
.note {
  border: 1px solid hsl(var(--major) / 20%);
  background-color: hsl(var(--major) / 4%);
}
.params {
  border: 1px dashed #dddfe6;
  & > ul {
    li {
      &::before {
        content: "\2022";
        color: hsl(var(--primary) / 80%);
        font-size: 20px;
      }
      & > div {
        background-color: hsl(var(--primary) / 30%);
      }
    }
  }
}
.example {
  border-radius: 8px;
  padding: 20px;
  font-size: 14px;
  background-color: hsl(var(--foreground) / 3%);
  color: hsl(var(--foreground) / 80%);
  margin-bottom: 30px;
  white-space: pre-wrap;
}
</style>
