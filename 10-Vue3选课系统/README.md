# Vue 3 选课系统（第十次实验）

《Web应用开发》课程第十次实验：用 **Vue 3 + Vite** 构建的单页应用（SPA）模拟选课系统，
首次引入工程化开发方式（npm 管理依赖、Vite 构建、组件化拆分），
覆盖 **vue-router 路由、路由参数/查询/守卫、Pinia 状态管理与持久化** 等核心知识点。

## 功能页面

| 路由 | 页面 | 说明 |
|---|---|---|
| `/login` | 登录页 | 输入学号姓名，写入 Pinia + localStorage，未登录时导航守卫会强制跳转到这里 |
| `/` | 课程列表 | axios 从 `public/course.json` 加载课程数据；搜索词 `?q=` 与页码 `?page=` 走**查询路由**，可分享/刷新保留 |
| `/courses/:id` | 课程详情 | **params 路由**：课程编号写在地址路径里，动态匹配 |
| `/selected` | 我的已选 | 已选课程汇总、学分合计，可在列表页取消已选 |

## 项目结构

```
10-Vue3选课系统/
├─ index.html / vite.config.js / package.json   Vite 工程配置
├─ public/course.json      课程数据（axios 请求源）
└─ src/
   ├─ main.js              应用入口：createApp + Pinia + Router
   ├─ router/index.js      路由表：原始/params/查询三类路由 + beforeEach 防卫路由
   ├─ store/
   │  ├─ user.js           用户 store：登录信息 + localStorage 持久化
   │  └─ course.js         选课 store：已选列表共享、学分合计 getter、去重报名
   ├─ views/               四个页面级组件
   └─ components/          CourseCard（课程卡片）、SelectedCourses（已选面板）
```

## 涉及知识点

- Vue 3 单文件组件（SFC）与 `<script setup>` 组合式 API
- vue-router：`createWebHashHistory` hash 模式、动态路由 `/courses/:id`、
  查询参数 `?q=&page=`、`beforeEach` 全局导航守卫（防卫路由）
- Pinia：`state / getters / actions`、跨组件共享、getter 传参（`isSelected(courseId)`）
- localStorage 持久化：登录态与选课记录刷新不丢失
- axios 异步加载 JSON 数据 + 加载状态处理

## 运行方式

需要 Node.js ≥ 22.18（已在 Node 24 下验证），首次运行先安装依赖：

```bash
npm install
npm run dev        # 启动开发服务器（Vite，默认 http://localhost:5173）
npm run build      # 生产构建
npm run preview    # 预览构建产物
```

> 说明：仓库为公开项目，登录页示例学号已替换为 `2023000000000` 占位。
