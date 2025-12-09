'use client';

import { trashApi } from '@/lib/api/trash';
import { Trash } from '@/types/trash';
import { RotateCcw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Message {
  type: 'success' | 'error';
  text: string;
}

export default function TrashTable() {
  const [trash, setTrash] = useState<Trash[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<Message | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchTrash = async () => {
    try {
      setLoading(true);
      const data = await trashApi.getAll(page, limit);
      setTrash(data.data);
      setTotal(data.meta.total);
    } catch {
      setMessage({ type: 'error', text: 'Failed to fetch trash items' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleRestore = async (id: string, entityType: string) => {
    if (!confirm(`Are you sure you want to restore this ${entityType}?`)) return;

    try {
      await trashApi.restore(id);
      setMessage({ type: 'success', text: `${entityType} restored successfully!` });
      fetchTrash();
    } catch {
      setMessage({ type: 'error', text: 'Failed to restore item' });
    }
  };

  const handlePermanentDelete = async (id: string, entityType: string) => {
    if (!confirm(`⚠️ PERMANENT DELETE: This ${entityType} will be deleted forever. Continue?`))
      return;

    try {
      await trashApi.permanentlyDelete(id);
      setMessage({ type: 'success', text: `${entityType} permanently deleted!` });
      fetchTrash();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete item' });
    }
  };

  const handleCleanup = async () => {
    if (!confirm('⚠️ Cleanup all expired items (>31 days)? This cannot be undone!')) return;

    try {
      const result = await trashApi.cleanup();
      setMessage({
        type: 'success',
        text: `Cleaned up ${result.deletedCount} expired items!`,
      });
      fetchTrash();
    } catch {
      setMessage({ type: 'error', text: 'Failed to cleanup trash' });
    }
  };

  const calculateDaysRemaining = (expiresAt: Date) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const totalPages = Math.ceil(total / limit);

  if (loading && trash.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {message && (
        <div
          className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Trash ({total} items)
        </h2>
        <button
          onClick={handleCleanup}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Cleanup Expired
        </button>
      </div>

      {trash.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Trash2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-zinc-400 dark:text-zinc-600" />
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Trash is empty</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-950">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Entity ID
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Deleted At
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Days Remaining
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {trash.map((item) => {
                  const daysRemaining = calculateDaysRemaining(item.expiresAt);
                  const isExpired = daysRemaining <= 0;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-zinc-50 dark:hover:bg-zinc-950 ${isExpired ? 'bg-red-50 dark:bg-red-900/10' : ''}`}
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                          {item.entityType}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-zinc-900 dark:text-zinc-300">
                        {item.entityId.substring(0, 8)}...
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                        {new Date(item.deletedAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        {isExpired ? (
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            Expired
                          </span>
                        ) : (
                          <span
                            className={`${
                              daysRemaining <= 7
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-green-600 dark:text-green-400'
                            }`}
                          >
                            {daysRemaining} days
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleRestore(item.id, item.entityType)}
                            className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={isExpired}
                          >
                            <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="hidden sm:inline">Restore</span>
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item.id, item.entityType)}
                            className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-50 border border-zinc-300 dark:border-zinc-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-50 border border-zinc-300 dark:border-zinc-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
