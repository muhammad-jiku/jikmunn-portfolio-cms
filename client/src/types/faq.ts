export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFAQData {
  question: string;
  answer: string;
  order?: number;
}

export interface UpdateFAQData {
  question?: string;
  answer?: string;
  order?: number;
}
