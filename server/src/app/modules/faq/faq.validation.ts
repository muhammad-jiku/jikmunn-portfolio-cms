import { z } from 'zod';

export const createFaqSchema = z.object({
  body: z.object({
    question: z
      .string({ required_error: 'Question is required' })
      .min(5, 'Question must be at least 5 characters'),
    answer: z
      .string({ required_error: 'Answer is required' })
      .min(10, 'Answer must be at least 10 characters'),
    order: z
      .number({ required_error: 'Order is required' })
      .int('Order must be an integer')
      .min(1, 'Order must be at least 1'),
  }),
});

export const updateFaqSchema = z.object({
  body: z.object({
    question: z.string().min(5, 'Question must be at least 5 characters').optional(),
    answer: z.string().min(10, 'Answer must be at least 10 characters').optional(),
    order: z.number().int('Order must be an integer').min(1, 'Order must be at least 1').optional(),
  }),
});
