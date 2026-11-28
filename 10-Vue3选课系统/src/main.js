import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 导入路由表（含防卫路由守卫）
import router from './router'

const app = createApp(App)

// 先装 pinia（守卫里会用到 store），再装路由
app.use(createPinia())
app.use(router)

app.mount('#app')
