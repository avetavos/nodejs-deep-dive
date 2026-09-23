// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://deep-dive.avetavos.com',
  base: '/nodejs',
  output: 'static',
  integrations: [starlight({
      title: 'Node.js Deep Dive',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/nodejs/enhance.js' } },
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/nodejs-deep-dive' }],
      sidebar: [
        { label: 'JavaScript Essentials', translations: { th: 'พื้นฐาน JavaScript' }, items: [{ autogenerate: { directory: 'js-essentials' } }] },
        { label: 'Event Loop & Async', translations: { th: 'Event Loop และ Async' }, items: [{ autogenerate: { directory: 'event-loop-async' } }] },
        { label: 'Core APIs', translations: { th: 'Core API' }, items: [{ autogenerate: { directory: 'core-apis' } }] },
        { label: 'Streams & I/O', translations: { th: 'Streams และ I/O' }, items: [{ autogenerate: { directory: 'streams' } }] },
        { label: 'HTTP & Networking', translations: { th: 'HTTP และเครือข่าย' }, items: [{ autogenerate: { directory: 'http-networking' } }] },
        { label: 'Modules & npm', translations: { th: 'Modules และ npm' }, items: [{ autogenerate: { directory: 'modules-npm' } }] },
        { label: 'Testing & Tooling', translations: { th: 'การทดสอบและเครื่องมือ' }, items: [{ autogenerate: { directory: 'testing-tooling' } }] },
        { label: 'Glossary', translations: { th: 'อภิธานศัพท์' }, link: 'glossary' },
      ],
      }), preact()],
});