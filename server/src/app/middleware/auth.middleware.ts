import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { NextFunction, Request, Response } from 'express';
import { cognitoConfig } from '../../config/cognito.config';

// Create Cognito JWT Verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: cognitoConfig.userPoolId,
  tokenUse: 'access',
  clientId: cognitoConfig.clientId,
});

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    sub: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

/**
 * Middleware to verify Cognito JWT token
 */
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const payload = await verifier.verify(token);

    // Attach user info to request
    req.user = {
      sub: payload.sub as string,
      email: (payload.email as string) || '',
      role: (payload['custom:role'] as string) || 'AUTHOR',
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid or expired token',
    });
    return;
  }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: No user context',
      });
      return;
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Required role(s): ${allowedRoles.join(', ')}`,
      });
      return;
    }

    next();
  };
};
