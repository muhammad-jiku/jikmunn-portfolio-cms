export interface IProject {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string[];
  category: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status: 'IN_PROGRESS' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATED';
  documentationUrl?: string | null;
  liveLink?: string | null;
  githubClientLink?: string | null;
  githubServerLink?: string | null;
  techStack?: any;
  tools?: any;
  videoUrl?: string | null;
  authorId: string;
  publishedAt: Date;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectFilters {
  searchTerm?: string;
  category?: string;
  type?: string;
  status?: string;
}

export interface ICreateProject {
  title: string;
  subtitle?: string;
  description: string[];
  category: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status: 'IN_PROGRESS' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATED';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
  techStack?: any;
  tools?: any;
  authorId: string;
}

export interface IUpdateProject {
  title?: string;
  subtitle?: string;
  description?: string[];
  category?: 'WEB_APPLICATION' | 'MOBILE_APP_APPLICATION';
  type?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'SUPER_ADVANCED';
  status?: 'IN_PROGRESS' | 'DEVELOPMENT' | 'PRODUCTION' | 'UPDATED';
  documentationUrl?: string;
  liveLink?: string;
  githubClientLink?: string;
  githubServerLink?: string;
  videoUrl?: string;
  techStack?: Record<string, any>;
  tools?: Record<string, any>;
}
