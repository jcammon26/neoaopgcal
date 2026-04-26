import type { buffs } from "./types";

export const racesData: buffs[] = [
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
    name: "Giant",
    baseBuff: {
      strengthBuff: 1.15,
      swordBuff: 1.15,
      abilityBuff: 1.15,
    },
  },
  {
    id: 2,
    name: "Vampire",
    baseBuff: {
      strengthBuff: 1.25,
      swordBuff: 1.25,
      abilityBuff: 1.25,
    },
  },
  {
    id: 3,
    name: "Demon",
    baseBuff: {
      strengthBuff: 1.3,
      swordBuff: 1.3,
      abilityBuff: 1.3,
    },
  },
  {
    id: 4,
    name: "Quincy",
    baseBuff: {
      strengthBuff: 1.35,
      swordBuff: 1.35,
      abilityBuff: 1.35,
    },
    specialBuff: {
      name: "Quincy",
      buff: 1.2,
    },
  },
  {
    id: 5,
    name: "Seraph",
    baseBuff: {
      strengthBuff: 1.4,
      swordBuff: 1.4,
      abilityBuff: 1.4,
    },
    specialBuff: {
      name: "Jinwoo",
      buff: 1.2,
    },
  },
  {
    id: 6,
    name: "Shinigami",
    baseBuff: {
      strengthBuff: 1.45,
      swordBuff: 1.45,
      abilityBuff: 1.45,
    },
    specialBuff: {
      name: "Aizen",
      buff: 1.2,
    },
  },
  {
    id: 7,
    name: "Reaper",
    baseBuff: {
      strengthBuff: 1.5,
      swordBuff: 1.5,
      abilityBuff: 1.5,
    },
    specialBuff: {
      name: "Shadow",
      buff: 1.2,
    },
  },
  {
    id: 8,
    name: "Hollow",
    baseBuff: {
      strengthBuff: 1.5,
      swordBuff: 1.5,
      abilityBuff: 1.5,
    },
    specialBuff: {
      name: "Hollow",
      buff: 1.2,
    },
  },
  {
    id: 9,
    name: "Kitsune",
    baseBuff: {
      strengthBuff: 1.5 * 1.1,
      swordBuff: 1.5 * 1.1,
      abilityBuff: 1.5,
    },
  },
  {
    id: 10,
    name: "Sea King",
    baseBuff: {
      strengthBuff: 1.6,
      swordBuff: 1.6 * 1.17,
      abilityBuff: 1.6,
    },
  },
  {
    id: 11,
    name: "Oni",
    baseBuff: {
      strengthBuff: 1.55 * 1.2,
      swordBuff: 1.55,
      abilityBuff: 1.55,
    },
  },
  {
    id: 12,
    name: "Slime",
    baseBuff: {
      strengthBuff: 1.65,
      swordBuff: 1.65 * 1.17,
      abilityBuff: 1.65,
    },
  },
  {
    id: 13,
    name: "Lunarian",
    baseBuff: {
      strengthBuff: 1.75,
      swordBuff: 1.75 * 1.2,
      abilityBuff: 1.75,
    },
  },
  {
    id: 14,
    name: "Buccaneer",
    baseBuff: {
      strengthBuff: 1.75 * 1.2,
      swordBuff: 1.75,
      abilityBuff: 1.75,
    },
  },
  {
    id: 15,
    name: "Imu",
    baseBuff: {
      strengthBuff: 1.8 * 1.22,
      swordBuff: 1.8,
      abilityBuff: 1.8,
    },
  },
];
