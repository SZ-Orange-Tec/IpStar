import _axios from "axios"
import router from "@/router/index"
import Message from "@/components/message/message"
import loginStore from "../store/login"
import settingStore from "../store/setting"

const { OutLogin, token } = loginStore()
const { en, lang } = settingStore()

// 相同错误码只提示一次
let prevCode = null
const _request = _axios.create({
  // 基地址
  // baseURL: process.env.VUE_APP_URL, // 环境变量
  baseURL: import.meta.env.MODE === "production" ? location.origin + "/api" : import.meta.env.VITE_BASE_URL,
  timeout: 120000,
})

async function ErrorMsg(code) {
  try {
    const url = `/error/${code.toString().charAt(0)}-${lang.value ?? "en"}.json`
    const result = await fetch(url)
    const data = await result.json()
    const msg = data[code]

    Message({
      type: "warning",
      message: msg ?? (en.value ? "Unknown error" : "未知错误") + ` [${code}]`,
    })
  } catch (err) {
    Message({
      type: "warning",
      message: (en.value ? "Unknown error" : "未知错误") + `[${code}]`,
    })
  }
}
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
        type: "warning",
      })
    }
    // NProgress.done()
    return res.data
  },
  (error) => {
    if (prevCode === error.response.data.code) {
      return Promise.reject(error)
    } else {
      prevCode = error.response.data.code
      setTimeout(() => {
        prevCode = null
      }, 5000)
    }

    // token 失效
    if (error?.response?.data?.code === 401) {
      Message({
        type: "warning",
        message: en.value ? "Login expired, please log in again" : "登录过期，请重新登录",
      })
      OutLogin()
      router.push("/login")
      return Promise.reject(error)
    } else if (error?.response?.data?.code) {
      ErrorMsg(error?.response?.data?.code)
    } else {
      Message({
        type: "warning",
        message: error.message,
      })
    }
    return Promise.reject(error)
  }
)
export default _request
