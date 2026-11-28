# Web 应用开发

《Web应用开发》课程实验作业合集。仓库按**完成顺序**收录各次实验的源码，
每个实验目录内附独立 README 说明实验内容、知识点与运行方式。

## 实验一览（按完成顺序）

| 顺序 | 实验 | 内容 | 主要技术 |
|---|---|---|---|
| 1 | [04-盒子模型](./04-盒子模型/) | 8 个渐进式盒模型练习页面 | HTML / CSS（border·margin·padding·box-sizing） |
| 2 | [05-个人主页](./05-个人主页/) | 仿川大官网风格个人主页 | HTML / DIV+CSS 传统布局（禁 flex/grid） |
| 3 | [06-照片墙-flex与grid](./06-照片墙-flex与grid/) | 同一页面用 Flex 与 Grid 各实现一次的照片墙 | Flexbox / CSS Grid / CSS 动画 |
| 4 | [07-ECMAScript课堂实验10题](./07-ECMAScript课堂实验10题/) | ECMAScript 课堂实验 10 题 | Node.js / ES6+（闭包·原型·Promise·async） |
| 5 | [08-BOM-DOM与AJAX](./08-BOM-DOM与AJAX/) | 列表互移 / 表单校验 / AJAX 用户列表 | 原生 JS（DOM / BOM / XMLHttpRequest） |
| 6 | [09-Vue3课堂实验三任务](./09-Vue3课堂实验三任务/) | 导航菜单 / 百叶窗 / 轮播图 | Vue 3（v-for·v-show·v-bind·定时器） |
| 7 | [10-Vue3选课系统](./10-Vue3选课系统/) | SPA 选课系统（登录/列表/详情/已选） | Vue3 + Vite + vue-router + Pinia + axios |

## 运行方式

- **静态页面类**（04 / 05 / 06 / 08 / 09）：直接用浏览器打开对应目录的 `*.html` 文件即可；
  仅 `08-BOM-DOM与AJAX/03-AJAX加载.html` 需联网请求远程测试接口（09 的 Vue 运行时为本地文件，可离线）。
- **Node.js 类**（07）：进入目录后执行

  ```bash
  npm run demo   # 依次运行全部 10 题
  npm test       # 自动验收
  ```

- **Vite 工程类**（10）：进入 `10-Vue3选课系统/` 后执行 `npm install && npm run dev`，
  浏览器访问 Vite 提示的地址（默认 http://localhost:5173）

## 目录结构

```
web应用开发/
├─ 04-盒子模型/               第四次实验
├─ 05-个人主页/               第五次实验
├─ 06-照片墙-flex与grid/      第六次实验
├─ 07-ECMAScript课堂实验10题/ 第七次实验
├─ 08-BOM-DOM与AJAX/          第八次实验
├─ 09-Vue3课堂实验三任务/     第九次实验
└─ 10-Vue3选课系统/           第十次实验
```

## 环境

- 浏览器：Edge / Chrome（建议最新版）
- Node.js ≥ 18（仅第 4 个实验需要，已在 v24 下验证）
