import workSrc from './icons/work.svg';
import educationSrc from './icons/education.svg';

export type PixelIconName = 'work' | 'education';

type PixelIconProps = {
  name: PixelIconName;
  className?: string;
};

const iconMap: Record<PixelIconName, string> = {
  work: workSrc,
  education: educationSrc,
};

export const PixelIcon = ({ name, className = '' }: PixelIconProps) => (
  <img src={iconMap[name]} className={className} alt="" />
);

export default PixelIcon;
