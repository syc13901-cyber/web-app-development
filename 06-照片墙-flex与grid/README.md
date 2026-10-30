# 光影集 · 照片墙（Flex 布局 / Grid 布局）

Web 应用开发 · 照片墙实验：**同一个页面内容，用 Flex 与 Grid 两种布局技术各实现一次**，
页面采用 1-n-1 结构，照片在鼠标悬停时产生旋转与形变动画，并通过 `z-index` 解决旋转后的重叠遮挡问题。

## 文件结构

```
照片墙-flex与grid/
├─ index.html          实验入口页（两个版本的选择页）
├─ flex.html           Flex 布局版
├─ grid.html           Grid 布局版
├─ css/
│  ├─ base.css         公共样式：变量、重置、字体、相框、悬停旋转形变动画
│  ├─ flex.css         Flex 版布局：页面 1-n-1 骨架 + flex-wrap 照片墙
│  └─ grid.css         Grid 版布局：grid-template-areas 骨架 + auto-fill 照片墙
└─ images/             12 张演示照片（程序绘制，无版权风险）
```

## 运行方式

直接用 Edge / Chrome 打开 `index.html` 即可，无需服务器、无需联网。
也可以在 VS Code 中右键 `index.html` → *Open with Live Server*。

## 1-n-1 布局说明

- **顶部 1**：`header`（品牌与版本切换）+ `nav`（分类导航）。
- **中间 n**：`main` 中 10 张照片错落排布，是 1-n-1 的「n」。
- **底部 1**：`footer`（版权与布局技术说明）。

照片墙内部同样是 1-n-1 的节奏：**第 1 张通栏开篇 → 10 张错落主体 → 第 12 张通栏收束**。

| 版本 | 页面骨架 | 照片墙 | 通栏照片 |
| --- | --- | --- | --- |
| Flex | `display:flex; flex-direction:column` + `main{flex:1}` | `display:flex; flex-wrap:wrap`、`flex:1 1 var(--w)` | `flex:1 1 100%` |
| Grid | `display:grid; grid-template-areas:"header" "nav" "main" "footer"` + `grid-template-rows:auto auto 1fr auto` | `repeat(auto-fill, minmax(220px,1fr))` | `grid-column: 1 / -1` |

## 关键技术点

1. **悬停旋转形变动画**：`@keyframes swing` 让照片在 1.05s 内完成「回正 + 抬升 + 放大 + 轻微倾斜变形」，
   悬停结束后由 `transition: transform .5s` 平滑回到初始倾角。
2. **层叠顺序**：照片默认 `position: relative; z-index: 1`，悬停时 `z-index: 40`，
   旋转后即使与相邻照片重叠也会完整显示在最上层（题目提示的 `z-index` 关键点）。
3. **错落感**：每张照片的初始倾角 `--tilt`、纵向位移 `--shift` 由 `nth-child` 统一设置，
   Flex 版另用 `--w` 控制不同的基准宽度。
4. **响应式**：900px / 640px 两个断点；Grid 版的 `auto-fill + minmax()` 不需要断点即可自动增减列数。
5. **可访问性**：照片可用 Tab 聚焦（`:focus-visible` 同样触发动效），
   并提供 `prefers-reduced-motion` 降级（关闭动画，仅保留阴影反馈）。

## 对照实验要求

- [x] 完整的 `header`、`nav`、`body(main)`、`footer` 页面元素；
- [x] 鼠标悬停照片 → 旋转、形变动画；
- [x] 旋转导致重叠 → `z-index` 提升层级；
- [x] 分别使用 Flex 布局与 Grid 布局实现 1-n-1 布局的照片墙。
