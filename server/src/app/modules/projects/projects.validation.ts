import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    description: z.array(z.string()).min(1, 'At least one description point is required'),
    category: z.enum(['WEB_APPLICATION', 'MOBILE_APP_APPLICATION']),
    type: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'SUPER_ADVANCED']),
    status: z.enum(['IN_PROGRESS', 'DEVELOPMENT', 'PRODUCTION', 'UPDATED']),
    documentationUrl: z.string().url().optional(),
    liveLink: z.string().url().optional(),
    githubClientLink: z.string().url().optional(),
    githubServerLink: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    techStack: z.record(z.string()).optional(), // {"Frontend": "React", "Backend": "Node.js"}
    tools: z.record(z.string()).optional(), // {"Code Editor": "VS Code", "Version Control": "Git"}
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    subtitle: z.string().optional(),
    description: z.array(z.string()).optional(),
    category: z.enum(['WEB_APPLICATION', 'MOBILE_APP_APPLICATION']).optional(),
    type: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'SUPER_ADVANCED']).optional(),
    status: z.enum(['IN_PROGRESS', 'DEVELOPMENT', 'PRODUCTION', 'UPDATED']).optional(),
    documentationUrl: z.string().url().optional(),
    liveLink: z.string().url().optional(),
    githubClientLink: z.string().url().optional(),
    githubServerLink: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    techStack: z.record(z.string()).optional(),
    tools: z.record(z.string()).optional(),
  }),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const uploadProjectImagesSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
