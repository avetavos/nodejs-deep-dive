// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/nodejs-deep-dive',
  output: 'static',
  integrations: [starlight({
      title: 'Node.js Deep Dive',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/nodejs-deep-dive/enhance.js' } },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/nodejs-deep-dive' }],
      sidebar: [
        { label: 'JavaScript Essentials', items: [{ autogenerate: { directory: 'js-essentials' } }] },
        { label: 'Event Loop & Async', items: [{ autogenerate: { directory: 'event-loop-async' } }] },
        { label: 'Core APIs', items: [{ autogenerate: { directory: 'core-apis' } }] },
        { label: 'Streams & I/O', items: [{ autogenerate: { directory: 'streams' } }] },
        { label: 'HTTP & Networking', items: [{ autogenerate: { directory: 'http-networking' } }] },
        { label: 'Modules & npm', items: [{ autogenerate: { directory: 'modules-npm' } }] },
        { label: 'Testing & Tooling', items: [{ autogenerate: { directory: 'testing-tooling' } }] },
      ],
      }), preact()],
});