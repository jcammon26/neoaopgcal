import type { avatar } from "./types";

export const avatarsData: avatar[] = [
  {
    id: 0,
    name: "None",
    maxLevel: 1,
    buffs: [{ stat: "damage", base: 0, perLevel: 0 }],
  },
  {
    id: 1,
    name: "Bruck",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.05, perLevel: 0.0032 },
      { stat: "criticalDamageChance", base: 0.01, perLevel: 0.0009 },
    ],
  },
  {
    id: 2,
    name: "Control Devil",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.02, perLevel: 0.0035 },
      { stat: "criticalDamageChance", base: 0.01, perLevel: 0.0009 },
    ],
  },
  {
    id: 3,
    name: "Ice Elf",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.04, perLevel: 0.0032 },
      { stat: "luck", base: 0.05, perLevel: 0.001 },
    ],
  },
  {
    id: 4,
    name: "Yuji",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.03, perLevel: 0.0029 },
      { stat: "fistDamage", base: 0.05, perLevel: 0.0005 },
    ],
  },
  {
    id: 5,
    name: "Tatsumachi",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.14, perLevel: 0.0066 },
      { stat: "damageReduction", base: 0.05, perLevel: 0.0015 },
    ],
  },
  {
    id: 6,
    name: "Itchigo",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.11, perLevel: 0.0069 },
      { stat: "damageReduction", base: 0.05, perLevel: 0.0015 },
    ],
  },
  {
    id: 7,
    name: "Quincy King",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.12, perLevel: 0.0068 },
      { stat: "damageReduction", base: 0.05, perLevel: 0.0015 },
    ],
  },
  {
    id: 8,
    name: "Uzopp",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.13, perLevel: 0.0067 },
      { stat: "damageReduction", base: 0.05, perLevel: 0.0015 },
    ],
  },
  {
    id: 9,
    name: "Gravity Man",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.2, perLevel: 0.01 },
      { stat: "swordDamage", base: 0.05, perLevel: 0.0025 },
    ],
  },
  {
    id: 10,
    name: "Igros",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.2, perLevel: 0.01 },
      { stat: "coins", base: 0.1, perLevel: 0.0015 },
    ],
  },
  {
    id: 11,
    name: "Saitamuh",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.2, perLevel: 0.01 },
      { stat: "swordDamage", base: 0.05, perLevel: 0.0025 },
    ],
  },
  {
    id: 12,
    name: "Bruly",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.22, perLevel: 0.01 },
      { stat: "coins", base: 0.1, perLevel: 0.0015 },
    ],
  },
  {
    id: 13,
    name: "Gilgamash",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.35, perLevel: 0.01 },
      { stat: "lifesteal", base: 0.01, perLevel: 0.0009 },
    ],
  },
  {
    id: 14,
    name: "Narto",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.25, perLevel: 0.01 },
      { stat: "lifesteal", base: 0.01, perLevel: 0.0009 },
    ],
  },
  {
    id: 15,
    name: "Joy Boy",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.7, perLevel: 0.01 },
      { stat: "lifesteal", base: 0.11, perLevel: 0.0009 },
    ],
  },
  {
    id: 16,
    name: "Mahogara",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 0.4, perLevel: 0.01 },
      { stat: "lifesteal", base: 0.11, perLevel: 0.0009 },
    ],
  },
  {
    id: 17,
    name: "Jigan",
    maxLevel: 100,
    buffs: [
      { stat: "damage", base: 1.0, perLevel: 0.01 },
      { stat: "cooldownReduction", base: 0.03, perLevel: 0.0017 },
      { stat: "jumpHeight", base: 0.05, perLevel: 0.0045 },
      { stat: "maxHealth", base: 0.1, perLevel: 0.003 },
      { stat: "abilityDamage", base: 0.1, perLevel: 0.002 },
      { stat: "criticalDamage", base: 0.1, perLevel: 0.004 },
    ],
  },
];
