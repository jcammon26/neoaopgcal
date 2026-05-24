import type { buffs } from "./types";

export const racesData: buffs[] = [
  {
    id: 0,
    name: "Human",
    baseBuff: {},
  },
  {
    id: 1,
    name: "Skypiean",
    baseBuff: { extraGeppoJumps: 2 },
  },
  {
    id: 2,
    name: "Fishman",
    baseBuff: { exp: 1.15, coins: 1.15 },
  },
  {
    id: 3,
    name: "Giant",
    baseBuff: { maxHealth: 1.15, damage: 1.15 },
  },
  {
    id: 4,
    name: "Mink",
    baseBuff: { walkSpeed: 1.2, jumpHeight: 1.2 },
  },
  {
    id: 5,
    name: "Vampire",
    baseBuff: { maxHealth: 1.3, damage: 1.25, lifesteal: 1.05 },
  },
  {
    id: 6,
    name: "Demon",
    baseBuff: { maxHealth: 1.35, damage: 1.3, walkSpeed: 1.2 },
  },
  {
    id: 7,
    name: "Quincy",
    baseBuff: { maxHealth: 1.4, damage: 1.35 },
    specialBuff: { name: "Quincy", buff: 1.2 },
  },
  {
    id: 8,
    name: "Seraph",
    baseBuff: { maxHealth: 1.45, damage: 1.4 },
    specialBuff: { name: "Jinwoo", buff: 1.2 },
  },
  {
    id: 9,
    name: "Shinigami",
    baseBuff: { maxHealth: 1.5, damage: 1.45 },
    specialBuff: { name: "Aizen", buff: 1.2 },
  },
  {
    id: 10,
    name: "Reaper",
    baseBuff: { maxHealth: 1.55, damage: 1.5 },
    specialBuff: { name: "Shadow", buff: 1.2 },
  },
  {
    id: 11,
    name: "Hollow",
    baseBuff: { maxHealth: 1.6, damage: 1.5 },
    specialBuff: { name: "Hollow", buff: 1.2 },
  },
  {
    id: 12,
    name: "Kitsune",
    baseBuff: {
      maxHealth: 1.6,
      damage: 1.5,
      swordDamage: 1.1,
      fistDamage: 1.1,
      luck: 1.25,
    },
  },
  {
    id: 13,
    name: "Sea King",
    baseBuff: {
      maxHealth: 1.65,
      damage: 1.6,
      swordDamage: 1.17,
      lifesteal: 1.05,
    },
  },
  {
    id: 14,
    name: "Oni",
    baseBuff: {
      maxHealth: 1.65,
      damage: 1.55,
      fistDamage: 1.2,
      damageReduction: 1.1,
    },
  },
  {
    id: 15,
    name: "Slime",
    baseBuff: {
      maxHealth: 1.7,
      damage: 1.65,
      swordDamage: 1.17,
      damageReduction: 1.1,
      lifesteal: 1.03,
    },
  },
  {
    id: 16,
    name: "Lunarian",
    baseBuff: {
      maxHealth: 1.8,
      damage: 1.75,
      swordDamage: 1.2,
      damageReduction: 1.1,
      lifesteal: 1.03,
    },
  },
  {
    id: 17,
    name: "Buccaneer",
    baseBuff: {
      maxHealth: 1.8,
      damage: 1.75,
      swordDamage: 1.2,
      damageReduction: 1.1,
      lifesteal: 1.03,
    },
  },
  {
    id: 18,
    name: "Imu",
    baseBuff: {
      maxHealth: 1.85,
      damage: 1.8,
      fistDamage: 1.22,
      damageReduction: 1.1,
      lifesteal: 1.02,
    },
  },
];
