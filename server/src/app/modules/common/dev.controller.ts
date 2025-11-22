import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { z } from 'zod';
import { cognitoConfig } from '../../../config/cognito.config';
import { catchAsync } from '../../../utils/helpers.util';
import { sendResponse } from '../../../utils/response.util';

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
export const updateUserRoleDev = catchAsync(async (req, res) => {
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User role updated to ${role} (DEV MODE)`,
    data: { userId, role },
  });
});

/**
 * DEV ONLY: Get all users from Cognito (for testing)
 */
export const listUsersDev = catchAsync(async (_req, res) => {
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved (DEV MODE)',
    data: users,
  });
});
