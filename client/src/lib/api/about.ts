import { About, UpdateAboutData } from '@/types/about';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const aboutApi = {
  // Get about statistics
  getAbout: async (): Promise<About> => {
    const response = await fetch(`${API_BASE_URL}/about`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch about statistics');
    return response.json();
  },

  // Update about statistics
  updateAbout: async (data: UpdateAboutData): Promise<About> => {
    const response = await fetch(`${API_BASE_URL}/about`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update about statistics');
    return response.json();
  },

  // Reset about statistics
  resetAbout: async (): Promise<About> => {
    const response = await fetch(`${API_BASE_URL}/about/reset`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to reset about statistics');
    return response.json();
  },
};
