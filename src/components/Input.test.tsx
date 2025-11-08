import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders label and input correctly', () => {
    render(<Input label="Email" id="email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies correct input type', () => {
    render(<Input label="Password" id="password" type="password" />);

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Name" id="name" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'John' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when provided', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<Input label="Email" id="email" error="Invalid email" />);

    const input = screen.getByLabelText('Email');
    expect(input.className).toContain('border-[var(--color-error)]');
  });

  it('applies placeholder', () => {
    render(<Input label="Email" id="email" placeholder="you@example.com" />);

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.placeholder).toBe('you@example.com');
  });

  it('respects required attribute', () => {
    render(<Input label="Email" id="email" required />);

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('applies custom className', () => {
    render(<Input label="Email" id="email" className="custom-input" />);

    const input = screen.getByLabelText('Email');
    expect(input.className).toContain('custom-input');
  });

  it('forwards data-testid attribute', () => {
    render(<Input label="Email" id="email" data-testid="email-input" />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });
});
