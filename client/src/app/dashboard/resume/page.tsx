/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AchievementForm from '@/components/resume/AchievementForm';
import EducationForm from '@/components/resume/EducationForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import ReferenceForm from '@/components/resume/ReferenceForm';
import ResumeSummaryForm from '@/components/resume/ResumeSummaryForm';
import {
  achievementsApi,
  educationApi,
  professionalExperienceApi,
  referencesApi,
} from '@/lib/api/resume';
import { Achievement, Education, ProfessionalExperience, Reference } from '@/types/resume';
import { Award, Briefcase, Edit, GraduationCap, Plus, Trash2, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type SectionType = 'education' | 'experience' | 'achievement' | 'reference';

export default function ResumePage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<ProfessionalExperience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);

  const [showForm, setShowForm] = useState<SectionType | null>(null);
  const [editingItem, setEditingItem] = useState<any>(undefined);

  const fetchAll = useCallback(async () => {
    try {
      const [edu, exp, ach, ref] = await Promise.all([
        educationApi.getAll(),
        professionalExperienceApi.getAll(),
        achievementsApi.getAll(),
        referencesApi.getAll(),
      ]);
      setEducation(edu);
      setExperiences(exp);
      setAchievements(ach);
      setReferences(ref);
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, [fetchAll]);

  const handleCreate = (section: SectionType) => {
    setEditingItem(undefined);
    setShowForm(section);
  };

  const handleEdit = (section: SectionType, item: any) => {
    setEditingItem(item);
    setShowForm(section);
  };

  const handleSubmit = async (section: SectionType, data: any) => {
    try {
      if (section === 'education') {
        if (editingItem) {
          await educationApi.update(editingItem.id, data);
        } else {
          await educationApi.create(data);
        }
      } else if (section === 'experience') {
        if (editingItem) {
          await professionalExperienceApi.update(editingItem.id, data);
        } else {
          await professionalExperienceApi.create(data);
        }
      } else if (section === 'achievement') {
        if (editingItem) {
          await achievementsApi.update(editingItem.id, data);
        } else {
          await achievementsApi.create(data);
        }
      } else if (section === 'reference') {
        if (editingItem) {
          await referencesApi.update(editingItem.id, data);
        } else {
          await referencesApi.create(data);
        }
      }
      await fetchAll();
      setShowForm(null);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleDelete = async (section: SectionType, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (section === 'education') await educationApi.delete(id);
      else if (section === 'experience') await professionalExperienceApi.delete(id);
      else if (section === 'achievement') await achievementsApi.delete(id);
      else if (section === 'reference') await referencesApi.delete(id);

      await fetchAll();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your professional resume information
          </p>
        </div>

        {/* Summary Section */}
        <ResumeSummaryForm />

        {/* Education Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <button
              onClick={() => handleCreate('education')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
          {education.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No education entries yet
            </p>
          ) : (
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.university}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{edu.years}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit('education', edu)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('education', edu.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Professional Experience
              </h2>
            </div>
            <button
              onClick={() => handleCreate('experience')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>
          {experiences.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No experience entries yet
            </p>
          ) : (
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{exp.jobTitle}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.companyName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{exp.years}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {exp.achievements.slice(0, 2).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit('experience', exp)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('experience', exp.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            </div>
            <button
              onClick={() => handleCreate('achievement')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </button>
          </div>
          {achievements.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No achievements yet</p>
          ) : (
            <div className="space-y-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{ach.role}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{ach.years}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {ach.description.slice(0, 2).map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit('achievement', ach)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('achievement', ach.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* References Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">References</h2>
            </div>
            <button
              onClick={() => handleCreate('reference')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Reference
            </button>
          </div>
          {references.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No references yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {references.map((ref) => (
                <div
                  key={ref.id}
                  className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{ref.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ref.jobTitle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{ref.companyName}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit('reference', ref)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('reference', ref.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        {showForm === 'education' && (
          <EducationForm
            education={editingItem}
            onSubmit={(data) => handleSubmit('education', data)}
            onClose={() => setShowForm(null)}
          />
        )}
        {showForm === 'experience' && (
          <ExperienceForm
            experience={editingItem}
            onSubmit={(data) => handleSubmit('experience', data)}
            onClose={() => setShowForm(null)}
          />
        )}
        {showForm === 'achievement' && (
          <AchievementForm
            achievement={editingItem}
            onSubmit={(data) => handleSubmit('achievement', data)}
            onClose={() => setShowForm(null)}
          />
        )}
        {showForm === 'reference' && (
          <ReferenceForm
            reference={editingItem}
            onSubmit={(data) => handleSubmit('reference', data)}
            onClose={() => setShowForm(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
