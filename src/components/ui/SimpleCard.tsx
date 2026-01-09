import { Icon, type IconVariant } from './Icon';
import * as LucideIcons from 'lucide-react';

export type SimpleCardData = {
  header: string;
  subheader: string;
  location: string;
  date: string;
  description?: string;
  tech: string[];
  iconName: keyof typeof LucideIcons;
  iconVariant: IconVariant;
};

export type SimpleCardProps = {
  data: SimpleCardData;
};

export const SimpleCard = ({ data }: SimpleCardProps) => {
  const getVariantColors = (variant: IconVariant) => {
    const colorMap = {
      info: { text: 'text-blue-400', bg: 'bg-blue-900', textTag: 'text-blue-200' },
      success: { text: 'text-green-400', bg: 'bg-green-900', textTag: 'text-green-200' },
      caution: { text: 'text-red-400', bg: 'bg-red-900', textTag: 'text-red-200' },
      warning: { text: 'text-orange-400', bg: 'bg-orange-900', textTag: 'text-orange-200' },
      callout: { text: 'text-yellow-400', bg: 'bg-yellow-900', textTag: 'text-yellow-200' },
      default: { text: 'text-gray-400', bg: 'bg-gray-700', textTag: 'text-gray-300' },
    };
    return colorMap[variant];
  };

  const colors = getVariantColors(data.iconVariant);

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Icon name={data.iconName} variant={data.iconVariant} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-100">{data.header}</h3>
          <p className={`font-semibold ${colors.text}`}>{data.subheader}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
        <Icon name="MapPin" size="sm" />
        <span>{data.location}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Icon name="Calendar" size="sm" />
        <span>{data.date}</span>
      </div>

      {data.description && <p className="text-gray-300 mb-4">{data.description}</p>}

      <div className="flex flex-wrap gap-2">
        {data.tech.map((item) => (
          <span key={item} className={`px-2 py-1 rounded text-xs ${colors.bg} ${colors.textTag}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;
