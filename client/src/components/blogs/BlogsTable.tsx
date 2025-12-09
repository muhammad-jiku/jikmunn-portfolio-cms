'use client';

import { Blog, BlogStatus } from '@/types/blog';
import { Calendar, Edit, Eye, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface BlogsTableProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onView: (blog: Blog) => void;
}

type SortField = 'title' | 'status' | 'publishedAt' | 'topic';
type SortOrder = 'asc' | 'desc';

export default function BlogsTable({ blogs, onEdit, onDelete, onView }: BlogsTableProps) {
  const [sortField, setSortField] = useState<SortField>('publishedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    let aValue: string | number = '';
    let bValue: string | number = '';

    switch (sortField) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'publishedAt':
        aValue = new Date(a.publishedAt).getTime();
        bValue = new Date(b.publishedAt).getTime();
        break;
      case 'topic':
        aValue = (a.topic || '').toLowerCase();
        bValue = (b.topic || '').toLowerCase();
        break;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <th
              onClick={() => handleSort('title')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Title {getSortIcon('title')}
            </th>
            <th
              onClick={() => handleSort('topic')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Topic {getSortIcon('topic')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Tags
            </th>
            <th
              onClick={() => handleSort('status')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Status {getSortIcon('status')}
            </th>
            <th
              onClick={() => handleSort('publishedAt')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Published {getSortIcon('publishedAt')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-950 divide-y divide-zinc-200 dark:divide-zinc-800">
          {sortedBlogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {blog.title}
                  </div>
                  {blog.subtitle && (
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{blog.subtitle}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {blog.topic && (
                  <span className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <Tag className="w-3 h-3" />
                    {blog.topic}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="px-2 py-1 text-zinc-500 dark:text-zinc-400 text-xs">
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}
                >
                  {blog.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(blog)}
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    title="View blog"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(blog)}
                    className="text-primary hover:text-primary-hover dark:text-pink-400 dark:hover:text-pink-300"
                    title="Edit blog"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedBlogs.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          No blogs found. Create your first blog post!
        </div>
      )}
    </div>
  );
}
