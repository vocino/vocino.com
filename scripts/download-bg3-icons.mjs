#!/usr/bin/env node
/**
 * Downloads spell/item icons from bg3.wiki into public/assets/images/bg3/.
 * Run: node scripts/download-bg3-icons.mjs
 */

import { spawn } from 'node:child_process';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outRoot = join(root, 'public/assets/images/bg3');

const UA = 'vocino.com-bg3-guide/1.0 (personal guide; icon cache)';

/** wiki page title -> output path relative to bg3/ */
const downloads = [
  ['Hold_Person', 'spells/hold-person.webp'],
  ['Hold_Monster', 'spells/hold-monster.webp'],
  ['Hypnotic_Pattern', 'spells/hypnotic-pattern.webp'],
  ['Greater_Invisibility', 'spells/greater-invisibility.webp'],
  ['Haste', 'spells/haste.webp'],
  ['Bless', 'spells/bless.webp'],
  ['Sanctuary', 'spells/sanctuary.webp'],
  ['Calm_Emotions', 'spells/calm-emotions.webp'],
  ['Shield_(spell)', 'spells/shield.webp'],
  ['Misty_Step', 'spells/misty-step.webp'],
  ['Ray_of_Frost', 'spells/ray-of-frost.webp'],
  ['Spirit_Guardians', 'spells/spirit-guardians.webp'],
  ['Magic_Missile', 'spells/magic-missile.webp'],
  ['Counterspell', 'spells/counterspell.webp'],
  ['Command', 'spells/command.webp'],
  ['Booming_Blade', 'spells/booming-blade.webp'],
  ['Shadow_Blade', 'spells/shadow-blade.webp'],
  ['Divine_Smite', 'spells/divine-smite.webp'],
  ['Pass_Without_Trace', 'spells/pass-without-trace.webp'],
  ['Create_Water', 'spells/create-water.webp'],
  ['Healing_Word', 'spells/healing-word.webp'],
  ['Armor_of_Agathys', 'spells/armor-of-agathys.webp'],
  ['Wall_of_Fire', 'spells/wall-of-fire.webp'],
  ['Globe_of_Invulnerability', 'spells/globe-of-invulnerability.webp'],
  ['Cloud_of_Daggers', 'spells/cloud-of-daggers.webp'],
  ['Sleet_Storm', 'spells/sleet-storm.webp'],
  ['Aid', 'spells/aid.webp'],
  ['Protection_from_Evil_and_Good', 'spells/protection-from-evil-and-good.webp'],
  ['Arcane_Lock', 'spells/arcane-lock.webp'],
  ['Phalar_Aluve', 'items/phalar-aluve.webp'],
  ['Titanstring_Bow', 'items/titanstring-bow.webp'],
  ['Drakethroat_Glaive', 'items/drakethroat-glaive.webp'],
  ['Birthright', 'items/birthright.webp'],
  ['Markoheshkir', 'items/markoheshkir.webp'],
  ['Sussur_Bloom', 'items/sussur-bloom.webp'],
  ['Sharpshooter', 'feats/sharpshooter.webp'],
  ['Alert_(Feat)', 'feats/alert.webp'],
  ['Savage_Attacker', 'feats/savage-attacker.webp'],
  ['Tavern_Brawler', 'feats/tavern-brawler.webp'],
];

/** When auto-discovery fails, use a known full image path from the wiki. */
const DIRECT_ICON = {
  'Shield_(spell)': '/w/images/c/cf/Shield_spell_Icon.webp',
  Command: '/w/images/7/7f/Command_Halt_Icon.webp',
  Armor_of_Agathys: '/w/images/7/77/Armour_of_Agathys_Icon.webp',
  Titanstring_Bow: '/w/images/4/45/Titanstring_Bow_ingame.png',
  Drakethroat_Glaive: '/w/images/1/15/Glaive_PlusTwo_Icon.png',
  Birthright: '/w/images/1/1b/Birthright_Icon.png',
  Markoheshkir: '/w/images/8/87/Markoheshkir_Icon.png',
  Sussur_Bloom: '/w/images/b/b2/Sussur_Bloom_Item_Icon.png',
  Sharpshooter: '/w/images/e/e2/Sharpshooter_Low_Ground_Icon.webp',
  'Alert_(Feat)': '/w/images/a/a9/Generic_Feature_Icon.webp',
  Phalar_Aluve: '/w/images/d/d9/Phalar_Aluve_Sing_Icon.webp',
};

