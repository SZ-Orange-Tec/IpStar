<template>
  <div class="pc-billings">
    <div class="billings">
      <!-- 购买订单 -->
      <ip-table :data="tableData" style="width: 100%">
        <ip-table-column prop="order" :label="$t('Order')"></ip-table-column>
        <ip-table-column prop="createTime" :label="$t('Place_order_time')"></ip-table-column>
        <ip-table-column prop="payTime" :label="$t('Payment_time')"></ip-table-column>
        <ip-table-column prop="days" :label="$t('Validity_period')"></ip-table-column>
        <ip-table-column prop="cost" :label="$t('Cost')"></ip-table-column>
        <ip-table-column prop="model" :label="$t('Products')"></ip-table-column>
        <ip-table-column prop="contain" :label="$t('Contain')"></ip-table-column>
        <ip-table-column prop="payment" :label="$t('Payment')">
          <template #default="scope">
            <p :class="scope.row.payment.class">{{ scope.row.payment.title }}</p>
          </template>
        </ip-table-column>
        <ip-table-column :label="$t('Operation')">
          <template #default="scope">
            <ip-button type="ghost" @click="fn(scope.row)">{{ $t("Pay") }}</ip-button>
          </template>
        </ip-table-column>
      </ip-table>

      <!-- <ip-empty style="height: 100%" description="No Data" v-else></ip-empty> -->

      <ip-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </ip-pagination>
    </div>
    <!-- 支付 控件 -->
    <PayPopup ref="pay_popup" v-if="order_data" :order_data="order_data" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { platCustomerOrders } from "@/api/layout"
import PayPopup from "@/views/front/components/pay_popup/pay_popup.vue"
import { useI18n } from "vue-i18n"
import IpTable from "@/components/table/table.vue"
import IpTableColumn from "@/components/table/table-column.vue"
import IpPagination from "@/components/pagination/pagination.vue"

const { t } = useI18n()

// 响应式数据
const tableData = ref([])
const total = ref(40)
const page = ref(1)
const size = ref(10)
const loading = ref(false)
const order_data = ref(null)
const pay_popup = ref(null)

// ip-table 样式渲染
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
        title:
          item.is_paid === 1
            ? t("PCBillings.message[0]")
            : item.is_paid === 0
            ? t("PCBillings.message[1]")
            : item.is_paid === 2
            ? t("PCBillings.message[2]")
            : "",
      },
      days: item.days + " " + t("PCProductList.days"),
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
function fn(data) {
  console.log(data, "data")
  order_data.value = {
    order_usdt_price: data.order_usdt_price,
    desc_3: data.textlist[0],
    desc_4: data.textlist[1],
    order_price: data.textlist[2],
    order_no: data.order,
  }
  pay_popup.value.isDetail = false
  pay_popup.value.isShow = true
}

// 生命周期钩子
onMounted(() => {
  getClient()
})
</script>

<style lang="less" scoped>
@import url("./billings.less");
</style>
