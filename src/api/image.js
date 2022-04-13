import request from '@/utils/request'

//获取所有镜像
export function getImageList() {
  return request({
    url: '/image/list',
    method: 'get',
  })
}

export function deleteImage(id) {
  return request({
    url: '/image/list?id=' + id,
    method: 'delete',
  })
}
