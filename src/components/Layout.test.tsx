import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies default direction (row)', () => {
    render(<Layout testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ flexDirection: 'row' });
  });

  it('applies column direction', () => {
    render(<Layout direction="column" testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies custom gap', () => {
    render(<Layout gap={20} testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ gap: '20px' });
  });

  it('applies string gap', () => {
    render(<Layout gap="2rem" testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ gap: '2rem' });
  });

  describe('Alignment', () => {
    it('aligns items to flex-start (left)', () => {
      render(<Layout align="flex-start" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ alignItems: 'flex-start' });
    });

    it('aligns items to center', () => {
      render(<Layout align="center" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ alignItems: 'center' });
    });

    it('aligns items to flex-end (right)', () => {
      render(<Layout align="flex-end" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ alignItems: 'flex-end' });
    });

    it('aligns items to stretch (default)', () => {
      render(<Layout testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ alignItems: 'stretch' });
    });

    it('aligns items to baseline', () => {
      render(<Layout align="baseline" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ alignItems: 'baseline' });
    });
  });

  describe('Justification', () => {
    it('justifies content to flex-start (default)', () => {
      render(<Layout testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'flex-start' });
    });

    it('justifies content to center', () => {
      render(<Layout justify="center" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'center' });
    });

    it('justifies content to flex-end', () => {
      render(<Layout justify="flex-end" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'flex-end' });
    });

    it('justifies content with space-between', () => {
      render(<Layout justify="space-between" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'space-between' });
    });

    it('justifies content with space-around', () => {
      render(<Layout justify="space-around" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'space-around' });
    });

    it('justifies content with space-evenly', () => {
      render(<Layout justify="space-evenly" testId="test-layout">Content</Layout>);

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({ justifyContent: 'space-evenly' });
    });
  });

  describe('Combined Alignment', () => {
    it('centers both horizontally and vertically', () => {
      render(
        <Layout align="center" justify="center" testId="test-layout">
          Centered
        </Layout>
      );

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({
        alignItems: 'center',
        justifyContent: 'center',
      });
    });

    it('aligns left and justifies space-between', () => {
      render(
        <Layout align="flex-start" justify="space-between" testId="test-layout">
          Content
        </Layout>
      );

      const layout = screen.getByTestId('test-layout');
      expect(layout).toHaveStyle({
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      });
    });
  });

  it('applies custom padding', () => {
    render(<Layout padding={16} testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ padding: '16px' });
  });

  it('applies string padding', () => {
    render(<Layout padding="1rem 2rem" testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ padding: '1rem 2rem' });
  });

  it('applies wrap property', () => {
    render(<Layout wrap="wrap" testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ flexWrap: 'wrap' });
  });

  it('applies custom className', () => {
    render(<Layout className="custom-class" testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    expect(layout.className).toContain('custom-class');
  });

  it('handles onClick events', () => {
    const handleClick = vi.fn();
    render(<Layout onClick={handleClick} testId="test-layout">Content</Layout>);

    const layout = screen.getByTestId('test-layout');
    layout.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('merges custom style with default styles', () => {
    render(
      <Layout style={{ backgroundColor: 'red' }} testId="test-layout">
        Content
      </Layout>
    );

    const layout = screen.getByTestId('test-layout');
    expect(layout).toHaveStyle({ display: 'flex' });
  });
});
