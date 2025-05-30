import request from './request'
// 验证码
export function platCustomerVerifycode (data) {
  return request({
    url: '/plat/customer/verifycode',
    method: 'post',
    data
  })
}
// 用户注册
export function platCustomerRegister (data) {
  return request({
    url: '/plat/customer/register',
    method: 'post',
    data
  })
}
// 用户登录
export function platCustomerLogin (data) {
  return request({
    url: '/plat/customer/login',
    method: 'post',
    data
  })
}
// 重置密码
export function platCustomerResetpass (data) {
  return request({
    url: '/plat/customer/resetpass',
    method: 'post',
    data
  })
}
// 获取用户信息
export function platCustomer (params) {
  return request({
    url: '/plat/customer',
    method: 'get',
    params
  })
}
// 获取图形码
export function platCaptcha (params) {
  return request({
    url: '/plat/captcha',
    method: 'get',
    params
  })
}
// google登录
export function GoogleLogin (data) {
  return request({
    url: '/plat/customer/google-login',
    method: 'post',
    data
  })
}
// github登录
export function GithubLogin (data) {
  return request({
    url: '/plat/customer/github-login',
    method: 'post',
    data
  })
}
// 检查账号是否存在
export function checkCustomer (data) {
  return request({
    url: '/plat/customer/check',
    method: 'post',
    data
  })
}
