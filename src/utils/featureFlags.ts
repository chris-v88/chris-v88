import flagsData from '../data/flags.json';

const OVERRIDES_KEY = 'flag-overrides';

export type FlagConfig = {
  name: string;
  enabled: boolean;
  expires: string;
  description: string;
};

export const flags: FlagConfig[] = flagsData.flags;

export const Flag = {
  ENABLE_REWRITE_2026: 'ENABLE_REWRITE_2026',
} as const;

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
 * Priority order:
 *  1. If the flag's expiry date has passed → always returns true (expiry overrides everything)
 *  2. If a localStorage override exists for the flag → returns that value
 *  3. Otherwise → returns the flag's `enabled` value from the config
 *
 * Note: localStorage overrides are ignored once a flag has expired.
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
 * Sets a manual override for a feature flag in localStorage.
 * This allows developers to force a flag on or off for testing, but note that
 * overrides have no effect once a flag's expiry date has passed (expiry always wins).
 * @param name The name of the feature flag to override.
 * @param value The boolean value to set for the override.
 */
export const setFlagOverride = (name: string, value: boolean) => {
  const overrides = getOverride();
  overrides[name] = value;
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
};

/**
 * Returns only the raw manual overrides stored in localStorage.
 * Does not include flags that haven't been explicitly overridden.
 * Use this to check whether a specific flag has been manually set.
 * @returns A partial record of flag names to their manually-set boolean values.
 */
export const getFlagOverrides = (): Record<string, boolean> => {
  return getOverride();
};

/**
 * Returns the effective active status for every configured flag.
 * Applies the same priority as isFlagActive: expiry → override → config default.
 * Useful for displaying all flag statuses in a UI.
 * @returns A record of all flag names to their computed active status.
 */
export const getEffectiveFlagValues = (): Record<string, boolean> => {
  const overrides = getOverride();
  return flags.reduce(
    (acc, flag) => {
      const isExpired = new Date() > new Date(flag.expires);
      acc[flag.name] = isExpired ? true : (overrides[flag.name] ?? flag.enabled);
      return acc;
    },
    {} as Record<string, boolean>
  );
};

/**
 * Clears all feature flag overrides from localStorage.
 */
export const clearFlagOverrides = () => {
  localStorage.removeItem(OVERRIDES_KEY);
};
