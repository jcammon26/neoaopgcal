import { buffs } from "./types";

export const traitsData: buffs[] = [
  { id: 0, name: "None", baseBuff: {} },
  { id: 1, name: "Swift", baseBuff: { cooldownReduction: 1.1 } },
  { id: 2, name: "Sailor", baseBuff: { maxHealth: 1.05, damage: 1.15 } },
  { id: 3, name: "Brawler", baseBuff: { maxHealth: 1.05, damage: 1.15 } },
  {
    id: 4,
    name: "Haki Striker",
    baseBuff: { maxHealth: 1.1, damage: 1.15, cooldownReduction: 1.05 },
  },
  {
    id: 5,
    name: "Rookie Crusher",
    baseBuff: { maxHealth: 1.15, damage: 1.25 },
  },
  {
    id: 6,
    name: "Marine Captain",
    baseBuff: { maxHealth: 1.2, damage: 1.2 },
  },
  {
    id: 7,
    name: "Black Blade",
    baseBuff: { maxHealth: 1.1, damage: 1.35 },
  },
  {
    id: 8,
    name: "Grand Line Reaper",
    baseBuff: { maxHealth: 1.15, damage: 1.25, cooldownReduction: 1.05 },
  },
  {
    id: 9,
    name: "Pirate Hunter",
    baseBuff: { maxHealth: 1.15, damage: 1.3 },
  },
  {
    id: 10,
    name: "Cipher Pol",
    baseBuff: { maxHealth: 1.35, damage: 1.3, cooldownReduction: 1.1 },
  },
  {
    id: 11,
    name: "Vice Admiral",
    baseBuff: { maxHealth: 1.35, damage: 1.4 },
  },
  {
    id: 12,
    name: "Supernova",
    baseBuff: { maxHealth: 1.55, damage: 1.3 },
  },
  {
    id: 13,
    name: "Conqueror",
    baseBuff: { maxHealth: 1.4, damage: 1.4, cooldownReduction: 1.15 },
  },
  {
    id: 14,
    name: "Warlord",
    baseBuff: { maxHealth: 1.45, damage: 1.5, cooldownReduction: 1.1 },
  },
  {
    id: 15,
    name: "Admiral",
    baseBuff: { maxHealth: 1.7, damage: 1.45 },
  },
  {
    id: 16,
    name: "Fleet Admiral",
    baseBuff: { maxHealth: 1.5, damage: 1.55, cooldownReduction: 1.25 },
  },
  {
    id: 17,
    name: "Sun God",
    baseBuff: { maxHealth: 1.5, damage: 1.8, cooldownReduction: 1.2 },
  },
  {
    id: 18,
    name: "Dark King",
    baseBuff: { maxHealth: 1.6, damage: 1.8, cooldownReduction: 1.2 },
  },
  {
    id: 19,
    name: "Holy Knight",
    baseBuff: { maxHealth: 1.65, damage: 1.75, cooldownReduction: 1.2 },
  },
  {
    id: 20,
    name: "Gorosei",
    baseBuff: { maxHealth: 1.85, damage: 1.65, cooldownReduction: 1.15 },
  },
  {
    id: 21,
    name: "World King",
    baseBuff: { maxHealth: 1.6, damage: 2.3, cooldownReduction: 1.3 },
  },
  {
    id: 22,
    name: "Celestial",
    baseBuff: { maxHealth: 1.65, damage: 2.2, cooldownReduction: 1.3 },
  },
  {
    id: 23,
    name: "Empty Throne",
    baseBuff: { maxHealth: 1.7, damage: 2, cooldownReduction: 1.3 },
  },
  {
    id: 24,
    name: "Sea Emperor",
    baseBuff: { maxHealth: 1.75, damage: 2.1, cooldownReduction: 1.3 },
  },
  {
    id: 25,
    name: "Pirate King",
    baseBuff: { maxHealth: 2, damage: 1.9, cooldownReduction: 1.25 },
  },
];
