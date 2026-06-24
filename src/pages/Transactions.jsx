import { useState, useRef, useEffect, useCallback } from 'react';

// ── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK = [
  { _id:'txn_001abc123def456', type:'send',     senderWallet:'0xA1B2C3D4E5F6a1b2c3d4e5f6A1B2C3D4E5F6a1b2', receiverWallet:'0xF6E5D4C3B2A1f6e5d4c3b2a1F6E5D4C3B2A1f6e5', amount:250,  status:'success', blockchainHash:'0xabc123def456abc123def456abc123def456abc123def456', createdAt:'2026-06-23T09:15:00Z' },
  { _id:'txn_002bcd234efg567', type:'receive',  senderWallet:'0xB2C3D4E5F6A1b2c3d4e5f6A1B2C3D4E5F6A1b2c3', receiverWallet:'0xA1B2C3D4E5F6a1b2c3d4e5f6A1B2C3D4E5F6a1b2', amount:500,  status:'success', blockchainHash:'0xbcd234efg567bcd234efg567bcd234efg567bcd234efg567', createdAt:'2026-06-23T08:45:00Z' },
  { _id:'txn_003cde345fgh678', type:'transfer', senderWallet:'0xC3D4E5F6A1B2c3d4e5f6A1B2C3D4E5F6A1B2c3d4', receiverWallet:'0xD4E5F6A1B2C3d4e5f6A1B2C3D4E5F6A1B2C3d4e5', amount:1200, status:'pending', blockchainHash:'',                                                   createdAt:'2026-06-23T08:00:00Z' },
  { _id:'txn_004def456ghi789', type:'reward',   senderWallet:'0xSYSTEM000000000000000000000000000000000000', receiverWallet:'0xE5F6A1B2C3D4e5f6A1B2C3D4E5F6A1B2C3D4e5f6', amount:100,  status:'success', blockchainHash:'0xcde345fgh678cde345fgh678cde345fgh678cde345fgh678', createdAt:'2026-06-22T22:30:00Z' },
  { _id:'txn_005efg567hij890', type:'send',     senderWallet:'0xF6A1B2C3D4E5f6a1b2c3d4e5F6A1B2C3D4E5f6a1', receiverWallet:'0xA1B2C3D4E5F6a1b2c3d4e5f6A1B2C3D4E5F6a1b2', amount:75,   status:'failed',  blockchainHash:'',                                                   createdAt:'2026-06-22T20:10:00Z' },
  { _id:'txn_006fgh678ijk901', type:'referral', senderWallet:'0xSYSTEM000000000000000000000000000000000000', receiverWallet:'0xB2C3D4E5F6A1b2c3d4e5f6A1B2C3D4E5F6A1b2c3', amount:200,  status:'success', blockchainHash:'0xdef456ghi789def456ghi789def456ghi789def456ghi789', createdAt:'2026-06-22T18:00:00Z' },
  { _id:'txn_007ghi789jkl012', type:'receive',  senderWallet:'0xC3D4E5F6A1B2c3d4e5f6A1B2C3D4E5F6A1B2c3d4', receiverWallet:'0xD4E5F6A1B2C3d4e5f6A1B2C3D4E5F6A1B2C3d4e5', amount:3000, status:'success', blockchainHash:'0xefg567hij890efg567hij890efg567hij890efg567hij890', createdAt:'2026-06-22T15:30:00Z' },
  { _id:'txn_008hij890klm123', type:'send',     senderWallet:'0xE5F6A1B2C3D4e5f6A1B2C3D4E5F6A1B2C3D4e5f6', receiverWallet:'0xF6A1B2C3D4E5f6a1b2c3d4e5F6A1B2C3D4E5f6a1', amount:450,  status:'pending', blockchainHash:'',                                                   createdAt:'2026-06-22T12:00:00Z' },
  { _id:'txn_009ijk901lmn234', type:'transfer', senderWallet:'0xA1B2C3D4E5F6a1b2c3d4e5f6A1B2C3D4E5F6a1b2', receiverWallet:'0xB2C3D4E5F6A1b2c3d4e5f6A1B2C3D4E5F6A1b2c3', amount:800,  status:'failed',  blockchainHash:'',                                                   createdAt:'2026-06-21T21:45:00Z' },
  { _id:'txn_010jkl012mno345', type:'reward',   senderWallet:'0xSYSTEM000000000000000000000000000000000000', receiverWallet:'0xC3D4E5F6A1B2c3d4e5f6A1B2C3D4E5F6A1B2c3d4', amount:50,   status:'success', blockchainHash:'0xfgh678ijk901fgh678ijk901fgh678ijk901fgh678ijk901', createdAt:'2026-06-21T18:00:00Z' },
  { _id:'txn_011klm123nop456', type:'send',     senderWallet:'0xD4E5F6A1B2C3d4e5f6A1B2C3D4E5F6A1B2C3d4e5', receiverWallet:'0xE5F6A1B2C3D4e5f6A1B2C3D4E5F6A1B2C3D4e5f6', amount:1500, status:'success', blockchainHash:'0xghi789jkl012ghi789jkl012ghi789jkl012ghi789jkl012', createdAt:'2026-06-21T14:20:00Z' },
  { _id:'txn_012lmn234opq567', type:'receive',  senderWallet:'0xF6A1B2C3D4E5f6a1b2c3d4e5F6A1B2C3D4E5f6a1', receiverWallet:'0xA1B2C3D4E5F6a1b2c3d4e5f6A1B2C3D4E5F6a1b2', amount:620,  status:'success', blockchainHash:'0xhij890klm123hij890klm123hij890klm123hij890klm123', createdAt:'2026-06-21T10:00:00Z' },
  { _id:'txn_013mno345pqr678', type:'referral', senderWallet:'0xSYSTEM000000000000000000000000000000000000', receiverWallet:'0xB2C3D4E5F6A1b2c3d4e5f6A1B2C3D4E5F6A1b2c3', amount:150,  status:'pending', blockchainHash:'',                                                   createdAt:'2026-06-20T20:00:00Z' },
  { _id:'txn_014nop456qrs789', type:'send',     senderWallet:'0xC3D4E5F6A1B2c3d4e5f6A1B2C3D4E5F6A1B2c3d4', receiverWallet:'0xD4E5F6A1B2C3d4e5f6A1B2C3D4E5F6A1B2C3d4e5', amount:325,  status:'failed',  blockchainHash:'',                                                   createdAt:'2026-06-20T16:30:00Z' },
  { _id:'txn_015opq567rst890', type:'transfer', senderWallet:'0xE5F6A1B2C3D4e5f6A1B2C3D4E5F6A1B2C3D4e5f6', receiverWallet:'0xF6A1B2C3D4E5f6a1b2c3d4e5F6A1B2C3D4E5f6a1', amount:2200, status:'success', blockchainHash:'0xijk901lmn234ijk901lmn234ijk901lmn234ijk901lmn234', createdAt:'2026-06-20T12:00:00Z' },
];

