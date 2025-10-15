import request from "./request"

// 账号列表
export function platAccountList(params) {
  return request({
    url: "/plat/sub/accounts",
    method: "get",
    params,
  })
}

// 添加子账号
export function platAccountAdd(data) {
  return request({
    url: "/plat/sub/accounts",
    method: "post",
    data,
  })
}

// 修改子账号
export function platAccountUpdate(data) {
  return request({
    url: `/plat/sub/accounts/${data.id}`,
    method: "post",
    data,
  })
}
// 修改子账号
export function platAccountUpdateStatus(data) {
  return request({
    url: "/plat/sub/accounts/status",
    method: "post",
    data,
  })
}
// 修改子账号
export function platAccountResetProxyPwd(data) {
  return request({
    url: "/plat/sub/accounts/reset-proxy",
    method: "post",
    data,
  })
}

// 流量套餐列表
export function platAccountPack(params) {
  return request({
    url: "/plat/sub/accounts/packs",
    method: "get",
    params,
  })
}
// 分配流量
export function platAccountAssignPack(data) {
  return request({
    url: "/plat/sub/accounts/recharge-pack",
    method: "post",
    data,
  })
}

// 使用分析
export function platAccountUsage(params) {
  return request({
    url: "/plat/sub/accounts/daily-report",
    method: "get",
    params,
  })
}
// 分配记录
export function platAccountAssignRecord(params) {
  return request({
    url: "/plat/sub/accounts/recharge-logs",
    method: "get",
    params,
  })
}
// 实时数据
export function platAccountRealTime(params) {
  return request({
    url: "/plat/sub/accounts/real-time-report",
    method: "get",
    params,
  })
}
// 账号下拉列表
export function platAccountSelect(params) {
  return request({
    url: "/plat/customer/accounts/select",
    method: "get",
    params,
  })
}
