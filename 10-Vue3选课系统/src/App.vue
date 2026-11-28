<!-- 根组件：全站顶栏 + 路由出口 -->
<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()
const router = useRouter()

// 退出登录：清掉 store 与 localStorage 里的登录信息，并回登录页
function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <span class="logo">SCU</span>
        <span class="title">学生选课系统</span>
        <span class="sub">Vue 3 · 组件化 · 前后端分离</span>
      </div>

      <nav class="nav">
        <RouterLink to="/">课程列表</RouterLink>
        <RouterLink to="/selected">我的已选</RouterLink>
      </nav>

      <div class="user">
        <template v-if="userStore.isLoggedIn">
          <span class="hello">{{ userStore.student.name }}（{{ userStore.student.no }}）</span>
          <button type="button" class="ghost-btn" @click="logout">退出登录</button>
        </template>
        <span v-else class="hello">未登录</span>
      </div>
    </div>
  </header>

  <main class="page">
    <RouterView></RouterView>
  </main>
</template>

<style scoped>
.topbar {
  background: linear-gradient(180deg, #9a0000, #7a0000);
  box-shadow: 0 2px 8px rgba(90, 0, 0, .25);
}
.topbar-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 28px;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: #fff;
}
.logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
}
.sub {
  font-size: 11px;
  opacity: .75;
}
.nav {
  display: flex;
  gap: 4px;
}
.nav a {
  padding: 6px 14px;
  border-radius: 4px;
  color: #f4d9d9;
  text-decoration: none;
  font-size: 14px;
}
.nav a:hover { background: rgba(255, 255, 255, .14); color: #fff; }
.nav a.router-link-active { background: rgba(255, 255, 255, .2); color: #fff; font-weight: 700; }

.user {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffe3e3;
  font-size: 13px;
}
.ghost-btn {
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, .55);
  border-radius: 4px;
  background: transparent;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
.ghost-btn:hover { background: rgba(255, 255, 255, .15); }

.page {
  max-width: 1080px;
  margin: 24px auto 60px;
  padding: 0 20px;
}
</style>
