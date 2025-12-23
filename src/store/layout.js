import { computed, reactive, toRefs } from "vue"
import { platProductLowestPrices } from "@/api/product"
import { platDataConfig } from "../api/home"
import { formatSizeUnits } from "../utils/tools"

const state = reactive({
  path: "", // 路由路径
  isProduc: false, // 是否显示产品页
  lowestPrice: JSON.parse(
    localStorage.getItem("lowest_price") ?? '{"residential": "0.00","unlimited": "0.00","phone": "0.00","data_center": "0.00"}'
  ), // 最低价格
  gift: 0, // 注册奖励礼包 KB
  registerAward: false, // 是否有注册奖励
  promotion: false,
  activity_days: 0,
  discount_rate: 0,
})
const getters = {
  lowest_price_residential: computed((state) => state.lowestPrice.residential),
  lowest_price_unlimited: computed((state) => state.lowestPrice.unlimited),
  lowest_price_phone: computed((state) => state.lowestPrice.phone),
  lowest_price_data_center: computed((state) => state.lowestPrice.data_center),
}
const actions = {
  setLowestPrice(price) {
    state.lowestPrice = price
    localStorage.setItem("lowest_price", price)
  },
  async getLowestPrice() {
    try {
      const { data } = await platProductLowestPrices()
      const keys = ["residential", "unlimited", "phone", "data_center"]
      const target = {}
      data.forEach(({ prd_type, unit_price }) => {
        const key = keys[prd_type]
        target[key] = unit_price / 100
      })
      state.lowestPrice = target
      localStorage.setItem("lowest_price", JSON.stringify(target))
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
