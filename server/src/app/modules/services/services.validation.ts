import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().min(1),
    iconUrl: z.string(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i),
  }),
});
