import request from '@/utils/request'

//获取所有ns列表
export function getList() {
  return request({
    url: '/nslist',
    method: 'get',
  })
}
