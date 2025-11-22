import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { ICleanupResult, IRestoreResult, ITrash } from './trash.interface';

const getAllTrash = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITrash[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.trash.findMany({
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { deletedAt: 'desc' },
  });

  const total = await prisma.trash.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as any,
  };
};

const getTrashById = async (id: string): Promise<ITrash> => {
  const result = await prisma.trash.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
  }

  return result as ITrash;
};

const restoreTrash = async (id: string): Promise<IRestoreResult> => {
  const trash = await prisma.trash.findUnique({
    where: { id },
  });

  if (!trash) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
  }

  if (trash.expiresAt && new Date() > trash.expiresAt) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trash item has expired and cannot be restored');
  }

  const { entityType, entityId } = trash;

  try {
    switch (entityType) {
      case 'projects':
        await prisma.project.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'blogs':
        await prisma.blog.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'services':
        await prisma.service.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'skills':
        await prisma.skill.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'education':
        await prisma.education.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'experience':
        await prisma.professionalExperience.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'achievements':
        await prisma.achievement.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'references':
        await prisma.reference.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'testimonials':
        await prisma.testimonial.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      case 'faq':
        await prisma.fAQ.update({
          where: { id: entityId },
          data: { deletedAt: null },
        });
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, `Unknown entity type: ${entityType}`);
    }

    await prisma.trash.delete({
      where: { id },
    });

    return {
      message: `${entityType} restored successfully`,
      entityType,
      entityId,
    };
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to restore ${entityType}: ${error.message}`
    );
  }
};

const permanentlyDeleteTrash = async (id: string): Promise<IRestoreResult> => {
  const trash = await prisma.trash.findUnique({
    where: { id },
  });

  if (!trash) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
  }

  const { entityType, entityId } = trash;

  try {
    switch (entityType) {
      case 'projects':
        await prisma.project.delete({
          where: { id: entityId },
        });
        break;
      case 'blogs':
        await prisma.blog.delete({
          where: { id: entityId },
        });
        break;
      case 'services':
        await prisma.service.delete({
          where: { id: entityId },
        });
        break;
      case 'skills':
        await prisma.skill.delete({
          where: { id: entityId },
        });
        break;
      case 'education':
        await prisma.education.delete({
          where: { id: entityId },
        });
        break;
      case 'experience':
        await prisma.professionalExperience.delete({
          where: { id: entityId },
        });
        break;
      case 'achievements':
        await prisma.achievement.delete({
          where: { id: entityId },
        });
        break;
      case 'references':
        await prisma.reference.delete({
          where: { id: entityId },
        });
        break;
      case 'testimonials':
        await prisma.testimonial.delete({
          where: { id: entityId },
        });
        break;
      case 'faq':
        await prisma.fAQ.delete({
          where: { id: entityId },
        });
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, `Unknown entity type: ${entityType}`);
    }

    await prisma.trash.delete({
      where: { id },
    });

    return {
      message: `${entityType} permanently deleted`,
      entityType,
      entityId,
    };
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to delete ${entityType}: ${error.message}`
    );
  }
};

const cleanupExpiredTrash = async (): Promise<ICleanupResult> => {
  const now = new Date();

  const expiredTrash = await prisma.trash.findMany({
    where: {
      expiresAt: {
        lte: now,
      },
    },
  });

  let deletedCount = 0;

  for (const trash of expiredTrash) {
    try {
      await permanentlyDeleteTrash(trash.id);
      deletedCount++;
    } catch (error) {
      console.error(`Failed to cleanup trash item ${trash.id}:`, error);
    }
  }

  return { deletedCount };
};

export const TrashServices = {
  getAllTrash,
  getTrashById,
  restoreTrash,
  permanentlyDeleteTrash,
  cleanupExpiredTrash,
};
