import { reactive, toRefs } from "vue"

const state = reactive({
  path: "", // 路由路径
  isProduc: false, // 是否显示产品页

  gift: 0, // 注册奖励礼包 KB
  registerAward: false, // 是否有注册奖励
})
const getters = {}
const actions = {}

export default function layoutStore() {
  return {
    ...toRefs(state),
    ...actions,
    ...getters,
  }
}
