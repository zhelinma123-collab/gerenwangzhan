# 项目交接文档：动态设计师 / AI 设计师个人作品集

本文档用于在新的对话窗口继续制作当前项目。新对话可以优先读取本文件，再读取 `AGENTS.md`、`src/App.jsx`、`src/App.css`。

## 1. 项目基本信息

- 项目目录：`F:\Codex\Codex_gerenwangzhan`
- 项目类型：React + Vite 单页个人作品集网站
- 当前定位：动态设计师 / AI 设计师个人作品集
- 主要展示方向：动态设计、AI 影像、品牌演绎、粒子动态、科技包装、其他影像
- 视觉方向：暗色、克制、高级、科技感、大画面视频、少量电光蓝/银灰强调
- 主要参考：`https://okeanagency.com/#rec149494191`
- 当前预览地址：`http://127.0.0.1:5173/`

## 2. 技术栈

- React 19
- Vite 6
- 原生 CSS
- OGL：用于联系区的 Aurora 光带背景
- 不使用 UI 组件库
- 不使用路由
- 不使用 CMS、后端或表单提交服务

相关依赖见 `package.json`：

```json
{
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "ogl": "^1.0.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vite": "^6.0.5"
  }
}
```

## 3. 当前文件结构

核心文件：

- `index.html`：Vite 入口 HTML。
- `vite.config.js`：Vite 配置，已接入 `@vitejs/plugin-react`。不要删除，否则生产包可能再次出现 `React is not defined`。
- `src/main.jsx`：React 挂载入口。
- `src/App.jsx`：页面结构、文案数据、项目数据、联系数据。
- `src/App.css`：几乎全部视觉样式、布局、响应式、动效。
- `src/BorderGlow.jsx`：个人经历卡片的边缘扫光/玻璃效果组件。
- `src/GradientText.jsx`：项目标题渐变文字组件。
- `src/SoftAurora.jsx`：联系区 OGL Aurora 光带背景组件。
- `scripts/serve-dist.mjs`：静态预览服务器，默认服务 `dist/`，端口 `5173`。
- `AGENTS.md`：项目内给 Codex 的协作说明，可能在部分终端显示乱码，但可作为辅助参考。
- `HANDOFF.md`：当前交接文档。

构建产物：

- `dist/index.html`
- `dist/assets/index-D5_JVaRu.css`
- `dist/assets/index-DjU55YZb.js`

注意：`dist` 文件名每次 `npm run build` 后可能变化，以实际构建输出为准。

## 4. 运行方式

开发模式：

```bash
npm.cmd run dev
```

生产构建：

```bash
npm.cmd run build
```

静态预览当前 `dist/`：

```bash
npm.cmd run preview:static
```

当前本地预览服务已经用 `preview:static` 方式重新启动过，端口状态：

- 地址：`http://127.0.0.1:5173/`
- 端口：`5173`
- 服务脚本：`scripts/serve-dist.mjs`

如果浏览器显示“无法访问此站点 / 无法加载 127.0.0.1”，通常是静态预览服务停了。重新运行：

```powershell
Start-Process -FilePath npm.cmd -ArgumentList @('run','preview:static') -WorkingDirectory 'F:\Codex\Codex_gerenwangzhan' -WindowStyle Hidden
```

然后刷新：

```text
http://127.0.0.1:5173/
```

## 5. 已知环境问题

1. Windows / Vite / esbuild 曾经多次出现：

```text
spawn EPERM
```

这通常是本地进程权限或 Windows 安全策略导致，不一定是代码错误。

2. PowerShell 直接 `Get-Content` 中文文件时，可能显示乱码，但文件本身通常是 UTF-8 正常内容。判断中文是否真实损坏时，优先用 Node 读取：

```powershell
@'
const fs = require('fs')
console.log(fs.readFileSync('src/App.jsx', 'utf8'))
'@ | node -
```

3. `index.html` 曾经出现过乱码并导致页面黑屏。当前源码中的 `index.html` 是正常 UTF-8：

```html
<meta name="description" content="动态设计师 / AI 设计师个人作品集" />
<title>设计师姓名 | 动态设计师 / AI 设计师</title>
```

如果黑屏，先检查：

- `dist/index.html` 是否正确引用最新 JS/CSS。
- 浏览器控制台是否有 `React is not defined`。
- `vite.config.js` 是否还存在并包含 React 插件。

## 6. 当前静态资源

所有主要视频放在 `public/`：

