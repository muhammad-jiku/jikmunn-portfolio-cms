import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { Response } from 'express';
import { z } from 'zod';
import { cognitoConfig } from '../../../config/cognito.config';
import { AuthRequest } from '../../middleware/auth.middleware';

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: cognitoConfig.region,
});

// Validation schema
const updateRoleSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'AUTHOR', 'EDITOR'], {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
});

/**
 * DEV ONLY: Update user role in Cognito
 * This endpoint will NOT exist in production (protected by devOnly middleware)
 */
export const updateUserRoleDev = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, role } = updateRoleSchema.parse(req.body);

    // Update user attribute in Cognito
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: cognitoConfig.userPoolId,
      Username: userId, // Can be username, email, or sub
      UserAttributes: [
        {
          Name: 'custom:role',
          Value: role,
        },
      ],
    });

    await cognitoClient.send(command);

    return res.status(200).json({
      success: true,
      message: `User role updated to ${role} (DEV MODE)`,
      data: { userId, role },
    });
  } catch (error: any) {
    console.error('Error updating user role (dev):', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update user role',
      error: error.message,
    });
  }
};

/**
 * DEV ONLY: Get all users from Cognito (for testing)
 */
export const listUsersDev = async (_req: AuthRequest, res: Response) => {
  try {
    const { ListUsersCommand } = await import('@aws-sdk/client-cognito-identity-provider');

    const command = new ListUsersCommand({
      UserPoolId: cognitoConfig.userPoolId,
      Limit: 60,
    });

    const response = await cognitoClient.send(command);

    const users = response.Users?.map(user => {
      const email = user.Attributes?.find(attr => attr.Name === 'email')?.Value;
      const role = user.Attributes?.find(attr => attr.Name === 'custom:role')?.Value || 'AUTHOR';
      const sub = user.Attributes?.find(attr => attr.Name === 'sub')?.Value;

      return {
        username: user.Username,
        email,
        role,
        sub,
        enabled: user.Enabled,
        status: user.UserStatus,
      };
    });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved (DEV MODE)',
      data: users,
    });
  } catch (error: any) {
    console.error('Error listing users (dev):', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message,
    });
  }
};
