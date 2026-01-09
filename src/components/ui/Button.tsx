import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'info' | 'success' | 'caution' | 'warning';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  info: 'bg-blue-600 hover:bg-blue-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  caution: 'bg-red-600 hover:bg-red-700 text-white',
  warning: 'bg-orange-600 hover:bg-orange-700 text-white',
};

export const Button = (props: ButtonProps) => {
  const { variant = 'info', children, className = '', ...rest } = props;
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
