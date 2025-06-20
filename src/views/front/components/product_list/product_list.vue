<template>
  <div class="pc-product_list">
    <!-- tabbar 个人 企业 -->
    <Tabbar @select="changeActive" v-if="tabbar"></Tabbar>

    <!-- introduce 介绍 -->
    <!-- <ul v-if="vantage" class="vantage vh_center">
      <li><img src="@/assets//pc_img/home_img/vantage.png" alt="" /> {{ t("PCProductList.vantage[0]") }}</li>
      <li><img src="@/assets//pc_img/home_img/vantage.png" alt="" /> {{ t("PCProductList.vantage[1]") }}</li>
      <li><img src="@/assets//pc_img/home_img/vantage.png" alt="" /> {{ t("PCProductList.vantage[2]") }}</li>
      <li><img src="@/assets//pc_img/home_img/vantage.png" alt="" /> {{ t("PCProductList.vantage[3]") }}</li>
    </ul> -->
    <div class="list" :style="{ 'max-width': maxWidth }">
      <div v-if="product_list.length" class="priceList" ref="productRef" @wheel="scrollPlugin">
        <ul class="flex gap-3">
          <li v-for="item in product_list" :key="item.id" :class="item.hot ? 'popular' : 'common'" class="transition-color">
            <div class="card column_center space-y-5 lg:space-y-10">
              <div class="top w-full column_center space-y-4" :class="{ top_unlimit: item.unlimit }">
                <div class="package_name vh_center rounded-full">
                  <span v-if="item.trial || item.unlimit">{{ item.name }}</span>
                  <div v-else class="column_center">
                    <strong class="text-base md:text-xl font-semibold">{{ item.pack_title.split(" ")[0] }}</strong>
                    <span>{{ item.pack_title.split(" ")[1] }}</span>
                  </div>
                </div>

                <!-- 折扣 -->
                <p class="font-medium lg:font-semibold">
                  {{ item.trial ? t("Free") : item.discount_rate + "%" + t("OFF") }}
                </p>

                <!-- 免费 -->
                <!-- <template v-if="item.trial">
                  <p class="price">
                    {{ item.pack_title.split(" ")[0] }}<em>{{ item.pack_title.split(" ")[1] }}</em>
                  </p>
                  <p class="delete">{{ t("PCProductList.freeText") }}</p>
                  <p class="total">
                    <em>{{ t("PCProducts.tableHeader.duration") }}: </em>
                    <strong>{{ item.prices[0].days }} {{ t("PCProductList.Day") }}</strong>
                  </p>
                </template> -->
                <!-- 不限量 -->
                <!-- <template v-else-if="item.unlimit">
                  <p class="price" style="margin: 36px 0 10px">
                    ${{ item.prices[item.select].price / 100 }} <span>${{ item.prices[item.select].origin_price / 100 }}</span>
                  </p>
                </template> -->
                <!-- 个人 企业 -->
                <!-- <template v-else> -->
                <p class="price text-2xl lg:text-4xl space-x-1">
                  <strong>${{ item.prices[item.select].unit_price / 100 }}</strong>
                  <span class="text-sm">/GB</span>
                </p>
                <p class="total vh_center space-x-1">
                  <span class="lg:text-xl">{{ t("Total") }}:</span>
                  <span>${{ item.prices[item.select].price / 100 }}</span>
                </p>
                <div class="number w-full">
                  <setpNumber :list="item.prices" v-model:select="item.select"></setpNumber>
                </div>
                <!-- </template> -->
              </div>

              <!-- <p class="title v_center" v-if="item.unlimit">{{ t("PCProductList.unlimited_rights[0]") }}</p> -->

              <!-- <ul class="rights column space-y-5 text-sm font-medium" v-if="item.unlimit">
                <li class="v_center space-x-2">
                  <CircleCheck :size="16" class="flex-shrink-0" />
                  <p>{{ t("PCProductList.unlimited_rights[1]") }}</p>
                </li>
                <li class="v_center space-x-2">
                  <CircleCheck :size="16" class="flex-shrink-0" />
                  <p>{{ t("PCProductList.unlimited_rights[2]") }}</p>
                </li>
                <li class="v_center space-x-2">
                  <CircleCheck :size="16" class="flex-shrink-0" />
                  <p>{{ t("PCProductList.unlimited_rights[3]") }}</p>
                </li>
                <li class="v_center space-x-2">
                  <CircleCheck :size="16" class="flex-shrink-0" />
                  <p>{{ t("PCProductList.unlimited_rights[4]") }}</p>
                </li>
                <li class="v_center space-x-2">
                  <CircleCheck :size="16" class="flex-shrink-0" />
                  <p>{{ t("PCProductList.unlimited_rights[5]") }}</p>
                </li>
              </ul> -->

              <ul class="rights column space-y-5 text-xs lg:text-sm font-medium">
                <li class="v_center space-x-1">
                  <CircleCheck :size="20" class="flex-shrink-0 hidden lg:block" />
                  <p>{{ t("productList_spec.right1") }}</p>
                </li>
                <li class="v_center space-x-1">
                  <CircleCheck :size="20" class="flex-shrink-0 hidden lg:block" />
                  <p>{{ t("productList_spec.right2") }}</p>
                </li>
                <li class="hidden sm:v_center space-x-1">
                  <CircleCheck :size="20" class="flex-shrink-0 hidden lg:block" />
                  <p>{{ t("productList_spec.right3") }}</p>
                </li>
                <li class="hidden md:v_center space-x-1">
                  <CircleCheck :size="20" class="flex-shrink-0 hidden lg:block" />
                  <p>{{ t("productList_spec.right4") }}</p>
                </li>
                <li class="hidden lg:v_center space-x-1">
                  <CircleCheck :size="20" class="flex-shrink-0 hidden lg:block" />
                  <p>{{ t("productList_spec.right5") }}</p>
                </li>
              </ul>

              <IpButton @click="click_pay(item)" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                {{ item.trial ? t("Get") : t("Order") }}
              </IpButton>
            </div>

            <div class="hot text-center vh_center text-xs font-medium" v-if="item.hot">{{ t("Most_popular") }}</div>
            <div class="bg_img">
              <img src="@/assets/images/pricing/hover.png" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <!-- 骨架屏 -->
      <div v-else class="priceList column">
        <ul class="flex gap-3">
          <li class="skeletion_box" v-for="item in 6" :key="item">
            <div class="card skeletion space-y-5">
              <div style="width: 40%"></div>
              <div style="width: 100%" v-for="col in 12" :key="col"></div>
              <div style="width: 60%"></div>
            </div>
          </li>
        </ul>
      </div>
      <IpButton v-show="isLeft" type="ghost" circle class="arrow-btn rounded-full font-medium left" @click="scrollPluginValue('left')">
        <ChevronLeft :size="30" :stroke-width="2" />
      </IpButton>
      <IpButton v-show="isRight" type="ghost" circle class="arrow-btn rounded-full font-medium right" @click="scrollPluginValue('right')">
        <ChevronRight :size="30" :stroke-width="2" />
      </IpButton>
      <!-- div -->
    </div>

    <!-- 支付弹窗 -->
    <PayPopup ref="payPopupRef" v-model="isPayPopup" v-if="isPayPopup" :order_data="order_data">
      <template #detail>
        <div class="order_detail">
          <h2>{{ t("Order_detail") }}</h2>
          <ul class="detail">
            <li class="between">
              <span>{{ t("Traffic") }}</span>
              <span>{{ product?.pack_size }}</span>
            </li>
            <li class="between">
              <span>{{ t("payPopup_spec.unit_price") }}</span>
              <span v-if="product?.unit_price !== 0">${{ product?.unit_price / 100 }} / GB</span>
              <span v-else>--</span>
            </li>
            <li class="between">
              <span>{{ t("Discount") }}</span>
              <span>{{ product?.discount_rate }}%</span>
            </li>
            <li class="between">
              <span>{{ t("Duration") }}</span>
              <span>{{ product?.days }} {{ t("Day") }}</span>
            </li>
            <li class="between">
              <span>{{ t("Total") }}</span>
              <span>
                <i>${{ product?.origin_price / 100 }}</i> ${{ product?.price / 100 }}</span
              >
            </li>
          </ul>
          <div class="btn vh_center">
            <ip-button type="primary" class="px-3 h-10" @click="FoundOrder">
              <div class="v_center space-x-2">
                <span class="ip-loading" v-if="loading"></span>
                <span>{{ t("Submit") }}</span>
              </div>
            </ip-button>
          </div>
        </div>
      </template>
    </PayPopup>
  </div>
