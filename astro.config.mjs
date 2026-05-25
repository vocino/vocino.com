import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { remarkBg3Icons } from './src/lib/remark-bg3-icons.ts';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://vocino.com',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkBg3Icons],
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