// ── Utilities ─────────────────────────────────────────────────────────────────
function Sk({ w='100%', h=14, r=6, s={} }) {
  return <div style={{ width:w, height:h, borderRadius:r, background:'linear-gradient(90deg,var(--skeleton-a,#E2E8F0) 25%,var(--skeleton-b,#F1F5F9) 50%,var(--skeleton-a,#E2E8F0) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite', ...s }}/>;
}

const typeCfg = {
  send:     { icon:'↑', label:'Send',     grad:'linear-gradient(135deg,#DC2626,#EF4444)', soft:'#FEF2F2', color:'#DC2626', glow:'rgba(239,68,68,0.35)'  },
  receive:  { icon:'↓', label:'Receive',  grad:'linear-gradient(135deg,#059669,#10B981)', soft:'#F0FDF4', color:'#059669', glow:'rgba(16,185,129,0.35)' },
  transfer: { icon:'⇄', label:'Transfer', grad:'linear-gradient(135deg,#1D4ED8,#3B82F6)', soft:'#EFF6FF', color:'#2563EB', glow:'rgba(59,130,246,0.35)' },
  reward:   { icon:'★', label:'Reward',   grad:'linear-gradient(135deg,#B45309,#F59E0B)', soft:'#FFF7ED', color:'#D97706', glow:'rgba(245,158,11,0.35)' },
  referral: { icon:'♦', label:'Referral', grad:'linear-gradient(135deg,#6D28D9,#8B5CF6)', soft:'#F5F3FF', color:'#7C3AED', glow:'rgba(139,92,246,0.35)' },
};
const getTC    = t => typeCfg[String(t||'').toLowerCase()] || { icon:'•', label:t||'—', grad:'linear-gradient(135deg,#475569,#64748B)', soft:'#F8FAFC', color:'#64748B', glow:'rgba(100,116,139,0.25)' };
const isCredit = t => ['receive','reward','referral'].includes(String(t||'').toLowerCase());

const sCfg = {
  success: { cls:'b-approved', label:'Success' },
  pending: { cls:'b-pending',  label:'Pending' },
  failed:  { cls:'b-failed',   label:'Failed'  },
};
function SBadge({ s }) {
  const c = sCfg[String(s||'').toLowerCase()] || { cls:'b-review', label:s||'—' };
  return <span className={`badge ${c.cls}`}>{c.label}</span>;
}

