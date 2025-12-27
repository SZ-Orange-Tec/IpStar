<template>
  <div class="h-full board rounded space-y-5 p-5 column">
    <div class="w-full flex flex-wrap gap-3">
      <IpInput v-model="form.ip" :placeholder="t('data_center_spec.ip_remark')" class="h-9 rounded-md" />
      <!-- <el-select v-model="form.area" placeholder="" style="width: 160px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select> -->

      <!-- 地区 -->
      <DropDown placement="bottom" class="shink-0 dropdown" :max-height="300">
        <template #label="{ open }">
          <IpButton :class="{ open: open }" type="border" class="label">
            <div class="black between text-sm space-x-3 shrink-0 w-full h-9 px-3">
              <!-- <IpInput
                :border="false"
                v-model="area_text"
                @change="debounceFilterRegion"
                :placeholder="t('Locations')"
                class="h-full flex-1 rounded-md"
              /> -->
              <div :class="{ 'grey-60': !area_text }">{{ area_text || t("Locations") }}</div>
              <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
            </div>
          </IpButton>
        </template>
        <template #menu>
          <div class="menu">
            <ul v-if="regionsList.length" class="grey-60 box-border p-1 column text-sm" @click="regionChange">
              <li
                v-for="item in regionsList"
                :key="item.value"
                :class="{ active: item.value === form.region }"
                class="menu_item w-full box-border px-2 h-8 rounded-md pointer transition-color v_center pointer"
                :data-value="item.value"
              >
                {{ item[lang] }}
              </li>
            </ul>
            <div class="w-full vh_center" v-else>
              <div class="grey-60 text-sm">{{ t("No_Data") }}</div>
            </div>
          </div>
        </template>
      </DropDown>

      <DropDown placement="bottom" class="shink-0 dropdown">
        <template #label="{ open }">
          <IpButton :class="{ open: open }" type="border" class="label px-3">
            <div class="black between text-sm space-x-3 shrink-0 w-full h-9">
              <div :class="{ 'grey-60': !status_text }">{{ status_text || t("Status") }}</div>
              <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
            </div>
          </IpButton>
        </template>
        <template #menu>
          <ul class="menu box-border p-1 column text-sm" @click="statusChange">
            <li
              v-for="item in statusList"
              :key="item.value"
              :class="{ active: form.status === item.value }"
              class="menu_item px-2 rounded-md pointer transition-color v_center"
              :data-value="item.value"
            >
              {{ item.label }}
            </li>
          </ul>
        </template>
      </DropDown>

      <IpButton class="text-sm px-5 h-9 rounded-md" @click="Search">{{ $t("Search") }}</IpButton>

      <IpButton class="h-9 px-5" type="primary" @click="exportProxy" :disabled="exporting || loading">
        <div class="v_center space-x-2 text-sm">
          <Download v-show="!exporting" :size="15" />
          <span v-show="exporting" class="ip-loading"></span>
          <span>{{ t("Export") }}</span>
        </div>
      </IpButton>
    </div>
    <div class="w-full flex-1 min-h-0 box-border board rounded space-y-3">
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="ip" :label="$t('Ip_Address')" min-width="120"></el-table-column>
          <el-table-column prop="port" :label="$t('Port')" min-width="120"></el-table-column>
          <el-table-column prop="region_code" :label="$t('Locations')" min-width="120"></el-table-column>
          <el-table-column prop="username" :label="$t('Username')" min-width="120"></el-table-column>
          <el-table-column prop="password" :label="$t('Password')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('API_link')" min-width="120"></el-table-column>
          <el-table-column prop="create_time" :label="$t('Purchase_time')" min-width="120"></el-table-column>
          <el-table-column prop="expire_time" :label="$t('Expiration_time')" min-width="120"></el-table-column>
          <el-table-column :label="$t('Status')">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success">{{ $t("Normal") }}</el-tag>
              <el-tag v-if="scope.row.status === 2" type="danger">{{ $t("Expired") }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="$t('Remark')" min-width="120"></el-table-column>
          <el-table-column :label="$t('Action')" min-width="120">
            <template #default="scope">
              <ip-button v-if="scope.row.status === 1" :data-index="scope.$index" type="link" @click="renewal">{{ $t("Renewal") }}</ip-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination h-8 w-full">
        <div class="w-full flex justify-end">
          <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="size"
            :current-page="page"
            :page-sizes="[10, 25, 50]"
            :layout="layout"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 支付 控件 -->
    <PayPopup ref="payPopupRef" v-model="isPayPopup" :order_data="order_data" />
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, reactive, ref } from "vue"
import IpInput from "@/components/input/input.vue"
import IpButton from "@/components/button/button.vue"
import DropDown from "@/components/dropdown/dropdown.vue"
import { useI18n } from "vue-i18n"
import { ChevronDown, Download } from "lucide-vue-next"
import { debounce } from "../../../../utils/tools"
import { platCustomerStaticIps, platCustomerOrdersRenewal } from "@/api/product"
import IpTag from "@/components/tag/tag.vue"
import Message from "@/components/message/message"
import { platProductRegions } from "@/api/product"
import settingStore from "../../../../store/setting"
import position from "@/components/dialog/position"
import PayPopup from "@/views/front/components/pay_popup/pay_popup.vue"

