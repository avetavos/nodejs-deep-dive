import { describe, it, expect } from 'vitest';
import { buildAstroProject } from '../src/components/astro-project';

describe('buildAstroProject', () => {
  it('puts the snippet at src/pages/index.astro', () => {
    const p = buildAstroProject('<h1>hi</h1>');
    expect(p.files['src/pages/index.astro']).toBe('<h1>hi</h1>');
  });
  it('includes astro as a dependency and a node template', () => {
    const p = buildAstroProject('x');
    expect(p.template).toBe('node');
    expect(p.files['package.json']).toContain('"astro"');
    expect(p.files['astro.config.mjs']).toContain('defineConfig');
  });
});
