// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/astro-for-react-developers',
  output: 'static',
  integrations: [starlight({
      title: 'Astro for React Developers',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/astro-for-react-developers' }],
      sidebar: [
        { label: 'Introduction & Setup', items: [{ autogenerate: { directory: 'intro' } }] },
        { label: '.astro Components', items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'Islands & Using React', items: [{ autogenerate: { directory: 'islands' } }] },
        { label: 'Routing & Layouts', items: [{ autogenerate: { directory: 'routing' } }] },
        { label: 'Content & Data', items: [{ autogenerate: { directory: 'content' } }] },
        { label: 'Styling', items: [{ autogenerate: { directory: 'styling' } }] },
        { label: 'Tooling, Testing & Deployment', items: [{ autogenerate: { directory: 'tooling' } }] },
      ],
      }), preact()],
});