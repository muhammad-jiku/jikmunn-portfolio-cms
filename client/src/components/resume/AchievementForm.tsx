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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {achievement ? 'Edit Achievement' : 'Add Achievement'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Team Lead"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Years *
            </label>
            <input
              type="text"
              value={formData.years}
              onChange={(e) => setFormData({ ...formData, years: e.target.value })}
              placeholder="e.g., 2021-2023"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description (3-4 bullet points)
              </label>
              <button
                type="button"
                onClick={addDescription}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  placeholder={`Description ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {formData.description.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : achievement ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
