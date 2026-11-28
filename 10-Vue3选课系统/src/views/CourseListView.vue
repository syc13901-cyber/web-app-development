<!-- 课程列表页：axios 异步加载 course.json + 查询路由（搜索词 q / 页码 page 写进地址） -->
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import CourseCard from '@/components/CourseCard.vue'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 6

// 页面自己的状态：课程数组、加载中、错误提示
const state = reactive({
  courses: [],
  loading: false,
  error: ''
})

// 要求 4：用 axios 向本地服务器异步加载课程数据（course.json 在 public 目录下）
async function loadCourses() {
  state.loading = true
  state.error = ''
  try {
    const res = await axios.get('/course.json', { timeout: 8000 })
    state.courses = res.data
  } catch (err) {
    state.error = '课程数据加载失败，请确认本地服务器（npm run dev）已启动后刷新重试。'
    console.error('加载课程数据失败：', err)
  } finally {
    state.loading = false
  }
}
onMounted(loadCourses)

// —— 查询路由：搜索词 q 与页码 page 都保存在地址问号后，刷新/分享地址都不丢 ——
const q = computed(() => (route.query.q || '').toString())
const page = computed(() => Math.max(1, parseInt(route.query.page) || 1))

// 搜索框的输入内容（仅输入时用，点搜索才写进地址）
const keyword = ref('')
// 输入框跟随地址变化：刷新、后退时显示地址里记录的词
watch(q, (v) => { keyword.value = v }, { immediate: true })

// computed 派生：地址里的 q 一变，列表自动重新过滤
const filtered = computed(() => {
  const k = q.value.trim()
  if (!k) return state.courses
  return state.courses.filter(
    (c) => c.name.includes(k) || c.teacher.includes(k) || c.id.includes(k)
  )
})
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE))
)
const pageCourses = computed(() =>
  filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE)
)

// 点「搜索」：把搜索词写进地址（查询路由），并回到第 1 页
function search() {
  router.push({ path: '/', query: { q: keyword.value.trim() || undefined, page: 1 } })
}
// 翻页：只改地址里的 page，搜索词保持不变
function goPage(p) {
  router.push({ path: '/', query: { q: q.value || undefined, page: p } })
}
</script>

<template>
  <section>
    <div class="toolbar">
      <h2>课程列表</h2>
      <div class="search">
        <input
          v-model="keyword"
          type="text"
          placeholder="按课程名 / 教师 / 编号搜索"
          @keyup.enter="search"
        />
        <button type="button" @click="search">搜索</button>
        <button
          v-if="q"
          type="button"
          class="plain"
          @click="router.push({ path: '/', query: {} })"
        >清除（当前：{{ q }}）</button>
      </div>
    </div>

    <!-- axios 的三种请求状态 -->
    <p v-if="state.loading" class="tip loading">正在加载课程数据……</p>
    <p v-else-if="state.error" class="tip error">{{ state.error }}</p>

    <template v-else>
      <p class="meta">
        共 <b>{{ filtered.length }}</b> 门课程
        <template v-if="q">（搜索“{{ q }}”）</template>
        ，当前第 {{ page }} / {{ totalPages }} 页
      </p>

      <!-- 选课卡片组件：v-for 渲染当前页 -->
      <div class="grid">
        <CourseCard
          v-for="course in pageCourses"
          :key="course.id"
          :course="course"
        />
      </div>
      <p v-if="filtered.length === 0" class="tip">没有匹配的课程</p>

      <!-- 分页 -->
      <div class="pager" v-if="totalPages > 1">
        <button type="button" :disabled="page <= 1" @click="goPage(page - 1)">上一页</button>
        <button
          v-for="p in totalPages"
          :key="p"
          type="button"
          :class="{ on: p === page }"
          @click="goPage(p)"
        >{{ p }}</button>
        <button type="button" :disabled="page >= totalPages" @click="goPage(page + 1)">下一页</button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}
.toolbar h2 {
  margin: 0;
  color: #7a0000;
}
.search { display: flex; gap: 8px; }
.search input {
  width: 240px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid #d4b6b6;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
}
.search input:focus { border-color: #9a0000; }
.search button {
  height: 34px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background: #9a0000;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.search button:hover { background: #7a0000; }
.search button.plain {
  background: #fff;
  border: 1px solid #d4b6b6;
  color: #9a0000;
}
.meta { color: #666; font-size: 13px; margin: 0 0 12px; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.tip { padding: 40px 0; text-align: center; color: #999; }
.tip.error { color: #c00000; }
.pager {
  margin-top: 18px;
  display: flex;
  gap: 8px;
  justify-content: center;
}
.pager button {
  min-width: 34px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9c2c2;
  border-radius: 4px;
  background: #fff;
  color: #555;
  font-size: 13px;
  cursor: pointer;
}
.pager button.on {
  background: #9a0000;
  border-color: #9a0000;
  color: #fff;
  font-weight: 700;
}
.pager button:disabled { color: #c5aaaa; cursor: not-allowed; }
</style>
