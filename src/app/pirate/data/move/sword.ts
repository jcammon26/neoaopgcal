import { move } from "./types";

export const swordMoves: move[] = [
  {
    id: 0,
    name: "Vasto Sword",
    M1: { name: "M1", damage: 8, scale: "sword" },
    abilities: [{ name: "Getsuga Tensho", damage: 16, scale: "sword" }],
  },
  {
    id: 1,
    name: "Modded Vasto Sword",
    M1: { name: "M1", damage: 9, scale: "sword" },
    abilities: [{ name: "Modded Getsuga Tensho", damage: 18, scale: "sword" }],
  },
  {
    id: 2,
    name: "Slime Sword",
    M1: { name: "M1", damage: 11, scale: "sword" },
    abilities: [
      { name: "Speed Blitz", damage: 42.4, scale: "sword" },
      { name: "Blink", damage: 23, scale: "sword" },
      { name: "I Am Atomic", damage: 280, scale: "sword" },
    ],
  },
];
