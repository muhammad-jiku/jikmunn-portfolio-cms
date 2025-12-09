'use client';

import { CreateFAQData, FAQ, UpdateFAQData } from '@/types/faq';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FAQFormProps {
  faq?: FAQ;
  onSubmit: (data: CreateFAQData | UpdateFAQData) => Promise<void>;
  onClose: () => void;
}

export default function FAQForm({ faq, onSubmit, onClose }: FAQFormProps) {
  const [formData, setFormData] = useState<CreateFAQData>({
    question: '',
    answer: '',
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question,
        answer: faq.answer,
        order: faq.order,
      });
    }
  }, [faq]);

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
            {faq ? 'Edit FAQ' : 'Add FAQ'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Question *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter the question"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Answer *
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={6}
              placeholder="Enter the answer"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 sm:mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="0"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
            />
            <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
              Lower numbers appear first
            </p>
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
              {loading ? 'Saving...' : faq ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
