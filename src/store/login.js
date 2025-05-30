import { computed, reactive, toRefs } from "vue"

const state = reactive({
  token: localStorage.getItem("token") || "",
})

const getters = {
  isLogin: computed(() => Boolean(state.token)),
}

function OutLogin() {
  state.token = ""
  localStorage.removeItem("token")
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
