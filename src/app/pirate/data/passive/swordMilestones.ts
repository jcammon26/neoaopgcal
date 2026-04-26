import type { buffs } from "./types";

export const SwordMilestonesData: buffs[] = [
  {
    id: 0,
    name: "None",
    baseBuff: {
      strengthBuff: 1,
      swordBuff: 1,
      abilityBuff: 1,
    },
  },
  {
    id: 1,
    name: "Sword Milestone",
    baseBuff: {
      strengthBuff: 1,
      swordBuff: 1,
      abilityBuff: 1,
    },
    upgradeBuff: {
      upgradePerLevel: 0.05,
      maxLevel: 5,
    },
  },
];
