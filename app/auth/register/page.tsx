import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = { title: 'Create Account' };

const features = [
  '14-day free trial, no credit card required',
  'Up to 5 projects on the free plan',
  'Invite up to 3 team members',
  'Full API access from day one',
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-600 dark:bg-brand-800 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg">SaaS Platform</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            Build faster.<br />Ship sooner.<br />Scale confidently.
          </h2>
          <p className="text-brand-100 mb-8 leading-relaxed">
            Everything your team needs to manage projects, track progress, and collaborate effectively — in one place.
          </p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-brand-100">
                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-brand-200 text-sm">
          Trusted by 50,000+ teams worldwide
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100">SaaS Platform</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create your account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start your 14-day free trial today</p>
          </div>

          <div className="card p-8">
            <form className="space-y-4" action="/dashboard">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="first_name" className="label">First Name</label>
                  <input id="first_name" type="text" className="input" placeholder="Shai" autoComplete="given-name" required />
                </div>
                <div>
                  <label htmlFor="last_name" className="label">Last Name</label>
                  <input id="last_name" type="text" className="input" placeholder="Ali" autoComplete="family-name" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="label">Work Email</label>
                <input id="email" type="email" className="input" placeholder="you@company.com" autoComplete="email" required />
              </div>
              <div>
                <label htmlFor="workspace" className="label">Workspace Name</label>
                <input id="workspace" type="text" className="input" placeholder="Your Company" required />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This becomes your workspace URL</p>
              </div>
              <div>
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" className="input" placeholder="Min. 8 characters" autoComplete="new-password" required />
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-brand-600 dark:text-brand-400 hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</Link>.
              </p>

              <Link href="/dashboard" className="btn-primary w-full py-2.5">
                Create Free Account
              </Link>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
