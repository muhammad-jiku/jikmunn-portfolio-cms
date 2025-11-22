import { z } from 'zod';

// Resume Summary validation
export const updateResumeSummarySchema = z.object({
  body: z.object({
    summary: z.string().min(1, 'Summary cannot be empty').optional(),
    address: z.string().min(1, 'Address cannot be empty').optional(),
    phone: z.string().min(1, 'Phone cannot be empty').optional(),
    email: z.string().email('Invalid email format').optional(),
  }),
});

// Education validation
export const createEducationSchema = z.object({
  body: z.object({
    degree: z.string({ required_error: 'Degree is required' }).min(1, 'Degree cannot be empty'),
    years: z.string({ required_error: 'Years is required' }).min(1, 'Years cannot be empty'),
    university: z
      .string({ required_error: 'University is required' })
      .min(1, 'University cannot be empty'),
  }),
});

export const updateEducationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    degree: z.string().min(1, 'Degree cannot be empty').optional(),
    years: z.string().min(1, 'Years cannot be empty').optional(),
    university: z.string().min(1, 'University cannot be empty').optional(),
  }),
});

export const getEducationByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteEducationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Professional Experience validation
export const createExperienceSchema = z.object({
  body: z.object({
    jobTitle: z
      .string({ required_error: 'Job title is required' })
      .min(1, 'Job title cannot be empty'),
    companyName: z
      .string({ required_error: 'Company name is required' })
      .min(1, 'Company name cannot be empty'),
    years: z.string({ required_error: 'Years is required' }).min(1, 'Years cannot be empty'),
    achievements: z
      .array(z.string())
      .min(1, 'At least one achievement is required')
      .max(10, 'Maximum 10 achievements'),
  }),
});

export const updateExperienceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    jobTitle: z.string().min(1, 'Job title cannot be empty').optional(),
    companyName: z.string().min(1, 'Company name cannot be empty').optional(),
    years: z.string().min(1, 'Years cannot be empty').optional(),
    achievements: z
      .array(z.string())
      .min(1, 'At least one achievement is required')
      .max(10, 'Maximum 10 achievements')
      .optional(),
  }),
});

export const getExperienceByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteExperienceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Achievement validation
export const createAchievementSchema = z.object({
  body: z.object({
    role: z.string({ required_error: 'Role is required' }).min(1, 'Role cannot be empty'),
    years: z.string({ required_error: 'Years is required' }).min(1, 'Years cannot be empty'),
    description: z
      .array(z.string())
      .min(1, 'At least one description is required')
      .max(10, 'Maximum 10 descriptions'),
  }),
});

export const updateAchievementSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    role: z.string().min(1, 'Role cannot be empty').optional(),
    years: z.string().min(1, 'Years cannot be empty').optional(),
    description: z
      .array(z.string())
      .min(1, 'At least one description is required')
      .max(10, 'Maximum 10 descriptions')
      .optional(),
  }),
});

export const getAchievementByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteAchievementSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Reference validation
export const createReferenceSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty'),
    jobTitle: z
      .string({ required_error: 'Job title is required' })
      .min(1, 'Job title cannot be empty'),
    companyName: z
      .string({ required_error: 'Company name is required' })
      .min(1, 'Company name cannot be empty'),
  }),
});

export const updateReferenceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    jobTitle: z.string().min(1, 'Job title cannot be empty').optional(),
    companyName: z.string().min(1, 'Company name cannot be empty').optional(),
  }),
});

export const getReferenceByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteReferenceSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
