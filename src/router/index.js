import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/workloads',
    component: Layout,
    redirect: '/workloads/deployments',
    name: 'workloads',
    meta: {title: '工作负载', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'deployments',
        name: 'Deployments',
        component: () => import('@/views/workloads/deplist'),
        meta: {title: 'deployments列表', icon: 'table'}
      },
      {
        path: 'createdeploy',
        name: 'Createdeploy',
        component: () => import('@/views/deployments/deploy-create'),
        meta: {title: '创建/编辑Deployment', icon: 'table'}
      },
      {
        path: 'pods',
        name: 'Pods',
        component: () => import('@/views/workloads/podslist'),
        meta: {title: 'Pods列表', icon: 'tree'}
      },
      {
        path: 'podlogs',
        name: 'Podlogs',
        component: () => import('@/views/workloads/podlogs'),
        meta: {title: '查看logs', icon: 'tree'}
      },
      {
        path: 'podshell',
        name: 'Podshell',
        component: () => import('@/views/workloads/podshell'),
        meta: {title: 'podshell(临时)', icon: 'tree'},
        hidden: true
      },
      {
        path: 'serivces',
        name: 'Serivces',
        component: () => import('@/views/workloads/svclist'),
        meta: {title: 'Service列表', icon: 'tree'}
      }
    ]
  },

  {
    path: '/usermanage',
    component: Layout,
    redirect: '/usermanage/userlist',
    name: 'Usermanage',
    meta: {title: '用户管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'userlist',
        name: 'Userlist',
        component: () => import('@/views/user/userlist'),
        meta: {title: '用户列表', icon: 'table'}
      },
      {
        path: 'useradd',
        name: 'Useradd',
        component: () => import('@/views/user/userregister'),
        meta: {title: '用户注册', icon: 'table'}
      },
    ]
  },

  {
    path: '/image',
    component: Layout,
    redirect: '/image/imagelist',
    name: 'Image',
    meta: {title: '镜像管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'imagelist',
        name: 'Imagelist',
        component: () => import('@/views/image/imagelist'),
        meta: {title: '镜像列表', icon: 'table'}
      },
      {
        path: 'imagepull',
        name: 'Imagepull',
        component: () => import('@/views/image/imagepull'),
        meta: {title: '拉取镜像', icon: 'table'}
      },
    ]
  },

  {
    path: '/rbac',
    component: Layout,
    redirect: '/rbac/rolelist',
    name: 'rbac',
    meta: {title: 'RBAC可视化管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'rolelist',
        name: 'Rolelist',
        component: () => import('@/views/rbac/rolelist'),
        meta: {title: '角色列表', icon: 'table'},
      },
      {
        path: 'rolebindinglist',
        name: 'Rolebindinglist',
        component: () => import('@/views/rbac/rolebindinglist'),
        meta: {title: '角色绑定', icon: 'tree'},
      },

      {
        path: 'createrolebinding',
        name: 'Createrolebinding',
        component: () => import('@/views/rbac/create-rolebinding'),
        meta: {title: '创建角色绑定', icon: 'tree'},
        hidden: true
      },
      {
        path: 'createclusterrolebinding',
        name: 'Createclusterrolebinding',
        component: () => import('@/views/rbac/create-clusterrolebinding'),
        meta: {title: '创建集群角色绑定', icon: 'tree'},
        hidden: true
      },
      {
        path: 'clusterrolelist',
        name: 'Clusterrolelist',
        component: () => import('@/views/rbac/clusterrolelist'),
        meta: {title: '集群角色列表', icon: 'tree'}
      },
      {
        path: 'clusterrolebindinglist',
        name: 'Clusterrolebindinglist',
        component: () => import('@/views/rbac/clusterrolebindinglist'),
        meta: {title: '集群角色绑定', icon: 'tree'},
      },
      {
        path: 'createrole',
        name: 'Createrole',
        component: () => import('@/views/rbac/create-role'),
        meta: {title: '创建/编辑(集群)角色', icon: 'tree'}
      },
      {
        path: 'salist',
        name: 'Salist',
        component: () => import('@/views/rbac/salist'),
        meta: {title: '服务账号列表', icon: 'tree'},
      },
      {
        path: 'ualist',
        name: 'Ualist',
        component: () => import('@/views/rbac/ualist'),
        meta: {title: '用户账号列表', icon: 'tree'},
      },
      {
        path: 'configyaml',
        name: 'Configyaml',
        component: () => import('@/views/rbac/config-yaml'),
        meta: {title: '查看config文件', icon: 'tree'},
        hidden: true
      },

    ]
  },
  {
    path: '/nodes',
    component: Layout,
    redirect: '/nodes/nodeshell',
    name: 'nodes',
    meta: {title: '节点管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'nodeshell',
        name: 'Nodeshell',
        component: () => import('@/views/nodes/nodeshell'),
        meta: {title: 'nodeshell(临时)', icon: 'table'},
        hidden: true
      },
      {
        path: 'nodelist',
        name: 'Nodelist',
        component: () => import('@/views/nodes/nodelist'),
        meta: {title: '集群节点管理', icon: 'tree'}
      },
      {
        path: 'nodedetail',
        name: 'Nodedetail',
        component: () => import('@/views/nodes/nodedetail'),
        meta: {title: '节点编辑', icon: 'tree'},
        hidden: true
      },
    ]
  },
  {
    path: '/ingress',
    component: Layout,
    redirect: '/ingress/ingress-list',
    name: 'ingress',
    meta: {title: 'Ingress管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'ingress-list',
        name: 'Ingress-list',
        component: () => import('@/views/ingress/ingress-list'),
        meta: {title: 'Ingress列表', icon: 'table'}
      },
      {
        path: 'createingress',
        name: 'Createingress',
        component: () => import('@/views/ingress/ingress-create'),
        meta: {title: '创建ingress', icon: 'tree'}
      },
      /*{
        path: 'ingressyaml',
        name: 'Ingressyaml',
        component: () => import('@/views/ingress/ingress-yaml'),
        meta: {title: 'ingressyaml', icon: 'tree'},
        hidden: true
      },*/
    ]
  },
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/secrets',
    name: 'resources',
    meta: {title: '资源管理', icon: 'el-icon-s-help'},
    children: [
      {
        path: 'secrets',
        name: 'Secrets',
        component: () => import('@/views/resources/secretlist'),
        meta: {title: '密文列表', icon: 'table'}
      },
      {
        path: 'createsecret',
        name: 'Createsecret',
        component: () => import('@/views/resources/secret-create'),
        meta: {title: '创建密文', icon: 'table'}
      },
      {
        path: 'secretsget',
        name: 'Secretsget',
        component: () => import('@/views/resources/secret-get'),
        meta: {title: '查看密文', icon: 'table'},
        hidden: true
      },
      {
        path: 'configmaps',
        name: 'Configmaps',
        component: () => import('@/views/resources/configmaplist'),
        meta: {title: '配置列表', icon: 'tree'}
      },
      {
        path: 'createconfigmaps',
        name: 'CreateConfigmaps',
        component: () => import('@/views/resources/configmap-create'),
        meta: {title: '创建配置', icon: 'tree'}
      },
      {
        path: 'testres',
        name: 'testres',
        component: () => import('@/views/resources/test'),
        meta: {title: '测试', icon: 'tree'}
      },


    ]
  },


  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
