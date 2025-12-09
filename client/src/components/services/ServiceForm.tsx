'use client';

import { CreateServiceData, Service, UpdateServiceData } from '@/types/service';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: CreateServiceData | UpdateServiceData) => Promise<void>;
  onClose: () => void;
}

// Common icon emojis for services
const ICON_OPTIONS = [
  '💻',
  '🎨',
  '📱',
  '🚀',
  '⚡',
  '🔧',
  '📊',
  '🌐',
  '💡',
  '🎯',
  '🛠️',
  '📈',
  '🔒',
  '☁️',
  '🤖',
  '📝',
];

// Preset color options
const COLOR_PRESETS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#6366F1',
  '#14B8A6',
  '#F97316',
  '#84CC16',
  '#A855F7',
];

export default function ServiceForm({ service, onSubmit, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState<CreateServiceData>({
    title: '',
    subtitle: '',
    description: '',
    iconUrl: '💻',
    color: '#3B82F6',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        subtitle: service.subtitle || '',
        description: service.description,
        iconUrl: service.iconUrl,
        color: service.color,
      });
    }
  }, [service]);

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
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Icon and Color Selection */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Icon
              </label>
              <div className="grid grid-cols-8 gap-2">
                {ICON_OPTIONS.map((icon) => (
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

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      formData.color === color ? 'ring-2 ring-primary' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#000000"
                  className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50 text-sm font-mono"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-12 h-10 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Preview:</p>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: formData.color }}
              >
                {formData.iconUrl}
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {formData.title || 'Service Title'}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {formData.subtitle || 'Service Subtitle'}
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
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
              {loading ? 'Saving...' : service ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
