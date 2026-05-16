import type { CheckItem, CheckSection } from './types';

/** Lists shown by the "Don't Leave Act Without" act selector. */
export const dontLeaveByAct: Record<'act1' | 'act2' | 'act3', CheckItem[]> = {
  act1: [
    { id: 'act1-withers', label: 'Recruit Withers at the Dank Crypt', note: 'Open the sarcophagus. He is Jergal, god of the dead.', tag: 'lore' },
    { id: 'act1-staff', label: 'Staff of Cherished Necromancy', note: 'Arcane Tower basement. Necromancy save DC +1.', tag: 'both' },
    { id: 'act1-thay-book', label: 'Necromancy of Thay + Dark Amethyst', note: 'Dank Crypt + Whispering Depths. Read 3x and accept.', tag: 'lore' },
    { id: 'act1-animate-dead-scroll', label: 'Scribe Animate Dead before L5', note: 'Buy scrolls from Lady Esther / Mol / Roah Moonglow.', tag: 'both' },
    { id: 'act1-recruits', label: 'Recruit Astarion, Gale, Shadowheart, Lae’zel, Karlach', note: 'Astarion + Gale are the high lore-fit picks.', tag: 'lore' },
    { id: 'act1-yurgir-prep', label: 'Note: skip killing Yuan-Ti / save Auntie Ethel hag-fight scrolls', note: 'Stockpile necromancy scrolls before Act 2.', tag: 'combat' },
    { id: 'act1-bracers', label: 'Bracers of Defence (Auntie Ethel)', note: 'Underdark teahouse, +2 AC when unarmoured / no shield.', tag: 'combat' },
    { id: 'act1-quickspell', label: 'Quickspell Gloves', note: 'Arcane Tower. Cantrips become bonus actions.', tag: 'both' },
    { id: 'act1-diadem', label: 'Diadem of Arcane Synergy', note: 'Defiled Temple. Arcane Acuity on saves.', tag: 'combat' },
    { id: 'act1-strange-ox', label: 'Name the Strange Ox', note: 'Grove. Lore continuity into Act 3.', tag: 'lore' }
  ],
  act2: [
    { id: 'act2-circle-bones', label: 'Circle of Bones', note: 'Last Light Inn vendor. Necrotic damage rider.', tag: 'both' },
    { id: 'act2-crypt-ring', label: 'Crypt Lord Ring', note: 'Reithwin Mausoleum. Free Create Undead.', tag: 'both' },
    { id: 'act2-spellcrux', label: 'Spellcrux Amulet', note: 'Mind Flayer Colony. Restore one spell slot per long rest.', tag: 'both' },
    { id: 'act2-amulet-lost-voices', label: 'Amulet of Lost Voices', note: 'Free Speak with Dead. Always speak before looting.', tag: 'lore' },
    { id: 'act2-balthazar', label: 'Side with Balthazar in Gauntlet of Shar', note: 'Read his notes on the way out for Thayan lore.', tag: 'lore' },
    { id: 'act2-create-undead', label: 'Pick up / scribe Create Undead', note: 'Ghouls > Mummies > Flesh Golem when you get L7 slot.', tag: 'both' },
    { id: 'act2-zrell-ring', label: 'Z’rell’s Ring (Moonrise)', note: 'On Z’rell. Combat utility for casters.', tag: 'both' },
    { id: 'act2-killers-sweetheart', label: 'Killer’s Sweetheart', note: 'Reithwin / Last Light. Auto-crit after a kill.', tag: 'lore' },
    { id: 'act2-coldbrim', label: 'Coldbrim Hat', note: 'Reithwin Tollhouse. Free Ray of Frost on hit.', tag: 'combat' },
    { id: 'act2-illithid-refuse', label: 'Refuse the half-illithid transformation', note: 'Mind-flayer is a competing immortality path. Reject it.', tag: 'lore' }
  ],
  act3: [
    { id: 'act3-mystic-carrion', label: 'Mystic Carrion questline', note: 'Philgrave’s Mansion. Side with Mystic Carrion or his servant.', tag: 'lore' },
    { id: 'act3-circle-death', label: 'Scribe Circle of Death', note: 'L11 spike. Sorcerous Sundries has the scroll.', tag: 'both' },
    { id: 'act3-danthelons', label: 'Danthelon’s Dancing Axe shop run', note: 'Animate Dead + necromancy scrolls. Easy to miss.', tag: 'both' },
    { id: 'act3-markoheshkir', label: 'Markoheshkir (Sorcerous Sundries vault)', note: 'Pass through the Vault. Top caster staff.', tag: 'combat' },
    { id: 'act3-night-walkers', label: 'Disintegrating Night Walkers', note: 'Sharess’ Caress. Free Misty Step + necrotic immunity.', tag: 'both' },
    { id: 'act3-tharchiate', label: 'Tharchiate Codex (+5 HP permanent)', note: 'Iron Throne / Steel Watch Foundry path.', tag: 'both' },
    { id: 'act3-bone-of-eyes', label: 'Bone of Eyes', note: 'Cazador’s Palace. Pure lore item.', tag: 'lore' },
    { id: 'act3-orphic-hammer', label: 'Refuse Raphael, take the Orphic Hammer', note: 'House of Hope. Mortal magic > infernal contract.', tag: 'lore' },
    { id: 'act3-gale-arc', label: 'Resolve Gale’s arc', note: 'Mystra’s weapon vs ascend-to-god. The necromancer’s mirror.', tag: 'lore' },
    { id: 'act3-cazador-ritual', label: 'Cazador ritual choice', note: 'Side with Astarion as Spawn (lore) or let him ascend (power).', tag: 'lore' }
  ]
};

