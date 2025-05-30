import _axios from "axios"
import router from "@/router/index"
import Message from "@/components/message/message"
import loginStore from "../store/login"

const { OutLogin, token } = loginStore()

// 相同错误码只提示一次
let prevCode = null
const _request = _axios.create({
  // 基地址
  // baseURL: process.env.VUE_APP_URL, // 环境变量
  baseURL: import.meta.env.MODE === "production" ? location.origin + "/api" : import.meta.env.VITE_BASE_URL,
  timeout: 120000,
})

// 请求拦截
_request.interceptors.request.use(
  (config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    // 进度条开始
    // NProgress.start()
    if (config.method === "get") {
      if (config.params) {
        config.params.a = Date.now() + Math.round(Math.random() + 100)
      } else {
        config.params = {
          a: Date.now() + Math.round(Math.random() + 100),
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
_request.interceptors.response.use(
  (res) => {
    if (res.data.msg !== "success") {
      Message({
        message: res.data.msg,
        type: "success",
      })
    }
    // NProgress.done()
    return res.data
  },
  (error) => {
    console.log(error, "error")
    // NProgress.done()

    if (prevCode === error.response.data.code) {
      return Promise.reject(error)
    } else {
      prevCode = error.response.data.code
      setTimeout(() => {
        prevCode = null
      }, 5000)
    }

    // token 失效
    if (error.response.data.code === 401) {
      Message({
        type: "warning",
        message: "Login expired, please log in again",
      })
      OutLogin()
      router.push("/login")
      return Promise.reject(error)
    }
    if (error.response.data.msg !== 200) {
      Message({
        type: "warning",
        message: error.response.data.msg,
      })
    }
    return Promise.reject(error)
  }
)
export default _request
