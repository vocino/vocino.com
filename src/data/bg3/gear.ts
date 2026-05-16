import type { CheckSection } from './types';

export const gearByAct: CheckSection[] = [
  {
    id: 'gear-act1',
    title: 'Act 1',
    items: [
      { id: 'gear-staff-cherished', label: 'Staff of Cherished Necromancy', note: 'Arcane Tower basement. +1 DC on necromancy spells.', tag: 'both' },
      { id: 'gear-thay-book', label: 'Necromancy of Thay + Dark Amethyst', note: 'Dank Crypt + Whispering Depths.', tag: 'lore' },
      { id: 'gear-diadem', label: 'Diadem of Arcane Synergy', note: 'Defiled Temple (Goblin Camp). Arcane Acuity on hostile save fail.', tag: 'combat' },
      { id: 'gear-birthright', label: 'Birthright (helm)', note: 'Rosymorn Monastery / Mountain Pass. +2 CHA.', tag: 'combat' },
      { id: 'gear-quickspell', label: 'Quickspell Gloves', note: 'Arcane Tower. Cantrips cost a bonus action.', tag: 'both' },
      { id: 'gear-bracers-defence', label: 'Bracers of Defence', note: 'Auntie Ethel teahouse / Underdark. +2 AC unarmoured + no shield.', tag: 'combat' },
      { id: 'gear-robe-summer', label: 'Robe of Summer', note: 'Rosymorn Monastery. Cold resistance for Act 2.', tag: 'both' },
      { id: 'gear-phalar-aluve', label: 'Phalar Aluve (give to Shadowheart)', note: 'Selunite Outpost. Sing buff for caster save DC.', tag: 'combat' }
    ]
  },
  {
    id: 'gear-act2',
    title: 'Act 2',
    items: [
      { id: 'gear-circle-bones', label: 'Circle of Bones', note: 'Quartermaster Talli, Last Light Inn. Necrotic damage rider.', tag: 'both' },
      { id: 'gear-crypt-lord-ring', label: 'Crypt Lord Ring', note: 'Reithwin Mausoleum (Thisobald Thorm area). Free Create Undead.', tag: 'both' },
      { id: 'gear-spellcrux', label: 'Spellcrux Amulet', note: 'Mind Flayer Colony. Restore one slot per long rest.', tag: 'both' },
      { id: 'gear-amulet-lost-voices', label: 'Amulet of Lost Voices', note: 'Owlbear / Defiled Temple chest. Free Speak with Dead.', tag: 'lore' },
      { id: 'gear-coldbrim', label: 'Coldbrim Hat', note: 'Reithwin Tollhouse. Ray of Frost rider on hit.', tag: 'combat' },
      { id: 'gear-boots-stormy', label: 'Boots of Stormy Clamour', note: 'Last Light vendor. Reverberation on condition.', tag: 'combat' },
      { id: 'gear-killers-sweetheart', label: 'Killer’s Sweetheart', note: 'Reithwin (Thisobald area). Auto-crit after a kill.', tag: 'lore' },
      { id: 'gear-zrell-ring', label: 'Z’rell’s Ring', note: 'Loot Z’rell at Moonrise.', tag: 'both' },
      { id: 'gear-sentient-amulet', label: 'Sentient Amulet', note: 'House of Healing mortuary. Talks. Roleplay it.', tag: 'lore' },
      { id: 'gear-balthazar-notes', label: 'Balthazar’s gear + notes', note: 'Moonrise upper floor. Direct Thayan necromancer source material.', tag: 'lore' }
    ]
  },
  {
    id: 'gear-act3',
    title: 'Act 3',
    items: [
      { id: 'gear-markoheshkir', label: 'Markoheshkir', note: 'Sorcerous Sundries vault. Best caster staff in the game.', tag: 'combat' },
      { id: 'gear-robe-weave', label: 'Robe of the Weave', note: 'Sorcerous Sundries vault. +1 spell DC, +1 attack, AC bonus.', tag: 'combat' },
      { id: 'gear-bone-of-eyes', label: 'Bone of Eyes', note: 'Cazador’s Palace ritual area. Pure lore item.', tag: 'lore' },
      { id: 'gear-night-walkers', label: 'Disintegrating Night Walkers', note: 'Sharess’ Caress dresser. Free Misty Step + necrotic immunity.', tag: 'both' },
      { id: 'gear-tharchiate-codex', label: 'Tharchiate Codex', note: 'Iron Throne / Steel Watch path. +5 HP permanent on read.', tag: 'both' },
      { id: 'gear-ring-necrotic', label: 'Ring of Necrotic Resistance', note: 'On-theme defence layer.', tag: 'lore' },
      { id: 'gear-yurgir-ring', label: 'Yurgir’s Ring (if recruited Yurgir)', note: 'Act 2 carryover loot.', tag: 'both' },
      { id: 'gear-cerebral-crown', label: 'Crown of Karsus (Astral-Touched Tiara)', note: 'Iron Throne path / Emperor’s vault. Lore-loaded.', tag: 'lore' },
      { id: 'gear-danthelons', label: 'Danthelon’s Dancing Axe (vendor)', note: 'Rivington. Animate Dead + necromancy scroll stockpile.', tag: 'both' },
      { id: 'gear-staff-spellpower', label: 'Staff of Spellpower (alternative)', note: 'Lorroakan / Ramazith’s Tower. +1 DC if you skip Markoheshkir.', tag: 'combat' }
    ]
  }
];
