'use client';

import { useEffect, useState } from 'react';

interface EditingIndicatorProps {
  entityType: string; // 'project', 'blog', 'service', etc.
  entityId: string;
  currentUserId: string;
}

interface EditorInfo {
  userId: string;
  username: string;
  timestamp: number;
}

export default function EditingIndicator({
  entityType,
  entityId,
  currentUserId,
}: EditingIndicatorProps) {
  const [editors] = useState<EditorInfo[]>([]);

  useEffect(() => {
    // In a real implementation, this would:
    // 1. Emit 'editing:started' event when user starts editing
    // 2. Listen for 'editing:active' events from other users
    // 3. Emit 'editing:stopped' event when user leaves or stops editing
    // 4. Automatically clear stale editors after timeout

    // For now, this is a placeholder for the UI component
    // The actual Socket.IO implementation would be added when needed

    return () => {
      // Cleanup: notify that user stopped editing
    };
  }, [entityType, entityId, currentUserId]);

  const otherEditors = editors.filter((e) => e.userId !== currentUserId);

  if (otherEditors.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex -space-x-2">
        {otherEditors.slice(0, 3).map((editor) => (
          <div
            key={editor.userId}
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800"
            title={editor.username}
          >
            {editor.username.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
          {otherEditors.length === 1
            ? `${otherEditors[0].username} is editing`
            : `${otherEditors.length} users are editing`}
        </span>
        <span className="text-xs text-blue-600 dark:text-blue-400">Your changes may conflict</span>
      </div>
    </div>
  );
}
