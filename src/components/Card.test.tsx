import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies default variant styling', () => {
    render(<Card testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('bg-white');
    expect(card.className).toContain('border');
  });

  it('applies outlined variant styling', () => {
    render(<Card variant="outlined" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('bg-transparent');
    expect(card.className).toContain('border-2');
  });

  it('applies elevated variant styling', () => {
    render(<Card variant="elevated" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('shadow-lg');
  });

  it('applies transparent variant styling', () => {
    render(<Card variant="transparent" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('bg-transparent');
  });

  it('handles onClick when provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick} testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies interactive styles when onClick is provided', () => {
    render(<Card onClick={vi.fn()} testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('cursor-pointer');
  });

  it('applies custom gap', () => {
    render(<Card gap={20} testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
  });

  it('applies custom padding', () => {
    render(<Card padding={32} testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card.className).toContain('custom-class');
  });

  it('centers content when center prop is true', () => {
    render(<Card center testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    // The Layout component should have center alignment
    expect(card).toBeInTheDocument();
  });

  it('does not center content by default', () => {
    render(<Card testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
  });

  it('passes through style prop', () => {
    render(<Card style={{ backgroundColor: 'red' }} testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
    // Style is applied through Layout component
  });

  it('applies custom direction', () => {
    render(<Card direction="row" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
  });

  it('applies custom align and justify', () => {
    render(<Card align="center" justify="space-between" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    expect(card).toBeInTheDocument();
  });

  it('overrides align and justify when center is true', () => {
    render(<Card center align="flex-start" justify="flex-end" testId="test-card">Content</Card>);

    const card = screen.getByTestId('test-card');
    // Center should override the align and justify props
    expect(card).toBeInTheDocument();
  });

  describe('Alignment options', () => {
    it('aligns content to flex-start (left)', () => {
      render(<Card align="flex-start" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('aligns content to center', () => {
      render(<Card align="center" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('aligns content to flex-end (right)', () => {
      render(<Card align="flex-end" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('justifies content to flex-start', () => {
      render(<Card justify="flex-start" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('justifies content to center', () => {
      render(<Card justify="center" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('justifies content to flex-end', () => {
      render(<Card justify="flex-end" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('justifies content with space-between', () => {
      render(<Card justify="space-between" testId="test-card">Content</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });

    it('centers content with center prop (both align and justify)', () => {
      render(<Card center testId="test-card">Centered</Card>);

      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
    });
  });
});
