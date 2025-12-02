import { CreateTestimonialData, Testimonial, UpdateTestimonialData } from '@/types/testimonial';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const testimonialsApi = {
  // Get all testimonials
  getAll: async (): Promise<Testimonial[]> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  // Get single testimonial
  get: async (id: string): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch testimonial');
    return response.json();
  },

  // Create testimonial
  create: async (data: CreateTestimonialData): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create testimonial');
    return response.json();
  },

  // Update testimonial
  update: async (id: string, data: UpdateTestimonialData): Promise<Testimonial> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update testimonial');
    return response.json();
  },

  // Delete testimonial
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete testimonial');
  },
};
