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
    <div class="list">
      <div v-if="product_list.length" class="priceList" ref="productRef" @wheel="scrollPlugin">
        <ul class="flex gap-3">
          <li
            v-for="(item, index) in product_list"
            :key="item.id"
            :class="[{ hidden: !showGift && item.trial }, item.hot ? 'popular' : 'common']"
            class="transition-color"
          >
            <div class="card column_center space-y-5 lg:space-y-10">
              <div class="top w-full column_center space-y-4" :class="{ top_unlimit: item.unlimit }">
                <div class="package_name vh_center rounded-full">
                  <span v-if="item.trial">{{ t("Trial") }}</span>
                  <span v-if="item.unlimit">{{ item.name }}</span>
                  <div v-else class="column_center text-base md:text-xl font-semibold">
                    {{ item.pack_title }}
                    <!-- <strong class="">{{ item.pack_title.split(" ")[0] }}</strong>
                    <span>{{ item.pack_title.split(" ")[1] }}</span> -->
                  </div>
                </div>

                <!-- 折扣 -->
                <p class="font-medium lg:font-semibold" style="height: 1.5rem">
                  <template v-if="item.trial">{{ t("Free") }}</template>
                  <template v-else-if="item.prices[item.select]?.discount > 0"
                    >{{ item.prices[item.select]?.discount + "%" }} {{ t("OFF") }}</template
                  >
                  <template v-else>{{ item.name }}</template>
                </p>

                <!-- 免费 -->
                <template v-if="item.trial">
                  <p class="price text-2xl lg:text-4xl space-x-1">
                    <strong>{{ item.pack_title.split(" ")[0] }}</strong>
                    <span class="text-sm">{{ item.pack_title.split(" ")[1] }}</span>
                  </p>
                  <p class="total vh_center space-x-1">
                    <span>{{ t("Total") }}:</span>
                    <span>$0</span>
                  </p>
                  <div class="number w-full">
                    <div class="duration text-center space-x-1 text-sm">
                      <span>{{ t("Duration") }}:</span>
                      <span class="font-bold text-base">30 {{ t("Day") }}</span>
                    </div>
                  </div>
                </template>
                <!-- 不限量 -->
                <!-- <template v-else-if="item.unlimit">
                  <p class="price" style="margin: 36px 0 10px">
                    ${{ item.prices[item.select].price / 100 }} <span>${{ item.prices[item.select].origin_price / 100 }}</span>
                  </p>
                </template> -->
                <!-- 个人 企业 -->
                <template v-else>
                  <p class="price text-2xl lg:text-4xl space-x-1">
                    <strong>${{ item.prices[item.select].unit_price / 100 }}</strong>
                    <span class="text-sm">/GB</span>
                  </p>
                  <p class="total vh_center space-x-1">
                    <span>{{ t("Total") }}:</span>
                    <span>${{ item.prices[item.select].price / 100 }}</span>
                  </p>
                  <div class="number w-full">
                    <div v-if="item.prices.length === 1" class="duration text-center space-x-1 text-sm">
                      <span v-if="item.prices[0].days > 3650" class="font-medium text-base">{{ t("productList_spec.Never_Expires") }}</span>
                      <span v-else class="font-bold text-base">{{ item.prices[0].days }} {{ t("Day") }}</span>
                    </div>
                    <setpNumber v-else :list="item.prices" v-model:select="item.select"></setpNumber>
                  </div>
                </template>
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

              <IpButton @click="click_pay" :data-index="index" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                {{ item.trial ? t("Get") : t("Order") }}
              </IpButton>
            </div>

            <div class="hot text-center text-xs vh_center font-medium whitespace-pre-wrap" v-if="item.hot">{{ t("Most_popular") }}</div>
            <div class="bg_img">
              <img src="@/assets/images/pricing/hover.png" alt="" />
            </div>
          </li>
          <li v-if="showContact && isLogin" class="common">
            <div class="card column_center space-y-5 lg:space-y-10">
              <div class="top w-full column_center space-y-4">
                <div class="package_name vh_center rounded-full">
                  <div>{{ t("productList_spec.Need_more") }}?</div>
                </div>

                <!-- 折扣 -->
                <p class="font-medium lg:font-semibold" style="height: 1.5rem">{{ t("productList_spec.Extra_discount") }}</p>

                <!-- 免费 -->
                <div
                  class="whitespace-nowrap font-semibold text-xl w-full space-y-5"
                  :class="en ? 'lg:text-xl column' : 'lg:text-2xl column_center'"
                  style="margin-top: 2rem"
                >
                  <span>{{ t("productList_spec.Custom1") }}</span>
                  <span>{{ t("productList_spec.Custom2") }}</span>
                  <span>{{ t("productList_spec.Custom3") }}</span>
                </div>
              </div>

              <IpButton @click="openService" :data-index="index" type="link" circle class="text-sm border-btn rounded-full px-4 font-medium">
                {{ t("productList_spec.Service") }}
              </IpButton>
            </div>
            <div class="bg_img">
              <img src="@/assets/images/pricing/hover.png" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <!-- 骨架屏 -->
      <div v-else class="priceList column">
        <ul class="flex gap-3">
          <li class="skeletion_box" v-for="item in 5" :key="item">
            <div class="card skeletion space-y-5">
              <div style="width: 40%"></div>
              <div style="width: 100%" v-for="col in 12" :key="col"></div>
              <div style="width: 60%"></div>
            </div>
          </li>
        </ul>
      </div>
      <IpButton v-show="isLeft" type="ghost" circle class="arrow-btn rounded-full font-medium left" @click="scrollPluginValue('left')">
        <ChevronLeft :size="20" :stroke-width="2" />
      </IpButton>
      <IpButton v-show="isRight" type="ghost" circle class="arrow-btn rounded-full font-medium right" @click="scrollPluginValue('right')">
        <ChevronRight :size="20" :stroke-width="2" />
      </IpButton>
      <!-- div -->
    </div>

    <!-- 支付弹窗 -->
    <teleport to="body">
      <PayPopup ref="payPopupRef" v-model="isPayPopup" :order_data="order_data">
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
                <!-- <span v-if="product?.unit_price !== 0">${{ product?.unit_price / 100 }} / GB</span>
                <span v-else>--</span> -->
                <div class="v_center space-x-1">
                  <span>${{ product?.unit_price / 100 }}</span>
                  <span class="grey" style="text-decoration: line-through">${{ product?.origin_price / 100 }}</span>
                  <span> / GB</span>
                </div>
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
                  <!-- <i>${{ product?.origin_price / 100 }}</i>  -->
                  ${{ product?.price / 100 }}
                </span>
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
    </teleport>
  </div>
