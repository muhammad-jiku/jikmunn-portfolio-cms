'use client';

import { cn } from '@/lib/utils';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code,
  FileText,
  FileUser,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Trash2,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { icon: FileText, label: 'Blogs', href: '/dashboard/blogs' },
  { icon: User, label: 'About', href: '/dashboard/about' },
  { icon: Briefcase, label: 'Services', href: '/dashboard/services' },
  { icon: Code, label: 'Skills', href: '/dashboard/skills' },
  { icon: FileUser, label: 'Resume', href: '/dashboard/resume' },
  { icon: MessageSquare, label: 'Testimonials', href: '/dashboard/testimonials' },
  { icon: HelpCircle, label: 'FAQ', href: '/dashboard/faq' },
  { icon: Trash2, label: 'Trash', href: '/dashboard/trash' },
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileToggle: () => void;
}

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggle,
  onMobileToggle,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300',
          // Mobile: drawer from left
          'lg:z-40',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible with collapse
          'lg:translate-x-0',
          isCollapsed ? 'lg:w-16' : 'lg:w-64',
          // Mobile width
          'w-64'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-3 sm:px-4 border-b border-zinc-200 dark:border-zinc-800">
          {(!isCollapsed || isMobileOpen) && (
            <h1 className="text-base sm:text-lg md:text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent truncate">
              Portfolio CMS
            </h1>
          )}
          {/* Desktop toggle */}
          <button
            onClick={onToggle}
            className="hidden lg:block p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          {/* Mobile close */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // Close mobile sidebar on navigation
                  if (isMobileOpen) {
                    onMobileToggle();
                  }
                }}
                className={cn(
                  'flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base',
                  isActive
                    ? 'bg-purple-50 text-primary dark:bg-purple-950/30 dark:text-purple-400 shadow-sm'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-purple-400'
                )}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
