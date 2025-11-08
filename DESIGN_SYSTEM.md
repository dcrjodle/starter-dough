# Design System

## Colors

### Primary
- `--color-primary`: #3b82f6 (Main brand color)
- `--color-primary-hover`: #2563eb (Hover state)
- `--color-primary-light`: #dbeafe (Light variant)
- `--color-primary-dark`: #1e40af (Dark variant)

### Secondary
- `--color-secondary`: #8b5cf6
- `--color-secondary-hover`: #7c3aed
- `--color-secondary-light`: #ede9fe
- `--color-secondary-dark`: #6d28d9

### Neutral
- `--color-background`: #ffffff (Main background)
- `--color-surface`: #f9fafb (Card/surface background)
- `--color-border`: #e5e7eb (Borders)
- `--color-text`: #111827 (Primary text)
- `--color-text-secondary`: #6b7280 (Secondary text)
- `--color-text-tertiary`: #9ca3af (Tertiary text)

### Status
- `--color-success`: #10b981 / `--color-success-light`: #d1fae5
- `--color-error`: #ef4444 / `--color-error-light`: #fee2e2
- `--color-warning`: #f59e0b / `--color-warning-light`: #fef3c7
- `--color-info`: #3b82f6 / `--color-info-light`: #dbeafe

## Spacing

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px

## Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-2xl`: 24px
- `--radius-full`: 9999px

## Shadows

- `--shadow-sm`: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- `--shadow-md`: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- `--shadow-lg`: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
- `--shadow-xl`: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
- `--shadow-2xl`: 0 25px 50px -12px rgb(0 0 0 / 0.25)

## Usage in Tailwind

Use CSS variables with Tailwind:

```tsx
// Colors
className="bg-[var(--color-primary)] text-[var(--color-text)]"

// Spacing (use Tailwind's built-in spacing scale)
className="p-4 gap-2"  // 16px, 8px

// Border Radius
className="rounded-[var(--radius-md)]"

// Shadows
className="shadow-[var(--shadow-md)]"
```

## Mobile Responsive Breakpoints

- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

Example:
```tsx
className="text-sm md:text-base lg:text-lg"
className="px-4 md:px-6 lg:px-8"
```