- `public/hero-video.mp4`：首页 Hero 背景视频。
- `public/project-ai-video.mp4`：AI影像项目视频。
- `public/project-brand-video.mp4`：品牌演绎项目视频。
- `public/project-particle-video.m4v`：粒子动态项目视频。
- `public/project-tech-video.mp4`：科技包装项目视频。
- `public/project-other-video.mp4`：其他影像项目视频。
- `public/contact-bg.webm`：曾用于联系区背景的视频素材；当前联系区实际主要使用 `SoftAurora.jsx` 的 OGL Aurora 光带。

不要随意删除这些视频。项目视频体积较大，构建和预览时要注意加载时间。

## 7. 当前页面结构

页面是单页结构，主要模块顺序如下：

1. `#home`：Hero 首屏
2. `#projects`：精选项目
3. `#experience`：当前视觉标题为“个人优势”的蓝色时间卡片模块
4. `#strengths`：当前视觉标题为“个人经历”的玻璃卡片模块
5. `#contact`：联系方式收尾页

重要说明：当前模块命名与视觉标题存在一次人为调换：

- `section#experience` 的标题当前显示为：`个人优势`
- `section#strengths` 的标题当前显示为：`个人经历`

这是按用户最新指令调整后的状态。不要在没有用户要求的情况下自动改回。

## 8. 当前数据内容

### 8.1 个人信息

在 `src/App.jsx` 顶部 `profile` 中：

```js
const profile = {
  name: '设计师姓名',
  title: '动态设计师 / AI 设计师',
  email: '879134129@qq.com',
  phone: '17783079621',
  wechat: 'your-wechat-id',
  location: '重庆',
}
```

当前联系区实际显示：

- 地址：重庆
- 电话：17783079621
- 邮箱：879134129@qq.com

“社交媒体 / 微 / Q”已经被删除，不要恢复。

### 8.2 精选项目

项目数据在 `src/App.jsx` 的 `projects` 数组中。

当前 5 个项目：

1. `AI影像`
   - meta：`生成式视觉 / 智能分镜 / 影像实验`
   - label：`01`
   - video：`/project-ai-video.mp4`
   - description：`将 AI 图像、视频生成与后期合成整合为完整影像流程，用于概念片、品牌短片和视觉提案。`

2. `品牌演绎`
   - meta：`标识动效 / 视觉系统 / 品牌影片`
   - label：`02`
   - video：`/project-brand-video.mp4`
   - description：`围绕品牌气质建立动态语言，将标识、字体、版式和转场演绎为可复用的传播资产。`

3. `粒子动态`
   - meta：`粒子系统 / 节奏控制 / 抽象视觉`
   - label：`03`
   - video：`/project-particle-video.m4v`
   - description：`通过粒子、流体、光线和空间节奏构建动态视觉，用于开场、舞台屏幕和氛围短片。`

4. `科技包装`
   - meta：`产品包装 / 科技质感 / 发布视觉`
   - label：`04`
   - video：`/project-tech-video.mp4`
   - description：`为科技产品和数字内容设计包装视觉，强化材质、结构、镜头运动与信息层级。`

5. `其他影像`
   - meta：`实验短片 / 活动视觉 / 多媒介内容`
   - label：`05`
   - video：`/project-other-video.mp4`
   - description：`承接更多影像方向的探索与制作，包括实验片、活动开场、社媒内容和跨媒介视觉。`

项目标题使用 `GradientText` 渐变文字组件，CSS 类为 `.project-gradient-title`。用户曾要求“AI影像这级标题使用文档里的渐变文字效果”，因此不要改回普通文本或 BorderGlow。

### 8.3 蓝色时间卡片模块

数据在 `src/App.jsx` 的 `experienceItems` 数组中。

当前模块 DOM id 是 `#experience`，但标题显示为 `个人优势`。

当前卡片：

1. `2015`
   - 标题：`进入视觉设计领域`
   - 文案：`从平面视觉、品牌基础和影像审美训练开始，建立对构图、字体、节奏和视觉层级的系统理解。`

2. `2016`
   - 标题：`转向动态影像与品牌动效`
   - 文案：`开始将标识、版式和品牌视觉转化为动态表达，参与片头、宣传片、活动视觉和屏幕内容制作。`

3. `2018`
   - 标题：`形成跨媒介动态设计方法`
   - 文案：`将三维、粒子、合成和数字内容流程整合到项目中，形成面向商业传播的动态视觉系统。`

4. `持续更新`
   - 标题：`AI设计与影像系统`
   - 文案：`继续将生成式工具、动态设计和品牌内容流程结合，扩展更多商业与实验项目。`

视觉样式参考用户提供的蓝色发布卡片图，相关 CSS 主要是：

- `.experience`
- `.experience-inner`
- `.release-heading`
- `.release-timeline`
- `.release-card`
- `.release-date`

