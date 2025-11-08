import { test, expect } from '@playwright/test';

test.describe('Typography Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render h1 heading', async ({ page }) => {
    const h1 = page.getByTestId('typography-h1');
    await expect(h1).toBeVisible();

    const tagName = await h1.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('h1');

    const fontSize = await h1.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('40px'); // 2.5rem = 40px
  });

  test('should render h2 heading', async ({ page }) => {
    const h2 = page.getByTestId('typography-h2');
    await expect(h2).toBeVisible();

    const tagName = await h2.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('h2');

    const fontSize = await h2.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('32px'); // 2rem = 32px
  });

  test('should render h3 heading', async ({ page }) => {
    const h3 = page.getByTestId('typography-h3');
    await expect(h3).toBeVisible();

    const tagName = await h3.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('h3');

    const fontSize = await h3.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('24px'); // 1.5rem = 24px
  });

  test('should render h4 heading', async ({ page }) => {
    const h4 = page.getByTestId('typography-h4');
    await expect(h4).toBeVisible();

    const tagName = await h4.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('h4');

    const fontSize = await h4.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('20px'); // 1.25rem = 20px
  });

  test('should render p1 paragraph', async ({ page }) => {
    const p1 = page.getByTestId('typography-p1');
    await expect(p1).toBeVisible();

    const tagName = await p1.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('p');

    const fontSize = await p1.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('18px'); // 1.125rem = 18px
  });

  test('should render p2 paragraph', async ({ page }) => {
    const p2 = page.getByTestId('typography-p2');
    await expect(p2).toBeVisible();

    const tagName = await p2.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('p');

    const fontSize = await p2.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('16px'); // 1rem = 16px
  });

  test('should render p3 paragraph', async ({ page }) => {
    const p3 = page.getByTestId('typography-p3');
    await expect(p3).toBeVisible();

    const tagName = await p3.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('p');

    const fontSize = await p3.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('14px'); // 0.875rem = 14px
  });

  test('should render p4 paragraph', async ({ page }) => {
    const p4 = page.getByTestId('typography-p4');
    await expect(p4).toBeVisible();

    const tagName = await p4.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('p');

    const fontSize = await p4.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('12px'); // 0.75rem = 12px
  });

  test('should apply custom color', async ({ page }) => {
    const coloredText = page.getByTestId('typography-colored');
    await expect(coloredText).toBeVisible();

    const color = await coloredText.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(color).toBe('rgb(255, 0, 0)'); // red
  });

  test('should apply custom weight', async ({ page }) => {
    const boldText = page.getByTestId('typography-bold');
    await expect(boldText).toBeVisible();

    const fontWeight = await boldText.evaluate((el) =>
      window.getComputedStyle(el).fontWeight
    );
    expect(fontWeight).toBe('700'); // bold
  });

  test('should apply text alignment', async ({ page }) => {
    const centerText = page.getByTestId('typography-center');
    await expect(centerText).toBeVisible();

    const textAlign = await centerText.evaluate((el) =>
      window.getComputedStyle(el).textAlign
    );
    expect(textAlign).toBe('center');
  });
});
