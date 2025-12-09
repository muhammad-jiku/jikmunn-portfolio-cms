'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { testimonialsApi } from '@/lib/api/testimonials';
import { CreateTestimonialData, Testimonial, UpdateTestimonialData } from '@/types/testimonial';
import { Edit, Plus, Quote, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsApi.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTestimonial(undefined);
    setShowForm(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateTestimonialData | UpdateTestimonialData) => {
    if (editingTestimonial) {
      await testimonialsApi.update(editingTestimonial.id, data);
    } else {
      await testimonialsApi.create(data as CreateTestimonialData);
    }
    await fetchTestimonials();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialsApi.delete(id);
      await fetchTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Testimonials
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage client testimonials and reviews
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No testimonials yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 relative hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/20" />

                <div className="flex items-start gap-4 mb-4">
                  {testimonial.imageUrl ? (
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {testimonial.jobPosition}
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                      {testimonial.platform}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-4">
                  {testimonial.testimonial}
                </p>

                <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-primary hover:text-primary-hover"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <TestimonialForm
            testimonial={editingTestimonial}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
