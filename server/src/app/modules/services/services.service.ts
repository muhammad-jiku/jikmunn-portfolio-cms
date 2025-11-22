import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { serviceSearchableFields } from './services.constants';
import { ICreateService, IService, IServiceFilters, IUpdateService } from './services.interface';

const createService = async (data: ICreateService): Promise<IService> => {
  const result = await prisma.service.create({
    data: {
      ...data,
      iconUrl: data.iconUrl || '',
      color: data.color || '#000000',
    },
  });
  return result as IService;
};

const getAllServices = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions,
  includeDeleted: boolean = false
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (!includeDeleted) {
    andConditions.push({
      deletedAt: null,
    });
  }

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.service.count({
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

const getServiceById = async (id: string): Promise<IService> => {
  const result = await prisma.service.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return result as IService;
};

const updateService = async (id: string, data: IUpdateService): Promise<IService> => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = await prisma.service.update({
    where: { id },
    data,
  });

  return result as IService;
};

const deleteService = async (id: string): Promise<IService> => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const deleted = await prisma.service.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await prisma.trash.create({
    data: {
      entityType: 'services',
      entityId: id,
      entityData: service as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  return deleted as IService;
};

export const ServiceServices = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
