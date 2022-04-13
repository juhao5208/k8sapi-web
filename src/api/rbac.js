import request from '@/utils/request'

//生成config文件
export function genConfigFile(user) {
  return request({
    url: '/clientconfig?user=' + user,
    method: 'get',
  })
}

//删除clusterrole
export function deleteClusterRole(name) {
  return request({
    url: '/clusterroles?name=' + name,
    method: 'delete',
  })
}

//获取clusterrole列表
export function getClusterRoleList(ns) {
  return request({
    url: '/clusterroles',
    method: 'get',
  })
}

//获取服务账号列表
export function getSaList(ns) {
  return request({
    url: '/sa?ns=' + ns,
    method: 'get',
  })
}

//获取服务账号列表
export function getUaList() {
  return request({
    url: '/ua',
    method: 'get',
  })
}

//创建UserAccount
export function createUa(data) {
  return request({
    url: '/ua',
    data,
    method: 'post',
  })
}

export function deleteUa(data) {
  return request({
    url: '/ua',
    data,
    method: 'delete',
  })
}


export function getRoleDetail(ns, name) {
  return request({
    url: '/roles/' + ns + '/' + name,
    method: 'get',
  })
}

export function getClusterRoleDetail(ns, name) {
  return request({
    url: '/clusterroles/' + name,
    method: 'get',
  })
}

//修改角色
export function updateRole(ns, name, data) {
  return request({
    url: '/roles/' + ns + '/' + name,
    data,
    method: 'post',
  })
}

//修改角色
export function updateClusterRole(ns, name, data) {
  return request({
    url: '/clusterroles/' + name,
    data,
    method: 'post',
  })
}

export function addUserToBinding(ns, bdname, data) {
  return request({
    url: '/rolebindings?ns=' + ns + '&name=' + bdname,
    data,
    method: 'put',
  })
}

export function addUserToClusterBinding(bdname, data) {
  return request({
    url: '/clusterrolebindings?name=' + bdname,
    data,
    method: 'put',
  })
}

export function deleteUserFromBinding(ns, bdname, data) {
  return request({
    url: '/rolebindings?ns=' + ns + '&name=' + bdname + "&type=1",
    data,
    method: 'put',
  })
}

export function deleteUserFromClusterBinding(bdname, data) {
  return request({
    url: '/clusterrolebindings?name=' + bdname + "&type=1",
    data,
    method: 'put',
  })
}

export function createRoleBinding(data) {
  return request({
    url: '/rolebindings',
    data,
    method: 'post',
  })
}

export function createClusterRoleBinding(data) {
  return request({
    url: '/clusterrolebindings',
    data,
    method: 'post',
  })
}

export function deleteClusterRoleBinding(name) {
  return request({
    url: '/clusterrolebindings?name=' + name,
    method: 'delete',
  })
}

export function getRoleList(ns) {
  return request({
    url: '/roles?ns=' + ns,
    method: 'get',
  })
}

export function getRoleBindingList(ns) {
  return request({
    url: '/rolebindings?ns=' + ns,
    method: 'get',
  })
}

export function getClusterRoleBindingList() {
  return request({
    url: '/clusterrolebindings',
    method: 'get',
  })
}

export function createClusterRole(data) {
  return request({
    url: '/clusterroles',
    data,
    method: 'post',
  })
}

export function createRole(data) {
  return request({
    url: '/roles',
    data,
    method: 'post',
  })
}

export function deleteRole(ns, name) {
  return request({
    url: '/roles?ns=' + ns + "&name=" + name,
    method: 'delete',
  })
}
