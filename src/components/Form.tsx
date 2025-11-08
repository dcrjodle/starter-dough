import type { ReactNode, FormEvent } from 'react';
import { Layout } from './Layout';

export interface FormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  gap?: number;
  className?: string;
  testId?: string;
}

export function Form({
  children,
  onSubmit,
  gap = 12,
  className = '',
  testId = 'form',
}: FormProps) {
  return (
    <form onSubmit={onSubmit} data-testid={testId}>
      <Layout direction="column" gap={gap} className={`md:gap-4 ${className}`.trim()}>
        {children}
      </Layout>
    </form>
  );
}
