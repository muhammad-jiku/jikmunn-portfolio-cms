'use client';

import {
  CreateProfessionalExperienceData,
  ProfessionalExperience,
  UpdateProfessionalExperienceData,
} from '@/types/resume';
import { Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExperienceFormProps {
  experience?: ProfessionalExperience;
  onSubmit: (
    data: CreateProfessionalExperienceData | UpdateProfessionalExperienceData
  ) => Promise<void>;
  onClose: () => void;
}

export default function ExperienceForm({ experience, onSubmit, onClose }: ExperienceFormProps) {
  const [formData, setFormData] = useState<CreateProfessionalExperienceData>({
    jobTitle: '',
    companyName: '',
    years: '',
    achievements: [''],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        jobTitle: experience.jobTitle,
        companyName: experience.companyName,
        years: experience.years,
        achievements: experience.achievements.length > 0 ? experience.achievements : [''],
      });
    }
  }, [experience]);

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...formData.achievements];
    updated[index] = value;
    setFormData({ ...formData, achievements: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = { ...formData, achievements: formData.achievements.filter((a) => a.trim()) };
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {experience ? 'Edit Experience' : 'Add Experience'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g., Senior Developer"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g., TechCorp Inc."
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Years *
            </label>
            <input
              type="text"
              value={formData.years}
              onChange={(e) => setFormData({ ...formData, years: e.target.value })}
              placeholder="e.g., 2020-2023"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Achievements
              </label>
              <button
                type="button"
                onClick={addAchievement}
                className="text-primary hover:text-primary-hover dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1 text-xs sm:text-sm"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Add Achievement
              </button>
            </div>
            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    placeholder="Describe an achievement..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    disabled={formData.achievements.length === 1}
                    className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Saving...' : experience ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
