/**
 * Client-side metadata helpers for dynamic pages
 * Since client components can't export metadata, these helpers update meta tags dynamically
 */

/**
 * Update page metadata dynamically from client components
 */
export function updatePageMetadata({
  title,
  description,
  image,
  keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {
  if (typeof document === 'undefined') return;

  // Update title
  if (title) {
    document.title = title;
  }

  // Update meta description
  if (description) {
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:description', description);
  }

  // Update meta image
  if (image) {
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('name', 'twitter:image', image);
  }

  // Update keywords
  if (keywords) {
    updateMetaTag('name', 'keywords', keywords);
  }

  // Update OG title
  if (title) {
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('name', 'twitter:title', title);
  }
}

/**
 * Helper to update or create meta tag
 */
function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

/**
 * Generate Open Graph image URL for dynamic content
 */
export function generateOGImageUrl(params: {
  title: string;
  type?: 'blog' | 'project';
  category?: string;
  status?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const searchParams = new URLSearchParams({
    title: params.title,
    ...(params.type && { type: params.type }),
    ...(params.category && { category: params.category }),
    ...(params.status && { status: params.status }),
  });

  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleStructuredData({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  image,
  url,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.png`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jikmunn Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Inject structured data into the page
 */
export function injectStructuredData(data: object) {
  if (typeof document === 'undefined') return;

  const scriptId = 'structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
