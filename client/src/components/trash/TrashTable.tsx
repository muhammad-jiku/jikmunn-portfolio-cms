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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Trash ({total} items)
        </h2>
        <button
          onClick={handleCleanup}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" />
          Cleanup Expired
        </button>
      </div>

      {trash.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Trash2 className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400">Trash is empty</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Entity ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Deleted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Days Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {trash.map((item) => {
                  const daysRemaining = calculateDaysRemaining(item.expiresAt);
                  const isExpired = daysRemaining <= 0;

                  return (
                    <tr
                      key={item.id}
                      className={`${isExpired ? 'bg-red-50 dark:bg-red-900/10' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {item.entityType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {item.entityId.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(item.deletedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRestore(item.id, item.entityType)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            disabled={isExpired}
                          >
                            <RotateCcw className="w-3 h-3" />
                            Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item.id, item.entityType)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
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
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-700">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 disabled:opacity-50"
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
