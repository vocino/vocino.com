import type { Build } from '../types';

export const astarion: Build = {
  id: 'astarion',
  shortId: 'astarion',
  name: 'Astarion',
  className: 'Rogue — Assassin (respec)',
  role: 'Flex DPS — Bhaal-aligned alpha strike',
  focus: ['Piercing', 'Stealth'],
  summary:
    "Respec Thief → Assassin at Withers. Assassinate auto-crits surprised enemies on round one, which stacks with the Bhaalist Armour aura (doubled piercing inside 2 m) to delete priority targets turn one. Vampire-spawn flavour keeps the party fully necrotic-adjacent — undead PC, undead companion, no holy magic in sight.",
  recruit: 'Act 1 — roadside near the pod',
  loreFit: 'medium',

  levels: [],
  setup: []
};
