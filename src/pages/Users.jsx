import { useState } from 'react';
import { users as init } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const sMap = { Pending:'b-pending', 'In Review':'b-review', Approved:'b-approved', Failed:'b-failed' };
const Badge = ({ s }) => <span className={`badge ${sMap[s]||'b-pending'}`}>{s}</span>;

function UserModal({ u, onClose }) {
  if (!u) return null;

  // Use bankDetails directly from the user object (independent of KYC docs)
  const bank = u.bankDetails || null;
  const hasBankDetails = !!(bank?.accountNumber);

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 500 }}>

        {/* Header */}
        <div className="modal-head">
          <h3>User Profile</h3>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">

          {/* Avatar + Name */}
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{
              width:74, height:74, borderRadius:20, background:u.color,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:26, fontWeight:700, color:'#fff', margin:'0 auto 12px',
              boxShadow:`0 6px 20px ${u.color}44`,
            }}>{u.initials}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:21, fontWeight:800, color:'var(--navy)' }}>{u.name}</div>
            <div style={{ fontSize:13, color:'var(--gray-400)', marginTop:3 }}>{u.id}</div>
            <div style={{ marginTop:9 }}><Badge s={u.kyc}/></div>
          </div>

          {/* Personal Details */}
          <div style={{ marginBottom:20 }}>
            <div style={{
              fontSize:10.5, fontWeight:700, color:'var(--gray-400)',
              textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:10,
              display:'flex', alignItems:'center', gap:7,
            }}>
              <div style={{ width:22, height:22, borderRadius:6, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>👤</div>
              Personal Details
            </div>
            <div className="detail-grid">
              {[
                ['Email',          u.email],
                ['Phone',          u.phone],
                ['KYC Status',     u.kyc],
                ['Wallet Balance', u.wallet],
                ['Joined',         u.joined],
              ].map(([l, v]) => (
                <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <div style={{
              fontSize:10.5, fontWeight:700, color:'var(--gray-400)',
              textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:10,
              display:'flex', alignItems:'center', gap:7,
            }}>
              <div style={{ width:22, height:22, borderRadius:6, background:'#F0F9FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>🏦</div>
              Bank Details
            </div>

            {hasBankDetails ? (
              <div style={{
                border:'2px solid #BAE6FD',
                borderRadius:14, overflow:'hidden',
                boxShadow:'0 2px 12px rgba(14,165,233,0.08)',
              }}>
                {/* Bank header strip */}
                <div style={{
                  background:'linear-gradient(135deg,#F0F9FF,#E0F2FE)',
                  padding:'12px 16px',
                  display:'flex', alignItems:'center', gap:12,
                  borderBottom:'1px solid #BAE6FD',
                }}>
                  <div style={{
                    width:40, height:40, borderRadius:10, flexShrink:0,
                    background:'rgba(14,165,233,0.15)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
                  }}>🏦</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'var(--navy)' }}>{bank.bankName}</div>
                    <div style={{ fontSize:11.5, color:'#0EA5E9', fontWeight:600, marginTop:1 }}>Primary Bank Account</div>
                  </div>
                  <div style={{ marginLeft:'auto' }}>
                    <span style={{ background:'#F0FDF4', color:'#059669', fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:20 }}>Verified ✓</span>
                  </div>
                </div>

                {/* Bank fields */}
                <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:10 }}>
                  {[
                    ['Account Number', bank.accountNumber],
                    ['IFSC Code',      bank.ifsc],
                    ['Branch Name',    bank.bankName + ' — Main Branch'],
                    ['Account Holder', bank.accountHolder],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
                      <span style={{ fontSize:12, color:'var(--gray-400)', fontWeight:500, flexShrink:0 }}>{label}</span>
                      <span style={{
                        fontSize:12, fontWeight:700, color:'var(--navy)',
                        fontFamily: (label==='Account Number'||label==='IFSC Code') ? 'monospace' : 'inherit',
                        textAlign:'right',
                      }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Not submitted state — attention-grabbing alert */
              <div style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1.5px solid #FED7AA',
                boxShadow: '0 4px 20px rgba(234,88,12,0.10)',
              }}>
                {/* Body */}
                <div style={{
                  background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
                  padding: '18px 18px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(234,88,12,0.12)',
                    border: '1.5px solid rgba(234,88,12,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>🏦</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#9A3412', letterSpacing: '-0.2px', marginBottom: 4 }}>
                      Bank Details Not Submitted
                    </div>
                    <div style={{ fontSize: 12.5, color: '#C2410C', lineHeight: 1.55 }}>
                      This user has not linked any bank account yet. KYC verification may be incomplete.
                    </div>

                    {/* Status pill */}
                    <div style={{ marginTop: 10 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        background: 'rgba(234,88,12,0.15)',
                        border: '1px solid rgba(234,88,12,0.3)',
                        borderRadius: 20, padding: '3px 10px',
                        fontSize: 11, fontWeight: 700, color: '#EA580C',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EA580C', display: 'inline-block' }}/>
                        Pending — No Bank Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const [users] = useState(init);
  const [search, setSearch] = useState('');
  const [fKYC, setFKYC]     = useState('All');
  const [sel, setSel]       = useState(null);
  const [page, setPage]     = useState(1);
  const navigate = useNavigate();
  const per = 8;

  const filtered = users.filter(u => {
    const mk = fKYC==='All' || u.kyc===fKYC;
    const ms = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase());
    return mk && ms;
  });
  const tp    = Math.max(1, Math.ceil(filtered.length / per));
  const paged = filtered.slice((page-1)*per, page*per);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Users</h2><p>Manage all registered PayO users.</p></div>
        <div style={{ display:'flex', gap:10 }}>
          {[['12,450','Total'],['10,850','Verified'],['245','Pending']].map(([v,l]) => (
            <div key={l} style={{ background:'#fff', border:'1.5px solid var(--gray-200)', borderRadius:10, padding:'9px 16px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:800, color:'var(--navy)' }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--gray-400)', fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name, email or ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/>
          </div>
          <select className="filter-select" value={fKYC} onChange={e => { setFKYC(e.target.value); setPage(1); }}>
            {['All','Pending','In Review','Approved','Failed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="filter-count">{filtered.length} users</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>User</th><th>Email</th><th>Phone</th><th>KYC</th><th>Wallet</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paged.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar" style={{ background:u.color }}>{u.initials}</div>
                      <div><div className="uname">{u.name}</div><div className="uid">{u.id}</div></div>
                    </div>
                  </td>
                  <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.email}</td>
                  <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.phone}</td>
                  <td><Badge s={u.kyc}/></td>
                  <td style={{ fontWeight:600, color:u.wallet==='0 PYO'?'var(--gray-400)':'var(--green)' }}>{u.wallet}</td>
                  <td style={{ fontSize:13, color:'var(--gray-400)' }}>{u.joined}</td>
                  <td>
                    <div className="act-group">
                      <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px' }} onClick={() => setSel(u)}>View</button>
                      {(u.kyc==='Pending'||u.kyc==='In Review') && (
                        <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px' }} onClick={() => navigate('/kyc')}>KYC</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length===0 && <div className="empty">No users found.</div>}
        </div>

        <div className="pagination">
          <div className="pag-info">Showing {Math.min((page-1)*per+1,filtered.length)}–{Math.min(page*per,filtered.length)} of {filtered.length}</div>
          <div className="pag-btns">
            <button className="pag-btn" disabled={page===1} onClick={() => setPage(p => p-1)}>‹</button>
            {Array.from({length:tp}, (_,i) => (
              <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
            ))}
            <button className="pag-btn" disabled={page===tp} onClick={() => setPage(p => p+1)}>›</button>
          </div>
        </div>
      </div>

      {sel && <UserModal u={sel} onClose={() => setSel(null)}/>}
    </div>
  );
}
