import { UserRole } from '@/types/auth';

// Role hierarchy for permission checks
const roleHierarchy = {
  [UserRole.SUPER_ADMIN]: 4,
  [UserRole.ADMIN]: 3,
  [UserRole.EDITOR]: 2,
  [UserRole.AUTHOR]: 1,
};

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Check if user is admin or super admin
 */
export function isAdmin(userRole: UserRole): boolean {
  return hasRole(userRole, UserRole.ADMIN);
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(userRole: UserRole): boolean {
  return userRole === UserRole.SUPER_ADMIN;
}

/**
 * Check if user can edit content
 */
export function canEdit(userRole: UserRole): boolean {
  return hasRole(userRole, UserRole.EDITOR);
}

/**
 * Check if user can create content
 */
export function canCreate(userRole: UserRole): boolean {
  return hasRole(userRole, UserRole.AUTHOR);
}
