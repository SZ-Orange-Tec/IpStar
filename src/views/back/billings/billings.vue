<template>
  <div class="billings column h-full">
    <NavBar>
      <template #default="{ title }">
        <div class="white">{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main column flex-1 px-3 md:px-5">
      <!-- 购买订单 -->
      <div class="flex-1 w-full table_box">
        <el-table :data="tableData">
          <el-table-column prop="order" :label="$t('Order')" min-width="200"></el-table-column>
          <el-table-column prop="createTime" :label="$t('Place_order_time')" min-width="200"></el-table-column>
          <el-table-column prop="payTime" :label="$t('Payment_time')" min-width="200"></el-table-column>
          <el-table-column prop="days" :label="$t('Validity_period')" min-width="140"></el-table-column>
          <el-table-column prop="cost" :label="$t('Cost')" min-width="200"></el-table-column>
          <el-table-column prop="model" :label="$t('Products')" min-width="100"></el-table-column>
          <el-table-column prop="contain" :label="$t('Contain')" min-width="100"></el-table-column>
          <el-table-column prop="payment" :label="$t('Payment')" min-width="100">
            <template #default="scope">
              <p :class="scope.row.payment.class">{{ scope.row.payment.title }}</p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Operation')" min-width="120">
            <template #default="scope">
              <ip-button :data-index="scope.$index" type="link" class="px-3 h-8" @click="toPay">{{ $t("Pay") }}</ip-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <el-empty style="height: 100%" description="No Data" v-else></el-empty> -->

      <div class="pagination">
        <el-pagination
          class="pagination"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="size"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 支付 控件 -->
    <PayPopup ref="payPopupRef" v-model="isPayPopup" :order_data="order_data" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import { platCustomerOrders } from "@/api/layout"
import PayPopup from "@/views/front/components/pay_popup/pay_popup.vue"
import { useI18n } from "vue-i18n"
// import IpTable from "@/components/table/table.vue"
// import IpTableColumn from "@/components/table/table-column.vue"
// import IpPagination from "@/components/pagination/pagination.vue"
import NavBar from "../components/navbar/navbar.vue"
import IpButton from "@/components/button/button.vue"
import position from "@/components/dialog/position"

const { t } = useI18n()

// 响应式数据
const tableData = ref([])
const total = ref(40)
const page = ref(1)
const size = ref(10)
const loading = ref(false)

// el-table 样式渲染
function tableRowClassName({ row, rowIndex }) {
  if (rowIndex % 2 === 0) {
    return "two-row"
  }
}

// 获取客户订单
async function getClient() {
  loading.value = true
  const {
    data: { count, list },
  } = await platCustomerOrders({
    page_index: page.value,
    page_size: size.value,
  })
  total.value = count
  let newArr = list.map((item) => {
    return {
      order: item.order_no,
      createTime: item.create_time,
      payTime: item.pay_time,
      cost: `$ ${item.amount / 100}`,
      model: item.product_name,
      contain: item.package_title,
      textlist: [`Price:${item.amount / 100}/GB`, `${item.package_title} included`, item.amount],
      payment: {
        // url: item.is_paid === 1 ? require('@/assets/pc_img/layout_img/payment success.png') : item.is_paid === 0 ? require('@/assets/pc_img/layout_img/abnormal.png') : item.is_paid === 2 ? require('@/assets/pc_img/layout_img/await.png') : '',
        class: item.is_paid === 1 ? "succeed_img" : item.is_paid === 0 ? "error_img" : item.is_paid === 2 ? "warning_img" : "",
        title: item.is_paid === 1 ? t("Paid") : item.is_paid === 0 ? t("Unpaid") : item.is_paid === 2 ? t("Payment_confirmation") : "",
      },
      days: item.days + " " + t("Day"),
    }
  })
  tableData.value = newArr
  loading.value = false
}

// 当前处于第?页
function handleCurrentChange(val) {
  page.value = val
  getClient()
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
    order_no: data.order,
  }
  isPayPopup.value = true
  nextTick(() => {
    payPopupRef.value.toggleDetail(false)
  })
}

// 生命周期钩子
onMounted(() => {
  getClient()
})
</script>

<style lang="less" scoped>
@import url("./billings.less");
</style>
