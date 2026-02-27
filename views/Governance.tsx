
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ShieldCheck, Users, Activity, Eye, AlertTriangle, FileDown, RefreshCw } from 'lucide-react';
import { useApp } from '../App';

const DATA_ACCESS = [
  { name: 'Seg', views: 400 },
  { name: 'Ter', views: 300 },
  { name: 'Qua', views: 600 },
  { name: 'Qui', views: 800 },
  { name: 'Sex', views: 700 },
  { name: 'Sáb', views: 200 },
  { name: 'Dom', views: 150 },
];

const DATA_TYPE_DIST = [
  { name: 'Embedded', value: 75, color: '#6366f1' },
  { name: 'Público', value: 20, color: '#f59e0b' },
  { name: 'Externo', value: 5, color: '#10b981' },
];

export const Governance: React.FC = () => {
  const { config } = useApp();

  const handleExport = (type: string) => {
    alert(`Exportando ${type} em formato CSV...`);
  };

  const handleRefreshData = () => {
    alert('Sincronizando logs de auditoria do Azure AD...');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" style={{ color: config.primaryColor }} /> Governança e Segurança
          </h1>
          <p className="text-slate-500 mt-1">Logs de auditoria, análise de risco e conformidade da plataforma.</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => handleExport('Logs de Acesso')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold dark:text-white hover:bg-slate-50">
             <FileDown className="w-4 h-4" /> Exportar Logs
           </button>
           <button onClick={handleRefreshData} className="flex items-center gap-2 px-4 py-2 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20" style={{ backgroundColor: config.primaryColor }}>
             <RefreshCw className="w-4 h-4" /> Sincronizar Agora
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Usuários Ativos" value="1.284" change="+12% vs semana passada" color="indigo" />
        <StatCard icon={Eye} label="Visualizações" value="48.2k" change="+5.4k hoje" color="emerald" />
        <StatCard icon={Activity} label="Tempo Médio" value="12.5m" change="-2% vs ontem" color="amber" />
        <StatCard icon={AlertTriangle} label="Alertas de Risco" value="03" change="2 médio, 1 alto" color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Tráfego de Acessos (Últimos 7 dias)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_ACCESS}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.primaryColor} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={config.primaryColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="views" stroke={config.primaryColor} strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Distribuição por Tipo</h3>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_TYPE_DIST}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA_TYPE_DIST.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Embedded' ? config.primaryColor : entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {DATA_TYPE_DIST.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.name === 'Embedded' ? config.primaryColor : item.color}} />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold dark:text-white">Logs Recentes de Auditoria</h3>
          <button className="text-sm font-bold hover:underline" style={{ color: config.primaryColor }}>Ver Relatório Completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Relatório</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Horário</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duração</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Segurança</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div>
                        <p className="text-sm font-bold dark:text-white">Colaborador {i}</p>
                        <p className="text-[10px] text-slate-500">IP: 177.12.84.{i * 12}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm dark:text-slate-300 font-medium">Fluxo de Caixa Q3</td>
                  <td className="px-8 py-4 text-sm text-slate-500">Hoje, 1{i}:20</td>
                  <td className="px-8 py-4 text-sm text-slate-500">{i * 8} min</td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> MFA VERIFICADO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, change, color }: any) => {
  const colors: any = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between group hover:border-indigo-500 transition-colors">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</h4>
        <p className={`text-[10px] font-bold mt-2 ${change.includes('+') ? 'text-emerald-500' : 'text-slate-400'}`}>{change}</p>
      </div>
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
