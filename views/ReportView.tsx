
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReportType } from '../types';
import { useApp } from '../App';
import { 
  Maximize, 
  ChevronLeft, 
  Share2, 
  Clock, 
  Info, 
  ShieldAlert,
  Loader2,
  Download,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const ReportView: React.FC = () => {
  const { config, reports } = useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const report = reports.find(r => r.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!report) return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <AlertCircle className="w-16 h-16 text-rose-500" />
      <h2 className="text-2xl font-bold dark:text-white">Relatório não encontrado</h2>
      <button onClick={() => navigate('/')} className="text-indigo-600 font-bold hover:underline">Voltar para o Início</button>
    </div>
  );

  const getEmbedUrl = () => {
    if (report.type === ReportType.PUBLIC || report.type === ReportType.APP) {
      return report.publicUrl;
    }
    return ""; // Aqui iria a lógica de Embed Token para Embedded real
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-300 pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors dark:text-white shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
              {report.name} 
              <span className={`px-2 py-0.5 text-[10px] rounded uppercase ${
                report.type === ReportType.APP ? 'bg-sky-100 text-sky-700' : 
                report.type === ReportType.EMBEDDED ? 'bg-emerald-100 text-emerald-700' : 
                'bg-amber-100 text-amber-700'
              }`}>
                {report.type === ReportType.APP ? 'Aplicação' : report.type === ReportType.EMBEDDED ? 'Seguro' : 'Público'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Visualizando agora como rbTecX
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={() => window.open(report.publicUrl, '_blank')} className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 dark:text-slate-400 text-sm font-bold">
            <ExternalLink className="w-4 h-4" /> Abrir Externamente
          </button>
          <button className="flex-1 md:flex-none px-6 py-2 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10" style={{ backgroundColor: config.primaryColor }}>
            <Maximize className="w-4 h-4" /> Tela Cheia
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-inner min-h-[600px]">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-10 transition-all">
            <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: config.primaryColor }} />
            <p className="text-slate-800 dark:text-slate-200 font-bold text-lg">Carregando ambiente rbTecX...</p>
          </div>
        )}
        
        <iframe 
          src={getEmbedUrl()}
          className="w-full h-full border-none"
          title={report.name}
          allowFullScreen
        />
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-10 shadow-sm">
        <div className="flex-1">
          <h4 className="text-md font-bold dark:text-white flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-sky-500" /> Detalhes do Conteúdo
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            {report.description} Este conteúdo é gerenciado pela plataforma rbTecX e segue as políticas de governança corporativa.
          </p>
        </div>
        <div className="w-full lg:w-80 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Tags</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {report.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white dark:bg-slate-700 text-[9px] font-bold rounded border dark:text-slate-300">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
