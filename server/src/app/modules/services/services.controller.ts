import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import {
  notifyServiceCreated,
  notifyServiceDeleted,
  notifyServiceUpdated,
} from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { AuthRequest } from '../../middleware/auth.middleware';
import { serviceFilterableFields } from './services.constants';
import { IService } from './services.interface';
import { ServiceServices } from './services.service';

const createService = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await ServiceServices.createService(req.body);

    // Emit real-time notification
    notifyServiceCreated(result);

    sendResponse<IService>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Service created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllServices = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, serviceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ServiceServices.getAllServices(filters, paginationOptions);

    sendResponse<IService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getServiceById = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ServiceServices.getServiceById(id);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateService = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ServiceServices.updateService(id, req.body);

    // Emit real-time notification
    notifyServiceUpdated(result);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteService = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ServiceServices.deleteService(id);

    // Emit real-time notification
    notifyServiceDeleted(id);

    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
