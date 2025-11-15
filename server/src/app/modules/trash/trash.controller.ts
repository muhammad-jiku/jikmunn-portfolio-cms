import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { trashService } from './trash.service';

const getAllTrash = catchAsync(async (_req: Request, res: Response) => {
  const trash = await trashService.getAllTrash();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trash items retrieved successfully',
    data: trash,
  });
});

const getTrashById = catchAsync(async (req: Request, res: Response) => {
  const trash = await trashService.getTrashById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trash item retrieved successfully',
    data: trash,
  });
});

const restoreTrash = catchAsync(async (req: Request, res: Response) => {
  const result = await trashService.restoreTrash(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: result,
  });
});

const permanentlyDeleteTrash = catchAsync(async (req: Request, res: Response) => {
  const result = await trashService.permanentlyDeleteTrash(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: result,
  });
});

const cleanupExpiredTrash = catchAsync(async (_req: Request, res: Response) => {
  const result = await trashService.cleanupExpiredTrash();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cleaned up ${result.deletedCount} expired trash items`,
    data: result,
  });
});

export const TrashController = {
  getAllTrash,
  getTrashById,
  restoreTrash,
  permanentlyDeleteTrash,
  cleanupExpiredTrash,
};