function useCopy() {
  const [k, setK] = useState('');
  const copy = useCallback((val, key) => {
    navigator.clipboard.writeText(val).then(() => { setK(key); setTimeout(()=>setK(''), 1800); }).catch(()=>{});
  }, []);
  return [k, copy];
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Spark({ pts, col }) {
  const W=90,H=32,mn=Math.min(...pts),mx=Math.max(...pts),rng=mx-mn||1,st=W/(pts.length-1);
  const coords=pts.map((v,i)=>[i*st,H-((v-mn)/rng)*(H-5)-3]);
  const d=coords.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const fill=d+` L${W},${H} L0,${H} Z`;
  const id=`sp${col.replace(/[^a-z0-9]/gi,'')}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity=".35"/><stop offset="100%" stopColor={col} stopOpacity="0"/></linearGradient></defs>
      <path d={fill} fill={`url(#${id})`}/><path d={d} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Big Hero Stat card (left 2) ───────────────────────────────────────────────
function HeroCard({ label, value, sub, color, glow, icon, spark, loading }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:'var(--stat-card-bg,#fff)', border:'1.5px solid var(--stat-card-border,#E2E8F0)', borderRadius:20, padding:'24px 24px 20px', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', transition:'all 0.25s', transform:hov?'translateY(-4px)':'none', boxShadow:hov?`0 16px 40px ${glow}`:'0 1px 4px rgba(0,0,0,0.06)' }}>
      {/* Glow orb top-right */}
      <div style={{ position:'absolute', top:-40, right:-40, width:120, height:120, borderRadius:'50%', background:color, opacity:hov?0.1:0.05, transition:'opacity 0.25s', filter:'blur(30px)', pointerEvents:'none' }}/>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div style={{ fontSize:10.5, fontWeight:700, color:'var(--stat-card-label,#94A3B8)', textTransform:'uppercase', letterSpacing:'0.9px' }}>{label}</div>
        <div style={{ width:40, height:40, borderRadius:12, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, transition:'transform 0.2s', transform:hov?'scale(1.1) rotate(-5deg)':'none' }}>{icon}</div>
      </div>
      {loading
        ? <><Sk h={38} r={10} s={{marginBottom:12}}/><Sk w="60%" h={13} r={5} s={{marginBottom:10}}/><Sk w="45%" h={11} r={5}/></>
        : <>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:38, fontWeight:800, color:'var(--stat-card-value,#0D1B3E)', letterSpacing:'-2px', lineHeight:1, marginBottom:12 }}>{value}</div>
            {spark && <div style={{ marginBottom:10 }}><Spark pts={spark} col={color}/></div>}
            <div style={{ fontSize:12, fontWeight:600, color:'var(--gray-400)' }}>{sub}</div>
          </>
      }
    </div>
  );
}

// ── Small status card ─────────────────────────────────────────────────────────
function MiniCard({ label, value, color, glow, softBg, icon, change, up, loading }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:'var(--stat-card-bg,#fff)', border:'1.5px solid var(--stat-card-border,#E2E8F0)', borderRadius:20, padding:'20px 20px 16px', position:'relative', overflow:'hidden', transition:'all 0.25s', transform:hov?'translateY(-4px)':'none', boxShadow:hov?`0 14px 36px ${glow}`:'0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ position:'absolute', bottom:-30, left:-30, width:100, height:100, borderRadius:'50%', background:color, opacity:0.06, filter:'blur(20px)', pointerEvents:'none' }}/>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{ fontSize:10.5, fontWeight:700, color:'var(--stat-card-label,#94A3B8)', textTransform:'uppercase', letterSpacing:'0.9px' }}>{label}</div>
        <div style={{ width:34, height:34, borderRadius:10, background:softBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{icon}</div>
      </div>
      {loading
        ? <><Sk h={32} r={8} s={{marginBottom:8}}/><Sk w="55%" h={11} r={5}/></>
        : <>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:800, color:'var(--stat-card-value,#0D1B3E)', letterSpacing:'-1.5px', lineHeight:1, marginBottom:8 }}>{value}</div>
            <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11.5, fontWeight:600, color:up?'#10B981':'#EF4444' }}>
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {up?<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>:<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>}
              </svg>
              {change}
            </div>
          </>
      }
    </div>
  );
}

