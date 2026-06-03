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
    /** Catalogue entry type: a per-class build, or general playthrough advice. */
    kind: z.enum(['build', 'playthrough']).default('build'),
    /** Display class name, e.g. "Paladin" (for `kind: 'build'`). */
    className: z.string().optional(),
    /** Class icon slug, matching the bg3-classes registry, e.g. "paladin". */
    classSlug: z.string().optional(),
    /** Subclass label shown on the build, e.g. "Oath of Vengeance". */
    subclass: z.string().optional(),
    /** Short role tag for the catalogue card, e.g. "Melee burst". */
    role: z.string().optional(),
    /** One-line blurb for the catalogue card (falls back to description). */
    summary: z.string().optional(),
    /** Manual ordering within a section (lower sorts first). */
    order: z.number().optional(),
    /** Hide from routing + the catalogue (e.g. retired/in-progress entries). */
    draft: z.boolean().default(false),
  }),
});

const crimsonDesert = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/crimson-desert' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
    character: z.enum(['kliff', 'damiane', 'oongka']),
    status: z.enum(['published', 'coming-soon']).default('published'),
    phase: z.string().optional(),
    iconGeneration: z.number().optional(),
  }),
});

export const collections = { homelab, bg3, 'crimson-desert': crimsonDesert };
