import { Blog, CreateBlogData, UpdateBlogData } from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const blogsApi = {
  // Get all blogs (with pagination)
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    tags?: string[];
  }): Promise<PaginatedResponse<Blog>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.tags) params.tags.forEach((tag) => queryParams.append('tags', tag));

    const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },

  // Get single blog
  getBlog: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
  },

  // Create blog
  createBlog: async (data: CreateBlogData): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
  },

  // Update blog
  updateBlog: async (id: string, data: UpdateBlogData): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update blog');
    return response.json();
  },

  // Delete blog (soft delete)
  deleteBlog: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete blog');
  },

  // Upload blog images
  uploadImages: async (id: string, files: File[]): Promise<{ urls: string[] }> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const response = await fetch(`${API_BASE_URL}/blogs/${id}/images`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload images');
    return response.json();
  },

  // Get public blogs (production only)
  getPublicBlogs: async (params?: {
    page?: number;
    limit?: number;
    tags?: string[];
  }): Promise<PaginatedResponse<Blog>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.tags) params.tags.forEach((tag) => queryParams.append('tags', tag));

    const response = await fetch(`${API_BASE_URL}/blogs/public?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch public blogs');
    return response.json();
  },

  // Get public blog by ID
  getPublicBlog: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/public/${id}`);
    if (!response.ok) throw new Error('Failed to fetch public blog');
    return response.json();
  },
};
