<template>
  <div class="box-border column board rounded p-5 space-y-3">
    <div class="v_center space-x-2">
      <el-date-picker v-model="day" :editable="false" :clearable="false" type="date" format="YYYY-MM-DD" style="width: 160px; height: 36px" />
      <IpButton type="primary" class="text-sm h-9 px-5" @click="getTableData">{{ t("Search") }}</IpButton>
    </div>
    <div class="table_box w-full">
      <el-table highlight-current-row v-loading="loading" :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="name" :label="t('PCProducts.tableHeader.name')"></el-table-column> -->
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="datetime" :label="t('Date')" min-width="100"></el-table-column>
        <el-table-column prop="pack_size" :label="t('Traffic')" min-width="100">
          <template #default="scope">
            <span :style="{ color: scope.row.log_type == 0 ? '#f14c36' : '#0dbc79' }">{{ scope.row.pack_size }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="new_ip_count" :label="t('overview_spec.Number_of_new_Ips')" min-width="200"></el-table-column>
        <el-table-column prop="request_ip_count" :label="t('overview_spec.Number_Of_IPs')" min-width="200"></el-table-column>
        <el-table-column prop="request_count" :label="t('overview_spec.Number_Of_Requests')" min-width="220"></el-table-column>
        <el-table-column :label="t('Type')" min-width="140">
          <template #default="scope">
            <span v-if="scope.row.log_type == 0" style="color: #f14c36">{{ t("overview_spec.consumption") }}</span>
            <span v-else-if="scope.row.log_type == 1" style="color: #0dbc79">{{ t("overview_spec.recharge") }}</span>
            <span v-else-if="scope.row.log_type == 2" style="color: #0dbc79">{{ t("overview_spec.rewards") }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="w-full pagination flex justify-end h-8">
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
import { onMounted, ref } from "vue"
import { CustomerBalances } from "../../../../api/layout"
import { format } from "date-fns"
import IpButton from "@/components/button/button.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

// 获取流量数据
const day = ref(new Date())
const tableData = ref([])
const loading = ref(false)
async function getTableData() {
  try {
    loading.value = true
    const { data } = await CustomerBalances({
      page_index: page.value,
      page_size: size.value,
      day_date: format(day.value, "yyyy-MM-dd"),
    })
    total.value = data.count

    const arr = data.list.map((item) => {
      item.pack_size = item.pack_size > 0 ? "+" + formatSizeUnits(item.pack_size) : "-" + formatSizeUnits(Math.abs(item.pack_size))
      return item
    })
    tableData.value = Object.freeze(arr)
  } catch (err) {
    console.log(err)
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
