<template>
  <div class="w-full space-y-5">
    <div class="w-full space-y-5 column">
      <strong class="text-lg font-medium">代理列表</strong>
    </div>

    <div class="table_box">
      <el-table :data="tableData" :height="500" v-loading="loading">
        <el-table-column prop="ip" label="IP"> </el-table-column>
        <el-table-column prop="port" :label="$t('Port')"> </el-table-column>
        <el-table-column prop="region_code" :label="$t('Locations')"> </el-table-column>
        <el-table-column prop="expire_time" :label="$t('Expiration_time')"> </el-table-column>
        <el-table-column :label="$t('Status')">
          <template #default="scope">
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
          layout="total, prev, pager, next, sizes, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { platCustomerStaticIps } from "@/api/product"
import { onMounted } from "vue"
import IpTag from "@/components/tag/tag.vue"
import { useI18n } from "vue-i18n"
import Message from "@/components/message/message"

const { t } = useI18n()

// 表格数据
const tableData = ref([])
const loading = ref(false)
async function getTableData() {
  try {
    loading.value = true
    const {
      data: { count, list },
    } = await platCustomerStaticIps({
      page_index: page.value,
      page_size: size.value,
    })
    count.value = count
    tableData.value = list
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
