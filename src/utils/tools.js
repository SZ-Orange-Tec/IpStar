// 防抖
export function debounce(func, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 节流
export function throttle(func, delay, immediate = false) {
  let canRun = true

  if (immediate) {
    return function (...args) {
      if (!canRun) return
      func.apply(this, args)
      canRun = false
      setTimeout(() => {
        canRun = true
      }, delay)
    }
  }

  return function (...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, delay)
  }
}
// 流量单位转换
export function formatSizeUnits(kb) {
  const units = ["KB", "MB", "GB", "TB", "PB"]
  let unitIndex = 0

  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024
    unitIndex++
  }

  return `${kb.toFixed(2)} ${units[unitIndex]}`
}
// 是否是手机端
export function isMobile() {
  var info = navigator.userAgent
  var isPhone = /mobile/i.test(info)
  return isPhone
}
// 预渲染判断函数
export const isPrerendering = () => {
  if (typeof window === "undefined") return false // SSR环境

  const ua = navigator.userAgent.toLowerCase()
  return ua.includes("prerender") || ua.includes("headless") || ua.includes("chrome-lighthouse") || document.visibilityState === "prerender"
}
// 添零
export function addZero(num) {
  if (num < 10 && num.toString().length === 1) {
    return `0${num}`
  } else {
    return num
  }
}
// 千分位符
export function Thousands(num) {
  let str = null
  if (num) {
    str = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
  }
  return str || "0.00"
}
// 计算
export function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}
// 四舍五入
export function roundToDecimal(num, decimalPlaces = 2) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(num * factor) / factor
}

// 日期格式
export function getDate(date) {
  const year = date.getFullYear()

  let day = date.getDate()
  day = day < 10 ? "0" + day : day

  let month = date.getMonth() + 1
  month = month < 10 ? "0" + month : month

  return year + "-" + month + "-" + day
}
export function getTime(date) {
  let hour = date.getHours()
  hour = hour < 10 ? "0" + hour : hour

  let minute = date.getHours()
  minute = minute < 10 ? "0" + minute : minute

  let second = date.getSeconds()
  second = second < 10 ? "0" + second : second

  return hour + ":" + minute + ":" + second
}
export function getDateTime(date) {
  const dateStr = getDate(date)
  const timeStr = getTime(date)

  return dateStr + " " + timeStr
}

// 判断类型
export function typeOf(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}