</template>

<script setup>
import PayPopup from "../pay_popup/pay_popup.vue"
import setpNumber from "./stepNumber/stepNumber.vue"
import { platProductsV2, platCustomerOrder } from "@/api/home"
import { debounce, throttle } from "@/utils/tools"
import loginStore from "@/store/login"
import { CircleCheck } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import Tabbar from "./tabbar/tabbar.vue"
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const props = defineProps({
  tabbar: {
    type: Boolean,
    default: true,
  },
  vantage: {
    type: Boolean,
    default: false,
  },
  pack: {
    type: Number,
    default: 5,
  },
})

const { token } = loginStore()
const router = useRouter()

const { t } = useI18n()

// 产品相关
const loading = ref(false)
const product_list = ref([])

let group1 = []
let group2 = []
let group3 = []
async function GetProductList() {
  try {
    const { data } = await platProductsV2()
    const tempGroup1 = []
    const tempGroup2 = []
    const tempGroup3 = []

    data.forEach((item) => {
      let dis = (item.prices[0].origin_price - item.prices[0].unit_price) / item.prices[0].origin_price
      dis = Math.round(dis * 100)

      if (item.is_sell === 0) {
        store.commit("setGift", item.pack_title)
      }

      const obj = {
        select: 0,
        id: item.id,
        trial: item.is_sell === 0,
        unlimit: item.group === 3,
        hot: item.promo_type === 1,
        discount: item.promo_type === 2,
        discount_rate: dis,
        name: item.name,
        code: item.code,
        pack_title: item.pack_title,
        ips: item.ips,
        sub_accounts: item.sub_accounts,
        sel_country: item.sel_country,
        prices: item.prices,
      }

      if (item.group === 1) {
        tempGroup1.push(obj)
      } else if (item.group === 2) {
        tempGroup2.push(obj)
      } else if (item.group === 3) {
        tempGroup3.push(obj)
      }
    })

    const index = tempGroup1.findIndex((item) => item.trial)
    if (index > 0) {
      const item = tempGroup1.splice(index, 1)
      if (!token.value) {
        tempGroup1.unshift(item[0])
      }
    }

    group1 = tempGroup1
    group2 = tempGroup2
    group3 = tempGroup3

    product_list.value = group1

    nextTick(() => {
      initScrollTag()
    })
  } catch (err) {
    console.log(err)
  }
}