### 8.4 玻璃卡片模块

数据在 `src/App.jsx` 的 `strengths` 数组中。

当前模块 DOM id 是 `#strengths`，但标题显示为 `个人经历`。

当前 4 张卡片标题已经按用户最新要求修改为：

1. `河南理工大学`
   - 描述：`节奏、镜头、转场与声音想象共同构成可被记住的运动语言。`

2. `邦和文化有限公司`
   - 描述：`把图像、视频、风格探索与后期整合为稳定且可复用的工作流。`

3. `西创集团`
   - 描述：`不只完成单张视觉，而是建立能跨媒介延展的识别系统。`

4. `汉沙数字科技集团`
   - 描述：`兼顾网页首屏、发布会屏幕、社媒短片和展陈影像的观看语境。`

这部分使用 `BorderGlow` 组件和玻璃卡片样式：

- `src/BorderGlow.jsx`
- `.strength-card`
- `.strength-card.border-glow-card`
- `.strength-card-content`
- `@keyframes strengthBorderRun`
- `@property --strength-sweep`

用户多次强调：

- 卡片底板要有半透明白色/玻璃质感。
- 要有沿边缘线的流光效果。
- 不要把顶部线性装饰改成星光符号。
- 卡片形状要接近个人经历蓝色卡片形状，当前是右下角圆角的矩形感。

### 8.5 联系方式模块

当前 `#contact` 只保留两列：

1. 地址：重庆
2. 联系方式：
   - 电话：17783079621
   - 邮箱：879134129@qq.com

已经删除：

- 社交媒体
- 微信按钮
- QQ 按钮
- QR 按钮
- 返回顶部按钮

联系区背景使用 `SoftAurora`：

```jsx
<SoftAurora
  speed={0.72}
  scale={1.65}
  brightness={1.55}
  color1="#f7f7f7"
  color2="#00d8ff"
  noiseFrequency={2.15}
  noiseAmplitude={1.75}
  bandHeight={0.38}
  bandSpread={1.22}
  octaveDecay={0.1}
  layerOffset={0.42}
  colorSpeed={1.85}
  enableMouseInteraction
  mouseInfluence={0.32}
/>
```

用户曾要求 Aurora 光带位置放在屏幕中下位置。相关 CSS：

- `.contact-bg`
- `.contact-bg .soft-aurora-container`
- `.contact-finale`
- `.contact-directory`

## 9. 关键视觉和交互状态

### 9.1 Hero

- Hero 全屏展示。
- 背景使用 `public/hero-video.mp4`。
- 不加重暗色遮罩，保留视频本身质感。
- 右上角导航默认收起，仅显示圆形图标。
- 鼠标悬停或聚焦导航时展开完整导航面板。
- Hero 按钮为紫色发光胶囊按钮，参考用户提供的蓝色按钮图。

相关 CSS：

- `.hero`
- `.hero-media`
- `.hero-video`
- `.nav`
- `.nav-trigger`
- `.nav-panel`
- `.hero-actions a`

### 9.2 精选项目

- 白/浅色背景区。
- 每个项目由大视频和文字信息组成。
- 项目视频高度为全屏的约三分之二。
- 项目标题使用渐变文字效果。
- “概览”标签已经删除。
- 项目标题曾被移动到原“概览”位置上方。
- 偶数项目视频/文字左右交错。

相关 CSS：

- `.projects`
- `.project-board`
- `.project-row`
- `.project-image`
- `.project-video`
- `.project-copy`
- `.project-meta`
- `.project-gradient-title`
- `.animated-gradient-text`

### 9.3 入场动画

页面中多种元素都有进入动画，由 `src/App.jsx` 中的 `useEffect` 动态加类：

- `.reveal`
- `.reveal-text`
- `.reveal-panel`
- `.reveal-media`
- `.reveal-button`
- `.is-visible`

用户要求过：“所有文字、视频及底板元素都加入入场动画”。后续新增元素时，如果要跟随当前动画体系，需要让它被对应 selector 覆盖，或手动加相关类。

## 10. 最近一系列用户修改记录

以下记录有助于新对话理解为什么当前状态看起来这样：

1. 页面一开始是从零搭建 React + Vite 个人作品集。
2. 所有页面文字改为中文。
3. 首屏背景替换为用户提供视频。
4. 删除首屏大标题和部分说明文字，只保留视频、导航、按钮和简短 kicker。
5. 导航改为右上角图标，悬停展开。
6. 精选项目拆为 5 类：
   - AI影像
   - 品牌演绎
   - 粒子动态
   - 科技包装
   - 其他影像
