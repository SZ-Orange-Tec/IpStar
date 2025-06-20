import { reactive, toRefs } from "vue"

const state = reactive({
  path: "", // 路由路径
  isProduc: false, // 是否显示产品页
  isMask: JSON.parse(localStorage.getItem("mask") ?? "true"),
  registerAward: true,
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
