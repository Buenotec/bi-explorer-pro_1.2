
import React from 'react';
import { Report, ReportType } from '../types';
import { Star, Shield, Lock, Globe, ExternalLink, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

interface ReportCardProps {
  report: Report;
  onToggleFavorite: (id: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onToggleFavorite }) => {
  const { config } = useApp();
  const isEmbedded = report.type === ReportType.EMBEDDED;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={report.thumbnailUrl} 
          alt={report.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
           <p className="text-xs text-slate-200 line-clamp-3 mb-4 leading-relaxed">{report.description}</p>
           <Link 
             to={`/visualizar/${report.id}`}
             className="w-full py-3 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all transform translate-y-2 group-hover:translate-y-0"
             style={{ backgroundColor: config.primaryColor }}
           >
             Abrir Relatório <ExternalLink className="w-3.5 h-3.5" />
           </Link>
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          {isEmbedded ? (
            <span className="px-2 py-1 bg-emerald-500/90 text-white text-[9px] font-bold rounded-lg flex items-center gap-1 backdrop-blur-md">
              <Lock className="w-2.5 h-2.5" /> SEGURO
            </span>
          ) : (
            <span className="px-2 py-1 bg-amber-500/90 text-white text-[9px] font-bold rounded-lg flex items-center gap-1 backdrop-blur-md">
              <Globe className="w-2.5 h-2.5" /> PÚBLICO
            </span>
          )}
          {report.riskLevel === 'ALTO' && (
            <span className="px-2 py-1 bg-rose-500/90 text-white text-[9px] font-bold rounded-lg flex items-center gap-1 backdrop-blur-md">
              <Shield className="w-2.5 h-2.5" /> CONFIDENCIAL
            </span>
          )}
        </div>

        <button 
          onClick={() => onToggleFavorite(report.id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors"
        >
          <Star className={`w-4 h-4 ${report.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white truncate text-md leading-tight group-hover:text-indigo-500 transition-colors" style={ {color: 'inherit'} }>
            {report.name}
          </h3>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {report.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[9px] font-bold rounded uppercase tracking-wider border border-slate-100 dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
