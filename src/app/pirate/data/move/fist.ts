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
];
