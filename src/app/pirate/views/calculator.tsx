import { useState } from "react";
import {
  racesData,
  clansData,
  traitsData,
  aurasData,
  avatarsData,
  type buffs,
  type BaseBuff,
} from "../data/passive";
import {
  fistMoves,
  fruitMoves,
  swordMoves,
  abilityMoves,
  type Scale,
} from "../data/move";
import { useSpecialUser } from "../../hooks/useSpecialUser";

const allMoves = [...fistMoves, ...fruitMoves, ...swordMoves, ...abilityMoves];

const scaleConstants: Record<Scale, number> = {
  fist: 0.6208273281,
  sword: 1.5077960877,
  ability: 1.9222079596,
};

const scaleToBaseStat = {
  fist: "strength",
  sword: "sword",
  ability: "ability",
} as const satisfies Record<Scale, string>;

const scaleToBuffKey = {
  fist: "fistDamage",
  sword: "swordDamage",
  ability: "abilityDamage",
} as const satisfies Record<Scale, keyof BaseBuff>;

const statTypes = [
  {
    key: "strength",
    label: "Fist",
    className: "text-red-500",
    emoji: "\u{1F4AA}",
  },
  {
    key: "defense",
    label: "Defense",
    className: "text-green-500",
    emoji: "\u{1F6E1}\u{FE0F}",
  },
  {
    key: "sword",
    label: "Sword",
    className: "text-blue-500",
    emoji: "\u{2694}\u{FE0F}",
  },
  {
    key: "ability",
    label: "Ability",
    className: "text-purple-500",
    emoji: "\u{2728}",
  },
];

const MAX_TOTAL_STATS = 24000;
const MAX_SINGLE_STAT = 7500;

const MILESTONE_TIERS = [5, 10, 15, 20, 25] as const;

const MILESTONE_STATS: {
  key: keyof BaseBuff;
  label: string;
  textColor: string;
  activeColor: string;
  inactiveColor: string;
}[] = [
  {
    key: "damage",
    label: "Damage",
    textColor: "text-orange-500",
    activeColor:
      "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white",
    inactiveColor: "border-orange-500 text-orange-500 hover:bg-orange-500/20",
  },
  {
    key: "abilityDamage",
    label: "Ability Damage",
    textColor: "text-purple-500",
    activeColor:
      "bg-purple-500 hover:bg-purple-600 border-purple-500 text-white",
    inactiveColor: "border-purple-500 text-purple-500 hover:bg-purple-500/20",
  },
  {
    key: "swordDamage",
    label: "Sword Damage",
    textColor: "text-blue-500",
    activeColor: "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white",
    inactiveColor: "border-blue-500 text-blue-500 hover:bg-blue-500/20",
  },
  {
    key: "fistDamage",
    label: "Fist Damage",
    textColor: "text-red-500",
    activeColor: "bg-red-500 hover:bg-red-600 border-red-500 text-white",
    inactiveColor: "border-red-500 text-red-500 hover:bg-red-500/20",
  },
  {
    key: "maxHealth",
    label: "Health",
    textColor: "text-green-500",
    activeColor: "bg-green-500 hover:bg-green-600 border-green-500 text-white",
    inactiveColor: "border-green-500 text-green-500 hover:bg-green-500/20",
  },
  {
    key: "cooldownReduction",
    label: "Cooldown",
    textColor: "text-amber-300",
    activeColor: "bg-amber-400 hover:bg-amber-500 border-amber-400 text-white",
    inactiveColor: "border-amber-400 text-amber-400 hover:bg-amber-400/20",
  },
];

const milestoneSumPercent = (count: number) =>
  MILESTONE_TIERS.slice(0, count).reduce((s, t) => s + t, 0);

