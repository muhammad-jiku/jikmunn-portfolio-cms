import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().min(1),
    topic: z.string().optional(),
    tags: z.array(z.string()),
    status: z.enum(['IN_PROGRESS', 'UPDATED', 'DEVELOPMENT', 'PRODUCTION']).optional(),
    videoUrl: z.string().url().optional(),
  }),
});
