import { NextFunction, Request, Response } from 'express';
import { config } from '../../config/index.config';

/**
 * Middleware to restrict endpoints to development environment only
 * This will throw 404 in production, making endpoints invisible
 */
export const devOnly = (_req: Request, res: Response, next: NextFunction) => {
  if (config.env === 'production') {
    return res.status(404).json({
      success: false,
      message: 'Not Found',
    });
  }
  return next();
};

/**
 * Middleware to add warning headers for development-only features
 */
export const devWarning = (_req: Request, res: Response, next: NextFunction) => {
  if (config.env === 'development') {
    res.setHeader(
      'X-Dev-Warning',
      'This endpoint is for development only and will not exist in production'
    );
  }
  next();
};
