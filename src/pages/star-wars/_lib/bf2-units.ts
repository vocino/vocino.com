/**
 * Star Wars Battlefront II (2017) — every class, hero, and reinforcement with one
 * recommended "best" Star Card loadout each. Local to /star-wars only.
 *
 * Sourcing (see CLAUDE.md → reference links, not committed art):
 * - Roster from the Star Wars Battlefront Wiki (battlefront.fandom.com) unit categories.
 * - Class/hero loadouts from the community "Ultimate Loadout Guide".
 * - Reinforcements have FIXED abilities and equip 3 shared Boost Cards from their
 *   category pool, so loadouts are the category-optimal three:
 *     Enforcer pool:    Survivalist · Enforcer Training · Expert Weapons Handling · Acquisition · Battle Hardened
 *     Aerial pool:      Aerial Training · Survivalist · Evasion · Acquisition · Battle Hardened
 *     Infiltrator pool: Stalker · Desperation · Evasion · Interrogation · Acquisition
 *
 * Card visuals are designed (faction-tinted) — no third-party card art is committed.
 */

/** Last reviewed/updated. */
export const BF2_UPDATED = new Date('2026-06-18');

export type Bf2Allegiance = 'light' | 'dark' | 'neutral';

export type Bf2Group =
  | 'class'
  | 'light-hero'
  | 'dark-hero'
  | 'enforcer'
  | 'aerial'
  | 'infiltrator';

export interface Bf2Unit {
  id: string;
  name: string;
  group: Bf2Group;
  allegiance: Bf2Allegiance;
  /** Short role tag, e.g. "Bruiser". */
  role: string;
  /** Secondary label — weapon (classes) or faction (reinforcements). */
  meta?: string;
  /** The recommended best three Star Cards. */
  cards: [string, string, string];
  /** One-line strategy. */
  note: string;
}

export interface Bf2Section {
  id: string;
  label: string;
  blurb: string;
  units: Bf2Unit[];
}

const classes: Bf2Unit[] = [
  {
    id: 'assault',
    name: 'Assault',
    group: 'class',
    allegiance: 'neutral',
    role: 'All-rounder',
    meta: 'A280',
    cards: ['Bounty Hunter', 'Assault Training', 'Smart Ion Grenade'],
    note: 'Front-line workhorse — the Ion grenade shreds vehicles and turrets while you farm Battle Points.',
  },
  {
    id: 'heavy',
    name: 'Heavy',
    group: 'class',
    allegiance: 'neutral',
    role: 'Anchor',
    meta: 'TL-50',
    cards: ['Detonite Charge', 'Ion Torpedo', 'Bounty Hunter'],
    note: 'Drop the shield on a choke; the torpedo deletes armor and the Sentry holds the line.',
  },
  {
    id: 'officer',
    name: 'Officer',
    group: 'class',
    allegiance: 'neutral',
    role: 'Support',
    meta: 'SE-44C',
    cards: ['Officer’s Presence', 'Recharge Command', 'Bounty Hunter'],
    note: 'Pump out heals and turrets, recharge fast, and bank points toward a hero.',
  },
  {
    id: 'specialist',
    name: 'Specialist',
    group: 'class',
    allegiance: 'neutral',
    role: 'Sniper',
    meta: 'NT-242',
    cards: ['Marksman', 'Survivalist', 'Personal Shield'],
    note: 'Hold an angle, one-shot with the NT-242, then lean on Personal Shield + Survivalist to ride out any return fire.',
  },
];

