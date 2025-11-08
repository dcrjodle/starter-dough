import { test, expect } from '@playwright/test';

test.describe('Layout Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render layout with default direction (row)', async ({ page }) => {
    const layout = page.getByTestId('layout-row');
    await expect(layout).toBeVisible();

    const styles = await layout.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        flexDirection: computed.flexDirection,
      };
    });

    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('row');
  });

  test('should render layout with column direction', async ({ page }) => {
    const layout = page.getByTestId('layout-column');
    await expect(layout).toBeVisible();

    const flexDirection = await layout.evaluate((el) =>
      window.getComputedStyle(el).flexDirection
    );

    expect(flexDirection).toBe('column');
  });

  test('should apply gap spacing', async ({ page }) => {
    const layout = page.getByTestId('layout-gap');
    await expect(layout).toBeVisible();

    const gap = await layout.evaluate((el) =>
      window.getComputedStyle(el).gap
    );

    expect(gap).toBe('16px');
  });

  test('should apply alignment properties', async ({ page }) => {
    const layout = page.getByTestId('layout-align');
    await expect(layout).toBeVisible();

    const styles = await layout.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        alignItems: computed.alignItems,
        justifyContent: computed.justifyContent,
      };
    });

    expect(styles.alignItems).toBe('center');
    expect(styles.justifyContent).toBe('space-between');
  });

  test('should apply padding', async ({ page }) => {
    const layout = page.getByTestId('layout-padding');
    await expect(layout).toBeVisible();

    const padding = await layout.evaluate((el) =>
      window.getComputedStyle(el).padding
    );

    expect(padding).toContain('20px');
  });

  test('should render children correctly', async ({ page }) => {
    const layout = page.getByTestId('layout-row');
    const children = layout.locator('> *');

    const count = await children.count();
    expect(count).toBeGreaterThan(0);
  });
});
