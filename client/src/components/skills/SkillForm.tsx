'use client';

import { CreateSkillData, Skill, UpdateSkillData } from '@/types/skill';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (data: CreateSkillData | UpdateSkillData) => Promise<void>;
  onClose: () => void;
}

// Common skill icons
const SKILL_ICONS = [
  '⚛️',
  '🔷',
  '🟢',
  '🔶',
  '🐍',
  '☕',
  '📱',
  '💻',
  '🌐',
  '🗄️',
  '⚙️',
  '🔧',
  '🎨',
  '📊',
  '🔒',
  '☁️',
];

export default function SkillForm({ skill, onSubmit, onClose }: SkillFormProps) {
  const [formData, setFormData] = useState<CreateSkillData>({
    name: '',
    progress: 50,
    iconUrl: '⚛️',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        progress: skill.progress,
        iconUrl: skill.iconUrl,
      });
    }
  }, [skill]);

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

  const getProgressColor = () => {
    if (formData.progress >= 80) return 'bg-green-500';
    if (formData.progress >= 60) return 'bg-blue-500';
    if (formData.progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {skill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {SKILL_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, iconUrl: icon })}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl transition-all ${
                    formData.iconUrl === icon
                      ? 'ring-2 ring-primary bg-purple-50 dark:bg-purple-900/20'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.iconUrl}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="Or enter custom emoji/URL"
              className="mt-2 w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., React, Python, AWS"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Progress: {formData.progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800"
            />
            <div className="mt-2 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getProgressColor()}`}
                style={{ width: `${formData.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Preview:</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-2xl">
                {formData.iconUrl}
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {formData.name || 'Skill Name'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor()}`}
                      style={{ width: `${formData.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {formData.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Saving...' : skill ? 'Update Skill' : 'Create Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
