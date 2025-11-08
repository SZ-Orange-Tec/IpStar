<template>
  <div class="space-y-6 w-full">
    <div class="board rounded p-5 column space-y-5">
      <strong class="font-medium text-lg">{{ t("Options") }}</strong>
      <div class="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="column space-y-1">
          <p class="text-sm">{{ t("Proxy") }}</p>
          <el-select @change="changeStype" v-model="stype" :placeholder="$t('Account')" style="max-width: 232px">
            <el-option :value="0" :label="t('menu_spec.residential_proxy')"></el-option>
            <el-option :value="1" :label="t('menu_spec.unlimited_proxy')"></el-option>
            <el-option :value="2" :label="t('menu_spec.phone_proxy')"></el-option>
            <el-option :value="4" :label="t('Rotation_Proxies')"></el-option>
          </el-select>
        </div>

        <div class="column space-y-1">
          <p class="text-sm">{{ t("Country") }}</p>
          <el-select
            filterable
            v-model="countryVal"
            :filter-method="dataFilter"
            @visible-change="changeCountry"
            :placeholder="t('Country')"
            style="max-width: 232px"
          >
            <el-option v-for="item in countryData" :key="item.value" :value="item.value" :label="item.label">
              <div>
                <span :class="['flag-icon', 'flag-icon-' + item.value.toLowerCase()]"></span>
                {{ item.label }}
              </div>
            </el-option>
          </el-select>
        </div>

        <div class="column space-y-1">
          <p class="text-sm">{{ t("Protocol") }}</p>
          <el-cascader v-model="protocolVal" :options="protocolData" :append-to-body="false" @change="protocolChange"></el-cascader>
        </div>

        <div class="column space-y-1">
          <p class="text-sm">IP {{ t("Duration") }}</p>
          <div class="space-x-3 v_center">
            <el-cascader v-model="IPtime" :options="IPtimeOption" :append-to-body="false" @change="IPtimeChange"></el-cascader>
            <el-popover placement="bottom" width="300" trigger="hover">
              <div>
                <p>{{ t("proxy_spec.duration_tip") }}</p>
              </div>
              <template #reference>
                <HelpCircle :size="16" color="hsl(var(--primary))" class="pointer" />
              </template>
            </el-popover>
          </div>
        </div>

        <div class="column space-y-1">
          <p class="text-sm">{{ t("Count") }}</p>
          <el-input
            type="text"
            placeholder="The maximum number is 500"
            v-model.trim="countVal"
            @input="countChange"
            style="max-width: 232px"
            :disabled="stype === 4"
          ></el-input>
        </div>

        <div class="column space-y-1">
          <p class="text-sm">{{ t("Account") }}</p>
          <el-select v-model="account" clearable :placeholder="$t('Account')" style="max-width: 232px">
            <el-option v-for="item in accountList" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </div>

        <div class="column space-y-1">
          <p class="text-sm hidden md:block" style="height: 20px"></p>
          <ip-button @click="generate" :loading="btnLoading" class="px-5 h-8 text-sm">
            <div class="v_center space-x-2">
              <span class="ip-loading" v-if="btnLoading"></span>
              <p>{{ t("Extract") }}</p>
            </div>
          </ip-button>
        </div>
      </div>
    </div>

    <!-- <div class="line w-full"></div> -->

    <div class="board rounded p-5 space-y-4 w-full">
      <div class="between space-x-5 w-full">
        <p class="font-medium text-lg">{{ t("Link_Information") }}</p>

        <div class="v_center space-x-2">
          <ip-button type="border" @click="copy" class="rounded px-5 h-9 text-sm">{{ t("Copy_Information") }}</ip-button>
          <ip-button type="border" @click="copyUrlAll" class="rounded px-5 h-9 text-sm">{{ t("Copy_Curl") }}</ip-button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="table_box w-full">
        <el-table class="w-full" :data="tableData" height="440" v-loading="btnLoading">
          <el-table-column prop="server" :label="t('Server')" min-width="160"></el-table-column>
          <el-table-column prop="port" :label="t('Port')" min-width="100"></el-table-column>
          <el-table-column prop="user" :label="t('User')" min-width="300"></el-table-column>
          <el-table-column prop="password" :label="t('Password')" min-width="140"></el-table-column>
          <el-table-column :label="t('Curl_Command')" min-width="140">
            <template #default="scope">
              <div class="w-full v_center">
                <p class="flex-1 min-w-0 ellipsis">{{ scope.row.curl }}</p>
                <span @click="copyUrl(scope.row.curl)" class="primary pointer font-medium">{{ t("Copy") }}</span>
              </div>
            </template>
          </el-table-column>
          <!-- <template #append>
              <div class="text-center">{{ t("No_data") }}</div>
            </template> -->
        </el-table>
      </div>
      <!-- <p class="space-x-2 text-sm" v-show="is_purchase">
        <img src="@/assets/pc_img/products_img/left arrows.png" width="20" alt="left arrows" />
        <span>{{ t("proxy_spec.api_tip.front") }}</span>
        <span class="primary pointer" @click="goToDocument">{{ t("proxy_spec.api_tip.btn") }}</span>
      </p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from "vue"

