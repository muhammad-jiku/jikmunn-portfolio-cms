import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    iconUrl: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    subtitle: z.string().optional(),
    description: z.string().min(1, 'Description is required').optional(),
    iconUrl: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const getServiceByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteServiceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
