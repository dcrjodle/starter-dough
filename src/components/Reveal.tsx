/**
 * Reveal Component - Scroll-triggered animations using Intersection Observer
 *
 * USAGE RULES:
 * - Wrap any content you want to animate on scroll
 * - Use standard animations (fade-up, fade-in, scale-up) for consistency
 * - Set once=true (default) for single animation, false for repeat
 *
 * @example
 * ```tsx
 * // Basic fade-in on scroll
 * <Reveal animation="fade-in">
 *   <Card>Content appears when scrolled into view</Card>
 * </Reveal>
 *
 * // Fade up with delay
 * <Reveal animation="fade-up" delay={200}>
 *   <Typography variant="h2">Delayed Title</Typography>
 * </Reveal>
 *
 * // Staggered children animation
 * <RevealStagger stagger={100}>
 *   {items.map(item => <Card key={item.id}>{item.name}</Card>)}
 * </RevealStagger>
 * ```
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  /**
   * Animation type
   * @default 'fade-in'
   */
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'scale-down';
  /**
   * Animation duration in milliseconds
   * @default 600
   */
  duration?: number;
  /**
   * Delay before animation starts in milliseconds
   * @default 0
   */
  delay?: number;
  /**
   * Threshold for triggering animation (0-1)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Whether to trigger animation once or every time element enters viewport
   * @default true
   */
  once?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Test ID for testing
   */
  testId?: string;
}

const animationStyles: Record<NonNullable<RevealProps['animation']>, { initial: string; animate: string }> = {
  'fade-in': {
    initial: 'opacity-0',
    animate: 'opacity-100',
  },
  'fade-up': {
    initial: 'opacity-0 translate-y-8',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    initial: 'opacity-0 -translate-y-8',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    initial: 'opacity-0 translate-x-8',
    animate: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    initial: 'opacity-0 -translate-x-8',
    animate: 'opacity-100 translate-x-0',
  },
  'scale-up': {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
  },
  'scale-down': {
    initial: 'opacity-0 scale-105',
    animate: 'opacity-100 scale-100',
  },
};

export function Reveal({
  children,
  animation = 'fade-in',
  duration = 600,
  delay = 0,
  threshold = 0.1,
  once = true,
  className = '',
  testId = 'reveal',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              setHasBeenVisible(true);
            }
          } else if (!once && !hasBeenVisible) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, hasBeenVisible]);

  const styles = animationStyles[animation];
  const shouldAnimate = isVisible || (once && hasBeenVisible);

  const baseClasses = 'transition-all ease-out';
  const stateClasses = shouldAnimate ? styles.animate : styles.initial;
  const combinedClassName = `${baseClasses} ${stateClasses} ${className}`.trim();

  return (
    <div
      ref={ref}
      className={combinedClassName}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      data-testid={testId}
      data-visible={shouldAnimate}
    >
      {children}
    </div>
  );
}

// Staggered reveal for multiple children
export interface RevealStaggerProps {
  children: ReactNode[];
  /**
   * Animation type
   * @default 'fade-up'
   */
  animation?: RevealProps['animation'];
  /**
   * Animation duration in milliseconds
   * @default 600
   */
  duration?: number;
  /**
   * Delay between each child animation in milliseconds
   * @default 100
   */
  stagger?: number;
  /**
   * Initial delay before first animation starts
   * @default 0
   */
  initialDelay?: number;
  /**
   * Threshold for triggering animation (0-1)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Whether to trigger animation once or every time element enters viewport
   * @default true
   */
  once?: boolean;
  /**
   * Custom className for container
   */
  className?: string;
}

export function RevealStagger({
  children,
  animation = 'fade-up',
  duration = 600,
  stagger = 100,
  initialDelay = 0,
  threshold = 0.1,
  once = true,
  className = '',
}: RevealStaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal
          key={index}
          animation={animation}
          duration={duration}
          delay={initialDelay + index * stagger}
          threshold={threshold}
          once={once}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
