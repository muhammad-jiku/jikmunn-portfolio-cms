// Trash API integration

import { CleanupResult, RestoreResult, Trash, TrashListResponse } from '@/types/trash';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const trashApi = {
  // Get all trash items with pagination
  getAll: async (page = 1, limit = 10): Promise<TrashListResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trash?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trash items');
    }

    return response.json();
  },

  // Get single trash item by ID
  getById: async (id: string): Promise<Trash> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trash item');
    }

    const data = await response.json();
    return data.data;
  },

  // Restore item from trash
  restore: async (id: string): Promise<RestoreResult> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trash/${id}/restore`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to restore item');
    }

    const data = await response.json();
    return data.data;
  },

  // Permanently delete item
  permanentlyDelete: async (id: string): Promise<RestoreResult> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trash/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to permanently delete item');
    }

    const data = await response.json();
    return data.data;
  },

  // Cleanup expired trash (SUPER_ADMIN only)
  cleanup: async (): Promise<CleanupResult> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/trash/cleanup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cleanup expired trash');
    }

    const data = await response.json();
    return data.data;
  },
};
