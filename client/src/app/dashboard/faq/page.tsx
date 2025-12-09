'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FAQForm from '@/components/faq/FAQForm';
import { faqApi } from '@/lib/api/faq';
import { CreateFAQData, FAQ, UpdateFAQData } from '@/types/faq';
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | undefined>();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await faqApi.getAll();
      // Sort by order
      setFaqs(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingFaq(undefined);
    setShowForm(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateFAQData | UpdateFAQData) => {
    if (editingFaq) {
      await faqApi.update(editingFaq.id, data);
    } else {
      await faqApi.create(data as CreateFAQData);
    }
    await fetchFaqs();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await faqApi.delete(id);
      await fetchFaqs();
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
              FAQ Management
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Manage frequently asked questions
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Add FAQ
          </button>
        </div>

        {faqs.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 sm:p-6 md:p-8 text-center">
            <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400">
              No FAQs yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow divide-y divide-zinc-200 dark:divide-zinc-700">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                  >
                    {expandedId === faq.id ? (
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <button onClick={() => toggleExpand(faq.id)} className="flex-1 text-left">
                        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                          {faq.question}
                        </h3>
                        <span className="inline-block mt-1 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                          Order: {faq.order}
                        </span>
                      </button>

                      <div className="flex gap-1.5 sm:gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-primary hover:text-primary-hover"
                        >
                          <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {expandedId === faq.id && (
                      <div className="mt-3 sm:mt-4 pl-3 sm:pl-4 border-l-2 border-purple-500">
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <FAQForm faq={editingFaq} onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
        )}
      </div>
    </DashboardLayout>
  );
}
