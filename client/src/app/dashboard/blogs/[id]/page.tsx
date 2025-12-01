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
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading blog...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!blog) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-lg text-gray-600 dark:text-gray-400">Blog not found</div>
          <button
            onClick={() => router.push('/dashboard/blogs')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Blogs
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/dashboard/blogs')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/dashboard/blogs/edit/${blog.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Blog Title & Status */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{blog.title}</h1>
              {blog.subtitle && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">{blog.subtitle}</p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(blog.status)}`}
            >
              {blog.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Published: {new Date(blog.publishedAt).toLocaleDateString()}
          </div>
          {blog.topic && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {blog.topic}
            </div>
          )}
          {blog.author && (
            <div className="flex items-center gap-2">
              By: <span className="font-medium">{blog.author.name}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {blog.videoUrl && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-bold">Video Explanation</h2>
            </div>
            <a
              href={blog.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {blog.videoUrl}
            </a>
          </div>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Content</h2>
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {blog.description}
            </div>
          </div>
        </div>

        {/* Images Gallery */}
        {blog.images && blog.images.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Images ({blog.images.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3">Timeline</h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Created: {new Date(blog.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: {new Date(blog.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
