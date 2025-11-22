import { z } from 'zod';

export const getTrashByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const restoreTrashSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteTrashSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
