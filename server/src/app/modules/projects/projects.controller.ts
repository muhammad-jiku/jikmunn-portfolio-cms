import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { deleteFromS3, uploadMultipleToS3 } from '../../../utils/s3.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { projectFilterableFields } from './projects.constants';
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

      sendResponse(res, {
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

      // Check if user is authenticated
      const isAuthenticated = !!req.user;

      const result = await projectService.getAllProjects(
        filters,
        paginationOptions,
        isAuthenticated
      );

      sendResponse(res, {
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

      // Check if user is authenticated
      const isAuthenticated = !!req.user;

      const result = await projectService.getProjectById(id, isAuthenticated);

      sendResponse(res, {
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
export const updateProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await projectService.getProjectById(id, true);

  if (!project) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Project not found',
    });
  }

  const updatedProject = await projectService.updateProject(id, req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: updatedProject,
  });
});

/**
 * Delete project (soft delete)
 */
export const deleteProject = catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const project = await projectService.getProjectById(id, true);

  if (!project) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Project not found',
    });
  }

  await projectService.deleteProject(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project moved to trash successfully',
  });
});

/**
 * Upload project images
 */
export const uploadProjectImages = catchAsync(async (req: AuthRequest, res: Response) => {
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

  const project = await projectService.getProjectById(id, true);

  if (!project) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Project not found',
    });
  }

  // Upload to S3
  const uploadResults = await uploadMultipleToS3(files, 'projects');

  // Add images to project
  const images = uploadResults.map((result, index) => ({
    url: result.url,
    order: index + 1,
  }));

  await projectService.addProjectImages(id, images);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project images uploaded successfully',
    data: images,
  });
});

/**
 * Delete project image
 */
export const deleteProjectImage = catchAsync(async (req: AuthRequest, res: Response) => {
  const { imageId } = req.params;

  const images = await projectService.getProjectImages(req.params.projectId);
  const image = images.find(img => img.id === imageId);

  if (!image) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Image not found',
    });
  }

  // Delete from S3
  await deleteFromS3(image.url);

  // Delete from database
  await projectService.deleteProjectImage(imageId);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project image deleted successfully',
  });
});
