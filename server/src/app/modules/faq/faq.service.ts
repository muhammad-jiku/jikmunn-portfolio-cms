import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { faqSearchableFields } from './faq.constants';
import { ICreateFAQ, IFAQ, IFAQFilters, IUpdateFAQ } from './faq.interface';

const createFaq = async (data: ICreateFAQ): Promise<IFAQ> => {
  const result = await prisma.fAQ.create({ data });
  return result as IFAQ;
};

const getAllFaqs = async (
  filters: IFAQFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFAQ[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  andConditions.push({
    deletedAt: null,
  });

  if (searchTerm) {
    andConditions.push({
      OR: faqSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    });
  }

  const whereConditions: Prisma.FAQWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.fAQ.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions.length ? sortConditions : { order: 'asc' },
  });

  const total = await prisma.fAQ.count({
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

const getFaqById = async (id: string): Promise<IFAQ> => {
  const result = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }

  return result as IFAQ;
};

const updateFaq = async (id: string, data: IUpdateFAQ): Promise<IFAQ> => {
  const existingFaq = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }

  const result = await prisma.fAQ.update({
    where: { id },
    data,
  });

  return result as IFAQ;
};

const deleteFaq = async (id: string): Promise<IFAQ> => {
  const existingFaq = await prisma.fAQ.findFirst({
    where: { id, deletedAt: null },
  });

  if (!existingFaq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }

  const faq = await prisma.fAQ.findUnique({ where: { id } });

  const deleted = await prisma.fAQ.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await prisma.trash.create({
    data: {
      entityType: 'faq',
      entityId: id,
      entityData: (faq || {}) as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  return deleted as IFAQ;
};

export const FAQServices = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
