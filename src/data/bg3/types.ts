export type Tag = 'lore' | 'combat' | 'both';

/** Which class is taken at a given character level. Drives the chip on level cards. */
export type LevelClass = 'cleric' | 'wizard' | 'druid' | 'paladin' | 'fighter' | 'barbarian';

export interface CheckItem {
  /** Stable ID used as data-check-id and for localStorage keying. */
  id: string;
  label: string;
  /** Optional small caption shown under the label. */
  note?: string;
  /** Optional tag pill shown to the right of the label. */
  tag?: Tag;
}

export interface CheckSection {
  /** Stable ID used as data-section-id and as the <details> element id (for hash routing). */
  id: string;
  title: string;
  /** Optional plain-text intro shown above the checklist inside the section. */
  intro?: string;
  items: CheckItem[];
  /** For level sections: which class is taken at this character level. Renders a chip. */
  levelClass?: LevelClass;
  /** Milestone level: gets a halo + emphasis on the level card. */
  milestone?: boolean;
}

/** Triangle of Death — three-column combat reference (pinned, not a checklist). */
export interface TriangleCard {
  id: string;
  title: string;
  intro?: string;
  rows: { stat: string; cantrip: string }[];
}

/** At-a-glance summary block shown in the page header for the active build. */
export interface GlanceCard {
  /** Class split shorthand, e.g. "8 / 2 / 2". */
  split: string;
  /** Class labels, in order. Length must match split segments. */
  classes: string[];
  /** Dominant ability score, e.g. "WIS". */
  dominantStat: string;
  /** Feat picks, each one a short label like "L4 War Caster". */
  feats: string[];
}

export type BuildShortId = 'pc' | 'shart' | 'karlach' | 'laezel' | 'jaheira' | 'minthara';

export type BuildId =
  | 'pc-necromancer'
  | 'shadowheart'
  | 'karlach'
  | 'laezel'
  | 'jaheira'
  | 'minthara';

export type LoreFit = 'high' | 'medium' | 'low' | 'hostile';

export interface Build {
  id: BuildId;
  /** Short id used in hash routing and check-id namespacing (e.g. 'pc', 'shart'). */
  shortId: BuildShortId;
  /** Display name for Coven cards and navigation. */
  name: string;
  /** Alternate label for the build picker pill (PC only). */
  pcLabel?: string;
  /** Class / subclass string, e.g. "Cleric 8 (Death) · Wizard 2 · Druid 2". */
  className: string;
  /** One-word role, e.g. "Battlefield control". */
  role: string;
  /** One-line tagline shown on the Coven build card. */
  summary: string;
  /** Where you recruit this companion (companions only). */
  recruit?: string;
  /** How well this companion fits the Deathreaper run's tone. */
  loreFit?: LoreFit;
  /** Optional at-a-glance card rendered in the page header when this build is active. */
  glance?: GlanceCard;
  /** L1–L12 level-up plan. Empty array = placeholder (content TBD). */
  levels: CheckSection[];
  /** Gear priorities by act. Empty array = placeholder (content TBD). */
  gear: CheckSection[];
  /** Character creation or respec recipe. Empty array = placeholder (content TBD). */
  setup: CheckSection[];
}
