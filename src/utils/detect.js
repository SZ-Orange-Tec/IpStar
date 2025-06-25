// 第三方监测
export default {
  // 用户浏览
  active() {
    googleActive()
  },
  // 注册
  register() {
    googleRegister()
  },
  // 领取礼包
  gift() {
    googleGift()
  },
  // 下单
  createOrder() {
    googleOrder()
  },
  // 支付
  payment(params) {
    googlePayment()
  },
}

// 谷歌
function googleActive() {
  // 浏览
}
function googleRegister(url) {
  // 注册
}
function googleOrder(url) {
  // 下单
}
function googleGift() {}
function googlePayment(url) {
  // 支付完成
}
