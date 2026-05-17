export type Tag = 'lore' | 'combat' | 'both';

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
  /** Class / subclass string, e.g. "Wizard — Necromancy". */
  className: string;
  /** One-word role, e.g. "Battlefield control". */
  role: string;
  /** One-line tagline shown on the Coven build card. */
  summary: string;
  /** Where you recruit this companion (companions only). */
  recruit?: string;
  /** How well this companion fits the necromancy run's tone. */
  loreFit?: LoreFit;
  /** L1–L12 level-up plan. Empty array = placeholder (content TBD). */
  levels: CheckSection[];
  /** Gear priorities by act. Empty array = placeholder (content TBD). */
  gear: CheckSection[];
  /** Character creation or respec recipe. Empty array = placeholder (content TBD). */
  setup: CheckSection[];
}
