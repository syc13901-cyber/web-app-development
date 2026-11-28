<!-- 选课卡片组件：组件化要求 1
     卡片本身不保存任何课程数据，全部通过 props 从父组件接收；
     报名 / 判断是否已报则调用 pinia store，多个卡片共享同一份状态 -->
<script setup>
import { computed } from 'vue'
import { useCourseStore } from '@/store/course.js'

// props：父组件（课程列表页）传入的一门课程对象
const props = defineProps({
  course: { type: Object, required: true }
})

const courseStore = useCourseStore()

// 是否已报名 / 是否满员：都是数据的派生结果
const selected = computed(() => courseStore.isSelected(props.course.id))
const full = computed(() => props.course.enrolled >= props.course.capacity)
</script>

<template>
  <div class="card" :class="{ selected }">
    <div class="head">
      <span class="cid">{{ course.id }}</span>
      <span class="credits">{{ course.credits }} 学分</span>
    </div>

    <h3 class="name">{{ course.name }}</h3>
    <p class="line">教师：{{ course.teacher }}　·　{{ course.department }}</p>
    <p class="line">时间：{{ course.schedule }}　·　{{ course.location }}</p>
    <p class="line">
      名额：{{ course.enrolled }} / {{ course.capacity }}
      <span v-if="full" class="tag full">已满员</span>
      <span v-else-if="selected" class="tag done">已报名</span>
    </p>

    <div class="foot">
      <RouterLink class="detail" :to="'/courses/' + course.id">详情</RouterLink>
      <button
        type="button"
        class="enroll"
        :disabled="selected || full"
        @click="courseStore.addCourse(course)"
      >
        {{ selected ? '已报名' : full ? '已满员' : '报 名' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 14px 16px 12px;
  border: 1px solid #e5d5d5;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(90, 0, 0, .06);
}
.card.selected { border-color: #9a0000; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cid {
  padding: 1px 8px;
  border-radius: 3px;
  background: #f7eaea;
  color: #9a0000;
  font-size: 12px;
}
.credits { color: #b35555; font-size: 12px; }
.name {
  margin: 8px 0 6px;
  font-size: 16px;
  color: #2b2b2b;
}
.line {
  margin: 3px 0;
  font-size: 12px;
  color: #777;
}
.tag {
  margin-left: 8px;
  padding: 1px 7px;
  border-radius: 3px;
  font-size: 11px;
}
.tag.full { background: #fdeaea; color: #c00000; }
.tag.done { background: #e8f5e9; color: #2e7d32; }
.foot {
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail {
  font-size: 12px;
  color: #9a0000;
  text-decoration: none;
}
.detail:hover { text-decoration: underline; }
.enroll {
  padding: 5px 18px;
  border: none;
  border-radius: 4px;
  background: #9a0000;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.enroll:hover:not(:disabled) { background: #7a0000; }
.enroll:disabled {
  background: #d8c3c3;
  cursor: not-allowed;
}
</style>
