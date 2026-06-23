import { useState } from 'preact/hooks';

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button class="tsgo__copy" onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1200); }}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function ReactAstro(
  { react, astro, reactTitle = 'React', astroTitle = 'Astro' }:
  { react: string; astro: string; reactTitle?: string; astroTitle?: string },
) {
  return (
    <div class="tsgo">
      <div class="tsgo__col">
        <header>{reactTitle}<CopyBtn text={react} /></header>
        <pre><code>{react}</code></pre>
      </div>
      <div class="tsgo__col">
        <header>{astroTitle}<CopyBtn text={astro} /></header>
        <pre><code>{astro}</code></pre>
      </div>
    </div>
  );
}
