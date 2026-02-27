
import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  ShieldAlert, 
  CheckCircle2, 
  Power,
  Layers,
  Database,
  Palette,
  Layout as LayoutIcon,
  Image as ImageIcon,
  Save,
  Trash2,
  ExternalLink,
  X,
  Edit2,
  Users,
  UserPlus,
  ShieldCheck,
  Mail,
  UserCog,
  Monitor
} from 'lucide-react';
import { ReportType, TenantConfig, Report, User, UserRole } from '../types';
import { useApp } from '../App';

export const Admin: React.FC = () => {
  const { config, setConfig, reports, setReports, users, setUsers, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'reports' | 'users' | 'whitelabel' | 'capacity'>('reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [capacityActive, setCapacityActive] = useState(true);
  const [editingReport, setEditingReport] = useState<Partial<Report> | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: UserRole.VIEWER,
    avatarUrl: 'https://i.pravatar.cc/150'
  });

  // Estados locais para o form de White Label
  const [formConfig, setFormConfig] = useState<TenantConfig>(config);

  const handleSaveWhiteLabel = () => {
    setConfig(formConfig);
    alert('Configurações de marca salvas com sucesso!');
  };

  const handleRemoveReport = (id: string) => {
    if(confirm('Tem certeza que deseja remover este relatório?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const userToAdd = {
      ...newUser,
      id: `u-${Math.random().toString(36).substr(2, 9)}`,
      tenantId: 't1'
    } as User;
    setUsers([...users, userToAdd]);
    setIsUserModalOpen(false);
    alert(`Usuário ${newUser.name} adicionado para monitoramento.`);
  };

  const handleRemoveUser = (id: string) => {
    if (id === currentUser.id) {
      alert("Você não pode remover a si mesmo.");
      return;
    }
    if(confirm('Remover este usuário impedirá seu acesso aos BI´s. Confirmar?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;
    if (editingReport.id) {
      setReports(reports.map(r => r.id === editingReport.id ? { ...r, ...editingReport } as Report : r));
    } else {
      const newReport = { ...editingReport, id: `rep-${Date.now()}`, tenantId: 't1', isFavorite: false, tags: [], riskLevel: 'BAIXO' } as Report;
      setReports([...reports, newReport]);
    }
    setIsModalOpen(false);
    setEditingReport(null);
  };

  // Fix: Added missing handleToggleCapacity function
  const handleToggleCapacity = () => {
    setCapacityActive(!capacityActive);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Settings className="w-6 h-6" style={{ color: config.primaryColor }} /> Painel de Administração
          </h1>
          <p className="text-slate-500 text-sm mt-1">Gestão de infraestrutura, marca e governança de acessos.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-x-auto max-w-full">
          {[
            { id: 'reports', label: 'Relatórios', icon: Database },
            { id: 'users', label: 'Usuários', icon: Users },
            { id: 'whitelabel', label: 'Marca', icon: Palette },
            { id: 'capacity', label: 'Capacidade', icon: Power },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold dark:text-white">Usuários com Acesso</h2>
             <button 
               onClick={() => setIsUserModalOpen(true)}
               className="flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95"
               style={{ backgroundColor: config.primaryColor }}
             >
               <UserPlus className="w-4 h-4" /> Adicionar Usuário
             </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Usuário</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">E-mail</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cargo</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status BI</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                 {users.map(u => (
                   <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatarUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                          <span className="text-sm font-bold dark:text-white">{u.name} {u.id === currentUser.id && <span className="text-[10px] bg-sky-100 text-sky-600 px-1.5 rounded ml-1 font-bold uppercase">Admin Master</span>}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                           u.role === UserRole.ADMIN ? 'bg-indigo-100 text-indigo-700' :
                           u.role === UserRole.EDITOR ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                         }`}>
                           {u.role}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-xs text-emerald-600 font-bold italic">Online</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-sky-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleRemoveUser(u.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => {
                setEditingReport({
                  name: '',
                  type: ReportType.EMBEDDED,
                  category: 'Comercial',
                  thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400'
                });
                setIsModalOpen(true);
              }}
              className="h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              style={{ borderColor: config.primaryColor + '40' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: config.primaryColor + '20' }}>
                <Plus className="w-6 h-6" style={{ color: config.primaryColor }} />
              </div>
              <span className="font-bold" style={{ color: config.primaryColor }}>Cadastrar Novo Relatório</span>
            </button>

            {reports.map((report) => (
              <div key={report.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded ${report.type === ReportType.EMBEDDED ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {report.type}
                  </span>
                </div>
                <h4 className="font-bold dark:text-white truncate">{report.name}</h4>
                <div className="mt-6 flex justify-between gap-3">
                  <button onClick={() => { setEditingReport(report); setIsModalOpen(true); }} className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors dark:text-white">Editar</button>
                  <button onClick={() => handleRemoveReport(report.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'whitelabel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 dark:text-white">
                <Palette className="w-5 h-5 text-indigo-500" /> Identidade Visual & White Label
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Nome da Plataforma</label>
                  <input 
                    type="text" 
                    value={formConfig.companyName}
                    onChange={e => setFormConfig({...formConfig, companyName: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">URL do Logo (Barra Superior)</label>
                  <input 
                    type="text" 
                    value={formConfig.logoUrl}
                    onChange={e => setFormConfig({...formConfig, logoUrl: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Favicon URL</label>
                  <input 
                    type="text" 
                    value={formConfig.faviconUrl}
                    onChange={e => setFormConfig({...formConfig, faviconUrl: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Cor Primária</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={formConfig.primaryColor}
                      onChange={e => setFormConfig({...formConfig, primaryColor: e.target.value})}
                      className="h-11 w-20 rounded-lg overflow-hidden border-none cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={formConfig.primaryColor}
                      onChange={e => setFormConfig({...formConfig, primaryColor: e.target.value})}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-none text-sm dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Cor Secundária</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={formConfig.secondaryColor}
                      onChange={e => setFormConfig({...formConfig, secondaryColor: e.target.value})}
                      className="h-11 w-20 rounded-lg overflow-hidden border-none cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={formConfig.secondaryColor}
                      onChange={e => setFormConfig({...formConfig, secondaryColor: e.target.value})}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-none text-sm dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleSaveWhiteLabel}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Save className="w-4 h-4" /> Salvar Alterações
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <h3 className="text-sm font-bold mb-4 dark:text-white uppercase tracking-wider">Preview Mobile</h3>
               <div className="aspect-[9/16] bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-2xl">
                  <div className="h-12 border-b flex items-center px-4 gap-2" style={{ backgroundColor: formConfig.primaryColor }}>
                     <img src={formConfig.logoUrl} className="w-5 h-5 rounded bg-white p-0.5" alt="" />
                     <span className="text-[10px] font-bold text-white uppercase truncate">{formConfig.companyName}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-24 bg-white dark:bg-slate-700 rounded-xl shadow-sm animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-600 rounded" />
                    <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-600 rounded" />
                    <div className="grid grid-cols-2 gap-2 pt-2">
                       <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                       <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'capacity' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold dark:text-white">Capacidade Power BI Embedded (Azure)</h3>
                <p className="text-slate-500 text-sm">Monitore o consumo da SKU A1 e custos estimados.</p>
              </div>
              <button 
                onClick={handleToggleCapacity}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 ${
                  capacityActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                <Power className="w-4 h-4" /> {capacityActive ? 'Capacidade Ativa' : 'Capacidade Pausada'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <StatCardSmall label="SKU Atual" value="A1" color={config.primaryColor} />
               <StatCardSmall label="Uso de Memória" value="1.4 GB / 3GB" />
               <StatCardSmall label="Consumo Mensal" value="R$ 3.840,00" />
               <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sincronização</p>
                 <p className="text-sm font-bold text-emerald-500 mt-3 flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4" /> Azure SDK OK
                 </p>
               </div>
            </div>

            <div className="mt-12 p-8 bg-sky-50 dark:bg-sky-900/20 border border-dashed rounded-3xl relative overflow-hidden" style={{ borderColor: config.primaryColor + '40' }}>
               <div className="flex gap-6 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl shrink-0">
                    <ShieldAlert className="w-8 h-8" style={{ color: config.primaryColor }} />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-slate-900 dark:text-white">Otimização de Custos Inteligente</h4>
                   <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                     Detectamos baixa atividade entre 22:00 e 06:00. <br />Ativar o <strong>Auto-Pause</strong> pode gerar uma economia de até <strong>R$ 1.200,00/mês</strong>.
                   </p>
                   <button className="mt-6 px-8 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:shadow-xl transition-all active:scale-95" style={{ backgroundColor: config.primaryColor }}>
                     Ativar Auto-Pause Agora
                   </button>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 -mr-10 -mt-10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Usuário */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold dark:text-white">Adicionar Usuário</h2>
              <button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nome Completo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Users className="w-4 h-4 text-slate-400" />
                  </span>
                  <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl border-none text-sm dark:text-white outline-none focus:ring-2" style={{'--tw-ring-color': config.primaryColor} as any} placeholder="Ex: Rodrigo Bueno" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">E-mail</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </span>
                  <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl border-none text-sm dark:text-white outline-none focus:ring-2" style={{'--tw-ring-color': config.primaryColor} as any} placeholder="rodrigo@exemplo.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Cargo / Perfil</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <UserCog className="w-4 h-4 text-slate-400" />
                  </span>
                  <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})} className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl border-none text-sm dark:text-white appearance-none outline-none focus:ring-2" style={{'--tw-ring-color': config.primaryColor} as any}>
                    <option value={UserRole.VIEWER}>Visualizador</option>
                    <option value={UserRole.EDITOR}>Editor</option>
                    <option value={UserRole.ADMIN}>Administrador</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-2xl flex gap-3 items-start border border-sky-100 dark:border-sky-800">
                 <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
                 <p className="text-[10px] text-sky-700 dark:text-sky-300 leading-tight">
                   O usuário receberá um convite por e-mail com as credenciais de acesso ao BI Explorer Pro.
                 </p>
              </div>

              <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setIsUserModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancelar</button>
                 <button type="submit" className="flex-1 py-3 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform" style={{ backgroundColor: config.primaryColor }}>Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Relatórios (Restauração da funcionalidade Editar/Salvar) */}
      {isModalOpen && editingReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold dark:text-white">{editingReport.id ? 'Editar Relatório' : 'Registrar Relatório'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveReport} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nome do Relatório</label>
                  <input type="text" required value={editingReport.name} onChange={e => setEditingReport({...editingReport, name: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 text-sm dark:text-white" style={{ '--tw-ring-color': config.primaryColor } as any} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Tipo</label>
                  <select value={editingReport.type} onChange={e => setEditingReport({...editingReport, type: e.target.value as ReportType})} className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 text-sm dark:text-white appearance-none">
                    <option value={ReportType.EMBEDDED}>Power BI Embedded</option>
                    <option value={ReportType.PUBLIC}>Link Público</option>
                    <option value={ReportType.EXTERNAL}>Dashboard Externo</option>
                    <option value={ReportType.APP}>Aplicação Web</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Categoria</label>
                  <select value={editingReport.category} onChange={e => setEditingReport({...editingReport, category: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 text-sm dark:text-white appearance-none">
                    <option>Comercial</option>
                    <option>Financeiro</option>
                    <option> RH</option>
                    <option>Logística</option>
                    <option>Operacional</option>
                    <option>Apps</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">URL Pública ou do App</label>
                  <input type="text" value={editingReport.publicUrl} onChange={e => setEditingReport({...editingReport, publicUrl: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 text-sm dark:text-white" style={{ '--tw-ring-color': config.primaryColor } as any} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Thumbnail URL</label>
                  <input type="text" value={editingReport.thumbnailUrl} onChange={e => setEditingReport({...editingReport, thumbnailUrl: e.target.value})} className="w-full bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border-none outline-none focus:ring-2 text-sm dark:text-white" style={{ '--tw-ring-color': config.primaryColor } as any} />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 py-3 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95" style={{ backgroundColor: config.primaryColor }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCardSmall = ({ label, value, color }: any) => (
  <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1" style={color ? {color} : {}}>{value}</p>
  </div>
);
