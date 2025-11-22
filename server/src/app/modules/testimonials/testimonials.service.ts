import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { testimonialSearchableFields } from './testimonials.constants';
import {
  ICreateTestimonial,
  ITestimonial,
  ITestimonialFilters,
  IUpdateTestimonial,
} from './testimonials.interface';

const createTestimonial = async (data: ICreateTestimonial): Promise<ITestimonial> => {
  const result = await prisma.testimonial.create({ data });
  return result as ITestimonial;
};

const getAllTestimonials = async (
  filters: ITestimonialFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITestimonial[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: testimonialSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.TestimonialWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.testimonial.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { createdAt: 'desc' },
  });

  const total = await prisma.testimonial.count({
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

const getTestimonialById = async (id: string): Promise<ITestimonial> => {
  const result = await prisma.testimonial.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  return result as ITestimonial;
};

const updateTestimonial = async (id: string, data: IUpdateTestimonial): Promise<ITestimonial> => {
  const existingTestimonial = await prisma.testimonial.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingTestimonial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  const result = await prisma.testimonial.update({
    where: { id },
    data,
  });

  return result as ITestimonial;
};

const deleteTestimonial = async (id: string): Promise<ITestimonial> => {
  const existingTestimonial = await prisma.testimonial.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingTestimonial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }

  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  const deleted = await prisma.testimonial.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await prisma.trash.create({
    data: {
      entityType: 'testimonials',
      entityId: id,
      entityData: (testimonial || {}) as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  return deleted as ITestimonial;
};

export const TestimonialServices = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
