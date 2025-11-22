import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { paginationHelpers } from '../../../utils/pagination.util';
import { IGenericResponse, IPaginationOptions } from '../../../utils/types.util';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { blogSearchableFields } from './blogs.constants';
import { IBlog, IBlogFilters, ICreateBlog, IUpdateBlog } from './blogs.interface';

const createBlog = async (data: ICreateBlog): Promise<IBlog> => {
  const result = await prisma.blog.create({
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

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
  isAuthenticated: boolean = false
): Promise<IGenericResponse<IBlog[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
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

  andConditions.push({ deletedAt: null });

  if (!isAuthenticated) {
    andConditions.push({ status: 'PRODUCTION' as any });
  }

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions as any } : {};

  const sortConditions: { [key: string]: 'asc' | 'desc' } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  } else {
    sortConditions.createdAt = 'desc';
  }

  const result = await prisma.blog.findMany({
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

  const total = await prisma.blog.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as any,
  };
};

const getBlogById = async (id: string, isAuthenticated: boolean = false): Promise<IBlog | null> => {
  const whereCondition: Prisma.BlogWhereUniqueInput = { id };

  const additionalConditions: Prisma.BlogWhereInput = {};

  if (!isAuthenticated) {
    additionalConditions.status = 'PRODUCTION';
    additionalConditions.deletedAt = null;
  }

  const result = await prisma.blog.findFirst({
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
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  return result as any;
};

const updateBlog = async (id: string, payload: IUpdateBlog): Promise<IBlog | null> => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });
  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const result = await prisma.blog.update({
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

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });
  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const deletedBlog = await prisma.blog.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });

  await prisma.trash.create({
    data: {
      entityType: 'blogs',
      entityId: id,
      entityData: existingBlog as any,
      expiresAt: addDays(new Date(), 31),
    },
  });

  return deletedBlog as any;
};

const addBlogImages = async (blogId: string, images: { url: string; order: number }[]) => {
  return await prisma.blogImage.createMany({
    data: images.map(img => ({ ...img, blogId })),
  });
};

const deleteBlogImage = async (imageId: string) => {
  return await prisma.blogImage.delete({ where: { id: imageId } });
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addBlogImages,
  deleteBlogImage,
};
