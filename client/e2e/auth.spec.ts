import { expect, test } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveTitle(/Login.*Portfolio CMS/i);
    await expect(page.locator('h1')).toContainText(/Welcome back|Sign in/i);

    // Check for form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Wait for validation errors
    await page.waitForTimeout(500);

    // Check if form is still on login page (didn't submit)
    await expect(page).toHaveURL(/login/);
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/register');

    await expect(page).toHaveTitle(/Register.*Portfolio CMS/i);
    await expect(page.locator('h1')).toContainText(/Create account|Register/i);

    // Check for registration form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');

    await expect(page).toHaveTitle(/Reset Password|Forgot.*Portfolio CMS/i);
    await expect(page.locator('h1')).toContainText(/Reset|Forgot/i);

    // Check for email input
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should have noindex meta tag on auth pages', async ({ page }) => {
    await page.goto('/login');

    const robots = page.locator('meta[name="robots"]');
    const content = await robots.getAttribute('content');

    expect(content).toContain('noindex');
  });

  test('should redirect unauthenticated users from dashboard', async ({ page }) => {
    // Try to access dashboard without auth
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL(/login/, { timeout: 5000 });
    await expect(page).toHaveURL(/login/);
  });
});
