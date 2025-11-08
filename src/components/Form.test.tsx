import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  it('renders children correctly', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <input data-testid="test-input" />
        <button type="submit">Submit</button>
      </Form>
    );

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit} testId="test-form">
        <button type="submit">Submit</button>
      </Form>
    );

    const form = screen.getByTestId('test-form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('applies custom gap', () => {
    render(
      <Form onSubmit={vi.fn()} gap={20} testId="test-form">
        <div>Child 1</div>
        <div>Child 2</div>
      </Form>
    );

    const form = screen.getByTestId('test-form');
    expect(form).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Form onSubmit={vi.fn()} className="custom-class" testId="test-form">
        <div>Content</div>
      </Form>
    );

    const form = screen.getByTestId('test-form');
    expect(form.querySelector('[class*="custom-class"]')).toBeInTheDocument();
  });

  it('handles async onSubmit', async () => {
    const handleSubmit = vi.fn(async (e) => {
      e.preventDefault();
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    render(
      <Form onSubmit={handleSubmit} testId="test-form">
        <button type="submit">Submit</button>
      </Form>
    );

    const form = screen.getByTestId('test-form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
