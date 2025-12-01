// User roles matching backend
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EDITOR = 'EDITOR',
}

// User interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  idToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Register data
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  name?: string;
}

// Forgot password data
export interface ForgotPasswordData {
  email: string;
}

// Reset password data
export interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

// Cognito user attributes
export interface CognitoUserAttributes {
  sub: string;
  email: string;
  email_verified: boolean;
  'custom:role': UserRole;
  name?: string;
}

// Auth response
export interface AuthResponse {
  user: User;
  idToken: string;
  accessToken: string;
  refreshToken: string;
}
