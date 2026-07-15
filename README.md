# 识光｜儿童中文阅读支持

这是一个面向 **7–12 岁儿童（小学一至六年级）** 的阅读障碍早期筛查 Web 应用。应用由家长或监护人作为施测员使用，监督儿童依次完成三大筛查板块，并由家长手动计时、判分和录入结果。

本项目是一个 **纯前端、本地运行、不上传数据** 的 React 应用。所有筛查数据只保存在当前浏览器内存中；刷新页面或关闭页面后，当前测试数据会丢失。

> 重要定位：本工具只用于家庭早期筛查参考，不能替代医疗、心理、语言治疗或特殊教育专业评估，也不能作为诊断依据。

---

## 给接手者的快速说明

如果你是接手本项目的 ChatGPT / Codex / 开发者，请先读这一段：

- 当前项目已经从旧版“四任务筛查”改为新版“三大板块筛查”。
- 真实业务流程是：`首页 → 知情同意 → 基本信息 → 汉字识别 → 快速自动命名 → 声韵母重组 → 筛查报告`。
- 当前还新增了 `/learn` 知识库和 `/about` 关于本工具页面，用于解释中文阅读困难、本工具边界和隐私设计。
- `src/data/tasks.ts` 是旧版遗留数据，当前流程不再使用。
- 当前没有后端、没有数据库、没有登录、没有任何上传接口。
- 目前数据只存在 React Context 内存状态里，刷新会丢失。
- 生产构建已验证可通过：`npm run build`。
- 这个文件夹当前不是 Git 仓库，不能依赖 `git status` 或提交历史判断改动来源。
- 中文文件和源码均按 UTF-8 读取；如果 PowerShell 显示乱码，请使用 `Get-Content -Encoding UTF8`。

推荐接手顺序：

1. 先读 `src/App.tsx` 了解路由。
2. 再读 `src/context/ScreeningContext.tsx`、`src/context/ScreeningContextBase.ts`、`src/context/useScreening.ts` 了解全局状态。
3. 再读 `src/types/screening.ts` 和 `src/utils/scoring.ts` 了解数据结构与计分。
4. 再读 `docs/` 下的内容原则和专业边界说明。
5. 最后读 `src/pages/` 下的各页面实现具体流程。

---

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | React 19 |
| 语言 | TypeScript 6 |
| 构建工具 | Vite 8 + Rolldown |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router 7 |
| 包管理 | npm |

---

