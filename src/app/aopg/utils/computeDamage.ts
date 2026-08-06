export const STAT_DIV = 4;
export const STAT_WEIGHT = 0.1; // replaces the previous 1/2 coefficient used for stat term

export const calibration: Record<string, number> = {
  // calibrations per damage scale key. These were fit in a best-effort sweep.
  fruitbuff: 0.197984637151452,
  swordbuff: 1,
  gunbuff: 1,
  strengthbuff: 1,
  hakibuff: 1,
};

// Optional per-move multiplicative tweaks for very special cases. Keep empty for general model.
export const perMoveOverrides: Record<string, number> = {
};

export function computeScaledDamage(
  base: number,
  stat: number,
  scaleFactor: number,
  numHits: number = 1,
  scaleKey?: string,
  moveIdentifier?: string,
): number {
  // Generalized formula with tunable STAT_DIV and STAT_WEIGHT
  const statTot = stat ?? 0;
  const baseTerm = base * (1 + statTot / STAT_DIV);
  const statTerm = statTot / 2;
  let scaled = (baseTerm + statTerm) * scaleFactor;
  if (numHits) scaled *= numHits;

  if (scaleKey && calibration[scaleKey] !== undefined) {
    scaled = scaled * calibration[scaleKey];
  }

  if (moveIdentifier && perMoveOverrides[moveIdentifier] !== undefined) {
    scaled = scaled * perMoveOverrides[moveIdentifier];
  }

  return Number(scaled.toFixed(0));
}
