import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//获取所有用户
export function getList() {
  return request({
    url: '/user/list',
    method: 'get',
  })
}

export function deleteUser(name) {
  return request({
    url: '/user/list?name=' + name,
    method: 'delete',
  })
}
