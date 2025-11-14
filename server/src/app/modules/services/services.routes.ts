import { Router } from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { createService, deleteService, getAllServices, getServiceById, updateService } from './services.controller';

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);

router.use(verifyToken);
router.post('/', requireRole('ADMIN', 'SUPER_ADMIN'), createService);
router.put('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), updateService);
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), deleteService);

export default router;
