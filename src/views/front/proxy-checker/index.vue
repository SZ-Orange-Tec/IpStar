<template>
  <div>
    <!-- index -->
    <div class="box_wrap banner bg-[#F1F8FF]">
      <div class="container column_center">
        <h1 class="text-3xl lg:text-5xl font-semibold leading-none">{{ t("proxy_checker_spec.title") }}</h1>
        <p class="text-base lg:text-lg grey-80 mt-5">{{ t("proxy_checker_spec.desc") }}</p>

        <div class="w-full bg-white rounded-md p-6 mt-10">
          <div class="flex items-end gap-5">
            <ul class="flex-1 grid grid-cols-3 gap-5">
              <li class="w-full column">
                <label class="text-sm grey-80">{{ t("Protocol") }}</label>
                <DropDown placement="bottom" class="w-full shink-0 dropdown mt-2">
                  <template #label="{ open }">
                    <IpButton :class="{ open: open }" type="border" class="w-full">
                      <div class="black between text-sm space-x-3 shrink-0 w-full h-9 px-3">
                        <div :class="{ 'grey-60': !form.protocol }">{{ form.protocol || t("Protocol") }}</div>
                        <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
                      </div>
                    </IpButton>
                  </template>
                  <template #menu>
                    <div class="menu w-full">
                      <ul class="w-full grey-60 box-border p-1 column text-sm" @click="protocolChange">
                        <li
                          v-for="item in protocolList"
                          :key="item"
                          :class="{ primary: item === form.protocol }"
                          class="menu_item w-full box-border px-2 h-8 rounded-md pointer transition-color v_center pointer"
                          :data-value="item"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </template>
                </DropDown>
              </li>
              <li class="w-full column">
                <label class="text-sm grey-80">{{ t("Target_URL") }}</label>
                <IpInput class="w-full mt-2 h-9 rounded-md outline-none" v-model="form.url" :placeholder="t('Target_URL')"></IpInput>
              </li>
              <li class="w-full column">
                <label class="text-sm grey-80">{{ t("Timeout") }}</label>
                <IpInput class="w-full mt-2 h-9 rounded-md outline-none" v-model="form.timeout" :placeholder="t('Timeout')"></IpInput>
              </li>
            </ul>
            <IpButton class="h-9 !rounded-full pl-4 pr-5 text-sm" type="border" @click="openMask">
              <div class="v_center space-x-2">
                <Plus :size="16" />
                <span>{{ t("Add_Proxy") }}</span>
              </div>
            </IpButton>
          </div>

          <div class="table_box mt-5">
            <el-table :data="tableData" class="h-full" v-loading="loading">
              <el-table-column prop="proxy" :label="$t('Proxy')" min-width="360"></el-table-column>
              <el-table-column prop="speed" :label="$t('Speed')" min-width="120"></el-table-column>
              <el-table-column :label="$t('Status')" min-width="120">
                <template #default="scope">
                  <el-tag v-if="scope.row.status === 1" type="success">{{ $t("Succeeded") }}</el-tag>
                  <el-tag v-else-if="scope.row.status === 0" type="danger">{{ $t("Failed") }}</el-tag>
                  <span v-else>--</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('Action')" min-width="120">
                <template #default="{ $index }">
                  <IpButton type="grey-60" class="hover:text-red-500" @click="deleteItem($index)">
                    <Trash2 :size="16" class="" />
                  </IpButton>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="between mt-5">
            <div class="flex space-x-3">
              <IpButton :disabled="tableData.length === 0 || loading" @click="testLink" class="h-9 !rounded-full px-8 text-sm" type="primary">{{
                t("Test")
              }}</IpButton>
              <IpButton class="w-9 h-9 hover:text-red-500" type="circle ghost" @click="deleteAll">
                <Trash2 :size="16" />
              </IpButton>
            </div>

            <div class="flex space-x-3">
              <IpButton :disabled="!isDownFailed" @click="downloadProxy(0)" class="h-9 !rounded-full pl-4 pr-5 text-sm" type="border">
                <div class="v_center space-x-2">
                  <Download :size="16" v-if="!invaliding" />
                  <span class="ip-loading" v-else></span>
                  <span>{{ t("Download_Invalid_List") }}</span>
                </div>
              </IpButton>
              <IpButton :disabled="!isDownSuccess" @click="downloadProxy(1)" class="h-9 !rounded-full pl-4 pr-5 text-sm" type="border">
                <div class="v_center space-x-2">
                  <Download :size="16" v-if="!validing" />
                  <span class="ip-loading" v-else></span>
                  <span>{{ t("Download_Valid_List") }}</span>
                </div>
              </IpButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap bg-white pt-12">
      <div class="container column_center">
        <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("proxy_checker_spec.tool_title") }}</h2>
        <p class="text-base lg:text-lg grey-80 mt-5">
          {{ t("proxy_checker_spec.tool_desc") }}
        </p>

        <div class="mt-10">
          <img loading="lazy" src="@/assets/images/proxy-checker/img1.webp" />
        </div>
        <!-- <div class="w-full column lg:v_center gap-2"></div> -->
        <ul class="w-full max-w-5xl column lg:v_center gap-3 mt-10">
          <li class="">{{ t("proxy_checker_spec.tool_dot_title") }}</li>
          <li class="v_center space-x-2">
            <Check :size="18" class="success shrink-0" />
            <span>{{ t("proxy_checker_spec.tool_dot1") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="18" class="success shrink-0" />
            <span>{{ t("proxy_checker_spec.tool_dot2") }}</span>
          </li>
          <li class="v_center space-x-2">
            <Check :size="18" class="success shrink-0" />
            <span>{{ t("proxy_checker_spec.tool_dot3") }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="box_wrap bg-white">
      <div class="container column_center lg:v_center lg:!flex-row-reverse gap-14 lg:gap-20">
        <div class="vh_center shrink-0">
          <img loading="lazy" src="@/assets/images/proxy-checker/img2.webp" width="580" />
        </div>
        <div class="section_text space-y-4 column_center lg:column">
          <h2 class="text-3xl lg:text-4xl font-semibold">{{ t("proxy_checker_spec.why_title") }}</h2>
          <p class="text-base lg:text-lg grey-80 mt-5">
            {{ t("proxy_checker_spec.why_desc") }}
          </p>
        </div>
      </div>
    </div>

    <div class="box_wrap proxy" v-lazy="getLowestPrice">
      <div class="container">
        <h2 class="text-3xl lg:text-4xl font-semibold text text-center">
          {{ t("proxy_checker_spec.proxy_title") }}
        </h2>
        <p class="text-base lg:text-lg grey-80 mt-5 text-center">{{ t("proxy_checker_spec.proxy_desc") }}</p>

        <div class="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="product_item residential col-span-1 md:col-span-2">
            <div class="info">
              <img loading="lazy" src="@/assets/images/home/icon1.webp" width="48" height="48" />
              <div class="text-xl font-medium mt-4 leading-none">{{ t("Residential_Proxies") }}</div>
              <p class="mt-4">{{ t("proxy_checker_spec.residential_des") }}。</p>
              <ul class="space-y-3 text-sm grey-80 mt-5">
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("proxy_checker_spec.residential_adv1") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("proxy_checker_spec.residential_adv2") }}</span>
                </li>
                <li class="v_center space-x-2">
                  <div class="bg-current success vh_center w-4 h-4 rounded-full">
                    <Check :size="10" :stroke-width="3" class="white" />
                  </div>
                  <span>{{ t("proxy_checker_spec.residential_adv3") }}</span>
                </li>
              </ul>
              <div class="between mt-7">
                <div class="left">
                  <div class="text-xs">{{ t("Starting_from") }}</div>
                  <div class="text-sm">
                    <span class="primary">$</span>
                    <b class="text-xl primary">{{ lowestPrice.residential }}</b>
                    <span>/GB</span>
                  </div>
                </div>

                <a href="/pricing/residential">
                  <IpButton type="border" class="!rounded-full h-9 text-sm px-5">{{ t("Get_Now") }}</IpButton>
                </a>
              </div>
            </div>
            <img loading="lazy" class="bg" src="@/assets/images/home/residential.webp" width="464" height="388" />
          </div>
          <div class="product_item space-y-4">
            <img loading="lazy" src="@/assets/images/home/icon2.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Phone_Proxies") }}</div>
            <p class="mt-4">{{ t("proxy_checker_spec.phone_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.phone_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.phone_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.phone_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.phone }}</b>
                  <span>/GB</span>
                </div>
              </div>

              <a href="/pricing/mobile">
                <IpButton type="border" class="!rounded-full h-9 text-sm px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon3.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Unlimited_Residential_Proxies") }}</div>
            <p class="mt-4">{{ t("proxy_checker_spec.unlimited_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.unlimited_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.unlimited_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.unlimited_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.unlimited }}</b>
                  <span>/{{ t("Day") }}</span>
                </div>
              </div>

              <a href="/pricing/unlimited">
                <IpButton type="border" class="!rounded-full h-9 text-sm px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon4.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("Data_Center_Proxies") }}</div>
            <p class="mt-4">{{ t("proxy_checker_spec.data_center_des") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.data_center_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.data_center_adv2", { price: lowestPrice.data_center }) }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.data_center_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.data_center }}</b>
                  <span>/IP</span>
                </div>
              </div>

              <a href="/pricing/data_center">
                <IpButton type="border" class="!rounded-full h-9 text-sm px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
          <div class="product_item">
            <img loading="lazy" src="@/assets/images/home/icon5.webp" width="48" height="48" />
            <div class="text-lg font-medium mt-4 leading-none">{{ t("proxy_checker_spec.static_title") }}</div>
            <p class="mt-4">{{ t("proxy_checker_spec.static_desc") }}。</p>
            <ul class="space-y-3 text-sm grey-80 mt-5">
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.static_adv1") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.static_adv2") }}</span>
              </li>
              <li class="v_center space-x-2">
                <div class="bg-current success vh_center w-4 h-4 rounded-full">
                  <Check :size="10" :stroke-width="3" class="white" />
                </div>
                <span>{{ t("proxy_checker_spec.static_adv3") }}</span>
              </li>
            </ul>
            <div class="between mt-7">
              <div class="left">
                <div class="text-xs">{{ t("Starting_from") }}</div>
                <div class="text-sm">
                  <span class="primary">$</span>
                  <b class="text-xl primary">{{ lowestPrice.static }}</b>
                  <span>/IP</span>
                </div>
              </div>

              <a href="/pricing/static">
                <IpButton type="primary_border" class="h-10 px-5">{{ t("Get_Now") }}</IpButton>
              </a>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>

    <div class="box_wrap">
      <div class="container column_center relative">
        <img loading="lazy" src="@/assets/images/proxy-checker/infobg.webp" width="678" height="341" alt="" />

        <div class="absolute column_center bottom-0 mb-20">
          <i18n-t tag="h2" keypath="proxy_checker_spec.try_title" scope="global" class="text-3xl lg:text-4xl font-semibold text-center">
            <template #free>
              <span class="primary">{{ t("proxy_checker_spec.free") }}</span>
            </template>
          </i18n-t>
          <IpButton @click="toUse" class="h-12 mt-6 !rounded-full px-8" type="primary">
            <div class="v_center space-x-2">
              <span>{{ t("Free_Trial") }}</span>
              <MoveRight :size="20" />
            </div>
          </IpButton>
        </div>
      </div>
    </div>

    <div class="box_wrap">
      <div class="container space-y-10">
        <h3 class="text-3xl lg:text-4xl font-semibold text-center">{{ t("FAQ") }}</h3>

        <div class="content space-y-5">
          <Question>
            <template #header> {{ t("proxy_checker_spec.faq1_ask") }} </template>
            <template #content>
              <p>{{ t("proxy_checker_spec.faq1_desc") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("proxy_checker_spec.faq2_ask") }} </template>
            <template #content>
              <p>{{ t("proxy_checker_spec.faq2_desc") }}</p>
            </template>
          </Question>
          <Question>
            <template #header> {{ t("proxy_checker_spec.faq3_ask") }} </template>
            <template #content>
              <p>{{ t("proxy_checker_spec.faq3_desc") }}</p>
            </template>
          </Question>
        </div>
      </div>
    </div>

    <!-- 添加代理信息 -->
    <IpDialog v-model="isMask" class="mask">
      <div class="mask_content space-y-5">
        <h2 class="text-xl font-medium">{{ t("Add_Proxy") }}</h2>
        <p class="grey-80">{{ t("proxy_checker_spec.add_proxy_tip") }}</p>

        <div class="relative">
          <textarea
            id="ipinfo"
            v-model="ipinfo"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            class="input"
          ></textarea>

          <label for="ipinfo" :class="{ hidden: ipinfo.length > 0 }" class="placeholder grey-60 absolute left-0 top-0 p-4">
            IP:Port:Username:Password<br />
            IP:Port@Username:Password<br />
            Username:Password:IP:Port<br />
            Username:Password@IP:Port<br />
            IP:Port##Username##Password<br />
            IP,Port,Username,Password
          </label>

          <p class="grey-60 text-xs mt-3">{{ ip_len }} / {{ useable_len }}</p>
          <p class="h-5 mt-2 text-sm warn" v-show="isError">{{ t("proxy_checker_spec.ip_error") }}</p>
        </div>

        <div class="flex space-x-3">
          <IpButton @click="isMask = false" class="flex-1 vh_center h-11 !rounded-full px-5" type="border">{{ t("Cancel") }}</IpButton>
          <IpButton @click="addProxy" :disabled="ip_len === 0" class="flex-1 vh_center h-11 !rounded-full px-5" type="primary">{{
            t("Submit")
          }}</IpButton>
        </div>

        <div class="close vh_center pointer transition-color" @click="isMask = false">
          <CloseIcon :size="16" />
        </div>
      </div>
    </IpDialog>
  </div>
</template>

<script setup>
import DropDown from "@/components/dropdown/dropdown.vue"
import IpDialog from "@/components/dialog/index.vue"
import IpButton from "@/components/button/button.vue"
import IpInput from "@/components/input/input.vue"
import { computed, nextTick, onMounted, reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import settingStore from "../../../store/setting"
import { ChevronDown, Plus, Trash2, Download, Check, MoveRight, X as CloseIcon } from "lucide-vue-next"
import Question from "../components/question/question.vue"
import Message from "@/components/message/message"
import layoutStore from "../../../store/layout"
import position from "../../../components/dialog/position"
import { platToolsProxyChecker } from "../../../api/tools"
import vLazy from "@/directive/lazy"
import { useRouter } from "vue-router"
import loginStore from "../../../store/login"

const { t } = useI18n()
const { en } = settingStore()
const { isLogin } = loginStore()

const form = reactive({
  protocol: "HTTP",
  url: "https://ipinfo.io",
  timeout: "5000",
})

// 协议
const protocolList = ["HTTP", "HTTPS", "Socks5"]
function protocolChange(e) {
  function findDom(dom) {
    if (!dom || dom.tagName === "UL") return
    if (dom.tagName === "LI") {
      return dom
    }
    return findDom(dom.parentElement)
  }
  const dom = findDom(e.target)
  if (!dom) return

  const value = dom.dataset.value
  form.protocol = value
}

// 添加代理信息
const isMask = ref(false)
const ipinfo = ref("")
const isError = ref(false)
const ip_len = computed(() => ipinfo.value.trim().split(/\r\n|\n|\r/).length)
const useable_len = computed(() => 1000 - tableData.value.length)
function openMask(e) {
  position.set({
    x: e.clientX,
    y: e.clientY,
  })

  isMask.value = true
}
function addProxy() {
  if (ip_len.value <= 0) return

  const arr = ipinfo.value.trim().split(/\r\n|\n|\r/)

  let proxy = arr.map((item) => {
    return {
      proxy: item,
      speed: "-",
      status: "-",
    }
  })

  if (proxy.length > useable_len.value) {
    Message({
      type: "warning",
      message: "Insufficient available balance",
    })
    return
  }

  proxy = [...tableData.value, ...proxy]
  const { result } = proxy.reduce(
    (pre, cur) => {
      if (!pre.hash[cur.proxy]) {
        pre.hash[cur.proxy] = true
        pre.result.push(cur)
      }
      return pre
    },
    { result: [], hash: {} },
  )
  tableData.value = result

  isMask.value = false

  nextTick(() => {
    ipinfo.value = ""
  })
}

// 表格数据
const tableData = ref([])
const loading = ref(false)
const invaliding = ref(false)
const validing = ref(false)
const isDownFailed = computed(() => tableData.value.filter((i) => i.status === 0).length > 0)
const isDownSuccess = computed(() => tableData.value.filter((i) => i.status === 1).length > 0)
async function testLink() {
  try {
    loading.value = true
    // if(!form.url){
    //   Message({
    //     type:"warning",
    //     message: en.value ? "" :""
    //   })
    //   return
    // }
    const params = {
      ...form,
      url: form.url || "https://ipinfo.io",
      protocol: form.protocol.toLowerCase(),
      timeout: Number(form.timeout) || 5000,
      proxies: tableData.value.map((item) => item.proxy),
    }
    const { data } = await platToolsProxyChecker(params)

    tableData.value = data.map((item) => {
      return {
        proxy: item.proxy,
        status: item.status,
        speed: item.duration,
      }
    })

    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error.message)
    Message({
      type: "warning",
      message: "Test failed",
    })
  }
}
function deleteItem(index) {
  const arr = tableData.value
  arr.splice(index, 1)
  tableData.value = arr
}
function deleteAll() {
  tableData.value = []
}
async function downloadProxy(status) {
  if (!isDownFailed.value && status === 0) return
  if (!isDownSuccess.value && status === 1) return

  const invalid = status === 0
  try {
    if (invalid) {
      invaliding.value = true
    } else {
      validing.value = true
    }

    debugger
    const data = tableData.value.filter((i) => i.status === status)

    const proxy = data.reduce((pre, next) => {
      pre += (pre.length > 0 ? "\n" : "") + next.proxy
      return pre
    }, "")

    // 导出文件
    const blob = new Blob([proxy], { type: "text/txt" })
    const filename = (status ? t("Valid_List") : t("Invalid_List")) + ".txt"
    const {
      default: { saveAs },
    } = await import(/* webpackChunkName: 'file-saver' */ "file-saver")

    saveAs(blob, filename)

    if (invalid) {
      invaliding.value = false
    } else {
      validing.value = false
    }
  } catch (error) {
    if (invalid) {
      invaliding.value = true
    } else {
      validing.value = true
    }
    console.log(error.message)
    Message({
      type: "warning",
      message: "Download failed",
    })
  }
}

// 跳转
const router = useRouter()
function toUse() {
  if (isLogin.vlaue) {
    router.push("/overview")
  } else {
    router.push("/login")
  }
}

// 最低价格
const { lowestPrice, getLowestPrice } = layoutStore()
</script>

<style lang="less" scoped>
.banner {
  .container {
    padding: 8rem 0;
    @media screen and (max-width: 1024px) {
      padding: 6rem 0;
    }
  }
  .dropdown {
    :deep(.dropMenu) {
      width: 100%;
    }
    .menu_item {
      &:hover {
        background-color: hsl(var(--primary) / 7%);
      }
    }
  }
  .table_box {
    // max-height: calc(100% - 44px);
    height: 320px;
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
}

.proxy {
  .content {
    .product_item {
      border: 1px solid #e9edf4;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 27px 28px;
      transition: all 0.3s;
      position: relative;
      &:hover {
        box-shadow: 0 4px 16px #c3c7d433;
      }
    }
    .residential {
      .info {
        max-width: 380px;
        z-index: 1;
      }
      @media screen and (min-width: 768px) {
        .bg {
          position: absolute;
          right: 0;
          top: 0;
          max-height: 100%;
          max-width: 100%;
          -o-object-fit: contain;
          object-fit: contain;
          vertical-align: bottom;
        }
      }
    }
  }
}
.mask {
  background-color: hsl(var(--dialog-wrap) / 30%) !important;
  ::v-deep .dialog_container {
    margin: 15vh auto;
  }
  .mask_content {
    width: 100vw;
    max-width: 600px;
    background-color: hsl(var(--background));
    // background: linear-gradient(87deg, #e0ebff, #fff);
    border-radius: 12px;
    position: relative;
    padding: 30px 30px 36px;

    .input {
      background: #fafafa;
      outline: none;
      border: 1px solid #efeff0;
      border-radius: 4px;
      color: #374459;
      display: flex;
      flex-direction: column;
      height: 300px;
      max-height: 600px;
      max-width: 1000px;
      min-height: 300px;
      padding: 16px;
      resize: none;
      text-overflow: ellipsis;
      touch-action: none;
      white-space: nowrap;
      width: 100%;
      transition: border-color 0.3s;
      &:hover {
        border-color: hsl(var(--border));
      }
      &:focus {
        // border-color: hsl(var(--primary));
        border-color: hsl(var(--border));
        & ~ .placeholder {
          display: none;
        }
      }
    }

    .placeholder {
      cursor: text;
      user-select: none;
    }

    .close {
      margin-top: 0;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      position: absolute;
      right: 10px;
      top: 10px;
      background-color: transparent;
      color: hsl(var(--foreground) / 60%);
      z-index: 1;
      &:hover {
        color: hsl(var(--foreground) / 100%);
        background-color: hsl(var(--neutral) / 10%);
      }
    }
  }
}
</style>
