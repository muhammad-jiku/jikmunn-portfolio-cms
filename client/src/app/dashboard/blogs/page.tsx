'use client';

import BlogForm from '@/components/blogs/BlogForm';
import BlogsTable from '@/components/blogs/BlogsTable';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { blogsApi } from '@/lib/api/blogs';
import { Blog, BlogStatus, CreateBlogData } from '@/types/blog';
import { Filter, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BlogStatus | 'ALL'>('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogsApi.getBlogs({ limit: 100 });
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      alert('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (data: CreateBlogData) => {
    try {
      setIsSubmitting(true);
      const newBlog = await blogsApi.createBlog(data);
      setBlogs([...blogs, newBlog]);
      setShowForm(false);
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBlog = async (data: CreateBlogData) => {
    if (!editingBlog) return;

    try {
      setIsSubmitting(true);
      const updatedBlog = await blogsApi.updateBlog(editingBlog.id, data);
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
      setEditingBlog(null);
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? It will be moved to trash.')) {
      return;
    }

    try {
      await blogsApi.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const handleViewBlog = (blog: Blog) => {
    window.location.href = `/dashboard/blogs/${blog.id}`;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading blogs...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Blogs</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Manage your blog posts and articles
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            New Blog
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-zinc-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-zinc-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as BlogStatus | 'ALL')}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary dark:bg-zinc-800"
            >
              <option value="ALL">All Status</option>
              <option value={BlogStatus.IN_PROGRESS}>In Progress</option>
              <option value={BlogStatus.DEVELOPMENT}>Development</option>
              <option value={BlogStatus.UPDATED}>Updated</option>
              <option value={BlogStatus.PRODUCTION}>Production</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">{blogs.length}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Blogs</div>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter((b) => b.status === BlogStatus.PRODUCTION).length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Published</div>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-bold text-yellow-600">
              {blogs.filter((b) => b.status === BlogStatus.IN_PROGRESS).length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-bold text-primary">
              {blogs.filter((b) => b.status === BlogStatus.DEVELOPMENT).length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Development</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <BlogsTable
            blogs={filteredBlogs}
            onEdit={(blog) => setEditingBlog(blog)}
            onDelete={handleDeleteBlog}
            onView={handleViewBlog}
          />
        </div>

        {/* Modal Form */}
        {(showForm || editingBlog) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <BlogForm
                  initialData={
                    editingBlog
                      ? {
                          title: editingBlog.title,
                          subtitle: editingBlog.subtitle,
                          description: editingBlog.description,
                          topic: editingBlog.topic,
                          tags: editingBlog.tags,
                          status: editingBlog.status,
                          videoUrl: editingBlog.videoUrl,
                        }
                      : undefined
                  }
                  onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                  }}
                  isLoading={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
