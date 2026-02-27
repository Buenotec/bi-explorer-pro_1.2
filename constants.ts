
import { ReportType, UserRole, Report, TenantConfig, User } from './types';

export const INITIAL_CONFIG: TenantConfig = {
  companyName: 'BI Explorer Pro',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968250.png',
  primaryColor: '#0ea5e9',
  secondaryColor: '#0369a1',
  faviconUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968250.png'
};

export const MOCK_USER: User = {
  id: 'u-master',
  name: 'Rodrigo Bueno',
  email: 'rodrigo@biexplorer.com.br',
  role: UserRole.ADMIN,
  tenantId: 't1',
  // URL representando a foto enviada (Man with sunglasses style)
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  {
    id: 'u2',
    name: 'Amanda Costa',
    email: 'amanda@empresa.com.br',
    role: UserRole.VIEWER,
    tenantId: 't1',
    avatarUrl: 'https://i.pravatar.cc/150?u=amanda'
  },
  {
    id: 'u3',
    name: 'Ricardo Souza',
    email: 'ricardo@logistica.com.br',
    role: UserRole.EDITOR,
    tenantId: 't1',
    avatarUrl: 'https://i.pravatar.cc/150?u=ricardo'
  }
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'dash-1',
    tenantId: 't1',
    name: 'Dashboard de Performance - Operacional',
    description: 'Visão completa de KPIs operacionais e produtividade.',
    type: ReportType.PUBLIC,
    publicUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNGNjOTY4Y2ItOTJlZC00ZDhmLWI0NzAtOWNhMzVmYTA2MWRjIiwidCI6ImEwMzkxNGMzLWJkM2ItNGU4MS05ZDVlLTkwNWJmY2Y2NTI4YyJ9',
    category: 'Operacional',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800',
    isFavorite: true,
    tags: ['BI', 'PowerBI', 'Operacional'],
    riskLevel: 'BAIXO'
  },
  {
    id: 'dash-2',
    tenantId: 't1',
    name: 'Análise de Mercado e Vendas',
    description: 'Estudo de tendências de mercado e funil de vendas.',
    type: ReportType.PUBLIC,
    publicUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMzc5YzYyMDMtYzE2NC00MDg2LTlhZGQtYjBiZTY1Y2YxMzU3IiwidCI6ImEwMzkxNGMzLWJkM2ItNGU4MS05ZDVlLTkwNWJmY2Y2NTI4YyJ9',
    category: 'Comercial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    isFavorite: false,
    tags: ['Market', 'Sales', 'BI'],
    riskLevel: 'BAIXO'
  },
  {
    id: 'dash-3',
    tenantId: 't1',
    name: 'Monitoramento de Recursos',
    description: 'Gestão de ativos e alocação de recursos em tempo real.',
    type: ReportType.PUBLIC,
    publicUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNWM4OGE1YjgtZjUxZi00ODEwLWEzNGYtYzdkMTQ0YWMwM2EyIiwidCI6ImEwMzkxNGMzLWJkM2ItNGU4MS05ZDVlLTkwNWJmY2Y2NTI4YyJ9',
    category: 'Logística',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    isFavorite: true,
    tags: ['Logística', 'Assets'],
    riskLevel: 'BAIXO'
  },
  {
    id: 'app-km',
    tenantId: 't1',
    name: 'Controle de KM',
    description: 'Aplicativo para gestão de quilometragem e frotas.',
    type: ReportType.APP,
    publicUrl: 'https://controle-km-1-2.netlify.app/',
    category: 'Apps',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    isFavorite: true,
    tags: ['Frota', 'Logística', 'App'],
    riskLevel: 'BAIXO'
  }
];

export const CATEGORIES = ['Todos', 'Comercial', 'Operacional', 'Logística', 'Financeiro', 'Apps'];
