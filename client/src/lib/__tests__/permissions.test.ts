/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Unit tests for permission helpers
 */

import { UserRole } from '@/types/auth';
import {
  canCreate,
  canDelete,
  canEdit,
  canManageTrash,
  hasRole,
  isAdmin,
  isSuperAdmin,
} from '../permissions';

describe('Permission Helpers', () => {
  describe('hasRole', () => {
    it('should return true for matching role', () => {
      expect(hasRole(UserRole.ADMIN, UserRole.ADMIN)).toBe(true);
      expect(hasRole(UserRole.SUPER_ADMIN, UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return false for non-matching role', () => {
      expect(hasRole(UserRole.EDITOR, UserRole.ADMIN)).toBe(false);
      expect(hasRole(UserRole.AUTHOR, UserRole.SUPER_ADMIN)).toBe(false);
    });

    it('should handle undefined role', () => {
      expect(hasRole(undefined as any, UserRole.ADMIN)).toBe(false);
    });

    it('should handle null role', () => {
      expect(hasRole(null as any, UserRole.ADMIN)).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should return true for ADMIN role', () => {
      expect(isAdmin(UserRole.ADMIN)).toBe(true);
    });

    it('should return true for SUPER_ADMIN role', () => {
      expect(isSuperAdmin(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return false for EDITOR role', () => {
      expect(isAdmin(UserRole.EDITOR)).toBe(false);
    });

    it('should return false for AUTHOR role', () => {
      expect(isAdmin(UserRole.AUTHOR)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isAdmin(undefined as any)).toBe(false);
    });
  });

  describe('isSuperAdmin', () => {
    it('should return true only for SUPER_ADMIN', () => {
      expect(isSuperAdmin(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return false for ADMIN', () => {
      expect(isSuperAdmin(UserRole.ADMIN)).toBe(false);
    });

    it('should return false for other roles', () => {
      expect(isSuperAdmin(UserRole.EDITOR)).toBe(false);
      expect(isSuperAdmin(UserRole.AUTHOR)).toBe(false);
    });
  });

  describe('canEdit', () => {
    it('should return true for ADMIN and SUPER_ADMIN', () => {
      expect(canEdit(UserRole.ADMIN)).toBe(true);
      expect(canEdit(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return true for EDITOR', () => {
      expect(canEdit(UserRole.EDITOR)).toBe(true);
    });

    it('should return false for AUTHOR', () => {
      expect(canEdit(UserRole.AUTHOR)).toBe(false);
    });

    it('should handle undefined role', () => {
      return expect(canEdit(undefined)).toBe(false);
    });
  });

  describe('canCreate', () => {
    it('should return true for ADMIN and SUPER_ADMIN', () => {
      expect(canCreate(UserRole.ADMIN)).toBe(true);
      expect(canCreate(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return true for AUTHOR', () => {
      expect(canCreate(UserRole.AUTHOR)).toBe(true);
    });

    it('should return true for EDITOR', () => {
      expect(canCreate(UserRole.EDITOR)).toBe(true);
    });
  });

  describe('canDelete', () => {
    it('should return true only for ADMIN and SUPER_ADMIN', () => {
      expect(canDelete(UserRole.ADMIN)).toBe(true);
      expect(canDelete(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return false for EDITOR and AUTHOR', () => {
      expect(canDelete(UserRole.EDITOR)).toBe(false);
      expect(canDelete(UserRole.AUTHOR)).toBe(false);
    });

    it('should handle undefined role', () => {
      expect(canDelete(undefined)).toBe(false);
    });
  });

  describe('canManageTrash', () => {
    it('should return true only for SUPER_ADMIN', () => {
      expect(canManageTrash(UserRole.SUPER_ADMIN)).toBe(true);
    });

    it('should return false for ADMIN', () => {
      expect(canManageTrash(UserRole.ADMIN)).toBe(false);
    });

    it('should return false for other roles', () => {
      expect(canManageTrash(UserRole.EDITOR)).toBe(false);
      expect(canManageTrash(UserRole.AUTHOR)).toBe(false);
    });
  });
});
