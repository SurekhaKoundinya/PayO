import { useState, useEffect, useContext } from 'react';
import { users as init } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../App';
import { SkeletonTable } from '../components/Skeleton';

const kycMap = { Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed' };
const KYCBadge = ({s}) => <span className={`badge ${kycMap[s]||'b-pending'}`}>{s}</span>;

const statusMap = {
  Active:    { cls:'b-status-active',    dot:'#059669' },
  Inactive:  { cls:'b-status-inactive',  dot:'#64748B' },
  Suspended: { cls:'b-status-suspended', dot:'#D97706' },
  Banned:    { cls:'b-status-banned',    dot:'#DC2626' },
};
const StatusBadge = ({s}) => {
  const m = statusMap[s] || statusMap.Active;
  return (
    <span className={`badge ${m.cls}`} style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:m.dot, display:'inline-block' }}/>
      {s}
    </span>
  );
};

function UserModal({ u, onClose }) {
  if (!u) return null;
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{ maxWidth:480 }}>
        <div className="modal-head">
          <h3>User Profile</h3>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div style={{ textAlign:'center', marginBottom:22 }}>
            <div style={{ width:72, height:72, borderRadius:18, background:u.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'#fff', margin:'0 auto 12px' }}>{u.initials}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:'var(--navy)' }}>{u.name}</div>
            <div style={{ fontSize:13, color:'var(--gray-400)', marginTop:2 }}>{u.id}</div>
            <div style={{ marginTop:10, display:'flex', justifyContent:'center', gap:8 }}>
              <KYCBadge s={u.kyc}/>
              <StatusBadge s={u.accountStatus}/>
            </div>
          </div>
          <div className="detail-grid">
            {[['Email',u.email],['Phone',u.phone],['KYC Status',u.kyc],['Account Status',u.accountStatus],['Wallet',u.wallet],['Joined',u.joined]].map(([l,v])=>(
              <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
            ))}
          </div>
        </div>
        <div className="modal-foot"><button className="btn btn-outline" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default function Users() {
  const { confirm } = useContext(AppCtx);
  const navigate    = useNavigate();

  // Add accountStatus to each user
  const [users, setUsers] = useState(() =>
    init.map((u, i) => ({
      ...u,
      accountStatus: ['Active','Active','Active','Active','Suspended','Active','Active','Active','Active','Banned','Active','Inactive'][i] || 'Active',
    }))
  );

  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [fKYC, setFKYC]         = useState('All');
  const [fStatus, setFStatus]   = useState('All');
  const [sel, setSel]           = useState(null);
  const [page, setPage]         = useState(1);
  const [toast, setToast]       = useState(null);
  const per = 8;

  // Simulate page load skeleton
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg, type='ok') => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const changeStatus = (id, newStatus) => {
    setUsers(prev => prev.map(u => u.id===id ? {...u, accountStatus:newStatus} : u));
    showToast(`User ${newStatus === 'Active' ? 'reactivated' : newStatus.toLowerCase()} successfully.`, newStatus==='Banned'?'err':'ok');
  };

  const handleBan = (u) => {
    confirm({
      title: 'Ban User',
      message: `Are you sure you want to permanently ban ${u.name}? They will lose all access to PayO.`,
      confirmLabel: '🚫 Yes, Ban User',
      cancelLabel: 'Cancel',
      type: 'danger',
    }, () => changeStatus(u.id, 'Banned'));
  };

  const handleSuspend = (u) => {
    confirm({
      title: u.accountStatus === 'Suspended' ? 'Reactivate User' : 'Suspend User',
      message: u.accountStatus === 'Suspended'
        ? `Reactivate ${u.name}'s account? They will regain access to PayO.`
        : `Suspend ${u.name}'s account temporarily? They won't be able to log in or transact.`,
      confirmLabel: u.accountStatus === 'Suspended' ? '✅ Reactivate' : '⏸ Suspend',
      cancelLabel: 'Cancel',
      type: u.accountStatus === 'Suspended' ? 'success' : 'info',
    }, () => changeStatus(u.id, u.accountStatus === 'Suspended' ? 'Active' : 'Suspended'));
  };

  const filtered = users.filter(u => {
    const mk = fKYC==='All' || u.kyc===fKYC;
    const ms = fStatus==='All' || u.accountStatus===fStatus;
    const mq = !search || u.name.toLowerCase().includes(search.toLowerCase())
                       || u.email.toLowerCase().includes(search.toLowerCase())
                       || u.id.toLowerCase().includes(search.toLowerCase());
    return mk && ms && mq;
  });

  const tp    = Math.max(1, Math.ceil(filtered.length / per));
  const paged = filtered.slice((page-1)*per, page*per);

  const counts = {
    Active:    users.filter(u=>u.accountStatus==='Active').length,
    Inactive:  users.filter(u=>u.accountStatus==='Inactive').length,
    Suspended: users.filter(u=>u.accountStatus==='Suspended').length,
    Banned:    users.filter(u=>u.accountStatus==='Banned').length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Users</h2><p>Manage all registered PayO users.</p></div>
        <div style={{ display:'flex', gap:10 }}>
          {[['12,450','Total'],['10,850','Verified'],['245','Pending']].map(([v,l])=>(
            <div key={l} style={{ background:'var(--stat-card-bg,#fff)', border:'1.5px solid var(--gray-200)', borderRadius:10, padding:'9px 16px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:'var(--navy)' }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--gray-400)', fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status summary chips */}
      <div style={{ display:'flex', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        {[['All',filtered.length,'#6B7280'],['Active',counts.Active,'#059669'],['Inactive',counts.Inactive,'#64748B'],['Suspended',counts.Suspended,'#D97706'],['Banned',counts.Banned,'#DC2626']].map(([s,c,col])=>(
          <div key={s} onClick={()=>{setFStatus(s==='All'?'All':s);setPage(1);}}
            style={{
              display:'flex', alignItems:'center', gap:7, padding:'7px 14px',
              borderRadius:20, cursor:'pointer', fontSize:12.5, fontWeight:600,
              background: fStatus===(s==='All'?'All':s) ? col : 'var(--stat-card-bg,#fff)',
              color:       fStatus===(s==='All'?'All':s) ? '#fff' : col,
              border:`1.5px solid ${col}44`,
              transition:'all 0.18s',
            }}>
            {s !== 'All' && <span style={{ width:7, height:7, borderRadius:'50%', background: fStatus===s?'rgba(255,255,255,0.8)':col, display:'inline-block' }}/>}
            {s}
            <span style={{ background:'rgba(0,0,0,0.12)', borderRadius:20, padding:'1px 7px', fontSize:11 }}>{c}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name, email or ID..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
          </div>
          <select className="filter-select" value={fKYC} onChange={e=>{setFKYC(e.target.value);setPage(1);}}>
            {['All KYC','Pending','In Review','Approved','Failed'].map(s=><option key={s} value={s==='All KYC'?'All':s}>{s}</option>)}
          </select>
          <div className="filter-count">{filtered.length} users</div>
        </div>

        <div className="table-wrap">
          {loading ? <SkeletonTable rows={6} cols={7}/> : (
            <table>
              <thead>
                <tr><th>User</th><th>Email</th><th>Phone</th><th>KYC</th><th>Status</th><th>Wallet</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {paged.map(u => (
                  <tr key={u.id} style={{ opacity: u.accountStatus==='Banned'?0.6:1 }}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" style={{ background:u.color, position:'relative' }}>
                          {u.initials}
                          {u.accountStatus==='Banned' && (
                            <span style={{ position:'absolute', bottom:-3, right:-3, fontSize:10, background:'#EF4444', borderRadius:'50%', width:14, height:14, display:'flex', alignItems:'center', justifyContent:'center' }}>🚫</span>
                          )}
                          {u.accountStatus==='Suspended' && (
                            <span style={{ position:'absolute', bottom:-3, right:-3, fontSize:10, background:'#F59E0B', borderRadius:'50%', width:14, height:14, display:'flex', alignItems:'center', justifyContent:'center' }}>⏸</span>
                          )}
                        </div>
                        <div><div className="uname">{u.name}</div><div className="uid">{u.id}</div></div>
                      </div>
                    </td>
                    <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.email}</td>
                    <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.phone}</td>
                    <td><KYCBadge s={u.kyc}/></td>
                    <td><StatusBadge s={u.accountStatus}/></td>
                    <td style={{ fontWeight:600, color:u.wallet==='0 PYO'?'var(--gray-400)':'var(--green)' }}>{u.wallet}</td>
                    <td>
                      <div className="act-group">
                        <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 10px' }} onClick={()=>setSel(u)}>View</button>
                        {(u.kyc==='Pending'||u.kyc==='In Review') && (
                          <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 10px' }} onClick={()=>navigate('/kyc')}>KYC</button>
                        )}
                        {u.accountStatus !== 'Banned' && (
                          <button
                            onClick={() => u.accountStatus==='Suspended' ? handleSuspend(u) : handleSuspend(u)}
                            style={{ fontSize:11, padding:'5px 10px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:600, background: u.accountStatus==='Suspended'?'#F0FDF4':'#FFF7ED', color: u.accountStatus==='Suspended'?'#059669':'#D97706', transition:'all 0.15s' }}
                            title={u.accountStatus==='Suspended'?'Reactivate':'Suspend'}
                          >
                            {u.accountStatus==='Suspended' ? '✅ Reactivate' : '⏸ Suspend'}
                          </button>
                        )}
                        {u.accountStatus !== 'Banned' && (
                          <button onClick={()=>handleBan(u)}
                            style={{ fontSize:11, padding:'5px 10px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:600, background:'#FEF2F2', color:'#DC2626', transition:'all 0.15s' }}
                            title="Ban user">
                            🚫 Ban
                          </button>
                        )}
                        {u.accountStatus === 'Banned' && (
                          <button onClick={()=>changeStatus(u.id,'Active')}
                            style={{ fontSize:11, padding:'5px 10px', borderRadius:8, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:600, background:'#F0FDF4', color:'#059669' }}>
                            ♻️ Unban
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && paged.length===0 && <div className="empty">No users match your filters.</div>}
        </div>

        <div className="pagination">
          <div className="pag-info">Showing {Math.min((page-1)*per+1,filtered.length)}–{Math.min(page*per,filtered.length)} of {filtered.length}</div>
          <div className="pag-btns">
            <button className="pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
            {Array.from({length:tp},(_,i)=><button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>)}
            <button className="pag-btn" disabled={page===tp} onClick={()=>setPage(p=>p+1)}>›</button>
          </div>
        </div>
      </div>

      {sel && <UserModal u={sel} onClose={()=>setSel(null)}/>}

      {toast && (
        <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, background:toast.type==='ok'?'#10B981':'#EF4444', color:'#fff', padding:'13px 18px', borderRadius:12, fontSize:14, fontWeight:500, boxShadow:'0 8px 32px rgba(0,0,0,0.2)', display:'flex', alignItems:'center', gap:9, animation:'tIn 0.3s ease' }}>
          {toast.type==='ok'?'✅':'❌'} {toast.msg}
        </div>
      )}
    </div>
  );
}
