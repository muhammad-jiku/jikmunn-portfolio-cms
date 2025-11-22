import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';

const prisma = new PrismaClient();

// Validation schema
const maintenanceSchema = z.object({
  isActive: z.boolean(),
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
  estimatedEndTime: z.string().datetime().optional(),
});

/**
 * Get maintenance mode status (Public endpoint)
 */
export const getMaintenanceStatus = catchAsync(async (_req, res) => {
  const maintenance = await prisma.maintenance.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  if (!maintenance) {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Maintenance status retrieved successfully',
      data: {
        isActive: false,
        message: null,
        estimatedEndTime: null,
      },
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Maintenance status retrieved successfully',
    data: {
      isActive: maintenance.isActive,
      message: maintenance.message,
      estimatedEndTime: maintenance.estimatedEndTime,
    },
  });
});

/**
 * Update maintenance mode (Admin only)
 */
export const updateMaintenanceMode = catchAsync(async (req, res) => {
  const { isActive, message, estimatedEndTime } = maintenanceSchema.parse(req.body);

  // Check if maintenance record exists
  const existing = await prisma.maintenance.findFirst();

  let maintenance;
  if (existing) {
    maintenance = await prisma.maintenance.update({
      where: { id: existing.id },
      data: {
        isActive,
        message,
        estimatedEndTime: estimatedEndTime ? new Date(estimatedEndTime) : null,
      },
    });
  } else {
    maintenance = await prisma.maintenance.create({
      data: {
        isActive,
        message,
        estimatedEndTime: estimatedEndTime ? new Date(estimatedEndTime) : null,
      },
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Maintenance mode ${isActive ? 'enabled' : 'disabled'}`,
    data: maintenance,
  });
});
