export type BaseBuff = {
  strengthBuff: number;
  swordBuff: number;
  abilityBuff: number;
};

export type UpgradeBuff = {
  upgradePerLevel?: number;
  maxLevel?: number;
};

export type SpecialBuff = {
  name: string;
  buff: number;
};

export interface buffs {
  id: number;
  name: string;
  baseBuff: BaseBuff;
  upgradeBuff?: UpgradeBuff;
  specialBuff?: SpecialBuff;
}
