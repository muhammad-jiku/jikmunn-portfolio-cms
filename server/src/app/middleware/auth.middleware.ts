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
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const payload = await verifier.verify(token);

    // Attach user info to request
    req.user = {
      sub: payload.sub,
      email: payload.email || '',
      role: payload['custom:role'] || 'AUTHOR',
      ...payload,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid or expired token',
    });
  }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user context',
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Required role(s): ${allowedRoles.join(', ')}`,
      });
    }

    next();
  };
};
