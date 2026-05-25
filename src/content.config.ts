import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const homelab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homelab' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { homelab };
