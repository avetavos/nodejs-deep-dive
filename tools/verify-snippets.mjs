// Runs every ```js fence and every `export const xxxCode = `...`` literal in the EN
// lessons under the local Node (24.x) as an ES module and reports failures.
// Markers on line 1 of a snippet:
//   // @skip-verify <reason>   — illustrative only (multi-file, needs network, CLI, ...)
//   // @expect-throw            — the snippet is supposed to exit non-zero
//   // @browser                 — runs in the NodeRunner iframe (still run here; must not use Node-only APIs)
// CJS is detected from require()/module.exports and run as .cjs; otherwise the snippet runs as .mjs.
// Usage: node tools/verify-snippets.mjs [pathFilter]     NODE=/path/to/node to override
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const NODE = process.env.NODE ?? process.execPath;
const filter = process.argv[2] ?? '';
const root = 'src/content/docs/en';
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.mdx') && p.includes(filter) && files.push(p); } })(root);

let n = 0, failed = 0, skipped = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const snippets = [...src.matchAll(/```js\n([\s\S]*?)```/g)].map((m) => m[1])
    .concat([...src.matchAll(/export const (\w+Code) = `((?:[^`\\]|\\[\s\S])*)`/g)].map((m) => Function('return `' + m[2] + '`')()));
  let i = 0;
  for (const body of snippets) {
    i++; n++;
    const first = body.split('\n')[0];
    const skip = first.match(/^\/\/ @skip-verify(.*)$/);
    if (skip) { skipped++; console.log(`SKIP ${f}#${i}${skip[1] ? ' —' + skip[1] : ''}`); continue; }
    const expectThrow = /^\/\/ @expect-throw/.test(first);
    const dir = `.verify/${f.replace(/[\/.]/g, '_')}`;
    mkdirSync(dir, { recursive: true });
    // CommonJS snippets (require/module.exports, no import/export) run as .cjs; everything else as ESM.
    const cjs = /\b(require\(|module\.exports|exports\.)/.test(body) && !/^(import|export)\s/m.test(body);
    const name = `snippet${i}.${cjs ? 'cjs' : 'mjs'}`;
    writeFileSync(`${dir}/${name}`, body);
    const r = spawnSync(NODE, ['--no-warnings=ExperimentalWarning', name], { encoding: 'utf8', timeout: 15000, cwd: dir });
    const ok = expectThrow ? r.status !== 0 : r.status === 0;
    const out = ((r.stdout ?? '') + (r.stderr ?? '')).trim();
    if (!ok) { failed++; console.log(`FAIL ${f}#${i} exit=${r.status}${r.error ? ' ' + r.error.message : ''}\n${out.split('\n').slice(0, 6).join('\n')}`); }
    else console.log(`OK   ${f}#${i}${expectThrow ? ' (threw as expected)' : ''}`);
  }
}
console.log(`${n} snippets, ${failed} failed, ${skipped} skipped (${NODE})`);
process.exit(failed ? 1 : 0);
