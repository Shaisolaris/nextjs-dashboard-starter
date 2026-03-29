import type { Metadata } from 'next';
import { CreditCard, Download, CheckCircle2, Zap, Building2, Rocket } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export const metadata: Metadata = { title: 'Billing' };

const plans = [
  {
    name: 'Starter',
    price: 29,
    icon: Zap,
    features: ['5 projects', '3 team members', '10GB storage', 'API access', 'Email support'],
    current: false,
  },
  {
    name: 'Pro',
    price: 79,
    icon: Rocket,
    features: ['Unlimited projects', '15 team members', '100GB storage', 'API access', 'Priority support', 'Advanced analytics', 'Custom domains'],
    current: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    icon: Building2,
    features: ['Unlimited everything', 'Unlimited team members', '1TB storage', 'API access', 'Dedicated support', 'SLA guarantee', 'SSO / SAML', 'Custom contracts'],
    current: false,
  },
];

const invoices = [
  { id: 'INV-2024-012', date: '2024-12-01', amount: 79, status: 'paid' },
  { id: 'INV-2024-011', date: '2024-11-01', amount: 79, status: 'paid' },
  { id: 'INV-2024-010', date: '2024-10-01', amount: 79, status: 'paid' },
  { id: 'INV-2024-009', date: '2024-09-01', amount: 49, status: 'paid' },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Billing</h1>
        <p className="page-subtitle">Manage your plan, payment method, and invoice history.</p>
      </div>

      {/* Current plan summary */}
      <div className="card p-6 border-brand-200 dark:border-brand-800 bg-brand-50/30 dark:bg-brand-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">Current Plan</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Pro · {formatCurrency(79)}/month</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Next billing date: <span className="font-medium text-gray-700 dark:text-gray-300">January 1, 2025</span></p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="btn-secondary text-sm">Manage Payment</button>
            <button className="btn-danger text-sm">Cancel Plan</button>
          </div>
        </div>
      </div>

      {/* Plan selection */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Change Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(({ name, price, icon: Icon, features, current }) => (
            <div
              key={name}
              className={`card p-6 relative ${current ? 'ring-2 ring-brand-500 dark:ring-brand-400' : ''}`}
            >
              {current && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 badge bg-brand-600 text-white text-xs px-3 py-0.5">
                  Current Plan
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{name}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatCurrency(price)}
                <span className="text-sm font-normal text-gray-400">/mo</span>
              </p>
              <ul className="mt-4 space-y-2.5 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full text-sm py-2 rounded-lg font-medium transition-colors ${
                  current
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-default'
                    : 'btn-primary'
                }`}
                disabled={current}
              >
                {current ? 'Current Plan' : `Upgrade to ${name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Payment Method</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gray-900 dark:bg-gray-100 rounded flex items-center justify-center">
              <span className="text-white dark:text-gray-900 text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Visa ending in 4242</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Expires 12/2026</p>
            </div>
          </div>
          <button className="btn-secondary text-sm">Update Card</button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Invoice History</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{inv.id}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(inv.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="badge bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                  Paid
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatCurrency(inv.amount)}
                </span>
                <button className="btn-ghost p-1.5 rounded-md" aria-label="Download invoice">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
