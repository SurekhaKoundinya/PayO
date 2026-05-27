import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect, createContext, useContext } from 'react';
import Sidebar from './components/Sidebar';
import ConfirmDialog from './components/ConfirmDialog';
import AdminProfile from './components/AdminProfile';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KYCReview from './pages/KYCReview';
import Users from './pages/Users';
import Wallets from './pages/Wallets';
import Analytics from './pages/Analytics';
import AuditLog from './pages/AuditLog';
import Notifications from './pages/Notifications';

export const AppCtx = createContext({});

const titles = {
  '/':'Dashboard', '/kyc':'KYC Review', '/users':'Users',
  '/wallets':'Wallets', '/analytics':'Analytics',
  '/audit':'Audit Log', '/notifications':'Notifications',
};

function Topbar({ admin, onAdminUpdate, onLogout, dark, toggleDark }) {
  const loc = useLocation();
  const nav  = useNavigate();
  const [search, setSearch] = useState('');
  const { confirm } = useContext(AppCtx);
  const title = titles[loc.pathname] || 'Dashboard';

  const handleLogout = () => {
    confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of the PayO Admin Portal?',
      confirmLabel: 'Yes, Sign Out',
      cancelLabel: 'Stay',
      type: 'danger',
    }, onLogout);
  };

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>

      <div className="topbar-search">
        <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input placeholder="Search user, document, status..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      <div className="topbar-right">
        {/* Dark mode toggle */}
        <button className="dark-toggle" onClick={toggleDark} title={dark ? 'Light mode' : 'Dark mode'}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Notifications */}
        <button className="notif-btn" onClick={()=>nav('/notifications')}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="notif-dot">5</span>
        </button>

        {/* Admin Profile — replaces old static chip */}
        <AdminProfile
          admin={admin}
          onUpdate={onAdminUpdate}
          onLogout={handleLogout}
          dark={dark}
        />
      </div>
    </header>
  );
}

function Portal({ admin, onAdminUpdate, onLogout, dark, toggleDark }) {
  const { confirm } = useContext(AppCtx);

  const handleLogout = () => {
    confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of the PayO Admin Portal?',
      confirmLabel: 'Yes, Sign Out',
      cancelLabel: 'Stay',
      type: 'danger',
    }, onLogout);
  };

  return (
    <div className="layout">
      <Sidebar onLogout={handleLogout} />
      <div className="main">
        <Topbar
          admin={admin}
          onAdminUpdate={onAdminUpdate}
          onLogout={onLogout}
          dark={dark}
          toggleDark={toggleDark}
        />
        <Routes>
          <Route path="/"              element={<Dashboard />} />
          <Route path="/kyc"           element={<KYCReview />} />
          <Route path="/users"         element={<Users />} />
          <Route path="/wallets"       element={<Wallets />} />
          <Route path="/analytics"     element={<Analytics />} />
          <Route path="/audit"         element={<AuditLog />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
}

function AppInner() {
  const [admin, setAdmin] = useState(null);
  const [dark, setDark]   = useState(() => {
    try { return localStorage.getItem('payo-dark') === 'true'; } catch { return false; }
  });
  const [dlg, setDlg] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem('payo-dark', dark); } catch {}
  }, [dark]);

  const confirm     = (config, onConfirm) => setDlg({ config, onConfirm });
  const closeDialog = () => setDlg(null);

  return (
    <AppCtx.Provider value={{ confirm, dark }}>
      {!admin
        ? <Login onLogin={setAdmin} />
        : <Portal
            admin={admin}
            onAdminUpdate={(updated) => setAdmin(updated)}
            onLogout={() => setAdmin(null)}
            dark={dark}
            toggleDark={() => setDark(d => !d)}
          />
      }
      <ConfirmDialog
        config={dlg?.config}
        onConfirm={() => { dlg?.onConfirm?.(); closeDialog(); }}
        onCancel={closeDialog}
      />
    </AppCtx.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
