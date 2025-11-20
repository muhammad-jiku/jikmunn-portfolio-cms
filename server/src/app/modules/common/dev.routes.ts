import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { devOnly, devWarning } from '../../middleware/dev.middleware';
import { listUsersDev, updateUserRoleDev } from './dev.controller';

const router = Router();

/**
 * DEV ONLY ROUTES
 * These routes will return 404 in production
 */

// List all users with their roles
router.get('/users', devOnly, devWarning, verifyToken, listUsersDev);

// Update user role (for testing)
router.put('/users/role', devOnly, devWarning, verifyToken, updateUserRoleDev);

export default router;
