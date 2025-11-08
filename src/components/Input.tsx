import type { InputHTMLAttributes } from 'react';
import { Layout } from './Layout';
import { Typography } from './Typography';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  id: string;
  error?: string;
}

export function Input({ label, id, error, className = '', ...props }: InputProps) {
  return (
    <Layout direction="column" gap={6} className="md:gap-2">
      <label htmlFor={id}>
        <Typography variant="p3" weight="medium" className="text-sm">
          {label}
        </Typography>
      </label>
      <input
        id={id}
        className={`px-3 py-2 md:px-4 md:py-2.5 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm md:text-base ${
          error ? 'border-[var(--color-error)]' : ''
        } ${className}`.trim()}
        {...props}
      />
      {error && (
        <Typography variant="p3" className="text-[var(--color-error)] text-sm">
          {error}
        </Typography>
      )}
    </Layout>
  );
}
