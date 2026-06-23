# Astro for React Developers

A bilingual, interactive course that teaches **Astro** to developers who already know **React/Next**, using a comparison-first approach. Every concept is introduced from the React perspective first (component → `.astro` file, function body → server-side `---` frontmatter, returned JSX → HTML-first template, props → `Astro.props`, `children` → `<slot>`, full-app hydration → **islands** with `client:` directives, `getServerSideProps`/`useEffect` → top-level `await` in frontmatter), then mapped to the Astro equivalent — with the key differences called out. A recurring theme: **you can keep using your React components** inside Astro as islands.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Runnable Astro | **"Open in StackBlitz"** — each example shows the `.astro` code with a button that opens a real, runnable Astro project in [StackBlitz](https://stackblitz.com) (WebContainer, in-browser) via the StackBlitz SDK; `astro.new` fallback |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| Styling | Starlight default + custom CSS (`src/styles/custom.css`) |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

Run all commands from the project root.

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

> There is **no runner build step** — example Astro code runs on the external StackBlitz service via the "Open in StackBlitz" button (no backend, no embedded compiler).

## Content Structure

```
src/content/docs/
  en/              # English content — served at /en/...
    intro/
    components/
    islands/
    routing/
    content/
    styling/
    tooling/
    index.mdx      # EN landing page (splash template)
  th/              # Thai content — served at /th/...
    (same module directories)
    index.mdx      # TH landing page (splash template)
```

### The 7 Modules

| Directory | Module | Topics |
| --------- | ------ | ------ |
| `intro` | Introduction & Setup | Why Astro, islands architecture, MPA vs SPA, ship-less-JS, first page |
| `components` | .astro Components | Frontmatter (server), `Astro.props`, slots, expressions, zero-JS by default vs JSX |
| `islands` | Islands & Using React | `client:` directives, partial vs full-app hydration, **using React in Astro** |
| `routing` | Routing & Layouts | File-based routing, dynamic routes + `getStaticPaths`, layouts vs react-router/Next |
| `content` | Content & Data | Frontmatter `await`, content collections vs `getServerSideProps`/`useEffect` |
| `styling` | Styling | Scoped `<style>`, global styles, `define:vars`/`class:list`, Tailwind |
| `tooling` | Tooling, Testing & Deployment | `astro` CLI, integrations, `astro check`, static vs SSR, deploy |

### Lesson File IDs

Content IDs follow the `<module>/<slug>` convention, e.g. `components/props`. The Starlight sidebar uses `autogenerate: { directory }` per locale root.

### Lesson Template

1. **Intro** — React-analogy framing
2. **Concept** — prose explanation
3. **ReactAstro** — `<ReactAstro react={...} astro={...} />` side-by-side React ↔ Astro code
4. **AstroPlayground** — `<AstroPlayground code={...} />` a complete runnable `.astro` page + "Open in StackBlitz" button (omitted in CLI/multi-file lessons, which use code blocks)
5. **Diff** — `<Diff>` callout for key React → Astro differences
6. **Quiz** — `<Quiz questions={...} />`
7. **ProgressTracker** — `<ProgressTracker id="module/slug" />` (always last)

Code is hoisted into `export const` template literals and passed by reference.

> **⚠️ Authoring gotchas (MDX is sensitive to braces; Astro templates use `{ }`):**
> - **Never put a bare `{...}` in prose or headings** — Astro `{expr}`/`{items.map(...)}` in a heading or paragraph is parsed as a JS expression and breaks the build. Keep them inside backtick code spans or `export const` strings. (Quiz strings, `<Diff title="…">` attributes, and frontmatter are safe — MDX doesn't parse those.)
> - **In `export const` code literals, escape `${`→`\${`** — JS/Astro template-literal interpolation (e.g. `` `btn--${x}` ``) inside an `export const` backtick string must be `\${`; double-escape `\\n`/`\\t` too.
> - **Frontmatter `title`/`description`**: single-quote values with a colon/backtick (double-quote if they contain an apostrophe); never use a `\` escape inside a YAML scalar.
> - **Internal links must include the base path**, e.g. `/astro-for-react-developers/en/components/props/`.

## How the Runner Works

Astro renders at build/SSR time, so a single `.astro` component can't be compiled and rendered client-side. Instead, `<AstroPlayground>` (`src/components/AstroPlayground.tsx`) shows the `.astro` source and an **"Open in StackBlitz ▸"** button that lazy-loads the [StackBlitz SDK](https://developer.stackblitz.com/platform/api/javascript-sdk) from esm.sh and calls `sdk.openProject(...)` with a minimal runnable Astro project (`src/components/astro-project.ts` builds `package.json` + `astro.config.mjs` + your snippet as `src/pages/index.astro`). StackBlitz boots a WebContainer dev server in the browser. If the SDK fails, it copies the code and opens `astro.new`.

## Deployment

Fully static (`output: 'static'`). Build output → `dist/`. Deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

### GitHub Pages (configured)

Deploys via `.github/workflows/deploy.yml` (build with `withastro/action` on Node 22, publish with `actions/deploy-pages`).

One-time setup:

1. Create a GitHub repo and push (`main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Confirm the base path in `astro.config.mjs`:
   - **Project site** (`https://USER.github.io/REPO/`): `site: 'https://USER.github.io'`, `base: '/REPO'` (currently `avetavos` / `astro-for-react-developers`).
   - **User/org site** or **custom domain**: set `site` and **remove `base`** (served at root).

If you change `base`, update the base-prefixed links in `src/content/docs/**` (landing pages and module index lesson tables).