7. 五个项目分别接入用户提供视频。
8. 项目区参考图改成大图/文字左右排版。
9. 项目标题改为渐变文字效果。
10. “概览”文字删除，项目标题移动到原概览位置。
11. 个人经历先做成时间轴，又改成参考蓝色发布卡片样式。
12. 个人优势卡片改成与个人经历一致的卡片排版，后续又做成黑色背景玻璃卡片。
13. 玻璃卡片加入边缘扫光，但保留顶部线性装饰，不改成星光符号。
14. 联系方式区域改为类似 Okean 的地址/联系方式/社交媒体排版，后续又删除社交媒体，只保留地址和联系方式。
15. 联系方式背景改为 Aurora 光带，位置中下。
16. 联系方式更新为：
   - 重庆
   - 电话：17783079621
   - 邮箱：879134129@qq.com
17. `#experience` 标题从“个人经历”改为“个人优势”。
18. `#strengths` 标题从“个人优势”改为“个人经历”。
19. `#strengths` 四张卡片标题改为：
   - 河南理工大学
   - 邦和文化有限公司
   - 西创集团
   - 汉沙数字科技集团

## 11. 常见修改入口

### 修改个人联系方式

编辑 `src/App.jsx`：

```js
const profile = {
  email: '879134129@qq.com',
  phone: '17783079621',
  location: '重庆',
}
```

### 修改项目标题、描述、视频

编辑 `src/App.jsx` 的 `projects` 数组：

```js
{
  title: 'AI影像',
  meta: '生成式视觉 / 智能分镜 / 影像实验',
  label: '01',
  description: '...',
  palette: 'project-a',
  video: '/project-ai-video.mp4',
}
```

替换视频时：

1. 将视频放入 `public/`。
2. 修改 `video` 路径为 `/文件名.mp4` 或 `/文件名.webm`。
3. 运行 `npm.cmd run build`。
4. 刷新 `http://127.0.0.1:5173/`。

### 修改蓝色卡片内容

编辑 `experienceItems`。

### 修改玻璃卡片内容

编辑 `strengths`。

### 修改 Aurora 光带

编辑 `src/App.jsx` 中 `<SoftAurora />` 的参数，或编辑 `src/App.css` 中 `.contact-bg`、`.soft-aurora-container` 相关样式。

## 12. 构建和预览后的验证清单

每次修改后建议执行：

```bash
npm.cmd run build
```

如果预览服务没开：

```bash
npm.cmd run preview:static
```

或后台启动：

```powershell
Start-Process -FilePath npm.cmd -ArgumentList @('run','preview:static') -WorkingDirectory 'F:\Codex\Codex_gerenwangzhan' -WindowStyle Hidden
```

检查：

- 首页视频是否播放。
- 5 个项目视频是否播放。
- 精选项目标题渐变是否还在。
- 项目区是否没有“概览”文字。
- `#experience` 标题是否为“个人优势”。
- `#strengths` 标题是否为“个人经历”。
- 四张玻璃卡片标题是否为：
  - 河南理工大学
  - 邦和文化有限公司
  - 西创集团
  - 汉沙数字科技集团
- 联系区是否只显示地址、电话、邮箱。
- 联系区是否没有社交媒体、微信、QQ、QR、返回顶部。
- 控制台是否没有 `React is not defined`。
- 页面是否没有明显文字重叠。

## 13. 给新对话的建议提示词

如果要在新对话继续制作，可以直接发送：

```text
请读取 F:\Codex\Codex_gerenwangzhan\HANDOFF.md、AGENTS.md、src/App.jsx 和 src/App.css。
这是一个 React + Vite 的个人作品集网站。请延续当前视觉和代码结构，不要重建项目。
当前预览地址是 http://127.0.0.1:5173/，如果无法访问请运行 npm.cmd run preview:static。
后续修改优先编辑 src/App.jsx 和 src/App.css，修改后运行 npm.cmd run build，并刷新预览验证。
```

## 14. 注意事项

- 不要随意清空 `dist/`，当前用户依赖 `127.0.0.1:5173` 查看静态预览。
- 修改后优先运行 `npm.cmd run build`，让 `dist` 同步。
- 如果构建成功但浏览器没变化，尝试加查询参数刷新，例如：

```text
http://127.0.0.1:5173/?check=1
```

- 如果构建失败且报 `spawn EPERM`，先判断是否是环境权限问题，不要急着回滚代码。
- 页面中文应保持 UTF-8，不要用会破坏编码的方式重写文件。
- 手动编辑文件时优先使用 `apply_patch`。
- 项目视觉已经经过多次用户点选调整，后续应尽量做局部修改，不要进行大范围重构。

