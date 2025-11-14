import { Response } from 'express';
import { getPaginationParams } from '../../../utils/helpers.util';
import {
  sendCreated,
  sendError,
  sendSuccess,
  sendSuccessWithPagination,
} from '../../../utils/response.util';
import { uploadMultipleToS3 } from '../../../utils/s3.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { asyncHandler } from '../../middleware/errorHandler.middleware';
import { BlogService } from './blogs.service';

const blogService = new BlogService();

export const createBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const blog = await blogService.createBlog({ ...req.body, authorId: req.user?.sub });
  return sendCreated(res, blog, 'Blog created successfully');
});

export const getAllBlogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page, limit, skip } = getPaginationParams(req.query.page, req.query.limit);
  const result = await blogService.getAllBlogs({
    page,
    limit,
    skip,
    search: req.query.search,
    tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
  });
  return sendSuccessWithPagination(res, result.blogs, {
    page: result.page,
    limit: result.limit,
    total: result.total,
  });
});

export const getBlogById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) return sendError(res, 'Blog not found', 404);
  return sendSuccess(res, blog);
});

export const updateBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);
  return sendSuccess(res, blog, 'Blog updated successfully');
});

export const deleteBlog = asyncHandler(async (req: AuthRequest, res: Response) => {
  await blogService.deleteBlog(req.params.id);
  return sendSuccess(res, null, 'Blog moved to trash');
});

export const uploadBlogImages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length < 4) return sendError(res, 'At least 4 images required', 400);
  if (files.length > 10) return sendError(res, 'Maximum 10 images allowed', 400);

  const uploadResults = await uploadMultipleToS3(files, 'blogs');
  const images = uploadResults.map((result, index) => ({ url: result.url, order: index + 1 }));
  await blogService.addBlogImages(req.params.id, images);
  return sendSuccess(res, images, 'Blog images uploaded');
});
