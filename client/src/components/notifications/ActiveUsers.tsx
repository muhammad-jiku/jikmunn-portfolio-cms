'use client';

import { useSocket } from '../providers/SocketProvider';

export default function ActiveUsers() {
  const { isConnected } = useSocket();

  if (!isConnected) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <div className="relative flex items-center">
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
      <span className="text-xs font-medium text-green-700 dark:text-green-300">
        Live updates active
      </span>
    </div>
  );
}
