import type { CheckSection } from './types';

export type LoreFit = 'high' | 'medium' | 'low' | 'hostile';

export interface Companion {
  /** Used as the <details> id (e.g. coven-astarion). */
  id: string;
  name: string;
  recruit: string;
  loreFit: LoreFit;
  /** Short bullet lines shown in the section body. */
  notes: string[];
}

export const companions: Companion[] = [
  {
    id: 'coven-astarion',
    name: 'Astarion',
    recruit: 'Act 1 — crash beach',
    loreFit: 'high',
    notes: [
      'Vampire spawn. Closest thing to undeath in the party. Top lore fit.',
      'Approves of cruelty + necromancy flavour dialogue.',
      'Combat: respec to Gloomstalker / Assassin or keep Thief Rogue.',
      'Endgame: Spawn (lore choice) vs Ascended (power choice).'
    ]
  },
  {
    id: 'coven-gale',
    name: 'Gale',
    recruit: 'Act 1 — waypoint near roadside ruins',
    loreFit: 'high',
    notes: [
      'Wizard kinship. Scribes alongside you, shares spellbook economy.',
      'His Mystra/Karsus arc is the necromancer’s mirror question.',
      'Combat: pure Evocation or stay vanilla; works as backup caster.',
      'Endgame: Mystra’s weapon (lore-on-theme) vs ascend-to-god.'
    ]
  },
  {
    id: 'coven-shadowheart',
    name: 'Shadowheart',
    recruit: 'Act 1 — nautiloid pod / beach',
    loreFit: 'high',
    notes: [
      'Trickery Cleric of Shar. Bring for Shar temple + Gauntlet of Shar.',
      'Respec to Death Cleric (perfect on-theme).',
      '+5 approval for opening the Thay book — free lore alignment.',
      'Endgame: stay Dark Justiciar (evil) or turn to Selune (good).'
    ]
  },
  {
    id: 'coven-wyll',
    name: 'Wyll',
    recruit: 'Act 1 — Druid Grove',
    loreFit: 'medium',
    notes: [
      'Warlock of Mizora. Corruption arc parallels yours.',
      'Combat: respec to Pact of the Blade or Sorlock; underwhelming as default.',
      'Endgame: free the soul (lore-on-theme refusal of devil power) vs keep the pact.'
    ]
  },
  {
    id: 'coven-laezel',
    name: 'Lae’zel',
    recruit: 'Act 1 — tieflings + cage',
    loreFit: 'low',
    notes: [
      'Battle Master Fighter. Frontline tank for raising-window safety.',
      'Mind-flayer fixated — disapproves of slow / lore choices.',
      'Endgame: free Orpheus is the dramatic lore arc.'
    ]
  },
  {
    id: 'coven-karlach',
    name: 'Karlach',
    recruit: 'Act 1 — Risen Road',
    loreFit: 'low',
    notes: [
      'Berserker Barbarian. Damage + body courier for corpses.',
      'Disapproves of raising in town — mute her for ritual scenes.',
      'Endgame: ascend with Wyll, mind-flayer, or die. Sad either way.'
    ]
  },
  {
    id: 'coven-minthara',
    name: 'Minthara',
    recruit: 'Act 1 (Grove side) or Act 2 (Moonrise rescue)',
    loreFit: 'high',
    notes: [
      'Oathbreaker Paladin. The "fallen matriarch" slot.',
      'Take Moonrise rescue route to avoid Grove genocide if you want the soft-evil run.',
      'Approves of Absolute / Bhaal-coded ruthlessness.'
    ]
  },
  {
    id: 'coven-jaheira',
    name: 'Jaheira',
    recruit: 'Act 2 — Last Light Inn',
    loreFit: 'hostile',
    notes: [
      'Harper. Will call you out for necromancy — RP the tension, don’t avoid it.',
      'Circle of Spores respec gives fungal-decay synergy if you want her in.',
      'Brings the Harper finale + Minsc unlock.'
    ]
  },
  {
    id: 'coven-minsc',
    name: 'Minsc',
    recruit: 'Act 3 — sewers (via Jaheira)',
    loreFit: 'hostile',
    notes: [
      'Berserker Barbarian. Boo aside, hostile to necromancy in dialogue.',
      'Bench for ritual scenes; pull out for the final fight.'
    ]
  },
  {
    id: 'coven-withers',
    name: 'Withers',
    recruit: 'Act 1 — Dank Crypt sarcophagus',
    loreFit: 'high',
    notes: [
      'Not a party member — lives in camp. Jergal, god of the dead, in disguise.',
      'Unlocks hirelings: dismiss + recruit cycle = unlimited bodies.',
      'Respec service (100 gold). Use for late-game arrays.',
      'Talk to him every act for lore breadcrumbs.'
    ]
  }
];

export const loreRules: CheckSection = {
  id: 'coven-lore-rules',
  title: 'Lore Rules',
  intro: 'Stances for your run. These aren’t completionist — they’re the spine.',
  items: [
    { id: 'lore-speak-dead-always', label: 'Speak with Dead before every loot in a crypt or tomb' },
    { id: 'lore-recruit-withers', label: 'Recruit Withers at the Dank Crypt' },
    { id: 'lore-thay-read', label: 'Read Necromancy of Thay 3x and accept whispers' },
    { id: 'lore-thay-framing', label: 'Frame yourself as Thay / Szass Tam-adjacent (Tav lacks Dark Urge / Bhaal overlap)' },
    { id: 'lore-name-thralls', label: 'Name your thralls; name the Danse Macabre permanent ghoul' },
    { id: 'lore-savant-scribe', label: 'Use Necromancy Savant to scribe necromancy scrolls at half cost' },
    { id: 'lore-hireling-raise', label: 'Hireling raise: dismiss → recruit at the Tent for body count' },
    { id: 'lore-balthazar', label: 'Side with Balthazar in the Gauntlet of Shar and read his notes' },
    { id: 'lore-mystic-carrion', label: 'Complete Mystic Carrion quest — betray Mystic Carrion or his servant, take a side' },
    { id: 'lore-refuse-illithid', label: 'Refuse half-illithid transformation — undeath is your immortality, not mind-flayer' },
    { id: 'lore-gale-mirror', label: 'Resolve Gale’s arc as Mystra’s weapon (not ascend) — your mirror question' },
    { id: 'lore-orphic-hammer', label: 'Refuse Raphael at the House of Hope; take the Orphic Hammer' },
    { id: 'lore-name-ox', label: 'Name the Strange Ox in Act 1; greet it again in Act 3' }
  ]
};
