# React Website Template 🚀

A modern, production-ready React website template with authentication, payments, and a complete design system.

## Features ✨

- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Authentication**: Supabase Auth (email/password, social providers)
- **Payments**: Stripe integration ready
- **Design System**: Reusable components with consistent styling
- **Forms**: Pre-built `Form`, `Input`, `Button` components
- **Testing**: Unit tests (Vitest) and E2E tests (Playwright)
- **Type-Safe**: Full TypeScript support
- **Responsive**: Mobile-first design approach

## Quick Start 🏃‍♂️

### 1. Clone or Use This Template

```bash
# Clone the repository
git clone <your-repo-url>
cd react-website-template

# Install dependencies
npm install
```

### 2. Run Interactive Setup

```bash
npm run setup
```

This will guide you through:
- Setting up Supabase credentials (optional)
- Setting up Stripe keys (optional)
- Customizing design system colors and styles

### 3. Start Development

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## Manual Setup 🔧

If you prefer manual setup over the interactive script:

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
# Supabase (get from: https://app.supabase.com/project/_/settings/api)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (get from: https://dashboard.stripe.com/test/apikeys)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Design System Customization

Edit [src/index.css](src/index.css) to customize colors, spacing, and more:

```css
@theme {
  /* Primary Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;

  /* Change to your brand colors */
  --color-primary: #ff6b6b;
  --color-primary-hover: #ee5a52;
}
```

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component (primary/secondary/text)
│   ├── Card.tsx        # Card container with variants
│   ├── Form.tsx        # Form wrapper with consistent layout
│   ├── Input.tsx       # Input field with label and error handling
│   ├── Layout.tsx      # Flexbox layout helper
│   ├── Typography.tsx  # Text components (h1-h4, p1-p4)
│   └── auth/           # Auth-related components
│       ├── LoginForm.tsx
│       └── SignupForm.tsx
├── lib/                # Utilities and integrations
│   ├── auth/           # Authentication (Supabase)
│   ├── payments/       # Payment processing (Stripe)
│   └── api.ts          # API helpers
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
└── index.css           # Design system & global styles
```

## Components Guide 📦

### Core Components

All components follow the design system and are fully typed.

#### Card

Container component with multiple variants:

```tsx
import { Card } from './components';

<Card variant="default">Content</Card>
<Card variant="elevated">Elevated card with shadow</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="transparent">Transparent card</Card>

{/* Center content */}
<Card center>Centered content</Card>
```

#### Form Components

```tsx
import { Form, Input, Button } from './components';

<Form onSubmit={handleSubmit}>
  <Input
    label="Email"
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={errors.email}
    required
  />

  <Button type="submit" fullWidth>
    Submit
  </Button>
</Form>
```

#### Button

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="text">Text Button</Button>

<Button fullWidth>Full Width</Button>
<Button loading>Processing...</Button>
```

#### Layout

Flexbox helper for consistent spacing:

```tsx
<Layout direction="row" gap={16} align="center" justify="space-between">
  <div>Item 1</div>
  <div>Item 2</div>
</Layout>
```

#### Typography

Type-safe text components:

```tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="h2">Section Title</Typography>
<Typography variant="p1">Large paragraph</Typography>
<Typography variant="p2">Default paragraph</Typography>
```

## Authentication Setup 🔐

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your credentials from Project Settings → API

### 2. Set Up Database

Run the [supabase-schema.sql](supabase-schema.sql) in your Supabase SQL Editor.

### 3. Use Auth Components

```tsx
import { AuthProvider, useAuth } from './lib/auth';
import { LoginForm, SignupForm } from './components/auth';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

function YourApp() {
  const { user, signOut } = useAuth();

  return user ? (
    <button onClick={signOut}>Sign Out</button>
  ) : (
    <LoginForm onSuccess={() => navigate('/dashboard')} />
  );
}
```

## Payments Setup 💳

### 1. Get Stripe Keys

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your publishable key from Developers → API keys

### 2. Set Up Backend

You'll need backend endpoints for:
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/create-portal-session`
- `POST /api/stripe/webhook`

### 3. Use Payment Functions

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

## Scripts 📜

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm test                # Run unit tests
npm run test:ui         # Open Vitest UI
npm run test:coverage   # Generate coverage report
npm run test:e2e        # Run E2E tests
npm run test:e2e:ui     # Open Playwright UI

# Code Quality
npm run lint            # Lint code with ESLint

# Setup
npm run setup           # Interactive setup wizard
```

## Customization Guide 🎨

### Changing Brand Colors

Run the setup script:
```bash
npm run setup
```

Or manually edit [src/index.css](src/index.css):

```css
--color-primary: #your-color;
--color-secondary: #your-color;
```

### Changing Hero Content

Edit [src/components/Hero.tsx](src/components/Hero.tsx):

```tsx
<Hero
  title="Your Custom Title"
  description="Your custom description"
/>
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation in `src/components/Header.tsx`

## Testing 🧪

### Unit Tests

Run unit tests with Vitest:

```bash
npm test
```

Every component should have a corresponding `.test.tsx` file.

### E2E Tests

Run E2E tests with Playwright:

```bash
npm run test:e2e
```

E2E tests are in the `e2e/` directory.

## Deployment 🌍

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy --prod
```

### Environment Variables

Remember to set environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

## Design System Reference 🎨

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete design system documentation.

## Component Guidelines 📋

See [CLAUDE.md](CLAUDE.md) for component development guidelines and best practices.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This template is available for free use in your projects.

## Support 💬

Need help? Open an issue or check the documentation files:
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Design system documentation
- [CLAUDE.md](CLAUDE.md) - Component guidelines

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
