import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import {
  achievementSearchableFields,
  educationSearchableFields,
  experienceSearchableFields,
  referenceSearchableFields,
  summarySearchableFields,
} from './resume.constants';
import {
  IAchievement,
  ICreateAchievement,
  ICreateEducation,
  ICreateExperience,
  ICreateReference,
  ICreateResumeSummary,
  IEducation,
  IExperience,
  IReference,
  IResumeSummary,
  IUpdateAchievement,
  IUpdateEducation,
  IUpdateExperience,
  IUpdateReference,
  IUpdateResumeSummary,
} from './resume.interface';

// RESUME SUMMARY SERVICES
const createSummary = async (data: ICreateResumeSummary): Promise<IResumeSummary> => {
  const result = await prisma.resumeSummary.create({ data });
  return result as IResumeSummary;
};

const getAllSummary = async (
  filters: { searchTerm?: string },
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IResumeSummary[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: summarySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.ResumeSummaryWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.resumeSummary.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.resumeSummary.count({
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

const getSummaryById = async (id: string): Promise<IResumeSummary> => {
  const result = await prisma.resumeSummary.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }

  return result as IResumeSummary;
};

const updateSummary = async (id: string, data: IUpdateResumeSummary): Promise<IResumeSummary> => {
  const existingSummary = await prisma.resumeSummary.findUnique({
    where: { id },
  });

  if (!existingSummary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }

  const result = await prisma.resumeSummary.update({ where: { id }, data });
  return result as IResumeSummary;
};

const deleteSummary = async (id: string): Promise<IResumeSummary> => {
  const existingSummary = await prisma.resumeSummary.findUnique({
    where: { id },
  });

  if (!existingSummary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found');
  }

  // Move to trash before deleting
  await prisma.trash.create({
    data: {
      entityType: 'resumeSummary',
      entityId: id,
      entityData: existingSummary as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  // Hard delete (resume models don't have soft delete)
  const deleted = await prisma.resumeSummary.delete({
    where: { id },
  });

  return deleted as IResumeSummary;
};

export const ResumeSummaryServices = {
  createSummary,
  getAllSummary,
  getSummaryById,
  updateSummary,
  deleteSummary,
};

// EDUCATION SERVICES
const createEducation = async (data: ICreateEducation): Promise<IEducation> => {
  const result = await prisma.education.create({ data });
  return result as IEducation;
};

const getAllEducation = async (
  filters: { searchTerm?: string },
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IEducation[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: educationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.EducationWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.education.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.education.count({
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

const getEducationById = async (id: string): Promise<IEducation> => {
  const result = await prisma.education.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
  }

  return result as IEducation;
};

const updateEducation = async (id: string, data: IUpdateEducation): Promise<IEducation> => {
  const existingEducation = await prisma.education.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingEducation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
  }

  const result = await prisma.education.update({ where: { id }, data });
  return result as IEducation;
};

const deleteEducation = async (id: string): Promise<IEducation> => {
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

  return deleted as IEducation;
};

export const EducationServices = {
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
};

// PROFESSIONAL EXPERIENCE SERVICES
const createExperience = async (data: ICreateExperience): Promise<IExperience> => {
  const result = await prisma.professionalExperience.create({ data });
  return result as IExperience;
};

const getAllExperience = async (
  filters: { searchTerm?: string },
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExperience[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: experienceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.ProfessionalExperienceWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.professionalExperience.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.professionalExperience.count({
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

const getExperienceById = async (id: string): Promise<IExperience> => {
  const result = await prisma.professionalExperience.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  }

  return result as IExperience;
};

const updateExperience = async (id: string, data: IUpdateExperience): Promise<IExperience> => {
  const existingExperience = await prisma.professionalExperience.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingExperience) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  }

  const result = await prisma.professionalExperience.update({ where: { id }, data });
  return result as IExperience;
};

const deleteExperience = async (id: string): Promise<IExperience> => {
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

  return deleted as IExperience;
};

export const ExperienceServices = {
  createExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
};

// ACHIEVEMENT SERVICES
const createAchievement = async (data: ICreateAchievement): Promise<IAchievement> => {
  const result = await prisma.achievement.create({ data });
  return result as IAchievement;
};

const getAllAchievements = async (
  filters: { searchTerm?: string },
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAchievement[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: achievementSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.AchievementWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.achievement.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.achievement.count({
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

const getAchievementById = async (id: string): Promise<IAchievement> => {
  const result = await prisma.achievement.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
  }

  return result as IAchievement;
};

const updateAchievement = async (id: string, data: IUpdateAchievement): Promise<IAchievement> => {
  const existingAchievement = await prisma.achievement.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingAchievement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found');
  }

  const result = await prisma.achievement.update({ where: { id }, data });
  return result as IAchievement;
};

const deleteAchievement = async (id: string): Promise<IAchievement> => {
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

  return deleted as IAchievement;
};

export const AchievementServices = {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
};

// REFERENCE SERVICES
const createReference = async (data: ICreateReference): Promise<IReference> => {
  const result = await prisma.reference.create({ data });
  return result as IReference;
};

const getAllReferences = async (
  filters: { searchTerm?: string },
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReference[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: referenceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.ReferenceWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.reference.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.reference.count({
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

const getReferenceById = async (id: string): Promise<IReference> => {
  const result = await prisma.reference.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference not found');
  }

  return result as IReference;
};

const updateReference = async (id: string, data: IUpdateReference): Promise<IReference> => {
  const existingReference = await prisma.reference.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingReference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reference not found');
  }

  const result = await prisma.reference.update({ where: { id }, data });
  return result as IReference;
};

const deleteReference = async (id: string): Promise<IReference> => {
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

  return deleted as IReference;
};

export const ReferenceServices = {
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
};
