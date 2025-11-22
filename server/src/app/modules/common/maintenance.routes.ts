import { Router } from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { getMaintenanceStatus, updateMaintenanceMode } from '../common/maintenance.controller';

const router = Router();

// Public endpoint - Frontend checks this
router.route('/status').get(getMaintenanceStatus);

// Protected endpoint - Only SUPER_ADMIN can toggle maintenance mode
router
  .route('/toggle')
  .put(verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), updateMaintenanceMode);

export default router;
