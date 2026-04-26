import { useState } from "react";
import {
  ranks,
  accessoriesData,
  passiveTraitsData,
} from "../../verse/data/stat_related";
import {
  hakisData,
  racesData,
  traitsData,
  clansData,
  KillMilestonesData,
  AbilityMilestonesData,
  FistMilestonesData,
  SwordMilestonesData,
} from "../data/passive";
import {
  swordsData,
  fruitsData,
  fightingsData,
  specsData,
} from "../../verse/data/moves";
import type { MoveSlot } from "../../verse/data/moves/types";
const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
  }
  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2).replace(/\.00$/, "") + "k";
  }
  return num.toFixed(2);
};

const statTypes = [
  {
    key: "strength",
    label: "Strength",
    className: "custom-text-strength",
    emoji: "\u{1F4AA}",
  },
  {
    key: "defense",
    label: "Defense",
    className: "custom-text-defense",
    emoji: "\u{1F6E1}\u{FE0F}",
  },
  {
    key: "sword",
    label: "Sword",
    className: "custom-text-sword",
    emoji: "\u{2694}\u{FE0F}",
  },
  {
    key: "special",
    label: "Special",
    className: "custom-text-special",
    emoji: "\u{2728}",
  },
];

const MAX_TOTAL_STATS = 24000;
const MAX_SINGLE_STAT = 7500;

