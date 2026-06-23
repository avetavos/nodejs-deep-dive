# Intro Module — EN + TH MDX Lessons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author all 5 EN + 5 TH MDX lesson files for the "intro" module of the `svelte-for-react-developers` Astro+Starlight bilingual course.

**Architecture:** Each lesson is a standalone `.mdx` file under `src/content/docs/{en,th}/intro/`. Files share identical `export const` variable names, component ids, code strings, and Quiz `answer` indices across locales — only prose, `title`, `description`, and quiz question/option text is translated to Thai. All lessons follow the golden template from `events.mdx` exactly: frontmatter → imports → prose → `export const` + `<ReactSvelte>` → `export const` + `<SveltePlayground client:visible>` (or skip note for CLI lessons) → `<Diff>` → `export const quiz...` + `<Quiz client:visible id="intro/<slug>">` → `<ProgressTracker client:visible id="intro/<slug>">` (always last).

**Tech Stack:** Astro 6, Starlight 0.40, MDX, Svelte 5 runes, Preact components (ReactSvelte, SveltePlayground, Diff, Quiz, ProgressTracker).

---

## File Map

| File | Path (EN) | Path (TH) |
|---|---|---|
| index.mdx | `src/content/docs/en/intro/index.mdx` | `src/content/docs/th/intro/index.mdx` |
| compiler-model.mdx | `src/content/docs/en/intro/compiler-model.mdx` | `src/content/docs/th/intro/compiler-model.mdx` |
| setup.mdx | `src/content/docs/en/intro/setup.mdx` | `src/content/docs/th/intro/setup.mdx` |
| svelte-file-anatomy.mdx | `src/content/docs/en/intro/svelte-file-anatomy.mdx` | `src/content/docs/th/intro/svelte-file-anatomy.mdx` |
| mental-shift.mdx | `src/content/docs/en/intro/mental-shift.mdx` | `src/content/docs/th/intro/mental-shift.mdx` |

## Golden Template Rules (enforced in every lesson)

1. Frontmatter: single-quote `title`/`description`; switch to double-quotes if apostrophe present.
2. Imports: relative `../../../../components/...`; import ONLY components used in the file.
3. Hoisted `export const` for every multi-line code string. Never inline template literals in JSX props.
4. Escaping inside backtick strings: `\$state`, `\$derived`, `\$props`, `\$effect`; `\${`; `<\/script>`.
5. Bare `{...}` never in prose — only inside code fences or export const strings.
6. `<SveltePlayground client:visible code={...} />` — code must be a complete single-file Svelte 5 component.
7. `setup.mdx` skips SveltePlayground (CLI/tooling lesson) — add skip note.
8. `<ProgressTracker>` is ALWAYS the last element.
9. Quiz: `q:` key (not `question:`), `answer` is 0-based index, 2–4 questions.
10. id = `intro/<filename-without-ext>`.

---

### Task 1: EN index.mdx

**Files:**
- Create: `src/content/docs/en/intro/index.mdx`

- [ ] Write the file with: why Svelte for React devs (compiler, no vDOM, less boilerplate, scoped styles); course overview table; first runnable component.
- [ ] Verify `\$state` escaped in all export const strings.
- [ ] Verify `<ProgressTracker>` is last.

---

### Task 2: TH index.mdx

**Files:**
- Create: `src/content/docs/th/intro/index.mdx`

- [ ] Mirror Task 1 exactly; translate prose, title, description, quiz q/options to Thai.
- [ ] Verify code strings and `answer` indices are byte-for-byte identical to EN.

---

### Task 3: EN compiler-model.mdx

**Files:**
- Create: `src/content/docs/en/intro/compiler-model.mdx`

- [ ] Write the file: Svelte is a compiler vs React runtime + vDOM; smaller bundles; surgical updates; ReactSvelte conceptual pair; runnable hello component; Diff.
- [ ] Verify escaping.

---

### Task 4: TH compiler-model.mdx

**Files:**
- Create: `src/content/docs/th/intro/compiler-model.mdx`

- [ ] Mirror Task 3; translate prose only.

---

### Task 5: EN setup.mdx

**Files:**
- Create: `src/content/docs/en/intro/setup.mdx`

- [ ] Write: `npm create vite@latest` (svelte/svelte-ts) + `npx sv create` / SvelteKit vs CRA/Vite-react/Next; ReactSvelte (scripts); skip SveltePlayground with note.
- [ ] Verify no SveltePlayground import since it's not used.

---

### Task 6: TH setup.mdx

**Files:**
- Create: `src/content/docs/th/intro/setup.mdx`

- [ ] Mirror Task 5; translate prose only; same skip note in Thai.

---

### Task 7: EN svelte-file-anatomy.mdx

**Files:**
- Create: `src/content/docs/en/intro/svelte-file-anatomy.mdx`

- [ ] Write: three parts of a .svelte file (script/runes, markup, scoped style) vs React component file; runnable component showing all three sections; Diff.

---

### Task 8: TH svelte-file-anatomy.mdx

**Files:**
- Create: `src/content/docs/th/intro/svelte-file-anatomy.mdx`

- [ ] Mirror Task 7; translate prose only.

---

### Task 9: EN mental-shift.mdx

**Files:**
- Create: `src/content/docs/en/intro/mental-shift.mdx`

- [ ] Write: assignment-based reactivity, no setState, runes preview; runnable `\$state` demo; Diff.

---

### Task 10: TH mental-shift.mdx

**Files:**
- Create: `src/content/docs/th/intro/mental-shift.mdx`

- [ ] Mirror Task 9; translate prose only.
