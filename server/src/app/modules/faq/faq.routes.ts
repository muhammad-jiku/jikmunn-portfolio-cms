import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { FAQControllers } from './faq.controller';
import {
  createFaqSchema,
  deleteFaqSchema,
  getFaqByIdSchema,
  updateFaqSchema,
} from './faq.validation';

const router = express.Router();

// Public routes
router.route('/').get(FAQControllers.getAllFaqs);

router.route('/:id').get(validate(getFaqByIdSchema), FAQControllers.getFaqById);

// Protected routes - Admin only
router.use(verifyToken);

router
  .route('/')
  .post(requireRole('SUPER_ADMIN', 'ADMIN'), validate(createFaqSchema), FAQControllers.createFaq);

router
  .route('/:id')
  .put(requireRole('SUPER_ADMIN', 'ADMIN'), validate(updateFaqSchema), FAQControllers.updateFaq)
  .delete(requireRole('SUPER_ADMIN', 'ADMIN'), validate(deleteFaqSchema), FAQControllers.deleteFaq);

export const FAQRoutes = router;
