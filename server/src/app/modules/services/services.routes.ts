import { Router } from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { ServiceControllers } from './services.controller';
import {
  createServiceSchema,
  deleteServiceSchema,
  getServiceByIdSchema,
  updateServiceSchema,
} from './services.validation';

const router = Router();

router.route('/').get(ServiceControllers.getAllServices);

router.route('/:id').get(validate(getServiceByIdSchema), ServiceControllers.getServiceById);

router.use(verifyToken);

router
  .route('/')
  .post(
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(createServiceSchema),
    ServiceControllers.createService
  );

router
  .route('/:id')
  .put(
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(updateServiceSchema),
    ServiceControllers.updateService
  )
  .delete(
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(deleteServiceSchema),
    ServiceControllers.deleteService
  );

export const ServiceRoutes = router;
