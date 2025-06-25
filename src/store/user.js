import { computed, reactive, toRefs } from "vue"
import { platCustomer } from "../api/login"

const state = reactive({
  userInfo: JSON.parse(localStorage.getItem("userInfo") ?? "{}") || "",
})

const getters = {
  username: computed(() => state.userInfo.username),
  unlimited: computed(() => state.userInfo?.unlimited ?? false),
  is_purchase: computed(() => state.userInfo?.is_purchase ?? false),
  apiKey: computed(() => state.userInfo?.api_key ?? ""),
}

const actions = {
  async getUserInfo() {
    const { data } = await platCustomer()
    state.userInfo = data
    localStorage.setItem("userInfo", JSON.stringify(data))

    return data
  },
  updateUserInfo(info) {
    state.userInfo = info
    localStorage.setItem("userInfo", JSON.stringify(info))
  },
}

export default function userStore() {
  return {
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
