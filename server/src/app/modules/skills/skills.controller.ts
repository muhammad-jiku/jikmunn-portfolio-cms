import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, pick } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import {
  notifySkillCreated,
  notifySkillDeleted,
  notifySkillUpdated,
} from '../../../utils/socket.util';
import { paginationFields } from '../../../utils/types.util';
import { skillFilterableFields } from './skills.constants';
import { ISkill } from './skills.interface';
import { SkillServices } from './skills.service';

const createSkill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SkillServices.createSkill(req.body);

    // Emit real-time notification
    notifySkillCreated(result);

    sendResponse<ISkill>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Skill created successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const getAllSkills = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, skillFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await SkillServices.getAllSkills(filters, paginationOptions);

    sendResponse<ISkill[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skills retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
});

const getSkillById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await SkillServices.getSkillById(id);

    sendResponse<ISkill>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skill retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const updateSkill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await SkillServices.updateSkill(id, req.body);

    // Emit real-time notification
    notifySkillUpdated(result);

    sendResponse<ISkill>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skill updated successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteSkill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await SkillServices.deleteSkill(id);

    // Emit real-time notification
    notifySkillDeleted(id);

    sendResponse<ISkill>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skill deleted successfully!',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