const overviewSections = [
  {
    section: "Offense",
    color: "text-red-500",
    items: [
      { key: "damage", label: "Damage" },
      { key: "lifesteal", label: "Lifesteal" },
      { key: "fistDamage", label: "Fist Damage" },
      { key: "swordDamage", label: "Sword Damage" },
      { key: "abilityDamage", label: "Ability Damage" },
      { key: "criticalDamage", label: "Critical Damage" },
      { key: "criticalDamageChance", label: "Critical Damage Chance" },
    ],
  },
  {
    section: "Defense",
    color: "text-green-500",
    items: [
      { key: "damageReduction", label: "Damage Reduction" },
      { key: "maxHealth", label: "Max Health" },
    ],
  },
  {
    section: "Utility",
    color: "text-yellow-500",
    items: [
      { key: "gems", label: "Gems" },
      { key: "coins", label: "Coins" },
      { key: "dropAmount", label: "Drop Amount" },
      { key: "exp", label: "Exp" },
      { key: "luck", label: "Luck" },
      { key: "extraGeppoJumps", label: "Extra Geppo Jumps" },
      { key: "walkSpeed", label: "Walk Speed" },
      { key: "jumpHeight", label: "Jump Height" },
      { key: "cooldownReduction", label: "Cooldown Reduction" },
    ],
  },
];

const formatBuff = (key: string, val: number) => {
  if (key === "extraGeppoJumps") return `+${val}`;
  return `+${Math.round((val - 1) * 100)}%`;
};

const labelForKey: Record<string, string> = Object.fromEntries(
  overviewSections.flatMap((s) => s.items.map((i) => [i.key, i.label])),
);

type BuffPart = { stat: string; text: string };

const buffPartsMultiplicative = (
  buff: Record<string, number | undefined>,
): BuffPart[] => {
  const parts: BuffPart[] = [];
  for (const [key, raw] of Object.entries(buff)) {
    if (typeof raw !== "number") continue;
    const label = labelForKey[key] ?? key;
    if (key === "extraGeppoJumps") {
      if (raw !== 0) parts.push({ stat: key, text: `+${raw} ${label}` });
    } else {
      const pct = Math.round((raw - 1) * 100);
      if (pct !== 0) parts.push({ stat: key, text: `+${pct}% ${label}` });
    }
  }
  return parts;
};

const buffPartsAdditive = (
  add: Partial<Record<string, number>>,
): BuffPart[] => {
  const parts: BuffPart[] = [];
  for (const [key, v] of Object.entries(add)) {
    if (typeof v !== "number" || v === 0) continue;
    const label = labelForKey[key] ?? key;
    if (key === "extraGeppoJumps") {
      parts.push({ stat: key, text: `+${v} ${label}` });
    } else {
      parts.push({ stat: key, text: `+${Math.round(v * 100)}% ${label}` });
    }
  }
  return parts;
};

