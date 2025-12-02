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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Statistics</h2>
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {about && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date(about.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
