import type { CheckSection } from './types';

export const partyOverview: CheckSection = {
  id: 'party-overview',
  title: 'Core Party',
  intro:
    'Single-class, balanced difficulty, no holy magic. Tav holds the shadow + CC line from the back so the frontline can stay reserved for Minthara or a flex pick.',
  items: [
    {
      id: 'party-pc',
      label: 'You — Dark Urge Shadow Sorcerer (Shadow Magic)',
      note: 'Backline. Twinned Hold Person, free Darkness, Hound of Ill Omen, Strength of the Grave keeps you upright.',
      tag: 'lore'
    },
    {
      id: 'party-shadowheart',
      label: 'Shadowheart — Death Domain Cleric of Shar',
      note: 'Necrotic nuker. Reaper cantrips, Inescapable Destruction at L6.',
      tag: 'lore'
    },
    {
      id: 'party-gale',
      label: 'Gale — School of Necromancy Wizard',
      note: 'Undead general. Grim Harvest healing on spell kills, Animate Dead → Danse Macabre.',
      tag: 'lore'
    },
    {
      id: 'party-flex',
      label: "Flex slot — Astarion (Assassin Rogue) OR Lae'zel (Battle Master Fighter)",
      note: 'Vampire-spawn alpha strike vs. necrotic-rider weapons on a Githyanki frontline. Pick whichever fits the moment.',
      tag: 'lore'
    }
  ]
};

export const partyAlternates: CheckSection = {
  id: 'party-alternates',
  title: 'Lore Alternates',
  intro:
    'Three companions who do not slot into the core four but still have a role to play — either as on-theme swaps or as the foils the run needs.',
  items: [
    {
      id: 'alt-minthara',
      label: 'Minthara — canonical Dark Urge ally + the party Oathbreaker',
      note: 'Single-class Oathbreaker Paladin. Tav is a caster now, so Minthara is the run\'s only Aura of Hate carrier — recruit her if you want the frontline. Grove massacre (Act 1) or spare her at Moonrise (Act 2).',
      tag: 'lore'
    },
    {
      id: 'alt-karlach',
      label: 'Karlach — infernal foil to your cold necromancy',
      note: "Bench her or play out the Wyrm's Crossing murder cutscene. The canonical Dark Urge beat is to harvest her heart — keep her or kill her, both are on-theme.",
      tag: 'lore'
    },
    {
      id: 'alt-jaheira',
      label: 'Jaheira — Harper hunting Bhaalspawn',
      note: 'Hostile fit. She joins on a thin alliance against the Absolute and breaks the moment you tip into Slayer or accept Bhaal. Optional Act 2 tension, not Act 3 partner.',
      tag: 'lore'
    }
  ]
};

export const scholarStance: CheckSection = {
  id: 'party-stance',
  title: 'Scholar Stance',
  intro:
    "Treat the run as devotion to Bhaal expressed through shadow and necromancy. Tav's magic is innate — no oath to break, no choice to swear off the light. The Cleric stays Shar-aligned; the Wizard studies.",
  items: [
    {
      id: 'stance-no-holy',
      label: 'No holy magic on the party — skip Cure Wounds, Lesser Restoration, and every radiant smite spell',
      tag: 'lore'
    },
    {
      id: 'stance-potions',
      label: 'Heal with potions, food, Vampiric Touch, and Grim Harvest only',
      tag: 'lore'
    },
    {
      id: 'stance-no-radiant',
      label: 'No Radiating Orb gear stacks — the run is necrotic-only',
      tag: 'lore'
    },
    {
      id: 'stance-accept-bhaal',
      label: 'Accept Bhaal in Act 3 — defeat Orin, choose the Bhaalist path',
      tag: 'lore'
    }
  ]
};
