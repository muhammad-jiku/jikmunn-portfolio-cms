import { Router } from 'express';
import multer from 'multer';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import {
  createProject,
  deleteProject,
  deleteProjectImage,
  getAllProjects,
  getProjectById,
  updateProject,
  uploadProjectImages,
} from './projects.controller';
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectByIdSchema,
  updateProjectSchema,
  uploadProjectImagesSchema,
} from './projects.validation';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes - Only PRODUCTION status projects visible
router.get('/public', getAllProjects);
router.get('/public/:id', validate(getProjectByIdSchema), getProjectById);

// Protected routes - require authentication (shows ALL projects regardless of status)
router.use(verifyToken);

// Authenticated users can see all their projects
router.get('/', getAllProjects);
router.get('/:id', validate(getProjectByIdSchema), getProjectById);

// Admin/Author routes
router.post(
  '/',
  requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
  validate(createProjectSchema),
  createProject
);

router.put(
  '/:id',
  requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  '/:id',
  requireRole('ADMIN', 'SUPER_ADMIN'),
  validate(deleteProjectSchema),
  deleteProject
);

router.post(
  '/:id/images',
  requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
  validate(uploadProjectImagesSchema),
  upload.array('images', 10),
  uploadProjectImages
);

router.delete(
  '/:projectId/images/:imageId',
  requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
  deleteProjectImage
);

export default router;
