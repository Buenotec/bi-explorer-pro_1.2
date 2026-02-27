
export enum ReportType {
  EMBEDDED = 'EMBEDDED',
  PUBLIC = 'PUBLIC',
  EXTERNAL = 'EXTERNAL',
  APP = 'APP'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR'
}

export interface TenantConfig {
  companyName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  faviconUrl: string;
}

export interface Report {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: ReportType;
  workspaceId?: string;
  reportId?: string;
  datasetId?: string;
  publicUrl?: string;
  category: string;
  thumbnailUrl: string;
  isFavorite: boolean;
  tags: string[];
  riskLevel: 'BAIXO' | 'MÉDIO' | 'ALTO';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  avatarUrl: string;
}

export interface CapacityStatus {
  isActive: boolean;
  sku: string;
  memoryUsage: number;
  cpuUsage: number;
  estimatedCost: number;
}
