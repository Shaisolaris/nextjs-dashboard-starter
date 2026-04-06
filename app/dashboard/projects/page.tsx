import type { Metadata } from 'next';
import Link from 'next/link';
import { FolderKanban, Plus, Search, Filter, MoreVertical, CheckCircle2, Archive } from 'lucide-react';
import { formatRelativeDate } from '@/lib/utils';
import type { Project } from '@/types';

export const metadata: Metadata = { title: 'Projects' };

async function getProjects(): Promise<Project[]> {
  return [
    { id: '1', name: 'E-Commerce Platform',   description: 'Shopify custom theme with headless checkout integration and performance optimization', status: 'active',   createdAt: new Date(Date.now() - 2  * 86400000).toISOString(), updatedAt: new Date().toISOString(), metadata: { budget: 8500, client: 'Retail Co' } },
    { id: '2', name: 'SaaS Dashboard',        description: 'Next.js 14 multi-tenant dashboard with Stripe billing and real-time analytics',     status: 'active',   createdAt: new Date(Date.now() - 5  * 86400000).toISOString(), updatedAt: new Date(Date.now() - 86400000).toISOString(), metadata: { budget: 12000, client: 'TechStart Inc' } },
    { id: '3', name: 'Mobile App MVP',        description: 'React Native fintech application with biometric auth and portfolio tracking',        status: 'active',   createdAt: new Date(Date.now() - 12 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 3  * 86400000).toISOString(), metadata: { budget: 15000, client: 'FinCo' } },
    { id: '4', name: 'API Gateway Service',   description: 'Laravel multi-tenant REST API with JWT auth and role-based access control',         status: 'archived', createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 7  * 86400000).toISOString(), metadata: { budget: 6000,  client: 'DataCorp' } },
    { id: '5', name: 'AI Automation Suite',   description: 'OpenAI-powered document processing pipeline replacing manual data entry workflows',  status: 'active',   createdAt: new Date(Date.now() - 45 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 1  * 86400000).toISOString(), metadata: { budget: 9500,  client: 'InsureTech' } },
    { id: '6', name: 'Inventory Management',  description: 'WooCommerce advanced inventory plugin with bulk operations and REST API extensions', status: 'archived', createdAt: new Date(Date.now() - 60 * 86400000).toISOString(), updatedAt: new Date(Date.now() - 14 * 86400000).toISOString(), metadata: { budget: 4500,  client: 'Retail Plus' } },
  ];
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const active   = projects.filter((p) => p.status === 'active').length;
  const archived = projects.filter((p) => p.status === 'archived').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">{active} active · {archived} archived</p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="search" placeholder="Search projects..." className="input pl-9 py-2" />
        </div>
        <button className="btn-secondary gap-2 self-start">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project: any) => (
          <div key={project.id} className="card p-5 hover:shadow-md transition-shadow duration-200 group">
            {/* Card header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {project.name}
                  </h3>
                  {project.metadata?.client && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {project.metadata.client as string}
                    </p>
                  )}
                </div>
              </div>
              <button className="btn-ghost p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                {project.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1.5">
                {project.status === 'active'
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  : <Archive className="w-3.5 h-3.5 text-gray-400" />
                }
                <span className="text-xs font-medium capitalize text-gray-500 dark:text-gray-400">
                  {project.status}
                </span>
              </div>
              {project.metadata?.budget && (
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  ${(project.metadata.budget as number).toLocaleString()}
                </span>
              )}
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {formatRelativeDate(project.updatedAt)}
              </span>
            </div>
          </div>
        ))}

        {/* New project card */}
        <button className="card p-5 border-dashed border-2 border-gray-200 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[180px] group">
          <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 group-hover:border-brand-400 dark:group-hover:border-brand-500 flex items-center justify-center transition-colors">
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" />
          </div>
          <span className="text-sm font-medium text-gray-400 group-hover:text-brand-500 transition-colors">
            New Project
          </span>
        </button>
      </div>
    </div>
  );
}
