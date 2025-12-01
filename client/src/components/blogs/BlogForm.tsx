'use client';

import { BlogStatus, CreateBlogData } from '@/types/blog';
import { X } from 'lucide-react';
import { useState } from 'react';

interface BlogFormProps {
  initialData?: CreateBlogData;
  onSubmit: (data: CreateBlogData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({ initialData, onSubmit, onCancel, isLoading }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogData>(
    initialData || {
      title: '',
      description: '',
      tags: [],
      status: BlogStatus.IN_PROGRESS,
    }
  );

  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Topic</label>
          <input
            type="text"
            placeholder="e.g., Web Development, AI, Cloud Computing"
            value={formData.topic || ''}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status *</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogStatus })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value={BlogStatus.IN_PROGRESS}>In Progress</option>
            <option value={BlogStatus.DEVELOPMENT}>Development</option>
            <option value={BlogStatus.UPDATED}>Updated</option>
            <option value={BlogStatus.PRODUCTION}>Production</option>
          </select>
        </div>
      </div>

      {/* Description - Rich Text Area */}
      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={8}
          placeholder="Write your blog content here..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Tip: Use markdown formatting for better content structure
        </p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag and press Enter"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(index)}>
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Video URL</label>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={formData.videoUrl || ''}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional: Add a video explanation for your blog
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  );
}
