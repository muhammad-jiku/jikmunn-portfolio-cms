'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { blogsApi } from '@/lib/api/blogs';
import { Blog, BlogStatus } from '@/types/blog';
import { ArrowLeft, Calendar, Edit, Tag, Trash2, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      setLoading(true);
      const data = await blogsApi.getBlog(id);
      setBlog(data);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      alert('Failed to load blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blog || !confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogsApi.deleteBlog(blog.id);
      alert('Blog deleted successfully!');
      router.push('/dashboard/blogs');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const getStatusColor = (status: BlogStatus) => {
    const colors = {
      [BlogStatus.IN_PROGRESS]:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      [BlogStatus.DEVELOPMENT]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [BlogStatus.PRODUCTION]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [BlogStatus.UPDATED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[status] || colors[BlogStatus.IN_PROGRESS];
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Loading blog...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!blog) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-3 sm:space-y-4">
          <div className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Blog not found
          </div>
          <button
            onClick={() => router.push('/dashboard/blogs')}
            className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
          >
            Back to Blogs
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => router.push('/dashboard/blogs')}
            className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Blogs
          </button>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.push(`/dashboard/blogs/edit/${blog.id}`)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
            >
              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Blog Title & Status */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                {blog.title}
              </h1>
              {blog.subtitle && (
                <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mt-1.5 sm:mt-2">
                  {blog.subtitle}
                </p>
              )}
            </div>
            <span
              className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(blog.status)}`}
            >
              {blog.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Published: {new Date(blog.publishedAt).toLocaleDateString()}
          </div>
          {blog.topic && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {blog.topic}
            </div>
          )}
          {blog.author && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              By: <span className="font-medium">{blog.author.name}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-1.5 sm:mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {blog.videoUrl && (
          <div className="bg-white dark:bg-zinc-800 p-4 sm:p-5 md:p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 dark:text-zinc-400" />
              <h2 className="text-lg sm:text-xl font-bold">Video Explanation</h2>
            </div>
            <a
              href={blog.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-primary hover:text-primary-hover break-all"
            >
              {blog.videoUrl}
            </a>
          </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-zinc-800 p-4 sm:p-5 md:p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Content</h2>
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
              {blog.description}
            </div>
          </div>
        </div>

        {/* Images Gallery */}
        {blog.images && blog.images.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-4 sm:p-5 md:p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Images ({blog.images.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {blog.images.map((image) => (
                <div key={image.id} className="aspect-video rounded-lg overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={`Image ${image.order}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="bg-white dark:bg-zinc-800 p-4 sm:p-5 md:p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Timeline</h2>
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Created: {new Date(blog.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Last Updated: {new Date(blog.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
