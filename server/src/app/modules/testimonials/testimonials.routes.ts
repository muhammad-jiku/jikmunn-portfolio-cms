import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { TestimonialController } from './testimonials.controller';
import { createTestimonialSchema, updateTestimonialSchema } from './testimonials.validation';

const router = express.Router();

// Public routes
router.get('/', TestimonialController.getAllTestimonials);
router.get('/:id', TestimonialController.getTestimonialById);

// Protected routes - Admin only
router.post(
  '/',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createTestimonialSchema),
  TestimonialController.createTestimonial
);

router.put(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateTestimonialSchema),
  TestimonialController.updateTestimonial
);

router.delete(
  '/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  TestimonialController.deleteTestimonial
);

export default router;
