import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 登录相关路由
const loginRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/login/ResetPassword.vue')
  }
]

const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/analytics',
    meta: { title: '概览', icon: 'ic:baseline-dashboard' },
    children: [
      {
        path: 'analytics',
        component: () => import('@/views/overview/analytics/index.vue'),
        name: 'Analytics',
        meta: { title: '分析页', icon: 'tdesign:chart-analytics' }
      },
      // 工作台
      {
        path: 'workspace',
        component: () => import('@/views/overview/workspace/index.vue'),
        name: 'Workspace',
        meta: { title: '工作台', icon: 'bi:person-workspace' }
      }
    ]
  }
]
export { baseRoutes }
const routes = [...loginRoutes, ...baseRoutes]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加登录状态检查
  next()
})
