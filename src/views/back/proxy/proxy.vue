<template>
  <div class="obtain_proxy column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 px-3 md:px-5">
      <div class="space-y-5 h-full" v-if="is_purchase">
        <div class="card column">
          <div class="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <div class="column space-y-2">
              <p class="text-sm font-medium">{{ t("Country") }}</p>
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

            <div class="column space-y-2">
              <p class="text-sm font-medium">{{ t("Protocol") }}</p>
              <el-cascader v-model="protocolVal" :options="protocolData" :append-to-body="false" @change="protocolChange"></el-cascader>
            </div>

            <div class="column space-y-2">
              <p class="text-sm font-medium">IP {{ t("Duration") }}</p>
              <div class="space-x-3 v_center">
                <el-cascader v-model="IPtime" :options="IPtimeOption" :append-to-body="false" @change="IPtimeChange"></el-cascader>
                <el-popover placement="bottom" width="300" :offset="-100" trigger="hover">
                  <div>
                    <p>{{ t("proxy_spec.duration_tip") }}</p>
                  </div>
                  <template #reference>
                    <img src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
                  </template>
                </el-popover>
              </div>
            </div>

            <div class="column space-y-2">
              <p class="text-sm font-medium">{{ t("Count") }}</p>
              <el-input
                type="text"
                placeholder="The maximum number is 500"
                v-model.trim="countVal"
                @input="countChange"
                style="max-width: 232px"
              ></el-input>
            </div>

            <div class="column space-y-2">
              <p class="text-sm font-medium hidden md:block" style="height: 20px"></p>
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

        <div class="card space-y-4 w-full">
          <div class="v_center space-x-5 text-sm w-full whitespace-nowrap">
            <ip-button type="border" @click="isTxt = !isTxt" class="px-5 h-8 font-medium">
              <div class="space-x-2 v_center">
                <ArrowLeftRight :size="18" />
                <p>{{ !isTxt ? t("Show_as_text") : t("Show_as_table") }}</p>
              </div>
            </ip-button>
            <ip-button type="border" @click="copy" class="px-5 h-8 font-medium">{{ t("Copy_to_clipboard") }}</ip-button>
          </div>

          <p class="text-sm space-x-2 w-full">
            <span>{{ t("proxy_spec.list_tip.front") }}</span>
            <span @click="goToDocument" class="primary_text pointer">{{ t("proxy_spec.list_tip.btn") }}</span>
            <span>{{ t("proxy_spec.list_tip.back") }}</span>
          </p>

          <!-- 搜索内容显示区 -->
          <div class="grey text-sm flex-1 w-full space-y-3" v-if="isTxt" style="min-height: 455px">
            <p class="tip">{{ t("Server") }} : {{ t("Port") }} : {{ t("User") }} : {{ t("Password") }}</p>
            <div class="space-y-3">
              <p v-for="(item, index) in content" :key="index">{{ item }}</p>
            </div>
          </div>

          <!-- 表格 -->
          <div class="table_box w-full" v-else>
            <el-table class="w-full" :data="tableData" height="455">
              <el-table-column prop="server" :label="t('Server')" min-width="160"></el-table-column>
              <el-table-column prop="port" :label="t('Port')" min-width="100"></el-table-column>
              <el-table-column prop="user" :label="t('User')" min-width="300"></el-table-column>
              <el-table-column prop="password" :label="t('Password')" min-width="140"></el-table-column>
              <template #append>
                <div class="text-center">{{ t("No_data") }}</div>
              </template>
            </el-table>
          </div>

          <p class="space-x-2 text-sm" v-show="is_purchase">
            <img src="../../../assets/pc_img/products_img/left arrows.png" width="20" alt="left arrows" style="display: inline-block" />
            <span>{{ t("proxy_spec.api_tip.front") }}</span>
            <span class="primary_text pointer" @click="goToDocument">{{ t("proxy_spec.api_tip.btn") }}</span>
          </p>
        </div>
      </div>

      <div class="h-full column_center space-y-4" v-else style="justify-content: center">
        <img src="@/assets/images/products/empty.png" width="256" alt="null commodity" />
        <p>{{ t("proxy_spec.no_order") }}</p>
        <ip-button type="primary" @click="toBuy" class="px-3 h-10">
          <div class="v_center space-x-2">
            <ShoppingCart :size="20" />
            <span>{{ t("Buy_now") }}</span>
          </div>
        </ip-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"

import { debounce } from "@/utils/tools"
// import enOptions from "./json/cascader.json"
// import cnOptions from "./json/cncascader.json"
import { PlatCustomerEndPoints } from "@/api/layout"
import Message from "@/components/message/message.js"
import { useRouter } from "vue-router"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import NavBar from "../components/navbar/navbar.vue"
import IpButton from "@/components/button/button.vue"
import { ShoppingCart } from "lucide-vue-next"
import IpInput from "@/components/input/input.vue"
import { ArrowLeftRight } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { en } = settingStore()
const { isProduc } = layoutStore()
const { is_purchase } = userStore()

const router = useRouter()
const { t } = useI18n()

function toBuy() {
  isProduc.value = false
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

const countVal = ref(10)
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
  console.log(val)
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
      }
      const { data } = await PlatCustomerEndPoints(params)
      btnLoading.value = false
      content.value = data
      tableData.value = data.map((item) => {
        const arr = item.split(":")
        return {
          server: arr[0],
          port: arr[1],
          user: arr[2],
          password: arr[3],
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

// watch
// watch(
//   () => lang.value,
//   (val) => {
//     if (val === "zh") {
//       const cn = JSON.parse(JSON.stringify(cnOptions))
//       sortCountry(cn)
//       countryData.value = cn
//       countryVal.value = cn[0].value
//       allCountry = cn
//     } else {
//       const en = JSON.parse(JSON.stringify(enOptions))
//       sortCountry(en)
//       countryData.value = en
//       countryVal.value = en[0].value
//       allCountry = en
//     }
//   },
//   { immediate: true }
// )

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
@import url("./proxy.less");
</style>
