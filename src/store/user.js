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
  proxy_user: computed(() => state.userInfo?.proxy_user ?? ""),
  proxy_pass: computed(() => state.userInfo?.proxy_pass ?? ""),
  isUsed: computed(() => state.userInfo?.consume > 0),
  isAdmin: computed(() => state.userInfo?.admin === 2),
  subPrefix: computed(() => state.userInfo?.sub_prefix ?? ""),

  username_simple: computed(() =>
    (state.userInfo?.username?.length ?? 0) > 15
      ? state.userInfo.username.slice(0, 4) + "****" + state.userInfo.username.slice(-4)
      : state.userInfo?.username
  ),
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
  clearUserInfo() {
    state.userInfo = ""
    localStorage.removeItem("userInfo")
  },
}

export default function userStore() {
  return {
    ...toRefs(state),
    ...getters,
    ...actions,
  }
}
