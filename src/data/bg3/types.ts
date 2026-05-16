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
