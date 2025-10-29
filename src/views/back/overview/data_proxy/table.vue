<template>
  <div class="w-full space-y-5">
    <div class="w-full space-y-5 column">
      <strong class="text-lg font-medium">代理列表</strong>
    </div>

    <div class="table_box">
      <el-table :data="tableData" :height="500">
        <el-table-column prop="ip" label="IP"> </el-table-column>
        <el-table-column prop="note" :label="$t('Port')"> </el-table-column>
        <el-table-column prop="date" :label="$t('Locations')"> </el-table-column>
        <el-table-column prop="date" :label="$t('Expiration_time')"> </el-table-column>
        <el-table-column prop="date" :label="$t('Status')"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

// 表格数据
const tableData = ref([])
async function getTableData() {
  const {
    data: { count, list },
  } = await platCustomerWhitelist({
    page_index: page,
    page_size: size,
  })
  this.count = count
  this.tableData = list.map((item) => {
    return {
      ip: item.ip,
      note: item.remark,
      date: item.create_time,
      id: item.id,
    }
  })
}
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