</template>

<script setup>
import PayPopup from "../pay_popup/pay_popup.vue"
import setpNumber from "./stepNumber/stepNumber.vue"
import { platProductsV2, platCustomerOrder, platDataConfig } from "@/api/home"
import { debounce, throttle, roundToDecimal } from "@/utils/tools"
import loginStore from "@/store/login"
import { CircleCheck } from "lucide-vue-next"
import IpButton from "@/components/button/button.vue"
import Tabbar from "./tabbar/tabbar.vue"
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue"
import { useRouter } from "vue-router"
import Message from "@/components/message/message"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import layoutStore from "@/store/layout"
import settingStore from "@/store/setting"
import position from "@/components/dialog/position"
import { track_createOrder } from "@/utils/detect"

const { en } = settingStore()

const props = defineProps({
  tabbar: {
    type: Boolean,
    default: true,
  },
  vantage: {
    type: Boolean,
    default: false,
  },
})

// 是否显示赠送gift
const { isLogin } = loginStore()
const { registerAward, gift } = layoutStore()
const showGift = computed(() => !isLogin.value && registerAward.value)

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

    let prices = null

    data.forEach((item) => {
      // 注册奖励不显示
      if (item.is_sell === 0) return

      // 第一个套餐作为折扣折算标准
      if (item.is_sell !== 0 && prices === null) {
        prices = item.prices.reduce((pre, next) => {
          pre[next.days] = next.unit_price
          return pre
        }, {})
      }

      if (item.is_sell === 0) {
        gift.value = item.pack_size
      } else {
        item.prices = item.prices.map((i) => {
          const key = String(i.days)
          const origin = prices[key]
          const price = i.unit_price
          i.discount = roundToDecimal(((origin - price) / origin) * 100, 0)
          i.origin_price = origin
          return i
        })
      }

      const obj = {
        select: 0,
        id: item.id,
        trial: item.is_sell === 0,
        unlimit: item.group === 3,
        hot: item.promo_type === 1,
        discount: item.promo_type === 2,
        // discount_rate: dis ?? 0,
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
      if (!isLogin.value) {
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
    console.log(err.message)
  }
}
// 获取全局配置
async function getDataConfig() {
  try {
    const { data } = await platDataConfig()
    registerAward.value = data.register_award
  } catch (err) {
    console.log(err)
  }
}

// 切换tab
const showContact = ref(false)
function changeActive(index) {
  showContact.value = index === 1

  const group = "group" + (index + 1)
  product_list.value = eval(group)
  nextTick(() => {
    initScrollTag()
  })
}
function openService() {
  window.$crisp.push(["do", "chat:open"])
}

// 滑动相关
const productRef = ref(null)
const isLeft = ref(false)
const isRight = ref(false)
const packWidth = 210
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
function click_pay(e) {
  position.set({ x: e.clientX, y: e.clientY })

  const index = +e.target.dataset.index
  const item = product_list.value[index]

  if (!isLogin.value) {
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
    discount_rate: item.prices[item.select].discount,
    unit_price: item.unlimit ? 0 : item.prices[item.select].unit_price,
    pack_size: item.unlimit ? t("Unlimited") : item.pack_title,
    price: item.prices[item.select].price,
    origin_price: item.prices[item.select].origin_price,
  }

  // productData.origin_price = productData.price * (productData.discount_rate / 100) + productData.price
  // productData.origin_price = Math.round(productData.origin_price)

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

    track_createOrder()
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
  getDataConfig()
  GetProductList()
  window.addEventListener("resize", initScrollTag)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", initScrollTag)
})

defineExpose({
  changeActive,
})
</script>

<style lang="less" scoped>
@import "./product_list.less";
</style>

<style lang="less">
.order_detail {
  // padding: 0 80px;
  & > h2 {
    font-size: 18px;
    font-weight: bold;
  }
  & > .detail {
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    border-radius: 8px;

    & > li {
      width: 100%;
      font-size: 15px;
      span.orange {
        color: #fc7f46;
      }
      span.grey {
        color: hsl(var(--foreground) / 30%);
      }
    }
    & > li + li {
      margin-top: 20px;
    }
    & > li:last-child {
      margin-top: 30px;
      padding: 30px 0 10px;
      border-top: 1px solid #eee;
      & > span:last-child {
        color: #fd550a;
        font-size: 17px;
        i {
          font-size: 15px;
          font-weight: 400;
          text-decoration: line-through;
          color: #666;
        }
      }
    }
  }
  & > .btn {
    padding-top: 20px;
    .el-button {
      height: 40px;
      padding: 0 40px;
      background-color: #f4b121;
      color: #fff;
      border: none;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
