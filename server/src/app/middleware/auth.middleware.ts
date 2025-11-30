import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { NextFunction, Request, Response } from 'express';
import { cognitoConfig } from '../../config/cognito.config';

// Create Cognito JWT Verifier for Access Tokens
const accessTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: cognitoConfig.userPoolId,
  tokenUse: 'access',
  clientId: cognitoConfig.clientId,
});

// Create Cognito JWT Verifier for ID Tokens (contains custom:role)
const idTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: cognitoConfig.userPoolId,
  tokenUse: 'id',
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

    // Try to verify as ID token first (contains custom:role), fallback to access token
    let payload: any;
    try {
      payload = await idTokenVerifier.verify(token);
      console.log('✅ ID Token verified (has custom:role)');
    } catch {
      // If ID token verification fails, try access token
      try {
        payload = await accessTokenVerifier.verify(token);
        console.log('✅ Access Token verified (no custom:role)');
      } catch (accessError) {
        throw accessError; // Throw the access token error
      }
    }

    // AWS Cognito Token contents:
    // - ID Token: sub, email, custom:role, cognito:groups, email_verified
    // - Access Token: sub, username, cognito:groups, scope

    // Attach user info to request
    req.user = {
      sub: payload.sub as string,
      email: (payload.email as string) || (payload.username as string) || '',
      role:
        (payload['custom:role'] as string) || (payload['cognito:groups'] as any)?.[0] || 'AUTHOR',
      username:
        (payload.username as string) ||
        (payload['cognito:username'] as string) ||
        (payload.sub as string),
    };

    console.log('✅ Token verified. User:', {
      sub: req.user.sub,
      username: req.user.username,
      role: req.user.role,
    });

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
