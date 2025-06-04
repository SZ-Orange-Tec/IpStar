<template>
  <div class="pc-products">
    <!-- 产品列表 -->
    <div class="products_list" v-if="isProduc">
      <div class="ul_box">
        <productList :tabbar="true" :vantage="true" :pack="5"></productList>
      </div>
      <p @click="toUse" v-if="$store.state.user_info.is_purchase">
        {{ $t("PCProducts.p") }}
        <img src="../../../assets/pc_img/products_img/left arrows.png" alt="left arrows" />
      </p>
    </div>
    <!-- 购买记录表 -->
    <div class="purchase_record" v-if="tabTotal > 0 && !isProduc">
      <ip-table :data="tableData" style="width: 100%">
        <ip-table-column prop="size" :label="$t('PCProducts.tableHeader.size')" min-width="120"></ip-table-column>
        <ip-table-column prop="price" :label="$t('PCProducts.tableHeader.price')" min-width="120"></ip-table-column>
        <ip-table-column :label="$t('PCProducts.tableHeader.status')" min-width="120">
          <template #default="scope">
            <span v-if="scope.row.state == 1" style="color: #0dbc79">{{ $t("PCProducts.tableBody.available") }}</span>
            <span v-else-if="scope.row.state == 2" style="color: #f14c36">{{ $t("PCProducts.tableBody.used_up") }}</span>
            <span v-else-if="scope.row.state == 3" style="color: #f14c36">{{ $t("PCProducts.tableBody.expired") }}</span>
          </template>
        </ip-table-column>
        <ip-table-column :label="$t('PCProducts.tableHeader.consume')" min-width="240">
          <template #default="scope">
            <p v-if="scope.row.unlimited">{{ $t("PCProductList.unlimited") }}</p>
            <div v-else style="text-align: left">
              <p style="text-align: center">{{ scope.row.consumeText }}</p>
              <!-- <ip-progress :percentage="scope.row.progress" color="#67c23a"></ip-progress> -->
            </div>
          </template>
        </ip-table-column>
        <ip-table-column prop="days" :label="$t('PCProducts.tableHeader.duration')" min-width="120"></ip-table-column>
        <ip-table-column prop="start_time" :label="$t('PCProducts.tableHeader.start_date')" min-width="180"></ip-table-column>
        <ip-table-column prop="expire_time" :label="$t('PCProducts.tableHeader.expire_date')" min-width="180"></ip-table-column>
      </ip-table>
      <!-- 分页 -->
      <ip-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page="tabPage"
        :page-size="tabSize"
        layout="total, prev, pager, next, jumper"
        :total="tabTotal"
      >
      </ip-pagination>
      <a href="javascript:;" @click="toUse">{{ $t("PCProducts.a") }}</a>
    </div>
    <!-- 无购买记录 状态 -->
    <div class="null_commodity" v-else-if="!isProduc">
      <img src="../../../assets/pc_img/layout_img/null commodity.png" alt="null commodity" />
      <p>{{ $t("PCProducts.nullCommodity.p") }}</p>
      <ip-button type="primary" @click="toBuy" class="px-3 h-10">
        <div class="v_center space-x-2">
          <ShoppingCart :size="20" />
          <span>{{ $t("PCProducts.nullCommodity.btnText") }}</span>
        </div>
      </ip-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { platCustomerProductsV2 } from "@/api/layout"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import productList from "@/views/front/components/product_list/product_list.vue"
import IpButton from "@/components/button/button.vue"
import { ShoppingCart } from "lucide-vue-next"
import IpTable from "@/components/table/table.vue"
import IpTableColumn from "@/components/table/table-column.vue"
import IpPagination from "@/components/pagination/pagination.vue"
import { useRouter } from "vue-router"

const { lang, documentIdx } = settingStore()
const { isProduc } = layoutStore()

const router = useRouter()

// 响应式数据
const total = ref(10)
const page = ref(1)
const size = ref(10)
const tableData = ref([])
const tabTotal = ref(10)
const tabPage = ref(1)
const tabSize = ref(10)
const loading = ref(false)

function toUse() {
  router.push("/doc")
  documentIdx.value = "0-2"
}

function toBuy() {
  isProduc.value = true
}

// 用户购买产品页数变化
function handleCurrentChange(val) {
  tabPage.value = val
  getProductClient()
}

// ip-table 样式渲染
function tableRowClassName({ row, rowIndex }) {
  if (rowIndex % 2 === 0) {
    return "two-row"
  }
}

// 获取客户购买产品列表
async function getProductClient() {
  const {
    data: { count, list },
  } = await platCustomerProductsV2({
    page_index: tabPage.value,
    page_size: tabSize.value,
  })

  tabTotal.value = count

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
      days: item.fexpiredays + " " + store.state.t("PCProductList.days"),
      consume: item.fconsume,
      progress: Math.round((item.fconsume / item.fpacksize) * 100),
      consumeText,
      unlimited: item.fprdgroup === 3,
    }
  })
}

// 生命周期钩子
onMounted(() => {
  getProductClient()
})
</script>

<style lang="less" scoped>
@import url("./products.less");
</style>
