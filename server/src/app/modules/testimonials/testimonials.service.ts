import { Testimonial, TestimonialPlatform } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { addDays } from '../../../utils/helpers.util';
import { ApiError } from '../../middleware/errorHandler.middleware';

export class TestimonialService {
  async createTestimonial(data: {
    name: string;
    jobPosition: string;
    testimonial: string;
    platform: TestimonialPlatform;
    imageUrl?: string | null;
  }): Promise<Testimonial> {
    const testimonial = await prisma.testimonial.create({ data });
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    const testimonials = await prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return testimonials;
  }

  async getTestimonialById(id: string): Promise<Testimonial> {
    const testimonial = await prisma.testimonial.findFirst({
      where: { id, deletedAt: null },
    });

    if (!testimonial) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    return testimonial;
  }

  async updateTestimonial(
    id: string,
    data: Partial<{
      name: string;
      jobPosition: string;
      testimonial: string;
      platform: TestimonialPlatform;
      imageUrl: string | null;
    }>
  ): Promise<Testimonial> {
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingTestimonial) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<Testimonial> {
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingTestimonial) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    // Soft delete
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    const deleted = await prisma.testimonial.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // Add to trash
    await prisma.trash.create({
      data: {
        entityType: 'testimonials',
        entityId: id,
        entityData: (testimonial || {}) as any,
        expiresAt: addDays(new Date(), 31),
      },
    });

    return deleted;
  }
}

export const testimonialService = new TestimonialService();
