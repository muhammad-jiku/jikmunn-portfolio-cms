export interface IService {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  iconUrl?: string | null;
  color?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceFilters {
  searchTerm?: string;
}

export interface ICreateService {
  title: string;
  subtitle?: string;
  description: string;
  iconUrl?: string;
  color?: string;
}

export interface IUpdateService {
  title?: string;
  subtitle?: string;
  description?: string;
  iconUrl?: string;
  color?: string;
}