const Calculator = () => {
  const [baseStats, setBaseStats] = useState({
    strength: 0,
    defense: 0,
    sword: 0,
    ability: 0,
  });

  const [raceId, setRaceId] = useState(0);
  const [clanId, setClanId] = useState(0);
  const [traitId, setTraitId] = useState(0);
  const [auraId, setAuraId] = useState(0);
  const [avatarId, setAvatarId] = useState(0);
  const [avatarLevel, setAvatarLevel] = useState(1);
  const [moveId, setMoveId] = useState(0);
  const [activeSpecialBuffs, setActiveSpecialBuffs] = useState<number[]>([]);
  const [hakiEnabled, setHakiEnabled] = useState(false);
  const [hakiLevel, setHakiLevel] = useState(0);

  const { unlocked, tryUnlock, lock } = useSpecialUser();
  const [accessCode, setAccessCode] = useState("");
  const [showAccessInput, setShowAccessInput] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const [reverseDirection, setReverseDirection] = useState<
    "maxToBase" | "baseToMax"
  >("maxToBase");
  const [reverseScale, setReverseScale] = useState<Scale>("fist");
  const [reverseInput, setReverseInput] = useState<number>(0);

  const [milestones, setMilestones] = useState<Record<string, number>>(
    Object.fromEntries(MILESTONE_STATS.map((s) => [s.key, 0])),
  );

  const setMilestoneTier = (statKey: string, tier: number) => {
    setMilestones((prev) => ({
      ...prev,
      [statKey]: prev[statKey] === tier ? tier - 1 : tier,
    }));
  };

  const selectedRace = racesData.find((r) => r.id === raceId) || racesData[0];
  const selectedClan = clansData.find((c) => c.id === clanId) || clansData[0];
  const selectedTrait =
    traitsData.find((t) => t.id === traitId) || traitsData[0];
  const selectedAura = aurasData.find((a) => a.id === auraId) || aurasData[0];
  const selectedAvatar =
    avatarsData.find((a) => a.id === avatarId) || avatarsData[0];

  const clampedLevel = Math.min(
    Math.max(1, avatarLevel),
    selectedAvatar.maxLevel,
  );

  const avatarAdd: Partial<Record<keyof BaseBuff, number>> = {};
  for (const b of selectedAvatar.buffs) {
    const v = b.base + b.perLevel * clampedLevel;
    avatarAdd[b.stat] = (avatarAdd[b.stat] ?? 0) + v;
  }

  const milestoneAdd: Partial<Record<keyof BaseBuff, number>> = {};
  for (const { key } of MILESTONE_STATS) {
    const count = milestones[key] ?? 0;
    if (count > 0) milestoneAdd[key] = milestoneSumPercent(count) / 100;
  }

  const auraAdd = selectedAura.baseBuff as Partial<
    Record<keyof BaseBuff, number>
  >;

  const totalAdditive: Partial<Record<keyof BaseBuff, number>> = {};
  for (const src of [avatarAdd, milestoneAdd, auraAdd]) {
    for (const [k, v] of Object.entries(src)) {
      const key = k as keyof BaseBuff;
      totalAdditive[key] = (totalAdditive[key] ?? 0) + (v ?? 0);
    }
  }

  const passives = [selectedRace, selectedClan, selectedTrait];

  const pickBestId = (
    data: buffs[],
    key: keyof BaseBuff,
    additive = false,
  ): number => {
    const isAdditive = additive || key === "extraGeppoJumps";
    const fallback = isAdditive ? 0 : 1;
    return data.reduce((best, cur) => {
      const cv = cur.baseBuff[key] ?? fallback;
      const bv = best.baseBuff[key] ?? fallback;
      return cv > bv ? cur : best;
    }).id;
  };

  const pickBestAvatarId = (key: keyof BaseBuff): number => {
    let bestId = avatarsData[0].id;
    let bestValue = -Infinity;
    for (const a of avatarsData) {
      let value = 0;
      for (const b of a.buffs) {
        if (b.stat === key) {
          value += b.base + b.perLevel * a.maxLevel;
        }
      }
      if (value > bestValue) {
        bestValue = value;
        bestId = a.id;
      }
    }
    return bestId;
  };

  const applyBestForStat = (key: keyof BaseBuff) => {
    setRaceId(pickBestId(racesData, key));
    setClanId(pickBestId(clansData, key));
    setTraitId(pickBestId(traitsData, key));
    setAuraId(pickBestId(aurasData, key, true));
    const bestAvatarId = pickBestAvatarId(key);
    setAvatarId(bestAvatarId);
    const bestAvatar =
      avatarsData.find((a) => a.id === bestAvatarId) || avatarsData[0];
    setAvatarLevel(bestAvatar.maxLevel);
    if (MILESTONE_STATS.some((s) => s.key === key)) {
      setMilestones((prev) => ({ ...prev, [key]: MILESTONE_TIERS.length }));
    }
  };

  const combinedBuff = (key: string) => {
    const k = key as keyof BaseBuff;
    const add = totalAdditive[k] ?? 0;
    if (key === "extraGeppoJumps") {
      const sum = passives.reduce((s, p) => {
        const v = p.baseBuff?.[k];
        return s + (typeof v === "number" ? v : 0);
      }, 0);
      return sum + add;
    }
    const product = passives.reduce((prod, p) => {
      const v = p.baseBuff?.[k];
      return prod * (typeof v === "number" ? v : 1);
    }, 1);
    return product + add;
  };

  const totalBaseStats = Object.values(baseStats).reduce(
    (sum, val) => sum + val,
    0,
  );
  const remainingStats = MAX_TOTAL_STATS - totalBaseStats;

  const handleMaxStat = (statKey: keyof typeof baseStats) => {
    const currentValue = baseStats[statKey];
    const maxByTotal = currentValue + remainingStats;
    const maxAllowed = Math.min(MAX_SINGLE_STAT, maxByTotal);
    setBaseStats((prev) => ({
      ...prev,
      [statKey]: maxAllowed,
    }));
  };

  const handleStatChange = (
    statKey: keyof typeof baseStats,
    newValue: number,
  ) => {
    const currentValue = baseStats[statKey];
    const otherStatsTotal = totalBaseStats - currentValue;
    const maxByTotal = MAX_TOTAL_STATS - otherStatsTotal;
    const maxAllowed = Math.min(MAX_SINGLE_STAT, maxByTotal);
    const clampedValue = Math.min(maxAllowed, Math.max(0, newValue));
    setBaseStats((prev) => ({
      ...prev,
      [statKey]: clampedValue,
    }));
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Stats, Race Selection */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
              <legend className="fieldset-legend font-bold">Base Stats</legend>

              {statTypes.map(({ key, label, className, emoji }) => {
                const statKey = key as keyof typeof baseStats;
                const value = baseStats[statKey];

                return (
                  <div key={statKey} className="flex items-center gap-2 mb-3">
                    <div
                      className={`flex items-center gap-1 font-bold flex-1 min-w-0 ${className}`}
                    >
                      <span className="text-lg">{emoji}</span>
                      <span>{label}</span>
                    </div>

                    <input
                      type="number"
                      min="0"
                      value={value}
                      onChange={(e) =>
                        handleStatChange(statKey, Number(e.target.value) || 0)
                      }
                      className="input input-bordered input-sm w-20 text-center shrink-0"
                    />

                    <button
                      type="button"
                      className="btn btn-xs btn-outline shrink-0"
                      onClick={() =>
                        setBaseStats((prev) => ({ ...prev, [statKey]: 0 }))
                      }
                      disabled={value === 0}
                    >
                      Min
                    </button>

                    <button
                      type="button"
                      className="btn btn-xs btn-outline shrink-0"
                      onClick={() => handleMaxStat(statKey)}
                      disabled={
                        remainingStats === 0 || value === MAX_SINGLE_STAT
                      }
                    >
                      Max
                    </button>
                  </div>
                );
              })}
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
              <legend className="fieldset-legend font-bold">
                Passive Selection
              </legend>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 items-center">
                  <label className="font-semibold">Race</label>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={raceId}
                    onChange={(e) => setRaceId(Number(e.target.value))}
                  >
                    {racesData.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 items-center">
                  <label className="font-semibold">Clan</label>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={clanId}
                    onChange={(e) => setClanId(Number(e.target.value))}
                  >
                    {clansData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 items-center">
                  <label className="font-semibold">Trait</label>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={traitId}
                    onChange={(e) => setTraitId(Number(e.target.value))}
                  >
                    {traitsData.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 items-center">
                  <label className="font-semibold">Aura</label>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={auraId}
                    onChange={(e) => setAuraId(Number(e.target.value))}
                  >
                    {aurasData.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 items-center">
                  <label className="font-semibold">Avatar</label>
                  <div className="flex items-center gap-2 min-w-0">
                    <select
                      className="select select-bordered select-sm flex-1 min-w-0"
                      value={avatarId}
                      onChange={(e) => {
                        const newId = Number(e.target.value);
                        setAvatarId(newId);
                        const next =
                          avatarsData.find((a) => a.id === newId) ||
                          avatarsData[0];
                        setAvatarLevel((lvl) => Math.min(lvl, next.maxLevel));
                      }}
                    >
                      {avatarsData.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      max={selectedAvatar.maxLevel}
                      value={clampedLevel}
                      onChange={(e) =>
                        setAvatarLevel(
                          Math.min(
                            selectedAvatar.maxLevel,
                            Math.max(1, Number(e.target.value) || 1),
                          ),
                        )
                      }
                      title="Avatar level"
                      className="input input-bordered input-sm w-16 text-center shrink-0"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 mt-6">
            <legend className="fieldset-legend font-bold">Milestones</legend>
            <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] gap-2 items-center">
              {MILESTONE_STATS.map(
                ({ key, label, textColor, activeColor, inactiveColor }) => {
                  const unlockedCount = milestones[key] ?? 0;
                  return (
                    <div key={key} className="contents">
                      <span
                        className={`font-semibold text-sm pr-2 ${textColor}`}
                      >
                        {label}
                      </span>
                      {MILESTONE_TIERS.map((value, i) => {
                        const tier = i + 1;
                        const unlocked = unlockedCount >= tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setMilestoneTier(key, tier)}
                            title={`+${value}% ${label} (tier ${tier})`}
                            className={`btn btn-xs border ${unlocked ? activeColor : inactiveColor}`}
                          >
                            +{value}%
                          </button>
                        );
                      })}
                    </div>
                  );
                },
              )}
            </div>
          </fieldset>
        </div>

        {/* Right Column - Buffs Breakdown + Stats Overview */}
        <div className="flex flex-col lg:flex-row gap-6">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 lg:w-72">
            <legend className="fieldset-legend font-bold">
              Buffs Breakdown
            </legend>
            <div className="flex flex-col gap-3 text-sm">
              {(
                [
                  {
                    type: "Race",
                    name: selectedRace.name,
                    parts: buffPartsMultiplicative(selectedRace.baseBuff),
                  },
                  {
                    type: "Clan",
                    name: selectedClan.name,
                    parts: buffPartsMultiplicative(selectedClan.baseBuff),
                  },
                  {
                    type: "Trait",
                    name: selectedTrait.name,
                    parts: buffPartsMultiplicative(selectedTrait.baseBuff),
                  },
                  {
                    type: "Aura",
                    name: selectedAura.name,
                    parts: buffPartsAdditive(selectedAura.baseBuff),
                  },
                  {
                    type: "Avatar",
                    name: `${selectedAvatar.name}${selectedAvatar.id !== 0 ? ` @ Lvl ${clampedLevel}` : ""}`,
                    parts: buffPartsAdditive(avatarAdd),
                  },
                  {
                    type: "Milestones",
                    name: "",
                    parts: buffPartsAdditive(milestoneAdd),
                  },
                ] as const
              ).map(({ type, name, parts }) => (
                <div key={type} className="flex flex-col gap-1">
                  <div className="font-semibold text-white">
                    {type}
                    {name && `: ${name}`}
                  </div>
                  {parts.length === 0 ? (
                    <div className="text-xs text-base-content/40 pl-1">
                      No buffs
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs pl-1">
                      {parts.map(({ stat, text }) => (
                        <span key={stat} className="text-success">
                          {text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 lg:w-72">
            <legend className="fieldset-legend font-bold">
              Stats Overview
            </legend>
            <div className="flex flex-col gap-1 text-sm font-semibold">
              {overviewSections.map(({ section, color, items }, sectionIdx) => (
                <div key={section} className="flex flex-col gap-1">
                  <span
                    className={`${color} font-bold text-base ${sectionIdx > 0 ? "mt-3" : ""}`}
                  >
                    {section}
                  </span>
                  {items.map(({ key, label }) => {
                    const val = combinedBuff(key);
                    const isDefault =
                      key === "extraGeppoJumps" ? val === 0 : val === 1;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyBestForStat(key as keyof BaseBuff)}
                        title={`Click to maximize ${label}`}
                        className="flex justify-between items-center w-full text-left rounded px-1 -mx-1 hover:bg-base-300 cursor-pointer"
                      >
                        <span className="text-white">{label}</span>
                        <span
                          className={
                            isDefault ? "text-base-content/30" : "text-success"
                          }
                        >
                          {formatBuff(key, val)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
        <legend className="fieldset-legend font-bold">Move Damage</legend>
        {(() => {
          const selectedMove = allMoves[moveId] || allMoves[0];
          const damageMult = combinedBuff("damage");
          const critMult = combinedBuff("criticalDamage");
          const baseHakiMult = hakiEnabled ? 1.1 + 0.01 * hakiLevel : 1;
          const specialBuffs = selectedMove.specialBuffs ?? [];
          const hasDoubleHaki = activeSpecialBuffs.some(
            (idx) => specialBuffs[idx]?.doubleHaki,
          );
          const hakiMult =
            hakiEnabled && hasDoubleHaki ? baseHakiMult * 2 : baseHakiMult;
          const specialMult = activeSpecialBuffs.reduce(
            (acc, idx) => acc * (specialBuffs[idx]?.buff ?? 1),
            1,
          );
          const computeDmg = (
            base: number,
            scale: Scale,
            statValue: number,
          ) => {
            const scaleMult = combinedBuff(scaleToBuffKey[scale]);
            const buffMult = damageMult * scaleMult * hakiMult * specialMult;
            if (statValue === 0) return base * buffMult;
            const constant = scaleConstants[scale];
            return base * (statValue * constant) * buffMult;
          };
          const rows = [selectedMove.M1, ...selectedMove.abilities];
          return (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <label className="font-semibold">Move</label>
                <select
                  className="select select-bordered select-sm max-w-xs"
                  value={moveId}
                  onChange={(e) => {
                    setMoveId(Number(e.target.value));
                    setActiveSpecialBuffs([]);
                  }}
                >
                  {allMoves.map((m, i) => (
                    <option key={i} value={i}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <label className="flex items-center gap-2 cursor-pointer ml-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={hakiEnabled}
                    onChange={(e) => setHakiEnabled(e.target.checked)}
                  />
                  <span className="font-semibold">Haki</span>
                </label>
                {hakiEnabled && (
                  <>
                    <label className="text-sm font-semibold">Lvl</label>
                    <input
                      type="number"
                      min={0}
                      max={25}
                      value={hakiLevel}
                      onChange={(e) =>
                        setHakiLevel(
                          Math.min(
                            25,
                            Math.max(0, Number(e.target.value) || 0),
                          ),
                        )
                      }
                      className="input input-bordered input-sm w-16 text-center"
                    />
                    <button
                      type="button"
                      className="btn btn-xs btn-outline"
                      onClick={() => setHakiLevel(25)}
                      disabled={hakiLevel === 25}
                    >
                      Max
                    </button>
                    <span className="text-xs text-base-content/60">
                      ×{hakiMult.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              {specialBuffs.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-semibold">Special:</span>
                  {specialBuffs.map((buff, idx) => {
                    const checked = activeSpecialBuffs.includes(idx);
                    return (
                      <label
                        key={idx}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={checked}
                          onChange={() => {
                            setActiveSpecialBuffs((prev) => {
                              if (prev.includes(idx)) {
                                return prev.filter((i) => i !== idx);
                              }
                              if (buff.isMode) {
                                const filtered = prev.filter(
                                  (i) => !specialBuffs[i]?.isMode,
                                );
                                return [...filtered, idx];
                              }
                              return [...prev, idx];
                            });
                          }}
                        />
                        <span className="text-sm">
                          {buff.name}{" "}
                          <span className="text-xs text-base-content/60">
                            ×{buff.buff}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="text-right">Base</th>
                      <th className="text-right">Crit Base</th>
                      <th className="text-right">Max</th>
                      <th className="text-right">Crit Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 || rows.every((r) => r.damage === 0) ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-base-content/40"
                        >
                          No move data
                        </td>
                      </tr>
                    ) : (
                      <>
                        {rows.map(({ name, damage, scale }, i) => {
                          const stat = baseStats[scaleToBaseStat[scale]];
                          const max = computeDmg(damage, scale, stat);
                          return (
                            <tr key={i}>
                              <td>
                                {name}{" "}
                                <span className="text-xs text-base-content/60">
                                  ({scale})
                                </span>
                              </td>
                              <td className="text-right">
                                {damage.toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(damage * critMult).toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(max).toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(max * critMult).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                        {(() => {
                          const totals = rows.reduce(
                            (acc, { damage, scale }) => {
                              const stat = baseStats[scaleToBaseStat[scale]];
                              const max = computeDmg(damage, scale, stat);
                              acc.base += damage;
                              acc.critBase += damage * critMult;
                              acc.max += max;
                              acc.critMax += max * critMult;
                              return acc;
                            },
                            { base: 0, critBase: 0, max: 0, critMax: 0 },
                          );
                          return (
                            <tr className="font-semibold border-t-2 border-base-300">
                              <td>Total</td>
                              <td className="text-right">
                                {Math.round(totals.base).toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(totals.critBase).toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(totals.max).toLocaleString()}
                              </td>
                              <td className="text-right">
                                {Math.round(totals.critMax).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })()}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
      </fieldset>

      {unlocked ? (
        <>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
            <legend className="fieldset-legend font-bold">
              Damage Reverse Calculator
            </legend>
            {(() => {
              const stat = baseStats[scaleToBaseStat[reverseScale]];
              const damageMult = combinedBuff("damage");
              const scaleMult = combinedBuff(scaleToBuffKey[reverseScale]);
              const hakiMult = hakiEnabled ? 1.1 + 0.01 * hakiLevel : 1;
              const buffMult = damageMult * scaleMult * hakiMult;
              const constant = scaleConstants[reverseScale];
              const fullMult =
                stat === 0 ? buffMult : stat * constant * buffMult;

              let output = 0;
              if (reverseDirection === "maxToBase") {
                output =
                  fullMult === 0 ? reverseInput : reverseInput / fullMult;
              } else {
                output = reverseInput * fullMult;
              }

              const inputLabel =
                reverseDirection === "maxToBase" ? "Max" : "Base";
              const outputLabel =
                reverseDirection === "maxToBase" ? "Base" : "Max";

              return (
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Direction</label>
                    <select
                      className="select select-bordered select-sm w-40"
                      value={reverseDirection}
                      onChange={(e) =>
                        setReverseDirection(
                          e.target.value as "maxToBase" | "baseToMax",
                        )
                      }
                    >
                      <option value="maxToBase">Max → Base</option>
                      <option value="baseToMax">Base → Max</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Scale</label>
                    <select
                      className="select select-bordered select-sm w-32"
                      value={reverseScale}
                      onChange={(e) =>
                        setReverseScale(e.target.value as Scale)
                      }
                    >
                      <option value="fist">Fist</option>
                      <option value="sword">Sword</option>
                      <option value="ability">Ability</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      {inputLabel}
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={reverseInput}
                      onChange={(e) =>
                        setReverseInput(Number(e.target.value) || 0)
                      }
                      className="input input-bordered input-sm w-32 text-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">
                      {outputLabel}
                    </label>
                    <div className="text-success font-semibold text-lg">
                      {output === 0
                        ? "0"
                        : output.toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                          })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </fieldset>
          <button
            type="button"
            onClick={lock}
            className="btn btn-xs btn-ghost self-start text-base-content/40"
          >
            lock
          </button>
        </>
      ) : showAccessInput ? (
        <form
          className="flex items-center gap-2 self-start"
          onSubmit={(e) => {
            e.preventDefault();
            if (tryUnlock(accessCode)) {
              setAccessError(false);
              setAccessCode("");
              setShowAccessInput(false);
            } else {
              setAccessError(true);
            }
          }}
        >
          <input
            type="password"
            placeholder="access code"
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value);
              setAccessError(false);
            }}
            className="input input-bordered input-sm w-40"
          />
          <button type="submit" className="btn btn-sm">
            unlock
          </button>
          {accessError && (
            <span className="text-error text-xs">invalid</span>
          )}
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowAccessInput(true)}
          className="btn btn-xs btn-ghost self-start text-base-content/40"
        >
          enter access code
        </button>
      )}
    </div>
  );
};

export default Calculator;
