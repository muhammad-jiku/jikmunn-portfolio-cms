import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { skillSearchableFields } from './skills.constants';
import { ICreateSkill, ISkill, ISkillFilters, IUpdateSkill } from './skills.interface';

const createSkill = async (data: ICreateSkill): Promise<ISkill> => {
  const result = await prisma.skill.create({
    data: {
      ...data,
      iconUrl: data.iconUrl || '',
    },
  });
  return result as ISkill;
};

const getAllSkills = async (
  filters: ISkillFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISkill[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: skillSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.SkillWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.skill.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.skill.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as any,
  };
};

const getSkillById = async (id: string): Promise<ISkill> => {
  const result = await prisma.skill.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
  }

  return result as ISkill;
};

const updateSkill = async (id: string, data: IUpdateSkill): Promise<ISkill> => {
  const existingSkill = await prisma.skill.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingSkill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
  }

  const result = await prisma.skill.update({
    where: { id },
    data,
  });

  return result as ISkill;
};

const deleteSkill = async (id: string): Promise<ISkill> => {
  const existingSkill = await prisma.skill.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingSkill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found');
  }

  const skill = await prisma.skill.findUnique({ where: { id } });

  const deleted = await prisma.skill.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await prisma.trash.create({
    data: {
      entityType: 'skills',
      entityId: id,
      entityData: (skill || {}) as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  return deleted as ISkill;
};

export const SkillServices = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
