export interface ITrash {
  id: string;
  entityType: string;
  entityId: string;
  entityData: any;
  deletedAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRestoreResult {
  message: string;
  entityType: string;
  entityId: string;
}

export interface ICleanupResult {
  deletedCount: number;
}
