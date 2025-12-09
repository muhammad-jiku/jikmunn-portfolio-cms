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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
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
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John Doe"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
                Job Position *
              </label>
              <input
                type="text"
                value={formData.jobPosition}
                onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                placeholder="e.g., CEO at TechCorp"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Platform *
            </label>
            <select
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value as TestimonialPlatform })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            >
              <option value={TestimonialPlatform.UPWORK}>Upwork</option>
              <option value={TestimonialPlatform.LINKEDIN}>LinkedIn</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Testimonial *
            </label>
            <textarea
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows={6}
              placeholder="Write the testimonial..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-zinc-200 dark:border-zinc-800">
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
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base font-medium bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Saving...' : testimonial ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
