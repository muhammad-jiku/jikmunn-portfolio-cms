import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { FaqController } from './faq.controller';
import { createFaqSchema, updateFaqSchema } from './faq.validation';

const router = express.Router();

// Public routes
router.get('/', FaqController.getAllFaqs);
router.get('/:id', FaqController.getFaqById);

// Protected routes - Admin only
router.post(
  '/',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createFaqSchema),
  FaqController.createFaq
);

router.put(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateFaqSchema),
  FaqController.updateFaq
);

router.delete('/:id', verifyToken, requireRole('SUPER_ADMIN', 'ADMIN'), FaqController.deleteFaq);

export default router;
