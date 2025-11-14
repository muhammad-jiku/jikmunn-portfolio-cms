import { Skill } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { ApiError } from '../../middleware/errorHandler.middleware';

export class SkillService {
  async createSkill(data: { name: string; progress: number; iconUrl: string }): Promise<Skill> {
    const skill = await prisma.skill.create({ data });
    return skill;
  }

  async getAllSkills(): Promise<Skill[]> {
    const skills = await prisma.skill.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return skills;
  }

  async getSkillById(id: string): Promise<Skill | null> {
    const skill = await prisma.skill.findFirst({
      where: { id, deletedAt: null },
    });

    if (!skill) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    return skill;
  }

  async updateSkill(
    id: string,
    data: Partial<{ name: string; progress: number; iconUrl: string }>
  ): Promise<Skill> {
    // Check if skill exists
    const existingSkill = await prisma.skill.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingSkill) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    return skill;
  }

  async deleteSkill(id: string): Promise<Skill> {
    // Check if skill exists
    const existingSkill = await prisma.skill.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingSkill) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    // Soft delete
    const skill = await prisma.skill.findUnique({ where: { id } });
    const deleted = await prisma.skill.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Add to trash
    await prisma.trash.create({
      data: {
        entityType: 'skills',
        entityId: id,
        entityData: (skill || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

export const skillService = new SkillService();
