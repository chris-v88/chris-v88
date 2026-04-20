import type { ReactNode } from 'react';

export type TextDisplay = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'callout';

export type TextProps = {
  display: TextDisplay;
  children: ReactNode;
  className?: string;
};

export const Text = ({ display, children, className = '' }: TextProps) => {
  const cx = (base: string) => `${base} ${className}`.trim();

  switch (display) {
    case 'h1':
      return <h1 className={cx('font-jersey text-[50px] font-normal')}>{children}</h1>;
    case 'h2':
      return <h2 className={cx('font-jersey text-[25px] font-bold')}>{children}</h2>;
    case 'h3':
      return <h3 className={cx('font-reddit-mono text-[22px] font-bold')}>{children}</h3>;
    case 'body':
      return <p className={cx('font-reddit-mono text-[18px] font-normal')}>{children}</p>;
    case 'caption':
      return <span className={cx('font-reddit-mono text-[18px] font-normal')}>{children}</span>;
    case 'callout':
      return (
        <span
          className={cx(
            'font-reddit-mono text-[18px] font-normal bg-[#22388C] text-white px-3 py-0.5 rounded-full inline-block'
          )}
        >
          {children}
        </span>
      );
  }
};

export default Text;
