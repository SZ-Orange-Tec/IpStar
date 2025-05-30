<template>
  <div class="pc-products">
    <!-- 产品列表 -->
    <div class="products_list" v-if="isProduc">
      <div class="ul_box">
        <productList :tabbar="true" :vantage="true" :pack="5"></productList>
      </div>
      <!-- <p @click=" $router.push('/help_document');$store.commit('setDocumentIdx', '0-2')" v-if="$store.state.user_info.is_purchase">
        {{ $t("PCProducts.p") }}
        <img src="../../../assets/pc_img/products_img/left arrows.png" alt="left arrows" />
      </p> -->
    </div>
    <!-- 购买记录表 -->
    <div class="purchase_record" v-if="tabTotal > 0 && !isProduc">
      <!-- <el-table highlight-current-row v-loading="loading" :row-class-name="tableRowClassName" :data="tableData" style="width: 100%">
        
        <el-table-column prop="size" :label="$t('PCProducts.tableHeader.size')" min-width="120"></el-table-column>
        <el-table-column prop="price" :label="$t('PCProducts.tableHeader.price')" min-width="120"></el-table-column>
        <el-table-column :label="$t('PCProducts.tableHeader.status')" min-width="120">
          <template #default="scope">
            <span v-if="scope.row.state==1" style="color:#0dbc79">{{ $t('PCProducts.tableBody.available') }}</span>
            <span v-else-if="scope.row.state==2" style="color:#f14c36">{{ $t('PCProducts.tableBody.used_up') }}</span>
            <span v-else-if="scope.row.state==3" style="color:#f14c36">{{ $t('PCProducts.tableBody.expired') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('PCProducts.tableHeader.consume')" min-width="240">
          <template #default="scope">
            <p v-if="scope.row.unlimited">{{ $t('PCProductList.unlimited') }}</p>
            <div v-else style="text-align: left;">
              <p style="text-align: center;">{{ scope.row.consumeText }}</p>
              <el-progress :percentage="scope.row.progress" color="#67c23a"></el-progress>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="days" :label="$t('PCProducts.tableHeader.duration')" min-width="120"></el-table-column>
        <el-table-column prop="start_time" :label="$t('PCProducts.tableHeader.start_date')" min-width="180"></el-table-column>
        <el-table-column prop="expire_time" :label="$t('PCProducts.tableHeader.expire_date')" min-width="180"></el-table-column>
      </el-table> -->
      <!-- 分页 -->
      <!-- <el-pagination class="pagination" @current-change="handleCurrentChange" :current-page="tabPage" :page-size="tabSize" layout="total, prev, pager, next, jumper" :total="tabTotal">
      </el-pagination> -->
      <!-- <a
        href="javascript:;"
        @click="
          $router.push('/help_document')
          $store.commit('setDocumentIdx', '0-2')
        "
        >{{ $t("PCProducts.a") }}</a
      > -->
    </div>
    <!-- 无购买记录 状态 -->
    <div class="null_commodity" v-else-if="!isProduc">
      <img src="../../../assets/pc_img/layout_img/null commodity.png" alt="null commodity" />
      <p>{{ $t("PCProducts.nullCommodity.p") }}</p>
      <!-- <el-button @click="$store.commit('layout/setIsProduc', true)"><img src="../../../assets/pc_img/layout_img/shopping trolley.png" alt="shopping trolley" />
        {{ $t('PCProducts.nullCommodity.btnText') }}</el-button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { platCustomerProductsV2 } from "@/api/layout"
import settingStore from "@/store/setting"
import layoutStore from "@/store/layout"
import productList from "@/views/front/components/product_list/product_list.vue"

const { lang } = settingStore()
const { isProduc } = layoutStore()

// 响应式数据
const total = ref(10)
const page = ref(1)
const size = ref(10)
const tableData = ref([])
const tabTotal = ref(10)
const tabPage = ref(1)
const tabSize = ref(10)
const loading = ref(false)

// computed

// 用户购买产品页数变化
function handleCurrentChange(val) {
  tabPage.value = val
  getProductClient()
}

// el-table 样式渲染
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
