import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../../middleware/auth.middleware';

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
export const getMaintenanceStatus = async (_req: AuthRequest, res: Response) => {
  try {
    const maintenance = await prisma.maintenance.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!maintenance) {
      return res.status(200).json({
        success: true,
        data: {
          isActive: false,
          message: null,
          estimatedEndTime: null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        isActive: maintenance.isActive,
        message: maintenance.message,
        estimatedEndTime: maintenance.estimatedEndTime,
      },
    });
  } catch (error: any) {
    console.error('Error fetching maintenance status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance status',
      error: error.message,
    });
  }
};

/**
 * Update maintenance mode (Admin only)
 */
export const updateMaintenanceMode = async (req: AuthRequest, res: Response) => {
  try {
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

    return res.status(200).json({
      success: true,
      message: `Maintenance mode ${isActive ? 'enabled' : 'disabled'}`,
      data: maintenance,
    });
  } catch (error: any) {
    console.error('Error updating maintenance mode:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update maintenance mode',
      error: error.message,
    });
  }
};
