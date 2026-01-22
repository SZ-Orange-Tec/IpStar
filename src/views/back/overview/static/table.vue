<template>
  <div class="w-full space-y-5">
    <div class="w-full between">
      <strong class="text-lg font-medium">{{ t("Proxy_List") }}</strong>
      <IpButton class="h-9 px-4" type="primary" @click="exportProxy" :disabled="exporting || loading">
        <div class="v_center space-x-2 text-sm">
          <Download v-show="!exporting" :size="15" />
          <span v-show="exporting" class="ip-loading"></span>
          <span>{{ t("Export") }}</span>
        </div>
      </IpButton>
    </div>

    <div class="table_box">
      <el-table :data="tableData" :height="500" v-loading="loading">
        <el-table-column prop="address" :label="$t('Address')" min-width="160"></el-table-column>
        <el-table-column prop="port" :label="$t('Port') + '(S5/HTTP)'" min-width="160"></el-table-column>
        <el-table-column prop="username" :label="$t('Username')" min-width="160"></el-table-column>
        <el-table-column prop="password" :label="$t('Password')" min-width="120"></el-table-column>
        <el-table-column prop="region_code" :label="$t('Locations')" min-width="90"></el-table-column>
        <el-table-column prop="expire_time" :label="$t('Expiration_time')" min-width="160"></el-table-column>
        <el-table-column :label="$t('Status')" min-width="140">
          <template #default="scope">
            <div class="v_center space-x-2" v-if="scope.row.status === 0">
              <el-tag type="info">{{ $t("Allocating") }}</el-tag>
              <el-popover placement="top" width="300" trigger="hover">
                <div>
                  <p>{{ $t("overview_spec.allocate_tip") }}</p>
                </div>
                <template #reference>
                  <Info :size="16" color="hsl(var(--primary))" class="pointer" />
                </template>
              </el-popover>
            </div>
            <el-tag v-if="scope.row.status === 1" type="success">{{ $t("Normal") }}</el-tag>
            <el-tag v-if="scope.row.status === 2" type="danger">{{ $t("Expired") }}</el-tag>
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

    <div v-if="curl" class="pb-10">
      <CodeItem :label="t('overview_spec.static_quick_test')" :text="curl"></CodeItem>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import { platCustomerStaticIps2 } from "@/api/product"
import { onMounted } from "vue"
import { Info } from "lucide-vue-next"
import IpTag from "@/components/tag/tag.vue"
import { useI18n } from "vue-i18n"
import Message from "@/components/message/message"
import { Download } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import settingStore from "../../../../store/setting"
import CodeItem from "../residential_proxy/codeItem.vue"

const layout = inject("paginationLayout")

const { t } = useI18n()
const { en } = settingStore()

// 表格数据
const tableData = ref([])
const loading = ref(false)
async function getTableData() {
  try {
    loading.value = true
    const {
      data: { count, list },
    } = await platCustomerStaticIps2({
      page_index: page.value,
      page_size: size.value,
    })
    total.value = count
    tableData.value = list.map((item) => {
      const allocating = item.status === 0
      if (!curl.value && !allocating) {
        curl.value = `curl --socks5 ${item.username}:${item.password}@${item.ip}:${item.port} https://ipinfo.io`
      }
      return {
        id: item.id,
        address: allocating ? "*" : item.ip,
        port: allocating ? "*" : "9135 / 9139",
        username: allocating ? "*" : item.username,
        password: allocating ? "*" : item.password,
        region_code: item.region_code,
        expire_time: item.expire_time,
        create_time: item.create_time,
        status: item.status,
      }
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error.message)
    Message({
      type: "warning",
      message: "platCustomerStaticIps2 failed",
    })
  }
}

// 分页
const total = ref(10)
const page = ref(1)
const size = ref(10)
const curl = ref("")
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
    } = await platCustomerStaticIps2({
      page_index: 1,
      page_size: total.value,
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

onMounted(() => {
  getTableData()
})
</script>

<style lang="less" scoped>
.table_box {
  width: 100%;
  :deep(.el-table) {
    border: 1px solid #ebeef5;
    thead {
      .el-table__cell {
        background-color: #f2f3f5;
        .cell {
          color: hsl(var(--foreground));
        }
      }
    }
  }
}
</style>
