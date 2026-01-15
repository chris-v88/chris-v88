import type { ButtonTone, ButtonDisplay } from './Button';
import type { IconTone } from './Icon';

export const toneStyles: Record<ButtonTone, Record<ButtonDisplay, string>> = {
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
  neutral: {
    fill: 'bg-gray-400 hover:bg-gray-500 text-white',
    outline: 'border-gray-400 text-gray-400 hover:bg-gray-50',
    ghost: 'text-gray-400 hover:bg-gray-100',
    link: 'text-gray-400 hover:text-gray-500 hover:underline',
    'ghost-icon': 'text-gray-400 hover:bg-gray-100',
    menu: 'text-gray-400 hover:bg-gray-100',
  },
};

export const toneTextColors: Record<IconTone, string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  caution: 'text-red-400',
  warning: 'text-orange-400',
  callout: 'text-yellow-400',
  default: 'text-gray-400',
};