export const beforeLongRest: CheckSection = {
  id: 'now-before-rest',
  title: 'Before Long Rest',
  items: [
    { id: 'rest-animate-dead', label: 'Recast Animate Dead (24h)' },
    { id: 'rest-speak-dead', label: 'Speak with Dead on fresh corpses (10 min window)' },
    { id: 'rest-scribe', label: 'Scribe any new scrolls (Necromancy = half cost)' },
    { id: 'rest-camp-act1', label: 'Act 1 camp: trigger Astarion bite + Gale weave scenes', tag: 'lore' },
    { id: 'rest-camp-act2', label: 'Act 2 camp: trigger Shadowheart pre-Shar choice + Karlach engine talk', tag: 'lore' },
    { id: 'rest-camp-act3', label: 'Act 3 camp: trigger Cazador, Gale ascension, Wyll patron beats', tag: 'lore' },
    { id: 'rest-shadowheart', label: 'Talk to Shadowheart for Thay book approval (+5)' }
  ]
};

export const afterLevelUp: CheckSection = {
  id: 'now-after-level',
  title: 'After Level Up',
  items: [
    { id: 'levelup-spells', label: 'Pick new spells (2 from the level table)' },
    { id: 'levelup-scribe', label: 'Scribe hoarded scrolls into spellbook' },
    { id: 'levelup-prepared', label: 'Refresh prepared list for tomorrow’s fights' },
    { id: 'levelup-gear', label: 'Audit gear for new slot unlocks' },
    { id: 'levelup-hireling', label: 'Hireling raise: dismiss → recruit cycle for body count', tag: 'lore' }
  ]
};

export const beforeLeaving: CheckSection = {
  id: 'now-before-leaving',
  title: 'Before Leaving Area',
  items: [
    { id: 'leave-loot', label: 'Sweep crates / urns / hidden walls' },
    { id: 'leave-speak-dead', label: 'Speak with Dead on every nameable corpse', tag: 'lore' },
    { id: 'leave-vendors', label: 'Buy out vendor scrolls + necromancy reagents' },
    { id: 'leave-camp-stash', label: 'Send heavies to camp stash' }
  ]
};

export const thayReading: CheckSection = {
  id: 'now-thay-reading',
  title: 'Necromancy of Thay (3 reads)',
  intro: 'Each read takes a long rest. Accept the whispers each time. Pass the final WIS save — reload if you fail.',
  items: [
    { id: 'thay-read-1', label: 'Read 1: Open the book with Dark Amethyst', tag: 'lore' },
    { id: 'thay-read-2', label: 'Read 2: Accept the whispers', tag: 'lore' },
    { id: 'thay-read-3', label: 'Read 3: Pass the final WIS save, gain True Soul-style boon', tag: 'lore' }
  ]
};

export const approvalGates: CheckSection = {
  id: 'now-approval-gates',
  title: 'Approval Gates (watch these)',
  items: [
    { id: 'approval-shart-thay', label: 'Shadowheart +5 for opening the Thay book', tag: 'lore' },
    { id: 'approval-karlach-raise-town', label: 'Karlach −5 for raising corpses in town', tag: 'lore' },
    { id: 'approval-laezel-undead', label: 'Lae’zel −5 for using thralls in dialogue scenes', tag: 'lore' },
    { id: 'approval-wyll-evil', label: 'Wyll −5 for siding with Minthara at the Grove', tag: 'lore' },
    { id: 'approval-astarion-cruel', label: 'Astarion +5 for cruelty + necromancy flavour', tag: 'lore' },
    { id: 'approval-gale-magic', label: 'Gale +5 for arcane-curiosity dialogue choices', tag: 'lore' }
  ]
};
