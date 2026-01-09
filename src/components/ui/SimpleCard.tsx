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
      info: { text: 'text-blue-600', bg: 'bg-blue-100', textTag: 'text-blue-800' },
      success: { text: 'text-green-600', bg: 'bg-green-100', textTag: 'text-green-800' },
      caution: { text: 'text-red-600', bg: 'bg-red-100', textTag: 'text-red-800' },
      warning: { text: 'text-orange-600', bg: 'bg-orange-100', textTag: 'text-orange-800' },
      callout: { text: 'text-yellow-600', bg: 'bg-yellow-100', textTag: 'text-yellow-800' },
      default: { text: 'text-gray-600', bg: 'bg-gray-100', textTag: 'text-gray-800' },
    };
    return colorMap[variant];
  };

  const colors = getVariantColors(data.iconVariant);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <Icon name={data.iconName} variant={data.iconVariant} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{data.header}</h3>
          <p className={`font-semibold ${colors.text}`}>{data.subheader}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Icon name="MapPin" size="sm" />
        <span>{data.location}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Icon name="Calendar" size="sm" />
        <span>{data.date}</span>
      </div>

      {data.description && <p className="text-gray-700 mb-4">{data.description}</p>}

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
