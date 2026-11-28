<!-- 登录页：防卫路由的落脚点
     未登录访问任何页面都会被守卫重定向到这里，
     登录成功后按守卫记住的 redirect 原路返回 -->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const no = ref('')
const name = ref('')
const tip = ref('')

function doLogin() {
  if (!no.value.trim() || !name.value.trim()) {
    tip.value = '请填写学号和姓名'
    return
  }
  // 写进 user store（同时持久化到 localStorage）
  userStore.login(no.value.trim(), name.value.trim())
  // 防卫路由记住的原路返回；没有记录就去课程列表
  const target = route.query.redirect || '/'
  router.push(target)
}
</script>

<template>
  <section class="login">
    <div class="card">
      <h2>登录选课系统</h2>
      <p class="sub">演示防卫路由：未登录访问任意页面都会先来到这里</p>

      <div class="row">
        <label>学　号：</label>
        <input v-model="no" type="text" placeholder="例如 2023000000000" @keyup.enter="doLogin" />
      </div>
      <div class="row">
        <label>姓　名：</label>
        <input v-model="name" type="text" placeholder="请输入姓名" @keyup.enter="doLogin" />
      </div>

      <p v-if="tip" class="tip">{{ tip }}</p>

      <button type="button" class="btn" @click="doLogin">登 录</button>
    </div>
  </section>
</template>

<style scoped>
.login { display: flex; justify-content: center; padding: 60px 0; }
.card {
  width: 400px;
  padding: 30px 34px 34px;
  border: 1px solid #e5d5d5;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(90, 0, 0, .1);
}
.card h2 {
  margin: 0 0 6px;
  text-align: center;
  color: #9a0000;
}
.sub {
  margin: 0 0 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.row label {
  width: 70px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color: #444;
}
.row input {
  flex: 1;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #d4b6b6;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
}
.row input:focus { border-color: #9a0000; }
.tip {
  margin: 0 0 10px 80px;
  color: #c00000;
  font-size: 12px;
}
.btn {
  width: 100%;
  height: 40px;
  margin-top: 6px;
  border: none;
  border-radius: 4px;
  background: #9a0000;
  color: #fff;
  font-size: 15px;
  letter-spacing: 4px;
  cursor: pointer;
}
.btn:hover { background: #7a0000; }
</style>
