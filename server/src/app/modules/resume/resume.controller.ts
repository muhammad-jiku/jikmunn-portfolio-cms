import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import {
  achievementService,
  educationService,
  experienceService,
  referenceService,
  resumeSummaryService,
} from './resume.service';

// RESUME SUMMARY CONTROLLERS
const getResumeSummary = catchAsync(async (_req: Request, res: Response) => {
  const summary = await resumeSummaryService.getSummary();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume summary retrieved successfully',
    data: summary,
  });
});

const updateResumeSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await resumeSummaryService.updateSummary(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resume summary updated successfully',
    data: summary,
  });
});

// EDUCATION CONTROLLERS
const createEducation = catchAsync(async (req: Request, res: Response) => {
  const education = await educationService.createEducation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Education created successfully',
    data: education,
  });
});

const getAllEducation = catchAsync(async (_req: Request, res: Response) => {
  const education = await educationService.getAllEducation();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education retrieved successfully',
    data: education,
  });
});

const getEducationById = catchAsync(async (req: Request, res: Response) => {
  const education = await educationService.getEducationById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education retrieved successfully',
    data: education,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const education = await educationService.updateEducation(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education updated successfully',
    data: education,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  await educationService.deleteEducation(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Education deleted successfully',
    data: null,
  });
});

// EXPERIENCE CONTROLLERS
const createExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await experienceService.createExperience(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Experience created successfully',
    data: experience,
  });
});

const getAllExperience = catchAsync(async (_req: Request, res: Response) => {
  const experience = await experienceService.getAllExperience();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience retrieved successfully',
    data: experience,
  });
});

const getExperienceById = catchAsync(async (req: Request, res: Response) => {
  const experience = await experienceService.getExperienceById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience retrieved successfully',
    data: experience,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await experienceService.updateExperience(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience updated successfully',
    data: experience,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  await experienceService.deleteExperience(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience deleted successfully',
    data: null,
  });
});

// ACHIEVEMENT CONTROLLERS
const createAchievement = catchAsync(async (req: Request, res: Response) => {
  const achievement = await achievementService.createAchievement(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Achievement created successfully',
    data: achievement,
  });
});

const getAllAchievements = catchAsync(async (_req: Request, res: Response) => {
  const achievements = await achievementService.getAllAchievements();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievements retrieved successfully',
    data: achievements,
  });
});

const getAchievementById = catchAsync(async (req: Request, res: Response) => {
  const achievement = await achievementService.getAchievementById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement retrieved successfully',
    data: achievement,
  });
});

const updateAchievement = catchAsync(async (req: Request, res: Response) => {
  const achievement = await achievementService.updateAchievement(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement updated successfully',
    data: achievement,
  });
});

const deleteAchievement = catchAsync(async (req: Request, res: Response) => {
  await achievementService.deleteAchievement(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement deleted successfully',
    data: null,
  });
});

// REFERENCE CONTROLLERS
const createReference = catchAsync(async (req: Request, res: Response) => {
  const reference = await referenceService.createReference(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Reference created successfully',
    data: reference,
  });
});

const getAllReferences = catchAsync(async (_req: Request, res: Response) => {
  const references = await referenceService.getAllReferences();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'References retrieved successfully',
    data: references,
  });
});

const getReferenceById = catchAsync(async (req: Request, res: Response) => {
  const reference = await referenceService.getReferenceById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reference retrieved successfully',
    data: reference,
  });
});

const updateReference = catchAsync(async (req: Request, res: Response) => {
  const reference = await referenceService.updateReference(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reference updated successfully',
    data: reference,
  });
});

const deleteReference = catchAsync(async (req: Request, res: Response) => {
  await referenceService.deleteReference(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reference deleted successfully',
    data: null,
  });
});

export const ResumeController = {
  // Summary
  getResumeSummary,
  updateResumeSummary,
  // Education
  createEducation,
  getAllEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
  // Experience
  createExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
  // Achievement
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  // Reference
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
};
