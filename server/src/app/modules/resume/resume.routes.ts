import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { ResumeControllers } from './resume.controller';
import {
  createAchievementSchema,
  createEducationSchema,
  createExperienceSchema,
  createReferenceSchema,
  deleteAchievementSchema,
  deleteEducationSchema,
  deleteExperienceSchema,
  deleteReferenceSchema,
  getAchievementByIdSchema,
  getEducationByIdSchema,
  getExperienceByIdSchema,
  getReferenceByIdSchema,
  updateAchievementSchema,
  updateEducationSchema,
  updateExperienceSchema,
  updateReferenceSchema,
  updateResumeSummarySchema,
} from './resume.validation';

const router = express.Router();

// ============ RESUME SUMMARY ROUTES ============
// Public route
router.route('/summary').get(ResumeControllers.getResumeSummary);

router
  .route('/summary/:id')
  .put(
    verifyToken,
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateResumeSummarySchema),
    ResumeControllers.updateResumeSummary
  );

// ============ EDUCATION ROUTES ============
router.use(verifyToken);

router
  .route('/education')
  .get(ResumeControllers.getAllEducation)
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createEducationSchema),
    ResumeControllers.createEducation
  );

router
  .route('/education/:id')
  .get(validate(getEducationByIdSchema), ResumeControllers.getEducationById)
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateEducationSchema),
    ResumeControllers.updateEducation
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteEducationSchema),
    ResumeControllers.deleteEducation
  );

// ============ EXPERIENCE ROUTES ============
router
  .route('/experience')
  .get(ResumeControllers.getAllExperience)
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createExperienceSchema),
    ResumeControllers.createExperience
  );

router
  .route('/experience/:id')
  .get(validate(getExperienceByIdSchema), ResumeControllers.getExperienceById)
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateExperienceSchema),
    ResumeControllers.updateExperience
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteExperienceSchema),
    ResumeControllers.deleteExperience
  );

// ============ ACHIEVEMENTS ROUTES ============
router
  .route('/achievements')
  .get(ResumeControllers.getAllAchievements)
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createAchievementSchema),
    ResumeControllers.createAchievement
  );

router
  .route('/achievements/:id')
  .get(validate(getAchievementByIdSchema), ResumeControllers.getAchievementById)
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateAchievementSchema),
    ResumeControllers.updateAchievement
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteAchievementSchema),
    ResumeControllers.deleteAchievement
  );

// ============ REFERENCES ROUTES ============
router
  .route('/references')
  .get(ResumeControllers.getAllReferences)
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createReferenceSchema),
    ResumeControllers.createReference
  );

router
  .route('/references/:id')
  .get(validate(getReferenceByIdSchema), ResumeControllers.getReferenceById)
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateReferenceSchema),
    ResumeControllers.updateReference
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteReferenceSchema),
    ResumeControllers.deleteReference
  );

export const ResumeRoutes = router;
