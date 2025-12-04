import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import {
  notifyTestimonialCreated,
  notifyTestimonialDeleted,
  notifyTestimonialUpdated,
} from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { testimonialFilterableFields } from './testimonials.constants';
import { ITestimonial } from './testimonials.interface';
import { TestimonialServices } from './testimonials.service';

const createTestimonial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TestimonialServices.createTestimonial(req.body);

    // Emit real-time notification
    notifyTestimonialCreated(result);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Testimonial created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllTestimonials = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, testimonialFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TestimonialServices.getAllTestimonials(filters, paginationOptions);

    sendResponse<ITestimonial[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonials retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getTestimonialById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await TestimonialServices.getTestimonialById(id);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateTestimonial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await TestimonialServices.updateTestimonial(id, req.body);

    // Emit real-time notification
    notifyTestimonialUpdated(result);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await TestimonialServices.deleteTestimonial(id);

    // Emit real-time notification
    notifyTestimonialDeleted(id);

    sendResponse<ITestimonial>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Testimonial deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
