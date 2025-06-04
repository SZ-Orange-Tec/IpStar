<template>
  <div class="pc-obtain_proxy">
    <div class="obtain_proxy" v-if="is_purchase">
      <!-- 条件添加 -->
      <table>
        <tbody>
          <tr>
            <td>
              <span class="head">{{ $t("PCObtainProxy.heads[0]") }}</span>
              <!-- <el-cascader v-model="countryVal" :options="countryData" :append-to-body="false" :filter-method="dataFilter" :filterable="true" @change="countryChange"></el-cascader> -->
              <!-- <el-select filterable v-model="countryVal" :filter-method="dataFilter" @visible-change="changeCountry" placeholder="国家">
                <el-option v-for="item in countryData" :key="item.value" :value="item.value" :label="item.label">
                  <div>
                    <span :class="['flag-icon','flag-icon-'+item.value.toLowerCase()]"></span>
                    {{ item.label }}
                  </div>
                </el-option>
              </el-select> -->
            </td>
            <td>
              <span class="head">{{ $t("PCObtainProxy.heads[1]") }}</span>
              <el-cascader v-model="protocolVal" :options="protocolData" :append-to-body="false" @change="protocolChange"></el-cascader>
            </td>
            <td>
              <span class="head">{{ $t("PCObtainProxy.heads[2]") }}</span>
              <!-- <el-cascader v-model="IPtime" :options="IPtimeOption" :append-to-body="false" @change="IPtimeChange"></el-cascader> -->
              <!-- <el-popover placement="bottom" width="300" :offset="-100" trigger="hover">
                <div>
                  <p>{{$t('PCObtainProxy.popover')}}</p>
                </div>
                <img slot="reference" src="../../../assets/pc_img/layout_img/question mark.png" alt="question mark" />
              </el-popover> -->
            </td>
          </tr>
          <tr>
            <td>
              <span class="head">{{ $t("PCObtainProxy.heads[3]") }}</span>
              <!-- <el-input type="number" max="120" placeholder="The maximum number is 500" v-model.trim="countVal" clearable @input="countChange"></el-input> -->
            </td>
            <td>
              <!-- <el-button @click="generate" :loading="btnLoading">{{$t('PCObtainProxy.heads_btn')}}</el-button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 虚线 -->
      <div class="line"></div>
      <!-- 按钮集 -->
      <div class="btn_sum">
        <el-button @click="isTxt = !isTxt"
          ><i class="el-icon-sort"></i>{{ isTxt ? $t("PCObtainProxy.btnSum[1]") : $t("PCObtainProxy.btnSum[0]") }}</el-button
        >
        <el-button @click="copy">{{ $t("PCObtainProxy.btnSum[2]") }}</el-button>
      </div>
      <div class="p_box">
        <!-- <img src="../../../assets/pc_img/obtain_proxy_img/tips_icon.png" alt="tips_icon"> -->
        <p>
          {{ $t("PCObtainProxy.Format[0]") }} <i @click="goToDocument">{{ $t("PCObtainProxy.Format[1]") }}</i> {{ $t("PCObtainProxy.Format[2]") }}
        </p>
      </div>
      <!-- 搜索内容显示区 -->
      <div class="content" v-if="isTxt">
        <p class="tips">{{ $t("PCObtainProxy.tips") }}</p>
        <p v-for="(item, index) in content" :key="index">{{ item }}</p>
      </div>
      <!-- 表格 -->
      <!-- <el-table :data="tableData" v-else height="455" border style="width: calc(100% - 116px); border-radius: 10px 10px 0px 0px; margin-left: 58px">
        <el-table-column prop="server" :label="$t('PCObtainProxy.table.label[0]')"></el-table-column>
        <el-table-column prop="port" :label="$t('PCObtainProxy.table.label[1]')"></el-table-column>
        <el-table-column prop="user" :label="$t('PCObtainProxy.table.label[2]')"></el-table-column>
        <el-table-column prop="password" :label="$t('PCObtainProxy.table.label[3]')"></el-table-column>
        <template slot="append">
          <div class="message">{{ $t("PCObtainProxy.table.bottom_txt") }}</div>
        </template>
      </el-table> -->
      <p class="channels" v-show="is_purchase">
        <img src="../../../assets/pc_img/products_img/left arrows.png" alt="left arrows" />
        {{ $t("PCObtainProxy.channels.p") }} <i @click="$router.push('/docs_help')">{{ $t("PCObtainProxy.channels.i") }}</i
        >.
      </p>
    </div>
    <!-- 无购买记录 状态 -->
    <div class="null_commodity" v-else>
      <img src="../../../assets/pc_img/layout_img/null commodity.png" alt="null commodity" />
      <p>{{ $t("PCObtainProxy.nullCommodity.p") }}</p>
      <!-- <el-button
        @click="
          $store.commit('layout/setIsProduc', true)
          $router.push('/products')
        "
        ><img src="../../../assets/pc_img/layout_img/shopping trolley.png" alt="shopping trolley" />
        {{ $t("PCObtainProxy.nullCommodity.btnText") }}</el-button
      > -->
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

const { lang } = settingStore()
const { isProduc } = layoutStore()
const { is_purchase } = userStore()

const router = useRouter()

let allCountry = []

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
    label: "PCObtainProxy.IPtimeOption[0]",
    value: "0",
  },
  {
    label: "PCObtainProxy.IPtimeOption[1]",
    value: "5",
  },
  {
    label: "PCObtainProxy.IPtimeOption[2]",
    value: "10",
  },
  {
    label: "PCObtainProxy.IPtimeOption[3]",
    value: "30",
  },
  {
    label: "PCObtainProxy.IPtimeOption[4]",
    value: "60",
  },
  {
    label: "PCObtainProxy.IPtimeOption[5]",
    value: "120",
  },
  {
    label: "PCObtainProxy.IPtimeOption[6]",
    value: "180",
  },
  {
    label: "PCObtainProxy.IPtimeOption[7]",
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
