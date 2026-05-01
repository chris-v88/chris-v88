import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { toneStyles } from './colors';
import { isFlagActive, config } from '../../utils/featureFlags';

export type ButtonTone = 'info' | 'success' | 'caution' | 'warning' | 'neutral' | 'primary';
export type ButtonDisplay = 'fill' | 'outline' | 'ghost' | 'link' | 'ghost-icon' | 'menu';

export type ButtonProps = {
  tone?: ButtonTone;
  display?: ButtonDisplay;
  className?: string;
  onClick?: (e?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

const displayStyles: Record<ButtonDisplay, string> = {
  fill: 'px-4 py-2 rounded-lg font-medium',
  outline: 'px-4 py-2 rounded-lg font-medium border-2',
  ghost: 'px-4 py-2 rounded-lg font-medium',
  link: 'p-0 font-medium',
  'ghost-icon': 'p-2 rounded-lg',
  menu: 'px-4 py-2 rounded-lg font-medium',
};

const PIXEL_DISPLAYS: ButtonDisplay[] = ['fill', 'outline', 'menu'];

const isRewrite = () => isFlagActive(config.ENABLE_REWRITE_2026);

export const Button = (props: ButtonProps) => {
  const {
    tone = isRewrite() ? 'primary' : 'info',
    display = 'fill',
    children,
    className,
    onClick,
    href,
    target,
    rel,
    download,
    ...rest
  } = props;

  const baseClasses =
    'cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const displayClass = displayStyles[display];
  const toneClass = toneStyles[tone][display];
  const pixelClass = PIXEL_DISPLAYS.includes(display) && isRewrite() ? 'btn-pixel px-6 py-3' : '';

  const combinedClassName = [baseClasses, displayClass, toneClass, pixelClass, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={combinedClassName}
        onClick={onClick}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
