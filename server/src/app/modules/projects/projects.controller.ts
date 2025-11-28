import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { deleteFromS3, uploadMultipleToS3 } from '../../../utils/s3.util';
import {
  notifyProjectCreated,
  notifyProjectDeleted,
  notifyProjectUpdated,
} from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { projectFilterableFields } from './projects.constants';
import { IProject } from './projects.interface';
import { ProjectServices } from './projects.service';

const createProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.sub;

    const projectData = {
      ...req.body,
      authorId: userId,
    };

    const result = await ProjectServices.createProject(projectData);

    // Emit real-time notification
    notifyProjectCreated(result);

    sendResponse<IProject>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Project created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllProjects = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, projectFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    // Check if user is authenticated
    const isAuthenticated = !!req.user;

    const result = await ProjectServices.getAllProjects(
      filters,
      paginationOptions,
      isAuthenticated
    );

    sendResponse<IProject[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Projects retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getProjectById = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check if user is authenticated
    const isAuthenticated = !!req.user;

    const result = await ProjectServices.getProjectById(id, isAuthenticated);

    sendResponse<IProject>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ProjectServices.updateProject(id, req.body);

    // Emit real-time notification
    notifyProjectUpdated(result);

    sendResponse<IProject>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteProject = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ProjectServices.deleteProject(id);

    // Emit real-time notification
    notifyProjectDeleted(id);

    sendResponse<IProject>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const uploadProjectImages = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
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

      // Upload to S3
      const uploadResults = await uploadMultipleToS3(files, 'projects');

      // Add images to project
      const images = uploadResults.map((result, index) => ({
        url: result.url,
        order: index + 1,
      }));

      await ProjectServices.addProjectImages(id, images);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project images uploaded successfully!',
        data: images,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const deleteProjectImage = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.params;

      const images = await ProjectServices.getProjectImages(req.params.projectId);
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
      await ProjectServices.deleteProjectImage(imageId);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project image deleted successfully!',
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
};