## 本地运行

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:5173
```

生产构建：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

代码检查：

```bash
npm run lint
```

单独运行 TypeScript 类型检查：

```bash
npx tsc --noEmit
```

在 PowerShell 中如果 `npm` 被执行策略拦截，可以使用：

```bash
npm.cmd run build
npm.cmd run lint
```

---

## 当前验证状态

最近一次接手整理后，以下命令已通过：

```text
npx tsc --noEmit
npm run lint
npm run build
```

构建输出目录为 `dist/`。该目录是构建产物，不是主要开发入口。

---

## 目录结构

```text
fypweb/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── materials/
│       ├── 语素意识干预教案课时1教案.docx
│       └── 语素意识干预教案课时1PPT.pptx
├── docs/
│   ├── content_sources.md
│   ├── screening_rationale.md
│   ├── chinese_dyslexia_content_principles.md
│   ├── parent_teacher_observation.md
│   ├── intervention_material_plan.md
│   └── privacy_disclaimer_copy.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types/
│   │   └── screening.ts
│   ├── data/
│   │   ├── characters.ts
│   │   ├── rapidNaming.ts
│   │   ├── phoneme.ts
│   │   └── tasks.ts
│   ├── utils/
│   │   └── scoring.ts
│   ├── context/
│   │   ├── ScreeningContext.tsx
│   │   ├── ScreeningContextBase.ts
│   │   └── useScreening.ts
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Button.tsx
│   │   ├── Timer.tsx
│   │   └── ProgressBar.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LearnPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ConsentPage.tsx
│   │   ├── StartPage.tsx
│   │   ├── CharRecognitionPage.tsx
│   │   ├── RapidNamingPage.tsx
│   │   ├── PhonemePage.tsx
│   │   ├── ResultPage.tsx
│   │   ├── InterventionPage.tsx
│   │   └── ScreeningPage.tsx
│   └── assets/
│       ├── hero.png
│       └── vite.svg
├── 儿童阅读障碍早期筛查测试标准流程（程序开发专用）.docx
├── 语素意识干预教案课时1教案.docx
└── 语素意识干预教案课时1PPT.pptx
```

---

## 关键文件说明

### 路由入口

`src/App.tsx`

定义全部页面路由，并用 `ScreeningProvider` 包裹整个应用。

### 全局状态

`src/context/ScreeningContext.tsx`

负责保存筛查过程中的内存状态：

- `profile`：儿童年龄、年级等基本信息
- `currentPart`：当前筛查板块序号
- `charData`：汉字识别结果
- `rapidNamingData`：快速自动命名结果
- `phonemeData`：声韵母重组结果
- `savePart1` / `savePart2` / `savePart3`：保存三部分数据
- `getResult`：生成最终报告数据
- `reset`：清空筛查状态

`src/context/ScreeningContextBase.ts`

只定义 Context 和 Context 类型。这个拆分是为了符合 React Fast Refresh / ESLint 规则。

`src/context/useScreening.ts`

导出 `useScreening()` hook，页面通过它读取和写入筛查状态。

### 类型定义

`src/types/screening.ts`

定义项目核心类型：

- `ChildProfile`
- `CharItem`
- `CharScore`
- `CharRecognitionData`
- `RapidNamingData`
- `PhonemeQuestion`
- `PhonemeScore`
- `PhonemeData`
- `PartResult`
- `ScreeningResult`
- `RiskLevel`

### 计分逻辑

`src/utils/scoring.ts`

包含：

- `calculateOverallScore`
- `determineRiskLevel`
- `getRiskInfo`
- `formatTime`

如后续要调整风险阈值、建议文案、计分方式，优先改这里。

### 数据源

`src/data/characters.ts`

第一部分“汉字识别”使用的数据。共 150 个汉字，分为 5 页，每页 30 个字，包含拼音。

`src/data/rapidNaming.ts`

第二部分“快速自动命名”使用的数据。包含：

- 数字命名序列：8 行 × 5 个数字
- 图片命名序列：8 行 × 5 个图片
- 图片标签到 emoji 的映射

`src/data/phoneme.ts`

第三部分“声韵母重组”使用的数据。包含 16 道题和标准答案。

`src/data/tasks.ts`

旧版“四任务筛查”遗留数据。当前路由和流程不使用它。除非要回溯旧版，不建议继续基于它开发。

---

## 页面与路由

| 路径 | 页面文件 | 说明 |
| --- | --- | --- |
| `/` | `HomePage.tsx` | 首页，介绍中文阅读困难、流程、常见误解和三大板块 |
| `/learn` | `LearnPage.tsx` | 知识库，面向家长解释中文阅读困难、观察点和 FAQ |
| `/about` | `AboutPage.tsx` | 关于本工具，说明工具定位、覆盖能力、未覆盖能力和隐私边界 |
| `/consent` | `ConsentPage.tsx` | 知情同意、隐私声明、医学免责声明 |
| `/start` | `StartPage.tsx` | 填写年龄和年级 |
| `/screening/char-recognition` | `CharRecognitionPage.tsx` | 第一部分：汉字识别 |
| `/screening/rapid-naming` | `RapidNamingPage.tsx` | 第二部分：快速自动命名 |
| `/screening/phoneme` | `PhonemePage.tsx` | 第三部分：声韵母重组 |
| `/result` | `ResultPage.tsx` | 综合筛查报告 |
| `/intervention` | `InterventionPage.tsx` | 干预材料下载 |

`ScreeningPage.tsx` 是旧版占位页面，当前没有在 `App.tsx` 中挂载路由。

---

## 完整用户流程

```text
首页
  ↓
知情同意页
  ↓
基本信息页
  ↓
第一部分：汉字识别
  ↓
第二部分：快速自动命名
  ↓
第三部分：声韵母重组
  ↓
