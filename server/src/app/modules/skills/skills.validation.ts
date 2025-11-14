import { z } from 'zod';

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty'),
    progress: z
      .number({ required_error: 'Progress is required' })
      .min(0, 'Progress must be at least 0')
      .max(100, 'Progress must be at most 100'),
    iconUrl: z
      .string({ required_error: 'Icon URL is required' })
      .min(1, 'Icon URL cannot be empty'),
  }),
});

export const updateSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    progress: z
      .number()
      .min(0, 'Progress must be at least 0')
      .max(100, 'Progress must be at most 100')
      .optional(),
    iconUrl: z.string().min(1, 'Icon URL cannot be empty').optional(),
  }),
});
