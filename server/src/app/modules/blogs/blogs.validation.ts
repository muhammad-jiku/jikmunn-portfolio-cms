import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().min(1),
    tags: z.array(z.string()),
    videoUrl: z.string().url().optional(),
  }),
});
