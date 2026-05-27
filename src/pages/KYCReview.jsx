import { useState, useContext, useRef, useEffect } from 'react';
import { AppCtx } from '../App';
import { kycRequests as init } from '../data/mockData';

const sMap = { Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed' };
const Badge = ({s}) => <span className={`badge ${sMap[s]||'b-pending'}`}>{s}</span>;

function Toast({msg,type}){ return <div className={`toast ${type==='ok'?'ok':'err'}`}>{type==='ok'?'✅':'❌'} {msg}</div>; }

/* ── Document Card ── */
function DocCard({ title, emoji, submitted, fields, flagged }) {
  if (!submitted) return (
    <div style={{ border:'2px dashed var(--gray-200)', borderRadius:12, padding:'20px 18px', display:'flex', alignItems:'center', gap:12, opacity:0.5 }}>
      <span style={{ fontSize:28 }}>{emoji}</span>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--gray-600)' }}>{title}</div>
        <div style={{ fontSize:12, color:'var(--gray-400)', marginTop:2 }}>Not submitted by user</div>
      </div>
    </div>
  );
  return (
    <div style={{ border:`2px solid ${flagged?'#FECACA':'var(--gray-200)'}`, borderRadius:12, overflow:'hidden', background: flagged?'#FFF5F5':'#fff' }}>
      {/* Doc preview area */}
      <div style={{ background: flagged?'#FEE2E2':'linear-gradient(135deg,#EFF6FF,#F5F3FF)', height:110, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, borderBottom:`1px solid ${flagged?'#FECACA':'var(--gray-200)'}` }}>
        <span style={{ fontSize:38 }}>{emoji}</span>
        <div style={{ fontSize:11, fontWeight:600, color: flagged?'#DC2626':'var(--gray-400)', letterSpacing:'0.5px', textTransform:'uppercase' }}>
          {flagged ? '⚠️ Flagged — Review carefully' : 'Document Preview'}
        </div>
      </div>
      {/* Doc fields */}
      <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--navy)', marginBottom:2, display:'flex', alignItems:'center', gap:6 }}>
          {emoji} {title}
          <span style={{ background:'#F0FDF4', color:'#059669', fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20 }}>Submitted ✓</span>
        </div>
        {fields.map(([label, value]) => (
          <div key={label} style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
            <span style={{ color:'var(--gray-400)', fontWeight:500 }}>{label}</span>
            <span style={{ color:'var(--navy)', fontWeight:600, fontFamily: label==='Number'?'monospace':'inherit' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Status Filter Dropdown ── */
function StatusFilterDropdown({ value, onChange, counts }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const options = [
    { label: 'All',        value: 'All',       dot: '#94A3B8' },
    { label: 'Pending',    value: 'Pending',   dot: '#D97706' },
    { label: 'In Review',  value: 'In Review', dot: '#2563EB' },
    { label: 'Approved',   value: 'Approved',  dot: '#059669' },
    { label: 'Failed',     value: 'Failed',    dot: '#DC2626' },
  ];

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '7px 14px',
          background: open ? '#EEF2FF' : 'var(--filter-btn-bg, #F5F3FF)',
          border: '1.5px solid var(--filter-btn-border, #C7D2FE)',
          borderRadius: 10,
          color: 'var(--filter-btn-color, #4F46E5)',
          fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Inter',sans-serif",
          transition: 'all 0.18s',
          whiteSpace: 'nowrap',
        }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        Filters
        {value !== 'All' && (
          <span style={{ background:'#4F46E5', color:'#fff', borderRadius:20, padding:'1px 6px', fontSize:10, fontWeight:700 }}>1</span>
        )}
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          style={{ transition:'transform 0.18s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: 'var(--dropdown-bg, #fff)',
          border: '1.5px solid var(--dropdown-border, #E2E8F0)',
          borderRadius: 12, padding: '6px',
          minWidth: 200,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          zIndex: 500,
          animation: 'fadeIn 0.15s ease',
        }}>
          <div style={{ padding:'6px 12px 8px', fontSize:10.5, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.8px' }}>
            Filter by Status
          </div>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: '9px 12px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: value === opt.value ? 600 : 400,
                color: value === opt.value ? '#4F46E5' : 'var(--dropdown-text, #374151)',
                background: value === opt.value ? '#EEF2FF' : 'transparent',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 9,
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = 'var(--dropdown-hover, #F9FAFB)'; }}
              onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ width:8, height:8, borderRadius:'50%', background:opt.dot, display:'inline-block', flexShrink:0 }}/>
              <span style={{ flex:1 }}>{opt.label}</span>
              <span style={{ fontSize:11, fontWeight:700, color: value===opt.value?'#4F46E5':'var(--gray-400)', background: value===opt.value?'#E0E7FF':'var(--gray-100)', padding:'1px 7px', borderRadius:20 }}>
                {counts[opt.value] ?? 0}
              </span>
              {value === opt.value && (
                <svg width="13" height="13" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          ))}
          {value !== 'All' && (
            <div style={{ borderTop:'1px solid var(--dropdown-border, #E2E8F0)', marginTop:4, paddingTop:4 }}>
              <div
                onClick={() => { onChange('All'); setOpen(false); }}
                style={{ padding:'8px 12px', borderRadius:8, fontSize:12, fontWeight:600, color:'#EF4444', cursor:'pointer', textAlign:'center' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Clear Filter
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Modal ── */
function Modal({user, onClose, onApprove, onReject}) {
  const [tab, setTab] = useState('details');
  const [reason, setReason] = useState('');
  if (!user) return null;

  const { documents: d } = user;
  const submittedCount = [d.aadhaar, d.pan, d.passport].filter(x => x.submitted).length + (d.selfie?.submitted ? 1 : 0);
  const isFailed = user.status === 'Failed';

  const aadhaarFields = d.aadhaar?.submitted ? [['Name', d.aadhaar.name],['DOB', d.aadhaar.dob],['Number', d.aadhaar.number],['Address', d.aadhaar.address]] : [];
  const panFields     = d.pan?.submitted     ? [['Name', d.pan.name],    ['DOB', d.pan.dob],    ['PAN No.', d.pan.number]] : [];
  const passportFields= d.passport?.submitted? [['Name', d.passport.name],['Passport No.', d.passport.number],['Expiry', d.passport.expiry],['Country', d.passport.country]] : [];

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{ maxWidth:780 }}>

        {/* Header */}
        <div className="modal-head">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div className="avatar" style={{ background:user.color, width:46, height:46, borderRadius:12, fontSize:16 }}>{user.initials}</div>
            <div>
              <h3>{user.name}</h3>
              <div style={{ fontSize:13, color:'var(--gray-400)', marginTop:2, display:'flex', alignItems:'center', gap:8 }}>
                {user.id} &nbsp;<Badge s={user.status}/>
                <span style={{ background:'#EFF6FF', color:'#2563EB', fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>
                  {submittedCount} documents submitted
                </span>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {['details','documents','action'].map(t=>(
            <button key={t} className={`mtab${tab===t?' act':''}`} onClick={()=>setTab(t)}>
              {t==='documents'?`Documents (${submittedCount})`:t==='action'?'Take Action':t[0].toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* ── DETAILS TAB ── */}
          {tab==='details' && <>
            <div style={{ marginBottom:20 }}>
              <div className="section-title">Personal Information</div>
              <div className="detail-grid">
                {[['Full Name',user.name],['User ID',user.id],['Email',user.email],['Phone',user.phone],['Date of Birth',user.dob],['Submitted On',user.submitted]].map(([l,v])=>(
                  <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div className="section-title">Address</div>
              <div style={{ fontSize:13.5, color:'var(--navy)', fontWeight:500 }}>{user.address}</div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div className="section-title">Submitted Documents</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {[['🪪','Aadhaar Card',d.aadhaar?.submitted],['💳','PAN Card',d.pan?.submitted],['📘','Passport',d.passport?.submitted],['🤳','Selfie',d.selfie?.submitted]].map(([e,l,s])=>(
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:20, background: s?'#F0FDF4':'var(--gray-100)', border:`1px solid ${s?'#BBF7D0':'var(--gray-200)'}` }}>
                    <span style={{ fontSize:14 }}>{e}</span>
                    <span style={{ fontSize:12, fontWeight:600, color: s?'#059669':'var(--gray-400)' }}>{l}</span>
                    {s?<span style={{ color:'#059669', fontSize:12 }}>✓</span>:<span style={{ color:'var(--gray-400)', fontSize:12 }}>—</span>}
                  </div>
                ))}
              </div>
            </div>
            {isFailed && user.rejectionReason && (
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'12px 14px' }}>
                <div style={{ fontSize:10.5, fontWeight:700, color:'#DC2626', letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:4 }}>Rejection Reason</div>
                <div style={{ fontSize:13, color:'#7F1D1D' }}>{user.rejectionReason}</div>
              </div>
            )}
          </>}

          {/* ── DOCUMENTS TAB ── */}
          {tab==='documents' && <>
            <div style={{ background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:10, padding:'10px 14px', marginBottom:18, fontSize:13, color:'#92400E' }}>
              ⚠️ Verify that all submitted documents show the <strong>same name, DOB, and address</strong> before approving.
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <DocCard
                title="Aadhaar Card" emoji="🪪"
                submitted={d.aadhaar?.submitted}
                fields={aadhaarFields}
                flagged={isFailed}
              />
              <DocCard
                title="PAN Card" emoji="💳"
                submitted={d.pan?.submitted}
                fields={panFields}
                flagged={isFailed}
              />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <DocCard
                title="Passport" emoji="📘"
                submitted={d.passport?.submitted}
                fields={passportFields}
                flagged={false}
              />

              {/* Selfie */}
              {d.selfie?.submitted ? (
                <div style={{ border:'2px solid var(--gray-200)', borderRadius:12, overflow:'hidden' }}>
                  <div style={{ background:'linear-gradient(135deg,#F0FDF4,#ECFDF5)', height:110, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, borderBottom:'1px solid var(--gray-200)' }}>
                    <span style={{ fontSize:38 }}>🤳</span>
                    <div style={{ fontSize:11, fontWeight:600, color:'var(--gray-400)', letterSpacing:'0.5px', textTransform:'uppercase' }}>Selfie Preview</div>
                  </div>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'var(--navy)', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                      🤳 Live Selfie
                      <span style={{ background:'#F0FDF4', color:'#059669', fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20 }}>Submitted ✓</span>
                    </div>
                    <div style={{ fontSize:12, color:'var(--gray-400)' }}>Check: face clearly visible, eyes open, neutral expression, no filters or headgear.</div>
                  </div>
                </div>
              ) : (
                <div style={{ border:'2px dashed var(--gray-200)', borderRadius:12, padding:'20px 18px', display:'flex', alignItems:'center', gap:12, opacity:0.5 }}>
                  <span style={{ fontSize:28 }}>🤳</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--gray-600)' }}>Selfie</div>
                    <div style={{ fontSize:12, color:'var(--gray-400)', marginTop:2 }}>Not submitted by user</div>
                  </div>
                </div>
              )}
            </div>

            {/* Cross-check banner */}
            <div style={{ marginTop:16, background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:'12px 16px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#1D4ED8', marginBottom:8 }}>📋 Cross-Check Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {[
                  ['Name match', d.aadhaar?.submitted && d.pan?.submitted ? '✅ Match' : '—'],
                  ['DOB match',  d.aadhaar?.submitted && d.pan?.submitted ? (d.aadhaar?.dob?.replace(/-/g,'/')===d.pan?.dob?'✅ Match':'⚠️ Mismatch') : '—'],
                  ['Selfie',     d.selfie?.submitted ? '✅ Submitted' : '❌ Missing'],
                ].map(([l,v])=>(
                  <div key={l} style={{ background:'white', borderRadius:8, padding:'8px 10px' }}>
                    <div style={{ fontSize:10.5, color:'var(--gray-400)', fontWeight:600, marginBottom:2 }}>{l}</div>
                    <div style={{ fontSize:12, fontWeight:600, color: v.startsWith('✅')?'#059669':v.startsWith('⚠️')?'#D97706':'var(--navy)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {/* ── ACTION TAB ── */}
          {tab==='action' && <>
            <div style={{ background:'#F8FAFC', borderRadius:12, padding:'14px 16px', marginBottom:20, border:'1px solid var(--gray-200)' }}>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--navy)', marginBottom:6 }}>Current Status</div>
              <Badge s={user.status}/>
            </div>
            <div style={{ marginBottom:20 }}>
              <div className="section-title">Approve KYC</div>
              <p style={{ fontSize:13, color:'var(--gray-600)', marginBottom:12, lineHeight:1.5 }}>Approving will activate the user's wallet and allow them to send/receive PYO tokens.</p>
              <button className="btn btn-success" style={{ width:'100%', padding:'11px', fontSize:13 }} onClick={()=>onApprove(user.id)}>
                ✅ Approve KYC & Activate Wallet
              </button>
            </div>
            <div style={{ border:'1px solid var(--gray-200)', borderRadius:12, padding:'16px' }}>
              <div className="section-title">Reject KYC</div>
              <p style={{ fontSize:13, color:'var(--gray-600)', marginBottom:10 }}>Provide a clear reason so the user knows what to fix:</p>
              <textarea rows={3} placeholder="e.g. Aadhaar & PAN name mismatch, selfie unclear..." value={reason} onChange={e=>setReason(e.target.value)}/>
              <button className="btn btn-danger" style={{ width:'100%', padding:'11px', fontSize:13, marginTop:10 }} onClick={()=>{if(reason.trim())onReject(user.id,reason);}}>
                ❌ Reject KYC
              </button>
              {!reason.trim() && <div style={{ fontSize:11, color:'var(--gray-400)', marginTop:5, textAlign:'center' }}>Enter a rejection reason first</div>}
            </div>
          </>}

        </div>
      </div>
    </div>
  );
}

export default function KYCReview(){
  const { confirm } = useContext(AppCtx);
  const [data,setData]   = useState(init);
  const [sel,setSel]     = useState(null);
  const [fStatus,setFS]  = useState('All');
  const [search,setSrch] = useState('');
  const [toast,setToast] = useState(null);
  const [page,setPage]   = useState(1);
  const perPage = 8;

  const showToast=(msg,type)=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3200); };

  const approve = id => {
    setData(p=>p.map(r=>r.id===id?{...r,status:'Approved'}:r));
    setSel(null); showToast('KYC Approved — Wallet activated!','ok');
  };
  const reject = (id,reason) => {
    setData(p=>p.map(r=>r.id===id?{...r,status:'Failed',rejectionReason:reason}:r));
    setSel(null); showToast('KYC Rejected. User notified.','err');
  };
  const quickApprove = id => {
    const user = data.find(r => r.id === id);
    confirm({
      title: 'Approve KYC',
      message: `Are you sure you want to approve KYC for ${user?.name}? Their wallet will be activated and they can start transacting PYO tokens.`,
      confirmLabel: '✅ Yes, Approve',
      cancelLabel: 'Cancel',
      type: 'success',
    }, () => { setData(p=>p.map(r=>r.id===id?{...r,status:'Approved'}:r)); showToast('KYC Approved — Wallet activated!','ok'); });
  };
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const quickReject = id => {
    setRejectTarget(id);
    setRejectReason('');
  };

  const submitQuickReject = () => {
    if (!rejectReason.trim()) return;
    setData(p=>p.map(r=>r.id===rejectTarget?{...r,status:'Failed',rejectionReason:rejectReason}:r));
    setRejectTarget(null);
    setRejectReason('');
    showToast('KYC Rejected. User notified.','err');
  };

  const counts = {
    All:data.length,
    Pending:data.filter(r=>r.status==='Pending').length,
    'In Review':data.filter(r=>r.status==='In Review').length,
    Approved:data.filter(r=>r.status==='Approved').length,
    Failed:data.filter(r=>r.status==='Failed').length,
  };

  const filtered = data.filter(r=>{
    const ms = fStatus==='All' || r.status===fStatus;
    const mq = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const totalPages = Math.max(1,Math.ceil(filtered.length/perPage));
  const paged      = filtered.slice((page-1)*perPage, page*perPage);

  const docsSummary = r => {
    const { documents: d } = r;
    return [d.aadhaar?.submitted&&'Aadhaar', d.pan?.submitted&&'PAN', d.passport?.submitted&&'Passport'].filter(Boolean).join(' · ') || '—';
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>KYC Review</h2><p>Review all submitted identity documents and approve or reject user KYC requests.</p></div>
      </div>



      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name or ID..." value={search} onChange={e=>{setSrch(e.target.value);setPage(1);}}/>
          </div>
          <StatusFilterDropdown value={fStatus} onChange={(v) => { setFS(v); setPage(1); }} counts={counts} />
          <div className="filter-count">{filtered.length} results</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Documents Submitted</th><th>Submitted On</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paged.map(r=>(
                <tr key={r.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar" style={{background:r.color}}>{r.initials}</div>
                      <div><div className="uname">{r.name}</div><div className="uid">{r.id}</div></div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                      {r.documents.aadhaar?.submitted  && <span className="doc-badge">🪪 Aadhaar</span>}
                      {r.documents.pan?.submitted       && <span className="doc-badge">💳 PAN</span>}
                      {r.documents.passport?.submitted  && <span className="doc-badge">📘 Passport</span>}
                      {r.documents.selfie?.submitted    && <span className="doc-badge">🤳 Selfie</span>}
                    </div>
                  </td>
                  <td style={{color:'var(--gray-400)',fontSize:13}}>{r.submitted}</td>
                  <td><Badge s={r.status}/></td>
                  <td>
                    <div className="act-group">
                      <button className="btn btn-outline" style={{fontSize:12,padding:'5px 11px'}} onClick={()=>setSel(r)}>👁 Review</button>
                      {(r.status==='Pending'||r.status==='In Review') && <>
                        <button className="btn btn-ghost icon-btn" title="Approve" onClick={()=>quickApprove(r.id)} style={{color:'var(--green)'}}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button className="btn btn-ghost icon-btn" title="Reject" onClick={()=>quickReject(r.id)} style={{color:'var(--red)'}}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length===0 && <div className="empty">No KYC requests match your filters.</div>}
        </div>

        <div className="pagination">
          <div className="pag-info">Showing {Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)} of {filtered.length}</div>
          <div className="pag-btns">
            <button className="pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
            {Array.from({length:totalPages},(_,i)=>(
              <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
            ))}
            <button className="pag-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
          </div>
        </div>
      </div>

      {sel && <Modal user={sel} onClose={()=>setSel(null)} onApprove={approve} onReject={reject}/>}

      {/* Quick Reject Modal */}
      {rejectTarget && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setRejectTarget(null)}>
          <div className="modal" style={{maxWidth:420}}>
            <div className="modal-head">
              <h3>Reject KYC</h3>
              <button className="btn btn-ghost icon-btn" onClick={()=>setRejectTarget(null)}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body">
              <p style={{fontSize:13.5,color:'var(--gray-600)',marginBottom:16,lineHeight:1.6}}>
                Please provide a clear reason so <strong>{data.find(r=>r.id===rejectTarget)?.name}</strong> knows exactly what to fix before resubmitting.
              </p>
              <textarea
                rows={4}
                placeholder="e.g. Aadhaar & PAN name mismatch, selfie is blurry, document is expired..."
                value={rejectReason}
                onChange={e=>setRejectReason(e.target.value)}
                autoFocus
              />
              {!rejectReason.trim() && <div style={{fontSize:11.5,color:'var(--gray-400)',marginTop:6}}>⚠️ Reason is required before rejecting.</div>}
            </div>
            <div className="modal-foot">
              <button className="btn btn-outline" onClick={()=>setRejectTarget(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={submitQuickReject} disabled={!rejectReason.trim()} style={{opacity:rejectReason.trim()?1:0.5}}>
                ❌ Reject KYC
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="toast-stack">{toast && <Toast msg={toast.msg} type={toast.type}/>}</div>
    </div>
  );
}
