import { move } from "./types";

export const fistMoves: move[] = [
  {
    id: 0,
    name: "Bad Fists",
    M1: { name: "M1", damage: 8, scale: "fist" },
    abilities: [{ name: "Ground Smash", damage: 18, scale: "fist" }],
  },
  {
    id: 1,
    name: "Broly",
    M1: { name: "M1", damage: 14, scale: "fist" },
    abilities: [{ name: "Dragon Breath", damage: 303, scale: "fist" }],
  },
  {
    id: 2,
    name: "Garp",
    M1: { name: "M1", damage: 45, scale: "fist" },
    abilities: [
      { name: "Cannonball Throw", damage: 400, scale: "fist" },
      { name: "Love Fist", damage: 800, scale: "fist" },
      { name: "Whirlwind Smash", damage: 600, scale: "fist" },
      { name: "Giant Cannonball", damage: 1000, scale: "fist" },
    ],
    specialBuffs: [{ name: "Haki Imbue", buff: 1, doubleHaki: true }],
  },
];
