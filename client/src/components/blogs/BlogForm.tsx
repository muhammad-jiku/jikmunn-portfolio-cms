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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Topic</label>
          <input
            type="text"
            placeholder="e.g., Web Development, AI, Cloud Computing"
            value={formData.topic || ''}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status *</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogStatus })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
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
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={8}
          placeholder="Write your blog content here..."
          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 font-mono text-xs sm:text-sm"
          required
        />
        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Tip: Use markdown formatting for better content structure
        </p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag and press Enter"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs sm:text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(index)}>
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Video URL</label>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={formData.videoUrl || ''}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
        />
        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Optional: Add a video explanation for your blog
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg text-sm sm:text-base font-medium disabled:opacity-50 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  );
}
