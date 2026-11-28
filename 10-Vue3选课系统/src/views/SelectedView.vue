<!-- 我的已选页：统计（getter 派生）+ 清单（已选课程组件）+ 退课 -->
<script setup>
import { computed } from 'vue'
import SelectedCourses from '@/components/SelectedCourses.vue'
import { useCourseStore } from '@/store/course.js'

const courseStore = useCourseStore()

// 学分分布统计：{ 2学分: 1 门, 3学分: 2 门 ... }
const creditStats = computed(() => {
  const map = {}
  courseStore.selectedCourses.forEach((course) => {
    map[course.credits] = (map[course.credits] || 0) + 1
  })
  return Object.keys(map)
    .map((credits) => ({ credits: Number(credits), count: map[credits] }))
    .sort((a, b) => a.credits - b.credits)
})
</script>

<template>
  <section>
    <h2 class="title">我的已选</h2>

    <!-- 统计区：全部来自 pinia 的 getter，store 一变这里自动更新 -->
    <div class="stats">
      <div class="stat">
        <p class="num">{{ courseStore.selectedCount }}</p>
        <p class="label">已选课程（门）</p>
      </div>
      <div class="stat">
        <p class="num">{{ courseStore.totalCredits }}</p>
        <p class="label">总学分</p>
      </div>
      <div class="stat wide">
        <p class="dist">
          <span v-if="creditStats.length === 0" class="none">暂无选课</span>
          <span v-for="s in creditStats" :key="s.credits" class="chip">
            {{ s.credits }} 学分 × {{ s.count }} 门
          </span>
        </p>
        <p class="label">学分分布</p>
      </div>
    </div>

    <!-- 清单 + 退课：封装在已选课程组件里 -->
    <SelectedCourses></SelectedCourses>
  </section>
</template>

<style scoped>
.title {
  margin: 0 0 14px;
  color: #7a0000;
}
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1.6fr;
  gap: 14px;
}
.stat {
  padding: 16px 20px;
  border: 1px solid #ecdcdc;
  border-radius: 8px;
  background: #fff;
}
.stat .num {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: #9a0000;
}
.stat .label {
  margin: 4px 0 0;
  color: #999;
  font-size: 12px;
}
.dist { margin: 6px 0; min-height: 34px; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 3px 10px;
  border: 1px solid #e3c8c8;
  border-radius: 999px;
  background: #faf3f3;
  color: #9a0000;
  font-size: 12px;
}
.none { color: #bbb; font-size: 13px; }
</style>
