import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Projects - Portfolio CMS',
  description:
    'Explore our portfolio of web development projects, applications, and technical solutions.',
  path: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