// 切换tab
function changeActive(index) {
  const group = "group" + (index + 1)
  product_list.value = eval(group)
  nextTick(() => {
    initScrollTag()
  })
}

// 滑动相关
const productRef = ref(null)
const isLeft = ref(false)
const isRight = ref(false)
const packWidth = 210 + 14
const maxWidth = computed(() => {
  return props.pack * packWidth - 14 + "px"
})
const scrollPlugin = throttle(
  function (e) {
    if (/macintosh|mac os x/i.test(navigator.userAgent)) return

    const dom = productRef.value
    const width = dom.clientWidth
    const scrollWidth = dom.scrollWidth
    const scrollLeft = dom.scrollLeft

    if (e.deltaY > 0) {
      if (width + scrollLeft < scrollWidth - packWidth) {
        dom.scrollLeft += packWidth
      } else {
        dom.scrollLeft = scrollWidth - width
        requestAnimationFrame(() => {
          isRight.value = false
        })
      }
      if (width + scrollLeft < scrollWidth) {
        isLeft.value = true
        e.preventDefault()
      }
    } else {
      if (scrollLeft > packWidth) {
        dom.scrollLeft -= packWidth
      } else {
        dom.scrollLeft = 0
        requestAnimationFrame(() => {
          isLeft.value = false
        })
      }
      if (scrollLeft > 0) {
        isRight.value = true
        e.preventDefault()
      }
    }
  },
  150,
  true
)

function scrollPluginValue(op) {
  const dom = productRef.value
  const width = dom.clientWidth
  const scrollWidth = dom.scrollWidth
  const scrollLeft = dom.scrollLeft

  if (op === "right" && isRight.value) {
    if (width + scrollLeft < scrollWidth - packWidth) {
      dom.scrollLeft += packWidth
    } else {
      dom.scrollLeft = scrollWidth - width
      isRight.value = false
    }
    if (!isLeft.value) isLeft.value = true
  } else if (op === "left" && isLeft.value) {
    if (scrollLeft > packWidth) {
      dom.scrollLeft -= packWidth
    } else {
      dom.scrollLeft = 0
      isLeft.value = false
    }
    if (!isRight.value) isRight.value = true
  }
}

const initScrollTag = debounce(function () {
  const dom = productRef.value
  const width = dom.clientWidth
  const scrollWidth = dom.scrollWidth
  const scrollLeft = dom.scrollLeft

  if (scrollLeft > 0) {
    isLeft.value = true
  }
  if (width + scrollLeft < scrollWidth) {
    isRight.value = true
  } else if (width === scrollWidth) {
    isRight.value = false
    isLeft.value = false
  }
}, 100)

// 支付相关
const isPayPopup = ref(false)
const order_data = ref(null)
const payPopupRef = ref(null)
let product
function click_pay(item) {
  if (!token.value) {
    router.push("/login")
    Message({
      type: "warning",
      message: en.value ? "Please login first" : "请先登录",
    })
    return
  }

  const productData = {
    code: item.code,
    days: item.prices[item.select].days,
    discount_rate: item.discount_rate,
    unit_price: item.unlimit ? 0 : item.prices[item.select].unit_price,
    pack_size: item.unlimit ? t("Unlimited") : item.pack_title,
    price: item.prices[item.select].price,
    origin_price: item.prices[item.select].origin_price,
  }

  productData.origin_price = productData.price * (productData.discount_rate / 100) + productData.price
  productData.origin_price = Math.round(productData.origin_price)

  product = productData

  isPayPopup.value = true
}
async function FoundOrder() {
  loading.value = true
  const item = product
  try {
    const { data } = await platCustomerOrder({
      pcode: item.code,
      days: item.days,
    })

    order_data.value = {
      order_no: data.order_no,
      order_price: data.order_price,
      order_usdt_price: data.order_usdt_price,
      desc_3: item.pack_size,
      desc_4: "",
    }
  } finally {
    loading.value = false
    payPopupRef.value.toggleDetail(false)
  }
}

onMounted(() => {
  GetProductList()
  window.addEventListener("resize", initScrollTag)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", initScrollTag)
})
</script>

<style lang="less" scoped>
@import "./product_list.less";
</style>
