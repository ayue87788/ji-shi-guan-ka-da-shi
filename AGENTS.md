# AGENTS.md - 即使闯关大师

## 项目概览

面向 HSK4 级以上中高级汉语学习者的「即使……也……」让步复句闯关教学游戏网页应用。

### 技术栈
- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI**: 自定义组件（中式书卷气设计风格）

## 目录结构

```
src/
├── app/
│   ├── globals.css       # 全局样式 + Tailwind 配置
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 主页面（游戏入口，整合所有关卡）
├── components/
│   ├── Welcome.tsx       # 欢迎页组件
│   ├── Level1.tsx        # 第一关：语言语境（辨析题）
│   ├── Level2.tsx        # 第二关：言外语境（重音题）
│   ├── Level3.tsx        # 第三关：情境语境（造句题）
│   ├── Level4.tsx        # 第四关：情境外语境（文化思辨）
│   ├── LevelResult.tsx   # 关卡结果页组件
│   └── FinalResult.tsx   # 最终结果页组件
├── lib/
│   ├── knowledge.ts      # 教学知识库数据 + 评分逻辑
│   ├── useGameState.ts   # 游戏状态管理 Hook
│   └── utils.ts          # 通用工具函数
└── components/ui/        # shadcn/ui 组件库（预置）
```

## 四关设计

1. **第一关 · 语言语境**（9分）：3道「即使」vs「如果」辨析选择题，随机抽取
2. **第二关 · 言外语境**（9分）：3道重音态度判断题
3. **第三关 · 情境语境**（10分）：场景造句，自动评分（语法+逻辑+得体），2次机会
4. **第四关 · 情境外语境**（10分）：文化思辨开放题，自动评分（语法+深度+流畅）

## 核心文件说明

### src/lib/knowledge.ts
- 所有题目数据、例句、解析
- `getGrade()` 函数：根据总分返回等级评价（大师级/优秀/良好/继续努力）
- 修改题目内容时只改这个文件

### src/lib/useGameState.ts
- 游戏状态管理 Hook
- 控制 12 个阶段的切换：welcome → level1 → level1-result → level2 → ... → final
- 随机抽题逻辑

### src/components/Level3.tsx
- 造句题的自动评分逻辑在 `evaluateSentence()` 函数中
- 评分维度：语法(4) + 逻辑(3) + 得体(3)

### src/components/Level4.tsx
- 文化思辨题的自动评分逻辑在 `evaluateAnswer()` 函数中
- 评分维度：语法(4) + 深度(4) + 流畅(2)

## 设计风格

- 主色：墨玉青 (#0F766E) + 朱砂红 + 竹青 + 宣纸米白
- 字体：Noto Serif SC（思源宋体，书卷气）
- 整体感觉：中式书院风 + 现代闯关游戏感
- 详见 `DESIGN.md`

## 开发命令

```bash
pnpm install    # 安装依赖
pnpm dev        # 启动开发服务器
pnpm build      # 构建生产版本
pnpm start      # 启动生产服务器
pnpm lint       # 代码检查
pnpm ts-check   # TypeScript 类型检查
```

## 评分等级

- **大师级**（36-40分）：完全掌握
- **优秀**（30-35分）：扎实掌握
- **良好**（20-29分）：基本理解
- **继续努力**（20分以下）：需要多加练习
