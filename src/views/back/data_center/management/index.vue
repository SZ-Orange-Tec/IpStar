<template>
  <div class="board rounded space-y-5 p-5 column">
    <div class="w-full flex flex-wrap h-8 gap-3">
      <IpInput v-model="form.ip" :placeholder="t('Please_Enter') + ' IP'" class="h-9 rounded-md" />
      <!-- <el-select v-model="form.area" placeholder="" style="width: 160px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select> -->

      <DropDown placement="bottom" class="shink-0 dropdown">
        <template #label="{ open }">
          <IpButton :class="{ open: open }" type="border" class="label">
            <div class="black v_center text-sm space-x-3 shrink-0 w-full h-9 pr-3">
              <IpInput :border="false" v-model="area_text" :placeholder="t('Area')" class="h-full flex-1 rounded-md" />
              <ChevronDown :size="16" :class="{ rotate180: open }" class="transition-transform" />
            </div>
          </IpButton>
        </template>
        <template #menu>
          <ul class="menu box-border p-1 column text-sm" @click="statusChange">
            <li
              v-for="item in areaList"
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

      <IpButton class="text-sm px-5 h-9 rounded-md">{{ $t("Search") }}</IpButton>
    </div>
    <div class="w-full flex-1 min-h-0 box-border board rounded space-y-3">
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="size" :label="$t('Ip_Address')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Port')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Locations')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Username')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Password')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('API_link')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Purchase_time')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Expiration_time')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Remark')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Status')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Action')" min-width="120"></el-table-column>
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
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue"
import { platCustomerOrders } from "@/api/layout"
import IpInput from "@/components/input/input.vue"
import IpButton from "@/components/button/button.vue"
import DropDown from "@/components/dropdown/dropdown.vue"
import { useI18n } from "vue-i18n"
import { ChevronDown } from "lucide-vue-next"
import { debounce } from "../../../../utils/tools"

const { t } = useI18n()

// 表单
const form = reactive({
  ip: "",
  area: "",
  status: "",
})
function Search() {
  getTableData()
}

// 状态筛选
const statusList = ref([
  { label: t("Normal"), value: 0 },
  { label: t("Abnormal"), value: 1 },
])
const status_text = computed(() => {
  return statusList.value[form.status]?.label ?? ""
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
  console.log(form.status)
}

// 区域筛选
const areaList = [
  { label: t("Normal"), value: 0 },
  { label: t("Abnormal"), value: 1 },
]
const filterAreaList = ref(areaList)
function filterArea() {
  const area = area_text.value
  filterAreaList.value = areaList.filter((item) => item.label.includes(area))
}
const debounceFilterArea = debounce(filterArea, 300)
const area_text = ref("")
function areaChange(e) {
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
  form.area = value
}

// 表格数据
const loading = ref(false)
const tableData = ref([])
async function getTableData() {
  loading.value = true
  try {
    const {
      data: { count, list },
    } = await platCustomerOrders({
      page_index: page.value,
      page_size: size.value,
    })

    total.value = count

    const MB = 1024
    const GB = MB * 1024
    const TB = GB * 1024
    tableData.value = list.map((item) => {
      let consumeText = ""
      if (item.fconsume >= TB) {
        consumeText = Math.round((item.fconsume / TB) * 10) / 10 + "TB"
      } else if (item.fconsume >= GB) {
        consumeText = Math.round((item.fconsume / GB) * 10) / 10 + "GB"
      } else if (item.fconsume >= MB) {
        consumeText = Math.round((item.fconsume / MB) * 10) / 10 + "MB"
      }
      return {
        id: item.fid,
        name: item.fpname,
        size: item.fpacktitle,
        price: item.fprice / 100,
        state: item.fstatus,
        start_time: item.fstarttime,
        expire_time: item.fexpiretime,
        days: item.fexpiredays + " " + t("Day"),
        consume: item.fconsume,
        progress: Math.round((item.fconsume / item.fpacksize) * 100),
        consumeText,
        unlimited: item.fprdgroup === 3,
      }
    })
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
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

onMounted(() => {
  getTableData()
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
