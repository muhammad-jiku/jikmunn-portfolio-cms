import { Router } from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { getAbout, resetAbout, updateAbout } from './about.controller';

const router = Router();

router.get('/', getAbout);
router.use(verifyToken);
router.put('/', requireRole('ADMIN', 'SUPER_ADMIN'), updateAbout);
router.post('/reset', requireRole('ADMIN', 'SUPER_ADMIN'), resetAbout);

export default router;
