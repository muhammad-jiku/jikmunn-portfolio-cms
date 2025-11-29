import express from 'express';
import { requireRole, verifyToken } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { ResumeControllers } from './resume.controller';
import {
  createAchievementSchema,
  createEducationSchema,
  createExperienceSchema,
  createReferenceSchema,
  createSummarySchema,
  deleteAchievementSchema,
  deleteEducationSchema,
  deleteExperienceSchema,
  deleteReferenceSchema,
  deleteSummarySchema,
  getAchievementByIdSchema,
  getEducationByIdSchema,
  getExperienceByIdSchema,
  getReferenceByIdSchema,
  getSummaryByIdSchema,
  updateAchievementSchema,
  updateEducationSchema,
  updateExperienceSchema,
  updateReferenceSchema,
  updateResumeSummarySchema,
} from './resume.validation';

const router = express.Router();

// ============ PUBLIC ROUTES (No Authentication Required) ============

// Resume Summary
router.route('/summary').get(ResumeControllers.getAllSummary);
router.route('/summary/:id').get(validate(getSummaryByIdSchema), ResumeControllers.getSummaryById);

// Education
router.route('/education').get(ResumeControllers.getAllEducation);
router
  .route('/education/:id')
  .get(validate(getEducationByIdSchema), ResumeControllers.getEducationById);

// Experience
router.route('/experience').get(ResumeControllers.getAllExperience);
router
  .route('/experience/:id')
  .get(validate(getExperienceByIdSchema), ResumeControllers.getExperienceById);

// Achievements
router.route('/achievements').get(ResumeControllers.getAllAchievements);
router
  .route('/achievements/:id')
  .get(validate(getAchievementByIdSchema), ResumeControllers.getAchievementById);

// References
router.route('/references').get(ResumeControllers.getAllReferences);
router
  .route('/references/:id')
  .get(validate(getReferenceByIdSchema), ResumeControllers.getReferenceById);

// ============ PROTECTED ROUTES (Authentication Required) ============
router.use(verifyToken);

// Resume Summary - Create/Update/Delete
router
  .route('/summary')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createSummarySchema),
    ResumeControllers.createSummary
  );

router
  .route('/summary/:id')
  .put(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(updateResumeSummarySchema),
    ResumeControllers.updateSummary
  )
  .delete(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(deleteSummarySchema),
    ResumeControllers.deleteSummary
  );

// Education - Create/Update/Delete
router
  .route('/education')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createEducationSchema),
    ResumeControllers.createEducation
  );

router
  .route('/education/:id')
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

// Experience - Create/Update/Delete
router
  .route('/experience')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createExperienceSchema),
    ResumeControllers.createExperience
  );

router
  .route('/experience/:id')
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

// Achievements - Create/Update/Delete
router
  .route('/achievements')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createAchievementSchema),
    ResumeControllers.createAchievement
  );

router
  .route('/achievements/:id')
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

// References - Create/Update/Delete
router
  .route('/references')
  .post(
    requireRole('SUPER_ADMIN', 'ADMIN'),
    validate(createReferenceSchema),
    ResumeControllers.createReference
  );

router
  .route('/references/:id')
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
