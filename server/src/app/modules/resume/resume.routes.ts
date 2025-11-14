import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { ResumeController } from './resume.controller';
import {
  createAchievementSchema,
  createEducationSchema,
  createExperienceSchema,
  createReferenceSchema,
  updateAchievementSchema,
  updateEducationSchema,
  updateExperienceSchema,
  updateReferenceSchema,
  updateResumeSummarySchema,
} from './resume.validation';

const router = express.Router();

// ============ RESUME SUMMARY ROUTES ============
// Public route
router.get('/summary', ResumeController.getResumeSummary);

// Protected routes - Admin only
router.put(
  '/summary/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateResumeSummarySchema),
  ResumeController.updateResumeSummary
);

// ============ EDUCATION ROUTES ============
// Public routes
router.get('/education', ResumeController.getAllEducation);
router.get('/education/:id', ResumeController.getEducationById);

// Protected routes - Admin only
router.post(
  '/education',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createEducationSchema),
  ResumeController.createEducation
);

router.put(
  '/education/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateEducationSchema),
  ResumeController.updateEducation
);

router.delete(
  '/education/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  ResumeController.deleteEducation
);

// ============ EXPERIENCE ROUTES ============
// Public routes
router.get('/experience', ResumeController.getAllExperience);
router.get('/experience/:id', ResumeController.getExperienceById);

// Protected routes - Admin only
router.post(
  '/experience',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createExperienceSchema),
  ResumeController.createExperience
);

router.put(
  '/experience/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateExperienceSchema),
  ResumeController.updateExperience
);

router.delete(
  '/experience/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  ResumeController.deleteExperience
);

// ============ ACHIEVEMENTS ROUTES ============
// Public routes
router.get('/achievements', ResumeController.getAllAchievements);
router.get('/achievements/:id', ResumeController.getAchievementById);

// Protected routes - Admin only
router.post(
  '/achievements',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createAchievementSchema),
  ResumeController.createAchievement
);

router.put(
  '/achievements/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateAchievementSchema),
  ResumeController.updateAchievement
);

router.delete(
  '/achievements/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  ResumeController.deleteAchievement
);

// ============ REFERENCES ROUTES ============
// Public routes
router.get('/references', ResumeController.getAllReferences);
router.get('/references/:id', ResumeController.getReferenceById);

// Protected routes - Admin only
router.post(
  '/references',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(createReferenceSchema),
  ResumeController.createReference
);

router.put(
  '/references/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  validate(updateReferenceSchema),
  ResumeController.updateReference
);

router.delete(
  '/references/:id',
  verifyToken,
  requireRole('SUPER_ADMIN', 'ADMIN'),
  ResumeController.deleteReference
);

export default router;
