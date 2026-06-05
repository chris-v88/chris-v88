import workSrc from './icons/work.svg';
import educationSrc from './icons/education.svg';
const lockLockedSrc = '/icons/lock-icon-locked.png';
const lockUnlockedSrc = '/icons/lock-icon-opened.png';

export type PixelIconName = 'work' | 'education' | 'lock-locked' | 'lock-unlocked';

type PixelIconProps = {
  name: PixelIconName;
  className?: string;
};

const iconMap: Record<PixelIconName, string> = {
  work: workSrc,
  education: educationSrc,
  'lock-locked': lockLockedSrc,
  'lock-unlocked': lockUnlockedSrc,
};

export const PixelIcon = ({ name, className = '' }: PixelIconProps) => (
  <img src={iconMap[name]} className={className} alt="" />
);

export default PixelIcon;
