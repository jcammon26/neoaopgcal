import type { buffs } from "./types";

export const clansData: buffs[] = [
  {
    id: 0,
    name: "None",
    baseBuff: {},
  },
  {
    id: 1,
    name: "Kozuki",
    baseBuff: { maxHealth: 1.1, damage: 1.07, exp: 1.1 },
  },
  {
    id: 2,
    name: "Uzumaki",
    baseBuff: { maxHealth: 1.15, damage: 1.1, coins: 1.1, gems: 1.1 },
  },
  {
    id: 3,
    name: "Soul Reaper",
    baseBuff: { maxHealth: 1.2, damage: 1.15, gems: 1.15 },
  },
  {
    id: 4,
    name: "Germa",
    baseBuff: {
      maxHealth: 1.25,
      damage: 1.2,
      damageReduction: 1.05,
      lifesteal: 1.02,
    },
  },
  {
    id: 5,
    name: "Limitless",
    baseBuff: {
      maxHealth: 1.27,
      damage: 1.17,
      fistDamage: 1.05,
      gems: 1.2,
    },
  },
  {
    id: 6,
    name: "Kuchiki",
    baseBuff: {
      maxHealth: 1.35,
      damage: 1.25,
      fistDamage: 1.07,
      damageReduction: 1.1,
    },
  },
  {
    id: 7,
    name: "Donquixote",
    baseBuff: {
      maxHealth: 1.4,
      damage: 1.27,
      swordDamage: 1.07,
    },
  },
  {
    id: 8,
    name: "Uchiha",
    baseBuff: {
      maxHealth: 1.45,
      damage: 1.3,
      swordDamage: 1.1,
    },
  },
  {
    id: 9,
    name: "Otutsuki",
    baseBuff: {
      maxHealth: 1.5,
      damage: 1.32,
      swordDamage: 1.1,
    },
  },
  {
    id: 10,
    name: "Dawn",
    baseBuff: {
      maxHealth: 1.5,
      damage: 1.35,
      fistDamage: 1.1,
    },
  },
  {
    id: 11,
    name: "Celestial Dragon",
    baseBuff: {
      maxHealth: 1.55,
      damage: 1.35,
      swordDamage: 1.12,
    },
  },
  {
    id: 12,
    name: "D. Clan",
    baseBuff: {
      maxHealth: 1.5,
      damage: 1.4,
      fistDamage: 1.12,
    },
  },
];
