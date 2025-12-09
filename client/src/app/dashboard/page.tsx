'use client';

import { BlogsChart, ProjectsChart } from '@/components/dashboard/Charts';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { useAppSelector } from '@/store/hooks';
import { Briefcase, Code, FileText, FolderKanban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1.5 sm:mb-2">
          Welcome back, {user.name || user.email}!
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          Here&apos;s what&apos;s happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Projects"
          value={24}
          icon={FolderKanban}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Blog Posts"
          value={48}
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Services"
          value={12}
          icon={Briefcase}
          trend={{ value: 4, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Skills"
          value={32}
          icon={Code}
          trend={{ value: 6, isPositive: true }}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <ProjectsChart />
        <BlogsChart />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4">
          Recent Activity
        </h3>
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {[
            {
              action: 'Created new project',
              item: 'E-commerce Platform',
              time: '2 hours ago',
              icon: FolderKanban,
            },
            {
              action: 'Published blog post',
              item: 'React Best Practices',
              time: '5 hours ago',
              icon: FileText,
            },
            {
              action: 'Updated service',
              item: 'Web Development',
              time: '1 day ago',
              icon: Briefcase,
            },
            { action: 'Added new skill', item: 'TypeScript', time: '2 days ago', icon: Code },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-2.5 md:p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer group"
              >
                <div className="p-1.5 sm:p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg group-hover:shadow-md transition-shadow shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                    {activity.item}
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap shrink-0">
                  {activity.time}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
