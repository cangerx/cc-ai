<div align="center">
  <h1>Open-CAI</h1>
  <h3>Keep generation, structure, reflection, and delivery on one canvas</h3>
  <p>Not just an AI tool for outputs, but a working surface where creative context can stay alive.</p>
  <p>
    <a href="https://github.com/ljquan/aitu/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-16a34a.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/Open%20Source-Canvas%20Workspace-f97316.svg" alt="Open Source Canvas Workspace">
    <img src="https://img.shields.io/badge/Support-Self--Hosted-0f172a.svg" alt="Self Hosted">
  </p>
  <p>
    <a href="https://ai.772.ee">Open Workspace</a> ·
    <a href="./docs/user-manual/content/index.mdx">User Manual</a> ·
    <a href="./docs/README.md">Development Docs</a> ·
    <a href="./README.md">中文 README</a>
  </p>
</div>

## At A Glance

Open-CAI is an open-source AI canvas workspace. It brings image generation, prompt reasoning, flowcharts, mind maps, media organization, task state, and final delivery back into one visual environment, so creative work does not fragment across tools.

## Why It Feels More Like a Studio Table Than a Chat Window

Most AI products are good at replying, but weak at holding the work after the reply ends.

Prompts, references, candidate outputs, notes, structure, and deliverables tend to scatter immediately after generation. Open-CAI is designed in the opposite direction. It keeps output on the canvas, thinking inside structure, and project context inside the workspace.

What you get is not just an answer. You get a live working surface that can still be edited, compared, expanded, archived, and delivered.

If a chat tool is a window, Open-CAI is a desk. Images, prompts, diagrams, notes, tasks, and assets can remain visible together, which is exactly what makes them usable together.

## Visual Showcase

| Split Images | Flowcharts | Mind Maps |
| --- | --- | --- |
| ![](./apps/web/public/product_showcase/九宫格拆图.gif) | ![](./apps/web/public/product_showcase/流程图.gif) | ![](./apps/web/public/product_showcase/思维导图.gif) |
| Semantic image splitting | Structured process mapping | Idea organization and knowledge capture |

## Core Value

### 1. One canvas for multi-model workflows

- Launch image, video, audio, text, and Agent-style flows from the same workspace.
- Keep model output inside the current project instead of losing it between tools.
- Generate, compare, annotate, and continue without breaking context.

### 2. It keeps structure, not only output

- Flowcharts, mind maps, Markdown, Mermaid, and normal canvas objects can live together.
- Prompts, analysis, references, conclusions, and final assets can stay connected.
- Better suited to ideation, planning, review, documentation, and team communication.

### 3. The path from asset to delivery is complete

- Task queues, media libraries, unified caching, and history help turn one output into the seed of the next.
- Frame slides, PPT export, and media-oriented organization support real project delivery.
- It behaves more like an AI project workbench than a single-purpose page.

### 4. Open source, self-hostable, and built to keep growing

- Internal React tools, iframe tools, Skills, Agents, and plugin-style runtime can all extend the workspace.
- Useful both as a personal creative desk and as a foundation for team-facing AI workspaces.
- Ready to use directly, but also suitable as a base for deeper customization.

## Who It Fits

- Creators who want AI image generation, structure, and delivery in one place
- Teams that need to generate, compare, annotate, and archive creative assets continuously
- Product, design, and independent development workflows that benefit from visible context
- Builders who want an open-source AI canvas workspace they can self-host and extend

## Deployment

### Docker quick start

Best when you want the shortest path to a running instance.

```bash
docker build -t open-cai .
docker run -d --name open-cai -p 8080:80 open-cai
```

Then open `http://localhost:8080` or your mapped server port.

### Release package deployment

Best for server uploads, versioned rollouts, static hosting, and panel-based deployment.

```bash
pnpm build:web
node scripts/create-deploy-package.js
```

Generated artifacts:

- `dist/apps/web/`: the complete static site bundle
- `dist/apps/web-<version>.tar.gz`: a ready-to-upload release archive

### aaPanel deployment

Best when you prefer visual server operations.

1. Run `pnpm build:web`, or generate `web-<version>.tar.gz` first.
2. Create a static website in aaPanel.
3. Upload `dist/apps/web/` or the extracted `web/` bundle to the site root.
4. Serve it with Nginx and update by replacing the static files.

### Vercel / Netlify

Best for quickly hosting a public static deployment.

- Use the repository's existing static hosting configuration.
- Build output directory: `dist/apps/web`
- One-click deployment buttons remain available at the top of this README.

### Deep self-hosting paths

Best for teams that want CDN strategy, release pipelines, or hybrid deployment.

- [NPM CDN Deploy](./docs/NPM_CDN_DEPLOY.md)
- [CDN Deployment](./docs/CDN_DEPLOYMENT.md)
- [Cloudflare Pages Deploy](./docs/CFPAGE-DEPLOY.md)

## Local Development

### Requirements

- Node.js 20+
- pnpm 10.21.0

Corepack is recommended:

```bash
corepack enable pnpm
```

### Install and Run

```bash
pnpm install
pnpm start
```

Open `http://localhost:7200` after the dev server starts.

### Common Commands

```bash
pnpm start             # Start Web dev server
pnpm build:web         # Build the Web app
pnpm build             # Build the full workspace
pnpm check             # typecheck + lint
pnpm test              # Run unit tests
pnpm e2e:smoke         # Run smoke E2E tests
pnpm check:cycles      # Check circular dependencies
pnpm manual:build      # Generate user manual
```

## Open-Source Footprint

Open-CAI is not just a landing page repository. It is a workbench codebase that can keep growing:

- `apps/web`: Web app, PWA, Service Worker, and public entry pages
- `packages/drawnix`: core canvas workspace and AI tool integration
- `packages/react-board`: Plait React board adapter
- `packages/react-text`: text rendering components
- `packages/utils`: shared utilities and workflow parsing
- `apps/web-e2e`: Playwright E2E, smoke validation, and manual generation
- `openspec`: requirements, change proposals, and long-term evolution record

That makes the project useful not only to run, but also to study, adapt, fork, and build on top of.

## Repository Structure

```text
aitu/
├── apps/
│   ├── web/                 # Open-CAI Web app and Service Worker
│   └── web-e2e/             # Playwright E2E and manual generation
├── packages/
│   ├── drawnix/             # Canvas workspace core
│   ├── react-board/         # Plait React board adapter
│   ├── react-text/          # Text rendering components
│   └── utils/               # Shared utilities and workflow parsing
├── docs/                    # Current development documentation
├── openspec/                # Requirements and change proposals
└── scripts/                 # Build, release, manual, and deploy scripts
```

## Documentation

- [User manual source](./docs/user-manual/content/index.mdx)
- [Development docs](./docs/README.md)
- [Contributing guide](./CONTRIBUTING.md)
- [OpenSpec instructions](./openspec/AGENTS.md)

## License

MIT
