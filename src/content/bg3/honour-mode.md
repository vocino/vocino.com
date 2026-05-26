---
title: Honour Mode — Bardadin run guide
description: A progression-first Honour Mode playbook for a Half-Orc Smite Swords Bard lead (6/4/2), dark-synergy party, missable items, and the fights worth skipping.
updated: 2026-05-25
iconGeneration: 4
---

I wrote this for the Honour run I am on right now: Half-Orc **Smite Swords Bard** lead (6 College of Swords / 4 Sorcerer / 2 Paladin), a mean little party that actually likes each other in combat, and a bias toward skipping fights that can delete a 40-hour save. Keep it open on your phone or a second screen and follow the sections in order. Hit **Mark done** on a checkpoint when you finish that beat so you are not scrolling around trying to remember where you left off.

**Balanced** here means the strong stuff people already document (Grym setups, stealth openers, Gale's orb ending) without making bug abuse the default line. When something is optional cheese, I say so up front.

## How to use this guide

<div class="bg3-step" id="how-to-use-this-guide">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Step 0</p>
<p class="bg3-step__title">Read this once, then play in order</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-0-intro" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Skim the legend below. Use the jump menu at the top on mobile. Each section has a short "do this now" block first; details are underneath.</p>
</div>
</div>

- **Icons:** [[bg3:hold-person]] means the spell or item name matches the game UI (icons from [bg3.wiki](https://bg3.wiki/)).
- **Your build:** 6 College of Swords Bard / 4 Sorcerer / 2 Paladin. Control with Command and Hold, then smite + Slashing Flourish on paralyzed targets.
- **Critical path** = do this on your first Honour clear.
- **Optional** = stronger or safer, but not required.
- **Skip default** = I recommend avoiding the fight on a first run.
- **Undead:** Enchantment holds ([[bg3:hold-person]], [[bg3:hold-monster]], [[bg3:hypnotic-pattern]]) do not work on undead. Plan [[bg3:command]], raw damage, or party tools for those fights.

## Character creation

<div class="bg3-step" id="character-creation">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Character creation</p>
<p class="bg3-step__title">Half-Orc Bardadin (you)</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-char-create" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Pick Half-Orc, class <strong>Bard</strong>, and the stat line below. Stay pure Bard through level 6, then respec at Withers and finish the 6 / 4 / 2 split from level 7 onward.</p>
</div>
</div>

### Origin and fantasy

Any origin works mechanically. I like **Dark Urge** or a custom Half-Orc for the ruthless party tone — the crit passive is excellent on a build that lives on paralyzed targets. Your companions carry the stealth burst and the unkillable tank; you hold the line on social checks and battlefield control.

### Ability scores (level 1)

You want **high Dexterity** for weapon attacks and **high Charisma** for spell DC, smites, and dialogue.

| Stat | Value | Why |
| --- | --- | --- |
| STR | 8 | Not your job |
| DEX | **17** | Attack rolls, AC, initiative |
| CON | 14 | Honour Mode punishes squishy leads |
| INT | 8–10 | Party / scrolls cover knowledge |
| WIS | 10 | Saves |
| CHA | **16** | Hold DC, smite damage, face checks |

**Hag's Hair:** +1 **DEX** (18 DEX before gear).

**Late game:** Mirror of Loss **+2 DEX**, then [[bg3:birthright]] in Act 3 — you are aiming for **22 DEX** and enough CHA to land holds on bosses.

### Class path

**Start as Bard on the Nautiloid.** Every Smite Swords Bard guide levels Bard first — you need College of Swords at character level 3, Extra Attack at 6, and the best dialogue options before you touch multiclass. You do not start Paladin or Sorcerer at level 1.

**End state at character level 12:** 6 College of Swords Bard / 4 Sorcerer (Draconic White or Shadow) / 2 Paladin.

| Class | Why |
| --- | --- |
| **6 Bard (Swords)** | Full caster slot progression with the Paladin dip, Extra Attack, Slashing Flourish cleave, best dialogue |
| **4 Sorcerer** | Metamagic (Quickened / Extended / Twinned), [[bg3:shield]], [[bg3:shadow-blade]], [[bg3:booming-blade]] |
| **2 Paladin** | [[bg3:divine-smite]], [[bg3:command]], Crown accuracy |

At **level 3 Bard** take **College of Swords** and fighting style **Two-Weapon Fighting** — dual hand crossbows in early Act 1; later your bonus action is usually a control spell, not an off-hand swing.

**Level order after Bard 6:** take **Paladin 2** (levels 7–8) for smites and heavy armor, then **Sorcerer 4** (levels 9–12). You only cap at six Bard levels in this split, so you never reach Bard 10 — no Magical Secrets. Learn [[bg3:counterspell]] from a scroll in Act 3 instead.

**Paladin oath:** **Oath of the Crown** — Righteous Clarity is how you keep smites landing in Honour. Vengeance works if you prefer the fantasy; Crown is the pick for this route.

Respec cleanly at Withers (see Early Act 1). Do not take **Dual Wielder** on a piercing-vulnerability route; it trades damage for +1 AC.

**Feats (level order):**

| Character level | Feat |
| --- | --- |
| 4 | **+2 DEX** (pure Bard) |
| 8 | **[[bg3:savage-attacker]]** (2 Pal / 6 Bard — smites online) |
| 12 | **+2 CHA** |

If initiative keeps killing you before you cast Hold, take **[[bg3:alert]]** at level 4 instead of the DEX ASI — you trade damage for turn order.

**Spells to prioritize:** [[bg3:hold-person]], [[bg3:healing-word]], [[bg3:hold-monster]] when you have the slot. After the Paladin dip: [[bg3:command]] (especially **Approach**). After Sorcerer levels: [[bg3:shield]], [[bg3:shadow-blade]], [[bg3:booming-blade]]. Buy **[[bg3:command]]** and **[[bg3:counterspell]]** scrolls until those spells are on your bar — you will not get Counterspell from class levels on this split.

### Dark-synergy party (recruit order)

| Slot | Character | Role |
| --- | --- | --- |
| You | Half-Orc Bardadin | Command/Hold control, smite + Slashing Flourish |
| 2 | Astarion | Stealth opener, single-target delete |
| 3 | Shadowheart *or* Gale | Abjuration tank, heals, [[bg3:magic-missile]] + Radiant Orb engine |
| 4 | Karlach | Stunning Strike, flurry cleanup, fire damage |

Shadowheart fits the dark theme; Gale is stronger if you want the Netherese orb ending and more arcane tools. Pick one and commit for the whole run.

<div class="bg3-step__pager"><a href="#nautiloid-to-grove">Next: Nautiloid → Grove →</a></div>

## Nautiloid to Grove

<div class="bg3-step" id="nautiloid-to-grove">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 1 · onboarding</p>
<p class="bg3-step__title">Beach, companions, first loot</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-nautiloid" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Recruit your core three companions. Do not rush straight to every fight. Keep Rolan alive in the Grove.</p>
</div>
<div class="bg3-step__warn"><strong>Missable:</strong> If Rolan leaves the Grove, Mattis and key Last Light vendors in Act 2 disappear. Side with the tieflings or otherwise keep Rolan in camp.</div>
</div>

- On the beach, grab **Astarion** and **Shadowheart** (or Gale) before heavy exploration.
- In the Grove, talk to **Karlach** after the gate drama; do not skip her.
- Sell junk, buy **[[bg3:misty-step]]**, **[[bg3:hold-person]]**, and **[[bg3:command]]** scrolls when vendors stock them.
- Optional: pick up **Guidance** amulet and Thief gloves later for mirror checks (see Act 1 gear).

## Early Act 1 route

<div class="bg3-step" id="early-act-1-route">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 1 · early</p>
<p class="bg3-step__title">Withers, roles, first respec</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-early-act1" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Reach the Underdark or Grymforge path, unlock Withers, respec everyone to the planned builds (see level table below), assign party roles.</p>
</div>
<div class="bg3-step__warn"><strong>Missable:</strong> Free Barcus at the windmill within about one long rest or he dies and locks quests + his Act 2 shop.</div>
</div>

### Unlock Withers and respec

After the grove crisis, get to **Withers** in the Dank Crypt (or via Underdark route). **Respec** the party here.

**You — level order (2 Pal / 6 Bard / 4 Sorc by character level 12):**

| Level | Class levels | Notes |
| --- | --- | --- |
| 1–2 | Bard | Created as Bard on the Nautiloid |
| 3 | Bard 3 | **College of Swords**, Two-Weapon Fighting |
| 4 | Bard 4 | **+2 DEX** (or [[bg3:alert]] if you chose that trade) |
| 5 | Bard 5 | Level 3 spells online |
| 6 | Bard 6 | **Extra Attack** |
| 7 | Respec → 1 Paladin / 6 Bard | At Withers — heavy armor, path to smites |
| 8 | 2 Paladin / 6 Bard | **[[bg3:divine-smite]]**, Defense fighting style, **[[bg3:command]]** |
| 9 | 2 Pal / 6 Bard / 1 Sorc | Metamagic online |
| 10 | 2 Pal / 6 Bard / 2 Sorc | **[[bg3:savage-attacker]]** feat |
| 11 | 2 Pal / 6 Bard / 3 Sorc | [[bg3:shadow-blade]], [[bg3:shield]] |
| 12 | 2 Pal / 6 Bard / 4 Sorc | Final split; **+2 CHA** feat |

If you are behind on XP, staying pure Bard through level 6 before the Withers respec is fine — the Act 1 route is built around reaching **Bard 6** and **character level 6**, not Paladin levels yet.

**Companions:**

- **Astarion:** Ranger (Gloom Stalker) → Rogue (Assassin) → Fighter 2. Feat [[bg3:sharpshooter]] at 4.
- **Shadowheart/Gale:** Warlock 1 (Hexblade) → Cleric 5 (Life) → Wizard 6 (Abjuration). Feats: Dual Wielder, [[bg3:alert]].
- **Karlach:** Monk 6 (Open Hand) → Rogue 4 (Thief) → Monk 2. Feat [[bg3:tavern-brawler]] at 4.

Stock **Enhance Ability** scrolls or learn the spell on Bard — it is an Honour Mode MVP for Ethel's mirror, Thorm checks, and any save you cannot afford to fail.

### Party combat roles

**Party opener (level 5+):**

1. **Pre-fight:** [[bg3:bless]] on frontliners; Hill Giant elixir on Astarion and Karlach when you have them.
2. **Open:** Astarion breaks stealth with burst (see level 5 section).
3. **Mid:** Tank walks in with [[bg3:spirit-guardians]] / [[bg3:armor-of-agathys]].

**Your turn pattern:**

1. **[[bg3:command]]** (class spell after level 8; scroll before that) when you need grouping — **Command: Approach** pulls enemies into melee for cleave smites.
2. **[[bg3:hold-person]]** or **[[bg3:hold-monster]]** on the boss (upcast for Paralyzed / auto-crit).
3. **Attack + [[bg3:divine-smite]] + Slashing Flourish** — cleave a second held or adjacent target. Do not dump damage into uncontrolled targets.
4. **[[bg3:shadow-blade]]** (Act 2+, upcast when worth it) when flourishes are spent; **[[bg3:booming-blade]]** on leftovers.

**Close:** Karlach stuns and flurries; Astarion focuses held or isolated targets in **Aura of Murder** range.

<div class="bg3-step__pager"><a href="#act-1-level-5-route">← Early Act 1</a> <a href="#act-1-level-5-route">Next: Level 5 push →</a></div>

## Act 1 level 5 route

<div class="bg3-step" id="act-1-level-5-route">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 1 · power spike</p>
<p class="bg3-step__title">Rush level 5 before hard fights</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-level5" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Get to level 5 through Grymforge with minimal fights. Defer Owlbear, harpies, and other optional battles until after 5.</p>
</div>
</div>

Half of Act 1 is tuned for level 3–4 parties. At **character level 5** you have level 3 spells; at **level 6** you pick up **Extra Attack**. Rush that band before optional bosses — the whole run gets calmer once you are there.

Practice the hold → smite loop here: **Paralyzed** targets autocrit — that is your Act 2 and Act 3 boss pattern.

### Safe XP path (summary)

1. Grove + companion quests for easy XP.
2. Underdark or Mountain Pass route into **Grymforge**.
3. Clear duergar in controlled pulls; save **Nere** drama for when you are ready.
4. **Grym** with forge anvil or owlbear drop cheese (both are fair game on Honour).
5. Backtrack for gear, then mop remaining Act 1 threats.

### Key encounters

**Grym:** Lure onto lava (Superheated), hammer anvil, or owlbear-from-above setup. Not a fight you need to hero.

**Animated Armour (Gauntlet):** [[bg3:sussur-bloom]] in inventory or thrown disables them. Soloable at level 1 if you respect the mechanic.

**Harpies:** **Skip** on Honour unless you need the tiefling rescue achievement. If you fight: [[bg3:calm-emotions]] from the back row while Mirkon is in range; high ground for ranged.

**Inquisitor W'wargaz:** Read his kit first. Plan a **two-turn burst** from full HP. Do not drag this fight.

### Act 1 gear priorities

**You:**

| Item | Notes |
| --- | --- |
| Dual **+1 hand crossbows** | Best damage per action until core melee items |
| Medium armor + shield if short on AC | Two-Weapon Fighting style until you pivot |
| Water bottles | Wet + cold synergy with party |

**Party:**

| Item | Who | Notes |
| --- | --- | --- |
| [[bg3:phalar-aluve]] | Tank | Shriek before big fights |
| [[bg3:titanstring-bow]] | Astarion | Hill Giant elixir |
| [[bg3:drakethroat-glaive]] | Camp follower | Twin daily buff (Act 2 vendor chain) |

Stock **[[bg3:greater-invisibility]]** and [[bg3:pass-without-trace]] scrolls when available; they define the party opener from level 5 onward.

<div class="bg3-step__pager"><a href="#leaving-act-1">Next: Leaving Act 1 →</a></div>

## Leaving Act 1

<div class="bg3-step" id="leaving-act-1">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 1 → 2</p>
<p class="bg3-step__title">Checklist before you leave</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-leave-act1" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Confirm missables, finish Adamantine crafts, long rest with full spell slots.</p>
</div>
</div>

- Rolan still in grove chain → Last Light vendors later.
- Barcus alive.
- [[bg3:phalar-aluve]], Titanstring, key scrolls on hand.
- You are **level 5+**; harder optional fights can wait or be deleted now.
- **Mirror of Loss:** +2 **DEX**. Honour checks are brutal — use Enhance Ability and respec tricks if you fail the first roll.

## Act 2 progression

<div class="bg3-step" id="act-2-progression">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 2</p>
<p class="bg3-step__title">Last Light, gear, skip Isobel</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-act2" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Do side content at Last Light before triggering Isobel. Farm Act 2 gear. Default: do not take the Isobel ambush.</p>
</div>
<div class="bg3-step__warn"><strong>Skip default — Isobel:</strong> One bad round can brick the whole act (inn falls, NPC deaths). Only fight if you accept that risk.</div>
</div>

### Isobel (optional, high risk)

If you insist: cast [[bg3:sanctuary]] and [[bg3:protection-from-evil-and-good]] on Isobel before the scene; [[bg3:arcane-lock]] on doors helps vs winged horrors. Kill Marcus fast. I still skip this on first Honour clears.

### Thorm children

Talk them into destroying themselves when you can. **Thisobald** needs **save** bonuses; the others need **skill** bonuses. Hoard check-boost gear and use [[bg3:bless]] / Bardic Inspiration.

### Act 2 gear pivot

**You:** pivot to finesse and Arcane Acuity — [[bg3:shadow-blade]] (upcast level 5 slot) is your main weapon now. Target **Elegant Studded Leather**, **Helmet/Diadem of Arcane Acuity or Synergy**, **Gloves of Battlemage's Power**, **Disintegrating Night Walkers**, **Cloak of the Weave**, **Callous Glow Ring** or Band of the Mystic Scoundrel if the party can share hold duty.

**Party:**

- **True Love's Embrace / Caress** — Warding Bond + Arcane Ward trick on tank.
- **Callous Glow Ring** — Radiant Orb stacking with [[bg3:magic-missile]] on tank/Gale.
- **[[bg3:drakethroat-glaive]]** — twin cold buff daily on tank weapon + Astarion bow.

### Standard fight opener (level 5+)

1. [[bg3:greater-invisibility]] on Astarion; pre-attack from stealth.
2. Phalar Shriek + Bane oil on tank; run tank in with speed potion for Orb stacks.
3. [[bg3:create-water]] on boss pack; your **[[bg3:command]]** (Approach) or [[bg3:hold-monster]] / [[bg3:hypnotic-pattern]] — concentration holds for bosses, Command when you need both setup and freedom.
4. **You:** smite + Slashing Flourish cleave on paralyzed targets; do not attack the boss before Hold lands.
5. Karlach cleans up; Astarion walks into **Aura of Murder** range for crits on held targets.

<div class="bg3-step__pager"><a href="#ketheric-and-myrkul">Next: Ketheric →</a></div>

## Ketheric and Myrkul

<div class="bg3-step" id="ketheric-and-myrkul">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 2 finale</p>
<p class="bg3-step__title">Moonrise / Avatar</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-ketheric" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Pre-read Honour Mode legendary actions. Swap tank to Doom Hammer. Decide whether to fight phase 1 for setup or skip via dialogue.</p>
</div>
</div>

- **Doom Hammer** on tank for the fight.
- Radiant Orb from [[bg3:magic-missile]] does **not** extra-proc on Ketheric the way you expect; do not rely on Glow Ring damage amp on him.
- Use Astarion to clear adds; save boss damage for when holds land.
- **Undead adds:** your enchantment holds may not land — lean on [[bg3:command]], tank control, and raw damage for necromites.
- **Avatar of Myrkul:** he does not move — [[bg3:wall-of-fire]], darkness arrows for disadvantage manipulation, **Bone Chilled** on the avatar so necromites cannot heal him.

Optional: fight phase 1 to free Aylin and burn the mind flayer before phase 2. Skipping phase 1 via dialogue is valid if you want less chaos.

## Act 3 progression

<div class="bg3-step" id="act-3-progression">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Act 3</p>
<p class="bg3-step__title">Gear rush, optional bosses</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-act3" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>Rush spell DC gear ([[bg3:birthright]], [[bg3:markoheshkir]], Cloak of the Weave). Skip Ansur on first clear.</p>
</div>
<div class="bg3-step__optional"><strong>Optional skip — Ansur:</strong> Hardest optional fight in the game. [[bg3:globe-of-invulnerability]] helps but the run does not need his loot. Save for a later run.</div>
</div>

- **Hold Monster** is the delete button; prioritize it every boss fight.
- Learn **[[bg3:counterspell]]** from a scroll (Sorcerous Sundries or vendors) — this split never reaches Bard 10, so there is no Magical Secrets pickup.
- Rush [[bg3:birthright]] + [[bg3:markoheshkir]] for spell DC and free damage; daily ice casts from the staff.
- Accept tadpoles on companions if you are comfortable with the story beat; flight and Far Realm luck are large buffs.
- Do not waste long-rest buffs right before the elder brain sequence if you used day-long camp follower tricks.

## Endgame Nether Brain

<div class="bg3-step" id="endgame-nether-brain">
<div class="bg3-step__head">
<div>
<p class="bg3-step__badge">Finale</p>
<p class="bg3-step__title">Safe clear</p>
</div>
<button type="button" class="bg3-checkpoint" data-checkpoint-id="step-finale" aria-pressed="false"><span class="bg3-checkpoint__action">Mark done</span></button>
</div>
<div class="bg3-step__now">
<strong>Do this now</strong>
<p>At the brainstem, let Gale detonate the Netherese orb in dialogue. That ends the fight and counts for Honour completion.</p>
</div>
</div>

**Default safe clear:** Gale's orb in the final confrontation (not Act 2 — that ends the game early without the achievement).

**If you fight:** Netherbrain rotates damage immunity to types hit last round. Keep elemental scrolls (lightning + wet is fine) on characters who are not your main damage type that turn. Spread platforms; Orbs of Negation delete tiles.

## Unique and missable index

| Item / NPC | Act | Lockout | Priority |
| --- | --- | --- | --- |
| Rolan in Grove | 1 | Leaves on bad outcomes | Critical |
| Barcus | 1 | Dies at windmill | Critical |
| [[bg3:phalar-aluve]] | 1 | Miss if not looted | High |
| [[bg3:drakethroat-glaive]] | 2 | Vendor chain | High |
| True Love's rings | 2 | Act 2 map | High |
| Callous Glow Ring | 2 | House of Hope | High |
| [[bg3:birthright]] | 3 | Rolan in Lower City | High |
| [[bg3:markoheshkir]] | 3 | Sorcerous Sundries | High |
| Isobel fight | 2 | Inn can collapse | Skip default |

## Tips by risk tier

### Standard (use every run)

- Hit **level 5** before you pick fights Act 1 was not built for.
- Wet the pack ([[bg3:create-water]] or bottles), then lean on cold and [[bg3:ray-of-frost]].
- **[[bg3:command]]** before or alongside holds — Approach sets up cleave smites without eating concentration.
- Land [[bg3:hold-monster]] (or Person) before anyone dumps damage into the wrong target; paralyzed = autocrit for your smite flurry.
- Pre-buff with [[bg3:bless]], elixirs, and Phalar Shriek on bosses that actually matter.
- **Elixir of Bloodlust** on you when you are cleaning up — extra action on kill adds up.

### Advanced (strong, still fair)

- Astarion opener: [[bg3:greater-invisibility]] plus [[bg3:pass-without-trace]].
- Grym anvil or owlbear drop setups.
- Thorm kids talked down with stacked checks + Enhance Ability.
- **Oil of Sharpness** or Accuracy when coatings matter; **Crawler Mucus** for paralysis without concentration.
- Gale orb at the brainstem if you brought him.

### Optional cheese (not the default line)

- Hexblade vendor gold loop.
- Infinite sorcery point / coffeelock-style loops (tedious, not this route).
- Permanent Flame Blade / exploit-heavy fire variants.
- Camp follower Aid / Heroes' Feast stacks (they strip at the brain).

## Patch notes

Last verified **May 2026** on **Patch 8**: 6/4/2 respec at Withers, upcast [[bg3:shadow-blade]], Slashing Flourish cleave on held targets, Crown accuracy, Honour stealth on repeated [[bg3:greater-invisibility]] rolls. If Larian hotfixes something you relied on, check [bg3.wiki](https://bg3.wiki/) before you blame the guide.

<div class="bg3-step__pager"><a href="#how-to-use-this-guide">Back to start ↑</a></div>
