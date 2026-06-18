# AGENTS.md

## 项目概览

这是一个为“动态设计师 / AI 设计师”搭建的个人作品集网站，使用 React + Vite 实现。页面为单页结构，视觉方向是暗色、高级、克制、有科技感，并参考 `okeanagency.com` 的大画面排版比例。

当前页面包含：

- 全屏 Hero：视频背景、悬停展开导航、精选项目按钮。
- 精选项目：5 个大屏作品模块，分别是 AI影像、品牌演绎、粒子动态、科技包装、其他影像。
- 个人经历：参考蓝色发布卡片样式的时间轴模块。
- 个人优势：能力卡片。
- 底部联系方式：整屏收尾联系区。

## 技术栈

- React 19
- Vite 6
- 原生 CSS
- 不使用 UI 组件库
- 不使用路由、CMS、后端或表单提交服务

## 主要文件

- `src/main.jsx`：React 入口。
- `src/App.jsx`：页面内容、项目数据、经历数据、优势数据。
- `src/App.css`：全站视觉、布局、响应式和动效样式。
- `index.html`：Vite 入口 HTML。
- `public/`：开发环境静态资源目录，包含首页和项目视频。
- `dist/index.html`：当前静态预览用 HTML。
- `dist/assets/index-DXB99jfA.css`：当前静态预览用 CSS。
- `scripts/serve-dist.mjs`：静态预览服务器。

## 运行方式

常规开发命令：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

当前环境中，Vite 可能因为 Windows 权限/进程限制报 `spawn EPERM`。如果出现该问题，优先使用静态预览：

```bash
npm run preview:static
```

静态预览默认服务当前 `dist/` 目录，常用地址：

```text
http://127.0.0.1:5173/
```

## 当前资源

`public/` 中的视频资源：

- `hero-video.mp4`：Hero 首屏视频背景。
- `project-ai-video.mp4`：AI影像。
- `project-brand-video.mp4`：品牌演绎。
- `project-particle-video.m4v`：粒子动态。
- `project-tech-video.mp4`：科技包装。
- `project-other-video.mp4`：其他影像。

`dist/assets/` 中也有一份对应资源，用于当前静态预览。

## 修改约定

- 优先修改 `src/App.jsx` 和 `src/App.css`。
- 如果当前浏览器预览依赖 `dist/`，修改后需要同步更新 `dist/index.html` 和 `dist/assets/index-DXB99jfA.css`，否则用户刷新 `127.0.0.1:5173` 可能看不到变化。
- 页面文案使用中文，避免再次引入乱码。
- 手动编辑文件时使用 `apply_patch`。
- 不要随意删除或替换用户提供的视频素材。
- 不要引入复杂 UI 框架，保持纯 React + CSS 的可控结构。
- 版心和大屏视觉以 PC 展示为主，整体最大宽度约 1700px；但保留基础响应式。

## 视觉方向

- 暗色页面基调，冷白文字，少量电光蓝/银灰强调。
- 项目模块强调大画面视频占比，每个项目尽量接近整屏展示。
- Hero 视频不加重暗色遮罩，保持视频本身质感。
- 导航默认收起，以右上角图标形式显示，悬停时展开导航面板。
- 个人经历当前是浅色分区 + 蓝色时间卡片，用于贴近用户提供的参考图。

## 验证建议

修改后至少检查：

- `src/App.jsx` JSX 语法是否可解析。
- 当前预览 HTML/CSS 是否包含最新结构。
- 首页视频、5 个项目视频是否仍能播放。
- 个人经历模块是否为 4 张蓝色卡片：`2015`、`2016`、`2018`、`持续更新`。
- PC 端首屏、项目区和联系区是否没有明显文字重叠。

如果 `npm run build` 因 `spawn EPERM` 失败，记录为环境问题；不要把它误判为页面代码语法错误。
