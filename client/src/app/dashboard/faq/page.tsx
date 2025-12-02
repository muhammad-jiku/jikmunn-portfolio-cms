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
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FAQ Management</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage frequently asked questions
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>

        {faqs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No FAQs yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-6">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    {expandedId === faq.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <button onClick={() => toggleExpand(faq.id)} className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        <span className="inline-block mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Order: {faq.order}
                        </span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {expandedId === faq.id && (
                      <div className="mt-4 pl-4 border-l-2 border-blue-500">
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
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
