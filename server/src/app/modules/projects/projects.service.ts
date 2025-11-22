import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { projectSearchableFields } from './projects.constants';
import { ICreateProject, IProject, IProjectFilters, IUpdateProject } from './projects.interface';

const createProject = async (data: ICreateProject): Promise<IProject> => {
  const result = await prisma.project.create({
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: true,
    },
  });

  return result as any;
};

const getAllProjects = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptions,
  isAuthenticated: boolean = false
): Promise<IGenericResponse<IProject[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs OR for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: projectSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  // Filters needs AND to fulfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Only active projects
  andConditions.push({ deletedAt: null });

  // If not authenticated, only show PRODUCTION projects
  if (!isAuthenticated) {
    andConditions.push({ status: 'PRODUCTION' as any });
  }

  const whereConditions: Prisma.ProjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  // Dynamic Sort
  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  } else {
    sortConditions.createdAt = 'desc';
  }

  const result = await prisma.project.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  const total = await prisma.project.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as any,
  };
};

const getProjectById = async (
  id: string,
  isAuthenticated: boolean = false
): Promise<IProject | null> => {
  const whereCondition: Prisma.ProjectWhereUniqueInput = { id };

  const additionalConditions: Prisma.ProjectWhereInput = {};

  // If not authenticated, only show PRODUCTION projects
  if (!isAuthenticated) {
    additionalConditions.status = 'PRODUCTION';
    additionalConditions.deletedAt = null;
  }

  const result = await prisma.project.findFirst({
    where: {
      ...whereCondition,
      ...additionalConditions,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found!');
  }

  return result as any;
};

const updateProject = async (id: string, payload: IUpdateProject): Promise<IProject | null> => {
  // Check if project exists
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found!');
  }

  const result = await prisma.project.update({
    where: { id },
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: true,
    },
  });

  return result as any;
};

const deleteProject = async (id: string): Promise<IProject | null> => {
  // Check if project exists
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found!');
  }

  // Soft delete the project
  const deletedProject = await prisma.project.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  // Move to trash
  await prisma.trash.create({
    data: {
      entityType: 'projects',
      entityId: id,
      entityData: existingProject as any,
      expiresAt: addDays(new Date(), 31), // Auto-delete after 31 days
    },
  });

  return deletedProject as any;
};

const addProjectImages = async (projectId: string, images: { url: string; order: number }[]) => {
  const imageData = images.map(img => ({
    ...img,
    projectId,
  }));

  return await prisma.projectImage.createMany({
    data: imageData,
  });
};

const deleteProjectImage = async (imageId: string) => {
  return await prisma.projectImage.delete({
    where: { id: imageId },
  });
};

const getProjectImages = async (projectId: string) => {
  return await prisma.projectImage.findMany({
    where: { projectId },
    orderBy: {
      order: 'asc',
    },
  });
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectImages,
  deleteProjectImage,
  getProjectImages,
};
