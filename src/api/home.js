import request from "./request"

// 产品推荐
export function platProductsRecommend(params) {
  return request({
    url: "/plat/products/recommend",
    method: "get",
    params,
  })
}
// 产品推荐
export function platProductsV2(params) {
  return request({
    url: "/plat/v2/products",
    method: "get",
    params,
  })
}

// 创建订单
export function platCustomerOrder(data) {
  return request({
    url: "/plat/customer/order",
    method: "post",
    data,
  })
}
// 发起订单支付
export function platCustomerOrderPay(data) {
  return request({
    url: "/plat/customer/order/pay",
    method: "post",
    data,
  })
}
// 用户留言
export function platCustomerLeaveMessage(data) {
  return request({
    url: "/plat/customer/leave-message",
    method: "post",
    data,
  })
}
// 发起paypal支付
export function platPaymentOrderPaypal(data) {
  return request({
    url: "/plat/payment/order/paypal",
    method: "post",
    data,
  })
}
// paypal 确认支付
export function platPaymentOrderPaypalApprove(data) {
  return request({
    url: "/plat/payment/order/paypal-approve",
    method: "post",
    data,
  })
}
// 监测订单是否支付完成
export function platCustomerOrdersCheckIsPaid(params) {
  return request({
    url: "/plat/customer/orders/check-is-paid",
    method: "get",
    params,
  })
}
// 发起Bition 支付
export function platPaymentOrderBitpay(data) {
  return request({
    url: "/plat/payment/order/bitpay",
    method: "post",
    data,
  })
}

// 首页Ip地图数据
export function platDataIndex(params) {
  return request({
    url: "/plat/data/index",
    method: "get",
    params,
  })
}
// 发起coingate支付
export function platPaymentOrderCoingate(data) {
  return request({
    url: "/plat/payment/order/coingate",
    method: "post",
    data,
  })
}

// 发起USDT支付
export function platPaymentOrderTronUSDT(data) {
  return request({
    url: "/plat/payment/order/tron-usdt",
    method: "post",
    data,
  })
}
// 检测tron交易
export function platCheckTronTransaction(params) {
  return request({
    url: "/plat/customer/orders/check-tron-transaction",
    method: "get",
    params,
  })
}
// Stripe checkout 支付
export function platPaymentStripe(data) {
  return request({
    url: "/plat/payment/order/stripe-checkout",
    method: "post",
    data,
  })
}
// Stripe checkout 支付
export function platDataConfig(params) {
  return request({
    url: "/plat/data/config",
    method: "get",
    params,
  })
}
