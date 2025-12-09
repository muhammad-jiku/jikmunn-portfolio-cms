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
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-200 dark:border-zinc-800">
        {!isCollapsed && (
          <h1 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio CMS
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-purple-50 text-primary dark:bg-purple-950/30 dark:text-purple-400 shadow-sm'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-purple-400'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
