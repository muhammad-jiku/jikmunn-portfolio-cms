'use client';

import AboutForm from '@/components/about/AboutForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">About Management</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your portfolio statistics and achievements
          </p>
        </div>

        <AboutForm />
      </div>
    </DashboardLayout>
  );
}