const lightHeroes: Bf2Unit[] = [
  {
    id: 'luke-skywalker',
    name: 'Luke Skywalker',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Aggressive duelist',
    cards: ['Epicenter', 'Intensify', 'Stronger Push'],
    note: 'Rush a crowd, Repulse for the burst, then Push-dash out before they collapse on you.',
  },
  {
    id: 'han-solo',
    name: 'Han Solo',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Burst blaster',
    cards: ['Heavily Modified Blaster', 'Air Burst', 'Broad Shoulders'],
    note: 'Sharpshooter + Detonite Burst delete priority targets; great Battle-Point value.',
  },
  {
    id: 'leia-organa',
    name: 'Leia Organa',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Ranged support',
    cards: ['Relentless Firing', 'Rebel Heart', 'High Spirit'],
    note: 'Mid-range queen — suppress with the defender pistol and anchor the team behind her shield.',
  },
  {
    id: 'chewbacca',
    name: 'Chewbacca',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Heavy bruiser',
    cards: ['Extended Shock', 'Bonus Health', 'Impervious'],
    note: 'Soak the point; Shock Grenade plus bowcaster slam control any doorway.',
  },
  {
    id: 'lando-calrissian',
    name: 'Lando Calrissian',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Disabler',
    cards: ['Quick Shock', 'Hot and Cold', 'Wide Eyed'],
    note: 'Sharp Shot stuns and Disabler chains the lockdown — pure team utility.',
  },
  {
    id: 'rey',
    name: 'Rey',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Mobile duelist',
    cards: ['Focused Sight', 'Damaging Strike', 'Resilient Dash'],
    note: 'Mind Trick the cluster, Dash-strike the priority, Insight so they can never hide.',
  },
  {
    id: 'finn',
    name: 'Finn',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Frontline support',
    cards: ['No More Running', 'In Charge', 'Raised to Do One Thing'],
    note: 'Big Deal melts up close; Undercover Team heals the whole push.',
  },
  {
    id: 'bb-8',
    name: 'BB-8',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Mobile support',
    cards: ['Self Repairs', 'Whirlwind', 'Spared Batteries'],
    note: 'Roll in, Rolling Charge stuns the group, Shock to peel — slippery and annoying.',
  },
  {
    id: 'yoda',
    name: 'Yoda',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Support skirmisher',
    cards: ['Feel the Force', 'Opposing the Dark Side', 'Agility'],
    note: 'Near-unkillable with Presence up; bounce between fights and keep the team healthy.',
  },
  {
    id: 'obi-wan-kenobi',
    name: 'Obi-Wan Kenobi',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Defensive anchor',
    cards: ['Jedi Resilience', 'Safeguard', 'Perfect Defense'],
    note: 'All-Out Push to tank; Defensive Rush soaks saber and blaster fire on the objective.',
  },
  {
    id: 'anakin-skywalker',
    name: 'Anakin Skywalker',
    group: 'light-hero',
    allegiance: 'light',
    role: 'Snowball duelist',
    cards: ['Raw Strength', 'Massive Strikes', 'All of Them'],
    note: 'Pull Dominance + Retribution snowballs a lobby — dive, heal off Retribution, repeat.',
  },
];

const darkHeroes: Bf2Unit[] = [
  {
    id: 'darth-vader',
    name: 'Darth Vader',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Bruiser',
    cards: ['Furious Resilience', 'Bonus Health', 'Punishing Grip'],
    note: 'Tank in, Choke the priority target, Focused Rage to clear the rest.',
  },
  {
    id: 'emperor-palpatine',
    name: 'Emperor Palpatine',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Zone control',
    cards: ['In Full Control', 'Show No Mercy', 'Lightning Reach'],
    note: 'Chain Lightning the crowd from the mid-line; Dash out when they push you.',
  },
  {
    id: 'boba-fett',
    name: 'Boba Fett',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Aerial harasser',
    cards: ['Acute Concussion', 'Focalize', 'Born to Fly'],
    note: 'Live in the air — rockets and concussion from above, never on the ground to be dueled.',
  },
  {
    id: 'bossk',
    name: 'Bossk',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Trapper',
    cards: ['Trap Arming Speed', 'Name Your Poison', 'Multi-traps'],
    note: 'Predator vision + Dioxis traps lock a room down — a brutal objective holder.',
  },
  {
    id: 'iden-versio',
    name: 'Iden Versio',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Ranged support',
    cards: ['Cooled Blaster', 'Alternative Methods', 'Droid Batteries'],
    note: 'Droid Stun plus relentless blaster pressure — the best blaster hero at range.',
  },
  {
    id: 'kylo-ren',
    name: 'Kylo Ren',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Aggressive duelist',
    cards: ['Power Reach', 'Bloodlust', 'Power of Darkness'],
    note: 'Freeze, Frenzy, and Pull to close gaps — heal off the kills and keep diving.',
  },
  {
    id: 'captain-phasma',
    name: 'Captain Phasma',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Zone control',
    cards: ['Safety First', 'Not Hard Enough', 'Laser Wall Durability'],
    note: 'Staff control plus the Sentry droid and wall to seal off a lane on defense.',
  },
  {
    id: 'bb-9e',
    name: 'BB-9E',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Disruptor',
    cards: ['Full Reconstruction', 'Linked Systems', 'Faster, Faster!'],
    note: 'Shock + Distraction to peel for the dark squad — pure annoyance support.',
  },
  {
    id: 'darth-maul',
    name: 'Darth Maul',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Assassin',
    cards: ['Flow Motion', 'Ranged Throw', 'Accelerated Throw'],
    note: 'Spin Choke into a group, Saber Throw to start or finish the chase.',
  },
  {
    id: 'count-dooku',
    name: 'Count Dooku',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Duelist',
    cards: ['Sith Control', 'Balanced Duelist', 'Masterful Duelist'],
    note: 'Out-duel saber users; Lightning Stun the runners and punish every whiff.',
  },
  {
    id: 'general-grievous',
    name: 'General Grievous',
    group: 'dark-hero',
    allegiance: 'dark',
    role: 'Pressure bruiser',
    cards: ['Line Up, Weaklings', 'Flesh is Weak', 'Beating Heart'],
    note: 'Thrust Surge in, Unrelenting Advance to grind a group down — relentless tempo.',
  },
];

