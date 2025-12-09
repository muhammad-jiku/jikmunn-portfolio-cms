'use client';

import { Service } from '@/types/service';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ServicesTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export default function ServicesTable({ services, onEdit, onDelete }: ServicesTableProps) {
  if (services.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          No services found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-950">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Subtitle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.iconUrl.startsWith('http') ? (
                      <Image src={service.iconUrl} alt={service.title} className="w-6 h-6" />
                    ) : (
                      <span className="text-white text-xl">{service.iconUrl}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {service.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {service.subtitle || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-zinc-300 dark:border-zinc-600"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {service.color}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-md">
                    {service.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(service)}
                      className="text-primary hover:text-primary-hover dark:text-pink-400 dark:hover:text-pink-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(service.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
