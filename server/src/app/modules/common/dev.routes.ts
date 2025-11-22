import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { devOnly, devWarning } from '../../middleware/dev.middleware';
import { listUsersDev, updateUserRoleDev } from './dev.controller';

const router = Router();

/**
 * DEV ONLY ROUTES
 * These routes will return 404 in production
 */

router.route('/users').get(devOnly, devWarning, verifyToken, listUsersDev);

router.route('/users/role').put(devOnly, devWarning, verifyToken, updateUserRoleDev);

export default router;
