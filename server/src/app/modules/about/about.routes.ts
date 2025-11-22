import { Router } from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { AboutControllers } from './about.controller';
import { resetAboutSchema, updateAboutSchema } from './about.validation';

const router = Router();

router
  .route('/')
  .get(AboutControllers.getAbout)
  .put(
    verifyToken,
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(updateAboutSchema),
    AboutControllers.updateAbout
  );

router
  .route('/reset')
  .post(
    verifyToken,
    requireRole('ADMIN', 'SUPER_ADMIN'),
    validate(resetAboutSchema),
    AboutControllers.resetAbout
  );

export const AboutRoutes = router;
