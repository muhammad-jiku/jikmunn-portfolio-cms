import { z } from 'zod';

export const restoreTrashSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Trash ID is required' }),
  }),
});
