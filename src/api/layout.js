import request from "./request"

// 客户订单列表
export function platCustomerOrders(params) {
  return request({
    url: "/plat/customer/orders",
    method: "get",
    params,
  })
}
// 产品列表
export function platProducts(params) {
  return request({
    url: "/plat/products",
    method: "get",
    params,
  })
}
// 概览数据
export function platCustomerReportOverview(params) {
  return request({
    url: "/plat/customer/report/overview",
    method: "get",
    params,
  })
}

// 客户每日流量统计
export function platCustomerReport(params) {
  return request({
    url: "/plat/customer/report",
    method: "get",
    params,
  })
}
// 客户购买产品列表
export function platCustomerProducts(params) {
  return request({
    url: "/plat/customer/products",
    method: "get",
    params,
  })
}
// V2客户产品列表
export function platCustomerProductsV2(params) {
  return request({
    url: "/plat/v2/customer/products",
    method: "get",
    params,
  })
}
// 实时统计
export function platCustomerReportRealTime(params) {
  return request({
    url: "/plat/customer/report/real-time",
    method: "get",
    params,
  })
}
// 获取服务器端口
export function PlatCustomerEndPoints(params) {
  return request({
    url: "/plat/customer/end-points",
    method: "get",
    params,
  })
}
// 重置api_key
export function PlatCustomerResetApiKey(data) {
  return request({
    url: "/plat/customer/reset-api-key",
    method: "post",
    data,
  })
}
// 更新代理账号
export function platCustomerResetProxy(data) {
  return request({
    url: "/plat/customer/reset-proxy",
    method: "post",
    data,
  })
}
// IP 白名单列表
export function platCustomerWhitelist(params) {
  return request({
    url: "/plat/customer/whitelist",
    method: "get",
    params,
  })
}
// 添加IP白名单
export function AddplatCustomerWhitelist(data) {
  return request({
    url: "/plat/customer/whitelist",
    method: "post",
    data,
  })
}
// 修改账号密码
export function platCustomerUpdatePass(data) {
  return request({
    url: "/plat/customer/update-pass",
    method: "post",
    data,
  })
}
// 删除IP白名单
export function delPlatCustomerWhitelist(id) {
  return request({
    url: `/plat/customer/whitelist/${id}`,
    method: "delete",
  })
}
// IP数据图表
export function IpDataList(params) {
  return request({
    url: "/plat/data/ips",
    method: "get",
    params,
  })
}
// 国家数据
export function CountryList(params) {
  return request({
    url: "/plat/data/country",
    method: "get",
    params,
  })
}

// 余额明细
export function CustomerBalances(params) {
  return request({
    url: "/plat/customer/balances",
    method: "get",
    params,
  })
}

// 最新通知
export function Notice(params) {
  return request({
    url: "/plat/data/notice",
    method: "get",
    params,
  })
}
