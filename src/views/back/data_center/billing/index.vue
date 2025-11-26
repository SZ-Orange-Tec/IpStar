<template>
  <div class="w-full space-y-6 column">
    <div class="w-full box-border p-5 board rounded table_box space-y-3">
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column prop="order_no" :label="t('Order_Number')" min-width="140"></el-table-column>
          <el-table-column prop="package_name" :label="t('Product_Name')" min-width="140"></el-table-column>
          <el-table-column prop="num" :label="t('IP_Quantity')" min-width="140"></el-table-column>
          <el-table-column :label="t('Validity_Period')" min-width="120">
            <template #default="scope">
              <span v-if="scope.row.days < 0 || scope.row.days > 3560">{{ t("Never_Expire") }}</span>
              <span v-else>{{ scope.row.days }} {{ t("Days") }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="Bandwidth" :label="t('Bandwidth')" min-width="120"></el-table-column>
          <el-table-column prop="Concurrency" :label="t('Concurrency')" min-width="120"></el-table-column> -->
          <el-table-column prop="amount" :label="t('Order_Amount')" min-width="120"></el-table-column>
          <!-- <el-table-column prop="create_time" :label="t('Order_Date')" min-width="120"></el-table-column> -->
          <el-table-column prop="pay_time" :label="t('Payment_Date')" min-width="120"></el-table-column>
          <el-table-column :label="t('Status')" min-width="120">
            <template #default="scope">
              <div class="flex">
                <IpTag v-if="scope.row.status === 3" type="warn" class="rounded-full font-medium">{{ t("Timeout") }}</IpTag>
                <IpTag v-else-if="scope.row.is_paid == 0" type="netural" class="rounded-full font-medium">{{ t("Unpaid") }}</IpTag>
                <IpTag v-else-if="scope.row.is_paid == 1" type="success" class="rounded-full font-medium">{{ t("Paid") }}</IpTag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="size" :label="t('Action')" min-width="120">
            <template #default="scope">
              <ip-button v-if="scope.row.status === 0" :data-index="scope.$index" type="link" @click="toPay">{{ $t("Pay") }}</ip-button>
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
import { onMounted, ref, nextTick, inject } from "vue"
import { platCustomerOrders } from "@/api/layout"
import { useI18n } from "vue-i18n"
import IpButton from "@/components/button/button.vue"
import { formatSizeUnits } from "@/utils/tools"
import PayPopup from "@/views/front/components/pay_popup/pay_popup.vue"
import position from "@/components/dialog/position"
import IpTag from "@/components/tag/tag.vue"

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
    } = await platCustomerOrders({
      page_index: page.value,
      page_size: size.value,
      prd_type: 3,
    })

    total.value = count

    tableData.value = list.map((item) => {
      const days_txt = item.days > 3560 || item.days < 0 ? t("Never_Expire") : item.days + " " + t("Days")
      return {
        ...item,
        amount: "$ " + item.amount / 100,
        textlist: [`Price:${item.amount / 100}`, t("menu_spec.unlimited_proxy") + " " + days_txt, item.amount],
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

// 支付订单
const isPayPopup = ref(false)
const order_data = ref(null)
const payPopupRef = ref(null)
function toPay(e) {
  const { index } = e.target.dataset
  if (!index) return
  position.set({ x: e.clientX, y: e.clientY })

  const data = tableData.value[+index]
  order_data.value = {
    order_usdt_price: data.order_usdt_price,
    desc_3: "",
    desc_4: data.textlist[1],
    order_price: data.textlist[2],
    order_no: data.order_no,
  }
  isPayPopup.value = true
  nextTick(() => {
    payPopupRef.value.toggleDetail(false)
  })
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
