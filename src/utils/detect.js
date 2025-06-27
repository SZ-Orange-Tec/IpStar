// 第三方监测

// 用户浏览
export function track_active() {
  googleActive()
}
// 注册
export function track_register() {
  googleRegister()
}
// 领取礼包
export function track_gift() {
  googleGift()
}
// 下单
export function track_createOrder() {
  googleOrder()
}
// 支付
export function track_payment(params) {
  googlePayment()
}

// 谷歌
function googleActive() {
  window.gtag &&
    gtag("event", "conversion", {
      send_to: "AW-17264345186/5tTMCNONjuMaEOKApKhA",
      value: 1.0,
      currency: "USD",
    })
}
function googleRegister() {
  const callback = function () {}
  window.gtag &&
    gtag("event", "conversion", {
      send_to: "AW-17264345186/EdvVCOW5hOQaEOKApKhA",
      event_callback: callback,
    })
  return false
}
function googleOrder() {
  const callback = function () {}
  window.gtag &&
    gtag("event", "conversion", {
      send_to: "AW-17264345186/hHwUCOu5hOQaEOKApKhA",
      event_callback: callback,
    })
  return false
}
function googleGift() {
  const callback = function () {}
  window.gtag &&
    gtag("event", "conversion", {
      send_to: "AW-17264345186/vr1jCOi5hOQaEOKApKhA",
      event_callback: callback,
    })
  return false
}
function googlePayment() {
  var callback = function () {}
  window.gtag &&
    gtag("event", "conversion", {
      send_to: "AW-17264345186/d1USCO65hOQaEOKApKhA",
      transaction_id: "",
      event_callback: callback,
    })
  return false
}
