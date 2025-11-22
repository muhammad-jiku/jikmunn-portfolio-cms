import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty'),
    jobPosition: z
      .string({ required_error: 'Job position is required' })
      .min(1, 'Job position cannot be empty'),
    testimonial: z
      .string({ required_error: 'Testimonial is required' })
      .min(10, 'Testimonial must be at least 10 characters'),
    platform: z.enum(['UPWORK', 'LINKEDIN'], { required_error: 'Platform is required' }),
    imageUrl: z.string().url('Invalid image URL').optional().nullable(),
  }),
});

export const updateTestimonialSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    jobPosition: z.string().min(1, 'Job position cannot be empty').optional(),
    testimonial: z.string().min(10, 'Testimonial must be at least 10 characters').optional(),
    platform: z.enum(['UPWORK', 'LINKEDIN']).optional(),
    imageUrl: z.string().url('Invalid image URL').optional().nullable(),
  }),
});

export const getTestimonialByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteTestimonialSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
