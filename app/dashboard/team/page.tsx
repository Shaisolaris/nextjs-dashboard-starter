import type { Metadata } from 'next';
import { UserPlus, MoreVertical, Mail, Shield } from 'lucide-react';
import { cn, generateInitials, getRoleColor, formatRelativeDate } from '@/lib/utils';
import type { User } from '@/types';

export const metadata: Metadata = { title: 'Team' };

async function getTeamMembers(): Promise<User[]> {
  return [
    { id: '1', name: 'Shai Ali',    email: 'shai@solarisenterprise.com', role: 'owner',  createdAt: new Date(Date.now() - 365 * 86400000).toISOString() },
    { id: '2', name: 'Sarah Kim',   email: 'sarah@example.com',          role: 'admin',  createdAt: new Date(Date.now() - 90  * 86400000).toISOString() },
    { id: '3', name: 'James Tan',   email: 'james@example.com',          role: 'member', createdAt: new Date(Date.now() - 60  * 86400000).toISOString() },
    { id: '4', name: 'Priya Mehta', email: 'priya@example.com',          role: 'member', createdAt: new Date(Date.now() - 45  * 86400000).toISOString() },
    { id: '5', name: 'Carlos Lima', email: 'carlos@example.com',         role: 'viewer', createdAt: new Date(Date.now() - 14  * 86400000).toISOString() },
  ];
}

const roleLabels: Record<string, string> = {
  owner: 'Owner', admin: 'Admin', member: 'Member', viewer: 'Viewer',
};

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Team</h1>
          <p className="page-subtitle">{members.length} members</p>
        </div>
        <button className="btn-primary">
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {/* Role summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['owner', 'admin', 'member', 'viewer'] as const).map((role) => {
          const count = members.filter((m) => m.role === role).length;
          return (
            <div key={role} className="card p-4 text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">{role}{count !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </div>

      {/* Members table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">All Members</h2>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {member.image
                  ? <img src={member.image} alt={member.name} className="w-9 h-9 rounded-full object-cover" />
                  : generateInitials(member.name)
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3" />{member.email}
                </p>
              </div>

              {/* Role badge */}
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span className={cn('badge text-xs', getRoleColor(member.role))}>
                  {roleLabels[member.role]}
                </span>
              </div>

              {/* Joined */}
              <p className="hidden md:block text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 w-28 text-right">
                Joined {formatRelativeDate(member.createdAt)}
              </p>

              {/* Actions */}
              <button className="btn-ghost p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pending invites */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pending Invites</h2>
          <span className="badge bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">1 pending</span>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">alex@example.com</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Invited as <span className="font-medium">Member</span> · 2 days ago</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs px-3 py-1.5">Resend</button>
              <button className="btn-ghost text-xs px-3 py-1.5 text-red-500 hover:text-red-600">Revoke</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
