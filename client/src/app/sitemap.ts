/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml with all public routes
 */

import { SITE_CONFIG } from '@/lib/seo';
import { MetadataRoute } from 'next';

// Base URL for the site
const BASE_URL = SITE_CONFIG.url;

/**
 * Generate sitemap with all routes
 * This will be automatically served at /sitemap.xml by Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Fetch dynamic routes from API
  try {
    // Fetch all published projects
    const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/public`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const projects = projectsRes.ok ? await projectsRes.json() : [];

    // Fetch all published blogs
    const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/public`, {
      next: { revalidate: 3600 },
    });
    const blogs = blogsRes.ok ? await blogsRes.json() : [];

    // Generate project routes
    const projectRoutes: MetadataRoute.Sitemap = projects.map((project: any) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: new Date(project.updatedAt || project.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Generate blog routes
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
      url: `${BASE_URL}/blogs/${blog.id}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static routes if API fails
    return staticRoutes;
  }
}
