# 明亮阅读 · 儿童阅读障碍早期筛查工具

## 项目概述

面向 7–12 岁儿童（小学一至六年级）的阅读障碍早期筛查 Web 应用。由家长作为施测员，监督儿童完成三大板块测试，手动录入得分。所有数据仅存储于浏览器本地，不上传服务器。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript 6 |
| 构建 | Vite 8 + Rolldown |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router 7 |
| 包管理 | npm |

## 目录结构

```
fypweb/
├── CLAUDE.md                  ← 本文件
├── public/
│   └── materials/             ← 干预材料下载文件
│       ├── 语素意识干预教案课时1教案.docx
│       └── 语素意识干预教案课时1PPT.pptx
├── src/
│   ├── types/
│   │   └── screening.ts       ← 全部类型定义（ChildProfile, 三大板块数据结构, 结果）
│   ├── data/
│   │   ├── characters.ts      ← 150个汉字，5页×30字，含拼音
│   │   ├── rapidNaming.ts     ← 数字命名8行 + 图片命名8行序列
│   │   ├── phoneme.ts         ← 16道声韵母重组题，含标准答案
│   │   └── tasks.ts           ← 已废弃（旧版4任务数据）
│   ├── utils/
│   │   └── scoring.ts         ← 计分逻辑、风险等级判定、formatTime
│   ├── context/
│   │   └── ScreeningContext.tsx ← 全局状态：profile, 三板块数据, getResult
│   ├── components/
│   │   ├── Layout.tsx         ← 全局布局（顶栏+页脚）
│   │   ├── Button.tsx         ← 通用按钮（primary/secondary/ghost）
│   │   └── Timer.tsx          ← 计时组件（Start→计时→Stop→确认）
│   ├── pages/
│   │   ├── HomePage.tsx       ← 首页：介绍阅读障碍 + 3大板块卡片
│   │   ├── ConsentPage.tsx    ← 知情同意：隐私声明 + 医学免责声明 + 勾选同意
│   │   ├── StartPage.tsx      ← 基本信息录入：年龄（7-12）+ 年级（小学1-6）
│   │   ├── CharRecognitionPage.tsx  ← 第一部分：150汉字识别（计时+逐字评分）
│   │   ├── RapidNamingPage.tsx      ← 第二部分：数字+图片快速命名（分别计时+异常备注）
│   │   ├── PhonemePage.tsx          ← 第三部分：声韵母重组16题（无计时，对/错评分）
│   │   ├── ResultPage.tsx           ← 综合报告：得分/风险等级/分项/建议
│   │   ├── InterventionPage.tsx     ← 干预材料下载页
│   │   └── ScreeningPage.tsx        ← 已废弃（占位）
│   ├── App.tsx               ← 路由定义（8条路由）
│   └── main.tsx              ← 入口
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── eslint.config.js
```

## 路由表

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | 首页 |
| `/consent` | ConsentPage | 知情同意（隐私+免责） |
| `/start` | StartPage | 填年龄年级 |
| `/screening/char-recognition` | CharRecognitionPage | 第一部分：汉字识别 |
| `/screening/rapid-naming` | RapidNamingPage | 第二部分：快速命名 |
| `/screening/phoneme` | PhonemePage | 第三部分：声韵母重组 |
| `/result` | ResultPage | 筛查报告 |
| `/intervention` | InterventionPage | 干预材料下载 |

## 用户流程

```
首页 → 知情同意（勾选+同意）→ 基本信息（年龄+年级）→ 
第一部分（汉字识别）→ 第二部分（快速命名）→ 第三部分（声韵母重组）→ 
筛查报告
```

## 三大筛查板块详情

### 第一部分：汉字识别（150字）
- 数据：`data/characters.ts`，5 页×30 字，含拼音号
- 流程：宣读指导语 → 开始计时 → 儿童逐字认读 → 家长逐字标记 ✓对/✗错/N跳过 → 翻页 → 5页读完 → 结束计时 → 提交
- 计时：手动开始/结束，计时中可翻页和标记
- 计分：正确得1分，满分150

### 第二部分：快速自动命名
- 数据：`data/rapidNaming.ts`，数字8行×5 + 图片8行×5（花🌸书📖鞋👟窗🪟狗🐕）
- 流程：告知规则 → 数字命名计时 → 记录用时+异常备注 → 图片命名计时 → 记录用时+异常备注 → 提交
- 此板块不打分，仅记录时间

### 第三部分：声韵母重组（16题）
- 数据：`data/phoneme.ts`，16 道题，含标准答案
- 规则：取第一个字的声母 + 第二个字的韵母+声调 = 新读音
- 示例：称(ch) + 喝(e1) = che1
- 无计时，家长逐题比对答案标记对/错
- 计分：正确1分，满分16

## 计分与风险等级

- Part 1（汉字识别）和 Part 3（声韵母重组）参与计分（各计满分100，取百分比）
- Part 2（快速命名）只记录时间，不计分
- 综合得分 = (Part1得分 + Part3得分) / (150 + 16) × 100
- 风险等级：≥80 低风险 / 60-79 需关注 / <60 建议进一步评估

## 关键设计决策

1. **纯前端**：无后端服务器，无数据库，数据仅存浏览器内存
2. **家长施测**：家长全程操作——计时、判分、录入
3. **文件下载**：干预材料放在 `public/materials/`，Vite 直接提供静态文件下载
4. **Timer 组件**：独立组件，Start → 计时 → Stop → 确认 四态
5. **姓名非必填**：`ChildProfile.name` 为可选字段，结果页无名字时显示「小朋友」

## 开发命令

```bash
cd fypweb
npm install        # 安装依赖
npm run dev        # 启动开发服务器（默认 http://localhost:5173）
npm run build      # 生产构建
npx tsc --noEmit   # TypeScript 类型检查
```

## 待办 / 可扩展

- [ ] 多次测试数据对比功能（文档要求但未实现）
- [ ] 数据本地持久化（localStorage），支持刷新不丢失
- [ ] 报告导出为 PDF
- [ ] 更多干预材料上传
- [ ] Part 2（快速命名）的异常量化评分机制

## 参考文档

- 筛查流程标准：`fypweb/儿童阅读障碍早期筛查测试标准流程（程序开发专用）.docx`
- 干预教案：`fypweb/语素意识干预教案课时1教案.docx`
- 干预 PPT：`fypweb/语素意识干预教案课时1PPT.pptx`
