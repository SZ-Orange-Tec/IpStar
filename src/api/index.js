import request from "./request"

export function post(url,data){
  return request({
    url,
    method:'POST',
    data
  })
}

export function get(url,params){
  return request({
    url,
    method:'GET',
    params
  })
}