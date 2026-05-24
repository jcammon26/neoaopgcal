export type BaseBuff = {
  damage?: number;
  lifesteal?: number;
  fistDamage?: number;
  swordDamage?: number;
  abilityDamage?: number;
  criticalDamage?: number;
  criticalDamageChance?: number;
  damageReduction?: number;
  maxHealth?: number;
  gems?: number;
  coins?: number;
  dropAmount?: number;
  exp?: number;
  luck?: number;
  extraGeppoJumps?: number;
  walkSpeed?: number;
  jumpHeight?: number;
  cooldownReduction?: number;
};

export type SpecialBuff = {
  name: string;
  buff: number;
};

export interface buffs {
  id: number;
  name: string;
  baseBuff: BaseBuff;
  specialBuff?: SpecialBuff;
}

export type AvatarStatBuff = {
  stat: keyof BaseBuff;
  base: number;
  perLevel: number;
};

export interface avatar {
  id: number;
  name: string;
  maxLevel: number;
  buffs: AvatarStatBuff[];
}
