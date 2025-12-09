import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Projects - Portfolio CMS',
  description:
    'Explore our portfolio of web development projects, applications, and technical solutions.',
  path: '/projects',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen">{children}</div>;
}
