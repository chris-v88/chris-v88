import * as React from 'react';
import * as LucideIcons from 'lucide-react';

export type IconVariant = 'info' | 'success' | 'caution' | 'warning' | 'callout' | 'default';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  name: keyof typeof LucideIcons;
  size?: IconSize;
  variant?: IconVariant;
  className?: string;
};

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const variantColors: Record<IconVariant, string> = {
  info: 'text-blue-600',
  success: 'text-green-600',
  caution: 'text-red-600',
  warning: 'text-orange-600',
  callout: 'text-yellow-600',
  default: 'text-gray-600',
};

export const Icon = (props: IconProps) => {
  const { name, size = 'md', variant = 'default', className = '' } = props;
  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <LucideIcon size={sizeMap[size]} className={`${variantColors[variant]} ${className}`} />;
};

export default Icon;
