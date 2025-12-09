'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TrashTable from '@/components/trash/TrashTable';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function TrashPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            Trash
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            Manage deleted items. Items will be automatically deleted after 31 days.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-xs sm:text-sm md:text-base text-yellow-800 dark:text-yellow-200">
                Auto-delete Warning
              </h3>
              <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-yellow-700 dark:text-yellow-300">
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
