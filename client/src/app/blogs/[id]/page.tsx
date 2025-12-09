'use client';

import { blogsApi } from '@/lib/api/blogs';
import {
  generateArticleStructuredData,
  generateOGImageUrl,
  injectStructuredData,
  updatePageMetadata,
} from '@/lib/client-metadata';
import { Blog } from '@/types/blog';
import { ArrowLeft, Calendar, Tag, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PublicBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  // Update metadata when blog loads
  useEffect(() => {
    if (blog) {
      const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blogs/${blog.id}`;
      const ogImage = generateOGImageUrl({
        title: blog.title,
        type: 'blog',
        category: blog.topic || 'Blog',
        status: blog.status,
      });

      // Update page metadata
      updatePageMetadata({
        title: `${blog.title} | Jikmunn Portfolio`,
        description: blog.subtitle || blog.description.substring(0, 160),
        image: ogImage,
        keywords: blog.tags.join(', '),
      });

      // Add structured data for SEO
      const structuredData = generateArticleStructuredData({
        title: blog.title,
        description: blog.subtitle || blog.description.substring(0, 200),
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
        author: 'Muhammad Jiku',
        image: ogImage,
        url: blogUrl,
      });

      injectStructuredData(structuredData);
    }
  }, [blog]);

  const fetchBlog = async (id: string) => {
    try {
      setLoading(true);
      const data = await blogsApi.getPublicBlog(id);
      setBlog(data);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-3 sm:px-4">
        <div className="max-w-md w-full text-center space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Blog not found
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            The blog you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* Blog Header */}
        <article className="space-y-4 sm:space-y-6">
          <header className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {blog.title}
            </h1>
            {blog.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
                {blog.subtitle}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {blog.topic && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {blog.topic}
                </div>
              )}
              {blog.author && (
                <div>
                  By{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {blog.author.name}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-[10px] sm:text-xs md:text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Video Explanation */}
          {blog.videoUrl && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Video Explanation
                </h2>
              </div>
              <a
                href={blog.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                Watch Video →
              </a>
            </div>
          )}

          {/* Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {blog.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={`Blog image ${image.order}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {blog.description}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Published on {new Date(blog.publishedAt).toLocaleDateString()}
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Back to Home
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
