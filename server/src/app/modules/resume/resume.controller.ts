import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { paginationFields } from '../../../utils/types.util';
import {
  achievementFilterableFields,
  educationFilterableFields,
  experienceFilterableFields,
  referenceFilterableFields,
  summaryFilterableFields,
} from './resume.constants';
import {
  IAchievement,
  IEducation,
  IExperience,
  IReference,
  IResumeSummary,
} from './resume.interface';
import {
  AchievementServices,
  EducationServices,
  ExperienceServices,
  ReferenceServices,
  ResumeSummaryServices,
} from './resume.service';

// RESUME SUMMARY CONTROLLERS
const createSummary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ResumeSummaryServices.createSummary(req.body);

    sendResponse<IResumeSummary>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Summary created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllSummary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, summaryFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ResumeSummaryServices.getAllSummary(filters, paginationOptions);

    sendResponse<IResumeSummary[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getSummaryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ResumeSummaryServices.getSummaryById(id);

    sendResponse<IResumeSummary>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateSummary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ResumeSummaryServices.updateSummary(id, req.body);

    sendResponse<IResumeSummary>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteSummary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ResumeSummaryServices.deleteSummary(id);

    sendResponse<IResumeSummary>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Summary deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// EDUCATION CONTROLLERS
const createEducation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await EducationServices.createEducation(req.body);

    sendResponse<IEducation>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Education created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllEducation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, educationFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await EducationServices.getAllEducation(filters, paginationOptions);

    sendResponse<IEducation[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Education retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getEducationById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await EducationServices.getEducationById(id);

    sendResponse<IEducation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Education retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateEducation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await EducationServices.updateEducation(id, req.body);

    sendResponse<IEducation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Education updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteEducation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await EducationServices.deleteEducation(id);

    sendResponse<IEducation>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Education deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// EXPERIENCE CONTROLLERS
const createExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ExperienceServices.createExperience(req.body);

    sendResponse<IExperience>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Experience created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, experienceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ExperienceServices.getAllExperience(filters, paginationOptions);

    sendResponse<IExperience[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Experience retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getExperienceById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ExperienceServices.getExperienceById(id);

    sendResponse<IExperience>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Experience retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ExperienceServices.updateExperience(id, req.body);

    sendResponse<IExperience>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Experience updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ExperienceServices.deleteExperience(id);

    sendResponse<IExperience>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Experience deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// ACHIEVEMENT CONTROLLERS
const createAchievement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AchievementServices.createAchievement(req.body);

    sendResponse<IAchievement>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Achievement created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllAchievements = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, achievementFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AchievementServices.getAllAchievements(filters, paginationOptions);

    sendResponse<IAchievement[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Achievements retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getAchievementById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AchievementServices.getAchievementById(id);

    sendResponse<IAchievement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Achievement retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateAchievement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AchievementServices.updateAchievement(id, req.body);

    sendResponse<IAchievement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Achievement updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteAchievement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AchievementServices.deleteAchievement(id);

    sendResponse<IAchievement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Achievement deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// REFERENCE CONTROLLERS
const createReference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReferenceServices.createReference(req.body);

    sendResponse<IReference>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Reference created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllReferences = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, referenceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ReferenceServices.getAllReferences(filters, paginationOptions);

    sendResponse<IReference[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'References retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getReferenceById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ReferenceServices.getReferenceById(id);

    sendResponse<IReference>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reference retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateReference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ReferenceServices.updateReference(id, req.body);

    sendResponse<IReference>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reference updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteReference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await ReferenceServices.deleteReference(id);

    sendResponse<IReference>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reference deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const ResumeControllers = {
  // Summary
  createSummary,
  getAllSummary,
  getSummaryById,
  updateSummary,
  deleteSummary,
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
