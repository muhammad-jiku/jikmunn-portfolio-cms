import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import {
  notifyTrashCleaned,
  notifyTrashPermanentlyDeleted,
  notifyTrashRestored,
} from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { TrashServices } from './trash.service';

const getAllTrash = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TrashServices.getAllTrash(paginationOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trash items retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getTrashById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await TrashServices.getTrashById(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trash item retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const restoreTrash = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await TrashServices.restoreTrash(id);

    // Emit real-time notification
    notifyTrashRestored(result);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const permanentlyDeleteTrash = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await TrashServices.permanentlyDeleteTrash(id);

      // Emit real-time notification
      notifyTrashPermanentlyDeleted(id, result.entityType);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const cleanupExpiredTrash = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TrashServices.cleanupExpiredTrash();

    // Emit real-time notification
    notifyTrashCleaned(result.deletedCount);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Cleaned up ${result.deletedCount} expired trash items!`,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const TrashControllers = {
  getAllTrash,
  getTrashById,
  restoreTrash,
  permanentlyDeleteTrash,
  cleanupExpiredTrash,
};
