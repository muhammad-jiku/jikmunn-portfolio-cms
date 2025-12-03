import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard - Portfolio CMS',
  description: 'Manage your portfolio content, projects, blogs, and more.',
  path: '/dashboard',
  noindex: true,
});

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
