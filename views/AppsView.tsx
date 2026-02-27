
import React from 'react';
import { useApp } from '../App';
import { ReportType } from '../types';
import { ReportCard } from '../components/ReportCard';
import { AppWindow, Sparkles } from 'lucide-react';

export const AppsView: React.FC = () => {
  const { reports, setReports, config } = useApp();
  
  const apps = reports.filter(r => r.type === ReportType.APP);

  const handleToggleFavorite = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <AppWindow className="w-8 h-8" style={{ color: config.primaryColor }} /> Aplicativos Web
          </h1>
          <p className="text-slate-500 mt-1">Ferramentas externas integradas ao ecossistema rbTecX.</p>
        </div>
        <div className="px-4 py-2 bg-sky-100 text-sky-700 rounded-xl text-xs font-bold flex items-center gap-2">
           <Sparkles className="w-4 h-4" /> Apps de Alta Performance
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {apps.map(app => (
          <ReportCard 
            key={app.id} 
            report={app} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ))}
      </div>

      {apps.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-slate-500">Nenhum aplicativo web cadastrado.</p>
        </div>
      )}
    </div>
  );
};
