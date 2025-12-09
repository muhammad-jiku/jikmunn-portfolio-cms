'use client';

import { hasRole } from '@/lib/permissions';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (requiredRole && user && !hasRole(user.role, requiredRole)) {
      router.push('/dashboard'); // Redirect to dashboard if insufficient permissions
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated || (requiredRole && user && !hasRole(user.role, requiredRole))) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Checking authentication...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
