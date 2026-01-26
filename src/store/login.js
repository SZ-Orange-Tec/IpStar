import { computed, reactive, toRefs } from "vue"
import userStore from "./user"

const state = reactive({
  token: localStorage.getItem("token") || "",

  // 登录后的事件
  afterLoginPath: null,
})

const getters = {
  isLogin: computed(() => Boolean(state.token)),
}

function OutLogin() {
  state.token = ""
  localStorage.removeItem("token")
  const { clearUserInfo } = userStore()
  clearUserInfo()
}
function Login(token) {
  state.token = token
  localStorage.setItem("token", token)
}

export default function loginStore() {
  return {
    ...toRefs(state),
    ...getters,
    OutLogin,
    Login,
  }
}
