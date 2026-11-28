// 选课 store：已选课程列表在多个组件间共享，
// 并同步写入 localStorage，实现"组件状态持久化"——
// 换页面、甚至刷新浏览器后，选课记录都还在

import { defineStore } from 'pinia'

const STORAGE_KEY = 'scu-selected-courses'

// 启动时先从 localStorage 读回上次的选课结果
function loadSelected() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export const useCourseStore = defineStore('course', {
  // state：所有组件共享的已选课程数组
  state: () => ({
    selectedCourses: loadSelected()
  }),

  // getter：派生数据，用法同计算属性
  getters: {
    selectedCount: (state) => state.selectedCourses.length,
    totalCredits: (state) =>
      state.selectedCourses.reduce((sum, course) => sum + course.credits, 0),
    // 带参数的 getter：判断某门课是否已报（课程卡片用它切换按钮状态）
    isSelected: (state) => (courseId) =>
      state.selectedCourses.some((course) => course.id === courseId)
  },

  // actions：修改已选列表的三个操作，每次修改后都同步保存
  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selectedCourses))
    },
    addCourse(course) {
      // 同一门课不允许重复报名
      if (this.isSelected(course.id)) return
      this.selectedCourses.push(course)
      this.save()
    },
    removeCourse(courseId) {
      this.selectedCourses = this.selectedCourses.filter(
        (course) => course.id !== courseId
      )
      this.save()
    },
    clearCourses() {
      this.selectedCourses = []
      this.save()
    }
  }
})
