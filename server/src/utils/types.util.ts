/**
 * Common types and interfaces
 */

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IGenericResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

export interface ICalculatePaginationResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Pagination constants
 */
export const paginationFields: string[] = ['page', 'limit', 'sortBy', 'sortOrder'];
