<template>
  <div class="pc-billings">
    <div class="billings">
      <!-- 购买订单 -->
      <!-- <el-table
        v-if="tableData.length > 0"
        highlight-current-row
        v-loading="loading"
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="order" :label="$t('PCBillings.labels[0]')"></el-table-column>
        <el-table-column prop="createTime" :label="$t('PCBillings.labels[1]')"></el-table-column>
        <el-table-column prop="payTime" :label="$t('PCBillings.labels[6]')"></el-table-column>
        <el-table-column prop="days" :label="$t('PCProducts.tableHeader.duration')"></el-table-column>
        <el-table-column prop="cost" :label="$t('PCBillings.labels[2]')"></el-table-column>
        <el-table-column prop="model" :label="$t('PCBillings.labels[3]')"></el-table-column>
        <el-table-column prop="contain" :label="$t('PCBillings.labels[4]')"></el-table-column>
        <el-table-column prop="payment" :label="$t('PCBillings.labels[5]')">
          <template #default="scope">
            <p :class="scope.row.payment.class">{{ scope.row.payment.title }}</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('PCBillings.labels[7]')">
          <template #default="scope">
            <el-button @click="fn(scope.row)" :disabled="scope.row.payment.title !== $t('PCBillings.message[1]')">{{
              $t("PCBillings.btnTxt")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table> -->

      <!-- <el-empty style="height: 100%" description="No Data" v-else></el-empty> -->

      <!-- <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total"
        v-show="total > 10"
      >
      </el-pagination> -->
    </div>
    <!-- 支付 控件 -->
    <PayPopup ref="pay_popup" :order_data="order_data" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { platCustomerOrders } from "@/api/layout"
import PayPopup from "@/views/front/components/pay_popup/pay_popup.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

// 响应式数据
const tableData = ref([])
const total = ref(40)
const page = ref(1)
const size = ref(10)
const loading = ref(false)
const order_data = ref({})
const pay_popup = ref(null)

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
