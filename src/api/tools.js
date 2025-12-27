import request from "./request"

// IP信息详情
export function platToolsIpDetail(params) {
  return request({
    url: "/plat/tools/ip/detail",
    method: "get",
    params,
  })
}
// IP信息详情
export function platToolsProxyChecker(data) {
  return request({
    url: "/plat/tools/proxies/checker",
    method: "post",
    data,
  })
}
