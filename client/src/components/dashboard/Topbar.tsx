'use client';

import NotificationBell from '@/components/notifications/NotificationBell';
import { useSocket } from '@/components/providers/SocketProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TopbarProps {
  onMobileMenuToggle: () => void;
}

export default function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const { notifications, clearNotifications } = useSocket();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after initial render to avoid hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-30 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 lg:left-16">
      <div className="flex items-center justify-between h-full px-3 sm:px-4 md:px-6">
        {/* Left side - Mobile menu + Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 truncate">
            Dashboard
          </h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 dark:text-zinc-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 dark:text-zinc-400" />
              )}
            </button>
          )}

          {/* Notifications */}
          <NotificationBell notifications={notifications} onClear={clearNotifications} />

          {/* User Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              {user && (
                <div className="hidden md:block">
                  <p className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate max-w-[120px] lg:max-w-[150px]">
                    {user.name || user.email}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase">
                    {user.role}
                  </p>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
