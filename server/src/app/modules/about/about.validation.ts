import { z } from 'zod';

export const updateAboutSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    numberOfClients: z.number().int().optional(),
    numberOfProjects: z.number().int().optional(),
    hoursOfSupport: z.number().int().optional(),
    yearsOfExperience: z.number().int().optional(),
  }),
});

export const resetAboutSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
