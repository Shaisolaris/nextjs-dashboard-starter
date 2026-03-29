export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  isActive: boolean;
  trialEndsAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  teamMembers: number;
  storageUsedGb: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  newUsersThisMonth: number;
  activityData: ActivityDataPoint[];
}

export interface ActivityDataPoint {
  date: string;
  events: number;
  revenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  error?: ApiError;
}

export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