// ── Donut SVG ─────────────────────────────────────────────────────────────────
function Donut({ succ, pend, fail, total }) {
  const r=58,cx=68,cy=68,sw=14,C=2*Math.PI*r;
  const sp=succ/total, pp=pend/total, fp=fail/total;
  const pct=total>0?Math.round((succ/total)*100):0;
  // animated mount
  const [anim, setAnim] = useState(false);
  useEffect(()=>{ setTimeout(()=>setAnim(true),100); },[]);
  const scale = anim ? 1 : 0;
  return (
    <div style={{ position:'relative', display:'inline-block', transition:'transform 0.5s', transform:`scale(${scale})` }}>
      <svg width="136" height="136" viewBox="0 0 136 136">
        {/* track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--gray-100,#F1F5F9)" strokeWidth={sw}/>
        {/* fail */}
        {fp>0&&<circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEE2E2" strokeWidth={sw} strokeDasharray={`${fp*C} ${C}`} strokeDashoffset={-(sp+pp)*C} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>}
        {/* pending */}
        {pp>0&&<circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEF3C7" strokeWidth={sw} strokeDasharray={`${pp*C} ${C}`} strokeDashoffset={-sp*C} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>}
        {/* success */}
        {sp>0&&<circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth={sw+2} strokeDasharray={`${sp*C} ${C}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>}
      </svg>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:800, color:'var(--stat-card-value,#0D1B3E)', lineHeight:1 }}>{pct}%</div>
        <div style={{ fontSize:8.5, fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.6px', marginTop:3 }}>Success</div>
      </div>
    </div>
  );
}

// ── Date Dropdown ─────────────────────────────────────────────────────────────
function DateDrop({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const opts = [{l:'All Time',v:'all'},{l:'Today',v:'today'},{l:'Yesterday',v:'yesterday'},{l:'Last 7 Days',v:'7days'},{l:'Last 30 Days',v:'30days'},{l:'This Month',v:'month'}];
  const sel  = opts.find(o=>o.v===value)||opts[0];
  return (
    <div ref={ref} style={{position:'relative'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:7,padding:'8px 14px',background:open?'#EEF2FF':'var(--filter-btn-bg,#F5F3FF)',border:'1.5px solid var(--filter-btn-border,#C7D2FE)',borderRadius:10,color:'var(--filter-btn-color,#4F46E5)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Inter',sans-serif",whiteSpace:'nowrap',transition:'all 0.18s'}}>
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {sel.l}
        {value!=='all'&&<span style={{background:'#4F46E5',color:'#fff',borderRadius:20,padding:'1px 6px',fontSize:10,fontWeight:700}}>1</span>}
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{transform:open?'rotate(180deg)':'none',transition:'transform 0.18s'}}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open&&(
        <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'var(--dropdown-bg,#fff)',border:'1.5px solid var(--dropdown-border,#E2E8F0)',borderRadius:12,padding:6,minWidth:175,boxShadow:'0 12px 40px rgba(0,0,0,0.14)',zIndex:500}}>
          {opts.map(o=>(
            <div key={o.v} onClick={()=>{onChange(o.v);setOpen(false);}} style={{padding:'9px 12px',borderRadius:8,fontSize:13,fontWeight:value===o.v?600:400,color:value===o.v?'#4F46E5':'var(--dropdown-text,#374151)',background:value===o.v?'#EEF2FF':'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between'}} onMouseEnter={e=>{if(value!==o.v)e.currentTarget.style.background='#F9FAFB';}} onMouseLeave={e=>{if(value!==o.v)e.currentTarget.style.background='transparent';}}>
              {o.l}{value===o.v&&<svg width="13" height="13" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          ))}
          {value!=='all'&&<div style={{borderTop:'1px solid #E2E8F0',marginTop:4,paddingTop:4}}><div onClick={()=>{onChange('all');setOpen(false);}} style={{padding:'8px 12px',borderRadius:8,fontSize:12,fontWeight:600,color:'#EF4444',cursor:'pointer',textAlign:'center'}} onMouseEnter={e=>e.currentTarget.style.background='#FEF2F2'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>Clear</div></div>}
        </div>
      )}
    </div>
  );
}

// ── Copy pill ─────────────────────────────────────────────────────────────────
function CopyPill({ val, id, copied, onCopy }) {
  const short = val && val.length > 18 ? val.slice(0,10)+'…'+val.slice(-6) : val||'—';
  const ok = copied===id;
  if (!val || val==='—') return <span style={{fontFamily:'monospace',fontSize:12,color:'var(--gray-400)'}}>—</span>;
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      <span style={{fontFamily:'monospace',fontSize:12,color:'var(--navy)',userSelect:'text'}}>{short}</span>
      <button onClick={e=>{e.stopPropagation();onCopy(val,id);}} title="Copy"
        style={{flexShrink:0,width:22,height:22,borderRadius:6,border:`1.5px solid ${ok?'#86EFAC':'var(--gray-200)'}`,background:ok?'#F0FDF4':'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s'}}>
        {ok
          ? <svg width="10" height="10" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg width="10" height="10" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        }
      </button>
    </div>
  );
}

// ── Transaction Detail Modal ───────────────────────────────────────────────────
function TxnModal({ txn, onClose }) {
  const [copied, copy] = useCopy();
  if (!txn) return null;
  const tc     = getTC(txn.type);
  const credit = isCredit(txn.type);
  const amt    = Math.abs(txn.amount??0);
  const hash   = txn.blockchainHash||'';
  const sender = txn.senderWallet||'—';
  const recvr  = txn.receiverWallet||'—';
  const txId   = txn._id||'—';
  const ts     = txn.createdAt ? new Date(txn.createdAt).toLocaleString('en-IN',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}) : '—';

  const rows = [
    { label:'Transaction ID',   val:txId,   copyId:'txid',   mono:true  },
    { label:'Blockchain Hash',  val:hash||null, copyId:'hash', mono:true, special:'hash' },
    { label:'Sender Wallet',    val:sender, copyId:'sender', mono:true  },
    { label:'Receiver Wallet',  val:recvr,  copyId:'recvr',  mono:true  },
    { label:'Amount',           val:null,   copyId:null,     special:'amount' },
    { label:'Timestamp',        val:ts,     copyId:null,     mono:false },
  ];

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:600}}>

        {/* Modal header */}
        <div className="modal-head">
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:52,height:52,borderRadius:16,background:tc.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,color:'#fff',fontWeight:900,flexShrink:0,boxShadow:`0 6px 20px ${tc.glow}`}}>
              {tc.icon}
            </div>
            <div>
              <h3 style={{margin:0}}>{tc.label} Transaction</h3>
              <div style={{fontSize:11.5,color:'var(--gray-400)',marginTop:3,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontFamily:'monospace'}}>#{String(txId).slice(-14)}</span>
                <SBadge s={txn.status}/>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Amount hero */}
        <div style={{margin:'0 24px 6px',borderRadius:18,background:credit?'linear-gradient(135deg,#022c22,#064E3B,#065F46)':'linear-gradient(135deg,#1c0101,#450A0A,#7F1D1D)',padding:'24px 26px',position:'relative',overflow:'hidden',color:'#fff'}}>
          <div style={{position:'absolute',top:-50,right:-50,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}/>
          <div style={{position:'absolute',bottom:-35,left:-20,width:130,height:130,borderRadius:'50%',background:'rgba(255,255,255,0.03)'}}/>
          <div style={{position:'relative'}}>
            <div style={{fontSize:10,fontWeight:700,opacity:0.5,textTransform:'uppercase',letterSpacing:'1.5px',marginBottom:8}}>
              {credit?'Amount Received':'Amount Sent'}
            </div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:42,fontWeight:900,letterSpacing:'-2.5px',lineHeight:1}}>
              {credit?'+':'-'}{amt.toLocaleString()}
              <span style={{fontSize:18,opacity:0.45,marginLeft:12,fontWeight:600,letterSpacing:0}}>PYO</span>
            </div>
            <div style={{marginTop:18,display:'flex',gap:0}}>
              {[['Type',tc.label],['Status',txn.status||'—'],['Date',txn.createdAt?new Date(txn.createdAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'—']].map(([l,v],i,a)=>(
                <div key={l} style={{paddingRight:20,marginRight:20,borderRight:i<a.length-1?'1px solid rgba(255,255,255,0.15)':'none'}}>
                  <div style={{fontSize:9.5,opacity:0.45,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:3}}>{l}</div>
                  <div style={{fontSize:13,fontWeight:700,textTransform:'capitalize',opacity:0.95}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="section-title" style={{marginBottom:14}}>Complete Transaction Data</div>

          {/* Fields — only the 6 from spec */}
          <div style={{borderRadius:14,border:'1.5px solid var(--gray-200)',overflow:'hidden'}}>
            {rows.map(({ label, val, copyId, mono, special }, i) => (
              <div key={label} style={{display:'grid',gridTemplateColumns:'155px 1fr',padding:'13px 16px',borderBottom:i<rows.length-1?'1px solid var(--gray-200)':'none',background:i%2===0?'var(--gray-50,#F8FAFC)':'#fff',alignItems:'center'}}>
                <div style={{fontSize:10.5,fontWeight:700,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.7px'}}>{label}</div>
                <div>
                  {special==='hash'
                    ? val
                      ? <div>
                          <CopyPill val={val} id={copyId} copied={copied} onCopy={copy}/>
                          <div style={{marginTop:5,display:'flex',alignItems:'center',gap:5}}>
                            <div style={{width:6,height:6,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 5px #10B981'}}/>
                            <span style={{fontSize:10,color:'#059669',fontWeight:600}}>Confirmed on-chain</span>
                          </div>
                        </div>
                      : <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <div style={{width:6,height:6,borderRadius:'50%',background:'#F59E0B'}}/>
                          <span style={{fontSize:12,color:'var(--gray-400)'}}>Pending confirmation</span>
                        </div>
                    : special==='amount'
                      ? <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:800,color:credit?'#059669':'#DC2626'}}>{credit?'+':'-'}{amt.toLocaleString()}</span>
                          <span style={{background:credit?'#DCFCE7':'#FEE2E2',color:credit?'#15803D':'#DC2626',fontSize:11,fontWeight:700,padding:'2px 9px',borderRadius:7}}>PYO</span>
                        </div>
                      : copyId
                        ? <CopyPill val={val} id={copyId} copied={copied} onCopy={copy}/>
                        : <span style={{fontSize:13,fontWeight:500,color:'var(--navy)'}}>{val}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ════════════════════════════════════════════════════════════════════════════
export default function Transactions() {
  const [txns,    setTxns]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [sel,     setSel]     = useState(null);
  const [search,  setSearch]  = useState('');
  const [fStatus, setFStatus] = useState('All');
  const [fDate,   setFDate]   = useState('all');
  const [page,    setPage]    = useState(1);
  const [error,   setError]   = useState('');
  const perPage = 8;

  useEffect(() => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('payo_token');
    fetch('https://shadily-hazard-widget.ngrok-free.dev/api/admin/stats/transactions', {
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' }
    })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        // Handle all possible response shapes
        const arr = data?.transactions || data?.data?.transactions || data?.data || data?.result || [];
        setTxns(Array.isArray(arr) && arr.length > 0 ? arr : MOCK); // fallback to mock if empty
      })
      .catch(err => {
        console.error('Transactions fetch failed:', err);
        setTxns(MOCK); // fallback to mock data on error
        setError('Could not load live data — showing mock data.');
      })
      .finally(() => setLoading(false));
  }, []);

  const total = txns.length;
  const succ  = txns.filter(t=>t.status==='success').length;
  const pend  = txns.filter(t=>t.status==='pending').length;
  const fail  = txns.filter(t=>t.status==='failed').length;
  const vol   = txns.reduce((s,t)=>s+Math.abs(t.amount??0), 0);

  const inDate = t => {
    if (fDate==='all') return true;
    const d=new Date(t.createdAt||0), now=new Date();
    if (fDate==='today')     { const s=new Date(); s.setHours(0,0,0,0); return d>=s; }
    if (fDate==='yesterday') { const s=new Date(); s.setDate(s.getDate()-1); s.setHours(0,0,0,0); const e=new Date(s); e.setHours(23,59,59,999); return d>=s&&d<=e; }
    if (fDate==='7days')     { const s=new Date(); s.setDate(s.getDate()-7); return d>=s; }
    if (fDate==='30days')    { const s=new Date(); s.setDate(s.getDate()-30); return d>=s; }
    if (fDate==='month')     { return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); }
    return true;
  };

  const filtered = txns.filter(t => {
    const statusOk = fStatus==='All' || t.status?.toLowerCase()===fStatus.toLowerCase();
    const q = search.toLowerCase();
    const searchOk = !search
      || String(t._id||'').toLowerCase().includes(q)
      || String(t.senderWallet||'').toLowerCase().includes(q)
      || String(t.receiverWallet||'').toLowerCase().includes(q);
    return statusOk && searchOk && inDate(t);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length/perPage));
  const paged      = filtered.slice((page-1)*perPage, page*perPage);

  // Volume breakdown
  const sendVol    = txns.filter(t=>['send','transfer'].includes(t.type)).reduce((s,t)=>s+Math.abs(t.amount??0),0);
  const recvVol    = txns.filter(t=>t.type==='receive').reduce((s,t)=>s+Math.abs(t.amount??0),0);
  const rewardVol  = txns.filter(t=>['reward','referral'].includes(t.type)).reduce((s,t)=>s+Math.abs(t.amount??0),0);

  return (
    <div className="page">
      <style>{`
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes rowIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseGlow{0%,100%{opacity:1}50%{opacity:0.5}}
        .txn-tab{padding:11px 20px;border:none;background:none;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;color:var(--gray-400);border-bottom:2.5px solid transparent;transition:all 0.2s;white-space:nowrap;}
        .txn-tab.act{color:#2563EB;border-bottom-color:#2563EB;}
        .txn-tab:hover:not(.act){color:var(--navy);}
        .txn-row{transition:background 0.15s,box-shadow 0.15s;}
        .txn-row:hover{background:linear-gradient(90deg,#EFF6FF 0%,#F8FAFC 100%)!important;}
        .txn-row:hover .txn-icon{transform:scale(1.15) rotate(-5deg);}
        .txn-icon{transition:transform 0.2s;}
        .mono{font-family:monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;user-select:text;}
        .pyo-tag{display:inline-flex;background:var(--gray-100);padding:2px 7px;border-radius:6px;font-size:10px;font-weight:700;color:var(--gray-400);margin-left:5px;}
        .view-btn{padding:6px 16px;border-radius:20px;cursor:pointer;background:linear-gradient(135deg,#2563EB,#3B82F6);border:none;color:#fff;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;box-shadow:0 2px 8px rgba(37,99,235,0.3);transition:all 0.18s;}
        .view-btn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(37,99,235,0.45);}
        .mock-tag{display:flex;align-items:center;gap:6px;background:#FFF7ED;border:1.5px solid #FED7AA;border-radius:10px;padding:6px 12px;font-size:11.5px;font-weight:600;color:#C2410C;}
      `}</style>

      {/* ── Header ── */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>Transaction Monitoring</h2>
          <p>Real-time overview of all PYO token activity on the platform.</p>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          {error && (
            <div style={{display:'flex',alignItems:'center',gap:6,background:'#FFF7ED',border:'1.5px solid #FED7AA',borderRadius:10,padding:'6px 12px',fontSize:11.5,fontWeight:600,color:'#C2410C'}}>
              ⚠️ Showing mock data — API unavailable
            </div>
          )}
          <button className="btn btn-outline" style={{fontSize:13}} onClick={()=>{setLoading(true);setError('');const token=localStorage.getItem('payo_token');fetch('https://shadily-hazard-widget.ngrok-free.dev/api/admin/stats/transactions',{headers:{'Authorization':`Bearer ${token}`,'ngrok-skip-browser-warning':'true'}}).then(r=>r.ok?r.json():Promise.reject(r)).then(data=>{const arr=data?.transactions||data?.data?.transactions||data?.data||data?.result||[];setTxns(Array.isArray(arr)&&arr.length>0?arr:MOCK);}).catch(()=>{setTxns(MOCK);setError('Could not load live data — showing mock data.');}).finally(()=>setLoading(false));}}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            Refresh
          </button>
        </div>
      </div>

      {/* ── Top Stats — 2 large + 2 small ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:16,marginBottom:20}}>
        <HeroCard label="Total Transactions" value={loading?'—':total.toLocaleString()} sub="All time" color="#3B82F6" glow="rgba(59,130,246,0.2)" loading={loading}
          spark={[10,18,14,22,19,28,24,35,30,42,38,50]}
          icon={<svg width="19" height="19" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>}
        />
        <HeroCard label="Successful" value={loading?'—':succ.toLocaleString()} sub={`${total?((succ/total)*100).toFixed(1):0}% success rate`} color="#10B981" glow="rgba(16,185,129,0.2)" loading={loading}
          spark={[8,12,10,16,14,20,18,24,22,28,26,32]}
          icon={<svg width="19" height="19" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
        />
        <MiniCard label="Pending" value={loading?'—':pend.toLocaleString()} color="#F59E0B" glow="rgba(245,158,11,0.2)" softBg="#FFF7ED" change="Awaiting confirmation" up={false} loading={loading}
          icon={<svg width="17" height="17" fill="none" stroke="#D97706" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <MiniCard label="Failed" value={loading?'—':fail.toLocaleString()} color="#EF4444" glow="rgba(239,68,68,0.2)" softBg="#FEF2F2" change="Requires attention" up={false} loading={loading}
          icon={<svg width="17" height="17" fill="none" stroke="#DC2626" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
        />
      </div>

      {/* ── Analytics Row ── */}
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:16,marginBottom:20}}>

        {/* Donut card */}
        <div style={{background:'var(--stat-card-bg,#fff)',border:'1.5px solid var(--stat-card-border,#E2E8F0)',borderRadius:20,padding:'22px 20px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
          <div style={{fontSize:13,fontWeight:700,color:'var(--navy)',letterSpacing:'-0.2px',marginBottom:18}}>Status Breakdown</div>
          {loading
            ? <div style={{display:'flex',justifyContent:'center'}}><div style={{width:136,height:136,borderRadius:'50%',background:'linear-gradient(90deg,#E2E8F0 25%,#F1F5F9 50%,#E2E8F0 75%)',backgroundSize:'200% 100%',animation:'shimmer 1.4s infinite'}}/></div>
            : <div style={{display:'flex',alignItems:'center',gap:18}}>
                <Donut succ={succ} pend={pend} fail={fail} total={total||1}/>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {[['#10B981','#DCFCE7','Success',succ],['#F59E0B','#FEF3C7','Pending',pend],['#EF4444','#FEE2E2','Failed',fail]].map(([col,bg,lbl,val])=>(
                    <div key={lbl} style={{display:'flex',alignItems:'center',gap:9}}>
                      <div style={{width:10,height:10,borderRadius:'50%',background:col,boxShadow:`0 0 5px ${col}88`,flexShrink:0}}/>
                      <div>
                        <div style={{fontSize:11,color:'var(--gray-400)',fontWeight:600,lineHeight:1}}>{lbl}</div>
                        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:800,color:'var(--navy)',lineHeight:1.3}}>
                          {val} <span style={{fontSize:10,color:'var(--gray-400)',fontWeight:500}}>({total?((val/total)*100).toFixed(0):0}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          }
        </div>

        {/* Volume card */}
        <div style={{background:'var(--stat-card-bg,#fff)',border:'1.5px solid var(--stat-card-border,#E2E8F0)',borderRadius:20,padding:'22px 26px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,color:'var(--navy)',letterSpacing:'-0.2px'}}>Total Volume</div>
            <div style={{display:'flex',alignItems:'baseline',gap:6}}>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:900,color:'var(--navy)',letterSpacing:'-1px'}}>{loading?'—':vol.toLocaleString()}</span>
              <span style={{fontSize:12,color:'var(--gray-400)',fontWeight:600}}>PYO</span>
            </div>
          </div>
          {loading
            ? <div style={{display:'flex',flexDirection:'column',gap:14}}>{[1,2,3].map(i=><Sk key={i} h={32} r={8}/>)}</div>
            : <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {[
                  {label:'Send & Transfer', val:sendVol,   color:'#EF4444', grad:'linear-gradient(90deg,#EF4444,#F87171)'},
                  {label:'Receive',          val:recvVol,   color:'#10B981', grad:'linear-gradient(90deg,#10B981,#34D399)'},
                  {label:'Rewards & Referrals',val:rewardVol,color:'#8B5CF6',grad:'linear-gradient(90deg,#8B5CF6,#A78BFA)'},
                ].map(row=>(
                  <div key={row.label}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:9,height:9,borderRadius:'50%',background:row.color,boxShadow:`0 0 5px ${row.color}88`}}/>
                        <span style={{fontSize:12.5,fontWeight:600,color:'var(--gray-600)'}}>{row.label}</span>
                      </div>
                      <span style={{fontSize:13,fontWeight:700,color:'var(--navy)',fontFamily:"'Space Grotesk',sans-serif"}}>{row.val.toLocaleString()} <span style={{fontSize:10,color:'var(--gray-400)',fontWeight:500}}>PYO</span></span>
                    </div>
                    <div style={{height:10,background:'var(--gray-100)',borderRadius:20,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${vol?((row.val/vol)*100):0}%`,background:row.grad,borderRadius:20,transition:'width 1s cubic-bezier(0.4,0,0.2,1)'}}/>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="card">

        {/* Status tabs */}
        <div style={{display:'flex',borderBottom:'1px solid var(--gray-200)',paddingLeft:10}}>
          {[['All',total],['Success',succ],['Pending',pend],['Failed',fail]].map(([lbl,cnt])=>(
            <button key={lbl} className={`txn-tab${fStatus===lbl?' act':''}`} onClick={()=>{setFStatus(lbl);setPage(1);}}>
              {lbl}
              <span style={{marginLeft:7,background:fStatus===lbl?'#DBEAFE':'var(--gray-100)',color:fStatus===lbl?'#2563EB':'var(--gray-400)',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:700}}>
                {loading?'—':cnt}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="search-field" style={{flex:1,maxWidth:380}}>
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by Transaction ID or Wallet address…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
          </div>
          <DateDrop value={fDate} onChange={v=>{setFDate(v);setPage(1);}}/>
          <div className="filter-count">
            {loading?'—':<><strong style={{color:'var(--navy)'}}>{filtered.length}</strong> results</>}
          </div>
        </div>

        {/* Table — exact spec columns */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Sender Wallet</th>
                <th>Receiver Wallet</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(8).fill(0).map((_,i)=>(
                    <tr key={i}>
                      <td><div style={{display:'flex',alignItems:'center',gap:8}}><Sk w={30} h={30} r={9}/><div><Sk w={110} h={12} r={4}/><Sk w={60} h={9} r={4} s={{marginTop:5}}/></div></div></td>
                      <td><Sk w={120} h={12} r={4}/></td>
                      <td><Sk w={120} h={12} r={4}/></td>
                      <td><Sk w={80} h={16} r={4}/></td>
                      <td><Sk w={72} h={22} r={20}/></td>
                      <td><Sk w={90} h={12} r={4}/></td>
                      <td><Sk w={58} h={30} r={20}/></td>
                    </tr>
                  ))
                : paged.map((t,idx)=>{
                    const tc      = getTC(t.type);
                    const credit  = isCredit(t.type);
                    const txId    = t._id||'—';
                    const sender  = t.senderWallet||'—';
                    const recvr   = t.receiverWallet||'—';
                    const amt     = Math.abs(t.amount??0);
                    const ds      = t.createdAt||'';
                    const fmt     = ds ? new Date(ds).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
                    return (
                      <tr key={txId+idx} className="txn-row" style={{animationName:'rowIn',animationDuration:'0.35s',animationTimingFunction:'ease',animationFillMode:'both',animationDelay:`${idx*0.05}s`}}>
                        {/* Transaction ID */}
                        <td>
                          <div style={{display:'flex',alignItems:'center',gap:9}}>
                            <div className="txn-icon" style={{width:32,height:32,borderRadius:10,background:tc.grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#fff',fontWeight:900,flexShrink:0,boxShadow:`0 2px 8px ${tc.glow}`}}>
                              {tc.icon}
                            </div>
                            <div>
                              <span className="mono" style={{fontSize:12.5,fontWeight:700,color:'var(--navy)',maxWidth:120}}>#{String(txId).slice(-10)}</span>
                              <span style={{display:'block',fontSize:10.5,color:'var(--gray-400)',fontWeight:500,marginTop:1,textTransform:'capitalize'}}>{tc.label}</span>
                            </div>
                          </div>
                        </td>
                        {/* Sender Wallet */}
                        <td>
                          <span className="mono" style={{fontSize:12,color:'var(--gray-600)',maxWidth:140}} title={sender}>
                            {sender==='—'?'—':sender.slice(0,10)+'…'+sender.slice(-6)}
                          </span>
                        </td>
                        {/* Receiver Wallet */}
                        <td>
                          <span className="mono" style={{fontSize:12,color:'var(--gray-600)',maxWidth:140}} title={recvr}>
                            {recvr==='—'?'—':recvr.slice(0,10)+'…'+recvr.slice(-6)}
                          </span>
                        </td>
                        {/* Amount */}
                        <td>
                          <div style={{display:'flex',alignItems:'center'}}>
                            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:800,color:credit?'#059669':'#DC2626'}}>{credit?'+':'-'}{amt.toLocaleString()}</span>
                            <span className="pyo-tag">PYO</span>
                          </div>
                        </td>
                        {/* Status */}
                        <td><SBadge s={t.status}/></td>
                        {/* Date */}
                        <td style={{color:'var(--gray-400)',fontSize:12.5,whiteSpace:'nowrap'}}>{fmt}</td>
                        {/* Action — ONLY this opens modal */}
                        <td>
                          <button className="view-btn" onClick={e=>{e.stopPropagation();setSel(t);}}>View</button>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
          {!loading && paged.length===0 && (
            <div className="empty">
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <div style={{fontWeight:700,color:'var(--navy)',fontSize:15,marginBottom:5}}>No transactions found</div>
              <div style={{fontSize:13}}>Try adjusting your filters or search query.</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="pagination">
            <div className="pag-info">Showing {Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)} of {filtered.length} transactions</div>
            <div className="pag-btns">
              <button className="pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
              {Array.from({length:totalPages},(_,i)=>(
                <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
              ))}
              <button className="pag-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
            </div>
          </div>
        )}
      </div>

      {sel && <TxnModal txn={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}
