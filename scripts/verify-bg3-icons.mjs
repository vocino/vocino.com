#!/usr/bin/env node
/** Verifies every slug in bg3-icons.ts has a file on disk. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bg3IconEntries } from '../src/pages/bg3/_lib/bg3-icons.ts';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'public/assets/images/bg3');
const missing = bg3IconEntries.filter((e) => !existsSync(join(root, e.file)));

if (missing.length) {
  console.error('Missing icon files:');
  for (const e of missing) console.error(`  ${e.slug} -> ${e.file}`);
  process.exit(1);
}
console.log(`OK: ${bg3IconEntries.length} icons verified`);
