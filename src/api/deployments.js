import request from '@/utils/request'

export function rmDeploy(ns, name) {
  return request({
    url: '/deployments/' + ns + '/' + name,
    method: 'delete',
  })
}

export function updateDeploy(data, fast) {
  //修改模式和创建一样，系需要增加一个update=1这个query参数过去
  let url = '/deployments'
  if (fast) {
    url += "?fast=1&update=1"
  } else {
    url += "?update=1"
  }
  return request({
    url,
    data,
    method: 'post',
  })
}

export function createDeploy(data, fast) {
  let url = '/deployments'
  if (fast) {
    url += "?fast=1"
  }
  return request({
    url,
    data,
    method: 'post',
  })
}

export function loadDeploy(ns, name) {
  return request({
    url: '/deployments/' + ns + "/" + name,
    method: 'get',
  })
}

//获取所有 指定ns下的deployments
export function getList(ns) {
  return request({
    url: '/deployments?ns=' + ns,
    method: 'get',
  })
}
