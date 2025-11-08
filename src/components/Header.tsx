import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { Typography } from './Typography';

export interface HeaderProps {
  logo?: ReactNode;
  className?: string;
}

export function Header({ logo, className }: HeaderProps) {
  return (
    <Layout
      direction="row"
      justify="space-between"
      align="center"
      padding="12px 16px"
      className={`md:px-6 md:py-4 ${className}`}
      testId="header"
    >
      <Link to="/" data-testid="header-logo" className="flex-shrink-0">
        {logo || <Typography variant="h3" weight="bold" className="text-base md:text-xl">Logo</Typography>}
      </Link>

      <Layout direction="row" gap={8} align="center" className="md:gap-3">
        <Link
          to="/login"
          className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          data-testid="login-button"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-[var(--shadow-sm)]"
          data-testid="signup-button"
        >
          Sign Up
        </Link>
      </Layout>
    </Layout>
  );
}
