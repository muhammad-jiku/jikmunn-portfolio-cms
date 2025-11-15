import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { faqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.createFaq(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FAQ created successfully',
    data: faq,
  });
});

const getAllFaqs = catchAsync(async (_req: Request, res: Response) => {
  const faqs = await faqService.getAllFaqs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQs retrieved successfully',
    data: faqs,
  });
});

const getFaqById = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.getFaqById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ retrieved successfully',
    data: faq,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const faq = await faqService.updateFaq(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: faq,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  await faqService.deleteFaq(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: null,
  });
});

export const FaqController = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
