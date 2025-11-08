import { useState } from 'react';
import { Card, Layout, Typography } from '../';
import { useAuth } from '../../lib/auth';

export interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      onSuccess?.();
    }
  };

  return (
    <Card variant="default" padding="20px" gap={16} className="w-full min-w-[320px] max-w-md md:p-8 md:gap-6">
      <Layout direction="column" gap={6} className="md:gap-2">
        <Typography variant="h2" className="text-2xl md:text-3xl">Sign In</Typography>
        <Typography variant="p2" className="text-[var(--color-text-secondary)] text-sm md:text-base">
          Welcome back! Please sign in to continue.
        </Typography>
      </Layout>

      <form onSubmit={handleSubmit}>
        <Layout direction="column" gap={12} className="md:gap-4">
          <Layout direction="column" gap={6} className="md:gap-2">
            <label htmlFor="email">
              <Typography variant="p3" weight="medium" className="text-sm">
                Email
              </Typography>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 md:px-4 md:py-2.5 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm md:text-base"
              placeholder="you@example.com"
            />
          </Layout>

          <Layout direction="column" gap={6} className="md:gap-2">
            <label htmlFor="password">
              <Typography variant="p3" weight="medium" className="text-sm">
                Password
              </Typography>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 md:px-4 md:py-2.5 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm md:text-base"
              placeholder="••••••••"
            />
          </Layout>

          {error && (
            <Typography variant="p3" className="text-[var(--color-error)] text-sm">
              {error}
            </Typography>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 md:py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[var(--shadow-sm)] text-sm md:text-base"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </Layout>
      </form>

      {onSwitchToSignup && (
        <Layout direction="row" gap={4} justify="center" className="flex-wrap">
          <Typography variant="p3" className="text-[var(--color-text-secondary)] text-sm">
            Don't have an account?
          </Typography>
          <button
            onClick={onSwitchToSignup}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium"
          >
            <Typography variant="p3" weight="medium" className="text-sm">
              Sign up
            </Typography>
          </button>
        </Layout>
      )}
    </Card>
  );
}
