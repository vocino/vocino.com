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

const bg3 = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bg3' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
    /** Bumped when bg3 icon assets/paths change — invalidates content cache. */
    iconGeneration: z.number().optional(),
  }),
});

export const collections = { homelab, bg3 };
