/* eslint-disable @typescript-eslint/no-explicit-any */
// Trash types matching backend Prisma schema

export interface Trash {
  id: string;
  entityType: string;
  entityId: string;
  entityData: any;
  deletedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestoreResult {
  message: string;
  entityType: string;
  entityId: string;
}

export interface CleanupResult {
  deletedCount: number;
}

export interface TrashListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Trash[];
}
