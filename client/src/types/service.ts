export interface Service {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconUrl: string;
  color: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceData {
  title: string;
  subtitle?: string;
  description: string;
  iconUrl: string;
  color: string;
}

export interface UpdateServiceData {
  title?: string;
  subtitle?: string;
  description?: string;
  iconUrl?: string;
  color?: string;
}
