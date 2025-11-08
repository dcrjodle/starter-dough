# Component Guidelines

## Core Rules

### Always Use These Components

- **Card** - Containers with variants (default, outlined, elevated, transparent)
- **Layout** - Flexbox layouts (NEVER use raw divs with flex)
- **Typography** - All text (h1-h4, p1-p4)
- **Form/Input/Button** - All forms and inputs
- **Reveal** - Scroll animations (fade-in, fade-up, scale-up, etc.)

### Design System Variables

**❌ NEVER hardcode values:**
```tsx
// BAD
<div className="p-4 rounded-lg shadow-lg bg-white">
<div style={{ color: '#3b82f6' }}>

// GOOD
<Card padding="var(--spacing-md)" variant="elevated">
<Typography style={{ color: 'var(--color-primary)' }}>
```

**✅ ALWAYS use CSS variables:**
- **Colors**: `var(--color-primary)`, `var(--color-background)`, `var(--color-border)`
- **Spacing**: `var(--spacing-xs/sm/md/lg/xl)`
- **Radius**: `var(--radius-sm/md/lg/xl)`
- **Shadows**: `var(--shadow-sm/md/lg/xl)`

## Testing

**Every file MUST have tests:**
- `src/lib/*.ts` → `*.test.ts` (Vitest)
- `src/components/*.tsx` → `*.test.tsx` (Vitest)
- Major features → `e2e/*.spec.ts` (Playwright)

```bash
npm test              # Unit tests
npm run test:e2e      # E2E tests
```

## TypeScript

**❌ NEVER use `any`**
```tsx
// BAD
function process(data: any) {}

// GOOD
interface Data { id: string; name: string }
function process(data: Data) {}
```

## Code Style

**TypeScript:**
- Run `npm run lint:fix` and `npm run format` before commit
- Named exports only (no `export default`)
- Use Tailwind + shadcn/ui (NO styled-components, Material-UI, etc.)

## Before Commit

```bash
npm run lint:fix
npm test
```

All must pass before committing.
