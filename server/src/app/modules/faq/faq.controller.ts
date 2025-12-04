import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { notifyFAQCreated, notifyFAQDeleted, notifyFAQUpdated } from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { faqFilterableFields } from './faq.constants';
import { IFAQ } from './faq.interface';
import { FAQServices } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await FAQServices.createFaq(req.body);

    // Emit real-time notification
    notifyFAQCreated(result);

    sendResponse<IFAQ>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'FAQ created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllFaqs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, faqFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FAQServices.getAllFaqs(filters, paginationOptions);

    sendResponse<IFAQ[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQs retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getFaqById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await FAQServices.getFaqById(id);

    sendResponse<IFAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQ retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateFaq = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await FAQServices.updateFaq(id, req.body);

    // Emit real-time notification
    notifyFAQUpdated(result);

    sendResponse<IFAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQ updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteFaq = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await FAQServices.deleteFaq(id);

    // Emit real-time notification
    notifyFAQDeleted(id);

    sendResponse<IFAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQ deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const FAQControllers = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
