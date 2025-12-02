import { CreateServiceData, Service, UpdateServiceData } from '@/types/service';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const servicesApi = {
  // Get all services
  getServices: async (): Promise<Service[]> => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  // Get single service
  getService: async (id: string): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  // Create service
  createService: async (data: CreateServiceData): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create service');
    return response.json();
  },

  // Update service
  updateService: async (id: string, data: UpdateServiceData): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update service');
    return response.json();
  },

  // Delete service
  deleteService: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete service');
  },
};
