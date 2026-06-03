import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { remarkBg3Icons } from './src/lib/remark-bg3-icons.ts';
import { remarkCdIcons } from './src/lib/remark-cd-icons.ts';
import { remarkGuideTables } from './src/pages/bg3/_lib/remark-guide-tables.ts';
import { rehypeWrapGuideTables } from './src/pages/bg3/_lib/rehype-wrap-guide-tables.ts';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  site: 'https://vocino.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    remarkPlugins: [remarkBg3Icons, remarkCdIcons, remarkGuideTables],
    rehypePlugins: [rehypeWrapGuideTables],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Close to site surfaces; Shiki applies colors via inline styles on spans
      theme: 'github-dark',
      wrap: true,
      langAlias: {
        fstab: 'shellscript',
        cron: 'shellscript',
        dotenv: 'ini',
      },
    },
  },
});
