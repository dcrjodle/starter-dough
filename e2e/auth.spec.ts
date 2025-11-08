import { test, expect } from '@playwright/test';

test.describe('SignupForm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const signupButton = page.getByTestId('signup-button');
    await signupButton.click();
  });

  test('should display all form fields', async ({ page }) => {
    await expect(page.getByTestId('signup-form')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByText('Sign up to get started')).toBeVisible();

    // Check form fields
    await expect(page.getByTestId('signup-email')).toBeVisible();
    await expect(page.getByTestId('signup-password')).toBeVisible();
    await expect(page.locator('#confirm-password')).toBeVisible();

    // Check submit button
    await expect(page.getByTestId('signup-submit')).toBeVisible();
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.getByTestId('signup-email').fill('test@example.com');
    await page.getByTestId('signup-password').fill('password123');
    await page.locator('#confirm-password').fill('different123');

    await page.getByTestId('signup-submit').click();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should show error when password is too short', async ({ page }) => {
    await page.getByTestId('signup-email').fill('test@example.com');
    await page.getByTestId('signup-password').fill('12345');
    await page.locator('#confirm-password').fill('12345');

    await page.getByTestId('signup-submit').click();

    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });

  test('should have proper input placeholders', async ({ page }) => {
    const emailInput = page.getByTestId('signup-email');
    await expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');

    const passwordInput = page.getByTestId('signup-password');
    await expect(passwordInput).toHaveAttribute('placeholder', '••••••••');

    const confirmPasswordInput = page.locator('#confirm-password');
    await expect(confirmPasswordInput).toHaveAttribute('placeholder', '••••••••');
  });

  test('should have proper input types', async ({ page }) => {
    const emailInput = page.getByTestId('signup-email');
    await expect(emailInput).toHaveAttribute('type', 'email');

    const passwordInput = page.getByTestId('signup-password');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    const confirmPasswordInput = page.locator('#confirm-password');
    await expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('should mark all fields as required', async ({ page }) => {
    await expect(page.getByTestId('signup-email')).toHaveAttribute('required');
    await expect(page.getByTestId('signup-password')).toHaveAttribute('required');
    await expect(page.locator('#confirm-password')).toHaveAttribute('required');
  });
});
