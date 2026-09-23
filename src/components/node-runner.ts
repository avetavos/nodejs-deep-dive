export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

// A snippet whose first statement (after leading comments) is 'use strict' must run strict:
// the code is wrapped in an async IIFE + try block, so the directive would otherwise be inert.
export function wantsStrict(code: string): boolean {
  return /^(?:\s*\/\/[^\n]*\n|\s*\/\*[\s\S]*?\*\/\s*)*\s*['"]use strict['"]\s*;/.test(code);
}

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  const strict = wantsStrict(code) ? "'use strict';" : '';
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre><script>(async function(){' + strict +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'try{\n' + safe + '\n}catch(e){w("Error: "+((e&&e.message)||e));}' +
    '})();</script></body></html>'
  );
}

export function buildNodeProject(code: string): StackBlitzProject {
  return {
    title: 'Node.js example',
    description: 'Node.js Deep Dive — runnable example',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        { name: 'node-example', type: 'module', scripts: { start: 'node index.js' } },
        null, 2,
      ),
      'index.js': code,
    },
  };
}
