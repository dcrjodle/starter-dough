import type { CSSProperties, ReactNode } from 'react';
import { Layout } from './Layout';
import type { LayoutProps } from './Layout';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'transparent';
  padding?: number | string;
  direction?: LayoutProps['direction'];
  gap?: number | string;
  align?: LayoutProps['align'];
  justify?: LayoutProps['justify'];
  center?: boolean;
  className?: string;
  style?: CSSProperties;
  testId?: string;
  onClick?: () => void;
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white border border-gray-200 rounded-lg',
  outlined: 'bg-transparent border-2 border-gray-300 rounded-lg',
  elevated: 'bg-white rounded-lg shadow-lg',
  transparent: 'bg-transparent',
};

export function Card({
  children,
  variant = 'default',
  padding = 16,
  direction = 'column',
  gap = 0,
  align = 'stretch',
  justify = 'flex-start',
  center = false,
  className = '',
  style,
  testId = 'card',
  onClick,
}: CardProps) {
  const baseStyles = variantStyles[variant];
  const interactiveStyles = onClick ? 'cursor-pointer transition-all hover:shadow-xl' : '';
  const combinedClassName = `${baseStyles} ${interactiveStyles} ${className}`.trim();

  // Override align and justify if center is true
  const finalAlign = center ? 'center' : align;
  const finalJustify = center ? 'center' : justify;

  return (
    <Layout
      direction={direction}
      gap={gap}
      align={finalAlign}
      justify={finalJustify}
      padding={padding}
      className={combinedClassName}
      testId={testId}
      style={style}
      onClick={onClick}
    >
      {children}
    </Layout>
  );
}
