export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

export function buildAstroProject(code: string): StackBlitzProject {
  return {
    title: 'Astro example',
    description: 'Astro for React Developers — runnable example',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        { name: 'astro-example', type: 'module', scripts: { dev: 'astro dev', start: 'astro dev', build: 'astro build' }, dependencies: { astro: '^5.0.0' } },
        null, 2,
      ),
      'astro.config.mjs': "import { defineConfig } from 'astro/config';\nexport default defineConfig({});\n",
      'src/pages/index.astro': code,
    },
  };
}
