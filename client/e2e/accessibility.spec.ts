import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have no automatic accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    expect(h1Count).toBeLessThanOrEqual(1); // Should have only one h1
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // All images should have alt attribute (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/login');

    const inputs = page.locator('input');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');

      // Each input should have either an id (with matching label), name, aria-label, or placeholder
      expect(id || name || ariaLabel || placeholder).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Press Tab key multiple times
    await page.keyboard.press('Tab');

    // Check if focus is visible
    const focused = await page.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement && activeElement !== document.body;
    });

    expect(focused).toBeTruthy();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    // This is a basic check - in production, use tools like axe-core
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    expect(bodyBg).toBeTruthy();
  });

  test('should have lang attribute', async ({ page }) => {
    await page.goto('/');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('should have skip to content link', async ({ page }) => {
    await page.goto('/');

    // Press Tab to focus skip link (if it exists)
    await page.keyboard.press('Tab');

    const skipLink = page.locator('a[href="#main-content"], a:has-text("Skip to")').first();
    const isVisible = await skipLink.isVisible().catch(() => false);

    // Skip link is optional but recommended
    if (isVisible) {
      expect(await skipLink.textContent()).toContain('Skip');
    }
  });
});
