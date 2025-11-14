import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { config } from '../../config/index.config';

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

interface IGenericErrorMessage {
  path: string | number;
  message: string;
}

const handleValidationError = (err: Prisma.PrismaClientValidationError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Validation error!',
    errorMessages: errors,
  };
};

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Records not found!';
    errors = [{ path: '', message }];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete failed!';
      errors = [{ path: '', message }];
    }
  } else if (error.code === 'P2002') {
    message = 'Unique constraint violation';
    errors = [{ path: '', message }];
  }

  return { statusCode, message, errorMessages: errors };
};

const handleZodError = (error: ZodError) => {
  const errors: IGenericErrorMessage[] = error.issues.map(issue => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

/**
 * Global error handler middleware
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  config.env === 'development'
    ? console.log('Global development error handler:', { err })
    : console.error('Global production error handler:', err);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

/**
 * Handle 404 routes
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};
