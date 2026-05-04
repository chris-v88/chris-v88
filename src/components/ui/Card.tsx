import type { ReactNode } from 'react';

export type CardTone = 'theme' | 'info' | 'success' | 'caution' | 'warning' | 'neutral';
export type CardSize = 'wide' | 'skinny';
export type CardType = 'fill' | 'outline';

export type CardProps = {
  children: ReactNode;
  size?: CardSize;
  type?: CardType;
  tone?: CardTone;
  className?: string;
};

const toneFillStyles: Record<CardTone, string> = {
  theme: 'bg-[#A51919] text-white',
  info: 'bg-blue-400 text-white',
  success: 'bg-green-400 text-white',
  caution: 'bg-red-400 text-white',
  warning: 'bg-orange-400 text-black',
  neutral: 'bg-[#2a2a2a] text-white',
};

const toneAccentBg: Record<CardTone, string> = {
  theme: 'bg-[#A51919]',
  info: 'bg-blue-400',
  success: 'bg-green-400',
  caution: 'bg-red-400',
  warning: 'bg-orange-400',
  neutral: 'bg-[#2a2a2a]',
};

const sizeStyles: Record<CardSize, string> = {
  wide: 'w-full',
  skinny: 'w-fit',
};

export const Card = ({
  children,
  size = 'wide',
  type = 'fill',
  tone = 'neutral',
  className = '',
}: CardProps) => {
  const sizeClass = sizeStyles[size];

  if (type === 'outline') {
    return (
      <div className={`card-pixel ${toneAccentBg[tone]} ${sizeClass}`}>
        <div className={`card-pixel bg-[#2a2a2a] m-0.75 p-4 ${className}`}>{children}</div>
      </div>
    );
  }

  return (
    <div className={`card-pixel ${toneFillStyles[tone]} ${sizeClass} p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
