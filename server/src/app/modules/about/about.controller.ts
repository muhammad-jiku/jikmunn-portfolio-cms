import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { IAbout } from './about.interface';
import { AboutServices } from './about.service';

const getAbout = catchAsync(async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await AboutServices.getAbout();

    sendResponse<IAbout>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'About stats retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateAbout = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const about = await AboutServices.getAbout();
    const result = await AboutServices.updateAbout(about.id, req.body);

    sendResponse<IAbout>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'About stats updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const resetAbout = catchAsync(async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const about = await AboutServices.getAbout();
    const result = await AboutServices.resetAbout(about.id);

    sendResponse<IAbout>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'About stats reset successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const AboutControllers = {
  getAbout,
  updateAbout,
  resetAbout,
};
