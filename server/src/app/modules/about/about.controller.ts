import { Response } from 'express';
import { sendSuccess } from '../../../utils/response.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { asyncHandler } from '../../middleware/errorHandler.middleware';
import { AboutService } from './about.service';

const aboutService = new AboutService();

export const getAbout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const about = await aboutService.getAbout();
  return sendSuccess(res, about);
});

export const updateAbout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const about = await aboutService.getAbout();
  const updated = await aboutService.updateAbout(about.id, req.body);
  return sendSuccess(res, updated, 'About stats updated');
});

export const resetAbout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const about = await aboutService.getAbout();
  const reset = await aboutService.resetAbout(about.id);
  return sendSuccess(res, reset, 'About stats reset');
});
