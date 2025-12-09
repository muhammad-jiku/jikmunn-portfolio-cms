import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard - Portfolio CMS',
  description: 'Manage your portfolio content, projects, blogs, and more.',
  path: '/dashboard',
  noindex: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}
