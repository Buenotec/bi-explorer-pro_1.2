
import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, MOCK_USER } from '../constants';
import { ReportCard } from '../components/ReportCard';
import { Filter, Search, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { useApp } from '../App';
import { getAIOptimizationSuggestions } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const { reports, setReports, config } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInsight, setAiInsight] = useState<{ suggestions: string[], costInsight: string } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAI(true);
      const suggestions = await getAIOptimizationSuggestions(reports);
      setAiInsight(suggestions);
      setLoadingAI(false);
    };
    fetchAI();
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesCategory = selectedCategory === 'Todos' || r.category === selectedCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [reports, selectedCategory, searchQuery]);

  const handleToggleFavorite = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl transition-all duration-500" style={{ backgroundColor: config.primaryColor }}>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
               {loadingAI ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-amber-300" />} 
               Insights de IA Ativos
             </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Olá, {MOCK_USER.name.split(' ')[0]}! Seu Hub de BI está pronto.
          </h1>
          <p className="text-indigo-100 text-lg mb-8 opacity-90">
            {loadingAI ? 'Analisando seus dados...' : 
              aiInsight?.suggestions[0] || 'Baseado no seu uso recente, temos novas recomendações para você.'}
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-xl transition-all" style={{ color: config.primaryColor }}>
              Começar Agora
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
              Ver Governança
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <TrendingUp className="w-full h-full text-white" strokeWidth={1} />
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'text-white shadow-lg' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
              style={selectedCategory === cat ? { backgroundColor: config.primaryColor } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca rápida..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:ring-2 outline-none shadow-sm transition-all dark:text-white"
            style={{ '--tw-ring-color': config.primaryColor } as any}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredReports.map(report => (
          <ReportCard 
            key={report.id} 
            report={report} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="py-24 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
             <Filter className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nenhum relatório encontrado</h3>
          <p className="text-slate-500 mt-2">Tente ajustar seus filtros ou termos de busca.</p>
        </div>
      )}
    </div>
  );
};
