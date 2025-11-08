# Component Guidelines

## Core Principles

### 1. Always Use These Components

- **Card** - Main building block for containers
- **Layout** - All flexbox layouts
- **Typography** - All text content

### 2. Component Composition

Build complex UIs by composing small, single-purpose components.

```tsx
// ❌ DON'T - Monolithic
<div className="bg-white p-6 rounded shadow">
  <h2>{title}</h2>
  <p>{content}</p>
</div>

// ✅ DO - Composed
<Card variant="default" padding={24} gap={12}>
  <Typography variant="h2">{title}</Typography>
  <Typography variant="p2">{content}</Typography>
</Card>
```

### 3. Testing

**ALWAYS write tests:**
- **Unit tests** - Every `.ts/.tsx` file in `lib/` MUST have a `.test.ts/.test.tsx` file
- **E2E tests** - Every component in `components/` MUST have Playwright tests in `e2e/`

```bash
npm test              # Run unit tests (Vitest)
npm run test:e2e      # Run e2e tests (Playwright)
```

---

## Quick Reference

### Card Variants

```tsx
<Card variant="default">     // White bg, border, rounded
<Card variant="outlined">    // Transparent, thick border
<Card variant="elevated">    // White bg, shadow
<Card variant="transparent"> // No bg (heroes, overlays)
```

### Layout Props

```tsx
<Layout
  direction="row"        // row, column
  gap={16}              // spacing
  align="center"        // alignment
  justify="space-between" // justification
  padding={20}          // internal spacing
  className="..."       // Tailwind classes
>
```

### Typography Variants

```tsx
<Typography variant="h1">  // 2.5rem - Page titles
<Typography variant="h2">  // 2rem - Section headings
<Typography variant="h3">  // 1.5rem - Subsections
<Typography variant="h4">  // 1.25rem - Small headings
<Typography variant="p1">  // 1.125rem - Large text
<Typography variant="p2">  // 1rem - Default (default)
<Typography variant="p3">  // 0.875rem - Small text
<Typography variant="p4">  // 0.75rem - Extra small
```

---

## Authentication

### Setup

```tsx
import { AuthProvider } from './lib/auth';

<AuthProvider>
  <App />
</AuthProvider>
```

### Usage

```tsx
import { useAuth } from './lib/auth';
import { LoginForm, SignupForm } from './components/auth';

const { user, signOut } = useAuth();

// Pre-built forms
<LoginForm onSuccess={() => navigate('/dashboard')} />
<SignupForm onSuccess={() => navigate('/dashboard')} />
```

---

## Payments

### Setup

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Usage

```tsx
import { redirectToCheckout, redirectToPortal } from './lib/payments';

// Subscribe
await redirectToCheckout({
  priceId: 'price_123',
  successUrl: '/success',
  cancelUrl: '/pricing'
});

// Manage subscription
await redirectToPortal(customerId);
```

### Backend Endpoints Needed

- `POST /api/stripe/create-checkout-session` → `{ id, url }`
- `POST /api/stripe/create-portal-session` → `{ url }`
- `POST /api/stripe/webhook` → Handle events

---

## Rules

### ✅ ALWAYS

1. Use `<Card>` for containers
2. Use `<Layout>` for flexbox
3. Use `<Typography>` for text
4. Compose small components
5. Write unit tests for all `lib/` files (Vitest)
6. Write E2E tests for all components (Playwright)
7. Use Tailwind via `className`
8. Use `AuthProvider` for auth
9. Use Stripe utilities for payments

### ❌ NEVER

1. Raw `<div>` with flex styles
2. Raw `<h1>`, `<h2>`, `<p>` tags
3. Inline styles for layout/typography
4. Monolithic components
5. Hardcode API keys