const enforcers: Bf2Unit[] = [
  {
    id: 'clone-commando',
    name: 'Clone Commando',
    group: 'enforcer',
    allegiance: 'light',
    role: 'All-rounder',
    meta: 'Galactic Republic',
    cards: ['Survivalist', 'Enforcer Training', 'Expert Weapons Handling'],
    note: 'The most well-rounded enforcer — grenades, a sustained DC-15, and great durability.',
  },
  {
    id: 'wookiee-warrior',
    name: 'Wookiee Warrior',
    group: 'enforcer',
    allegiance: 'light',
    role: 'Bruiser',
    meta: 'Rebel Alliance',
    cards: ['Survivalist', 'Enforcer Training', 'Expert Weapons Handling'],
    note: 'Bowcaster + Overload up close; tank the objective and clear stacked enemies.',
  },
  {
    id: 'ovissian-gunner',
    name: 'Ovissian Gunner',
    group: 'enforcer',
    allegiance: 'light',
    role: 'Gunner',
    meta: 'Resistance',
    cards: ['Survivalist', 'Enforcer Training', 'Expert Weapons Handling'],
    note: 'Heavy repeater holds lanes; lean on Survivalist to stay in the fight.',
  },
  {
    id: 'b2-super-battle-droid',
    name: 'B2 Super Battle Droid',
    group: 'enforcer',
    allegiance: 'dark',
    role: 'Tank',
    meta: 'Separatist Alliance',
    cards: ['Survivalist', 'Enforcer Training', 'Expert Weapons Handling'],
    note: 'A walking wall — Slam + wrist blasters wreck the scrum; Training keeps you standing.',
  },
  {
    id: 'droideka',
    name: 'Droideka',
    group: 'enforcer',
    allegiance: 'dark',
    role: 'Shredder',
    meta: 'Separatist Alliance',
    cards: ['Survivalist', 'Expert Weapons Handling', 'Enforcer Training'],
    note: 'Roll in, shield up, shred a choke — Expert Weapons Handling tames the overheat.',
  },
  {
    id: 'death-trooper',
    name: 'Death Trooper',
    group: 'enforcer',
    allegiance: 'dark',
    role: 'Elite',
    meta: 'Galactic Empire',
    cards: ['Survivalist', 'Enforcer Training', 'Expert Weapons Handling'],
    note: 'Best all-round enforcer kit — smart rockets, the DLT-19, and elite durability.',
  },
  {
    id: 'first-order-flametrooper',
    name: 'First Order Flametrooper',
    group: 'enforcer',
    allegiance: 'dark',
    role: 'Brawler',
    meta: 'First Order',
    cards: ['Survivalist', 'Enforcer Training', 'Battle Hardened'],
    note: 'Pure close-range terror — Battle Hardened covers the dive onto the point.',
  },
];

