# Next.js SaaS Dashboard

Production-ready SaaS dashboard built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Full dark mode, responsive sidebar, real chart components, and all the pages a real SaaS product needs.

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview — stat cards, revenue/activity area chart, recent activity feed, project list |
| `/dashboard/projects` | Project grid with status badges, budget display, hover quick-actions |
| `/dashboard/team` | Team management — role badges, invite flow, pending invites |
| `/dashboard/billing` | Plan comparison, payment method, invoice history with download |
| `/dashboard/settings` | Profile, workspace, notifications toggles, password, danger zone |
| `/auth/login` | Sign-in with OAuth buttons (Google, GitHub) |
| `/auth/register` | Split-screen register with feature highlights |

## Stack

- **Framework**: Next.js 14 App Router with React Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system (CSS variables, component classes)
- **Charts**: Recharts — area chart and bar chart with custom tooltips
- **Theme**: `next-themes` system/light/dark with toggle
- **Icons**: Lucide React
- **Toasts**: Sonner
- **Forms**: React Hook Form + Zod (wired, ready to connect to API)
- **State**: React Query setup (ready to connect to API)
- **Auth**: NextAuth v5 beta (configured, ready for providers)

## Project Structure

```
app/
├── layout.tsx                    # Root layout — ThemeProvider, Sonner, Inter font
├── page.tsx                      # Root redirect to /dashboard
├── globals.css                   # Design system — Tailwind + component utilities
├── dashboard/
│   ├── layout.tsx                # Dashboard shell (sidebar + topbar)
│   ├── page.tsx                  # Overview with RSC data fetching
│   ├── projects/page.tsx
│   ├── team/page.tsx
│   ├── billing/page.tsx
│   └── settings/page.tsx
└── auth/
    ├── login/page.tsx
    └── register/page.tsx
components/
├── layout/
│   └── DashboardLayout.tsx       # Sidebar, TopBar, mobile drawer, theme toggle
├── dashboard/
│   └── StatCard.tsx              # Stat card with trend indicator, skeleton loading
└── charts/
    └── RevenueChart.tsx          # Area/bar chart with dual Y-axis, custom tooltip
lib/
└── utils.ts                      # cn(), formatCurrency, formatNumber, formatDate, slugify, debounce...
types/
└── index.ts                      # Shared TypeScript interfaces
```

## Design System

All components use CSS custom classes defined in `globals.css`:

```
.card           — white/dark card with border
.btn-primary    — brand blue button
.btn-secondary  — muted button
.btn-ghost      — transparent hover button
.btn-danger     — red destructive button
.input          — form input with focus ring
.label          — form label
.badge          — inline status pill
.sidebar-link   — nav item with active state
.stat-card      — dashboard metric card
```

Dark mode is automatic (system preference) with manual toggle in the topbar.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`.

## Connect to a Real Backend

Replace the mock data functions in each page with `fetch()` calls to your API. The `ApiResponse<T>` and `PaginationMeta` types in `types/index.ts` match the response format of the `laravel-rest-api` and `node-multitenant-api` repos in this portfolio.

```typescript
// Example: Replace mock data with real API call
async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const json: ApiResponse<Project[]> = await res.json();
  return json.data;
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Min 32-char secret for NextAuth |
| `NEXTAUTH_URL` | Your app URL |
| `DATABASE_URL` | PostgreSQL connection (for Prisma) |
| `STRIPE_SECRET_KEY` | Stripe API key for billing |
| `GITHUB_CLIENT_ID/SECRET` | OAuth — GitHub |
| `GOOGLE_CLIENT_ID/SECRET` | OAuth — Google |
