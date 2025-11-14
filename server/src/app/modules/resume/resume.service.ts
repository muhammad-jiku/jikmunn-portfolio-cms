import {
  Achievement,
  Education,
  ProfessionalExperience,
  Reference,
  ResumeSummary,
} from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { ApiError } from '../../middleware/errorHandler.middleware';

// RESUME SUMMARY SERVICE
export class ResumeSummaryService {
  async getSummary(): Promise<ResumeSummary> {
    const summary = await prisma.resumeSummary.findFirst();
    if (!summary) {
      return await prisma.resumeSummary.create({
        data: { summary: '', address: '', phone: '', email: '' },
      });
    }
    return summary;
  }

  async updateSummary(id: string, data: Partial<ResumeSummary>): Promise<ResumeSummary> {
    const existingSummary = await prisma.resumeSummary.findUnique({ where: { id } });
    if (!existingSummary) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Resume summary not found');
    }

    return await prisma.resumeSummary.update({ where: { id }, data });
  }
}

// EDUCATION SERVICE
export class EducationService {
  async createEducation(data: {
    degree: string;
    years: string;
    university: string;
  }): Promise<Education> {
    return await prisma.education.create({ data });
  }

  async getAllEducation(): Promise<Education[]> {
    return await prisma.education.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEducationById(id: string): Promise<Education> {
    const education = await prisma.education.findFirst({
      where: { id, deletedAt: null },
    });

    if (!education) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
    }

    return education;
  }

  async updateEducation(id: string, data: Partial<Education>): Promise<Education> {
    const existingEducation = await prisma.education.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingEducation) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
    }

    return await prisma.education.update({ where: { id }, data });
  }

  async deleteEducation(id: string): Promise<Education> {
    const existingEducation = await prisma.education.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingEducation) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
    }

    const education = await prisma.education.findUnique({ where: { id } });
    const deleted = await prisma.education.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.trash.create({
      data: {
        entityType: 'education',
        entityId: id,
        entityData: (education || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

// PROFESSIONAL EXPERIENCE SERVICE
export class ExperienceService {
  async createExperience(data: {
    jobTitle: string;
    companyName: string;
    years: string;
    achievements: string[];
  }): Promise<ProfessionalExperience> {
    return await prisma.professionalExperience.create({ data });
  }

  async getAllExperience(): Promise<ProfessionalExperience[]> {
    return await prisma.professionalExperience.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getExperienceById(id: string): Promise<ProfessionalExperience> {
    const experience = await prisma.professionalExperience.findFirst({
      where: { id, deletedAt: null },
    });

    if (!experience) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    return experience;
  }

  async updateExperience(
    id: string,
    data: Partial<ProfessionalExperience>
  ): Promise<ProfessionalExperience> {
    const existingExperience = await prisma.professionalExperience.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingExperience) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    return await prisma.professionalExperience.update({ where: { id }, data });
  }

  async deleteExperience(id: string): Promise<ProfessionalExperience> {
    const existingExperience = await prisma.professionalExperience.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingExperience) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    const exp = await prisma.professionalExperience.findUnique({ where: { id } });
    const deleted = await prisma.professionalExperience.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.trash.create({
      data: {
        entityType: 'experience',
        entityId: id,
        entityData: (exp || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

// ACHIEVEMENT SERVICE
export class AchievementService {
  async createAchievement(data: {
    role: string;
    years: string;
    description: string[];
  }): Promise<Achievement> {
    return await prisma.achievement.create({ data });
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await prisma.achievement.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAchievementById(id: string): Promise<Achievement> {
    const achievement = await prisma.achievement.findFirst({
      where: { id, deletedAt: null },
    });

    if (!achievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
    }

    return achievement;
  }

  async updateAchievement(id: string, data: Partial<Achievement>): Promise<Achievement> {
    const existingAchievement = await prisma.achievement.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingAchievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
    }

    return await prisma.achievement.update({ where: { id }, data });
  }

  async deleteAchievement(id: string): Promise<Achievement> {
    const existingAchievement = await prisma.achievement.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingAchievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
    }

    const achievement = await prisma.achievement.findUnique({ where: { id } });
    const deleted = await prisma.achievement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.trash.create({
      data: {
        entityType: 'achievements',
        entityId: id,
        entityData: (achievement || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

// REFERENCE SERVICE
export class ReferenceService {
  async createReference(data: {
    name: string;
    jobTitle: string;
    companyName: string;
  }): Promise<Reference> {
    return await prisma.reference.create({ data });
  }

  async getAllReferences(): Promise<Reference[]> {
    return await prisma.reference.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getReferenceById(id: string): Promise<Reference> {
    const reference = await prisma.reference.findFirst({
      where: { id, deletedAt: null },
    });

    if (!reference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Reference not found');
    }

    return reference;
  }

  async updateReference(id: string, data: Partial<Reference>): Promise<Reference> {
    const existingReference = await prisma.reference.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingReference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Reference not found');
    }

    return await prisma.reference.update({ where: { id }, data });
  }

  async deleteReference(id: string): Promise<Reference> {
    const existingReference = await prisma.reference.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingReference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Reference not found');
    }

    const reference = await prisma.reference.findUnique({ where: { id } });
    const deleted = await prisma.reference.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.trash.create({
      data: {
        entityType: 'references',
        entityId: id,
        entityData: (reference || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

// Export service instances
export const resumeSummaryService = new ResumeSummaryService();
export const educationService = new EducationService();
export const experienceService = new ExperienceService();
export const achievementService = new AchievementService();
export const referenceService = new ReferenceService();
