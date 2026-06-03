export type CdCharacterId = 'kliff' | 'damiane' | 'oongka';

export type CdCharacterStatus = 'live' | 'soon';

export interface CdCharacter {
  id: CdCharacterId;
  label: string;
  status: CdCharacterStatus;
  tagline?: string;
}

export const cdCharacters: CdCharacter[] = [
  {
    id: 'kliff',
    label: 'Kliff',
    status: 'live',
    tagline: 'Sword and shield — my Hernand default',
  },
  {
    id: 'damiane',
    label: 'Damiane',
    status: 'soon',
    tagline: 'Not written yet',
  },
  {
    id: 'oongka',
    label: 'Oongka',
    status: 'soon',
    tagline: 'Not written yet',
  },
];

export function getCdCharacter(id: string): CdCharacter | undefined {
  return cdCharacters.find((c) => c.id === id);
}

export const DEFAULT_CHARACTER_ID: CdCharacterId = 'kliff';
