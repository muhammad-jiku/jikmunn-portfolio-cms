// API utility functions for projects
import { CreateProjectData, Project, UpdateProjectData } from '@/types/project';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const projectsApi = {
  // Get all projects with pagination and filters
  getProjects: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
  }): Promise<PaginatedResponse<Project>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);

    const response = await fetch(`${API_BASE_URL}/api/v1/projects?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
  },

  // Get a single project by ID
  getProject: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }

    return response.json();
  },

  // Create a new project
  createProject: async (data: CreateProjectData): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    return response.json();
  },

  // Update a project
  updateProject: async (id: string, data: UpdateProjectData): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    return response.json();
  },

  // Delete a project (moves to trash)
  deleteProject: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  },

  // Upload media for a project
  uploadMedia: async (projectId: string, files: File[]): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('media', file);
    });

    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}/media`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload media');
    }
  },
};
