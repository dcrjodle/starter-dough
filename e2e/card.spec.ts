import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render card with default variant', async ({ page }) => {
    const card = page.getByTestId('card-default');
    await expect(card).toBeVisible();

    const styles = await card.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        borderRadius: computed.borderRadius,
      };
    });

    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)'); // white
    expect(styles.borderRadius).not.toBe('0px');
  });

  test('should render card with outlined variant', async ({ page }) => {
    const card = page.getByTestId('card-outlined');
    await expect(card).toBeVisible();

    const borderWidth = await card.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );

    expect(borderWidth).toBe('2px');
  });

  test('should render card with elevated variant', async ({ page }) => {
    const card = page.getByTestId('card-elevated');
    await expect(card).toBeVisible();

    const boxShadow = await card.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );

    expect(boxShadow).not.toBe('none');
  });

  test('should render card with transparent variant', async ({ page }) => {
    const card = page.getByTestId('card-transparent');
    await expect(card).toBeVisible();

    const backgroundColor = await card.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    expect(backgroundColor).toBe('rgba(0, 0, 0, 0)'); // transparent
  });

  test('should apply custom padding', async ({ page }) => {
    const card = page.getByTestId('card-padded');
    await expect(card).toBeVisible();

    const padding = await card.evaluate((el) =>
      window.getComputedStyle(el).padding
    );

    expect(padding).toContain('32px');
  });

  test('should apply custom gap', async ({ page }) => {
    const card = page.getByTestId('card-gap');
    await expect(card).toBeVisible();

    const gap = await card.evaluate((el) =>
      window.getComputedStyle(el).gap
    );

    expect(gap).toBe('20px');
  });

  test('should apply direction (row/column)', async ({ page }) => {
    const cardRow = page.getByTestId('card-row');
    const cardColumn = page.getByTestId('card-column');

    await expect(cardRow).toBeVisible();
    await expect(cardColumn).toBeVisible();

    const rowDirection = await cardRow.evaluate((el) =>
      window.getComputedStyle(el).flexDirection
    );
    const columnDirection = await cardColumn.evaluate((el) =>
      window.getComputedStyle(el).flexDirection
    );

    expect(rowDirection).toBe('row');
    expect(columnDirection).toBe('column');
  });

  test('should handle click events', async ({ page }) => {
    const clickableCard = page.getByTestId('card-clickable');
    await expect(clickableCard).toBeVisible();

    // Check if cursor is pointer (indicates clickable)
    const cursor = await clickableCard.evaluate((el) =>
      window.getComputedStyle(el).cursor
    );

    expect(cursor).toBe('pointer');
  });

  test('should render children correctly', async ({ page }) => {
    const card = page.getByTestId('card-default');
    const children = card.locator('> * > *'); // Account for wrapper div

    const count = await children.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should apply custom className', async ({ page }) => {
    const card = page.getByTestId('card-custom-class');
    await expect(card).toBeVisible();

    const hasCustomClass = await card.evaluate((el) => {
      return el.classList.contains('custom-test-class');
    });

    expect(hasCustomClass).toBe(true);
  });
});
