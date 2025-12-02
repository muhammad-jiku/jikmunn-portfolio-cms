'use client';

import { SocketNotification } from '@/lib/socket';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FadeIn } from '../ui/Animations';

interface NotificationBellProps {
  notifications: SocketNotification[];
  onClear: () => void;
}

export default function NotificationBell({ notifications, onClear }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getEventColor = (event: string): string => {
    if (event.includes('created')) return 'text-green-600 dark:text-green-400';
    if (event.includes('updated')) return 'text-blue-600 dark:text-blue-400';
    if (event.includes('deleted')) return 'text-red-600 dark:text-red-400';
    if (event.includes('restored')) return 'text-purple-600 dark:text-purple-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getEventIcon = (event: string): string => {
    if (event.includes('created')) return '🆕';
    if (event.includes('updated')) return '✏️';
    if (event.includes('deleted')) return '🗑️';
    if (event.includes('restored')) return '♻️';
    if (event.includes('maintenance')) return '⚙️';
    return '📢';
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative notification-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <FadeIn duration={0.2}>
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Notifications ({unreadCount})
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No new notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">
                          {getEventIcon(notification.event)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${getEventColor(notification.event)}`}>
                            {notification.event.replace(/:/g, ' ')}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