const aerials: Bf2Unit[] = [
  {
    id: 'jet-trooper',
    name: 'Jet Trooper',
    group: 'aerial',
    allegiance: 'light',
    role: 'Sky skirmisher',
    meta: 'Galactic Republic',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Rocket barrage then reposition; Aerial Training keeps you airborne and oppressive.',
  },
  {
    id: 'rebel-rocket-jumper',
    name: 'Rebel Rocket-Jumper',
    group: 'aerial',
    allegiance: 'light',
    role: 'Sky skirmisher',
    meta: 'Rebel Alliance',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Hit-and-run from rooftops; stay mobile and pick stragglers off the edges.',
  },
  {
    id: 'resistance-rocket-jumper',
    name: 'Resistance Rocket-Jumper',
    group: 'aerial',
    allegiance: 'light',
    role: 'Sky skirmisher',
    meta: 'Resistance',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Same playbook — fuel uptime plus a dodge to harass and vanish.',
  },
  {
    id: 'b2-rp-rocket-droid',
    name: 'B2-RP Rocket Droid',
    group: 'aerial',
    allegiance: 'dark',
    role: 'Sky harasser',
    meta: 'Separatist Alliance',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Aggressive aerial brawler; dive, rocket, then Evasion-roll out of trouble.',
  },
  {
    id: 'imperial-rocket-trooper',
    name: 'Imperial Rocket Trooper',
    group: 'aerial',
    allegiance: 'dark',
    role: 'Sky skirmisher',
    meta: 'Galactic Empire',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Rooftop control with rockets; survive the landing with Survivalist.',
  },
  {
    id: 'first-order-jet-trooper',
    name: 'First Order Jet Trooper',
    group: 'aerial',
    allegiance: 'dark',
    role: 'Sky skirmisher',
    meta: 'First Order',
    cards: ['Aerial Training', 'Survivalist', 'Evasion'],
    note: 'Fast vertical pressure; keep moving and let the team push in under you.',
  },
];

const infiltrators: Bf2Unit[] = [
  {
    id: 'arc-trooper',
    name: 'ARC Trooper',
    group: 'infiltrator',
    allegiance: 'light',
    role: 'Flanker',
    meta: 'Galactic Republic',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Shock + a fast DC-17 burst; flank, clean up, and Stalker back to health.',
  },
  {
    id: 'ewok-hunter',
    name: 'Ewok Hunter',
    group: 'infiltrator',
    allegiance: 'light',
    role: 'Hunter',
    meta: 'Rebel Alliance',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Spear and traps hunt isolated targets; lethal in tight maps and Ewok Hunt.',
  },
  {
    id: 'caphex-spy',
    name: 'Caphex Spy',
    group: 'infiltrator',
    allegiance: 'light',
    role: 'Assassin',
    meta: 'Resistance',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Cloak in, burst a backliner, Evasion out — pure pick potential.',
  },
  {
    id: 'commando-droid',
    name: 'Commando Droid',
    group: 'infiltrator',
    allegiance: 'dark',
    role: 'Assassin',
    meta: 'Separatist Alliance',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Twin pistols plus shock — the fastest flank-assassin in the game.',
  },
  {
    id: 'isb-agent',
    name: 'ISB Agent',
    group: 'infiltrator',
    allegiance: 'dark',
    role: 'Hunter',
    meta: 'Galactic Empire',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Reveal + burst pistols; pick off stragglers and snowball with Desperation.',
  },
  {
    id: 'sith-trooper',
    name: 'Sith Trooper',
    group: 'infiltrator',
    allegiance: 'dark',
    role: 'Flanker',
    meta: 'First Order',
    cards: ['Stalker', 'Desperation', 'Evasion'],
    note: 'Aggressive backline pressure; dive, burst, and Stalker to reset.',
  },
];

export const bf2Sections: Bf2Section[] = [
  {
    id: 'classes',
    label: 'Trooper Classes',
    blurb: 'The four troopers you respawn as. Weapon + the three Star Cards I run on each.',
    units: classes,
  },
  {
    id: 'light',
    label: 'Light Side Heroes',
    blurb: 'Every Light Side hero with the ability Star Cards that get the most out of them.',
    units: lightHeroes,
  },
  {
    id: 'dark',
    label: 'Dark Side Villains',
    blurb: 'Every Dark Side villain and the loadout I trust to carry a round.',
    units: darkHeroes,
  },
  {
    id: 'enforcers',
    label: 'Reinforcements · Enforcers',
    blurb: 'Heavy special units. All share the Enforcer Boost Card pool — these are the three I lock in.',
    units: enforcers,
  },
  {
    id: 'aerials',
    label: 'Reinforcements · Aerials',
    blurb: 'Jetpack units. Fuel uptime, sustain, and a dodge is the universally best Aerial set.',
    units: aerials,
  },
  {
    id: 'infiltrators',
    label: 'Reinforcements · Infiltrators',
    blurb: 'Flank-and-pick units. Stalker, Desperation, and Evasion make every Infiltrator slippery.',
    units: infiltrators,
  },
];

export const BF2_UNIT_COUNT = bf2Sections.reduce((n, s) => n + s.units.length, 0);
