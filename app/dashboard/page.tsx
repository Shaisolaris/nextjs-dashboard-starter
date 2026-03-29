import type { Metadata } from 'next';
import { StatCard, StatGrid } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { formatCurrency, formatRelativeDate } from '@/lib/utils';
import {
  DollarSign,
  Users,
  FolderKanban,
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import type { DashboardStats, Project } from '@/types';

export const metadata: Metadata = { title: 'Dashboard Overview' };

// In production these would be fetched from your API with proper auth
async function getDashboardData(): Promise<DashboardStats> {
  const activityData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().slice(0, 10),
      events:  Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 8000) + 2000,
    };
  });

  return {
    totalProjects:       24,
    activeProjects:      18,
    teamMembers:         7,
    storageUsedGb:       12.4,
    revenueThisMonth:    42850,
    revenueLastMonth:    38200,
    newUsersThisMonth:   14,
    activityData,
  };
}

async function getRecentProjects(): Promise<Project[]> {
  return [
    { id: '1', name: 'E-Commerce Platform', description: 'Shopify custom theme + headless checkout', status: 'active', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', name: 'SaaS Dashboard',       description: 'Next.js 14 multi-tenant dashboard',       status: 'active', createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', name: 'Mobile App MVP',        description: 'React Native fintech application',         status: 'active', createdAt: new Date(Date.now() - 12 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: '4', name: 'API Gateway',           description: 'Laravel multi-tenant REST API',            status: 'archived', createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 7 * 86400000).toISOString() },
  ];
}

const statusIcon = {
  active:   <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />,
  archived: <Clock className="w-3.5 h-3.5 text-gray-400" />,
  error:    <AlertCircle className="w-3.5 h-3.5 text-red-500" />,
};

const activityFeed = [
  { id: 1, user: 'Sarah K.',  action: 'created project',  target: 'E-Commerce Platform', time: '2 hours ago',  avatar: 'SK' },
  { id: 2, user: 'James T.',  action: 'invited',          target: 'mike@example.com',    time: '4 hours ago',  avatar: 'JT' },
  { id: 3, user: 'You',       action: 'deployed',         target: 'SaaS Dashboard v2.1', time: '1 day ago',    avatar: 'SA' },
  { id: 4, user: 'Priya M.',  action: 'closed milestone', target: 'Mobile App MVP',      time: '2 days ago',   avatar: 'PM' },
  { id: 5, user: 'You',       action: 'updated billing',  target: 'Pro Plan',            time: '3 days ago',   avatar: 'SA' },
];

export default async function DashboardPage() {
  const [stats, projects] = await Promise.all([
    getDashboardData(),
    getRecentProjects(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
        <p className="page-subtitle">Welcome back — here&apos;s what&apos;s happening with your workspace.</p>
      </div>

      {/* Stats */}
      <StatGrid cols={4}>
        <StatCard
          title="Monthly Revenue"
          value={stats.revenueThisMonth}
          previousValue={stats.revenueLastMonth}
          format="currency"
          icon={DollarSign}
          iconColor="text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          previousValue={16}
          format="number"
          icon={FolderKanban}
        />
        <StatCard
          title="Team Members"
          value={stats.teamMembers}
          previousValue={6}
          format="number"
          icon={Users}
          iconColor="text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/30"
        />
        <StatCard
          title="New Users"
          value={stats.newUsersThisMonth}
          previousValue={10}
          format="number"
          icon={Activity}
          iconColor="text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30"
        />
      </StatGrid>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Revenue & Activity</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Last 30 days</p>
            </div>
          </div>
          <RevenueChart data={stats.activityData} />
        </div>

        {/* Activity feed */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-700 dark:text-brand-300 text-xs font-bold flex-shrink-0">
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                    <span className="font-medium">{item.user}</span>
                    {' '}{item.action}{' '}
                    <span className="font-medium text-brand-600 dark:text-brand-400">{item.target}</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Projects</h2>
          <Link href="/dashboard/projects" className="flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                <FolderKanban className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{project.name}</p>
                {project.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{project.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {statusIcon[project.status as keyof typeof statusIcon]}
                <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
                  {formatRelativeDate(project.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
