<template>
  <div class="w-full space-y-6 column">
    <div class="w-full box-border p-5 board rounded table_box space-y-3">
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="size" :label="t('Size')" min-width="120"></el-table-column>
          <el-table-column prop="price" :label="t('Price')" min-width="120"></el-table-column>
          <el-table-column :label="t('Status')" min-width="120">
            <template #default="scope">
              <span v-if="scope.row.state == 1" style="color: #0dbc79">{{ t("Available") }}</span>
              <span v-else-if="scope.row.state == 2" style="color: #f14c36">{{ t("Used_up") }}</span>
              <span v-else-if="scope.row.state == 3" style="color: #f14c36">{{ t("Expired") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="concurrency" :label="t('Concurrency')" min-width="240"></el-table-column>
          <el-table-column prop="bandwidth" :label="t('Bandwidth')" min-width="240"></el-table-column>
          <el-table-column prop="days" :label="t('Duration')" min-width="120"></el-table-column>
          <el-table-column prop="start_time" :label="t('Start_date')" min-width="180"></el-table-column>
          <el-table-column prop="expire_time" :label="t('Expire_date')" min-width="180"></el-table-column>
          <el-table-column :label="$t('Operate')" min-width="100">
            <template #default>
              <ip-button type="link" @click="toUse">{{ $t("Go_Use") }}</ip-button>
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
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue"
import { platCustomerProductsV2 } from "@/api/product"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { useRouter } from "vue-router"
const layout = inject("paginationLayout")

const { t } = useI18n()
// 表格数据
const loading = ref(false)
const tableData = ref([])
async function getTableData() {
  loading.value = true
  try {
    const {
      data: { count, list },
    } = await platCustomerProductsV2({
      page_index: page.value,
      page_size: size.value,
      prd_type: 1,
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

// 去使用
const router = useRouter()
function toUse() {
  router.push("/proxy?type=1")
}

onMounted(() => {
  console.log("unlimited_proxy mounted")
  getTableData()
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
