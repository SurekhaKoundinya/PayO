import { useState, useContext, useEffect } from 'react';
import { AppCtx } from '../App';
import { wallets as init } from '../data/mockData';
import { SkeletonTable } from '../components/Skeleton';

function TxnRow({ txn }) {
  const isSent = txn.type === 'Sent';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:'1px solid var(--gray-100)' }}>
      <div style={{ width:34, height:34, borderRadius:10, flexShrink:0, background:isSent?'#FEF2F2':'#F0FDF4', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
        {isSent ? '↗️' : '↙️'}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--navy)' }}>{isSent ? `Sent to ${txn.to}` : `Received from ${txn.from}`}</div>
        <div style={{ fontSize:11.5, color:'var(--gray-400)', marginTop:1 }}>{txn.note} · {txn.date}</div>
      </div>
      <div style={{ fontWeight:700, fontSize:14, color:isSent?'var(--red)':'var(--green)', whiteSpace:'nowrap' }}>
        {isSent?'−':'+'} {txn.amount} PYO
      </div>
    </div>
  );
}

function WalletModal({ w, onClose, onToggle }) {
  if (!w) return null;
  const isActive = w.status === 'Active';
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{ maxWidth:520 }}>
        <div className="modal-head">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div className="avatar" style={{ background:w.color, width:42, height:42, borderRadius:11, fontSize:15 }}>{w.initials}</div>
            <div><h3>{w.user}</h3><div style={{ fontSize:12, color:'var(--gray-400)', marginTop:1 }}>{w.id} · {w.userId}</div></div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div style={{ background:isActive?'linear-gradient(135deg,#0D1B3E,#1E3A6E)':'linear-gradient(135deg,#374151,#4B5563)', borderRadius:14, padding:'22px 24px', marginBottom:20, color:'#fff', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
            <div style={{ fontSize:11, fontWeight:600, opacity:0.6, letterSpacing:'1px', textTransform:'uppercase', marginBottom:6 }}>PYO Token Balance</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:700, letterSpacing:'-1px' }}>
              {w.tokens.toLocaleString()} <span style={{ fontSize:18, opacity:0.7 }}>PYO</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:16, opacity:0.65, fontSize:12 }}>
              <span>{w.id}</span>
              <span style={{ background:isActive?'rgba(16,185,129,0.25)':'rgba(239,68,68,0.25)', padding:'2px 10px', borderRadius:20, color:isActive?'#6EE7B7':'#FCA5A5', fontWeight:600 }}>
                {isActive ? '● Active' : '● Deactivated'}
              </span>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20 }}>
            {[['Total',w.transactions.length],['Sent',w.transactions.filter(t=>t.type==='Sent').length],['Received',w.transactions.filter(t=>t.type==='Received').length]].map(([l,v])=>(
              <div key={l} style={{ background:'var(--gray-100)', borderRadius:10, padding:'12px', textAlign:'center' }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:700, color:'var(--navy)' }}>{v}</div>
                <div style={{ fontSize:11, color:'var(--gray-400)', fontWeight:500, marginTop:2 }}>{l} Transactions</div>
              </div>
            ))}
          </div>
          <div className="section-title">Transaction History</div>
          {w.transactions.length === 0
            ? <div style={{ textAlign:'center', padding:24, color:'var(--gray-400)', fontSize:13 }}>No transactions yet</div>
            : w.transactions.map(txn => <TxnRow key={txn.id} txn={txn}/>)
          }
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className={`btn ${isActive?'btn-danger':'btn-success'}`} onClick={()=>{onToggle(w.id);onClose();}}>
            {isActive ? '🔒 Deactivate Wallet' : '🔓 Activate Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Wallets() {
  const { confirm }           = useContext(AppCtx);
  const [wallets, setWallets] = useState(init);
  const [sel, setSel]         = useState(null);
  const [tab, setTab]         = useState('active');
  const [search, setSearch]   = useState('');
  const [loading, setLoading] = useState(true);

  // Transaction filters
  const [txnSearch, setTxnSearch] = useState('');
  const [txnDate, setTxnDate]     = useState('all');

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  const toggle = id => {
    const wallet = wallets.find(w => w.id===id);
    const isActive = wallet?.status === 'Active';
    confirm({
      title: isActive ? 'Deactivate Wallet' : 'Activate Wallet',
      message: isActive
        ? `Deactivate ${wallet?.user}'s wallet? They won't be able to send or receive PYO tokens.`
        : `Activate ${wallet?.user}'s wallet? They can send and receive PYO tokens immediately.`,
      confirmLabel: isActive ? '🔒 Deactivate' : '🔓 Activate',
      cancelLabel: 'Cancel',
      type: isActive ? 'danger' : 'success',
    }, () => setWallets(p => p.map(w => w.id===id ? {...w, status: w.status==='Active'?'Deactivated':'Active'} : w)));
  };

  const active      = wallets.filter(w => w.status === 'Active');
  const deactivated = wallets.filter(w => w.status === 'Deactivated');
  const list        = (tab==='active' ? active : deactivated).filter(w =>
    !search || w.user.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())
  );

  // All transactions with search + date filter
  const allTxnsRaw = wallets
    .flatMap(w => w.transactions.map(t => ({...t, walletUser:w.user, walletId:w.id, color:w.color, initials:w.initials})))
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  const allTxns = allTxnsRaw.filter(t => {
    const matchSearch = !txnSearch
      || t.walletUser.toLowerCase().includes(txnSearch.toLowerCase())
      || t.walletId.toLowerCase().includes(txnSearch.toLowerCase())
      || (t.to||'').toLowerCase().includes(txnSearch.toLowerCase())
      || (t.from||'').toLowerCase().includes(txnSearch.toLowerCase())
      || t.note.toLowerCase().includes(txnSearch.toLowerCase());
    const d = t.date.toLowerCase();
    const matchDate =
      txnDate==='all'      ? true :
      txnDate==='may24'    ? d.includes('24 may') :
      txnDate==='may23'    ? d.includes('23 may') :
      txnDate==='may22'    ? d.includes('22 may') :
      txnDate==='sent'     ? t.type==='Sent' :
      txnDate==='received' ? t.type==='Received' : true;
    return matchSearch && matchDate;
  }).slice(0, 12);

  return (
    <div className="page">
      <div className="page-header"><div className="page-header-left"><h2>Wallets</h2><p>Monitor PayO token wallets and transaction activity.</p></div></div>

      {/* Summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:22 }}>
        {[
          {label:'Active Wallets',      value:active.length,      bg:'#F0FDF4', e:'✅'},
          {label:'Deactivated Wallets', value:deactivated.length, bg:'#FEF2F2', e:'🔒'},
          {label:'Total Transactions',  value:wallets.reduce((a,w)=>a+w.transactions.length,0), bg:'#EFF6FF', e:'🔄'},
        ].map(s=>(
          <div className="stat-card" key={s.label}>
            <div className="stat-top">
              <div><div className="stat-label">{s.label}</div><div className="stat-value" style={{fontSize:26}}>{s.value}</div></div>
              <div className="stat-icon" style={{background:s.bg,fontSize:22}}>{s.e}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:20 }}>
        {/* Wallet list */}
        <div className="card">
          <div style={{ display:'flex', borderBottom:'1px solid var(--gray-200)' }}>
            {[['active','Active','#059669'],['deactivated','Deactivated','#DC2626']].map(([k,l,c])=>(
              <button key={k} onClick={()=>setTab(k)} style={{ padding:'13px 20px', border:'none', background:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', fontSize:13.5, fontWeight:tab===k?600:500, color:tab===k?c:'var(--gray-400)', borderBottom:tab===k?`2px solid ${c}`:'2px solid transparent', transition:'all 0.18s' }}>
                {l} &nbsp;
                <span style={{ background:tab===k?c+'22':'var(--gray-100)', color:tab===k?c:'var(--gray-400)', borderRadius:20, padding:'1px 7px', fontSize:11, fontWeight:700 }}>
                  {k==='active'?active.length:deactivated.length}
                </span>
              </button>
            ))}
            <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'0 14px' }}>
              <div className="search-field" style={{ maxWidth:200 }}>
                <svg width="13" height="13" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className="table-wrap">
            {loading
              ? <SkeletonTable rows={4} cols={5}/>
              : <table>
                  <thead><tr><th>User</th><th>Wallet ID</th><th>Token Balance</th><th>Transactions</th><th>Actions</th></tr></thead>
                  <tbody>
                    {list.map(w => (
                      <tr key={w.id}>
                        <td><div className="user-cell"><div className="avatar" style={{background:w.color}}>{w.initials}</div><div><div className="uname">{w.user}</div><div className="uid">{w.userId}</div></div></div></td>
                        <td style={{fontSize:12.5,color:'var(--gray-600)',fontFamily:'monospace'}}>{w.id}</td>
                        <td>
                          <div style={{display:'flex',alignItems:'center',gap:6}}>
                            <span style={{fontWeight:700,fontSize:15,color:w.tokens>0?'var(--navy)':'var(--gray-400)'}}>{w.tokens.toLocaleString()}</span>
                            <span style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',background:'var(--gray-100)',padding:'1px 6px',borderRadius:6}}>PYO</span>
                          </div>
                        </td>
                        <td style={{fontWeight:600,color:'var(--navy)'}}>{w.transactions.length}</td>
                        <td>
                          <div className="act-group">
                            <button className="btn btn-outline" style={{fontSize:12,padding:'5px 11px'}} onClick={()=>setSel(w)}>View</button>
                            <button className={`btn ${w.status==='Active'?'btn-danger':'btn-success'}`} style={{fontSize:12,padding:'5px 11px'}} onClick={()=>toggle(w.id)}>
                              {w.status==='Active'?'🔒 Deactivate':'🔓 Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            }
            {!loading && list.length===0 && <div className="empty">No {tab} wallets found.</div>}
          </div>
        </div>

        {/* Recent Transactions Panel */}
        <div className="card" style={{ alignSelf:'start' }}>
          <div className="card-header" style={{flexDirection:'column',alignItems:'stretch',gap:10,padding:'16px 20px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h3>Recent Transactions</h3>
              <span style={{fontSize:12,color:'var(--gray-400)',fontWeight:500}}>{allTxns.length} results</span>
            </div>
            <div className="search-field" style={{maxWidth:'100%'}}>
              <svg width="13" height="13" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search by wallet, user, note..." value={txnSearch} onChange={e=>setTxnSearch(e.target.value)}/>
            </div>
            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
              {[['all','All'],['sent','Sent ↗'],['received','Received ↙'],['may24','24 May'],['may23','23 May'],['may22','22 May']].map(([v,l])=>(
                <button key={v} onClick={()=>setTxnDate(v)}
                  style={{padding:'4px 10px',borderRadius:20,border:'1.5px solid',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:"'Inter',sans-serif",transition:'all 0.15s',
                    borderColor:txnDate===v?'var(--blue)':'var(--gray-200)',
                    background:txnDate===v?'var(--blue)':'transparent',
                    color:txnDate===v?'#fff':'var(--gray-400)',
                  }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{padding:'4px 20px 16px'}}>
            {allTxns.length===0
              ? <div className="empty">No transactions match your filters.</div>
              : allTxns.map(txn=>(
                <div key={txn.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid var(--gray-100)'}}>
                  <div style={{width:32,height:32,borderRadius:9,flexShrink:0,background:txn.type==='Sent'?'#FEF2F2':'#F0FDF4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
                    {txn.type==='Sent'?'↗️':'↙️'}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12.5,fontWeight:600,color:'var(--navy)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{txn.walletUser}</div>
                    <div style={{fontSize:11,color:'var(--gray-400)'}}>{txn.type==='Sent'?`→ ${txn.to}`:`← ${txn.from}`}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:13,fontWeight:700,color:txn.type==='Sent'?'var(--red)':'var(--green)'}}>{txn.type==='Sent'?'−':'+'} {txn.amount} PYO</div>
                    <div style={{fontSize:10.5,color:'var(--gray-400)'}}>{txn.date.split(',')[0]}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {sel && <WalletModal w={sel} onClose={()=>setSel(null)} onToggle={toggle}/>}
    </div>
  );
}
