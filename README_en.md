<div align="center">
  <h1>Open-CAI</h1>
  <h3>Keep generation, structure, reflection, and delivery on one canvas</h3>
  <p>Not just an AI tool for outputs, but a working surface where creative context can remain alive.</p>
  <p>
    <a href="https://github.com/ljquan/aitu/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a>
    <a href="https://ai.772.ee"><img src="https://img.shields.io/badge/demo-online-brightgreen.svg" alt="Demo"></a>
  </p>
  <p>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fljquan%2Faitu&project-name=aitu&repository-name=aitu"><img src="https://vercel.com/button" alt="Deploy with Vercel"></a>
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/ljquan/aitu"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>
  </p>
</div>

[中文 README](./README.md)

## Project Character

Open-CAI is built around a simple idea: AI work should not disappear after one reply.

Images, notes, prompts, references, diagrams, tasks, and reusable assets belong in the same visual field. Instead of bouncing between separate tools, you stay inside one workspace where ideas can branch, tighten, reorganize, and eventually become deliverable work.

If a chat tool is a window, Open-CAI is a desk. It gives you room to lay things out, compare them, connect them, and keep the process visible.

## Access

- [Open the hosted workspace](https://ai.772.ee)

## Visual Showcase

| Split Images | Flowcharts | Mind Maps |
| --- | --- | --- |
| ![](./apps/web/public/product_showcase/九宫格拆图.gif) | ![](./apps/web/public/product_showcase/流程图.gif) | ![](./apps/web/public/product_showcase/思维导图.gif) |
| Semantic image splitting | Semantic flowcharts | Semantic mind maps |

## What It Enables

- **Generate**: route images, video, audio, text, and Agent-style flows from one surface.
- **Organize**: keep tasks, assets, frames, tool windows, and knowledge content adjacent to the work itself.
- **Reason**: use flowcharts, mind maps, Markdown, Mermaid, and structured editing as part of creation, not just documentation afterward.
- **Reuse**: task queues, media libraries, unified caching, and history help turn one output into material for the next.
- **Extend**: internal React tools, iframe tools, Skills, Agents, and plugin runtime support more specialized workflows.
- **Deliver**: frame-based slides, PPT export, media editing, and presentation-oriented organization support real project handoff.

## Who It Fits

- Creators who want AI image generation, structure, and delivery in one place
- Teams that need to generate, compare, refine, and archive creative material continuously
- Product, design, and independent development workflows that benefit from visible context
- Builders who want an open canvas-based AI workspace they can adapt and self-host

## Local Development

### Requirements

- Node.js 20+
- pnpm 10.21.0, preferably via Corepack

### Install and Run

```bash
corepack enable pnpm
pnpm install
pnpm start
```

Open `http://localhost:7200` after the dev server starts.

### Common Commands

```bash
pnpm start             # Start Web dev server
pnpm build:web         # Build the Web app
pnpm build             # Build the workspace
pnpm check             # typecheck + lint
pnpm test              # Run unit tests
pnpm e2e:smoke         # Run smoke E2E tests
pnpm check:cycles      # Check circular dependencies
pnpm manual:build      # Generate user manual
```

## Deployment

The repository supports multiple deployment paths, from quick launches to deeper self-hosting:

- Vercel / Netlify: use the one-click buttons above or the included static hosting config.
- Docker: build the static-site image with the root `Dockerfile`.
- Hybrid CDN + self-hosting: see [NPM CDN Deploy](./docs/NPM_CDN_DEPLOY.md) and [CDN Deployment](./docs/CDN_DEPLOYMENT.md).

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
