'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TrashTable from '@/components/trash/TrashTable';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function TrashPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
            <Trash2 className="w-8 h-8" />
            Trash
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage deleted items. Items will be automatically deleted after 31 days.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Auto-delete Warning
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Items in trash will be permanently deleted after 31 days. Restore important items
                before they are automatically removed.
              </p>
            </div>
          </div>
        </div>

        {/* Trash Table */}
        <TrashTable />
      </div>
    </DashboardLayout>
  );
}
