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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <div
        className={cn('transition-all duration-300', 'lg:ml-16', !isSidebarCollapsed && 'lg:ml-64')}
      >
        <Topbar onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="pt-20 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">{children}</main>
      </div>
    </div>
  );
}