const layout = inject("paginationLayout")

const { t } = useI18n()
const { en, lang } = settingStore()

// 表单
const form = reactive({
  ip: "",
  region: "all",
  status: 0,
})
function Search() {
  page.value = 1
  getTableData()
}

// 状态筛选
const statusList = ref([
  { label: t("All") + " " + t("Status"), value: 0 },
  { label: t("Normal"), value: 1 },
  { label: t("Expired"), value: 2 },
])
const status_text = computed(() => {
  return statusList.value.find((i) => i.value === form.status)?.label ?? ""
})
function statusChange(e) {
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
  form.status = +value
}

// 获取区域
const regionsList = ref([])
async function getRegions() {
  const { data } = await platProductRegions()
  const all = {
    value: "all",
    country: "",
    zh: "全部区域",
    en: "All Locations",
  }
  const target = data.map((item) => ({
    value: item.code,
    country: item.country,
    zh: item.city_cn,
    en: item.city,
  }))
  regionsList.value = [all, ...target]
}

// 区域筛选
const filterRegionsList = ref(regionsList)
function filterRegion(area) {
  const reg = new RegExp(area, "g")
  filterRegionsList.value = regionsList.value.filter((item) => reg.test(item[lang.value]))
}
const debounceFilterRegion = debounce(filterRegion, 300)
// const area_text = ref("")
const area_text = computed(() => {
  return regionsList.value.find((i) => i.value === form.region)?.[lang.value] ?? ""
})
function regionChange(e) {
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
  form.region = value

  // area_text.value = regionsList.value.find((item) => item.value === value)?.[lang.value] ?? ""
}

// 表格数据
const tableData = ref([])
const loading = ref(false)
async function getTableData() {
  try {
    loading.value = true
    const { data } = await platCustomerStaticIps({
      page_index: page.value,
      page_size: size.value,
      keywords: form.ip,
      region_code: form.region !== "all" ? form.region : "",
      status: form.status !== 0 ? form.status : "",
    })
    total.value = data.count
    tableData.value = data.list
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerStaticIps failed",
    })
  }
}

// 分页
const total = ref(10)
const page = ref(1)
const size = ref(10)
function handleCurrentChange(val) {
  page.value = val
  getTableData()
}
function handleSizeChange(val) {
  size.value = val
  getTableData()
}

// 导出数据
const exporting = ref(false)
async function exportProxy() {
  if (loading.value || exporting.value) return
  if (total.value <= 0) {
    Message({
      type: "warning",
      message: en.value ? "No data available for export!" : "暂无数据可供导出！",
    })
    return
  }
  try {
    exporting.value = true
    const {
      data: { list },
    } = await platCustomerStaticIps({
      page_index: 1,
      page_size: total.value,
      keywords: form.ip,
      region_code: form.region !== "all" ? form.region : "",
      status: form.status !== 0 ? form.status : "",
    })

    const text = list.reduce((pre, next) => {
      pre += (pre.length > 0 ? "\n" : "") + `${next.ip}:${next.port}:${next.username}:${next.password}`
      return pre
    }, "")

    // 导出文件
    const blob = new Blob([text], { type: "text/txt" })
    const filename = `${t("List_of_Proxies")}_${list.length}.txt`
    const {
      default: { saveAs },
    } = await import(/* webpackChunkName: 'file-saver' */ "file-saver")

    saveAs(blob, filename)

    exporting.value = false

    Message({
      type: "success",
      message: en.value ? "Export Successful!" : "导出成功！",
    })
  } catch (error) {
    exporting.value = false
    console.log(error.message)
    Message({
      type: "warning",
      message: "Download failed",
    })
  }
}

// 续费
async function renewal(e) {
  try {
    const { index } = e.target.dataset
    if (!index) return
    position.set({ x: e.clientX, y: e.clientY })

    const { id } = tableData.value[+index]
    const { data } = await platCustomerOrdersRenewal({
      id,
    })

    toPay(data)
  } catch (error) {
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerStaticIps failed",
    })
  }
}

// 支付订单
const isPayPopup = ref(false)
const order_data = ref(null)
const payPopupRef = ref(null)
function toPay(data) {
  order_data.value = {
    order_usdt_price: data.order_usdt_price,
    desc_3: "",
    desc_4: data.product_name,
    order_price: data.order_price,
    order_no: data.order_no,
  }
  isPayPopup.value = true
  nextTick(() => {
    payPopupRef.value.toggleDetail(false)
  })
}

onMounted(() => {
  getTableData()
  getRegions()
})
</script>

<style lang="less" scoped>
.dropdown {
  .label {
    width: 160px;
  }
  .menu {
    width: 160px;
    .menu_item {
      width: 100%;
      height: 2.5rem;
      &:hover {
        // color: hsl(var(--primary));
        background-color: hsl(var(--primary) / 7%);
      }
    }
    .menu_item.active {
      color: hsl(var(--primary));
    }
  }
}
.rotate180 {
  transform: rotate(180deg);
}
.table_box {
  height: 100%;
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
