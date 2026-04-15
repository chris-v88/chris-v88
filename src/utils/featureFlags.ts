import flagsData from '../data/flags.json';

export interface FlagConfig {
  name: string;
  enabled: boolean;
  expires: string;
  description: string;
}

export const flags: FlagConfig[] = flagsData.flags;

/**
 * Returns true if the flag should render the feature (new version).
 * Logic:
 *  - If the flag's expiry date has passed → always return true (force new feature)
 *  - Otherwise → return the flag's `enabled` value
 */
export function isFlagActive(name: string): boolean {
  const flag = flags.find((f) => f.name === name);
  if (!flag) return false;

  const isExpired = new Date() > new Date(flag.expires);
  if (isExpired) return true;

  return flag.enabled;
}

/**
 * Executes and returns the result of `feature` when the flag is active,
 * otherwise executes and returns the result of `backup`.
 *
 * Usage:
 *   const result = featureFlag('ENABLE_REWRITE_2026', () => newLogic(), () => oldLogic());
 */
export function featureFlag<T>(name: string, feature: () => T, backup: () => T): T {
  return isFlagActive(name) ? feature() : backup();
}
