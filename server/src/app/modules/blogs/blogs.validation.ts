import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    topic: z.string().optional(),
    tags: z.array(z.string()),
    status: z.enum(['IN_PROGRESS', 'UPDATED', 'DEVELOPMENT', 'PRODUCTION']).optional(),
    videoUrl: z.string().url().optional(),
  }),
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    subtitle: z.string().optional(),
    description: z.string().min(1, 'Description is required').optional(),
    topic: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['IN_PROGRESS', 'UPDATED', 'DEVELOPMENT', 'PRODUCTION']).optional(),
    videoUrl: z.string().url().optional(),
  }),
});

export const getBlogByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const uploadBlogImagesSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
