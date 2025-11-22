export interface IFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFAQFilters {
  searchTerm?: string;
}

export interface ICreateFAQ {
  question: string;
  answer: string;
  order: number;
}

export interface IUpdateFAQ {
  question?: string;
  answer?: string;
  order?: number;
}
