import type { ReactNode } from 'react';
import { Layout } from './Layout';

export interface PageProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-4',
  md: 'px-6 py-6 md:px-8 md:py-8',
  lg: 'px-8 py-8 md:px-12 md:py-12',
};

export function Page({
  children,
  maxWidth = 'xl',
  padding = 'md',
  centered = true,
  className = '',
}: PageProps) {
  return (
    <Layout
      direction="column"
      className={`w-full ${centered ? 'mx-auto' : ''} ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </Layout>
  );
}
