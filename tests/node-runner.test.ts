import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildNodeProject } from '../src/components/node-runner';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
});

describe('buildNodeProject', () => {
  it('puts the snippet at index.js with a node template', () => {
    const p = buildNodeProject("console.log(1)");
    expect(p.files['index.js']).toBe('console.log(1)');
    expect(p.template).toBe('node');
    expect(p.files['package.json']).toContain('"type": "module"');
  });
});
