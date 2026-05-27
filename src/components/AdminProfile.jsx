import { useState, useRef, useEffect } from 'react';

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      background: type === 'ok' ? '#10B981' : '#EF4444',
      color: '#fff', padding: '13px 18px', borderRadius: 12,
      fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 9,
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      animation: 'tIn 0.3s ease', fontFamily: "'Inter',sans-serif",
    }}>
      {type === 'ok' ? '✅' : '❌'} {msg}
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', disabled = false, icon }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 600,
        color: 'var(--gray-400)', textTransform: 'uppercase',
        letterSpacing: '0.7px', marginBottom: 6,
      }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--gray-400)', display: 'flex', alignItems: 'center',
          }}>{icon}</div>
        )}
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: icon ? '10px 12px 10px 38px' : '10px 12px',
            background: disabled ? 'var(--profile-input-disabled, #F8FAFC)' : 'var(--profile-input-bg, #fff)',
            border: '1.5px solid var(--profile-input-border, #E2E8F0)',
            borderRadius: 9, fontSize: 13.5, color: 'var(--gray-800)',
            outline: 'none', fontFamily: "'Inter',sans-serif",
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.7 : 1,
            transition: 'border-color 0.2s',
          }}
          onFocus={e => { if (!disabled) e.target.style.borderColor = '#2563EB'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--profile-input-border, #E2E8F0)'; }}
        />
      </div>
    </div>
  );
}

