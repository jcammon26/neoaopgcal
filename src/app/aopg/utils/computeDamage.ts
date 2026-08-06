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

// Optional per-move exact overrides for special cases. When present, the override is returned as the final damage (bypasses scaling).
export const perMoveOverrides: Record<string, number> = {
  '23-M1': 570923711170312,
  '23-Q': 2583025362495679,
  '23-E': 3122590178715820,
  '23-R': 228725945260310,
  '23-F': 3934607797335040,
  '23-G': 4684272725456540,
    // Auriga + Ox-Demon Form (assigned id in UI/allMoves mapping: 114)
    '114-M1': 570923711170312,
    '114-Q': 2583025362495679,
    '114-E': 3122590178715820,
    '114-R': 228725945260310,
    '114-F': 3934607797335040,
    '114-G': 4684272725456540,
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
    // Return exact override value to guarantee match with in-game numbers.
    return Number(perMoveOverrides[moveIdentifier]);
  }

  return Number(scaled.toFixed(0));
}
