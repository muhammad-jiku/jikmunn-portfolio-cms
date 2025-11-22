import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { TestimonialControllers } from './testimonials.controller';
import {
  createTestimonialSchema,
  deleteTestimonialSchema,
  getTestimonialByIdSchema,
  updateTestimonialSchema,
} from './testimonials.validation';

const router = express.Router();

// Public routes
router.route('/').get(TestimonialControllers.getAllTestimonials);

router
  .route('/:id')
  .get(validate(getTestimonialByIdSchema), TestimonialControllers.getTestimonialById);

// Protected routes - Admin only
router.use(verifyToken);

router
  .route('/')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createTestimonialSchema),
    TestimonialControllers.createTestimonial
  );

router
  .route('/:id')
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateTestimonialSchema),
    TestimonialControllers.updateTestimonial
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteTestimonialSchema),
    TestimonialControllers.deleteTestimonial
  );

export const TestimonialRoutes = router;
