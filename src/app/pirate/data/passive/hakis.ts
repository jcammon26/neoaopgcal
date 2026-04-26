import type { buffs } from "./types";

export const hakisData: buffs[] = [
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
    name: "Haki",
    baseBuff: {
      strengthBuff: 1.1,
      swordBuff: 1.1,
      abilityBuff: 1.1,
    },
    upgradeBuff: {
      upgradePerLevel: 0.01,
      maxLevel: 25,
    },
  },
];
