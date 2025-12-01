'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={cn('transition-all duration-300', isSidebarCollapsed ? 'ml-16' : 'ml-64')}>
        <Topbar />
        <main className="pt-16 p-6">{children}</main>
      </div>
    </div>
  );
}
