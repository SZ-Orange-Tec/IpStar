import { computed, reactive, toRefs } from "vue"
import { platCustomer } from "../api/login"

const state = reactive({
  userInfo: localStorage.getItem("userInfo") || "",
})

const getters = {
  username: computed(() => state.userInfo.username),
  unlimited: computed(() => state.userInfo?.unlimited ?? false),
  is_purchase: computed(() => state.userInfo?.is_purchase ?? false),
}

const actions = {
  async getUserInfo() {
    const { data } = await platCustomer()
    state.userInfo = data
    localStorage.setItem("userInfo", JSON.stringify(data))
  },
}

export default function userStore() {
  return {
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
