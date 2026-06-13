<div align="center">
  <h1>Open-CAI</h1>
  <h3>把生成、思考、结构与交付留在同一块画布</h3>
  <p>这不是一个只负责“出结果”的 AI 工具，而是一张可持续工作的创作界面。</p>
  <p>
    <a href="https://github.com/ljquan/aitu/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a>
    <a href="https://ai.772.ee"><img src="https://img.shields.io/badge/demo-online-brightgreen.svg" alt="Demo"></a>
  </p>
  <p>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fljquan%2Faitu&project-name=aitu&repository-name=aitu"><img src="https://vercel.com/button" alt="Deploy with Vercel"></a>
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/ljquan/aitu"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>
  </p>
</div>

[English README](./README_en.md)

## 项目气质

Open-CAI 试图把 AI 从“单轮对话”重新带回“连续创作”。

在这里，图片不是一次性结果，流程图不是孤立图示，提示词也不是散落的输入记录。它们被放回同一个工作区，彼此关联、相互生长，最终沉淀成一个可以继续编辑、继续扩展、继续交付的作品现场。

如果把传统 AI 工具理解为一扇窗口，那么 Open-CAI 更像一张桌面：你可以在上面摆放模型输出、草图、结构、参考图、任务状态与知识卡片，让创作不再在多个应用之间断裂。

## 在线入口

- [在线体验](https://ai.772.ee)

## 视觉与工作流展示

| 拆分图片 | 流程图 | 思维导图 |
| --- | --- | --- |
| ![](./apps/web/public/product_showcase/九宫格拆图.gif) | ![](./apps/web/public/product_showcase/流程图.gif) | ![](./apps/web/public/product_showcase/思维导图.gif) |
| 语义理解 - 拆分图片 | 语义理解 - 流程图 | 语义理解 - 思维导图 |

## 你可以在这里完成什么

- **生成**：统一调度图片、视频、音频、文本与 Agent 工作流，把多模型能力收束到同一个入口。
- **组织**：画布承载任务、素材、Frame、工具窗口与知识内容，让上下文天然相邻。
- **推演**：流程图、思维导图、Markdown、Mermaid 与结构化编辑能力共同参与创作，而不是停留在结果展示。
- **沉淀**：任务队列、素材库、统一缓存与历史记录帮助你把一次输出变成下一次创作的素材。
- **扩展**：内部 React 工具、iframe 工具、Skill / Agent 与插件化运行时可以继续长出新的工作方式。
- **交付**：支持 Frame 幻灯片、PPT 导出、多媒体编辑与更接近真实项目流程的内容整理。

## 适合谁

- 想把 AI 图像生成、结构整理和最终交付放在一起的创作者
- 需要一边生成、一边筛选、一边归档素材的内容团队
- 希望把工具、任务、知识和作品过程留在一个地方的产品/设计/独立开发者
- 想二次开发一套 AI 创作工作台的团队或个人

## 本地开发

### 环境要求

- Node.js 20+
- pnpm 10.21.0（推荐通过 Corepack 启用）

### 安装与启动

```bash
corepack enable pnpm
pnpm install
pnpm start
```

启动后访问 `http://localhost:7200`。

### 常用命令

```bash
pnpm start             # 启动 Web 开发服务
pnpm build:web         # 构建 Web 应用
pnpm build             # 构建工作区
pnpm check             # typecheck + lint
pnpm test              # 运行单元测试
pnpm e2e:smoke         # 运行冒烟测试
pnpm check:cycles      # 检查循环依赖
pnpm manual:build      # 生成用户手册
```

## 部署

项目保留多条部署链路，既适合快速上线，也适合深度自托管：

- Vercel / Netlify：使用上方一键部署按钮或仓库配置。
- Docker：使用仓库根目录的 `Dockerfile` 构建静态站点镜像。
- Hybrid CDN + 自托管：见 [NPM CDN 部署](./docs/NPM_CDN_DEPLOY.md) 与 [CDN 部署](./docs/CDN_DEPLOYMENT.md)。

## 仓库结构

```text
aitu/
├── apps/
│   ├── web/                 # Open-CAI Web 应用与 Service Worker
│   └── web-e2e/             # Playwright E2E 与手册生成脚本
├── packages/
│   ├── drawnix/             # 画布工作区核心库
│   ├── react-board/         # Plait React 画布适配层
│   ├── react-text/          # 文本渲染组件
│   └── utils/               # 共享工具与工作流解析
├── docs/                    # 当前开发文档入口
├── openspec/                # 需求规格与变更提案
└── scripts/                 # 构建、发布、手册与部署脚本
```

## 文档入口

- [用户手册内容源文件](./docs/user-manual/content/index.mdx)
- [开发文档索引](./docs/README.md)
- [贡献指南](./CONTRIBUTING.md)
- [OpenSpec 说明](./openspec/AGENTS.md)

## License

MIT
