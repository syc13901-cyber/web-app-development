# JavaScript 课堂实验：10 道题

本目录完成任务卡中的 10 道实验题。所有代码均可直接用 Node.js 运行，不需要安装第三方依赖。

## 环境

- Node.js 18 或更高版本
- 已在 Node.js `v24.16.0` 下验证

## 文件与题目

| 题号 | 文件 | 内容 |
|---|---|---|
| 2.1-1 | `01_bmi.js` | BMI 计算与四档分级 |
| 2.1-2 | `02_for_while_sum.js` | for / while 分别计算 1 到 100 的和 |
| 2.1-3 | `03_random_stats.js` | 10 个随机整数的总和与平均值 |
| 2.1-4 | `04_sort_trap.js` | `sort()` 默认字典序陷阱与数值排序 |
| 2.2-1 | `05_rest_sum.js` | rest 参数与 `reduce` 求和 |
| 2.2-2 | `06_map_filter.js` | `map` 转等级、`filter` 筛及格成绩 |
| 2.2-3 | `07_password_closure.js` | 用闭包封装密码 |
| 2.2-4 | `08_me_object.js` | 含 3 个属性和 1 个方法的自我描述对象 |
| 2.3-1 | `09_cat.js` | Cat 构造函数与原型共享方法 |
| 2.4-1 | `10a_promise_download.js` | 2 秒下载的 Promise 链版本 |
| 2.4-1 | `10b_async_download.js` | 2 秒下载的 async/await 版本 |

第 10 题的两个版本都会显示 Promise 的三种状态：启动时为 `pending`，成功任务变为 `fulfilled`，失败任务变为 `rejected`。成功和失败任务并行执行，因此每个版本约 2 秒完成。

## 运行

运行单题：

```bash
node 01_bmi.js
node 10a_promise_download.js
```

运行全部示例：

```bash
npm run demo
```

运行自动验收：

```bash
npm test
```

