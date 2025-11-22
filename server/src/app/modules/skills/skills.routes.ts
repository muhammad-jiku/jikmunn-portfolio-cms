import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { SkillControllers } from './skills.controller';
import {
  createSkillSchema,
  deleteSkillSchema,
  getSkillByIdSchema,
  updateSkillSchema,
} from './skills.validation';

const router = express.Router();

// Public routes
router.route('/').get(SkillControllers.getAllSkills);

router.route('/:id').get(validate(getSkillByIdSchema), SkillControllers.getSkillById);

// Protected routes - Admin only
router.use(verifyToken);

router
  .route('/')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createSkillSchema),
    SkillControllers.createSkill
  );

router
  .route('/:id')
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateSkillSchema),
    SkillControllers.updateSkill
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteSkillSchema),
    SkillControllers.deleteSkill
  );

export const SkillRoutes = router;
