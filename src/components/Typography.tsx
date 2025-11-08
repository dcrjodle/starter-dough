/**
 * Typography Component - Type-safe text with consistent styling
 *
 * USAGE RULES:
 * - ALWAYS use Typography instead of raw <h1>, <p>, etc.
 * - Use CSS variables for colors: color="var(--color-text)"
 * - Never hardcode font sizes - use variants (h1-h4, p1-p4)
 *
 * @example
 * ```tsx
 * // Headings
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="h2" align="center">Section Title</Typography>
 *
 * // Paragraphs with custom color
 * <Typography variant="p1" color="var(--color-text-secondary)">
 *   Large paragraph text
 * </Typography>
 *
 * // Bold text
 * <Typography variant="p2" weight="bold">
 *   Important message
 * </Typography>
 * ```
 */
import type { CSSProperties, ReactNode } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p1' | 'p2' | 'p3' | 'p4';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: CSSProperties;
  className?: string;
  testId?: string;
}

const variantStyles: Record<TypographyVariant, CSSProperties> = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '1rem',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: 1.3,
    marginBottom: '0.875rem',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'semibold',
    lineHeight: 1.4,
    marginBottom: '0.75rem',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 'semibold',
    lineHeight: 1.5,
    marginBottom: '0.625rem',
  },
  p1: {
    fontSize: '1.125rem',
    fontWeight: 'normal',
    lineHeight: 1.6,
    marginBottom: '0.5rem',
  },
  p2: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: 1.6,
    marginBottom: '0.5rem',
  },
  p3: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    lineHeight: 1.5,
    marginBottom: '0.375rem',
  },
  p4: {
    fontSize: '0.75rem',
    fontWeight: 'normal',
    lineHeight: 1.5,
    marginBottom: '0.25rem',
  },
};

const weightMap: Record<string, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export function Typography({
  children,
  variant = 'p2',
  color,
  weight,
  align = 'left',
  style,
  className = '',
  testId = 'typography',
}: TypographyProps) {
  const baseStyle = variantStyles[variant];
  const isHeading = variant.startsWith('h');
  const Tag = isHeading ? variant : 'p';

  const typographyStyle: CSSProperties = {
    ...baseStyle,
    color,
    fontWeight: weight ? weightMap[weight] : baseStyle.fontWeight,
    textAlign: align,
    margin: 0,
    ...style,
  };

  return (
    // @ts-expect-error - Dynamic tag is valid
    <Tag style={typographyStyle} className={className} data-testid={testId}>
      {children}
    </Tag>
  );
}
