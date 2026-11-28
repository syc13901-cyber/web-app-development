// 用户 store：保存登录信息，并用 localStorage 持久化
// 防卫路由（导航守卫）靠它判断"是否已登录"

import { defineStore } from 'pinia'

const STORAGE_KEY = 'scu-student'

// 启动时先从 localStorage 读回上次的登录信息：刷新页面登录状态不丢
function loadStudent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', {
  // state：当前登录的学生 { no: 学号, name: 姓名 }，未登录时为 null
  state: () => ({
    student: loadStudent()
  }),

  // getter：组件里用 userStore.isLoggedIn 判断登录状态
  getters: {
    isLoggedIn: (state) => state.student !== null
  },

  // actions：登录 / 退出，每一步都同步写进 localStorage
  actions: {
    login(no, name) {
      this.student = { no, name }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.student))
    },
    logout() {
      this.student = null
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
