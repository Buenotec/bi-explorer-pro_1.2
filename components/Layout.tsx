
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronRight,
  Database,
  PieChart,
  AppWindow,
  User as UserIcon,
  LogOut,
  Camera,
  Check,
  TrendingUp
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { config, currentUser, setCurrentUser } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  // Estado local para edição de perfil
  const [profileForm, setProfileForm] = useState(currentUser);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Relatórios', icon: PieChart, path: '/relatorios' },
    { name: 'Apps Web', icon: AppWindow, path: '/apps' },
    { name: 'Governança', icon: ShieldCheck, path: '/governanca', adminOnly: true },
    { name: 'Administração', icon: Settings, path: '/administracao', adminOnly: true },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(profileForm);
    setIsProfileModalOpen(false);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: config.primaryColor }}>
            <img src={config.logoUrl} alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-white truncate">
              {config.companyName}
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            if (item.adminOnly && currentUser.role !== 'ADMIN') return null;
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-sky-50 dark:bg-sky-900/20 shadow-sm border border-sky-100/50 dark:border-sky-800/50' 
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
                style={isActive ? { color: config.primaryColor } : {}}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {isActive && isSidebarOpen && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-4 px-3 py-3 w-full rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {isSidebarOpen && <span className="font-medium">Recolher</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-sky-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 outline-none transition-all dark:text-white"
                style={{ '--tw-ring-color': config.primaryColor } as any}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onMouseEnter={() => setIsNotificationsOpen(true)}
                onMouseLeave={() => setIsNotificationsOpen(false)}
                className="text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-white relative transition-all active:scale-90 group p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Bell className="w-5 h-5 group-hover:animate-[wiggle_0.5s_ease-in-out_infinite]" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">3</span>
                
                {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notificações</h4>
                       <span className="text-[10px] text-sky-500 hover:underline cursor-pointer">Limpar tudo</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-sky-100 dark:hover:border-sky-800">
                        <div className="flex gap-3">
                           <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-4 h-4 text-sky-600" />
                           </div>
                           <div>
                              <p className="text-xs font-bold dark:text-white">Acesso Detectado</p>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">Amanda Costa logou no Dash Financeiro</p>
                           </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-emerald-100 dark:hover:border-emerald-800">
                        <div className="flex gap-3">
                           <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                           </div>
                           <div>
                              <p className="text-xs font-bold dark:text-white">Capacidade Otimizada</p>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">Economia de R$ 120,00 gerada hoje.</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
            
            <button 
              onClick={() => {
                setProfileForm(currentUser);
                setIsProfileModalOpen(true);
              }}
              className="flex items-center gap-3 group hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{currentUser.name}</p>
                <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{currentUser.role} MASTER</p>
              </div>
              <div className="relative">
                <img 
                  src={currentUser.avatarUrl} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 group-hover:scale-105 transition-transform object-cover shadow-md" 
                  style={{ borderColor: config.primaryColor }} 
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
              </div>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>

      {/* Modal de Perfil */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold dark:text-white flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-sky-500" /> Meu Perfil
              </h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative group cursor-pointer">
                  <img src={profileForm.avatarUrl} className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-2xl transition-transform group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="w-full">
                   <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">URL da Foto de Perfil</label>
                   <input 
                     type="text"
                     value={profileForm.avatarUrl}
                     onChange={e => setProfileForm({...profileForm, avatarUrl: e.target.value})}
                     className="w-full bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-xs border-none focus:ring-2 dark:text-white"
                     style={{ '--tw-ring-color': config.primaryColor } as any}
                   />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Nome Completo</label>
                  <input 
                    type="text" 
                    value={profileForm.name}
                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl border-none focus:ring-2 text-sm dark:text-white"
                    style={{ '--tw-ring-color': config.primaryColor } as any}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    value={profileForm.email}
                    onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl border-none focus:ring-2 text-sm dark:text-white"
                    style={{ '--tw-ring-color': config.primaryColor } as any}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsProfileModalOpen(false)} className="flex-1 py-3.5 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">Voltar</button>
                <button type="submit" className="flex-1 py-3.5 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform" style={{ backgroundColor: config.primaryColor }}>
                  <Check className="w-5 h-5" /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(12deg); }
          75% { transform: rotate(-12deg); }
        }
      `}} />
    </div>
  );
};
