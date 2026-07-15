# UI_UPDATE_REPORT

## 1. 本次 UI 升级目标

本次升级目标是将“明亮阅读 · 儿童阅读障碍早期筛查”从较基础的 Tailwind 卡片风格，升级为“明亮书房 Bright Reading Room”视觉系统。

设计目标：

- 温和、可信、明亮、清楚；
- 儿童阅读主题，但不幼稚；
- 适合家长使用，也适合老师参考；
- 不呈现为医院诊断系统；
- 不改变任何业务流程、计分逻辑、状态管理和数据边界。

## 2. 新增组件

新增组件位于 `src/components/`：

- `Card.tsx`：通用卡片，支持 `default`、`soft`、`highlight`、`warning`、`success`、`danger` variants。
- `SectionHeader.tsx`：统一 section 标题结构，支持 eyebrow、title、description。
- `PageHero.tsx`：统一页面 hero，支持 eyebrow、title、description、actions 和 visual。
- `BoundaryBox.tsx`：用于隐私、免责声明、工具边界等提示。
- `ChecklistCard.tsx`：用于筛查前准备、观察建议、清单类内容。
- `IconIllustration.tsx`：低饱和线性 SVG 图标，支持 `book`、`timer`、`sound`、`report`、`privacy`、`support`。

## 3. 修改页面

本次修改页面：

- `src/pages/HomePage.tsx`
- `src/pages/LearnPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/ConsentPage.tsx`
- `src/pages/StartPage.tsx`
- `src/pages/CharRecognitionPage.tsx`
- `src/pages/RapidNamingPage.tsx`
- `src/pages/PhonemePage.tsx`
- `src/pages/ResultPage.tsx`
- `src/pages/InterventionPage.tsx`

同时更新：

- `src/components/Button.tsx`
- `src/components/Layout.tsx`
- `src/components/Timer.tsx`
- `src/index.css`

## 4. 采用的设计风格

设计名：明亮书房 Bright Reading Room。

视觉特征：

- 背景使用奶油白和极浅冷白，整体更柔和；
- 主色使用柔和书本蓝；
- 辅助色使用青绿；
- 强调色使用阳光黄；
- 风险和关注信息使用低饱和暖色；
- 减少 emoji，改用简单 inline SVG；
- 卡片圆角更大，但阴影更轻；
- 文字行距更宽松；
- 导航、按钮、边界提示和报告卡片视觉统一。

全局 CSS 更新：

- 增加 Bright Reading Room 颜色 token；
- 调整 body 背景；
- 增加 selection 样式；
- 增加 focus-visible 样式；
- 增加 prefers-reduced-motion 处理；
- 增加初步 print 样式，打印时隐藏导航、页脚和按钮。

## 5. 保持不变的业务逻辑

本次没有改动：

- 主流程；
- 路由逻辑；
- 综合得分公式；
- 风险阈值；
- 快速自动命名 Part 2 不参与综合分的规则；
- 核心筛查数据；
- React Context 状态管理；
- 后端、数据库、登录、上传、音视频采集或 AI 判断。

综合得分仍然是：

```text
(汉字识别得分 + 声韵母重组得分) / (150 + 16) × 100
```

风险阈值仍然是：

- 80–100：低风险；
- 60–79：需关注；
- 0–59：建议进一步评估。

## 6. 验证命令结果

已运行并通过：

```text
npm.cmd exec tsc -- --noEmit
npm.cmd run lint
npm.cmd run build
```

构建结果：

```text
vite v8.0.16 building client environment for production...
✓ built
```

## 7. 需要人工检查的页面

建议人工打开并检查以下页面：

- `/` 首页：hero、阅读观察卡、三大板块卡片；
- `/learn` 知识库：FAQ 展开、常见表现卡片；
- `/about` 关于本工具：边界说明和未覆盖能力 chips；
- `/consent` 知情同意：隐私与免责声明可读性；
- `/start` 基本信息：筛查前准备清单和表单；
- `/screening/char-recognition`：汉字卡片大小、状态颜色和按钮可辨认度；
- `/screening/rapid-naming`：计时器、材料区和备注区；
- `/screening/phoneme`：题目结构和对错按钮；
- `/result`：报告摘要、分项表现和打印效果；
- `/intervention`：材料下载卡片和资源规划卡片。

## 8. 后续可继续优化的点

- 为移动端导航增加折叠菜单；
- 为报告页补更完整的打印版版式；
- 使用浏览器截图做视觉回归检查；
- 给按钮和卡片增加更细致的 hover / active 状态；
- 给汉字识别页增加更适合投屏或平板的布局模式；
- 后续如果引入真实材料下载，可以把“整理中”资源变成可下载文件；
- 如需进一步专业化，可增加专门的教师版报告视图。
