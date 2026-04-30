# Customization Guide

Everything you need to add, edit, or extend the data that the three calculators read at build time. Each calculator (AOPG, Verse, Pirate) has its own data folder with its own schema — pick the section that matches what you're editing.

## Table of contents

1. [General workflow](#general-workflow)
2. [AOPG calculator](#aopg-calculator)
   - [Accessories](#aopg-accessories)
   - [Active buffs](#aopg-active-buffs)
   - [Passive buffs](#aopg-passive-buffs)
   - [Move damage](#aopg-move-damage)
   - [Damage scaling system](#aopg-damage-scaling-system)
3. [Verse calculator](#verse-calculator)
   - [Passive buffs](#verse-passive-buffs)
   - [Stat-related (accessories, traits, ranks)](#verse-stat-related)
   - [Adding a new buff type](#verse-adding-a-new-buff-type)
   - [Adding a new move type](#verse-adding-a-new-move-type)
4. [Pirate calculator](#pirate-calculator)
   - [Passive data files](#pirate-passive-data-files)
   - [Multiplicative vs additive](#pirate-multiplicative-vs-additive)
   - [Avatar leveling](#pirate-avatar-leveling)
   - [Milestones](#pirate-milestones)
   - [Adding a new passive type](#pirate-adding-a-new-passive-type)
5. [Common pitfalls](#common-pitfalls)

---

## General workflow

1. Open the data file matching what you want to change.
2. Pick the next sequential `id` (one higher than the current highest in that array).
3. Add the entry **before the closing `];`** with a trailing comma.
4. If you created a new file, export it from the directory's `index.ts`.
5. Run `npm run dev` and verify the entry appears in the dropdown / has the expected effect.

The TypeScript build will complain if a required field is missing, so let the compiler guide you.

---

## AOPG calculator

Located at [src/app/aopg/](src/app/aopg/). Damage formula:

```
finalDamage = baseDamage * (1 + totalStat / 75) * damageMultiplier * enhanceMult * blessingMult
```

### AOPG accessories

**Location:** [src/app/aopg/data/accessories/](src/app/aopg/data/accessories/) (split by body slot: `head.ts`, `top.ts`, `arm.ts`, `back.ts`, `waist.ts`, `legs.ts`)

**Interface:**

```ts
interface Accessories {
  id: number;
  name: string;
  strength: number;
  stamina: number;
  defense: number;
  sword: number;
  gun: number;
  haki: number;
  fruit: number;
  link?: string; // optional wiki URL
}
```

**Template:**

```ts
{
  id: NEXT_ID,
  name: "Item Name",
  strength: 500,
  stamina: 0,
  defense: 300,
  sword: 400,
  gun: 0,
  haki: 200,
  fruit: 600,
  link: "https://aopg.fandom.com/wiki/Item_Name",
}
```

Use `0` for stats the accessory doesn't grant.

### AOPG active buffs

**Location:** [src/app/aopg/data/buffs/active/](src/app/aopg/data/buffs/active/) — eight files: `fruit.ts`, `fighting.ts`, `gun.ts`, `sword.ts`, `armament.ts`, `conquerors.ts`, `suit.ts`, `support.ts`.

**Interface:**

```ts
interface ActiveBuffs {
  id: number;
  name: string;
  fruitbuff: number;
  swordbuff: number;
  gunbuff: number;
  strengthbuff: number;
  hakibuff: number;
  link?: string;
}
```

Buff values are multipliers: `1` = no change, `1.5` = +50%, `2.0` = +100%, etc.

### AOPG passive buffs

**Location:** [src/app/aopg/data/buffs/passive/](src/app/aopg/data/buffs/passive/) — `title.ts`, `race.ts`, `blacksmith.ts`, `giant.ts`, `artifact.ts`.

**Title interface:** extends `BaseBuff` with `rank: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythical" | "divine"`.

**Race interface:** extends `BaseBuff` with `note: string` and `image: string` (path under `/resources/`).

**Title rank → typical buff range:**

| Rank | Range |
|------|-------|
| common | 1.0 – 1.2 |
| uncommon | 1.2 – 1.3 |
| rare | 1.3 – 1.5 |
| epic | 1.5 – 1.7 |
| legendary | 1.5 – 2.0 |
| mythical | 2.0 – 3.5 |
| divine | 3.5+ |

### AOPG move damage

**Location:** [src/app/aopg/data/moves/](src/app/aopg/data/moves/) — `devilfruitMoveDamage.ts`, `fightingstyleMoveDamage.ts`, `swordstyleMoveDamage.ts`, `gunstyleMoveDamage.ts`, `hakiMoveDamage.ts`, `supportstyleMoveDamage.ts`.

**Interface:**

```ts
type DamageScale = "fruitbuff" | "swordbuff" | "gunbuff" | "strengthbuff" | "hakibuff";
type MoveKey    = "M1" | "Q" | "E" | "R" | "F" | "G" | "T" | "U" | "Y";

interface MoveDamage {
  id: number;
  name: string;
  M1: number; Q: number; E: number; R: number;
  F: number;  G: number; T: number; U: number; Y: number;
  scale?: DamageScale;
  scales?: Partial<Record<MoveKey, DamageScale | DamageScale[] | SplitDamage>>;
}
```

Use `0` for ability slots a move doesn't have. Default scaling:

| Source file | Default scale |
|-------------|---------------|
| `fightingstyleMoveDamage.ts` | `strengthbuff` |
| `supportstyleMoveDamage.ts`  | `strengthbuff` |
| `devilfruitMoveDamage.ts`    | `fruitbuff` |
| `swordstyleMoveDamage.ts`    | `swordbuff` |
| `gunstyleMoveDamage.ts`      | `gunbuff` |
| `hakiMoveDamage.ts`          | `hakibuff` |

### AOPG damage scaling system

There are three ways to override the default scale.

**1. Whole-move override** — every ability uses one scale:

```ts
{ id: 5, name: "Wukong + Four Focus Scroll", M1: 13400, /* ... */, scale: "swordbuff" }
```

**2. Per-ability override** — different scale per key:

```ts
scales: {
  M1: "swordbuff",
  Q: "fruitbuff",
  E: "fruitbuff",
  R: "strengthbuff",
  // F, G, T, U, Y fall back to file's default scale
}
```

**3a. Multi-scale (max wins)** — array of scales, calculator picks whichever yields more damage:

```ts
scales: { E: ["fruitbuff", "strengthbuff"] }
// E damage = max(damage with fruit scaling, damage with strength scaling)
```

**3b. Split damage (sum)** — different base damage per scale, summed together:

```ts
scales: {
  Y: [
    { scale: "fruitbuff",    damage: 55890 },
    { scale: "strengthbuff", damage: 21600 },
  ],
}
// Y damage = damage with fruit scaling using 55890 + damage with strength scaling using 21600
```

Resolution priority: `scales[ability]` → `scale` → file default.

The "Auto Best for Selected Move" UI button uses the active scale to pick optimal accessories, buffs, and stats automatically.

---

## Verse calculator

Located at [src/app/verse/](src/app/verse/). Damage formula:

```
finalDamage = (baseDamage * multiplier + enhanceAmt) * (1 + totalStat / 75) * damageMultiplier * blessingMult
```

`enhanceAmt = enhanceLevel * 2.5` (sword moves only). `blessingMult = 2.5` when blessing is enabled. Fruit moves skip both modifiers.

### Verse passive buffs

**Location:** [src/app/verse/data/passive/](src/app/verse/data/passive/) — `titles.ts`, `races.ts`, `hakis.ts`, `relics.ts`, `abilities.ts`, `prestiges.ts` (currently empty).

**Interface:**

```ts
interface buffs {
  id: number;
  name: string;
  strengthBuff: number;
  swordBuff: number;
  specialBuff: number;
}
```

`1` = no change, `1.5` = +50%, `0.5` = -50% (Verse supports debuffs — see Dullahan Day).

**Haki pattern:** each level adds `+0.05` to all three buffs (Lvl 1 = 1.05, Lvl 6 = 1.30, etc.).

**Setting up Prestiges (currently empty):**

```ts
import type { buffs } from "./types";

export const prestigesData: buffs[] = [
  { id: 0, name: "None",       strengthBuff: 1,   swordBuff: 1,   specialBuff: 1   },
  { id: 1, name: "Prestige 1", strengthBuff: 1.1, swordBuff: 1.1, specialBuff: 1.1 },
];
```

Don't forget `export { prestigesData } from "./prestiges";` in `index.ts`.

### Verse stat-related

**Location:** [src/app/verse/data/stat_related/](src/app/verse/data/stat_related/) — `accessories.ts`, `traits.ts`, `ranks.ts`.

**Stats interface (for Accessories and Traits):**

```ts
interface Stats {
  id: number;
  name: string;
  strength: number;
  defense: number;
  sword: number;
  special: number;
  increment?: number; // accessories: stat gain per enhancement level
  dmgMult?: number;   // traits: damage multiplier
}
```

**Accessories:** include `increment` (typical 500 – 1500 per enhancement level).

**Traits:** include `dmgMult`.

| Tier | `dmgMult` |
|------|-----------|
| Common | 1.0 – 1.5 |
| Uncommon | 1.5 – 2.0 |
| Rare | 2.0 – 3.5 |
| Epic | 3.5 – 7.5 |
| Legendary | 7.5 – 12 |
| Mythic | 12 – 17 |
| Divine | 17+ |

**Ranks (`ranks.ts`):** `{ label: string, value: number }`. Current ladder: D (0), C (1500), C+ (3000), B (4500), B+ (6000), A (7500), A+ (10000), S (12500), SS (15000), SSS (17500), SSS+ (20000).

### Verse: adding a new buff type

To add a new passive buff source (e.g. "wisps") beyond the existing six:

1. Create `src/app/verse/data/passive/wisps.ts` with the standard `buffs` shape.
2. Export from [src/app/verse/data/passive/index.ts](src/app/verse/data/passive/index.ts): `export { wispsData } from "./wisps";`
3. In [src/app/verse/views/calculator.tsx](src/app/verse/views/calculator.tsx):
   - Import `wispsData`.
   - Add `useState` for `wispId` and a lookup `selectedWisp`.
   - Add a multiplier slot in `getStatMultiplier`:
     ```ts
     let wispMult = 1;
     if (statKey === "strength") wispMult = selectedWisp.strengthBuff || 1;
     // ...etc for sword/special
     return baseDmgMult * titleMult * raceMult * hakiMult * /* ... */ * wispMult;
     ```
   - Extend `handleBestBuff` to also pick the best wisp for the active stat (use the same `reduce` pattern).
   - Add a `<select>` in the Passive fieldset with the same shape as the existing buff selectors.

### Verse: adding a new move type

To add a move category beyond sword/fruit/fighting/spec:

1. Create `src/app/verse/data/moves/example.ts` with the `move` interface (`id`, `name`, `M1`, `Z`, `X`, `C`, `V`, `F`).
2. Export from [src/app/verse/data/moves/index.ts](src/app/verse/data/moves/index.ts).
3. In [calculator.tsx](src/app/verse/views/calculator.tsx):
   - Widen the `moveType` union: `"sword" | "fruit" | "fighting" | "spec" | "example"`.
   - Add a `case "example": return exampleData;` to `getMoveData`.
   - Update `getMoveStatKey` to map `"example"` to whichever stat (`strength`/`sword`/`special`) drives its damage.
   - If your move type uses enhance or blessing, update `calculateMoveDamage` to include it in the relevant branch.
   - Add a new `<option>` in the Move Type dropdown.
   - If enhance/blessing toggles should be visible, update the conditional rendering blocks.

**Move type → stat mapping:**

| Move Type | Stat Used |
|-----------|-----------|
| sword | sword |
| fighting | strength |
| fruit | special |
| spec | special |

---

## Pirate calculator

Located at [src/app/pirate/](src/app/pirate/). The most complex of the three — uses a single 18-stat `BaseBuff` shape with mixed multiplicative/additive semantics depending on the source. Combined-buff formula:

```
total = (race × clan × trait) + auraAdd + avatarAdd + milestoneAdd
```

For `extraGeppoJumps` everything is additive (integer count, no multiplication anywhere).

### Pirate passive data files

**Location:** [src/app/pirate/data/passive/](src/app/pirate/data/passive/)

| File | Export | Shape | Combine method |
|------|--------|-------|----------------|
| `races.ts` | `racesData: buffs[]` | multiplier (`1.15` = +15%) | multiplied |
| `clans.ts` | `clansData: buffs[]` | multiplier | multiplied |
| `traits.ts` | `traitsData: buffs[]` | multiplier | multiplied |
| `auras.ts` | `aurasData: buffs[]` | raw additive (`0.15` = +15%) | added on top of the multiplier product |
| `avatars.ts` | `avatarsData: avatar[]` | raw additive, scales with level | added on top of the multiplier product |
| `types.ts` | type definitions | — | — |
| `index.ts` | barrel re-exports | — | — |

The 18 `BaseBuff` keys: `damage`, `lifesteal`, `fistDamage`, `swordDamage`, `abilityDamage`, `criticalDamage`, `criticalDamageChance`, `damageReduction`, `maxHealth`, `gems`, `coins`, `dropAmount`, `exp`, `luck`, `extraGeppoJumps`, `walkSpeed`, `jumpHeight`, `cooldownReduction`.

In-game property names map to these keys by stripping `Multiplier` and lowercasing the first letter (e.g. `LifestealMultiplier` → `lifesteal`, `MaxHealthMultiplier` → `maxHealth`, `CriticalDamageChance` → `criticalDamageChance`).

### Pirate multiplicative vs additive

The same `baseBuff` shape lives in two semantically different worlds. **Always check which file you're editing** before picking a value convention.

**Multiplicative (`races.ts`, `clans.ts`, `traits.ts`):**

```ts
{ id: 5, name: "Vampire", baseBuff: { maxHealth: 1.3, damage: 1.25, lifesteal: 1.05 } }
// → +30% max health, +25% damage, +5% lifesteal — multiplied with other multiplicative sources
```

**Additive (`auras.ts`):**

```ts
{ id: 9, name: "Fallen Halo", baseBuff: { damage: 0.11, luck: 0.15, criticalDamageChance: 0.20 } }
// → +11% damage, +15% luck, +20% crit chance — added, not multiplied
```

If the in-game description says "+10% Damage", store `0.10` in an aura, but `1.10` in a race/clan/trait.

### Pirate avatar leveling

**Avatar interface:**

```ts
interface avatar {
  id: number;
  name: string;
  maxLevel: number;
  buffs: AvatarStatBuff[];
}

type AvatarStatBuff = {
  stat: keyof BaseBuff;
  base: number;     // value at level 1
  perLevel: number; // additional value per level
};
```

Effective contribution at runtime: `base + perLevel × currentLevel`. To derive `perLevel` when you know base + max + maxLevel: `perLevel = (max - base) / maxLevel`.

```ts
{
  id: 13, name: "Gilgamash", maxLevel: 100,
  buffs: [
    { stat: "damage",    base: 0.35, perLevel: 0.01   },  // +35% at lvl 1, +135% at lvl 100
    { stat: "lifesteal", base: 0.01, perLevel: 0.0009 },  // +1% at lvl 1, +10% at lvl 100
  ],
}
```

The first entry is conventionally the damage buff. There's no upper limit on the array — Jigan has 6 entries.

### Pirate milestones

Milestones aren't stored in this directory — they're inline in [src/app/pirate/views/calculator.tsx](src/app/pirate/views/calculator.tsx) because they're a fixed 6-stat × 5-tier grid (damage, ability damage, sword damage, fist damage, health, cooldown × 5%, 10%, 15%, 20%, 25%). To change which stats appear or rebalance the tier values, edit the `MILESTONE_STATS` and `MILESTONE_TIERS` constants near the top of `calculator.tsx`.

Milestones are additive and sequentially unlocked (you must unlock 5%, 10%, 15% before 20%). Per stat, the contribution is `sum(unlocked tier percentages) / 100`.

### Pirate: adding a new passive type

To add another passive source (e.g. "items") beyond race/clan/trait/aura/avatar:

1. Create `src/app/pirate/data/passive/items.ts` with `buffs[]` shape (multiplicative or additive — match the convention to how it should combine).
2. Export from [src/app/pirate/data/passive/index.ts](src/app/pirate/data/passive/index.ts): `export { itemsData } from "./items";`
3. In [src/app/pirate/views/calculator.tsx](src/app/pirate/views/calculator.tsx):
   - Import `itemsData`.
   - Add `useState` for `itemId` and a `selectedItem` lookup.
   - **If multiplicative:** add `selectedItem` to the `passives` array.
   - **If additive:** build an `itemsAdd` shape and include it in the `for (const src of [avatarAdd, milestoneAdd, auraAdd])` loop that builds `totalAdditive`.
   - Add a `<select>` in the Passive Selection grid (and a details `<div>` using `formatBuffDetails` or `formatAdditiveDetails`).
   - Update `applyBestForStat` to call `pickBestId(itemsData, key, /* additive flag */)` and `setItemId(...)` so the click-to-maximize feature picks an optimal item too.

---

## Common pitfalls

- **Wrong value convention for the file.** Putting `1.15` in an aura (where `0.15` is correct) gives an absurd +1500% on the details line. Putting `0.15` in a race makes the buff a debuff (×0.15 = -85%). Re-read [Multiplicative vs additive](#pirate-multiplicative-vs-additive) before saving.
- **Missing `id: 0` "None" entry.** Every selector defaults to `id: 0` — if it doesn't exist with an empty buff, the calculator shows the first real entry as the default selection.
- **Skipped or duplicated `id`.** Always increment by exactly 1 from the current highest. The calculator uses `id` for `<select>` value matching.
- **Forgot the `index.ts` re-export.** New file won't be importable from the calculator.
- **Trailing comma missing.** Some linters allow it, some don't. Always include it on the last property and after the last `}` in the array.
- **Avatar `perLevel` math.** Use `(max - base) / maxLevel`, not `max / maxLevel`. Otherwise the avatar starts too strong at level 1.
- **`extraGeppoJumps` written as a multiplier.** It's an integer count — `extraGeppoJumps: 2` means +2 jumps, not "+200%".
