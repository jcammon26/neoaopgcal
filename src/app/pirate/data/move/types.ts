export type Scale = "fist" | "sword" | "ability";

export type AbilityDamage = {
  name: string;
  damage: number;
  scale: Scale;
};

export interface move {
  id: number;
  name: string;
  M1: AbilityDamage;
  abilities: AbilityDamage[];
}
