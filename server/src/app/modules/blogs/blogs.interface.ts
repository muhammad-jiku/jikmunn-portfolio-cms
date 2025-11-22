export interface IBlog {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  topic?: string | null;
  status: 'IN_PROGRESS' | 'UPDATED' | 'DEVELOPMENT' | 'PRODUCTION';
  tags: string[];
  videoUrl?: string | null;
  authorId: string;
  publishedAt: Date;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogFilters {
  searchTerm?: string;
  topic?: string;
  status?: string;
  tags?: string;
}

export interface ICreateBlog {
  title: string;
  subtitle?: string;
  description: string;
  topic?: string;
  status: 'IN_PROGRESS' | 'UPDATED' | 'DEVELOPMENT' | 'PRODUCTION';
  tags: string[];
  videoUrl?: string;
  authorId: string;
}

export interface IUpdateBlog {
  title?: string;
  subtitle?: string;
  description?: string;
  topic?: string;
  status?: 'IN_PROGRESS' | 'UPDATED' | 'DEVELOPMENT' | 'PRODUCTION';
  tags?: string[];
  videoUrl?: string;
}
