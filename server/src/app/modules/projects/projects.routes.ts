import { Router } from 'express';
import multer from 'multer';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { ProjectControllers } from './projects.controller';
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
router.route('/public').get(ProjectControllers.getAllProjects);

router.route('/public/:id').get(validate(getProjectByIdSchema), ProjectControllers.getProjectById);

// Protected routes - require authentication (shows ALL projects regardless of status)
router.use(verifyToken);

// Authenticated users can see all their projects
router
  .route('/')
  .get(ProjectControllers.getAllProjects)
  .post(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(createProjectSchema),
    ProjectControllers.createProject
  );

router
  .route('/:id')
  .get(validate(getProjectByIdSchema), ProjectControllers.getProjectById)
  .put(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(updateProjectSchema),
    ProjectControllers.updateProject
  )
  .delete(
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(deleteProjectSchema),
    ProjectControllers.deleteProject
  );

router
  .route('/:id/images')
  .post(
    requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'),
    validate(uploadProjectImagesSchema),
    upload.array('images', 10),
    ProjectControllers.uploadProjectImages
  );

router
  .route('/:projectId/images/:imageId')
  .delete(requireRole('ADMIN', 'SUPER_ADMIN', 'AUTHOR'), ProjectControllers.deleteProjectImage);

export const ProjectRoutes = router;
