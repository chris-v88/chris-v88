import { type ReactNode } from 'react';
import { isFlagActive } from '../utils/featureFlags';

interface FeatureFlagProps {
  name: string;
  feature: ReactNode;
  backup: ReactNode;
}

/**
 * Renders `feature` when the named flag is active (enabled or expired).
 * Renders `backup` when the flag is off.
 */
const FeatureFlag = ({ name, feature, backup }: FeatureFlagProps) => {
  return <>{isFlagActive(name) ? feature : backup}</>;
};

export default FeatureFlag;
