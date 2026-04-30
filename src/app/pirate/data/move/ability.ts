import { move } from "./types";

export const abilityMoves: move[] = [
  {
    id: 0,
    name: "Gojo (Weak)",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Weak Red", damage: 22, scale: "ability" },
      { name: "Weak Blue", damage: 25, scale: "ability" },
      { name: "Weak Run", damage: 7, scale: "ability" },
      { name: "Weak Hollow Purple", damage: 288, scale: "ability" },
    ],
  },
  {
    id: 1,
    name: "Sukuna (Weak)",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Weak Cleave", damage: 52, scale: "ability" },
      { name: "Weak Dismantle", damage: 42, scale: "ability" },
      { name: "Weak Fire Arrow", damage: 269, scale: "ability" },
    ],
  },
  {
    id: 2,
    name: "Goku (Weak)",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Weak Spirit Shot", damage: 48, scale: "ability" },
      { name: "Weak Kamehua", damage: 900, scale: "ability" },
      { name: "Weak Spirit Bomb", damage: 715, scale: "ability" },
    ],
  },
  {
    id: 3,
    name: "Aizen (Weak)",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Despair", damage: 28, scale: "ability" },
      { name: "Small Kurohitsugi", damage: 35, scale: "ability" },
      { name: "Big Kurohitsugi", damage: 36, scale: "ability" },
      { name: "Hado 90", damage: 246, scale: "ability" },
    ],
  },
  {
    id: 4,
    name: "Stark Gun",
    M1: { name: "M1", damage: 50, scale: "ability" },
    abilities: [
      { name: "Z", damage: 250, scale: "ability" },
      { name: "X", damage: 500, scale: "ability" },
      { name: "R", damage: 1200, scale: "ability" },
    ],
  },
];
