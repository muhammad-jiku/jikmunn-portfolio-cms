/**
 * SEO Metadata Utilities
 * Provides helpers for generating dynamic metadata, Open Graph tags, and structured data
 */

import { Metadata } from 'next';

// Site configuration
export const SITE_CONFIG = {
  name: 'Jikmunn Portfolio',
  description: 'Full-stack developer portfolio showcasing projects, blogs, and technical expertise',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jikmunn.com',
  author: 'Muhammad Jiku',
  keywords: [
    'portfolio',
    'full-stack developer',
    'web development',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
  ],
  social: {
    twitter: '@jikmunn',
    github: 'muhammad-jiku',
    linkedin: 'muhammad-jiku',
  },
};

// Open Graph image configuration
export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  defaultImage: `${SITE_CONFIG.url}/og-default.png`,
};

interface GenerateMetadataParams {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata({
  title,
  description = SITE_CONFIG.description,
  keywords = SITE_CONFIG.keywords,
  image = OG_IMAGE_CONFIG.defaultImage,
  path = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [SITE_CONFIG.author],
  noindex = false,
}: GenerateMetadataParams): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: authors.map((name) => ({ name })),
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: SITE_CONFIG.social.twitter,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for project detail pages
 */
export function generateProjectMetadata({
  title,
  description,
  category,
  techStack,
  images,
  slug,
}: {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  images?: string[];
  slug: string;
}): Metadata {
  const keywords = [
    ...SITE_CONFIG.keywords,
    category,
    ...techStack.slice(0, 5),
    'project',
    'case study',
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    image: images?.[0] || OG_IMAGE_CONFIG.defaultImage,
    path: `/projects/${slug}`,
    type: 'article',
  });
}

/**
 * Generate metadata for blog post pages
 */
export function generateBlogMetadata({
  title,
  subtitle,
  content,
  topic,
  tags,
  images,
  slug,
  publishedAt,
  updatedAt,
}: {
  title: string;
  subtitle?: string;
  content: string;
  topic?: string;
  tags: string[];
  images?: string[];
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
}): Metadata {
  const description =
    subtitle ||
    content
      .substring(0, 160)
      .replace(/[#*`\n]/g, '')
      .trim() + '...';

  const keywords = [
    ...SITE_CONFIG.keywords,
    ...(topic ? [topic] : []),
    ...tags.slice(0, 10),
    'blog',
    'tutorial',
    'guide',
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    image: images?.[0] || OG_IMAGE_CONFIG.defaultImage,
    path: `/blogs/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt,
  });
}

/**
 * Generate structured data (JSON-LD) for a person
 */
export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.url,
    jobTitle: 'Full Stack Developer',
    sameAs: [
      `https://github.com/${SITE_CONFIG.social.github}`,
      `https://linkedin.com/in/${SITE_CONFIG.social.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`,
    ],
  };
}

/**
 * Generate structured data (JSON-LD) for a blog post
 */
export function generateBlogStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  image,
  slug,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || OG_IMAGE_CONFIG.defaultImage,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blogs/${slug}`,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for a project
 */
export function generateProjectStructuredData({
  title,
  description,
  image,
  slug,
  startDate,
  endDate,
}: {
  title: string;
  description: string;
  image?: string;
  slug: string;
  startDate?: string;
  endDate?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: image || OG_IMAGE_CONFIG.defaultImage,
    creator: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
    ...(startDate && { dateCreated: startDate }),
    ...(endDate && { dateModified: endDate }),
    url: `${SITE_CONFIG.url}/projects/${slug}`,
  };
}

/**
 * Generate breadcrumb structured data (JSON-LD)
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
