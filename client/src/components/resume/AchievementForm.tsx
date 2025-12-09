'use client';

import { Achievement, CreateAchievementData, UpdateAchievementData } from '@/types/resume';
import { Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AchievementFormProps {
  achievement?: Achievement;
  onSubmit: (data: CreateAchievementData | UpdateAchievementData) => Promise<void>;
  onClose: () => void;
}

export default function AchievementForm({ achievement, onSubmit, onClose }: AchievementFormProps) {
  const [formData, setFormData] = useState<CreateAchievementData>({
    role: '',
    years: '',
    description: [''],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (achievement) {
      setFormData({
        role: achievement.role,
        years: achievement.years,
        description: achievement.description.length > 0 ? achievement.description : [''],
      });
    }
  }, [achievement]);

  const addDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  const removeDescription = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  const updateDescription = (index: number, value: string) => {
    const updated = [...formData.description];
    updated[index] = value;
    setFormData({ ...formData, description: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = { ...formData, description: formData.description.filter((d) => d.trim()) };
    setLoading(true);
    try {
      await onSubmit(filtered);
      onClose();
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {achievement ? 'Edit Achievement' : 'Add Achievement'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Role/Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Team Lead"
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
                placeholder="e.g., 2021-2023"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Description
              </label>
              <button
                type="button"
                onClick={addDescription}
                className="text-primary hover:text-primary-hover dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Point
              </button>
            </div>
            <div className="space-y-2">
              {formData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder="Describe the achievement..."
                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    disabled={formData.description.length === 1}
                    className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
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
              {loading ? 'Saving...' : achievement ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
