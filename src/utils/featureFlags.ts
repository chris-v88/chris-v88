import flagsData from '../data/flags.json';

const OVERRIDES_KEY = 'flag-overrides';

export type FlagConfig = {
  name: string;
  enabled: boolean;
  expires: string;
  description: string;
};

export const flags: FlagConfig[] = flagsData.flags;

/**
 * Retrieves the feature flag overrides from localStorage.
 * @returns A record of feature flag names to their overridden boolean values.
 */
const getOverride = () => {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}') as Record<string, boolean>;
  } catch (error) {
    console.error('Error parsing feature flag overrides from localStorage:', error);
    return {};
  }
};

/**
 * Returns true if the flag should render the feature (new version).
 * Logic:
 *  - If the flag's expiry date has passed → always return true (force new feature)
 *  - Otherwise → return the flag's `enabled` value
 */
export const isFlagActive = (name: string): boolean => {
  const flag = flags.find((f) => f.name === name);
  if (!flag) return false;

  const isExpired = new Date() > new Date(flag.expires);
  if (isExpired) return true;

  const overrides = getOverride();
  if (name in overrides) return overrides[name];

  return flag.enabled;
};

/**
 * Executes and returns the result of `feature` when the flag is active,
 * otherwise executes and returns the result of `backup`.
 *
 * Usage:
 *   const result = featureFlag('ENABLE_REWRITE_2026', () => newLogic(), () => oldLogic());
 */
export const featureFlag = <T>(name: string, feature: () => T, backup: () => T): T => {
  return isFlagActive(name) ? feature() : backup();
};

/**
 * Sets an override for a specific feature flag in localStorage.
 * This allows developers to force a flag on or off for testing purposes, regardless of its configured `enabled` value or expiry date.
 * @param name The name of the feature flag to override.
 * @param value The boolean value to set for the override.
 */
export const setFlagOverride = (name: string, value: boolean) => {
  const overrides = getOverride();
  overrides[name] = value;
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
};

/**
 * Returns an object mapping all flag names to their active status (true/false).
 * This is useful for debugging or displaying the status of all flags in a UI.
 * @returns A record of feature flag names to their active status (true/false).
 */
export const getFlagOverrides = (): Record<string, boolean> => {
  return getOverride();
};

/**
 * Clears all feature flag overrides from localStorage.
 */
export const clearFlagOverrides = () => {
  localStorage.removeItem(OVERRIDES_KEY);
};
