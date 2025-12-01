// Blog types matching backend schema

export enum BlogStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  UPDATED = 'UPDATED',
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

export interface BlogImage {
  id: string;
  url: string;
  order: number;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  topic?: string;
  tags: string[];
  status: BlogStatus;
  videoUrl?: string;
  images: BlogImage[];
  publishedAt: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateBlogData {
  title: string;
  subtitle?: string;
  description: string;
  topic?: string;
  tags: string[];
  status: BlogStatus;
  videoUrl?: string;
}

export type UpdateBlogData = Partial<CreateBlogData>;

export interface BlogFilters {
  status?: BlogStatus;
  tags?: string[];
  search?: string;
}
