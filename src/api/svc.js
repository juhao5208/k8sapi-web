import request from '@/utils/request'

//获取所有svc列表
export function getList(ns) {
  return request({
    url: '/svc?ns=' + ns,
    method: 'get',
  })
}
