// 路由表：原始路由 + params 路由 + 查询路由 + 防卫路由
// - 原始路由：/（课程列表）、/selected（我的已选）、/login（登录）
// - params 路由：/courses/:id（课程详情，编号写在地址路径里）
// - 查询路由：课程列表的搜索词 q 和页码 page 放在地址问号后（?q=数据结构&page=2）
// - 防卫路由：beforeEach 导航守卫，未登录一律先去登录页

import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user.js'

import CourseListView from '@/views/CourseListView.vue'
import SelectedView from '@/views/SelectedView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import LoginView from '@/views/LoginView.vue'

// 定义路由规则
const routes = [
  { path: '/', name: 'list', component: CourseListView },
  { path: '/selected', name: 'selected', component: SelectedView },
  { path: '/courses/:id', name: 'detail', component: CourseDetailView },
  { path: '/login', name: 'login', component: LoginView }
]

// 创建路由器（hash 模式：地址以 #/ 开头，不需要服务器额外配置）
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 防卫路由（全局前置守卫）：跳转前先检查登录状态
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 未登录且要去的不止登录页 → 拦下来，重定向到登录页
  if (!userStore.isLoggedIn && to.path !== '/login') {
    // 用 query 记住原本要去的地址，登录成功后原路返回
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
