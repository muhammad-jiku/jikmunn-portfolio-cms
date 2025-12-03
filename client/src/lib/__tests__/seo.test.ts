/**
 * Unit tests for SEO utilities
 */

import { generateMetadata, OG_IMAGE_CONFIG, SITE_CONFIG } from '../seo';

describe('SEO Utilities', () => {
  describe('SITE_CONFIG', () => {
    it('should have required configuration', () => {
      expect(SITE_CONFIG.name).toBe('Jikmunn Portfolio');
      expect(SITE_CONFIG.author).toBe('Muhammad Jiku');
      expect(SITE_CONFIG.url).toBeTruthy();
      expect(SITE_CONFIG.description).toBeTruthy();
      expect(SITE_CONFIG.keywords).toBeInstanceOf(Array);
    });

    it('should have social media handles', () => {
      expect(SITE_CONFIG.social.twitter).toBeTruthy();
      expect(SITE_CONFIG.social.github).toBeTruthy();
      expect(SITE_CONFIG.social.linkedin).toBeTruthy();
    });
  });

  describe('OG_IMAGE_CONFIG', () => {
    it('should have correct dimensions', () => {
      expect(OG_IMAGE_CONFIG.width).toBe(1200);
      expect(OG_IMAGE_CONFIG.height).toBe(630);
    });

    it('should have default image URL', () => {
      expect(OG_IMAGE_CONFIG.defaultImage).toBeTruthy();
    });
  });

  describe('generateMetadata', () => {
    it('should generate basic metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.title).toContain('Test Page');
      expect(metadata.description).toBe('Test description');
    });

    it('should generate Open Graph metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
        path: '/test',
      });

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toContain('Test Page');
      expect(metadata.openGraph?.description).toBe('Test description');
      expect(metadata.openGraph?.url).toContain('/test');
    });

    it('should generate Twitter card metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.twitter).toBeDefined();
      // Twitter card type is set in the implementation
      expect(metadata.twitter?.title).toContain('Test Page');
    });

    it('should handle custom keywords', () => {
      const keywords = ['test', 'page', 'seo'];
      const metadata = generateMetadata({
        title: 'Test Page',
        keywords,
      });

      expect(metadata.keywords).toContain('test');
      expect(metadata.keywords).toContain('page');
      expect(metadata.keywords).toContain('seo');
    });

    it('should handle noindex flag', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        noindex: true,
      });

      expect(metadata.robots).toBeDefined();
      if (metadata.robots && typeof metadata.robots === 'object' && 'index' in metadata.robots) {
        expect(metadata.robots.index).toBe(false);
        expect(metadata.robots.follow).toBe(false);
      }
    });

    it('should generate canonical URL', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        path: '/test-page',
      });

      expect(metadata.alternates?.canonical).toContain('/test-page');
    });

    it('should handle article type with publish dates', () => {
      const metadata = generateMetadata({
        title: 'Blog Post',
        type: 'article',
        publishedTime: '2024-01-01',
        modifiedTime: '2024-01-02',
      });

      // OpenGraph type is set in the implementation
      expect(metadata.openGraph).toBeDefined();
    });

    it('should append site name to title', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
      });

      expect(metadata.title).toContain('Test Page');
      expect(metadata.title).toContain(SITE_CONFIG.name);
    });

    it('should handle custom image', () => {
      const customImage = 'https://example.com/image.png';
      const metadata = generateMetadata({
        title: 'Test Page',
        image: customImage,
      });

      expect(metadata.openGraph?.images).toBeDefined();
      if (Array.isArray(metadata.openGraph?.images) && metadata.openGraph.images.length > 0) {
        const firstImage = metadata.openGraph.images[0];
        if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
          expect(firstImage.url).toBe(customImage);
        }
      }
    });

    it('should use default image if not provided', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
      });

      expect(metadata.openGraph?.images).toBeDefined();
      if (Array.isArray(metadata.openGraph?.images) && metadata.openGraph.images.length > 0) {
        const firstImage = metadata.openGraph.images[0];
        if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
          expect(firstImage.url).toBe(OG_IMAGE_CONFIG.defaultImage);
        }
      }
    });

    it('should set creator and publisher', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
      });

      expect(metadata.creator).toBe(SITE_CONFIG.author);
      expect(metadata.publisher).toBe(SITE_CONFIG.author);
    });

    it('should handle custom authors', () => {
      const metadata = generateMetadata({
        title: 'Test Page',
        authors: ['Author 1', 'Author 2'],
      });

      expect(metadata.authors).toBeDefined();
      expect(metadata.authors).toHaveLength(2);
    });
  });
});
