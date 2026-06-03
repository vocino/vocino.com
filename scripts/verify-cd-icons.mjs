#!/usr/bin/env node
/** Verifies every slug in cd-icons.ts has a file on disk. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cdIconEntries } from '../src/pages/crimson-desert/_lib/cd-icons.ts';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'public/assets/images/crimson-desert');
const missing = cdIconEntries.filter((e) => !existsSync(join(root, e.file)));

if (missing.length) {
  console.error('Missing icon files:');
  for (const e of missing) console.error(`  ${e.slug} -> ${e.file}`);
  process.exit(1);
}
console.log(`OK: ${cdIconEntries.length} icons verified`);
