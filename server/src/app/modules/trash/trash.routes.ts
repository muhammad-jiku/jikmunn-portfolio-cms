import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { TrashControllers } from './trash.controller';
import { deleteTrashSchema, getTrashByIdSchema, restoreTrashSchema } from './trash.validation';

const router = express.Router();

// All routes are protected - Admin only
router.use(verifyToken);

router.route('/').get(requireRole('SUPER_ADMIN', 'ADMIN'), TrashControllers.getAllTrash);

router
  .route('/:id')
  .get(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(getTrashByIdSchema),
    TrashControllers.getTrashById
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteTrashSchema),
    TrashControllers.permanentlyDeleteTrash
  );

router
  .route('/:id/restore')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(restoreTrashSchema),
    TrashControllers.restoreTrash
  );

router.route('/cleanup').post(requireRole('SUPER_ADMIN'), TrashControllers.cleanupExpiredTrash);

export const TrashRoutes = router;
