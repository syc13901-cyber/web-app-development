<!-- 课程详情页：params 路由 /courses/:id
     编号写在地址路径里，用 useRoute().params.id 读出来，
     再用 axios 从服务器数据里找到这门课 -->
<script setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCourseStore } from '@/store/course.js'

const route = useRoute()
const courseStore = useCourseStore()

const state = reactive({ course: null, loading: false, error: '' })

async function load() {
  state.loading = true
  state.error = ''
  state.course = null
  try {
    const res = await axios.get('/course.json', { timeout: 8000 })
    // 从服务器返回的全部课程里，找出地址里编号对应的那一门
    state.course = res.data.find((c) => c.id === route.params.id) || null
    if (!state.course) {
      state.error = '没有找到编号为 ' + route.params.id + ' 的课程。'
    }
  } catch (err) {
    state.error = '课程数据加载失败，请确认本地服务器已启动。'
  } finally {
    state.loading = false
  }
}
load()

// 详情页被复用时（编号变化），重新加载
watch(() => route.params.id, load)
</script>

<template>
  <section class="detail">
    <p v-if="state.loading" class="tip">正在加载课程信息……</p>
    <p v-else-if="state.error" class="tip error">{{ state.error }}</p>

    <template v-else>
      <p class="crumb">
        <RouterLink to="/">← 返回课程列表</RouterLink>
        <span>　当前地址：<code>{{ route.fullPath }}</code>（params.id = <b>{{ route.params.id }}</b>）</span>
      </p>

      <div class="box">
        <div class="head">
          <h2>{{ state.course.name }}</h2>
          <span class="credits">{{ state.course.credits }} 学分</span>
        </div>
        <p class="line"><b>开课学院：</b>{{ state.course.department }}</p>
        <p class="line"><b>任课教师：</b>{{ state.course.teacher }}</p>
        <p class="line"><b>上课时间：</b>{{ state.course.schedule }}</p>
        <p class="line"><b>上课地点：</b>{{ state.course.location }}</p>
        <p class="line"><b>选课人数：</b>{{ state.course.enrolled }} / {{ state.course.capacity }}</p>
        <p class="desc">{{ state.course.description }}</p>

        <button
          type="button"
          class="enroll"
          :disabled="courseStore.isSelected(state.course.id) || state.course.enrolled >= state.course.capacity"
          @click="courseStore.addCourse(state.course)"
        >
          {{ courseStore.isSelected(state.course.id)
             ? '已报名'
             : state.course.enrolled >= state.course.capacity ? '已满员' : '报 名' }}
        </button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.detail { max-width: 760px; margin: 0 auto; }
.crumb { font-size: 12px; color: #999; }
.crumb a { color: #9a0000; text-decoration: none; }
.crumb code { background: #f5efef; padding: 1px 6px; border-radius: 3px; }
.box {
  margin-top: 14px;
  padding: 22px 26px;
  border: 1px solid #e5d5d5;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(90, 0, 0, .06);
}
.head { display: flex; align-items: center; gap: 14px; }
.head h2 { margin: 0; color: #2b2b2b; }
.credits {
  padding: 2px 10px;
  border-radius: 999px;
  background: #f7eaea;
  color: #9a0000;
  font-size: 12px;
}
.line { margin: 10px 0; font-size: 14px; color: #555; }
.line b { color: #333; }
.desc {
  margin: 14px 0 18px;
  padding: 12px 16px;
  border-left: 3px solid #9a0000;
  background: #faf5f5;
  color: #666;
  font-size: 13px;
  line-height: 1.8;
}
.enroll {
  padding: 8px 34px;
  border: none;
  border-radius: 4px;
  background: #9a0000;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.enroll:hover:not(:disabled) { background: #7a0000; }
.enroll:disabled { background: #d8c3c3; cursor: not-allowed; }
.tip { padding: 50px 0; text-align: center; color: #999; }
.tip.error { color: #c00000; }
</style>
