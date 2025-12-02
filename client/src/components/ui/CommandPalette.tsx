'use client';

import { Command } from 'cmdk';
import {
  Award,
  Briefcase,
  FileText,
  FileUser,
  FolderKanban,
  HelpCircle,
  Home,
  Info,
  LogOut,
  MessageSquare,
  Search,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => navigate('/dashboard')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/projects')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <FolderKanban className="h-4 w-4" />
                <span>Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/blogs')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <FileText className="h-4 w-4" />
                <span>Blogs</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

            <Command.Group
              heading="Content"
              className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => navigate('/dashboard/about')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/services')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <Briefcase className="h-4 w-4" />
                <span>Services</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/skills')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <Award className="h-4 w-4" />
                <span>Skills</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/resume')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <FileUser className="h-4 w-4" />
                <span>Resume</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/testimonials')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Testimonials</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/dashboard/faq')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

            <Command.Group
              heading="System"
              className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => navigate('/dashboard/trash')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              >
                <Trash2 className="h-4 w-4" />
                <span>Trash</span>
              </Command.Item>
              <Command.Item
                onSelect={handleLogout}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 aria-selected:bg-red-100 dark:aria-selected:bg-red-900/20 text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
