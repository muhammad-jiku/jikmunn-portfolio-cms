import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page loaded
    await expect(page).toHaveTitle(/Portfolio CMS/i);

    // Check for key elements
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot({ fullPage: false, maxDiffPixels: 100 });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });
});
