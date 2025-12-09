import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Blogs - Portfolio CMS',
  description: 'Read our latest blog posts about web development, programming, and technology.',
  path: '/blogs',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen">{children}</div>;
}
