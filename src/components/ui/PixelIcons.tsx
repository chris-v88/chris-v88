import WorkIcon from './icons/WorkIcon';
import EducationIcon from './icons/EducationIcon';
import type { JSX } from 'react';

export type PixelIconName = 'work' | 'education';

type PixelIconProps = {
  name: PixelIconName;
  className?: string;
};

const iconMap: Record<PixelIconName, () => JSX.Element> = {
  work: WorkIcon,
  education: EducationIcon,
};

export const PixelIcon = ({ name, className = '' }: PixelIconProps) => {
  const IconComponent = iconMap[name];
  return (
    <span className={className}>
      <IconComponent />
    </span>
  );
};

export default PixelIcon;
