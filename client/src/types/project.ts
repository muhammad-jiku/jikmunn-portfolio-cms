// Project types matching backend schema
export enum ProjectStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  UPDATED = 'UPDATED',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface ProjectMedia {
  id: string;
  url: string;
  type: MediaType;
  order: number;
  createdAt: string;
}

export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  deployment?: string[];
  tools?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client?: string;
  duration?: string;
  teamSize?: number;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  techStack?: TechStack;
  developmentTools?: string[];
  media: ProjectMedia[];
  isFeatured: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  category: string;
  client?: string;
  duration?: string;
  teamSize?: number;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  techStack?: TechStack;
  developmentTools?: string[];
  isFeatured?: boolean;
}

export type UpdateProjectData = Partial<CreateProjectData>;

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
