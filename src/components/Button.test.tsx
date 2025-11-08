import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button testId="test-button">Primary</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('bg-[var(--color-primary)]');
  });

  it('applies secondary variant styling', () => {
    render(<Button variant="secondary" testId="test-button">Secondary</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('border-[var(--color-primary)]');
  });

  it('applies text variant styling', () => {
    render(<Button variant="text" testId="test-button">Text</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('text-[var(--color-primary)]');
  });

  it('applies fullWidth styling when specified', () => {
    render(<Button fullWidth testId="test-button">Full Width</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('w-full');
  });

  it('handles onClick events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByText('Disabled') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('disables button when loading is true', () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByText('Loading') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class" testId="test-button">Custom</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('custom-class');
  });

  it('forwards type attribute', () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByText('Submit') as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('uses submit type by default', () => {
    render(<Button>Default</Button>);

    const button = screen.getByText('Default') as HTMLButtonElement;
    expect(button.type).toBe('submit');
  });

  it('applies disabled styling', () => {
    render(<Button disabled testId="test-button">Disabled</Button>);

    const button = screen.getByTestId('test-button');
    expect(button.className).toContain('disabled:opacity-50');
    expect(button.className).toContain('disabled:cursor-not-allowed');
  });
});