const Calculator = () => {
  const [baseStats, setBaseStats] = useState({
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
  });

  const [ghostStats, setGhostStats] = useState({
    strength: 0,
    defense: 0,
    sword: 0,
    special: 0,
  });

  const [accessory, setAccessory] = useState({
    selectedId: 0,
    enhanceLevel: 0,
  });

  const [trait, setTrait] = useState({
    passiveId: 0,
  });

  const [hakiId, setHakiId] = useState(0);
  const [raceId, setRaceId] = useState(0);
  const [traitId, setTraitId] = useState(0);
  const [clanId, setClanId] = useState(0);
  const [killMilestoneId, setKillMilestoneId] = useState(0);
  const [abilityMilestoneId, setAbilityMilestoneId] = useState(0);
  const [fistMilestoneId, setFistMilestoneId] = useState(0);
  const [swordMilestoneId, setSwordMilestoneId] = useState(0);

  const [moveType, setMoveType] = useState<
    "sword" | "fruit" | "fighting" | "spec"
  >("sword");
  const [moveState, setMoveState] = useState({
    selectedId: 0,
    enhanceLevel: 0,
    blessing: false,
  });

  const [passiveLevels, setPassiveLevels] = useState({
    haki: 0,
    race: 0,
    trait: 0,
    killMilestone: 0,
    abilityMilestone: 0,
    fistMilestone: 0,
    swordMilestone: 0,
  });

  const selectedAccessory =
    accessoriesData.find((acc) => acc.id === accessory.selectedId) ||
    accessoriesData[0];

  const selectedPassiveTrait =
    passiveTraitsData.find((p) => p.id === trait.passiveId) ||
    passiveTraitsData[0];

  const selectedHaki = hakisData.find((h) => h.id === hakiId) || hakisData[0];
  const selectedRace = racesData.find((r) => r.id === raceId) || racesData[0];
  const selectedTrait = traitsData.find((t) => t.id === traitId) || traitsData[0];
  const selectedClan = clansData.find((c) => c.id === clanId) || clansData[0];
  const selectedKillMilestone = KillMilestonesData.find((k) => k.id === killMilestoneId) || KillMilestonesData[0];
  const selectedAbilityMilestone = AbilityMilestonesData.find((a) => a.id === abilityMilestoneId) || AbilityMilestonesData[0];
  const selectedFistMilestone = FistMilestonesData.find((f) => f.id === fistMilestoneId) || FistMilestonesData[0];
  const selectedSwordMilestone = SwordMilestonesData.find((s) => s.id === swordMilestoneId) || SwordMilestonesData[0];

  const getMoveData = () => {
    switch (moveType) {
      case "sword":
        return swordsData;
      case "fruit":
        return fruitsData;
      case "fighting":
        return fightingsData;
      case "spec":
        return specsData;
    }
  };
  const currentMoveData = getMoveData();
  const selectedMove =
    currentMoveData.find((m) => m.id === moveState.selectedId) ||
    currentMoveData[0];

  // Get the stat key based on move type
  const getMoveStatKey = (): "strength" | "sword" | "special" => {
    switch (moveType) {
      case "fighting":
        return "strength";
      case "sword":
        return "sword";
      case "fruit":
      case "spec":
        return "special";
    }
  };
  const calculateHitDamage = (
    damage: number,
    multiplier = 1,
    enhanceMult = 2.5,
    statKeyOverride?: "strength" | "sword" | "special",
  ) => {
    const statKey = statKeyOverride || getMoveStatKey();
    const baseStat = baseStats[statKey];
    const ghostStat = ghostStats[statKey];
    const accessoryStat =
      (selectedAccessory[statKey] || 0) +
      (selectedAccessory.increment
        ? selectedAccessory.increment * accessory.enhanceLevel
        : 0);

    const totalStat =
      baseStat > 0 ? baseStat + ghostStat + accessoryStat : 0;

    const damageMultiplier = getStatMultiplier(statKey);

    // Apply sword enhance to base damage
    let baseWithEnhance = damage * multiplier;
    if (moveType === "sword") {
      baseWithEnhance += moveState.enhanceLevel * enhanceMult;
    }

    let finalDamage =
      baseWithEnhance * (1 + totalStat / 75) * damageMultiplier;

    // Apply blessing
    if (moveType !== "fruit" && moveState.blessing) {
      finalDamage *= 2.5;
    }

    return finalDamage;
  };

  const renderMoveDamage = (input: number | MoveSlot | undefined) => {
    if (input === undefined) return null;

    const getScaleColor = (scale?: "strength" | "sword" | "special") => {
      const type = scale || getMoveStatKey();
      switch (type) {
        case "strength":
          return "#ff0000";
        case "sword":
          return "#ffff7f";
        case "special":
          return "#ff00bf";
        default:
          return "#ffffff";
      }
    };

    const getScaleGradient = (scales: Set<"strength" | "sword" | "special">) => {
      const scaleArray = Array.from(scales);
      if (scaleArray.length <= 1) return null;

      const gradientColors = scaleArray
        .map((s) => getScaleColor(s))
        .join(", ");
      return `linear-gradient(90deg, ${gradientColors})`;
    };

    const defaultUpgrade = typeof input === "object" ? input.upgrade ?? 2.5 : 2.5;
    const defaultScaleType =
      typeof input === "object" ? input.scaleType : undefined;

    // Determine the color class based on scaleType or default moveType
    const getScaleColorClass = (scale?: "strength" | "sword" | "special") => {
      const type = scale || getMoveStatKey();
      return `custom-text-${type}`;
    };

    if (typeof input === "number") {
      return (
        <span className={`${getScaleColorClass()} font-semibold`}>
          {formatNumber(calculateHitDamage(input, 1, 2.5))}
        </span>
      );
    }

    if (!input.hits || input.hits.length === 0) {
      return <span className="font-semibold">{input.desc || "0"}</span>;
    }

    const totalDamage = input.hits.reduce((sum, hit) => {
      const hitUpgrade = hit.upgrade ?? defaultUpgrade;
      const hitScaleType = hit.scaleType ?? defaultScaleType;
      return (
        sum +
        calculateHitDamage(
          hit.damage,
          hit.multiplier || 1,
          hitUpgrade,
          hitScaleType,
        )
      );
    }, 0);

    const firstHitUpgrade = input.hits[0].upgrade ?? defaultUpgrade;
    const firstHitScaleType = input.hits[0].scaleType ?? defaultScaleType;
    const firstHit = calculateHitDamage(
      input.hits[0].damage,
      input.hits[0].multiplier || 1,
      firstHitUpgrade,
      firstHitScaleType,
    );

    const uniqueScales = new Set<"strength" | "sword" | "special">();
    if (typeof input === "object" && input.hits) {
      input.hits.forEach((hit) => {
        uniqueScales.add(hit.scaleType || defaultScaleType || getMoveStatKey());
      });
    } else {
      uniqueScales.add(defaultScaleType || getMoveStatKey());
    }

    const gradient = getScaleGradient(uniqueScales);

    const firstHitColorClass = getScaleColorClass(firstHitScaleType);
    const allSameScale = input.hits.every(
      (hit) =>
        (hit.scaleType ?? defaultScaleType) ===
        (input.hits[0].scaleType ?? defaultScaleType),
    );
    const totalColorClass = allSameScale
      ? firstHitColorClass
      : getScaleColorClass(defaultScaleType);

    const lineStyle = gradient
      ? {
          backgroundImage: gradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }
      : {};

    if (input.hits.length === 1) {
      return (
        <span className={`${firstHitColorClass} font-semibold`} style={lineStyle}>
          {formatNumber(totalDamage)}
        </span>
      );
    }

    return (
      <span className="font-semibold" style={lineStyle}>
        <span className={gradient ? "" : firstHitColorClass}>
          {formatNumber(firstHit)}
        </span>
        {" - "}
        <span className={gradient ? "" : totalColorClass}>
          {formatNumber(totalDamage)}
        </span>
        {" | "}
        {input.hits.length} hits
      </span>
    );
  };

  const baseDmgMult =
    (selectedPassiveTrait.dmgMult || 1);

  const getPassiveMult = (
    selectedPassive: any,
    level: number,
    statKey: string
  ) => {
    if (!selectedPassive) return 1;
    const buffKey = statKey === "special" ? "abilityBuff" : `${statKey}Buff`;
    let base = selectedPassive.baseBuff?.[buffKey] || 1;
    
    const upgrade = selectedPassive.upgradeBuff;
    if (upgrade?.upgradePerLevel && level > 0) {
      base += upgrade.upgradePerLevel * level;
    }
    return base;
  };

  const getStatMultiplier = (statKey: string) => {
    const hakiMult = getPassiveMult(selectedHaki, passiveLevels.haki, statKey);
    const raceMult = getPassiveMult(selectedRace, passiveLevels.race, statKey);
    const traitMult = getPassiveMult(selectedTrait, passiveLevels.trait, statKey);
    const clanMult = getPassiveMult(selectedClan, 0, statKey);
    const killMult = getPassiveMult(selectedKillMilestone, passiveLevels.killMilestone, statKey);
    const abilityMult = getPassiveMult(selectedAbilityMilestone, passiveLevels.abilityMilestone, statKey);
    const fistMult = getPassiveMult(selectedFistMilestone, passiveLevels.fistMilestone, statKey);
    const swordMult = getPassiveMult(selectedSwordMilestone, passiveLevels.swordMilestone, statKey);

    return baseDmgMult * hakiMult * raceMult * traitMult * clanMult * killMult * abilityMult * fistMult * swordMult;
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

  const handleBestBuff = (statKey: "strength" | "sword" | "special") => {
    const buffKey = (statKey === "special" ? "abilityBuff" : `${statKey}Buff`) as
      | "strengthBuff"
      | "swordBuff"
      | "abilityBuff";

    // Find best passive buffs
    const bestHaki = hakisData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestRace = racesData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestTrait = traitsData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestClan = clansData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestKillMilestone = KillMilestonesData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestAbilityMilestone = AbilityMilestonesData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestFistMilestone = FistMilestonesData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );
    const bestSwordMilestone = SwordMilestonesData.reduce((best, current) =>
      (current.baseBuff?.[buffKey] || 1) > (best.baseBuff?.[buffKey] || 1) ? current : best,
    );

    // Find best accessory for this stat
    const bestAccessory = accessoriesData.reduce((best, current) =>
      (current[statKey] || 0) > (best[statKey] || 0) ? current : best,
    );

    // Find best passive trait (highest dmgMult)
    const bestPassiveTrait = passiveTraitsData.reduce((best, current) =>
      (current.dmgMult || 1) > (best.dmgMult || 1) ? current : best,
    );

    // Find best rank (highest value)
    const bestRank = ranks.reduce((best, current) =>
      current.value > best.value ? current : best,
    );

    // Set all passive buffs
    setHakiId(bestHaki.id);
    setRaceId(bestRace.id);
    setTraitId(bestTrait.id);
    setClanId(bestClan.id);
    setKillMilestoneId(bestKillMilestone.id);
    setAbilityMilestoneId(bestAbilityMilestone.id);
    setFistMilestoneId(bestFistMilestone.id);
    setSwordMilestoneId(bestSwordMilestone.id);

    setPassiveLevels({
      haki: bestHaki.upgradeBuff?.maxLevel || 0,
      race: bestRace.upgradeBuff?.maxLevel || 0,
      trait: bestTrait.upgradeBuff?.maxLevel || 0,
      killMilestone: bestKillMilestone.upgradeBuff?.maxLevel || 0,
      abilityMilestone: bestAbilityMilestone.upgradeBuff?.maxLevel || 0,
      fistMilestone: bestFistMilestone.upgradeBuff?.maxLevel || 0,
      swordMilestone: bestSwordMilestone.upgradeBuff?.maxLevel || 0,
    });

    // Set accessory with max enhance
    setAccessory({ selectedId: bestAccessory.id, enhanceLevel: 10 });

    // Set passive trait
    setTrait({ passiveId: bestPassiveTrait.id });

    // Set ghost rank for this stat
    setGhostStats((prev) => ({ ...prev, [statKey]: bestRank.value }));

    // Max the base stat
    handleMaxStat(statKey);
  };

  const renderPassiveSelector = (
    label: string,
    selectedItem: any,
    selectedValue: number,
    onSelect: (val: number) => void,
    levelValue: number,
    onLevelChange: (val: number) => void,
    dataList: any[]
  ) => {
    const strengthMult = getPassiveMult(selectedItem, levelValue, "strength");
    const swordMult = getPassiveMult(selectedItem, levelValue, "sword");
    const abilityMult = getPassiveMult(selectedItem, levelValue, "special");

    return (
      <div className="mb-4">
        <label className="label">
          <span className="font-bold flex items-center gap-2 flex-wrap">
            {label}
            {strengthMult > 1 && (
              <span className="custom-text-strength">
                💪 {parseFloat(strengthMult.toFixed(2))}x
              </span>
            )}
            {swordMult > 1 && (
              <span className="custom-text-sword">
                ⚔️ {parseFloat(swordMult.toFixed(2))}x
              </span>
            )}
            {abilityMult > 1 && (
              <span className="custom-text-special">
                ✨ {parseFloat(abilityMult.toFixed(2))}x
              </span>
            )}
          </span>
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedValue}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          {dataList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        
        {selectedItem?.upgradeBuff?.maxLevel && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold w-12 text-right">Lv:</span>
            <input
              type="range"
              min="0"
              max={selectedItem.upgradeBuff.maxLevel}
              value={levelValue}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="range range-xs range-primary flex-1"
            />
            <input
              type="number"
              min="0"
              max={selectedItem.upgradeBuff.maxLevel}
              value={levelValue}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="input input-bordered input-xs w-16 text-center"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Column - Stats, Accessory, Trait */}
      <div className="flex-1">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
          <legend className="fieldset-legend font-bold">Base Stats</legend>

          {statTypes.map(({ key, label, className, emoji }) => {
            const statKey = key as keyof typeof baseStats;
            const value = baseStats[statKey];
            const rankValue = ghostStats[statKey];
            const accessoryBaseStat = selectedAccessory[statKey] || 0;
            const accessoryEnhancedStat =
              accessoryBaseStat +
              (selectedAccessory.increment
                ? selectedAccessory.increment * accessory.enhanceLevel
                : 0);

            return (
              <div key={statKey} className="flex items-center gap-3 mb-4">
                <div
                  className={`flex items-center gap-2 font-bold ${className}`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span>{label}</span>
                </div>

                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) =>
                    handleStatChange(statKey, Number(e.target.value) || 0)
                  }
                  className="input input-bordered w-28 text-center"
                />

                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() =>
                    setBaseStats((prev) => ({ ...prev, [statKey]: 0 }))
                  }
                  disabled={value === 0}
                >
                  Min
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => handleMaxStat(statKey)}
                  disabled={remainingStats === 0 || value === MAX_SINGLE_STAT}
                >
                  Max
                </button>

                {statKey !== "defense" && (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      handleBestBuff(
                        statKey as "strength" | "sword" | "special",
                      )
                    }
                  >
                    Best
                  </button>
                )}
              </div>
            );
          })}

        </fieldset>
      </div>

      {/* Right Column - Passives */}
      <div className="lg:w-80">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
          <legend className="fieldset-legend font-bold">Passives</legend>
          {renderPassiveSelector("Haki", selectedHaki, hakiId, setHakiId, passiveLevels.haki, (val) => setPassiveLevels(prev => ({...prev, haki: val})), hakisData)}
          {renderPassiveSelector("Race", selectedRace, raceId, setRaceId, passiveLevels.race, (val) => setPassiveLevels(prev => ({...prev, race: val})), racesData)}
          {renderPassiveSelector("Trait", selectedTrait, traitId, setTraitId, passiveLevels.trait, (val) => setPassiveLevels(prev => ({...prev, trait: val})), traitsData)}
          {renderPassiveSelector("Clan", selectedClan, clanId, setClanId, 0, () => {}, clansData)}
          {renderPassiveSelector("Kill Milestone", selectedKillMilestone, killMilestoneId, setKillMilestoneId, passiveLevels.killMilestone, (val) => setPassiveLevels(prev => ({...prev, killMilestone: val})), KillMilestonesData)}
          {renderPassiveSelector("Ability Milestone", selectedAbilityMilestone, abilityMilestoneId, setAbilityMilestoneId, passiveLevels.abilityMilestone, (val) => setPassiveLevels(prev => ({...prev, abilityMilestone: val})), AbilityMilestonesData)}
          {renderPassiveSelector("Fist Milestone", selectedFistMilestone, fistMilestoneId, setFistMilestoneId, passiveLevels.fistMilestone, (val) => setPassiveLevels(prev => ({...prev, fistMilestone: val})), FistMilestonesData)}
          {renderPassiveSelector("Sword Milestone", selectedSwordMilestone, swordMilestoneId, setSwordMilestoneId, passiveLevels.swordMilestone, (val) => setPassiveLevels(prev => ({...prev, swordMilestone: val})), SwordMilestonesData)}
        </fieldset>
      </div>
    </div>
  );
};

export default Calculator;