function thumbToFull(path) {
  const m = path.match(/\/w\/images\/thumb\/([^/]+)\/([^/]+)\/[^/]+\/([^"?]+)/);
  if (m) return `/w/images/${m[1]}/${m[3]}`;
  return path.split('?')[0];
}

async function findIconUrl(wikiTitle) {
  if (DIRECT_ICON[wikiTitle]) {
    return `https://bg3.wiki${DIRECT_ICON[wikiTitle]}`;
  }

  const pageUrl = `https://bg3.wiki/wiki/${encodeURIComponent(wikiTitle)}`;
  const res = await fetch(pageUrl, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${wikiTitle}: HTTP ${res.status}`);
  const html = await res.text();
  const base = wikiTitle.replace(/ /g, '_');

  const candidates = [];
  const patterns = [
    new RegExp(`/w/images/[a-f0-9]/[a-f0-9]{2}/${base}_spell_Icon\\.webp`, 'gi'),
    new RegExp(`/w/images/[a-f0-9]/[a-f0-9]{2}/${base.replace(/Armor/g, 'Armour')}_Icon\\.webp`, 'gi'),
    new RegExp(`/w/images/[a-f0-9]/[a-f0-9]{2}/${base}_Icon\\.webp`, 'gi'),
    new RegExp(`/w/images/[a-f0-9]/[a-f0-9]{2}/${base}_Unfaded_Icon\\.(webp|png)`, 'gi'),
    new RegExp(`/w/images/[a-f0-9]/[a-f0-9]{2}/${base}[^"']*Item_Icon\\.(webp|png)`, 'gi'),
    new RegExp(`/w/images/thumb/[^"']+/${base}[^"']*Icon[^"']*\\.(webp|png)[^"']*`, 'gi'),
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      let path = m[0];
      if (path.startsWith('/w/images/thumb/')) path = thumbToFull(path);
      candidates.push(path.split('?')[0]);
    }
  }

  const unique = [...new Set(candidates)];
  const best =
    unique.find((p) => p.includes('_spell_Icon')) ??
    unique.find((p) => p.includes('_Icon') && !p.includes('Condition')) ??
    unique[0];

  if (!best) throw new Error(`${wikiTitle}: icon URL not found`);
  return `https://bg3.wiki${best}`;
}

function magickConvert(input, output) {
  return new Promise((resolve, reject) => {
    const proc = spawn('magick', [input, '-quality', '90', output], { stdio: 'inherit' });
    proc.on('error', reject);
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`magick exit ${code}`))));
  });
}

async function downloadOne(wikiTitle, relPath) {
  const url = await findIconUrl(wikiTitle);
  const imgRes = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!imgRes.ok) throw new Error(`${wikiTitle}: image HTTP ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const dest = join(outRoot, relPath);
  await mkdir(dirname(dest), { recursive: true });

  const wantsWebp = relPath.endsWith('.webp');
  const sourceIsPng = url.toLowerCase().includes('.png') || buf[0] === 0x89;

  if (wantsWebp && sourceIsPng) {
    const tmp = dest.replace(/\.webp$/, '.tmp.png');
    await writeFile(tmp, buf);
    await magickConvert(tmp, dest);
    await unlink(tmp);
  } else {
    await writeFile(dest, buf);
  }

  console.log(`ok ${relPath} <- ${url}`);
}

await mkdir(join(outRoot, 'fallback'), { recursive: true });
const fallbackUrl = 'https://bg3.wiki/w/images/e/ef/Spell_Slot_Icon.png';
const fb = await fetch(fallbackUrl, { headers: { 'User-Agent': UA } });
await writeFile(join(outRoot, 'fallback/spell.webp'), Buffer.from(await fb.arrayBuffer()));
console.log('ok fallback/spell.webp');

let failed = 0;
for (const [title, path] of downloads) {
  try {
    await downloadOne(title, path);
    await new Promise((r) => setTimeout(r, 350));
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${path}: ${err.message}`);
  }
}

if (failed > 0) process.exitCode = 1;
