import { useState } from 'preact/hooks';
import { buildJsSrcdoc, buildNodeProject } from './node-runner';

type SdkLike = { openProject: (p: unknown, o?: unknown) => void };
let sdkPromise: Promise<SdkLike> | null = null;
function loadSdk(): Promise<SdkLike> {
  if (!sdkPromise) sdkPromise = import(/* @vite-ignore */ 'https://esm.sh/@stackblitz/sdk').then((m) => (m.default ?? m) as SdkLike);
  return sdkPromise;
}

const COPY = {
  en: { js: 'JavaScript', node: 'Node.js', run: 'Run ▸', open: 'Open in StackBlitz ▸',
    hint: 'Needs the Node.js runtime — open in StackBlitz to run.',
    expected: 'Output (verified on Node 24)', edited: 'Code was edited — the verified output below is for the original snippet.' },
  th: { js: 'JavaScript', node: 'Node.js', run: 'รัน ▸', open: 'เปิดใน StackBlitz ▸',
    hint: 'ต้องใช้ Node.js runtime — เปิดใน StackBlitz เพื่อรัน',
    expected: 'ผลลัพธ์ (ตรวจแล้วบน Node 24)', edited: 'โค้ดถูกแก้ — ผลลัพธ์ด้านล่างเป็นของ snippet ต้นฉบับ' },
};
// Hydrates with client:visible, so the document is available by the time it renders.
function copy() {
  const lang = typeof document === 'undefined' ? 'en' : document.documentElement.lang;
  return lang?.startsWith('th') ? COPY.th : COPY.en;
}

// `expected` is the real stdout of the snippet under Node 24, produced by
// `node tools/verify-snippets.mjs --emit` — never hand-written. Shown for
// `node` snippets, which cannot run in the browser sandbox.
export default function NodeRunner({ code, node = false, expected }: { code: string; node?: boolean; expected?: string }) {
  const [src, setSrc] = useState(code);
  const [doc, setDoc] = useState('');
  const [ran, setRan] = useState(false);
  const t = copy();

  function run() { setDoc(buildJsSrcdoc(src)); setRan(true); }
  async function openSb() {
    try {
      const sdk = await loadSdk();
      sdk.openProject(buildNodeProject(src), { openFile: 'index.js', newWindow: true });
    } catch {
      navigator.clipboard.writeText(src);
      window.open('https://stackblitz.com/fork/node', '_blank', 'noopener');
    }
  }

  return (
    <div class="nr">
      <div class="nr__bar">
        <span class="nr__label">{node ? t.node : t.js}</span>
        <span class="nr__actions">
          {!node && <button class="nr__run" onClick={run}>{t.run}</button>}
          <button class="nr__open" onClick={openSb}>{t.open}</button>
        </span>
      </div>
      <textarea class="nr__code" spellcheck={false} value={src}
        onInput={(e) => setSrc((e.target as HTMLTextAreaElement).value)} />
      {node
        ? (expected !== undefined
          ? <details class="nr__expected" open>
              <summary>{t.expected}</summary>
              {src !== code && <p class="nr__hint">{t.edited}</p>}
              <pre><code>{expected}</code></pre>
            </details>
          : <p class="nr__hint">{t.hint}</p>)
        : ran && <iframe class="nr__out" sandbox="allow-scripts" srcdoc={doc} title="Output" />}
    </div>
  );
}
