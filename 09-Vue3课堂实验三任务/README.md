# Vue 3 课堂实验：三个实战任务（第九次实验）

《Web应用开发》课程第九次实验：使用 **Vue 3**（`createApp` 全局构建版）完成三个经典交互组件，
每个任务一个单文件页面，样式与逻辑均内联，通过本地 `assets/vue.global.js`（v3.5.45）引入，
**无需构建工具、无需 npm、可离线运行**。

## 实验内容

| 文件 | 任务 | 核心指令与技术 |
|---|---|---|
| `01-menu.html` | 导航栏弹出菜单 | `v-for` 渲染菜单项、`v-show` / `v-if` 控制弹出层显隐、`@click` 切换 |
| `02-accordion.html` | 百叶窗（手风琴面板） | `v-for` 生成面板、`v-bind:style` 动态控制展开宽度、`transition` 平滑过渡 |
| `03-carousel.html` | 轮播图 | `v-for` 渲染轮播项、`v-show` 切换当前帧、`v-bind:class` 高亮指示点、定时器自动播放 |
| `index.html` | 实验入口页 | 三个任务的选择导航（同样用 `v-for` + `v-bind` 渲染卡片） |

## 涉及知识点

- Vue 3 应用创建：`createApp({ data, methods }).mount()`
- 列表渲染 `v-for`、条件渲染 `v-show` / `v-if` 的区别与适用场景
- 属性绑定 `v-bind:style` / `v-bind:class`（及 `:style` / `:class` 缩写）驱动样式状态
- 事件绑定 `v-on:click`（`@click`）与定时器配合实现自动轮播
- CSS `transition` 与 Vue 状态驱动的配合

## 运行方式

直接用 Edge / Chrome 打开 `index.html`（或任意单个任务页面）即可，
Vue 运行时从本地 `assets/` 加载，无需联网、无需启动服务器。

> 说明：仓库为公开项目，原始压缩包内混入的课堂照片未随源码入库。
