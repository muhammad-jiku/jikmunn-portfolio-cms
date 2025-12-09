'use client';

import { Project } from '@/types/project';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}

export default function ProjectsTable({ projects, onEdit, onDelete, onView }: ProjectsTableProps) {
  const [sortField, setSortField] = useState<keyof Project>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      DEVELOPMENT: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      PRODUCTION: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      UPDATED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th
              onClick={() => handleSort('title')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => handleSort('category')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => handleSort('status')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Media
            </th>
            <th
              onClick={() => handleSort('viewCount')}
              className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Views {sortField === 'viewCount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-950 divide-y divide-zinc-200 dark:divide-zinc-800">
          {sortedProjects.map((project) => (
            <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {project.title}
                    </div>
                    {project.isFeatured && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-zinc-900 dark:text-zinc-50">{project.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                {project.media.length} files
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                {project.viewCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(project)}
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(project)}
                    className="text-primary hover:text-primary-hover dark:text-pink-400 dark:hover:text-pink-300"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedProjects.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          No projects found. Create your first project!
        </div>
      )}
    </div>
  );
}
