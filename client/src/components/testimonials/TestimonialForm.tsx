'use client';

import {
  CreateTestimonialData,
  Testimonial,
  TestimonialPlatform,
  UpdateTestimonialData,
} from '@/types/testimonial';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSubmit: (data: CreateTestimonialData | UpdateTestimonialData) => Promise<void>;
  onClose: () => void;
}

export default function TestimonialForm({ testimonial, onSubmit, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState<CreateTestimonialData>({
    name: '',
    jobPosition: '',
    imageUrl: '',
    testimonial: '',
    platform: TestimonialPlatform.UPWORK,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        jobPosition: testimonial.jobPosition,
        imageUrl: testimonial.imageUrl || '',
        testimonial: testimonial.testimonial,
        platform: testimonial.platform,
      });
    }
  }, [testimonial]);

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
            {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
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
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Job Position *
              </label>
              <input
                type="text"
                value={formData.jobPosition}
                onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                placeholder="e.g., CEO at TechCorp"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Platform *
            </label>
            <select
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value as TestimonialPlatform })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            >
              <option value={TestimonialPlatform.UPWORK}>Upwork</option>
              <option value={TestimonialPlatform.LINKEDIN}>LinkedIn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Testimonial *
            </label>
            <textarea
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows={6}
              placeholder="Write the testimonial..."
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
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
              {loading ? 'Saving...' : testimonial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
