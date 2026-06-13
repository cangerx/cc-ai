<div align="center">
  <h1>Open-CAI</h1>
  <h3>让生成、思考、结构与交付留在同一块画布</h3>
  <p>不是只负责“出结果”的 AI 工具，而是一张可以持续工作的创作桌面。</p>
  <p>
    <a href="https://github.com/ljquan/aitu/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-16a34a.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/Open%20Source-Canvas%20Workspace-f97316.svg" alt="Open Source Canvas Workspace">
    <img src="https://img.shields.io/badge/Support-Self--Hosted-0f172a.svg" alt="Self Hosted">
  </p>
  <p>
    <a href="https://ai.772.ee">在线工作台</a> ·
    <a href="./docs/user-manual/content/index.mdx">用户手册</a> ·
    <a href="./docs/README.md">开发文档</a> ·
    <a href="./README_en.md">English README</a>
  </p>
</div>

## 一句话介绍

Open-CAI 是一个开源 AI 画布工作台。它把图片生成、提示词推理、流程图、思维导图、素材整理、任务状态与最终交付放回同一块工作区里，让创作过程不再散落在多个窗口之间。

## 为什么它更像作品现场，而不是聊天窗口

很多 AI 工具擅长回答，却不擅长承接。一次生成结束之后，提示词、参考图、候选结果、结构说明和最终版本往往会重新碎裂。

Open-CAI 反过来处理这个问题。它把输出结果保留在画布，把思考路径保留在结构，把项目语境保留在工作区。你得到的不只是“一个答案”，而是一个仍然可以继续编辑、继续比较、继续沉淀、继续交付的现场。

如果说聊天工具是一扇窗口，Open-CAI 更像一张桌面。模型输出、参考图、脑图、流程、注释、任务和素材能够同时被看见，也因此能够真正协同。

## 视觉展示

| 拆分图片 | 流程图 | 思维导图 |
| --- | --- | --- |
| ![](./apps/web/public/product_showcase/九宫格拆图.gif) | ![](./apps/web/public/product_showcase/流程图.gif) | ![](./apps/web/public/product_showcase/思维导图.gif) |
| 语义理解与拆图 | 结构梳理与流程表达 | 灵感组织与知识沉淀 |

## 核心卖点

### 1. 同一块画布，承接多模型工作流

- 图片、视频、音频、文本与 Agent 风格任务可以从同一工作台发起。
- 生成结果不会离开上下文，而是直接进入当前项目画布。
- 你可以一边生成，一边比较，一边继续组织后续动作。

### 2. 不只展示结果，也保存结构

- 流程图、思维导图、Markdown、Mermaid 与普通画布元素天然并存。
- 提示词、分析、素材、结论与交付版本可以形成连续链路。
- 更适合创意推演、方案复盘、知识沉淀和团队沟通。

### 3. 从素材到交付，链路完整

- 任务队列、素材库、统一缓存、历史记录帮助你把一次输出变成下一次输入。
- 支持 Frame 幻灯片、PPT 导出、多媒体整理等真实项目交付方式。
- 更接近“可工作的 AI 项目台”，而不是单一功能页面。

### 4. 开源、可自托管、适合继续长大

- 内部 React 工具、iframe 工具、Skills、Agents 与插件式运行时都可以继续扩展。
- 适合作为个人创作桌面，也适合作为团队内部 AI 工作台底座。
- 既能直接用，也能基于现有能力继续二次开发。

## 适合谁

- 想把 AI 图像生成、结构整理与最终交付放在一起的创作者
- 需要持续生成、筛选、标注和归档内容资产的团队
- 希望把工具、任务、知识与作品过程留在同一个界面的产品、设计与独立开发者
- 想二次开发一套开源 AI 画布工作台的团队或个人

## 部署安装

### Docker 快速部署

适合希望最短路径上线的场景。

```bash
docker build -t open-cai .
docker run -d --name open-cai -p 8080:80 open-cai
```

启动后访问 `http://localhost:8080` 或你的服务器端口映射地址。

### 发布包一键部署

适合服务器上传、版本归档、静态托管和面板类部署。

```bash
pnpm build:web
node scripts/create-deploy-package.js
```

生成产物：

- `dist/apps/web/`：完整静态站点目录
- `dist/apps/web-<version>.tar.gz`：可直接上传和解压的部署包

### 宝塔部署

适合习惯可视化运维面板的场景。

1. 执行 `pnpm build:web`，或先生成 `web-<version>.tar.gz`。
2. 在宝塔中新建静态网站。
3. 将 `dist/apps/web/` 或解压后的 `web/` 目录内容上传到站点根目录。
4. 使用 Nginx 托管即可，更新时直接替换静态文件。

### Vercel / Netlify

适合快速托管公开静态版本。

- 使用仓库内现有配置直接接入。
- 构建目录为 `dist/apps/web`。
- 顶部保留了一键部署入口按钮可直接使用。

### 深度自托管

适合需要 CDN、版本发布链路或混合部署的团队。

- [NPM CDN 部署](./docs/NPM_CDN_DEPLOY.md)
- [CDN 部署](./docs/CDN_DEPLOYMENT.md)
- [Cloudflare Pages 部署](./docs/CFPAGE-DEPLOY.md)

## 本地开发

### 环境要求

- Node.js 20+
- pnpm 10.21.0

推荐先启用 Corepack：

```bash
corepack enable pnpm
```

### 安装与启动

```bash
pnpm install
pnpm start
```

启动后访问 `http://localhost:7200`。

### 常用命令

```bash
pnpm start             # 启动 Web 开发服务
pnpm build:web         # 构建 Web 应用
pnpm build             # 构建整个工作区
pnpm check             # typecheck + lint
pnpm test              # 运行单元测试
pnpm e2e:smoke         # 运行冒烟测试
pnpm check:cycles      # 检查循环依赖
pnpm manual:build      # 生成用户手册
```

## 开源项目展示

Open-CAI 不只是一个页面仓库，而是一套可继续扩展的工作台工程：

- `apps/web`：Web 应用、PWA、Service Worker 与对外入口页面
- `packages/drawnix`：画布工作区核心能力与 AI 工具集成
- `packages/react-board`：Plait React 画布适配层
- `packages/react-text`：文本渲染与相关组件
- `packages/utils`：共享工具与工作流解析能力
- `apps/web-e2e`：Playwright E2E、手册生成与冒烟验证
- `openspec`：需求规格、变更提案与长期演进记录

这意味着它不仅能被使用，也适合作为开源底座被研究、拆解、复用和继续构建。

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