export default function AdminProfile({ admin, onUpdate, onLogout, dark }) {
  const [open, setOpen]         = useState(false);
  const [tab, setTab]           = useState('profile'); // 'profile' | 'security' | 'preferences'
  const [toast, setToast]       = useState(null);
  const panelRef                = useRef(null);

  // Profile fields
  const [name, setName]         = useState(admin?.name || 'Admin User');
  const [email, setEmail]       = useState(admin?.email || 'admin@payo.com');
  const [phone, setPhone]       = useState(admin?.phone || '+91 98765 43210');
  const [role]                  = useState(admin?.role || 'Super Admin');
  const [department, setDept]   = useState('KYC Operations');
  const [location, setLocation] = useState('Hyderabad, India');

  // Security fields
  const [curPw, setCurPw]       = useState('');
  const [newPw, setNewPw]       = useState('');
  const [confPw, setConfPw]     = useState('');
  const [showCur, setShowCur]   = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [twoFA, setTwoFA]       = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Preferences
  const [emailNotifs, setEmailNotifs]   = useState(true);
  const [kycAlerts, setKycAlerts]       = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const showToast = (msg, type = 'ok') => setToast({ msg, type });

  // Close on outside click
  useEffect(() => {
    const h = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const saveProfile = () => {
    if (!name.trim() || !email.trim()) { showToast('Name and email are required.', 'err'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { showToast('Please enter a valid email.', 'err'); return; }
    onUpdate?.({ ...admin, name, email, phone });
    showToast('Profile updated successfully!');
  };

  const savePassword = () => {
    if (!curPw) { showToast('Enter your current password.', 'err'); return; }
    if (curPw !== 'Admin@123') { showToast('Current password is incorrect.', 'err'); return; }
    if (newPw.length < 8) { showToast('New password must be at least 8 characters.', 'err'); return; }
    if (newPw !== confPw) { showToast('New passwords do not match.', 'err'); return; }
    setCurPw(''); setNewPw(''); setConfPw('');
    showToast('Password changed successfully!');
  };

  const savePreferences = () => { showToast('Preferences saved!'); };

  const pwStrength = (pw) => {
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: 'Weak', color: '#EF4444', width: '25%' };
    if (score === 2) return { label: 'Fair', color: '#F59E0B', width: '50%' };
    if (score === 3) return { label: 'Good', color: '#3B82F6', width: '75%' };
    return { label: 'Strong', color: '#10B981', width: '100%' };
  };

  const strength = pwStrength(newPw);

  const Toggle = ({ checked, onChange }) => (
    <div onClick={() => onChange(!checked)} style={{
      width: 44, height: 24, borderRadius: 12,
      background: checked ? '#2563EB' : 'var(--toggle-off, #CBD5E1)',
      position: 'relative', cursor: 'pointer', flexShrink: 0,
      transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s',
      }}/>
    </div>
  );

  const PasswordInput = ({ label, value, onChange, show, onToggle }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          style={{ width:'100%', padding:'10px 40px 10px 12px', background:'var(--profile-input-bg,#fff)', border:'1.5px solid var(--profile-input-border,#E2E8F0)', borderRadius:9, fontSize:13.5, color:'var(--gray-800)', outline:'none', fontFamily:"'Inter',sans-serif", transition:'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor='#2563EB'}
          onBlur={e => e.target.style.borderColor='var(--profile-input-border,#E2E8F0)'}
        />
        <button type="button" onClick={onToggle} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--gray-400)', fontSize:15, padding:0, display:'flex', alignItems:'center' }}>
          {show ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );

  return (
    <div ref={panelRef} style={{ position: 'relative' }}>
      {/* ── Trigger chip ── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 9,
          background: open ? 'var(--gray-100)' : 'var(--gray-100)',
          border: `1.5px solid ${open ? 'var(--blue)' : 'var(--gray-200)'}`,
          borderRadius: 10, padding: '6px 12px 6px 6px',
          cursor: 'pointer', transition: 'all 0.18s',
          userSelect: 'none',
        }}
      >
        <div style={{
          width: 32, height: 32,
          background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 12,
          fontFamily: "'Space Grotesk',sans-serif",
        }}>{initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.2 }}>{role}</div>
        </div>
        <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {/* ── Panel ── */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 68, right: 20,
          width: 420,
          maxHeight: 'calc(100vh - 90px)',
          overflowY: 'auto',
          background: 'var(--profile-panel-bg, #fff)',
          border: '1.5px solid var(--profile-panel-border, #E2E8F0)',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          zIndex: 800,
          animation: 'slideUp 0.22s ease',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A6E 100%)',
            borderRadius: '16px 16px 0 0',
            padding: '28px 24px 24px',
            position: 'relative',
          }}>
            {/* Close */}
            <button onClick={() => setOpen(false)} style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,255,255,0.12)', border: 'none',
              borderRadius: 8, width: 30, height: 30, cursor: 'pointer',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>×</button>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 64, height: 64,
                background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
                borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, fontWeight: 800, color: '#fff',
                fontFamily: "'Space Grotesk',sans-serif",
                border: '3px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                flexShrink: 0,
              }}>{initials}</div>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing:'-0.3px' }}>{name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{email}</div>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background:'rgba(16,185,129,0.2)', color:'#6EE7B7', fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, border:'1px solid rgba(16,185,129,0.3)' }}>
                    ● {role}
                  </span>
                  <span style={{ background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', fontSize:11, fontWeight:500, padding:'3px 10px', borderRadius:20 }}>
                    {department}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:20 }}>
              {[['KYC Reviewed','142'],['Approved','128'],['Rejected','14']].map(([l,v])=>(
                <div key={l} style={{ background:'rgba(255,255,255,0.08)', borderRadius:10, padding:'10px 12px', textAlign:'center' }}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:'#fff' }}>{v}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:500, marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid var(--profile-panel-border,#E2E8F0)', padding:'0 8px' }}>
            {[['profile','👤','Profile'],['security','🔒','Security'],['preferences','⚙️','Preferences']].map(([t,e,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                flex:1, padding:'12px 8px', border:'none', background:'none',
                fontSize:12.5, fontWeight: tab===t?700:500,
                color: tab===t ? '#2563EB' : 'var(--gray-400)',
                cursor:'pointer', fontFamily:"'Inter',sans-serif",
                borderBottom: tab===t ? '2px solid #2563EB' : '2px solid transparent',
                transition:'all 0.18s', display:'flex', alignItems:'center', justifyContent:'center', gap:5,
              }}>
                <span>{e}</span>{l}
              </button>
            ))}
          </div>

          {/* Body */}
          <div style={{ padding:'22px 22px 18px' }}>

            {/* ── PROFILE TAB ── */}
            {tab === 'profile' && (
              <>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:14 }}>Personal Information</div>

                <InputField label="Full Name" value={name} onChange={setName}
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                />
                <InputField label="Email Address" value={email} onChange={setEmail} type="email"
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                />
                <InputField label="Phone Number" value={phone} onChange={setPhone}
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 011 1.22 2 2 0 012.96 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
                />
                <InputField label="Department" value={department} onChange={setDept}
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>}
                />
                <InputField label="Location" value={location} onChange={setLocation}
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                />
                <InputField label="Role" value={role} onChange={() => {}} disabled
                  icon={<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                />

                <button onClick={saveProfile} style={{
                  width:'100%', padding:'11px', marginTop:4,
                  background:'linear-gradient(135deg,#2563EB,#3B82F6)',
                  border:'none', borderRadius:10, color:'#fff',
                  fontSize:14, fontWeight:600, cursor:'pointer',
                  fontFamily:"'Inter',sans-serif",
                  boxShadow:'0 4px 16px rgba(37,99,235,0.3)',
                  transition:'all 0.18s',
                }}
                onMouseEnter={e=>{e.target.style.transform='translateY(-1px)';e.target.style.boxShadow='0 6px 20px rgba(37,99,235,0.4)';}}
                onMouseLeave={e=>{e.target.style.transform='translateY(0)';e.target.style.boxShadow='0 4px 16px rgba(37,99,235,0.3)';}}>
                  Save Changes
                </button>
              </>
            )}

            {/* ── SECURITY TAB ── */}
            {tab === 'security' && (
              <>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:14 }}>Change Password</div>

                <PasswordInput label="Current Password" value={curPw} onChange={setCurPw} show={showCur} onToggle={()=>setShowCur(p=>!p)}/>
                <PasswordInput label="New Password" value={newPw} onChange={setNewPw} show={showNew} onToggle={()=>setShowNew(p=>!p)}/>

                {/* Password strength */}
                {newPw && strength && (
                  <div style={{ marginBottom:16, marginTop:-8 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:11, color:'var(--gray-400)' }}>Password strength</span>
                      <span style={{ fontSize:11, fontWeight:600, color:strength.color }}>{strength.label}</span>
                    </div>
                    <div style={{ height:4, background:'var(--gray-200)', borderRadius:4, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:strength.width, background:strength.color, borderRadius:4, transition:'width 0.3s' }}/>
                    </div>
                    <div style={{ fontSize:11, color:'var(--gray-400)', marginTop:6, lineHeight:1.5 }}>
                      Use 8+ characters with uppercase, numbers & symbols.
                    </div>
                  </div>
                )}

                <PasswordInput label="Confirm New Password" value={confPw} onChange={setConfPw} show={showConf} onToggle={()=>setShowConf(p=>!p)}/>

                {confPw && newPw !== confPw && (
                  <div style={{ fontSize:12, color:'#EF4444', marginTop:-10, marginBottom:12 }}>⚠️ Passwords do not match</div>
                )}

                <button onClick={savePassword} style={{
                  width:'100%', padding:'11px', marginTop:4,
                  background:'linear-gradient(135deg,#2563EB,#3B82F6)',
                  border:'none', borderRadius:10, color:'#fff',
                  fontSize:14, fontWeight:600, cursor:'pointer',
                  fontFamily:"'Inter',sans-serif",
                  boxShadow:'0 4px 16px rgba(37,99,235,0.3)',
                  transition:'all 0.18s',
                }}
                onMouseEnter={e=>{e.target.style.transform='translateY(-1px)';}}
                onMouseLeave={e=>{e.target.style.transform='translateY(0)';}}>
                  Update Password
                </button>

                {/* Security settings */}
                <div style={{ marginTop:24, borderTop:'1px solid var(--profile-panel-border,#E2E8F0)', paddingTop:20 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:14 }}>Security Settings</div>

                  {[
                    ['Two-Factor Authentication', 'Add an extra layer of security to your account', twoFA, setTwoFA],
                    ['Login Alerts', 'Get notified of new sign-ins to your account', loginAlerts, setLoginAlerts],
                  ].map(([title, desc, val, setter]) => (
                    <div key={title} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--profile-panel-border,#E2E8F0)' }}>
                      <div style={{ flex:1, paddingRight:12 }}>
                        <div style={{ fontSize:13.5, fontWeight:600, color:'var(--navy)' }}>{title}</div>
                        <div style={{ fontSize:12, color:'var(--gray-400)', marginTop:2 }}>{desc}</div>
                      </div>
                      <Toggle checked={val} onChange={setter}/>
                    </div>
                  ))}
                </div>

                {/* Last login */}
                <div style={{ marginTop:16, background:'var(--gray-100)', borderRadius:10, padding:'12px 14px' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>Last Login</div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>💻</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--navy)' }}>Chrome — Hyderabad, IN</div>
                      <div style={{ fontSize:12, color:'var(--gray-400)' }}>Today at 9:00 AM · IP 192.168.1.1</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── PREFERENCES TAB ── */}
            {tab === 'preferences' && (
              <>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:14 }}>Notifications</div>

                {[
                  ['Email Notifications', 'Receive updates via email', emailNotifs, setEmailNotifs, '📧'],
                  ['KYC Alerts', 'Get notified for new KYC submissions', kycAlerts, setKycAlerts, '🔔'],
                  ['Weekly Report', 'Receive a weekly summary report', weeklyReport, setWeeklyReport, '📊'],
                ].map(([title, desc, val, setter, emoji]) => (
                  <div key={title} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 14px', background:'var(--pref-item-bg,#F8FAFC)', borderRadius:10, marginBottom:8, border:'1px solid var(--profile-panel-border,#E2E8F0)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
                      <span style={{ fontSize:20 }}>{emoji}</span>
                      <div>
                        <div style={{ fontSize:13.5, fontWeight:600, color:'var(--navy)' }}>{title}</div>
                        <div style={{ fontSize:12, color:'var(--gray-400)', marginTop:1 }}>{desc}</div>
                      </div>
                    </div>
                    <Toggle checked={val} onChange={setter}/>
                  </div>
                ))}

                <div style={{ marginTop:20, borderTop:'1px solid var(--profile-panel-border,#E2E8F0)', paddingTop:20 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:14 }}>Appearance</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 14px', background:'var(--pref-item-bg,#F8FAFC)', borderRadius:10, border:'1px solid var(--profile-panel-border,#E2E8F0)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:20 }}>{dark ? '🌙' : '☀️'}</span>
                      <div>
                        <div style={{ fontSize:13.5, fontWeight:600, color:'var(--navy)' }}>Dark Mode</div>
                        <div style={{ fontSize:12, color:'var(--gray-400)', marginTop:1 }}>Currently {dark ? 'enabled' : 'disabled'}</div>
                      </div>
                    </div>
                    <Toggle checked={dark} onChange={() => document.querySelector('.dark-toggle')?.click()}/>
                  </div>
                </div>

                <button onClick={savePreferences} style={{
                  width:'100%', padding:'11px', marginTop:20,
                  background:'linear-gradient(135deg,#2563EB,#3B82F6)',
                  border:'none', borderRadius:10, color:'#fff',
                  fontSize:14, fontWeight:600, cursor:'pointer',
                  fontFamily:"'Inter',sans-serif",
                  boxShadow:'0 4px 16px rgba(37,99,235,0.3)',
                  transition:'all 0.18s',
                }}
                onMouseEnter={e=>{e.target.style.transform='translateY(-1px)';}}
                onMouseLeave={e=>{e.target.style.transform='translateY(0)';}}>
                  Save Preferences
                </button>

                {/* Sign out */}
                <button onClick={onLogout} style={{
                  width:'100%', padding:'11px', marginTop:10,
                  background:'transparent',
                  border:'1.5px solid #EF4444', borderRadius:10, color:'#EF4444',
                  fontSize:14, fontWeight:600, cursor:'pointer',
                  fontFamily:"'Inter',sans-serif",
                  transition:'all 0.18s',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='#FEF2F2';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)}/>}
    </div>
  );
}
