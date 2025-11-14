import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';
import { skillService } from './skills.service';

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const skill = await skillService.createSkill(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Skill created successfully',
    data: skill,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await skillService.getAllSkills();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills retrieved successfully',
    data: skills,
  });
});

const getSkillById = catchAsync(async (req: Request, res: Response) => {
  const skill = await skillService.getSkillById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill retrieved successfully',
    data: skill,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const skill = await skillService.updateSkill(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated successfully',
    data: skill,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  await skillService.deleteSkill(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted successfully',
    data: null,
  });
});

export const SkillController = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
