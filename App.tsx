
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { Admin } from './views/Admin';
import { Governance } from './views/Governance';
import { ReportView } from './views/ReportView';
import { AppsView } from './views/AppsView';
import { ReportsView } from './views/ReportsView';
import { INITIAL_CONFIG, MOCK_REPORTS, MOCK_USER, MOCK_USERS } from './constants';
import { TenantConfig, Report, User } from './types';

interface AppContextType {
  config: TenantConfig;
  setConfig: (c: TenantConfig) => void;
  reports: Report[];
  setReports: (r: Report[]) => void;
  currentUser: User;
  setCurrentUser: (u: User) => void;
  users: User[];
  setUsers: (u: User[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [config, setConfig] = useState<TenantConfig>(INITIAL_CONFIG);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', config.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', config.secondaryColor);
  }, [config]);

  return (
    <AppContext.Provider value={{ 
      config, setConfig, 
      reports, setReports, 
      currentUser, setCurrentUser,
      users, setUsers
    }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/relatorios" element={<ReportsView />} />
            <Route path="/apps" element={<AppsView />} />
            <Route path="/administracao" element={<Admin />} />
            <Route path="/governanca" element={<Governance />} />
            <Route path="/visualizar/:id" element={<ReportView />} />
          </Routes>
        </Layout>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
