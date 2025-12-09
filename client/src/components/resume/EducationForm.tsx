'use client';

import { CreateEducationData, Education, UpdateEducationData } from '@/types/resume';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EducationFormProps {
  education?: Education;
  onSubmit: (data: CreateEducationData | UpdateEducationData) => Promise<void>;
  onClose: () => void;
}

export default function EducationForm({ education, onSubmit, onClose }: EducationFormProps) {
  const [formData, setFormData] = useState<CreateEducationData>({
    degree: '',
    years: '',
    university: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        years: education.years,
        university: education.university,
      });
    }
  }, [education]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {education ? 'Edit Education' : 'Add Education'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Degree *
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g., Bachelor of Science in Computer Science"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Years *
            </label>
            <input
              type="text"
              value={formData.years}
              onChange={(e) => setFormData({ ...formData, years: e.target.value })}
              placeholder="e.g., 2015-2019"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              University/Institution *
            </label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              placeholder="e.g., Stanford University"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Saving...' : education ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
