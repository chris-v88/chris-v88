import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonTone = 'info' | 'success' | 'caution' | 'warning';
export type ButtonDisplay = 'fill' | 'outline' | 'ghost' | 'link' | 'ghost-icon' | 'menu';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  display?: ButtonDisplay;
  className?: string;
  onClick: () => void;
  children: ReactNode;
};

const toneStyles: Record<ButtonTone, Record<ButtonDisplay, string>> = {
  info: {
    fill: 'bg-blue-400 hover:bg-blue-500 text-white',
    outline: 'border-blue-400 text-blue-400 hover:bg-blue-50',
    ghost: 'text-blue-400 hover:bg-blue-100',
    link: 'text-blue-400 hover:text-blue-500 hover:underline',
    'ghost-icon': 'text-blue-400 hover:bg-blue-100',
    menu: 'text-blue-400 hover:bg-blue-100',
  },
  success: {
    fill: 'bg-green-400 hover:bg-green-500 text-white',
    outline: 'border-green-400 text-green-400 hover:bg-green-50',
    ghost: 'text-green-400 hover:bg-green-100',
    link: 'text-green-400 hover:text-green-500 hover:underline',
    'ghost-icon': 'text-green-400 hover:bg-green-100',
    menu: 'text-green-400 hover:bg-green-100',
  },
  caution: {
    fill: 'bg-red-400 hover:bg-red-500 text-white',
    outline: 'border-red-400 text-red-400 hover:bg-red-50',
    ghost: 'text-red-400 hover:bg-red-100',
    link: 'text-red-400 hover:text-red-500 hover:underline',
    'ghost-icon': 'text-red-400 hover:bg-red-100',
    menu: 'text-red-400 hover:bg-red-100',
  },
  warning: {
    fill: 'bg-orange-400 hover:bg-orange-500 text-white',
    outline: 'border-orange-400 text-orange-400 hover:bg-orange-50',
    ghost: 'text-orange-400 hover:bg-orange-100',
    link: 'text-orange-400 hover:text-orange-500 hover:underline',
    'ghost-icon': 'text-orange-400 hover:bg-orange-100',
    menu: 'text-orange-400 hover:bg-orange-100',
  },
};

const displayStyles: Record<ButtonDisplay, string> = {
  fill: 'px-4 py-2 rounded-lg font-medium',
  outline: 'px-4 py-2 rounded-lg font-medium border-2',
  ghost: 'px-4 py-2 rounded-lg font-medium',
  link: 'p-0 font-medium',
  'ghost-icon': 'p-2 rounded-lg',
  menu: 'px-4 py-2 rounded-lg font-medium',
};

export const Button = (props: ButtonProps) => {
  const { tone = 'info', display = 'fill', children, className, onClick } = props;
  const baseClasses =
    'cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const displayClass = displayStyles[display];
  const toneClass = toneStyles[tone][display];

  return (
    <button
      className={`${baseClasses} ${displayClass} ${toneClass} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
