import type { Build } from '../types';

export const jaheira: Build = {
  id: 'jaheira',
  shortId: 'jaheira',
  name: 'Jaheira',
  className: 'Druid — Circle of Spores (respec)',
  role: 'Hostile foil — temporary spore necromancer',
  focus: ['Necrotic', 'Bludgeoning', 'Summons'],
  summary:
    "High Harper actively hunting Bhaalspawn. If she joins on a thin alliance against the Absolute, respec her at Withers to Circle of Spores — Symbiotic Entity puts +1d6 necrotic on every weapon hit, Halo of Spores adds reaction necrotic to enemies in her aura, and Animate Dead lets her quietly join the necromancy team while she's here. Expect a break the moment you tip into Slayer or accept Bhaal.",
  recruit: 'Act 2 — Last Light Inn',
  loreFit: 'hostile',

  levels: [],
  setup: []
};
