import { computed, reactive, toRefs } from "vue"

// import userStore from "./user"
// const { clearUserInfo } = userStore()

const state = reactive({
  token: localStorage.getItem("token") || "",
})

const getters = {
  isLogin: computed(() => Boolean(state.token)),
}

function OutLogin() {
  state.token = ""
  localStorage.removeItem("token")
  // clearUserInfo()
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
