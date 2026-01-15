import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import { toneTextColors } from './colors';

export type IconTone = 'info' | 'success' | 'caution' | 'warning' | 'callout' | 'default';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  name: keyof typeof LucideIcons;
  size?: IconSize;
  tone?: IconTone;
  className?: string;
};

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export const Icon = (props: IconProps) => {
  const { name, size = 'md', tone = 'default', className = '' } = props;
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <LucideIcon size={sizeMap[size]} className={`${toneTextColors[tone]} ${className}`} />;
};

export default Icon;
