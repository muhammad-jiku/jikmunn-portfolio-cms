import { CreateFAQData, FAQ, UpdateFAQData } from '@/types/faq';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const faqApi = {
  // Get all FAQs
  getAll: async (): Promise<FAQ[]> => {
    const response = await fetch(`${API_BASE_URL}/faq`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch FAQs');
    return response.json();
  },

  // Get single FAQ
  get: async (id: string): Promise<FAQ> => {
    const response = await fetch(`${API_BASE_URL}/faq/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch FAQ');
    return response.json();
  },

  // Create FAQ
  create: async (data: CreateFAQData): Promise<FAQ> => {
    const response = await fetch(`${API_BASE_URL}/faq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create FAQ');
    return response.json();
  },

  // Update FAQ
  update: async (id: string, data: UpdateFAQData): Promise<FAQ> => {
    const response = await fetch(`${API_BASE_URL}/faq/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update FAQ');
    return response.json();
  },

  // Delete FAQ
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/faq/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete FAQ');
  },
};
