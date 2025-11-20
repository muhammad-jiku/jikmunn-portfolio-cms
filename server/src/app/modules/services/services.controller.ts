import { Response } from 'express';
import { catchAsync } from '../../../utils/helpers.util';
import { sendCreated, sendError, sendSuccess } from '../../../utils/response.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { ServiceService } from './services.service';

const serviceService = new ServiceService();

export const createService = catchAsync(async (req: AuthRequest, res: Response) => {
  const service = await serviceService.createService(req.body);
  return sendCreated(res, service);
});

export const getAllServices = catchAsync(async (_req: AuthRequest, res: Response) => {
  const services = await serviceService.getAllServices();
  return sendSuccess(res, services);
});

export const getServiceById = catchAsync(async (req: AuthRequest, res: Response) => {
  const service = await serviceService.getServiceById(req.params.id);
  if (!service) return sendError(res, 'Service not found', 404);
  return sendSuccess(res, service);
});

export const updateService = catchAsync(async (req: AuthRequest, res: Response) => {
  const service = await serviceService.updateService(req.params.id, req.body);
  return sendSuccess(res, service, 'Service updated');
});

export const deleteService = catchAsync(async (req: AuthRequest, res: Response) => {
  await serviceService.deleteService(req.params.id);
  return sendSuccess(res, null, 'Service moved to trash');
});
