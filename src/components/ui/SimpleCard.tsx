import { Icon, type IconTone } from './Icon';
import { Button } from './Button';
import * as LucideIcons from 'lucide-react';

export type SimpleCardData = {
  header: string;
  subheader: string;
  url: string;
  location: string;
  date: string;
  description?: string;
  tech: string[];
  iconName: keyof typeof LucideIcons;
  iconTone: IconTone;
};

export type SimpleCardProps = {
  data: SimpleCardData;
};

export const SimpleCard = ({ data }: SimpleCardProps) => {
  const { header, subheader, url, location, date, description, tech, iconName, iconTone } = data;

  const getToneColors = (tone: IconTone) => {
    const colorMap = {
      info: { text: 'text-blue-400', bg: 'bg-blue-900', textTag: 'text-blue-200' },
      success: { text: 'text-green-400', bg: 'bg-green-900', textTag: 'text-green-200' },
      caution: { text: 'text-red-400', bg: 'bg-red-900', textTag: 'text-red-200' },
      warning: { text: 'text-orange-400', bg: 'bg-orange-900', textTag: 'text-orange-200' },
      callout: { text: 'text-yellow-400', bg: 'bg-yellow-900', textTag: 'text-yellow-200' },
      default: { text: 'text-gray-400', bg: 'bg-neutral-700', textTag: 'text-gray-300' },
    };
    return colorMap[tone];
  };

  const colors = getToneColors(iconTone);

  return (
    <div className="bg-neutral-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Icon name={iconName} tone={iconTone} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-100">{header}</h3>
          <Button
            display="link"
            href={url ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold ${colors.text} hover:underline hover:italic`}
          >
            {subheader}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <Icon name="MapPin" size="sm" />
        <span>{location}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Icon name="Calendar" size="sm" />
        <span>{date}</span>
      </div>

      {description && <p className="text-gray-300 mb-4">{description}</p>}

      <div className="flex flex-wrap gap-2">
        {tech.map((item) => (
          <span key={item} className={`px-2 py-1 rounded text-xs ${colors.bg} ${colors.textTag}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;
