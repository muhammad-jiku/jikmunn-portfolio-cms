import { Trash } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { ApiError } from '../../middleware/errorHandler.middleware';

export class TrashService {
  async getAllTrash(): Promise<Trash[]> {
    const trash = await prisma.trash.findMany({
      orderBy: { deletedAt: 'desc' },
    });
    return trash;
  }

  async getTrashById(id: string): Promise<Trash> {
    const trash = await prisma.trash.findUnique({
      where: { id },
    });

    if (!trash) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
    }

    return trash;
  }

  async restoreTrash(
    id: string
  ): Promise<{ message: string; entityType: string; entityId: string }> {
    const trash = await prisma.trash.findUnique({
      where: { id },
    });

    if (!trash) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
    }

    // Check if expired
    if (trash.expiresAt && new Date() > trash.expiresAt) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Trash item has expired and cannot be restored');
    }

    const { entityType, entityId } = trash;

    // Restore the entity by removing deletedAt
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

      // Remove from trash
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
  }

  async permanentlyDeleteTrash(
    id: string
  ): Promise<{ message: string; entityType: string; entityId: string }> {
    const trash = await prisma.trash.findUnique({
      where: { id },
    });

    if (!trash) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Trash item not found');
    }

    const { entityType, entityId } = trash;

    // Permanently delete the entity
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

      // Remove from trash
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
  }

  async cleanupExpiredTrash(): Promise<{ deletedCount: number }> {
    const now = new Date();

    // Find all expired trash items
    const expiredTrash = await prisma.trash.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    let deletedCount = 0;

    // Permanently delete each expired item
    for (const trash of expiredTrash) {
      try {
        await this.permanentlyDeleteTrash(trash.id);
        deletedCount++;
      } catch (error) {
        console.error(`Failed to cleanup trash item ${trash.id}:`, error);
      }
    }

    return { deletedCount };
  }
}

export const trashService = new TrashService();
