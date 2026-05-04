import type { ReactNode } from 'react';

export type TextDisplay = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'callout' | 'custom';

export type TextProps = {
  display: TextDisplay;
  children: ReactNode;
  className?: string;
};

export const Text = ({ display, children, className = '' }: TextProps) => {
  const cx = (base: string) => `${base} ${className}`.trim();

  switch (display) {
    case 'h1':
      return <h1 className={cx('font-press-start-2p text-2xl font-normal')}>{children}</h1>;
    case 'h2':
      return <h2 className={cx('font-press-start-2p text-xl font-bold')}>{children}</h2>;
    case 'h3':
      return <h3 className={cx('font-press-start-2p text-base font-bold')}>{children}</h3>;
    case 'h4':
      return <h4 className={cx('font-press-start-2p text-sm font-bold')}>{children}</h4>;
    case 'body':
      return <p className={cx('font-pixelify-sans text-[15px] font-normal')}>{children}</p>;
    case 'caption':
      return <span className={cx('font-pixelify-sans text-[14px] font-normal')}>{children}</span>;
    case 'callout':
      return (
        <span
          className={cx(
            'font-pixelify-sans text-[14px] font-normal bg-[#22388C] text-white px-3 py-0.5 rounded-full inline-block'
          )}
        >
          {children}
        </span>
      );
    case 'custom':
      return <span className={className}>{children}</span>;
    default:
      return null;
  }
};

export default Text;
