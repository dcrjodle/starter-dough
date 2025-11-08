import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with logo and auth buttons', async ({ page }) => {
    const header = page.getByTestId('header');
    await expect(header).toBeVisible();

    const logo = page.getByTestId('header-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Logo');

    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Login');

    const signupButton = page.getByTestId('signup-button');
    await expect(signupButton).toBeVisible();
    await expect(signupButton).toContainText('Sign Up');
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.getByTestId('hero');
    await expect(hero).toBeVisible();

    await expect(hero).toContainText('Build Your Next Project');
    await expect(hero).toContainText('A modern React template');
  });

  test('should navigate to signup form when signup button clicked', async ({ page }) => {
    const signupButton = page.getByTestId('signup-button');
    await signupButton.click();

    // Hero should not be visible
    const hero = page.getByTestId('hero');
    await expect(hero).not.toBeVisible();

    // Signup form should be visible
    const emailInput = page.getByTestId('signup-email');
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByTestId('signup-password');
    await expect(passwordInput).toBeVisible();

    const submitButton = page.getByTestId('signup-submit');
    await expect(submitButton).toBeVisible();
  });

  test('should keep header visible when on signup page', async ({ page }) => {
    const signupButton = page.getByTestId('signup-button');
    await signupButton.click();

    const header = page.getByTestId('header');
    await expect(header).toBeVisible();

    const logo = page.getByTestId('header-logo');
    await expect(logo).toBeVisible();
  });
});
