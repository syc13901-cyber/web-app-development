<!-- 已选课程组件：组件化要求 1
     自己不保存数据，清单直接读 pinia store，退课按钮调 store 的 action -->
<script setup>
import { useCourseStore } from '@/store/course.js'

const courseStore = useCourseStore()
</script>

<template>
  <section class="panel">
    <p v-if="courseStore.selectedCount === 0" class="empty">
      还没有选择课程，去「课程列表」挑几门吧。
    </p>

    <table v-else class="table">
      <thead>
        <tr>
          <th>编号</th>
          <th>课程名称</th>
          <th>教师</th>
          <th>上课时间</th>
          <th>学分</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courseStore.selectedCourses" :key="course.id">
          <td>{{ course.id }}</td>
          <td class="name">{{ course.name }}</td>
          <td>{{ course.teacher }}</td>
          <td>{{ course.schedule }}</td>
          <td>{{ course.credits }}</td>
          <td>
            <button type="button" class="drop" @click="courseStore.removeCourse(course.id)">
              退课
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="foot">
      <button
        type="button"
        class="clear"
        :disabled="courseStore.selectedCount === 0"
        @click="courseStore.clearCourses()"
      >清空选课表</button>
    </div>
  </section>
</template>

<style scoped>
.panel { margin-top: 18px; }
.empty {
  padding: 36px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.table th,
.table td {
  padding: 9px 12px;
  border-bottom: 1px solid #f0e2e2;
  text-align: left;
}
.table th {
  background: #faf3f3;
  color: #7a0000;
  font-weight: 700;
}
.table .name { color: #2b2b2b; font-weight: 600; }
.drop {
  padding: 3px 14px;
  border: 1px solid #d9a0a0;
  border-radius: 4px;
  background: #fff;
  color: #c00000;
  font-size: 12px;
  cursor: pointer;
}
.drop:hover { background: #c00000; color: #fff; }
.foot {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
}
.clear {
  padding: 6px 18px;
  border: none;
  border-radius: 4px;
  background: #555;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.clear:hover:not(:disabled) { background: #333; }
.clear:disabled { background: #c9c9c9; cursor: not-allowed; }
</style>
