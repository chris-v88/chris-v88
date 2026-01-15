import * as React from 'react';
import * as LucideIcons from 'lucide-react';

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

const variantColors: Record<IconTone, string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  caution: 'text-red-400',
  warning: 'text-orange-400',
  callout: 'text-yellow-400',
  default: 'text-gray-400',
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

  return <LucideIcon size={sizeMap[size]} className={`${variantColors[tone]} ${className}`} />;
};

export default Icon;
