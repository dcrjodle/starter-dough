/**
 * Layout Component - Flexbox helper for consistent spacing and alignment
 *
 * USAGE RULES:
 * - ALWAYS use Layout instead of raw divs with flexbox
 * - Use CSS variables for spacing: gap="var(--spacing-md)"
 * - Never hardcode pixel values when CSS variables exist
 *
 * @example
 * ```tsx
 * // Basic row layout
 * <Layout direction="row" gap="var(--spacing-md)">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Layout>
 *
 * // Centered content
 * <Layout align="center" justify="center">
 *   <Typography variant="h1">Centered Title</Typography>
 * </Layout>
 *
 * // Column with custom spacing
 * <Layout direction="column" gap={16} padding="var(--spacing-lg)">
 *   <Card>Content</Card>
 * </Layout>
 * ```
 */
import type { CSSProperties, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: number | string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  padding?: number | string;
  style?: CSSProperties;
  className?: string;
  testId?: string;
  onClick?: () => void;
}

export function Layout({
  children,
  direction = 'row',
  gap = 0,
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  padding = 0,
  style,
  className = '',
  testId = 'layout',
  onClick,
}: LayoutProps) {
  const layoutStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    ...style,
  };

  return (
    <div style={layoutStyle} className={className} data-testid={testId} onClick={onClick}>
      {children}
    </div>
  );
}
