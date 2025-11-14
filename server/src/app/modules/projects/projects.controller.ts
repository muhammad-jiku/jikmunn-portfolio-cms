import { Response } from 'express';
import { sendError, sendSuccess } from '../../../utils/response.util';
import { deleteFromS3, extractS3KeyFromUrl, uploadMultipleToS3 } from '../../../utils/s3.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { asyncHandler } from '../../middleware/errorHandler.middleware';
import { ProjectService } from './projects.service';

const projectService = new ProjectService();

/**
 * Create new project
 */
export const createProject = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.sub;

      const projectData = {
        ...req.body,
        authorId: userId,
      };

      const result = await projectService.createProject(projectData);

      sendResponse<Project>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Project created successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Get all projects
 */
export const getAllProjects = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, projectFilterableFields);
      const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

      const result = await projectService.getAllProjects(filters, paginationOptions);

      sendResponse<Project[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Projects retrieved successfully!',
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Get project by ID
 */
export const getProjectById = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await projectService.getProjectById(id);

      sendResponse<Project>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * Update project
 */
export const updateProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await projectService.getProjectById(id);

  if (!project) {
    return sendError(res, 'Project not found', 404);
  }

  const updatedProject = await projectService.updateProject(id, req.body);

  return sendSuccess(res, updatedProject, 'Project updated successfully');
});

/**
 * Delete project (soft delete)
 */
export const deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await projectService.getProjectById(id);

  if (!project) {
    return sendError(res, 'Project not found', 404);
  }

  await projectService.deleteProject(id);

  return sendSuccess(res, null, 'Project moved to trash successfully');
});

/**
 * Upload project images
 */
export const uploadProjectImages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return sendError(res, 'No images provided', 400);
  }

  if (files.length < 4) {
    return sendError(res, 'At least 4 images are required', 400);
  }

  if (files.length > 10) {
    return sendError(res, 'Maximum 10 images allowed', 400);
  }

  const project = await projectService.getProjectById(id);

  if (!project) {
    return sendError(res, 'Project not found', 404);
  }

  // Upload to S3
  const uploadResults = await uploadMultipleToS3(files, 'projects');

  // Add images to project
  const images = uploadResults.map((result, index) => ({
    url: result.url,
    order: index + 1,
  }));

  await projectService.addProjectImages(id, images);

  return sendSuccess(res, images, 'Project images uploaded successfully');
});

/**
 * Delete project image
 */
export const deleteProjectImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { imageId } = req.params;

  const images = await projectService.getProjectImages(req.params.projectId);
  const image = images.find(img => img.id === imageId);

  if (!image) {
    return sendError(res, 'Image not found', 404);
  }

  // Delete from S3
  const s3Key = extractS3KeyFromUrl(image.url);
  await deleteFromS3(s3Key);

  // Delete from database
  await projectService.deleteProjectImage(imageId);

  return sendSuccess(res, null, 'Project image deleted successfully');
});
