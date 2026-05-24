import { move } from "./types";

export const fruitMoves: move[] = [
  {
    id: 0,
    name: "Gum",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Pistol", damage: 12, scale: "ability" },
      { name: "Bazooka", damage: 17.6, scale: "ability" },
      { name: "Barrage", damage: 51, scale: "ability" },
    ],
  },
  {
    id: 1,
    name: "Bomb",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Explosion Shot", damage: 16, scale: "ability" },
      { name: "Nose Cannon", damage: 20.8, scale: "ability" },
    ],
  },
  {
    id: 2,
    name: "Dragon",
    M1: { name: "M1", damage: 0, scale: "ability" },
    abilities: [
      { name: "Boro Breath", damage: 75, scale: "ability" },
      { name: "Goro Hoeru", damage: 325, scale: "ability" },
      { name: "Tatsumaki", damage: 200, scale: "ability" },
      { name: "Boro Meteors", damage: 450, scale: "ability" },
    ],
    specialBuffs: [{ name: "Kaen Daiko", buff: 2, isMode: true }],
  },
];
