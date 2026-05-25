import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://vocino.com',
  trailingSlash: 'ignore',
  markdown: {
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
