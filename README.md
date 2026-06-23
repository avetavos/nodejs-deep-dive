# Node.js Deep Dive

A bilingual (EN/TH), interactive, standalone course that teaches the **Node.js runtime and server-side JavaScript** in depth — from JavaScript essentials and the event loop to streams, core APIs, modules/npm, and tooling. It is language-core focused (the runtime and the language), not a framework tutorial.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Runnable code | **Hybrid `<NodeRunner>`** — pure-JS snippets run live in a sandboxed iframe (editable; `console.*` output captured); Node-API snippets show an "Open in StackBlitz" button that opens a real Node project (WebContainer) via the StackBlitz SDK |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| Styling | Starlight default + custom CSS (`src/styles/custom.css`) |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

> No runner build step — JavaScript runs in the browser; Node examples run on StackBlitz. No backend.

## Content Structure

```
src/content/docs/
  en/                  # English — served at /en/...
    js-essentials/
    event-loop-async/
    core-apis/
    streams/
    http-networking/
    modules-npm/
    testing-tooling/
    index.mdx          # EN landing (splash)
  th/                  # Thai — served at /th/...
    (same module directories)
    index.mdx          # TH landing (splash)
```

### The 7 Modules

| Directory | Module | Runner |
| --------- | ------ | ------ |
| `js-essentials` | JavaScript Essentials | in-browser JS (modules lesson: node) |
| `event-loop-async` | Event Loop & Async | in-browser JS |
| `core-apis` | Core APIs (process/Buffer/fs/events) | node (StackBlitz) |
| `streams` | Streams & I/O | node (StackBlitz) |
| `http-networking` | HTTP & Networking | node (StackBlitz) |
| `modules-npm` | Modules & npm | code / node |
| `testing-tooling` | Testing & Tooling | code / node |

### Lesson Template

frontmatter (`title`, `description`, `sidebar.order`) → imports → concept intro → prose → hoisted `export const ...Code` + `<NodeRunner code={...} [node] />` → `<Callout>` (key point / gotcha) → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`.

> **⚠️ Authoring notes:**
> - **`<NodeRunner code={...} />`** runs JS in the browser (editable, click Run). **`<NodeRunner code={...} node />`** is for snippets needing the Node runtime (process/Buffer/fs/http/streams/require/npm) — code + "Open in StackBlitz", no in-browser run.
> - **In `export const` snippets, prefer string concatenation over template literals** to avoid escaping. If you must use a template literal, escape interpolation as `\${...}` and backticks as `` \` ``.
> - **Never put a bare `{...}` in prose or headings** — keep object/destructuring examples in backtick code spans or fenced ```js blocks.
> - **Internal links must include the base path**, e.g. `/nodejs-deep-dive/en/event-loop-async/`.
> - **Do NOT run a `\n`/`\t`-doubling escaping codemod** on this content — it corrupts indentation. Verify by building + browser-testing instead.

## How the Hybrid Runner Works

`<NodeRunner>` (`src/components/NodeRunner.tsx`) has two modes, both backed by pure helpers in `src/components/node-runner.ts`:

- **JS mode (default):** `buildJsSrcdoc(code)` builds an iframe `srcdoc` that overrides `console.*` to print into the page and runs the snippet in an async IIFE. Sync, promises, microtasks, and `setTimeout` all execute with correct ordering. Editable + re-runnable.
- **Node mode (`node` prop):** `buildNodeProject(code)` builds a minimal Node project (`package.json` with `"type":"module"` + `index.js`); the button calls the StackBlitz SDK's `openProject` to launch it in a WebContainer. Falls back to opening `stackblitz.com/fork/node` + copying the code.

## Deployment

Fully static (`output: 'static'`) → `dist/`. Deploys to GitHub Pages via `.github/workflows/deploy.yml` (build with `withastro/action` on Node 22, publish with `actions/deploy-pages`).

One-time setup: create the repo, push `main`, set **Settings → Pages → Source: GitHub Actions**. The base path in `astro.config.mjs` is `site: 'https://avetavos.github.io'`, `base: '/nodejs-deep-dive'`. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
