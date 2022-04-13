import request from '@/utils/request'

//通过命名空间获取所有pods列表
export function getPodsByNs(ns, page) {
  return request({
    url: '/pods?ns=' + ns + '&current=' + page,  //分页
    method: 'get',
  })
}

//获取pod的容器列表（只返回名称)
export function getPodContainers(ns, podname) {
  return request({
    url: '/pods/containers?ns=' + ns + '&name=' + podname,
    method: 'get',
  })
}

//获取pod的日志
export function getPodsLogs(ns, podname, cname) {
  return request({
    url: '/pods/logs?ns=' + ns + '&podname=' + podname + '&cname=' + cname,
    method: 'get',
  })
}
