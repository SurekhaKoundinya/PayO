import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect, createContext, useContext } from 'react';
import Sidebar from './components/Sidebar';
import ConfirmDialog from './components/ConfirmDialog';
import Login from './pages/Login';
import { PayoIconLogo } from './components/PayoLogo';
import Dashboard from './pages/Dashboard';
import KYCReview from './pages/KYCReview';
import Users from './pages/Users';
import Wallets from './pages/Wallets';
import Analytics from './pages/Analytics';
import AuditLog from './pages/AuditLog';
import Notifications from './pages/Notifications';

/* ── Global Context: dark mode + confirm dialog ── */
export const AppCtx = createContext({});

const titles = {
  '/':'Dashboard', '/kyc':'KYC Review', '/users':'Users',
  '/wallets':'Wallets', '/analytics':'Analytics',
  '/audit':'Audit Log', '/notifications':'Notifications',
};

function Topbar({ admin, onLogout, dark, toggleDark }) {
  const loc = useLocation();
  const nav  = useNavigate();
  const [search, setSearch] = useState('');
  const title = titles[loc.pathname] || 'Dashboard';

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

        {/* Admin chip */}
        <div className="admin-chip">
          <div className="admin-avatar">
            {admin?.name?.split(' ').map(w=>w[0]).join('').slice(0,2)}
          </div>
          <div>
            <div className="admin-name">{admin?.name}</div>
            <div className="admin-role">{admin?.role}</div>
          </div>
          <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}

function Portal({ admin, onLogout, dark, toggleDark }) {
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
        <Topbar admin={admin} onLogout={handleLogout} dark={dark} toggleDark={toggleDark} />
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
  const [admin, setAdmin]       = useState(null);   // null = logged out
  const [dark, setDark]         = useState(false);
  const [dlg, setDlg]           = useState(null);   // { config, onConfirm }

  /* Apply dark class to body */
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  /* Global confirm function — any page can call it via context */
  const confirm = (config, onConfirm) => setDlg({ config, onConfirm });
  const closeDialog = () => setDlg(null);

  return (
    <AppCtx.Provider value={{ confirm, dark }}>
      {!admin
        ? <Login onLogin={setAdmin} />
        : <Portal
            admin={admin}
            onLogout={() => setAdmin(null)}
            dark={dark}
            toggleDark={() => setDark(d => !d)}
          />
      }

      {/* Global Confirm Dialog */}
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
