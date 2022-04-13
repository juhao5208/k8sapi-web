import request from '@/utils/request'

export function loadIngress(ns, name) {
  return request({
    url: '/ingress/' + ns + '/' + name,
    method: 'get',
  })
}

export function genAuthFile(data) {
  return request({
    url: '/ingressauth',
    data,
    method: 'post',
  })
}

//获取所有ingress列表
export function getList(ns) {
  return request({
    url: '/ingress?ns=' + ns,
    method: 'get',
  })
}

//更新ingress
export function updateIngress(data) {
  return request({
    url: '/ingress?update=1',
    method: 'post',
    data
  })
}

// 新增ingress
export function postIngress(data) {
  return request({
    url: '/ingress',
    method: 'post',
    data
  })
}

export function rmIngress(ns, name) {
  return request({
    url: '/ingress?ns' + ns + '&name=' + name,
    method: 'delete',

  })
}

export function getIngressForYaml(ns, name) {
  return request({
    url: '/ingressyaml?ns' + ns + '&name=' + name,
    method: 'get',
  })
}
