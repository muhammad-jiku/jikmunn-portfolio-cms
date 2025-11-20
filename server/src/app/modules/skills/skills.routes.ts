import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { SkillController } from './skills.controller';
import { createSkillSchema, updateSkillSchema } from './skills.validation';

const router = express.Router();

// Public routes
router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getSkillById);

// Protected routes - Admin only
router.post(
  '/',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createSkillSchema),
  SkillController.createSkill
);

router.put(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateSkillSchema),
  SkillController.updateSkill
);

router.delete(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  SkillController.deleteSkill
);

export default router;
