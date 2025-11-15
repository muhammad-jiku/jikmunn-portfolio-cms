import { FAQ } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { ApiError } from '../../middleware/errorHandler.middleware';

export class FaqService {
  async createFaq(data: { question: string; answer: string; order: number }): Promise<FAQ> {
    const faq = await prisma.fAQ.create({ data });
    return faq;
  }

  async getAllFaqs(): Promise<FAQ[]> {
    const faqs = await prisma.fAQ.findMany({
      where: { deletedAt: null },
      orderBy: { order: 'asc' },
    });
    return faqs;
  }

  async getFaqById(id: string): Promise<FAQ> {
    const faq = await prisma.fAQ.findFirst({
      where: { id, deletedAt: null },
    });

    if (!faq) {
      throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
    }

    return faq;
  }

  async updateFaq(
    id: string,
    data: Partial<{
      question: string;
      answer: string;
      order: number;
    }>
  ): Promise<FAQ> {
    const existingFaq = await prisma.fAQ.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingFaq) {
      throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
    }

    const faq = await prisma.fAQ.update({
      where: { id },
      data,
    });

    return faq;
  }

  async deleteFaq(id: string): Promise<FAQ> {
    const existingFaq = await prisma.fAQ.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingFaq) {
      throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
    }

    // Soft delete
    const faq = await prisma.fAQ.findUnique({ where: { id } });
    const deleted = await prisma.fAQ.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Add to trash
    await prisma.trash.create({
      data: {
        entityType: 'faq',
        entityId: id,
        entityData: (faq || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

export const faqService = new FaqService();
