'use client';

import { Skill } from '@/types/skill';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface SkillsTableProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

export default function SkillsTable({ skills, onEdit, onDelete }: SkillsTableProps) {
  if (skills.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          No skills found. Create one to get started!
        </p>
      </div>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-purple-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    {skill.iconUrl.startsWith('http') ? (
                      <Image src={skill.iconUrl} alt={skill.name} className="w-6 h-6" />
                    ) : (
                      <span className="text-2xl">{skill.iconUrl}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {skill.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 max-w-xs">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(skill.progress)}`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-w-12">
                      {skill.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(skill)}
                      className="text-primary hover:text-primary-hover dark:text-pink-400 dark:hover:text-pink-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(skill.id)}
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
