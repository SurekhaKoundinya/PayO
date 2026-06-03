import { useState, useContext, useRef, useEffect } from 'react';
import { AppCtx } from '../App';
import { kycRequests as init } from '../data/mockData';

const sMap = { Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed' };
const Badge = ({s}) => <span className={`badge ${sMap[s]||'b-pending'}`}>{s}</span>;
function Toast({msg,type}){ return <div className={`toast ${type==='ok'?'ok':'err'}`}>{type==='ok'?'✅':'❌'} {msg}</div>; }

/* ─────────────────────────────────────────────
   Generates a full-page HTML preview for a doc
   and opens it in a new browser tab
───────────────────────────────────────────── */
function openDocPreview({ title, emoji, color, headerBg, fields, note, userName }) {
  const monoLabels = ['Aadhaar No.', 'PAN No.', 'Account No.', 'IFSC Code', 'IFSC'];
  const rows = fields.map(([l, v]) => {
    const ff = monoLabels.includes(l) ? 'monospace' : 'inherit';
    return [
      '<tr>',
      '<td style="padding:11px 16px;color:#64748B;font-size:13px;font-weight:500;border-bottom:1px solid #F1F5F9;width:40%">' + l + '</td>',
      '<td style="padding:11px 16px;color:#0D1B3E;font-size:13px;font-weight:700;border-bottom:1px solid #F1F5F9;font-family:' + ff + '">' + v + '</td>',
      '</tr>',
    ].join('');
  }).join('');

  const noteHtml = note ? '<div style="padding:16px 32px"><div class="note">&#8505;&#65039; ' + note + '</div></div>' : '';

  const html = '<!DOCTYPE html>'
    + '<html><head><meta charset="UTF-8"/>'
    + '<title>' + title + ' \u2014 ' + userName + '</title>'
    + '<style>'
    + '*{box-sizing:border-box;margin:0;padding:0}'
    + "body{font-family:'Segoe UI',system-ui,sans-serif;background:#F8FAFC;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:40px 20px}"
    + '.card{background:#fff;border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,0.10);width:100%;max-width:600px;overflow:hidden}'
    + '.header{background:' + headerBg + ';padding:32px 32px 24px;display:flex;align-items:center;gap:18px}'
    + '.icon-wrap{width:64px;height:64px;border-radius:16px;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:34px;flex-shrink:0;box-shadow:0 4px 14px rgba(0,0,0,0.12)}'
    + '.header-text h1{font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.3px}'
    + '.header-text p{font-size:13px;color:rgba(255,255,255,0.75);margin-top:4px}'
    + '.badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.35);border-radius:20px;padding:4px 12px;font-size:11.5px;color:#fff;font-weight:600;margin-top:10px}'
    + '.watermark{padding:14px 32px;background:rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.12);font-size:11px;color:rgba(255,255,255,0.55);font-weight:600;letter-spacing:1.5px;text-transform:uppercase}'
    + 'table{width:100%;border-collapse:collapse}'
    + '.footer{padding:20px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center}'
    + '.footer-left{font-size:11.5px;color:#94A3B8;font-weight:500}'
    + '.stamp-inner{border:3px solid ' + color + ';border-radius:12px;padding:8px 18px;color:' + color + ';font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;opacity:0.85;transform:rotate(-8deg);display:inline-block}'
    + '.note{padding:12px 16px;background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;font-size:12.5px;color:#92400E}'
    + '</style></head><body>'
    + '<div style="width:100%;max-width:600px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between">'
    + '<div style="font-size:13px;color:#64748B;font-weight:500">PayO Admin Portal \u2014 Document Preview</div>'
    + '<div style="font-size:12px;color:#94A3B8">For internal review only</div>'
    + '</div>'
    + '<div class="card">'
    + '<div class="header">'
    + '<div class="icon-wrap">' + emoji + '</div>'
    + '<div class="header-text"><h1>' + title + '</h1>'
    + '<p>Submitted by <strong>' + userName + '</strong></p>'
    + '<div class="badge">&#10003; Verified &amp; Submitted</div>'
    + '</div></div>'
    + '<div class="watermark">&#128274; Confidential \u2014 Authorised Admin Access Only</div>'
    + '<table>' + rows + '</table>'
    + noteHtml
    + '<div class="footer">'
    + '<div class="footer-left">Submitted via PayO App &nbsp;&bull;&nbsp; All data encrypted</div>'
    + '<div class="stamp"><div class="stamp-inner">Submitted &#10003;</div></div>'
    + '</div></div>'
    + '<div style="margin-top:20px;font-size:12px;color:#94A3B8;text-align:center">This document preview is generated for admin review purposes only.<br/>Original files are securely stored on PayO servers.</div>'
    + '</body></html>';

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

/* ─────────────────────────────────────────────
   Clickable preview thumbnail used inside cards
───────────────────────────────────────────── */
function PreviewThumb({ label, emoji, color, headerBg, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', borderRadius: 10, overflow: 'hidden',
        cursor: 'pointer', marginBottom: 12,
        border: `1.5px solid ${hover ? color : 'var(--gray-200)'}`,
        transition: 'all 0.18s',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 6px 20px ${color}28` : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Preview area */}
      <div style={{
        background: headerBg, height: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 6,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        }}>{emoji}</div>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Document Preview
        </div>
      </div>
      {/* Hover overlay */}
      {hover && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 5,
        }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="none" stroke="#1D4ED8" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.4px' }}>Open Full View</div>
        </div>
      )}
      {/* Footer bar */}
      <div style={{
        padding: '6px 10px', background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--navy)' }}>{label}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#059669', background: '#F0FDF4', padding: '2px 7px', borderRadius: 20 }}>✓</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Identity Doc Card (Aadhaar / PAN)
───────────────────────────────────────────── */
function IdDocCard({ title, emoji, fields, flagged, accentColor, accentBg, onPreview }) {
  return (
    <div style={{
      border: `2px solid ${flagged ? '#FECACA' : accentColor + '33'}`,
      borderRadius: 14, overflow: 'hidden', background: '#fff',
      boxShadow: `0 2px 14px ${flagged ? 'rgba(239,68,68,0.06)' : accentColor + '12'}`,
    }}>
      <PreviewThumb label={title} emoji={emoji} color={accentColor} headerBg={flagged ? '#FEE2E2' : accentBg} onClick={onPreview} />
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{title}</span>
          {flagged
            ? <span style={{ background:'#FEE2E2', color:'#DC2626', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:20 }}>⚠️ Flagged</span>
            : <span style={{ background:'#F0FDF4', color:'#059669', fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20 }}>Submitted ✓</span>
          }
        </div>
        {fields.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 8 }}>
            <span style={{ color: 'var(--gray-400)', fontWeight: 500, flexShrink: 0 }}>{label}</span>
            <span style={{
              color: 'var(--navy)', fontWeight: 600, textAlign: 'right',
              fontFamily: (label === 'Number' || label === 'PAN No.') ? 'monospace' : 'inherit',
              wordBreak: 'break-all',
            }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Selfie Card
───────────────────────────────────────────── */
function SelfieCard({ flagged, onPreview }) {
  return (
    <div style={{
      border: `2px solid ${flagged ? '#FECACA' : '#BBF7D0'}`,
      borderRadius: 14, overflow: 'hidden', background: '#fff',
      boxShadow: '0 2px 14px rgba(16,185,129,0.08)',
    }}>
      <PreviewThumb
        label="Live Selfie" emoji="🤳"
        color="#10B981"
        headerBg={flagged ? '#FEE2E2' : 'linear-gradient(135deg,#F0FDF4,#ECFDF5)'}
        onClick={onPreview}
      />
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>Live Selfie</span>
          <span style={{ background:'#F0FDF4', color:'#059669', fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20 }}>Captured ✓</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.5 }}>
          Verify: face clearly visible, eyes open, no filters or headgear.
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bank Doc Card (Cheque / Statement / Passbook)
───────────────────────────────────────────── */
function BankDocCard({ icon, title, subtitle, accentColor, accentBg, fields, flagged, onPreview }) {
  return (
    <div style={{
      border: `2px solid ${flagged ? '#FECACA' : accentColor + '33'}`,
      borderRadius: 14, overflow: 'hidden', background: '#fff',
      boxShadow: `0 2px 14px ${accentColor}10`,
    }}>
      <PreviewThumb label={title} emoji={icon} color={accentColor} headerBg={flagged ? '#FEE2E2' : accentBg} onClick={onPreview} />
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--navy)' }}>{title}</span>
          <span style={{ background:'#F0FDF4', color:'#059669', fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:20 }}>Submitted ✓</span>
        </div>
        {subtitle && <div style={{ fontSize: 11, color: accentColor, fontWeight: 600, marginBottom: 2 }}>{subtitle}</div>}
        {fields.map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 8 }}>
            <span style={{ color: 'var(--gray-400)', fontWeight: 500, flexShrink: 0 }}>{l}</span>
            <span style={{
              color: 'var(--navy)', fontWeight: 600, textAlign: 'right',
              fontFamily: (l === 'Account No.' || l === 'IFSC') ? 'monospace' : 'inherit',
            }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section Divider
───────────────────────────────────────────── */
function SectionDivider({ icon, label, bg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Status Filter Dropdown
───────────────────────────────────────────── */
function StatusFilterDropdown({ value, onChange, counts }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const options = [
    { label:'All',       value:'All',       dot:'#94A3B8' },
    { label:'Pending',   value:'Pending',   dot:'#D97706' },
    { label:'In Review', value:'In Review', dot:'#2563EB' },
    { label:'Approved',  value:'Approved',  dot:'#059669' },
    { label:'Failed',    value:'Failed',    dot:'#DC2626' },
  ];
  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 14px', background: open?'#EEF2FF':'var(--filter-btn-bg,#F5F3FF)', border:'1.5px solid var(--filter-btn-border,#C7D2FE)', borderRadius:10, color:'var(--filter-btn-color,#4F46E5)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.18s', whiteSpace:'nowrap' }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filters
        {value !== 'All' && <span style={{ background:'#4F46E5', color:'#fff', borderRadius:20, padding:'1px 6px', fontSize:10, fontWeight:700 }}>1</span>}
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ transition:'transform 0.18s', transform: open?'rotate(180deg)':'rotate(0deg)' }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, background:'var(--dropdown-bg,#fff)', border:'1.5px solid var(--dropdown-border,#E2E8F0)', borderRadius:12, padding:'6px', minWidth:200, boxShadow:'0 8px 32px rgba(0,0,0,0.12)', zIndex:500 }}>
          <div style={{ padding:'6px 12px 8px', fontSize:10.5, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.8px' }}>Filter by Status</div>
          {options.map(opt => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{ padding:'9px 12px', borderRadius:8, fontSize:13, fontWeight: value===opt.value?600:400, color: value===opt.value?'#4F46E5':'var(--dropdown-text,#374151)', background: value===opt.value?'#EEF2FF':'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:9, transition:'background 0.12s' }}
              onMouseEnter={e => { if (value!==opt.value) e.currentTarget.style.background='var(--dropdown-hover,#F9FAFB)'; }}
              onMouseLeave={e => { if (value!==opt.value) e.currentTarget.style.background='transparent'; }}
            >
              <span style={{ width:8, height:8, borderRadius:'50%', background:opt.dot, display:'inline-block', flexShrink:0 }}/>
              <span style={{ flex:1 }}>{opt.label}</span>
              <span style={{ fontSize:11, fontWeight:700, color: value===opt.value?'#4F46E5':'var(--gray-400)', background: value===opt.value?'#E0E7FF':'var(--gray-100)', padding:'1px 7px', borderRadius:20 }}>{counts[opt.value]??0}</span>
              {value===opt.value && <svg width="13" height="13" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          ))}
          {value !== 'All' && (
            <div style={{ borderTop:'1px solid var(--dropdown-border,#E2E8F0)', marginTop:4, paddingTop:4 }}>
              <div onClick={() => { onChange('All'); setOpen(false); }} style={{ padding:'8px 12px', borderRadius:8, fontSize:12, fontWeight:600, color:'#EF4444', cursor:'pointer', textAlign:'center' }}
                onMouseEnter={e => e.currentTarget.style.background='#FEF2F2'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >Clear Filter</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Review Modal
───────────────────────────────────────────── */
function Modal({ user, onClose, onApprove, onReject }) {
  const [tab, setTab]       = useState('details');
  const [reason, setReason] = useState('');
  if (!user) return null;

  const { documents: d } = user;
  const bank      = d.bankDocs;
  const isFailed  = user.status === 'Failed';

  const aadhaarFields = [['Name', d.aadhaar.name], ['DOB', d.aadhaar.dob], ['Number', d.aadhaar.number], ['Address', d.aadhaar.address]];
  const panFields     = [['Name', d.pan.name], ['DOB', d.pan.dob], ['PAN No.', d.pan.number]];
  const chequeFields  = [['Bank', bank.cancelCheque.bankName], ['Account No.', bank.cancelCheque.accountNumber], ['IFSC', bank.cancelCheque.ifsc], ['Account Holder', bank.cancelCheque.accountHolder]];
  const statFields    = [['Bank', bank.bankStatement.bankName], ['Period', bank.bankStatement.period], ['Pages', bank.bankStatement.pages + ' pages']];
  const pbFields      = [['Bank', bank.passbook.bankName], ['Period', bank.passbook.period]];

  const nameMatch = d.aadhaar.name.toLowerCase().replace(/\s+/g,'') === d.pan.name.toLowerCase().replace(/\s+/g,'');
  const dobMatch  = d.aadhaar.dob.replace(/-/g,'/') === d.pan.dob;

  // Preview helpers — opens new tab with formatted doc view
  const preview = (cfg) => openDocPreview({ ...cfg, userName: user.name });

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 860 }}>

        {/* Header */}
        <div className="modal-head">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div className="avatar" style={{ background:user.color, width:46, height:46, borderRadius:12, fontSize:16 }}>{user.initials}</div>
            <div>
              <h3>{user.name}</h3>
              <div style={{ fontSize:13, color:'var(--gray-400)', marginTop:2, display:'flex', alignItems:'center', gap:8 }}>
                {user.id} &nbsp;<Badge s={user.status}/>
                <span style={{ background:'#EFF6FF', color:'#2563EB', fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>6 documents submitted</span>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {[['details','Details'],['documents','Documents (6)'],['action','Take Action']].map(([key,label]) => (
            <button key={key} className={`mtab${tab===key?' act':''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

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
                {[
                  ['🪪','Aadhaar Card'],['💳','PAN Card'],['🤳','Live Selfie'],
                  ['🏦','Cancel Cheque'],['📄','Bank Statement'],['📒','Passbook'],
                ].map(([e,l]) => (
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:20, background:'#F0FDF4', border:'1px solid #BBF7D0' }}>
                    <span style={{ fontSize:14 }}>{e}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:'#059669' }}>{l}</span>
                    <span style={{ color:'#059669', fontSize:12 }}>✓</span>
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
            {isFailed && (
              <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'10px 14px', marginBottom:14, fontSize:13, color:'#991B1B', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>⚠️</span>
                <span>This KYC was <strong>rejected</strong>. Review all documents carefully before re-approving.</span>
              </div>
            )}
            <div style={{ background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:10, padding:'10px 14px', marginBottom:18, fontSize:13, color:'#92400E', display:'flex', alignItems:'center', gap:8 }}>
              <span>⚠️</span>
              <span>Verify all documents show the <strong>same name, DOB, and address</strong>. Click any preview to open the full document in a new tab.</span>
            </div>

            {/* Identity Documents */}
            <div style={{ marginBottom:20 }}>
              <SectionDivider icon="🪪" label="Identity Documents" bg="#EFF6FF" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <IdDocCard
                  title="Aadhaar Card" emoji="🪪"
                  fields={aadhaarFields} flagged={isFailed}
                  accentColor="#3B82F6" accentBg="linear-gradient(135deg,#EFF6FF,#DBEAFE)"
                  onPreview={() => preview({ title:'Aadhaar Card', emoji:'🪪', color:'#3B82F6', headerBg:'linear-gradient(135deg,#3B82F6,#6366F1)', fields:[['Full Name',d.aadhaar.name],['Date of Birth',d.aadhaar.dob],['Aadhaar No.',d.aadhaar.number],['Address',d.aadhaar.address]], note:'Aadhaar number is partially masked for security.' })}
                />
                <IdDocCard
                  title="PAN Card" emoji="💳"
                  fields={panFields} flagged={isFailed}
                  accentColor="#8B5CF6" accentBg="linear-gradient(135deg,#F5F3FF,#EDE9FE)"
                  onPreview={() => preview({ title:'PAN Card', emoji:'💳', color:'#8B5CF6', headerBg:'linear-gradient(135deg,#8B5CF6,#A78BFA)', fields:[['Full Name',d.pan.name],['Date of Birth',d.pan.dob],['PAN No.',d.pan.number]], note:'PAN number is used for tax identification in India.' })}
                />
              </div>
            </div>

            {/* Live Selfie */}
            <div style={{ marginBottom:20 }}>
              <SectionDivider icon="🤳" label="Live Selfie" bg="#F0FDF4" />
              <SelfieCard
                flagged={isFailed}
                onPreview={() => preview({ title:'Live Selfie', emoji:'🤳', color:'#10B981', headerBg:'linear-gradient(135deg,#10B981,#34D399)', fields:[['Captured By',user.name],['Method','In-App Liveness Check'],['Status','Verified'],['Criteria','Face visible, eyes open, no filters']], note:'Selfie was captured live in the PayO app using liveness detection. No static photo uploads accepted.' })}
              />
            </div>

            {/* Bank Documents */}
            <div style={{ marginBottom:20 }}>
              <SectionDivider icon="🏦" label="Bank Documents" bg="#F0F9FF" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                <BankDocCard
                  icon="🏦" title="Cancel Cheque"
                  subtitle={bank.cancelCheque.bankName}
                  accentColor="#0EA5E9" accentBg="linear-gradient(135deg,#F0F9FF,#E0F2FE)"
                  fields={chequeFields} flagged={isFailed}
                  onPreview={() => preview({ title:'Cancel Cheque', emoji:'🏦', color:'#0EA5E9', headerBg:'linear-gradient(135deg,#0EA5E9,#38BDF8)', fields:[['Bank Name',bank.cancelCheque.bankName],['Account No.',bank.cancelCheque.accountNumber],['IFSC Code',bank.cancelCheque.ifsc],['Account Holder',bank.cancelCheque.accountHolder],['Document Type','Cancelled Cheque']], note:'A cancelled cheque is used to verify the bank account details of the user.' })}
                />
                <BankDocCard
                  icon="📄" title="Bank Statement"
                  subtitle={bank.bankStatement.period}
                  accentColor="#8B5CF6" accentBg="linear-gradient(135deg,#F5F3FF,#EDE9FE)"
                  fields={statFields} flagged={isFailed}
                  onPreview={() => preview({ title:'Bank Statement', emoji:'📄', color:'#8B5CF6', headerBg:'linear-gradient(135deg,#8B5CF6,#A78BFA)', fields:[['Bank Name',bank.bankStatement.bankName],['Statement Period',bank.bankStatement.period],['Pages',bank.bankStatement.pages+' pages'],['Account Holder',user.name],['Document Type','Bank Statement']], note:'Bank statement covering the last 3–6 months as proof of active account.' })}
                />
                <BankDocCard
                  icon="📒" title="Passbook"
                  subtitle={bank.passbook.bankName}
                  accentColor="#F59E0B" accentBg="linear-gradient(135deg,#FFFBEB,#FEF3C7)"
                  fields={pbFields} flagged={isFailed}
                  onPreview={() => preview({ title:'Passbook', emoji:'📒', color:'#F59E0B', headerBg:'linear-gradient(135deg,#F59E0B,#FCD34D)', fields:[['Bank Name',bank.passbook.bankName],['Coverage Period',bank.passbook.period],['Account Holder',user.name],['Document Type','Bank Passbook']], note:'Passbook front page submitted showing account holder name, account number, and bank details.' })}
                />
              </div>
            </div>

            {/* Verification Summary */}
            <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#1D4ED8', marginBottom:10 }}>📋 Verification Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                {[
                  ['Name Match',  nameMatch ? '✅ Match'    : '⚠️ Mismatch'],
                  ['DOB Match',   dobMatch  ? '✅ Match'    : '⚠️ Mismatch'],
                  ['Selfie',      '✅ Captured'],
                  ['Bank Proof',  '✅ Submitted'],
                ].map(([l,v]) => (
                  <div key={l} style={{ background:'white', borderRadius:9, padding:'9px 10px' }}>
                    <div style={{ fontSize:10.5, color:'var(--gray-400)', fontWeight:600, marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize:12, fontWeight:600, color: v.startsWith('✅')?'#059669':v.startsWith('⚠️')?'#D97706':'#EF4444' }}>{v}</div>
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
              <button className="btn btn-success" style={{ width:'100%', padding:'11px', fontSize:13 }} onClick={() => onApprove(user.id)}>
                ✅ Approve KYC & Activate Wallet
              </button>
            </div>
            <div style={{ border:'1px solid var(--gray-200)', borderRadius:12, padding:'16px' }}>
              <div className="section-title">Reject KYC</div>
              <p style={{ fontSize:13, color:'var(--gray-600)', marginBottom:10 }}>Provide a clear reason so the user knows what to fix:</p>
              <textarea rows={3} placeholder="e.g. Aadhaar & PAN name mismatch, selfie unclear..." value={reason} onChange={e => setReason(e.target.value)}/>
              <button className="btn btn-danger" style={{ width:'100%', padding:'11px', fontSize:13, marginTop:10 }} onClick={() => { if(reason.trim()) onReject(user.id, reason); }}>
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

/* ─────────────────────────────────────────────
   Main KYCReview Page
───────────────────────────────────────────── */
export default function KYCReview() {
  const { confirm } = useContext(AppCtx);
  const [data, setData]   = useState(init);
  const [sel, setSel]     = useState(null);
  const [fStatus, setFS]  = useState('All');
  const [search, setSrch] = useState('');
  const [toast, setToast] = useState(null);
  const [page, setPage]   = useState(1);
  const perPage = 8;

  const showToast = (msg, type) => { setToast({msg, type}); setTimeout(() => setToast(null), 3200); };

  const approve = id => {
    setData(p => p.map(r => r.id===id ? {...r, status:'Approved'} : r));
    setSel(null); showToast('KYC Approved — Wallet activated!', 'ok');
  };
  const reject = (id, reason) => {
    setData(p => p.map(r => r.id===id ? {...r, status:'Failed', rejectionReason:reason} : r));
    setSel(null); showToast('KYC Rejected. User notified.', 'err');
  };
  const quickApprove = id => {
    const user = data.find(r => r.id === id);
    confirm({
      title: 'Approve KYC',
      message: `Are you sure you want to approve KYC for ${user?.name}? Their wallet will be activated and they can start transacting PYO tokens.`,
      confirmLabel: '✅ Yes, Approve',
      cancelLabel: 'Cancel',
      type: 'success',
    }, () => { setData(p => p.map(r => r.id===id ? {...r, status:'Approved'} : r)); showToast('KYC Approved — Wallet activated!', 'ok'); });
  };

  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const quickReject       = id => { setRejectTarget(id); setRejectReason(''); };
  const submitQuickReject = () => {
    if (!rejectReason.trim()) return;
    setData(p => p.map(r => r.id===rejectTarget ? {...r, status:'Failed', rejectionReason:rejectReason} : r));
    setRejectTarget(null); setRejectReason('');
    showToast('KYC Rejected. User notified.', 'err');
  };

  const counts = {
    All:         data.length,
    Pending:     data.filter(r => r.status==='Pending').length,
    'In Review': data.filter(r => r.status==='In Review').length,
    Approved:    data.filter(r => r.status==='Approved').length,
    Failed:      data.filter(r => r.status==='Failed').length,
  };

  const filtered = data.filter(r => {
    const ms = fStatus==='All' || r.status===fStatus;
    const mq = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged      = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h2>KYC Review</h2>
          <p>Review all submitted identity and bank documents. Approve or reject user KYC requests.</p>
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name or ID..." value={search} onChange={e => { setSrch(e.target.value); setPage(1); }}/>
          </div>
          <StatusFilterDropdown value={fStatus} onChange={v => { setFS(v); setPage(1); }} counts={counts} />
          <div className="filter-count">{filtered.length} results</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>User</th><th>Documents Submitted</th><th>Submitted On</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paged.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar" style={{ background:r.color }}>{r.initials}</div>
                      <div><div className="uname">{r.name}</div><div className="uid">{r.id}</div></div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                      <span className="doc-badge">🪪 Aadhaar</span>
                      <span className="doc-badge">💳 PAN</span>
                      <span className="doc-badge">🤳 Selfie</span>
                      <span className="doc-badge">🏦 Cheque</span>
                      <span className="doc-badge">📄 Statement</span>
                      <span className="doc-badge">📒 Passbook</span>
                    </div>
                  </td>
                  <td style={{ color:'var(--gray-400)', fontSize:13 }}>{r.submitted}</td>
                  <td><Badge s={r.status}/></td>
                  <td>
                    <div className="act-group">
                      <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px' }} onClick={() => setSel(r)}>👁 Review</button>
                      {(r.status==='Pending' || r.status==='In Review') && <>
                        <button className="btn btn-ghost icon-btn" title="Approve" onClick={() => quickApprove(r.id)} style={{ color:'var(--green)' }}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button className="btn btn-ghost icon-btn" title="Reject" onClick={() => quickReject(r.id)} style={{ color:'var(--red)' }}>
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
            <button className="pag-btn" disabled={page===1} onClick={() => setPage(p => p-1)}>‹</button>
            {Array.from({length:totalPages},(_,i) => (
              <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
            ))}
            <button className="pag-btn" disabled={page===totalPages} onClick={() => setPage(p => p+1)}>›</button>
          </div>
        </div>
      </div>

      {sel && <Modal user={sel} onClose={() => setSel(null)} onApprove={approve} onReject={reject}/>}

      {rejectTarget && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setRejectTarget(null)}>
          <div className="modal" style={{ maxWidth:420 }}>
            <div className="modal-head">
              <h3>Reject KYC</h3>
              <button className="btn btn-ghost icon-btn" onClick={() => setRejectTarget(null)}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize:13.5, color:'var(--gray-600)', marginBottom:16, lineHeight:1.6 }}>
                Please provide a clear reason so <strong>{data.find(r => r.id===rejectTarget)?.name}</strong> knows exactly what to fix before resubmitting.
              </p>
              <textarea rows={4} placeholder="e.g. Aadhaar & PAN name mismatch, selfie is blurry, bank statement is expired..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} autoFocus/>
              {!rejectReason.trim() && <div style={{ fontSize:11.5, color:'var(--gray-400)', marginTop:6 }}>⚠️ Reason is required before rejecting.</div>}
            </div>
            <div className="modal-foot">
              <button className="btn btn-outline" onClick={() => setRejectTarget(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={submitQuickReject} disabled={!rejectReason.trim()} style={{ opacity:rejectReason.trim()?1:0.5 }}>
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
