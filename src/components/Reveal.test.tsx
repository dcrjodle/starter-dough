import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal, RevealStagger } from './Reveal';

describe('Reveal', () => {
  // Mock IntersectionObserver for all tests
  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() {
        return [];
      }
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [];
    } as unknown as typeof IntersectionObserver;
  });

  afterAll(() => {
    // Cleanup
  });

  it('renders children correctly', () => {
    render(
      <Reveal>
        <div>Test Content</div>
      </Reveal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies initial opacity-0 class for fade-in animation', () => {
    render(
      <Reveal animation="fade-in" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('opacity-0');
  });

  it('applies fade-up animation classes', () => {
    render(
      <Reveal animation="fade-up" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('opacity-0');
    expect(element.className).toContain('translate-y-8');
  });

  it('applies fade-down animation classes', () => {
    render(
      <Reveal animation="fade-down" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('opacity-0');
    expect(element.className).toContain('-translate-y-8');
  });

  it('applies fade-left animation classes', () => {
    render(
      <Reveal animation="fade-left" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('translate-x-8');
  });

  it('applies fade-right animation classes', () => {
    render(
      <Reveal animation="fade-right" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('-translate-x-8');
  });

  it('applies scale-up animation classes', () => {
    render(
      <Reveal animation="scale-up" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('scale-95');
  });

  it('applies scale-down animation classes', () => {
    render(
      <Reveal animation="scale-down" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('scale-105');
  });

  it('applies custom duration', () => {
    render(
      <Reveal duration={1000} testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.style.transitionDuration).toBe('1000ms');
  });

  it('applies custom delay', () => {
    render(
      <Reveal delay={500} testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.style.transitionDelay).toBe('500ms');
  });

  it('applies custom className', () => {
    render(
      <Reveal className="custom-class" testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('custom-class');
  });

  it('applies transition-all class', () => {
    render(
      <Reveal testId="reveal">
        <div>Content</div>
      </Reveal>
    );

    const element = screen.getByTestId('reveal');
    expect(element.className).toContain('transition-all');
  });
});

describe('RevealStagger', () => {
  // IntersectionObserver is already mocked globally

  it('renders all children', () => {
    render(
      <RevealStagger>
        {[
          <div key="1">Child 1</div>,
          <div key="2">Child 2</div>,
          <div key="3">Child 3</div>,
        ]}
      </RevealStagger>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('wraps each child in a Reveal component', () => {
    const { container } = render(
      <RevealStagger>
        {[
          <div key="1">Child 1</div>,
          <div key="2">Child 2</div>,
        ]}
      </RevealStagger>
    );

    const reveals = container.querySelectorAll('[data-testid="reveal"]');
    expect(reveals).toHaveLength(2);
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <RevealStagger className="stagger-container">
        {[<div key="1">Child 1</div>]}
      </RevealStagger>
    );

    const staggerContainer = container.firstChild as HTMLElement;
    expect(staggerContainer.className).toContain('stagger-container');
  });
});