筛查报告
```

用户可以从首页进入知识库、关于本工具和干预材料下载页。这些页面不是筛查主流程的必经步骤。

---

## 新增 docs 文档

`docs/content_sources.md`

记录当前内容依据处理原则和后续需要人工核查的资料类型。当前环境未联网检索，因此不伪造论文题名、作者、期刊、DOI 或 URL。

`docs/screening_rationale.md`

解释三个筛查任务分别观察什么能力，以及为什么本工具不能替代专业评估。

`docs/chinese_dyslexia_content_principles.md`

说明为什么本项目不能直接照搬英文 dyslexia 材料，以及中文阅读困难内容设计原则。

`docs/parent_teacher_observation.md`

整理家长和教师观察清单，后续可转化为页面、问卷或下载材料。

`docs/intervention_material_plan.md`

规划家长材料、教师材料和儿童练习材料体系。

`docs/privacy_disclaimer_copy.md`

整理隐私、知情同意、免责声明相关文案，便于后续页面保持一致。

---

## 三大筛查板块

### 第一部分：汉字识别

目标：筛查儿童汉字认读能力。

数据文件：

```text
src/data/characters.ts
```

任务规模：

- 150 个汉字
- 5 页
- 每页 30 个字

页面文件：

```text
src/pages/CharRecognitionPage.tsx
```

操作流程：

1. 家长阅读操作指南。
2. 家长向儿童宣读统一指导语。
3. 点击开始计时。
4. 儿童逐字认读屏幕上的汉字。
5. 家长逐字标记：
   - `✓ 对`
   - `✗ 错`
   - `N` 跳过或未答
6. 如果标错，可继续在页面上修改。
7. 读完整套 150 字后点击结束计时。
8. 进入复核状态。
9. 确认提交，进入第二部分。

计分：

- 正确 1 分
- 错误 0 分
- 跳过 0 分
- 满分 150 分

结果数据结构：

```ts
interface CharRecognitionData {
  scores: CharScore[]
  timeSeconds: number
  totalScore: number
  maxScore: number
}
```

### 第二部分：快速自动命名

目标：记录儿童视觉-语言快速提取和命名速度。

数据文件：

```text
src/data/rapidNaming.ts
```

页面文件：

```text
src/pages/RapidNamingPage.tsx
```

包含两个子测试：

- 数字命名
- 图片命名

图片命名当前使用 emoji 显示：

```text
花、书、鞋、窗、狗
```

操作流程：

1. 家长阅读说明并向儿童告知规则。
2. 进入数字命名测试。
3. 家长点击开始计时。
4. 儿童按顺序快速读出 8 行数字。
5. 家长点击结束计时并确认。
6. 家长填写异常备注。
7. 进入图片命名测试。
8. 重复计时、结束、备注流程。
9. 提交进入第三部分。

记录内容：

- 数字命名用时
- 数字命名异常备注
- 图片命名用时
- 图片命名异常备注

计分：

- 当前不参与综合得分。
- 只记录时间与备注。

结果数据结构：

```ts
interface RapidNamingData {
  digit: {
    timeSeconds: number
    notes: string
  }
  picture: {
    timeSeconds: number
    notes: string
  }
}
```

### 第三部分：声韵母重组

目标：筛查儿童语音拆分、组合和加工能力。

数据文件：

```text
src/data/phoneme.ts
```

页面文件：

```text
src/pages/PhonemePage.tsx
```

任务规模：

- 16 道题
- 无计时

规则：

```text
取第一个字的声母 + 第二个字的韵母和声调 = 新读音
```

示例：

```text
称(cheng1) + 喝(he1) → ch + e1 = che1
坏(huai4) + 老(lao3) → h + ao3 = hao3
```

操作流程：

1. 家长阅读规则说明。
2. 确认儿童理解示例。
3. 儿童逐题作答。
4. 家长根据页面上的标准答案标记对错。
5. 提交后进入筛查报告。

计分：

- 正确 1 分
- 错误或未答 0 分
- 满分 16 分

结果数据结构：

```ts
interface PhonemeData {
  scores: PhonemeScore[]
  totalScore: number
  maxScore: number
}
```

---

## 综合计分与风险等级

当前参与综合得分的板块：

- 第一部分：汉字识别
- 第三部分：声韵母重组

当前不参与综合得分的板块：

- 第二部分：快速自动命名

综合得分公式：

```text
综合得分 = (汉字识别得分 + 声韵母重组得分) / (150 + 16) × 100
```

代码中会四舍五入为整数。

风险等级：

| 综合得分 | 风险等级 | 页面显示 |
| --- | --- | --- |
| 80–100 | low | 低风险 |
| 60–79 | medium | 需关注 |
| 0–59 | high | 建议进一步评估 |

风险等级相关文案和建议位于：

```text
src/utils/scoring.ts
```

---

## 报告页内容

页面文件：

```text
src/pages/ResultPage.tsx
```

报告页展示：

- 生成时间
- 筛查对象年龄和年级
- 综合得分
- 风险等级
- 风险解释
- 分项表现
- 快速自动命名用时与备注
- 建议与下一步
- 第一部分认读错误汉字明细
- 医学免责声明

如果没有完整筛查数据，报告页会跳回 `/start`。

---

## 隐私与数据安全设计

本项目当前的隐私设计是：

- 无注册
- 无登录
- 无后端 API
- 无数据库
- 无上传
- 无埋点
- 无统计 SDK
- 无音频、视频或照片采集
- 数据仅在 React Context 中保存

重要后果：

- 刷新页面会丢失当前筛查进度。
- 关闭页面会丢失当前筛查结果。
- 当前没有历史记录。
- 当前没有多次测试对比。

如果后续要做本地持久化，建议使用 `localStorage` 或 `IndexedDB`，并在知情同意页明确告知用户。

---

## UI 与样式

全局样式入口：

```text
src/index.css
```

样式方案：

- Tailwind CSS 4
- 主题色在 `@theme` 中定义
- 页面整体是浅色、亲和、儿童阅读筛查风格

通用组件：

- `Button.tsx`：通用按钮，支持 `primary`、`secondary`、`ghost`
- `Layout.tsx`：顶部导航、页面主体、页脚
- `Timer.tsx`：通用计时器组件
- `ProgressBar.tsx`：进度条组件，目前不是核心流程必需组件

注意：

- 当前页面使用了 emoji 作为视觉符号。
- `src/assets/hero.png` 存在，但当前首页主要是组件化视觉布局，不强依赖该图。
- `src/assets/vite.svg` 是 Vite 默认遗留资源，当前业务上不重要。

---

## 静态材料下载

干预材料放在：

```text
public/materials/
```

当前包含：

```text
语素意识干预教案课时1教案.docx
语素意识干预教案课时1PPT.pptx
```

页面文件：

```text
src/pages/InterventionPage.tsx
```

Vite 会把 `public/` 下的文件作为静态资源提供。页面中使用 `/materials/...` 路径下载。

根目录下也有同名教案和 PPT 文件，主要作为原始参考文档；真正提供下载的是 `public/materials/` 下的文件。

---

## 重要业务限制

当前项目有以下限制，接手时不要误判为 bug：

- 结果不是专业评估结论，只是早期筛查参考。
- Part 2 只记录时间，不参与综合得分。
- 姓名不是当前表单字段；类型里 `ChildProfile.name` 是可选字段，报告页无姓名时显示“小朋友”。
- 数据不持久化，刷新会丢。
- 没有账号系统。
- 没有服务端。
- 没有多次筛查历史对比。
- 没有 PDF 导出。
- 没有自动保存。

---

## 已知遗留与可清理项

这些不是立即阻塞项，但后续维护时可以处理：

- `src/data/tasks.ts`：旧版四任务数据，当前不用。可以在确认不需要旧版后删除。
- `src/pages/ScreeningPage.tsx`：旧版占位页面，当前没有路由使用。可以在确认不需要旧版后删除。
- `src/assets/vite.svg`：Vite 默认资源，当前业务不用。可以清理。
- `CLAUDE.md` 和 `AGENTS.md` 内容高度相似，可能来自旧交接。建议以后以 `README.md` 为对外交接文档，`AGENTS.md` 为代理指令文档。

---

## 后续功能建议

优先级较高：

- [ ] 增加 `localStorage` 自动保存，避免刷新丢失。
- [ ] 增加“重新开始前确认清空数据”的统一提示。
- [ ] 增加报告导出 PDF 或打印优化。
- [ ] 增加多次测试记录与趋势对比。
- [ ] 补充更多干预材料。

中等优先级：

- [ ] 为 Part 2 建立可解释的量化评分机制。
- [ ] 增加移动端专项排版检查。
- [ ] 增加更清晰的进度条或步骤导航。
- [ ] 增加测试前环境检查提示，如安静环境、光线、家长不得提示。

工程质量：

- [ ] 增加单元测试，优先覆盖 `src/utils/scoring.ts`。
- [ ] 增加页面流程测试，覆盖完整筛查路径。
- [ ] 如果要长期开发，初始化 Git 仓库并建立提交规范。

---

## 修改风险提示

改这些地方时要特别小心：

### 改计分规则

涉及文件：

```text
src/utils/scoring.ts
src/context/ScreeningContext.tsx
src/pages/ResultPage.tsx
```

要同步检查：

- 综合分公式
- 风险等级阈值
- 报告页文案
- 是否把 Part 2 纳入得分

### 改筛查数据

涉及文件：

```text
src/data/characters.ts
src/data/rapidNaming.ts
src/data/phoneme.ts
```

要同步检查：

- 满分是否变化
- 页码和每页数量是否变化
- 报告页显示是否仍正确
- 类型定义是否需要更新

### 改流程路由

涉及文件：

```text
src/App.tsx
src/pages/*
src/context/ScreeningContext.tsx
```

要同步检查：

- 未填写基本信息时是否会跳回 `/start`
- 每一部分提交后是否进入正确下一页
- 结果页是否能拿到完整数据

### 改隐私或持久化

涉及文件：

```text
src/context/ScreeningContext.tsx
src/pages/ConsentPage.tsx
src/pages/StartPage.tsx
src/pages/ResultPage.tsx
```

要同步检查：

- 知情同意文案是否准确
- 是否仍然可以声称“不保留”
- 用户是否能清除本地数据

---

## 给 ChatGPT 的接手提示词

如果要把项目交给另一个 ChatGPT，可以直接把下面这段发给它：

```text
请接手这个 React + TypeScript + Vite 项目。项目名是“识光｜儿童中文阅读支持”，面向 7–12 岁儿童，由家长施测。它是纯前端应用，无后端、无数据库，数据只保存在浏览器内存中。

请先阅读 README.md、src/App.tsx、src/types/screening.ts、src/context/ScreeningContext.tsx、src/context/ScreeningContextBase.ts、src/context/useScreening.ts、src/utils/scoring.ts。

当前主流程是：
首页 → 知情同意 → 基本信息 → 汉字识别 → 快速自动命名 → 声韵母重组 → 筛查报告。

三大板块：
1. 汉字识别：150 字，正确 1 分，满分 150。
2. 快速自动命名：数字和图片分别计时，只记录时间和备注，不参与综合得分。
3. 声韵母重组：16 题，正确 1 分，满分 16。

综合得分 = (Part1 + Part3) / 166 × 100。
风险等级：≥80 低风险，60–79 需关注，<60 建议进一步评估。

请注意：
- src/data/tasks.ts 是旧版四任务遗留数据，当前不用。
- src/pages/ScreeningPage.tsx 是旧版占位页，当前没挂路由。
- 不要引入后端或上传数据，除非明确要求。
- 修改后请运行 npm run lint 和 npm run build。
```

---

## 参考文档

根目录参考文件：

```text
儿童阅读障碍早期筛查测试标准流程（程序开发专用）.docx
语素意识干预教案课时1教案.docx
语素意识干预教案课时1PPT.pptx
```

下载用静态文件：

```text
public/materials/语素意识干预教案课时1教案.docx
public/materials/语素意识干预教案课时1PPT.pptx
```

---

## 免责声明

本工具仅供早期筛查参考，不能替代专业医疗、心理、语言治疗或特殊教育评估。筛查结果不构成阅读障碍诊断，也不应作为教育安置、医疗决策或干预方案选择的唯一依据。
