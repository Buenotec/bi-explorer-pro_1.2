
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { ReportType } from '../types';
import { ReportCard } from '../components/ReportCard';
import { PieChart, Search, Filter } from 'lucide-react';
import { CATEGORIES } from '../constants';

export const ReportsView: React.FC = () => {
  const { reports, setReports, config } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const biReports = useMemo(() => {
    return reports.filter(r => r.type !== ReportType.APP).filter(r => {
      const matchesCategory = selectedCategory === 'Todos' || r.category === selectedCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [reports, selectedCategory, searchQuery]);

  const handleToggleFavorite = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <PieChart className="w-8 h-8" style={{ color: config.primaryColor }} /> Central de Relatórios
          </h1>
          <p className="text-slate-500 mt-1">Acesse todos os seus dashboards de Power BI em um só lugar.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:ring-2 outline-none shadow-sm transition-all"
            style={{ '--tw-ring-color': config.primaryColor } as any}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.filter(c => c !== 'Apps').map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'text-white shadow-lg' 
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200'
            }`}
            style={selectedCategory === cat ? { backgroundColor: config.primaryColor } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {biReports.map(report => (
          <ReportCard 
            key={report.id} 
            report={report} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ))}
      </div>
    </div>
  );
};
