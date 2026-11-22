export const pickRandom = <TCandidate>(
  candidates: readonly TCandidate[],
  random = Math.random,
): TCandidate | undefined => {
  if (candidates.length === 0) return undefined;

  return candidates[Math.floor(random() * candidates.length)];
};
