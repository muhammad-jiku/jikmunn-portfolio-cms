import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { TrashController } from './trash.controller';

const router = express.Router();

// All routes are protected - Admin only
router.get('/', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), TrashController.getAllTrash);

router.get('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), TrashController.getTrashById);

router.post(
  '/:id/restore',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  TrashController.restoreTrash
);

router.delete(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  TrashController.permanentlyDeleteTrash
);

router.post(
  '/cleanup',
  verifyToken,
  requireRole('SUPER_ADMIN'),
  TrashController.cleanupExpiredTrash
);

export default router;
