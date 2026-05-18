export type Tag = 'lore' | 'combat' | 'both';

/** Which class is taken at a given character level. Drives the chip on level cards. */
export type LevelClass = 'paladin' | 'cleric' | 'wizard' | 'fighter' | 'rogue' | 'barbarian' | 'druid';

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

export type BuildShortId =
  | 'pc'
  | 'shart'
  | 'gale'
  | 'astarion'
  | 'laezel'
  | 'minthara'
  | 'karlach'
  | 'jaheira';

export type BuildId =
  | 'pc-oathbreaker'
  | 'shadowheart'
  | 'gale'
  | 'astarion'
  | 'laezel'
  | 'minthara'
  | 'karlach'
  | 'jaheira';

export type LoreFit = 'high' | 'medium' | 'low' | 'hostile';

export interface Build {
  id: BuildId;
  /** Short id used in hash routing and check-id namespacing (e.g. 'pc', 'shart'). */
  shortId: BuildShortId;
  /** Display name for Party cards and navigation. */
  name: string;
  /** Class / subclass string, e.g. "Paladin — Oathbreaker". */
  className: string;
  /** One-word role, e.g. "Frontline necrotic smiter". */
  role: string;
  /** One-line tagline shown on the Party build card. */
  summary: string;
  /** Where you recruit this companion (companions only). */
  recruit?: string;
  /** How well this companion fits the Dark Urge necrotic run's tone. */
  loreFit?: LoreFit;
  /** L1–L12 level-up plan. Empty array = flex / alternate (no detailed plan). */
  levels: CheckSection[];
  /** Character creation or respec recipe. Empty array = flex / alternate. */
  setup: CheckSection[];
}
