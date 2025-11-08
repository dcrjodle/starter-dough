/**
 * Card Component - Container with variants and consistent styling
 *
 * USAGE RULES:
 * - ALWAYS use CSS variables for padding: padding="var(--spacing-md)"
 * - Use variants for styling (don't override with custom classes)
 * - Never hardcode colors, shadows, or border-radius
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card variant="default" padding="var(--spacing-lg)">
 *   <Typography variant="h2">Title</Typography>
 * </Card>
 *
 * // Elevated card with centered content
 * <Card variant="elevated" center>
 *   <Button>Click Me</Button>
 * </Card>
 *
 * // Card with custom gap between children
 * <Card gap="var(--spacing-md)">
 *   <Typography variant="h3">Heading</Typography>
 *   <Typography variant="p2">Description</Typography>
 * </Card>
 * ```
 */
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
  default: 'bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)]',
  outlined: 'bg-transparent border-2 border-[var(--color-border)] rounded-[var(--radius-lg)]',
  elevated: 'bg-[var(--color-background)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]',
  transparent: 'bg-transparent',
};

export function Card({
  children,
  variant = 'default',
  padding = 'var(--spacing-md)',
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
