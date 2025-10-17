import { reactive, toRefs } from "vue"
import { platDataIndex } from "../api/home"

const state = reactive({
  path: "", // 路由路径
  isProduc: false, // 是否显示产品页
  lowestPrice: localStorage.getItem("lowest_price") || 0, // 最低价格
  gift: 0, // 注册奖励礼包 KB
  registerAward: false, // 是否有注册奖励
})
const getters = {}
const actions = {
  setLowestPrice(price) {
    state.lowestPrice = price
    localStorage.setItem("lowest_price", price)
  },
  async getLowestPrice() {
    try {
      const { data } = await platDataIndex()
      const { lowest_price: lowestPrice } = data
      state.lowestPrice = lowestPrice
      localStorage.setItem("lowest_price", lowestPrice)
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
