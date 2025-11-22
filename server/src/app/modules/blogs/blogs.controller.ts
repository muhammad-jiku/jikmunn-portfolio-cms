import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { uploadMultipleToS3 } from '../../../utils/s3.util';
import { paginationFields } from '../../../utils/types.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { blogFilterableFields } from './blogs.constants';
import { IBlog } from './blogs.interface';
import { BlogServices } from './blogs.service';

const createBlog = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.sub;
    const blogData = {
      ...req.body,
      authorId: userId,
    };

    const result = await BlogServices.createBlog(blogData);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Blog created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllBlogs = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, blogFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const isAuthenticated = !!req.user;

    const result = await BlogServices.getAllBlogs(filters, paginationOptions, isAuthenticated);

    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getBlogById = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const isAuthenticated = !!req.user;

    const result = await BlogServices.getBlogById(id, isAuthenticated);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateBlog = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await BlogServices.updateBlog(id, req.body);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteBlog = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await BlogServices.deleteBlog(id);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const uploadBlogImages = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'No images provided',
      });
    }

    if (files.length < 4) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'At least 4 images are required',
      });
    }

    if (files.length > 10) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Maximum 10 images allowed',
      });
    }

    const uploadResults = await uploadMultipleToS3(files, 'blogs');
    const images = uploadResults.map((result, index) => ({
      url: result.url,
      order: index + 1,
    }));

    await BlogServices.addBlogImages(id, images);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog images uploaded successfully!',
      data: images,
    });
  } catch (error) {
    return next(error);
  }
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadBlogImages,
};
