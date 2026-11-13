# BOM、DOM 与 AJAX（第八次实验）

《Web应用开发》课程第八次实验：用原生 JavaScript 完成 BOM / DOM / AJAX 三个练习页面，
每个页面均为单文件自包含（HTML + `<style>` + `<script>`），无任何第三方依赖。

## 实验内容

| 文件 | 题目 | 涉及技术 |
|---|---|---|
| `01-列表互移.html` | 双列表名单互移（支持多选） | DOM 节点增删、`li.active` 多选状态、`click` 事件委托 |
| `02-表单校验.html` | 带即时校验的用户注册程序 | 表单事件（`input` / `blur` / `submit`）、正则表达式 `RegExp.test()`、错误提示 DOM |
| `03-AJAX加载.html` | 原生 AJAX 加载远程用户数据 | `XMLHttpRequest` 五步法、JSON 解析、动态渲染列表 |

## 说明

- **列表互移**：左右两个名单 `<ul>`，点击条目切换 `active` 状态实现多选，再一键互移，考察 DOM 元素的创建、追加与移除。
- **表单校验**：输入时即时提示、失焦复检、提交时统一拦截，覆盖常见的用户名 / 密码 / 邮箱正则校验。
- **AJAX 加载**：不刷新页面异步请求远程 JSON 用户数据，展示 `readyState` 变化与 `onreadystatechange` 回调的完整流程。

## 运行方式

直接用 Edge / Chrome 打开任意 `*.html` 文件即可。
`03-AJAX加载.html` 请求远程测试接口 `https://jsonplaceholder.typicode.com/users`，需要联网。
