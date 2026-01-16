import { computed, reactive, toRefs } from "vue"
import { platProductLowestPrices } from "@/api/product"
import { platDataConfig } from "../api/home"
import { formatSizeUnits } from "../utils/tools"

const state = reactive({
  path: "", // 路由路径
  isProduc: false, // 是否显示产品页
  lowestPrice: { residential: "0.00", unlimited: "0.00", phone: "0.00", data_center: "0.00", static: "0.00" }, // 最低价格
  gift: 0, // 注册奖励礼包 KB
  registerAward: false, // 是否有注册奖励
  promotion: false,
  activity_days: 0,
  discount_rate: 0,
  // 新用户注册奖励
  newer_promotion: {
    promotion: false,
    days: 0,
    name_count: "",
    name_unit: "",
    price: 100,
    code: "",
    total_size: 0,
    mobile_size: 0,
    residential_size: 0,
  },
})
const getters = {
  lowest_price_residential: computed((state) => state.lowestPrice.residential),
  lowest_price_unlimited: computed((state) => state.lowestPrice.unlimited),
  lowest_price_phone: computed((state) => state.lowestPrice.phone),
  lowest_price_data_center: computed((state) => state.lowestPrice.data_center),
}
const actions = {
  async getLowestPrice() {
    try {
      const { data } = await platProductLowestPrices()
      const keys = ["residential", "unlimited", "phone", "data_center", "static"]
      const target = {}
      data.forEach(({ prd_type, unit_price }) => {
        const key = keys[prd_type]
        target[key] = unit_price / 100
      })
      state.lowestPrice = target
    } catch (error) {
      console.log(error.message)
    }
  },
  async getConfig() {
    try {
      const { data } = await platDataConfig()
      state.registerAward = data.register_award
      state.gift = data.award_packsize ?? 0
      state.promotion = data.promotion_info.promotion
      state.activity_days = data.promotion_info.activity_days
      state.discount_rate = data.promotion_info.discount_rate

      state.newer_promotion = {
        promotion: data.newer_promotion.promotion,
        days: data.newer_promotion.activity_days,
        name_count: data.newer_promotion.product_name.split(/\s/)[0],
        name_unit: data.newer_promotion.product_name.split(/\s/)[1],
        price: data.newer_promotion.product_price,
        code: data.newer_promotion.product_code,
        total_size: formatSizeUnits(data.newer_promotion.total_size),
        mobile_size: formatSizeUnits(data.newer_promotion.mobile_size),
        residential_size: formatSizeUnits(data.newer_promotion.residential_size),
      }
      return data
    } catch (error) {
      console.log(error.message)
    }
  },
}

export default function layoutStore() {
  return {
    ...toRefs(state),
    ...actions,
    ...getters,
  }
}
