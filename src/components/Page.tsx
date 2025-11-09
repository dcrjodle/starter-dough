import type { ReactNode } from 'react';
import { Layout } from './Layout';

export interface PageProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const paddingClasses = {
  none: '',
  sm: 'py-4',
  md: 'py-6 md:py-8',
  lg: 'py-8 md:py-12',
};

export function Page({
  children,
  padding = 'md',
  className = '',
}: PageProps) {
  return (
    <Layout
      direction="column"
      className={`w-full ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </Layout>
  );
}
