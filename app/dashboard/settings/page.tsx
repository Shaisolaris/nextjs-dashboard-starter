import type { Metadata } from 'next';
import { User, Bell, Shield, Globe, Trash2 } from 'lucide-react';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your workspace and account preferences.</p>
      </div>

      {/* Profile */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Profile</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">
              SA
            </div>
            <div>
              <button className="btn-secondary text-sm">Change Photo</button>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG or GIF up to 2MB</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" className="input" defaultValue="Shai" />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input type="text" className="input" defaultValue="Ali" />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" defaultValue="shai@solarisenterprise.com" />
          </div>
          <div>
            <label className="label">Timezone</label>
            <select className="input">
              <option>America/Los_Angeles (UTC-7)</option>
              <option>America/New_York (UTC-4)</option>
              <option>Europe/London (UTC+1)</option>
              <option>Asia/Karachi (UTC+5)</option>
            </select>
          </div>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      {/* Workspace */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Workspace</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Workspace Name</label>
            <input type="text" className="input" defaultValue="Solaris Technologies" />
          </div>
          <div>
            <label className="label">Workspace URL</label>
            <div className="flex">
              <span className="input rounded-r-none border-r-0 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-3 py-2 text-sm flex items-center">
                app.saas.com/
              </span>
              <input type="text" className="input rounded-l-none flex-1" defaultValue="solaris" />
            </div>
          </div>
          <button className="btn-primary">Update Workspace</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: 'New team member joins', description: 'Get notified when someone accepts your invite' },
            { label: 'Project updates',       description: 'Status changes and milestone completions' },
            { label: 'Billing alerts',        description: 'Invoice generated, payment failed, trial ending' },
            { label: 'Security alerts',       description: 'New sign-in from unrecognized device' },
          ].map(({ label, description }) => (
            <div key={label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-500 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn-primary">Update Password</button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-200 dark:border-red-900/50">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-4 h-4 text-red-500" />
          <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Delete workspace</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Permanently delete this workspace and all its data. This cannot be undone.</p>
          </div>
          <button className="btn-danger text-sm px-4 py-2 flex-shrink-0 ml-4">Delete</button>
        </div>
      </div>
    </div>
  );
}
