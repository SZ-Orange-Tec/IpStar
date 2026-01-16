import request from "./request"

// 购买产品记录
export function platCustomerProductsV2(params) {
  return request({
    url: "/plat/v2/customer/products",
    method: "get",
    params,
  })
}

// 使用记录
export function platResidentialUsage(params) {
  return request({
    url: "",
    method: "get",
    params,
  })
}
export function platUnlimitedConcurrentUsage(params) {
  return request({
    url: "",
    method: "get",
    params,
  })
}

// 产品区域
export function platProductRegions(params) {
  return request({
    url: "/plat/products/regions",
    method: "get",
    params,
  })
}

// 静态IP区域
export function platProductStaticRegions(params) {
  return request({
    url: "/plat/products/static-regions",
    method: "get",
    params,
  })
}

// 产品最低价格列表
export function platProductLowestPrices(params) {
  return request({
    url: "/plat/products/unit-prices",
    method: "get",
    params,
  })
}

// 客户IP列表
export function platCustomerStaticIps(params) {
  return request({
    url: "/plat/customer/staticips",
    method: "get",
    params,
  })
}
// 客户静态IP列表
export function platCustomerStaticIps2(params) {
  return request({
    url: "/plat/customer/static-ips",
    method: "get",
    params,
  })
}

// IP续费
export function platCustomerOrdersRenewal(data) {
  return request({
    url: "/plat/customer/orders/ip-renewal",
    method: "post",
    data,
  })
}

// 静态IP续费
export function platCustomerOrdersStaticRenewal(data) {
  return request({
    url: "/plat/customer/orders/static-ip-renewal",
    method: "post",
    data,
  })
}

// 用户自定义订单
export function platCustomerCustomOrder(params) {
  return request({
    url: "plat/customer/custom-order",
    method: "get",
    params,
  })
}

// 用户自定义订单
export function platNewUserAwardOrder(data) {
  return request({
    url: "/plat/customer/order/newer-promtion",
    method: "post",
    data,
  })
}
