'use client';

import { aboutApi } from '@/lib/api/about';
import { About, UpdateAboutData } from '@/types/about';
import { Award, Briefcase, Clock, RotateCcw, Save, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutForm() {
  const [about, setAbout] = useState<About | null>(null);
  const [formData, setFormData] = useState<UpdateAboutData>({
    numberOfClients: 0,
    numberOfProjects: 0,
    hoursOfSupport: 0,
    yearsOfExperience: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const data = await aboutApi.getAbout();
      setAbout(data);
      setFormData({
        numberOfClients: data.numberOfClients,
        numberOfProjects: data.numberOfProjects,
        hoursOfSupport: data.hoursOfSupport,
        yearsOfExperience: data.yearsOfExperience,
      });
    } catch (error) {
      console.error('Failed to fetch about:', error);
      setMessage({ type: 'error', text: 'Failed to load statistics' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const updated = await aboutApi.updateAbout(formData);
      setAbout(updated);
      setMessage({ type: 'success', text: 'Statistics updated successfully!' });
    } catch (error) {
      console.error('Failed to update:', error);
      setMessage({ type: 'error', text: 'Failed to update statistics' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all statistics to 0?')) return;

    setLoading(true);
    setMessage(null);

    try {
      const reset = await aboutApi.resetAbout();
      setAbout(reset);
      setFormData({
        numberOfClients: reset.numberOfClients,
        numberOfProjects: reset.numberOfProjects,
        hoursOfSupport: reset.hoursOfSupport,
        yearsOfExperience: reset.yearsOfExperience,
      });
      setMessage({ type: 'success', text: 'Statistics reset successfully!' });
    } catch (error) {
      console.error('Failed to reset:', error);
      setMessage({ type: 'error', text: 'Failed to reset statistics' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          About Statistics
        </h2>
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 whitespace-nowrap self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 sm:p-4 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Users className="w-4 h-4" />
              Number of Clients
            </label>
            <input
              type="number"
              min="0"
              value={formData.numberOfClients}
              onChange={(e) =>
                setFormData({ ...formData, numberOfClients: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Briefcase className="w-4 h-4" />
              Number of Projects
            </label>
            <input
              type="number"
              min="0"
              value={formData.numberOfProjects}
              onChange={(e) =>
                setFormData({ ...formData, numberOfProjects: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Clock className="w-4 h-4" />
              Hours of Support
            </label>
            <input
              type="number"
              min="0"
              value={formData.hoursOfSupport}
              onChange={(e) =>
                setFormData({ ...formData, hoursOfSupport: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Award className="w-4 h-4" />
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-900 dark:text-zinc-50"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {about && (
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Last updated: {new Date(about.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
