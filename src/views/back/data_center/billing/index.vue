<template>
  <div class="w-full space-y-6 column">
    <div class="w-full box-border p-5 board rounded table_box space-y-3">
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="size" :label="$t('Order_number')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Product_name')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('IP_quantity')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Duration')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Order_amount')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Payment_time')" min-width="120"></el-table-column>
          <el-table-column prop="size" :label="$t('Expiration_time')" min-width="120"></el-table-column>
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
import { onMounted, ref } from "vue"
import { platBillingDataProxy } from "@/api/product"

// 表格数据
const loading = ref(false)
const tableData = ref([])
async function getTableData() {
  loading.value = true
  try {
    const {
      data: { count, list },
    } = await platBillingDataProxy({
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
