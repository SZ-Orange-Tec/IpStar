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
export function platUnlimitedBandWidthUsage(params) {
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
