import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Blogs - Portfolio CMS',
  description: 'Read our latest blog posts about web development, programming, and technology.',
  path: '/blogs',
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
