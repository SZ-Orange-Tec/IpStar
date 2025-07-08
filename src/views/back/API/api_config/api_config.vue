<template>
  <div class="api_config column space-y-3">
    <div class="card w-full board">
      <!-- 计数 -->
      <h4>{{ t("Count") }}</h4>
      <div class="countbox column gap-3 sm:flex">
        <div class="count w-full">
          <div class="process w-full" ref="process" @mousedown="clickCount">
            <div class="percent" :style="{ width: percentWidth + '%' }">
              <!-- <el-tooltip :content="count+''" placement="top" :open-delay="200"> -->
              <div class="bar" @mousedown.stop="moveStart"></div>
              <div class="tip">{{ count }}</div>
              <!-- </el-tooltip> -->
            </div>
          </div>
          <p class="between">
            <span>{{ min_count }}</span>
            <span>{{ mid_count }}</span>
            <span>{{ max_count }}</span>
          </p>
        </div>
        <el-input-number class="number h-10" v-model="count" :min="min_count" :max="max_count"></el-input-number>
      </div>

      <!-- 表单 -->
      <el-form :model="formInline" label-position="top" class="grid grid-cols-2 md:grid-cols-4 w-full form">
        <el-form-item :label="t('Country')">
          <el-select filterable v-model="formInline.country" :filter-method="dataFilter" @visible-change="changeCountry" placeholder="国家">
            <el-option v-for="item in countryData" :key="item.value" :value="item.value" :label="item.label">
              <div>
                <span :class="['flag-icon', 'flag-icon-' + item.value.toLowerCase()]"></span>
                {{ item.label }}
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="t('Protocol')">
          <el-select v-model="formInline.protocol" placeholder="协议">
            <el-option label="SOCKS5" value="0"></el-option>
            <el-option label="HTTP/HTTPS" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'IP ' + t('Duration')">
          <el-select v-model="formInline.IPtime" placeholder="IP 轮换时间">
            <el-option v-for="item in IPtimeOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="t('Format')">
          <el-select v-model="formInline.format" placeholder="格式">
            <el-option v-for="item in formatList" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="col-span-2">
          <el-button id="primary-button" type="primary" @click="generateURL">{{ t("Generate") }} API {{ t("Link") }}</el-button>
          <el-button type="primary" link @click="openCombo">
            <div class="v_center">{{ t("api_spec.combo") }} <HelpCircle :size="14" /></div>
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 网址 -->
      <p>{{ t("api_spec.url") }} {{ t("api_spec.base") }}</p>
      <div class="website column md:v_center w-full gap-3">
        <el-input class="flex-1" v-model="url" :placeholder="t('api_spec.placeholder')" style="height: 40px"></el-input>
        <div class="space-x-3">
          <el-button id="primary-button" class="copy" type="primary" @click="copyUrl">{{ t("Copy_link") }}</el-button>
          <el-button id="primary-border" @click="openUrl" style="height: 40px">{{ t("Open_link") }}</el-button>
        </div>
      </div>
      <div class="tip">
        <div class="flex-shrink-0">{{ t("Note") }}:</div>
        <ol>
          <li>{{ t("api_spec.note1") }}</li>
          <li>{{ t("api_spec.note2") }}</li>
        </ol>
      </div>
    </div>

    <div class="card w-full board">
      <!-- 参数声明 -->
      <h4>{{ t("Parameter") }} {{ t("Declaration") }}</h4>
      <div class="params w-full">
        <ul>
          <li class="v_center"><span>count</span> COUNT</li>
          <li class="v_center"><span>resptype</span> FORMAT:TXT JSON</li>
          <li class="v_center"><span>regions</span> COUNTRY</li>
          <li class="v_center"><span>protocol</span> PROTOCOL</li>
        </ul>
      </div>

      <h4>{{ t("Example") }}</h4>
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

      <h4>{{ t("Result") }}</h4>
      <div class="params w-full">
        <ul v-if="formInline.format === '2'">
          <li><span>serve</span>SERVE</li>
          <li><span>port</span>PORT</li>
          <li><span>username</span>USERNAME</li>
          <li><span>password</span>PASSWORD</li>
        </ul>
        <ul v-else>
          <li><span>code</span> Status Code</li>
          <li><span>Msg</span> Messages</li>
          <li><span>data</span> IP-list</li>
        </ul>
      </div>
    </div>

    <DialogCombo v-model="dialogCombo" style="margin-top: 0"></DialogCombo>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { debounce } from "@/utils/tools"
// import enOptions from "../../proxy/json/cascader.json"
// import cnOptions from "../../proxy/json/cncascader.json"
import settingStore from "@/store/setting"
import userStore from "@/store/user"
import layoutStore from "@/store/layout"

import "element-plus/es/components/message-box/style/css"
import Message from "@/components/message/message"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import Confirm from "@/components/confirm/confirm"
import position from "@/components/dialog/position"
import DialogCombo from "./dialogCombo.vue"
import { HelpCircle } from "lucide-vue-next"

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
  let { country, duration } = en.value ? await import("../../proxy/info/en") : await import("../../proxy/info/zh")
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
  }&count=${countVal}&protocol=${protocol}&region=${region}&resptype=${resptype}&sign=${sign}&keeptime=${keepTime}&rd=${Date.now()}`
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
const dialogCombo = ref(false)
function openCombo(e) {
  position.set({ x: e.clientX, y: e.clientY })
  dialogCombo.value = true
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
@import "./api_config.less";
</style>
