'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SkillForm from '@/components/skills/SkillForm';
import SkillsTable from '@/components/skills/SkillsTable';
import { skillsApi } from '@/lib/api/skills';
import { CreateSkillData, Skill, UpdateSkillData } from '@/types/skill';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await skillsApi.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSkill(undefined);
    setShowForm(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateSkillData | UpdateSkillData) => {
    if (editingSkill) {
      await skillsApi.updateSkill(editingSkill.id, data);
    } else {
      await skillsApi.createSkill(data as CreateSkillData);
    }
    await fetchSkills();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillsApi.deleteSkill(id);
      await fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  const averageProgress =
    skills.length > 0
      ? Math.round(skills.reduce((sum, skill) => sum + skill.progress, 0) / skills.length)
      : 0;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Skills
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Manage your technical skills and expertise
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Add Skill
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-4 md:p-6">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">Total Skills</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5 sm:mt-2">
              {skills.length}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-4 md:p-6">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">Average Progress</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5 sm:mt-2">
              {averageProgress}%
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-4 md:p-6">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Expert Level (80%+)
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1.5 sm:mt-2">
              {skills.filter((s) => s.progress >= 80).length}
            </p>
          </div>
        </div>

        <SkillsTable skills={skills} onEdit={handleEdit} onDelete={handleDelete} />

        {showForm && (
          <SkillForm
            skill={editingSkill}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
