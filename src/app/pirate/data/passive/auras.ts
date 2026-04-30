import type { buffs } from "./types";

export const aurasData: buffs[] = [
  { id: 0, name: "None", baseBuff: {} },
  {
    id: 1,
    name: "Insanity",
    baseBuff: { damage: 0.05, criticalDamageChance: 0.1, lifesteal: 0.07 },
  },
  {
    id: 2,
    name: "Multi Star",
    baseBuff: { damage: 0.05, criticalDamageChance: 0.08, maxHealth: 0.05 },
  },
  {
    id: 3,
    name: "Petal Flow",
    baseBuff: { damage: 0.05, gems: 0.1, extraGeppoJumps: 2 },
  },
  {
    id: 4,
    name: "Jester's Gambit",
    baseBuff: { damage: 0.07, coins: 0.1 },
  },
  {
    id: 5,
    name: "Blue Flower",
    baseBuff: { damage: 0.09, luck: 0.07 },
  },
  {
    id: 6,
    name: "Love Burst",
    baseBuff: { damage: 0.09, exp: 0.05, criticalDamageChance: 0.05 },
  },
  {
    id: 7,
    name: "Sokuna's Presence",
    baseBuff: { damage: 0.09, dropAmount: 0.1, luck: 0.02 },
  },
  {
    id: 8,
    name: "Absolute Zero",
    baseBuff: { damage: 0.11, coins: 0.15, luck: 0.03 },
  },
  {
    id: 9,
    name: "Fallen Halo",
    baseBuff: { damage: 0.11, luck: 0.15, criticalDamageChance: 0.2 },
  },
  {
    id: 10,
    name: "Solar Flare",
    baseBuff: { damage: 0.11, maxHealth: 0.15, lifesteal: 0.03 },
  },
  {
    id: 11,
    name: "Crimson Vortex",
    baseBuff: {
      damage: 0.13,
      cooldownReduction: 0.05,
      criticalDamageChance: 0.08,
    },
  },
  {
    id: 12,
    name: "Hellflare",
    baseBuff: { damage: 0.13, dropAmount: 0.12 },
  },
  {
    id: 13,
    name: "Green Curse",
    baseBuff: {
      damage: 0.14,
      lifesteal: 0.05,
      walkSpeed: 0.1,
      criticalDamageChance: 0.03,
      extraGeppoJumps: 3,
    },
  },
  {
    id: 14,
    name: "Kaioken",
    baseBuff: {
      damage: 0.14,
      abilityDamage: 0.05,
      cooldownReduction: 0.03,
      lifesteal: 0.03,
    },
  },
  {
    id: 15,
    name: "Glitch",
    baseBuff: {
      damage: 0.12,
      damageReduction: 0.06,
      luck: 0.02,
      criticalDamageChance: 0.2,
      gems: 0.04,
      lifesteal: 0.06,
      abilityDamage: 0.03,
    },
  },
  {
    id: 16,
    name: "Susanoo Abyss",
    baseBuff: {
      damage: 0.15,
      damageReduction: 0.1,
      luck: 0.03,
      criticalDamageChance: 0.22,
      gems: 0.05,
      lifesteal: 0.08,
    },
  },
];
