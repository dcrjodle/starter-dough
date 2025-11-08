# React Website Template 🚀

Modern React template with authentication, payments, and design system. Ready to deploy.

## Features

- **Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Auth**: Supabase (email/password, OAuth)
- **Payments**: Stripe integration
- **Components**: Form, Input, Button, Card, Layout, Typography
- **Testing**: Vitest + Playwright
- **Type-Safe**: Full TypeScript

## Quick Start

```bash
npm install
npm run setup    # Interactive setup wizard
npm run dev      # Start development
```

Visit [http://localhost:5173](http://localhost:5173)

## Setup

### Option 1: Interactive (Recommended)

```bash
npm run setup
```

Guides you through:
- Supabase credentials (optional)
- Stripe keys (optional)
- Design system colors

### Option 2: Manual

Copy `.env.example` to `.env` and add your keys:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_STRIPE_PUBLISHABLE_KEY=your_key
```

## Project Structure

```
src/
├── components/     # UI components (Button, Card, Form, Input, etc.)
├── lib/           # Auth, payments, API utilities
├── pages/         # Page components
└── index.css      # Design system variables
```

## Components

### Basic Usage

```tsx
import { Card, Form, Input, Button, Typography } from './components';

// Card with variants
<Card variant="elevated" center>
  <Typography variant="h2">Title</Typography>
</Card>

// Form components
<Form onSubmit={handleSubmit}>
  <Input label="Email" id="email" type="email" />
  <Button type="submit" fullWidth>Submit</Button>
</Form>
```

### Authentication

```tsx
import { AuthProvider, useAuth } from './lib/auth';
import { LoginForm } from './components/auth';

<AuthProvider>
  <App />
</AuthProvider>

const { user, signOut } = useAuth();
```

### Payments

```tsx
import { redirectToCheckout } from './lib/payments';

await redirectToCheckout({
  priceId: 'price_123',
  successUrl: '/success'
});
```

## Scripts

```bash
npm run dev         # Development server
npm run build       # Production build
npm test            # Unit tests
npm run test:e2e    # E2E tests
npm run setup       # Setup wizard
```

## Customization

### Colors

Run `npm run setup` or edit `src/index.css`:

```css
--color-primary: #3b82f6;
--color-secondary: #8b5cf6;
```

### Hero Content

Edit `src/components/Hero.tsx` defaults or pass props:

```tsx
<Hero
  title="Your Title"
  description="Your description"
/>
```

## Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in SQL Editor
3. Get API keys from Settings → API
4. Add to `.env`

## Deployment

```bash
npm run build       # Creates dist/ folder
```

Set environment variables in your deployment platform (Vercel, Netlify, etc.):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

## Documentation

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Design tokens and patterns
- [CLAUDE.md](CLAUDE.md) - Component guidelines

---

Built with ❤️ using React + TypeScript
