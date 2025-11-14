import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

/**
 * Send success response (deprecated - use sendResponse)
 */
export const sendSuccess = (
  res: Response,
  data?: any,
  message?: string,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message: message || 'Request successful',
    data,
  });
};

/**
 * Send success response with pagination
 */
export const sendSuccessWithPagination = (
  res: Response,
  data: any,
  meta: {
    page: number;
    limit: number;
    total: number;
  },
  message?: string,
  statusCode: number = 200
): Response<SuccessResponse> => {
  return res.status(statusCode).json({
    success: true,
    message: message || 'Request successful',
    data,
    meta: {
      ...meta,
      totalPages: Math.ceil(meta.total / meta.limit),
    },
  });
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any[]
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

/**
 * Send created response
 */
export const sendCreated = (res: Response, data?: any, message?: string): Response => {
  return sendSuccess(res, data, message || 'Resource created successfully', 201);
};

/**
 * Send no content response
 */
export const sendNoContent = (res: Response): Response => {
  return res.status(204).send();
};
