import {
  AuthResponse,
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  User,
  UserRole,
} from '@/types/auth';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

// Cognito configuration
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
};

const userPool = new CognitoUserPool(poolData);

// Get current Cognito user
export const getCurrentUser = (): CognitoUser | null => {
  return userPool.getCurrentUser();
};

// Parse JWT token
const parseJwt = (token: string): Record<string, unknown> | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

// Extract user from session
const extractUserFromSession = (session: CognitoUserSession): User => {
  const idToken = session.getIdToken().getJwtToken();
  const payload = parseJwt(idToken);

  if (!payload) {
    throw new Error('Failed to parse JWT token');
  }

  return {
    id: payload.sub as string,
    email: payload.email as string,
    role: payload['custom:role'] as UserRole,
    name: payload.name as string | undefined,
  };
};

// Login user
export const loginUser = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: credentials.email,
      Password: credentials.password,
    });

    const cognitoUser = new CognitoUser({
      Username: credentials.email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        const user = extractUserFromSession(session);
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        resolve({ user, idToken, accessToken, refreshToken });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

// Register user
export const registerUser = (data: RegisterData): Promise<void> => {
  return new Promise((resolve, reject) => {
    const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: 'email', Value: data.email }),
      new CognitoUserAttribute({ Name: 'custom:role', Value: data.role }),
    ];

    if (data.name) {
      attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: data.name }));
    }

    userPool.signUp(data.email, data.password, attributeList, [], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

// Logout user
export const logoutUser = (): Promise<void> => {
  return new Promise((resolve) => {
    const cognitoUser = getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    resolve();
  });
};

// Get current session
export const getCurrentSession = (): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUser();
    if (!cognitoUser) {
      reject(new Error('No current user'));
      return;
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) {
        reject(err || new Error('No session'));
        return;
      }
      resolve(session);
    });
  });
};

// Refresh session
export const refreshSession = (): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    getCurrentSession()
      .then((session) => {
        const user = extractUserFromSession(session);
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        resolve({ user, idToken, accessToken, refreshToken });
      })
      .catch(reject);
  });
};

// Forgot password
export const forgotPassword = (data: ForgotPasswordData): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
};

// Reset password with code
export const resetPassword = (data: ResetPasswordData): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(data.code, data.newPassword, {
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err),
    });
  });
};

// Verify email with code
export const verifyEmail = (email: string, code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
