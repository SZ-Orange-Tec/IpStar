<template>
  <div class="obtain_proxy column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main flex-1 p-5">
      <div class="space-y-5 h-full column" v-if="is_purchase">
        <div class="filter w-full">
          <div class="column space-y-2">
            <p class="text-sm">{{ $t("PCObtainProxy.heads[0]") }}</p>
            <el-select
              size="medium"
              filterable
              v-model="countryVal"
              :filter-method="dataFilter"
              @visible-change="changeCountry"
              placeholder="国家"
              style="width: 232px"
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
            <p class="text-sm">{{ $t("PCObtainProxy.heads[1]") }}</p>
            <el-cascader v-model="protocolVal" :options="protocolData" :append-to-body="false" @change="protocolChange"></el-cascader>
          </div>

          <div class="column space-y-2">
            <p class="text-sm">{{ $t("PCObtainProxy.heads[2]") }}</p>
            <div class="space-x-3 v_center">
              <el-cascader v-model="IPtime" :options="IPtimeOption" :append-to-body="false" @change="IPtimeChange"></el-cascader>
              <el-popover placement="bottom" width="300" :offset="-100" trigger="hover">
                <div>
                  <p>{{ $t("PCObtainProxy.popover") }}</p>
                </div>
                <template #reference>
                  <img src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
                </template>
              </el-popover>
            </div>
          </div>

          <div class="column space-y-2">
            <p class="text-sm">{{ $t("PCObtainProxy.heads[3]") }}</p>
            <ip-input
              type="text"
              placeholder="The maximum number is 500"
              v-model.trim="countVal"
              @input="countChange"
              style="width: 232px"
            ></ip-input>
          </div>

          <div class="column space-y-2">
            <p class="text-sm" style="height: 20px"></p>
            <ip-button @click="generate" :loading="btnLoading" class="px-10 h-10">
              <div class="v_center space-x-2">
                <span class="ip-loading" v-if="btnLoading"></span>
                <p>{{ $t("PCObtainProxy.heads_btn") }}</p>
              </div>
            </ip-button>
          </div>
        </div>

        <div class="line w-full"></div>

        <div class="v_center space-x-5 text-sm w-full">
          <ip-button type="border" @click="isTxt = !isTxt" class="px-5 h-8">
            <div class="space-x-2 v_center">
              <ArrowLeftRight :size="18" />
              <p>{{ isTxt ? $t("PCObtainProxy.btnSum[1]") : $t("PCObtainProxy.btnSum[0]") }}</p>
            </div>
          </ip-button>
          <ip-button type="border" @click="copy" class="px-5 h-8">{{ $t("PCObtainProxy.btnSum[2]") }}</ip-button>
        </div>

        <p class="text-sm v_center space-x-2 w-full">
          <span>{{ $t("PCObtainProxy.Format[0]") }}</span>
          <IpButton type="link" @click="goToDocument">{{ $t("PCObtainProxy.Format[1]") }}</IpButton>
          <span>{{ $t("PCObtainProxy.Format[2]") }}</span>
        </p>

        <!-- 搜索内容显示区 -->
        <div class="grey text-sm flex-1 w-full space-y-3" v-if="isTxt">
          <p class="tip">{{ $t("PCObtainProxy.tips") }}</p>
          <div class="space-y-3">
            <p v-for="(item, index) in content" :key="index">{{ item }}</p>
          </div>
        </div>

        <!-- 表格 -->
        <el-table class="w-full" :data="tableData" v-else height="455" border>
          <el-table-column prop="server" :label="$t('PCObtainProxy.table.label[0]')"></el-table-column>
          <el-table-column prop="port" :label="$t('PCObtainProxy.table.label[1]')"></el-table-column>
          <el-table-column prop="user" :label="$t('PCObtainProxy.table.label[2]')"></el-table-column>
          <el-table-column prop="password" :label="$t('PCObtainProxy.table.label[3]')"></el-table-column>
          <template #append>
            <div class="text-center">{{ $t("PCObtainProxy.table.bottom_txt") }}</div>
          </template>
        </el-table>

        <p class="v_center space-x-2 text-sm" v-show="is_purchase">
          <img src="../../../assets/pc_img/products_img/left arrows.png" width="20" alt="left arrows" />
          <span>{{ $t("PCObtainProxy.channels.p") }}</span>
          <IpButton type="link">{{ $t("PCObtainProxy.channels.i") }}</IpButton>
        </p>
      </div>

      <div class="h-full column_center space-y-4" v-else style="justify-content: center">
        <img src="../../../assets/pc_img/layout_img/null commodity.png" alt="null commodity" />
        <p>{{ $t("PCObtainProxy.nullCommodity.p") }}</p>
        <ip-button type="primary" @click="toBuy" class="px-3 h-10">
          <div class="v_center space-x-2">
            <ShoppingCart :size="20" />
            <span>{{ $t("PCObtainProxy.nullCommodity.btnText") }}</span>
          </div>
        </ip-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"

import { debounce } from "@/utils/tools"
import enOptions from "./json/cascader.json"
import cnOptions from "./json/cncascader.json"
import { PlatCustomerEndPoints } from "@/api/layout"
import Message from "@/components/message/message.js"
import { useRouter } from "vue-router"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
// 国家国旗
import "flag-icon-css/css/flag-icons.css"
import NavBar from "../components/navbar/navbar.vue"
import IpButton from "@/components/button/button.vue"
import { ShoppingCart } from "lucide-vue-next"
import IpInput from "@/components/input/input.vue"
import { ArrowLeftRight } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { lang } = settingStore()
const { isProduc } = layoutStore()
const { is_purchase } = userStore()

const router = useRouter()
const { t } = useI18n()

let allCountry = []

function toBuy() {
  isProduc.value = false
  router.push("/products")
}
// 响应式状态
const countryData = ref(null)
const countryVal = ref(null)
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
const IPtime = ref("0")
const IPtimeOption = ref([
  {
    label: t("PCObtainProxy.IPtimeOption[0]"),
    value: "0",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[1]"),
    value: "5",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[2]"),
    value: "10",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[3]"),
    value: "30",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[4]"),
    value: "60",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[5]"),
    value: "120",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[6]"),
    value: "180",
  },
  {
    label: t("PCObtainProxy.IPtimeOption[7]"),
    value: "360",
  },
])
const countVal = ref(10)
const content = ref([])
const mes = ref("")
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
      mes.value = data.toString()
    } else {
      Message({
        message: "Please fill in the information completely",
        type: "error",
      })
      btnLoading.value = false
    }
  } catch {
    btnLoading.value = false
  }
}

function copy() {
  const input = document.createElement("input")
  input.value = mes.value
  document.body.appendChild(input)
  input.select()
  document.execCommand("copy")
  Message({
    message: "Copy success",
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

function sortOptions(arr) {
  const first = arr.splice(0, 1)[0]
  let temp
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const a = arr[j].value
      const b = arr[j + 1].value
      if (a > b) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  arr.splice(0, 0, first)
}

// watch
watch(
  () => lang.value,
  (val) => {
    if (val === "zh") {
      const cn = JSON.parse(JSON.stringify(cnOptions))
      sortOptions(cn)
      countryData.value = cn
      countryVal.value = cn[0].value
      allCountry = cn
    } else {
      const en = JSON.parse(JSON.stringify(enOptions))
      sortOptions(en)
      countryData.value = en
      countryVal.value = en[0].value
      allCountry = en
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
@import url("./proxy.less");
</style>
