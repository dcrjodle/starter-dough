import { useState } from "react";
import { Card, Layout, Typography, Form, Input, Button } from "../";
import { useAuth } from "../../lib/auth";

export interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      onSuccess?.();
    }
  };

  if (success) {
    return (
      <Card
        variant="default"
        padding="20px"
        gap={16}
        className="w-full min-w-[320px] max-w-md md:p-8 md:gap-6"
        center
      >
        <Typography variant="h3" align="center" className="text-xl md:text-2xl">
          Check your email
        </Typography>
        <Typography
          variant="p2"
          align="center"
          className="text-[var(--color-text-secondary)] text-sm md:text-base"
        >
          We've sent you a confirmation email. Please check your inbox to verify your account.
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      padding="20px"
      gap={16}
      className="w-full min-w-[320px] max-w-md md:p-8 md:gap-6"
      testId="signup-form"
    >
      <Layout direction="column" gap={6} className="md:gap-2">
        <Typography variant="h2" className="text-2xl md:text-3xl">
          Create Account
        </Typography>
        <Typography
          variant="p2"
          className="text-[var(--color-text-secondary)] text-sm md:text-base"
        >
          Sign up to get started
        </Typography>
      </Layout>

      <Form onSubmit={handleSubmit} testId="signup-form-element">
        <Input
          label="Email"
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          data-testid="signup-email"
        />

        <Input
          label="Password"
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          data-testid="signup-password"
        />

        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
        />

        {error && (
          <Typography variant="p3" className="text-[var(--color-error)] text-sm">
            {error}
          </Typography>
        )}

        <Button type="submit" fullWidth loading={loading} testId="signup-submit">
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </Form>

      {onSwitchToLogin && (
        <Layout direction="row" gap={4} justify="center" className="flex-wrap">
          <Typography variant="p3" className="text-[var(--color-text-secondary)] text-sm">
            Already have an account?
          </Typography>
          <Button variant="text" onClick={onSwitchToLogin}>
            Sign in
          </Button>
        </Layout>
      )}
    </Card>
  );
}