import { debounce } from "@/utils/tools"
// import enOptions from "./json/cascader.json"
// import cnOptions from "./json/cncascader.json"
import { PlatCustomerEndPoints } from "@/api/layout"
import Message from "@/components/message/message.js"
import { useRoute, useRouter } from "vue-router"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import IpButton from "@/components/button/button.vue"
import { ShoppingCart, ArrowLeftRight, HelpCircle } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import copyText from "../../../../utils/copyText"
import { platAccountSelect } from "@/api/account"

const { en } = settingStore()
const { isProduc } = layoutStore()
const { is_purchase } = userStore()

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

function toBuy() {
  isProduc.value = true
  router.push("/products")
}
// 响应式状态

const protocolData = ref([
  {
    label: "SOCKS5",
    value: "0",
  },
  {
    label: "HTTP/HTTPS",
    value: "1",
  },
])
const protocolVal = ref("0")

const stype = ref(route.query?.type ?? 0)
function changeStype(type) {
  stype.value = type
  countVal.value = type === 4 ? 1 : 10
}
const countVal = ref(stype === 4 ? 1 : 10)
const content = ref([])
let mes = ""
const btnLoading = ref(false)
const tableData = ref([])
const isTxt = ref(false)

// methods
function countryChange(val) {
  countryVal.value = val[0]
}
function protocolChange(val) {
  protocolVal.value = val[0]
}
function IPtimeChange(val) {
  IPtime.value = val[0]
}
function countChange(val) {
  if (val > 500) {
    countVal.value = 500
    return
  }
  countVal.value = val
}

async function generate() {
  try {
    btnLoading.value = true
    let currentIPtime = IPtime.value.toString()
    if (countryVal.value && protocolVal.value && countVal.value && currentIPtime.length > 0) {
      const params = {
        region: countryVal.value === "ALL" ? "" : countryVal.value,
        protocol: +protocolVal.value,
        keeptime: currentIPtime,
        count: countVal.value,
        persistconn: 1,
        account: account.value !== accountList.value[0] ? account.value : "",
        stype: stype.value,
      }
      const { data } = await PlatCustomerEndPoints(params)
      btnLoading.value = false
      content.value = data
      tableData.value = data.map((item) => {
        const arr = item.split(":")
        const obj = {
          server: arr[0],
          port: arr[1],
          user: arr[2],
          password: arr[3],
        }
        return {
          ...obj,
          curl: generateCurl(obj),
        }
      })
      mes = data.toString()
    } else {
      Message({
        message: en.value ? "Please fill in the information completely" : "请填写完整信息",
        type: "error",
      })
      btnLoading.value = false
    }
  } catch {
    btnLoading.value = false
  }
}
function generateCurl(item) {
  const { password, port, server, user } = item
  const url = `curl -${protocolVal.value === "0" ? "-socks5" : "x"} ${user}:${password}@${server}:${port} https://ipinfo.io --vv`
  return url
}

async function copyUrl(url) {
  await copyText(url)
  Message({
    message: en.value ? "Copy success" : "复制成功",
    type: "success",
  })
}
async function copyUrlAll() {
  let result = ""
  tableData.value.forEach((item) => {
    const { curl } = item
    result += result.length > 0 ? "\n" + curl : curl
  })
  await copyText(result)
  Message({
    message: en.value ? "Copy success" : "复制成功",
    type: "success",
  })
}

let allCountry = []
const countryData = ref(null)
const countryVal = ref(null)
const IPtime = ref("0")
const IPtimeOption = ref()
// 获取国家/时长数据
async function getData() {
  let { country, duration } = en.value ? await import("./info/en") : await import("./info/zh")
  allCountry = country
  countryData.value = sortCountry(country)
  countryVal.value = country[0].value

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

function copy() {
  const input = document.createElement("input")
  input.value = mes
  document.body.appendChild(input)
  input.select()
  document.execCommand("copy")
  Message({
    message: en.value ? "Copy success" : "复制成功",
    type: "success",
  })
  document.body.removeChild(input)
}

const dataFilter = debounce(function (val) {
  const reg = new RegExp(val.toUpperCase())
  if (val) {
    const arr = allCountry.filter((item) => reg.test(item.label.toUpperCase()))
    countryData.value = Object.freeze(arr)
  } else {
    countryData.value = Object.freeze(allCountry)
  }
}, 300)

function changeCountry(status) {
  if (status) {
    countryData.value = Object.freeze(allCountry)
  }
}

function goToDocument() {
  // store.commit("setIsdocument", "Help")
  // store.commit("setDocumentIdx", "1-0")
  router.push("/doc")
}

// 子账号
const accountList = ref([])
const account = ref(route.query.account ?? "")
async function getAccountList() {
  try {
    const { data } = await platAccountSelect()
    data[0] = data[0] + ` (${en.value ? "Primary account" : "主账号"})`
    accountList.value = data

    if (!account.value) {
      account.value = data[0]
    }
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  getData()
  getAccountList()
})
</script>

<style lang="less" scoped>
.table_box {
  max-height: calc(100% - 44px);
  :deep(.el-table) {
    height: 100%;
    border: 1px solid #ebeef5;
    thead {
      .el-table__cell {
        background-color: #f2f3f5;
        .cell {
          color: hsl(var(--foreground));
        }
      }
    }

    // 去掉bottom横线
    .el-table__inner-wrapper::before {
      height: 0px;
    }
  }
}
</style>
