<template>
  <div class="products column h-full">
    <NavBar>
      <template #default="{ title }">
        <div>{{ title }}</div>
      </template>
    </NavBar>

    <div class="w-full main flex-1">
      <!-- 产品列表 -->
      <div class="product_box column_center space-y-10" v-if="isProduc">
        <div class="w-full">
          <productList :tabbar="true" :vantage="false" :pack="5"></productList>
        </div>
        <ip-button @click="toUse" type="ghost" class="px-3 h-10" v-if="is_purchase">
          <div class="v_center">
            <p>{{ $t("product_spec.purchase") }}</p>
            <CircleChevronRight :size="20" />
          </div>
        </ip-button>
      </div>

      <!-- 购买记录表 -->
      <div class="h-full column space-y-5" v-else-if="tabTotal > 0 && !isProduc">
        <div class="table flex-1 w-full">
          <el-table :data="tableData" style="width: 100%; height: 100%">
            <el-table-column prop="size" :label="$t('Size')" min-width="120"></el-table-column>
            <el-table-column prop="price" :label="$t('Price')" min-width="120"></el-table-column>
            <el-table-column :label="$t('Status')" min-width="120">
              <template #default="scope">
                <span v-if="scope.row.state == 1" style="color: #0dbc79">{{ $t("PCProducts.tableBody.available") }}</span>
                <span v-else-if="scope.row.state == 2" style="color: #f14c36">{{ $t("PCProducts.tableBody.used_up") }}</span>
                <span v-else-if="scope.row.state == 3" style="color: #f14c36">{{ $t("PCProducts.tableBody.expired") }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Consume')" min-width="240">
              <template #default="scope">
                <p v-if="scope.row.unlimited">{{ $t("PCProductList.unlimited") }}</p>
                <div v-else style="text-align: left">
                  <p style="text-align: center">{{ scope.row.consumeText }}</p>
                  <el-progress :percentage="scope.row.progress" color="#67c23a"></el-progress>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="days" :label="$t('Duration')" min-width="120"></el-table-column>
            <el-table-column prop="start_time" :label="$t('Start_date')" min-width="180"></el-table-column>
            <el-table-column prop="expire_time" :label="$t('Expire_date')" min-width="180"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="w-full between p-3">
          <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page="tabPage"
            :page-size="tabSize"
            layout="total, prev, pager, next, jumper"
            :total="tabTotal"
          >
          </el-pagination>

          <ip-button type="ghost" class="px-3 h-10 text-sm" @click="toUse">{{ $t("product_spec.purchase") }}</ip-button>
        </div>
      </div>

      <!-- 无购买记录 状态 -->
      <div class="h-full column_center space-y-4" v-else-if="!isProduc" style="justify-content: center">
        <img src="@/assets/images/products/empty.png" width="256" alt="null commodity" />
        <p>{{ $t("product_spec.no") }}</p>
        <ip-button type="primary" @click="toBuy" class="px-3 h-10">
          <div class="v_center space-x-2">
            <ShoppingCart :size="20" />
            <span>{{ $t("Buy_now") }}</span>
          </div>
        </ip-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { platCustomerProductsV2 } from "@/api/layout"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import userStore from "@/store/user"
import productList from "@/views/front/components/product_list/product_list.vue"
import IpButton from "@/components/button/button.vue"
import { ShoppingCart } from "lucide-vue-next"
// import IpTable from "@/components/table/table.vue"
// import IpTableColumn from "@/components/table/table-column.vue"
// import IpPagination from "@/components/pagination/pagination.vue"
import { useRouter } from "vue-router"
import NavBar from "../components/navbar/navbar.vue"
import { useI18n } from "vue-i18n"
import { CircleChevronRight } from "lucide-vue-next"

const { lang, documentIdx } = settingStore()
const { isProduc } = layoutStore()
const { is_purchase } = userStore()
const { t } = useI18n()

const router = useRouter()

watch(isProduc, (newVal) => {
  console.log("update,", newVal)
})

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
      days: item.fexpiredays + " " + t("Day"),
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
