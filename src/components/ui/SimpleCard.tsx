import { Icon, type IconTone } from './Icon';
import { Button } from './Button';
import { toneTextColors } from './colors';
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
            className={`font-semibold ${toneTextColors[iconTone]} hover:underline hover:italic`}
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
        {tech.map((item) => {
          const bgMap = {
            info: 'bg-blue-900',
            success: 'bg-green-900',
            caution: 'bg-red-900',
            warning: 'bg-orange-900',
            callout: 'bg-yellow-900',
            default: 'bg-neutral-700',
          };
          const textMap = {
            info: 'text-blue-200',
            success: 'text-green-200',
            caution: 'text-red-200',
            warning: 'text-orange-200',
            callout: 'text-yellow-200',
            default: 'text-gray-300',
          };
          return (
            <span
              key={item}
              className={`px-2 py-1 rounded text-xs ${bgMap[iconTone]} ${textMap[iconTone]}`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleCard;
