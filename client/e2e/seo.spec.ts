import { expect, test } from '@playwright/test';

test.describe('SEO & Metadata', () => {
  test('should have sitemap.xml accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');

    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');

    const content = await page.content();
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
  });

  test('should have robots.txt accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');

    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('User-agent');
    expect(content).toContain('Sitemap');
  });

  test('should have proper meta tags on homepage', async ({ page }) => {
    await page.goto('/');

    // Check title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();

    // Check Twitter Card tags
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');

    expect(twitterCard).toBe('summary_large_image');
    expect(twitterTitle).toBeTruthy();
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });

  test('should have proper structured data', async ({ page }) => {
    await page.goto('/');

    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    const count = await structuredData.count();

    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      const content = await structuredData.first().textContent();
      const json = JSON.parse(content!);

      expect(json['@context']).toBe('https://schema.org');
      expect(json['@type']).toBeTruthy();
    }
  });

  test('should generate Open Graph images', async ({ page }) => {
    const response = await page.goto('/api/og?title=Test+Blog&type=blog');

    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('image');
  });
});
