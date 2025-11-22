import httpStatus from 'http-status';
import prisma from '../../../config/database.config';
import { ApiError } from '../../middleware/errorHandler.middleware';
import { IAbout, IUpdateAbout } from './about.interface';

const getAbout = async (): Promise<IAbout> => {
  const about = await prisma.about.findFirst();

  if (!about) {
    const newAbout = await prisma.about.create({
      data: {
        numberOfClients: 0,
        numberOfProjects: 0,
        hoursOfSupport: 0,
        yearsOfExperience: 0,
      },
    });
    return newAbout as IAbout;
  }

  return about as IAbout;
};

const updateAbout = async (id: string, data: IUpdateAbout): Promise<IAbout> => {
  const about = await prisma.about.findUnique({
    where: { id },
  });

  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, 'About section not found');
  }

  const result = await prisma.about.update({
    where: { id },
    data,
  });

  return result as IAbout;
};

const resetAbout = async (id: string): Promise<IAbout> => {
  const about = await prisma.about.findUnique({
    where: { id },
  });

  if (!about) {
    throw new ApiError(httpStatus.NOT_FOUND, 'About section not found');
  }

  const result = await prisma.about.update({
    where: { id },
    data: {
      numberOfClients: 0,
      numberOfProjects: 0,
      hoursOfSupport: 0,
      yearsOfExperience: 0,
    },
  });

  return result as IAbout;
};

export const AboutServices = {
  getAbout,
  updateAbout,
  resetAbout,
};
