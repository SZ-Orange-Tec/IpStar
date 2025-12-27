import request from "./request"

// IP信息详情
export function platToolsIpDetail(params) {
  return request({
    url: "/plat/tools/ip/detail",
    method: "get",
    params,
  })
}
