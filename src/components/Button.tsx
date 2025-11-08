import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  fullWidth?: boolean;
  loading?: boolean;
  testId?: string;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-sm)]',
  secondary:
    'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
  text: 'bg-transparent text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]',
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  testId = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = variantStyles[variant];
  const widthStyles = fullWidth ? 'w-full' : '';
  const combinedClassName = `
    ${baseStyles}
    ${widthStyles}
    px-4 py-2.5 md:py-3
    rounded-[var(--radius-md)]
    font-medium
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors
    text-sm md:text-base
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      disabled={disabled || loading}
      className={combinedClassName}
      data-testid={testId}
      {...props}
    >
      {children}
    </button>
  );
}
