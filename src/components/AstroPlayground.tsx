import { buildAstroProject } from './astro-project';

type SdkLike = { openProject: (p: unknown, o?: unknown) => void };
let sdkPromise: Promise<SdkLike> | null = null;
function loadSdk(): Promise<SdkLike> {
  if (!sdkPromise) sdkPromise = import(/* @vite-ignore */ 'https://esm.sh/@stackblitz/sdk').then((m) => (m.default ?? m) as SdkLike);
  return sdkPromise;
}

export default function AstroPlayground({ code }: { code: string }) {
  async function open() {
    try {
      const sdk = await loadSdk();
      sdk.openProject(buildAstroProject(code), { openFile: 'src/pages/index.astro', newWindow: true });
    } catch {
      navigator.clipboard.writeText(code);
      window.open('https://astro.new', '_blank', 'noopener');
    }
  }
  return (
    <div class="ap">
      <div class="ap__bar">
        <span class="ap__label">Astro</span>
        <button class="ap__open" onClick={open}>Open in StackBlitz ▸</button>
      </div>
      <pre class="ap__code"><code>{code}</code></pre>
    </div>
  );
}
