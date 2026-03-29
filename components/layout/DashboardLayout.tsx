'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/dashboard',          label: 'Overview',  icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects',  icon: FolderKanban },
  { href: '/dashboard/team',     label: 'Team',      icon: Users },
  { href: '/dashboard/billing',  label: 'Billing',   icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings',  icon: Settings },
];

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">Solaris</span>
          </Link>
          <button onClick={onClose} className="lg:hidden btn-ghost p-1.5 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'sidebar-link',
                pathname === href && 'active'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Shai Solaris</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">owner</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
          <Link href="/auth/login" className="sidebar-link mt-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-4 h-4" />
            Sign out
          </Link>
        </div>
      </aside>
    </>
  );
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 h-16 flex items-center gap-4 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onMenuClick}
        className="btn-ghost p-2 rounded-md lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="input pl-9 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="btn-ghost p-2 rounded-lg"
          aria-label="Toggle theme"
        >
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Notifications */}
        <button className="btn-ghost p-2 rounded-lg relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600" />
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
