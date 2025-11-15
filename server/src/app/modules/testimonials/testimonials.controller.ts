import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { testimonialService } from './testimonials.service';

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.createTestimonial(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

const getAllTestimonials = catchAsync(async (_req: Request, res: Response) => {
  const testimonials = await testimonialService.getAllTestimonials();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonials retrieved successfully',
    data: testimonials,
  });
});

const getTestimonialById = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.getTestimonialById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial retrieved successfully',
    data: testimonial,
  });
});

const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  await testimonialService.deleteTestimonial(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonial deleted successfully',
    data: null,
  });
});

export const TestimonialController = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
