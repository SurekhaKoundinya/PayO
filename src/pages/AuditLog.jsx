import { useState } from 'react';
import { auditLogs } from '../data/mockData';

const cfg={approve:{bg:'#F0FDF4',e:'✅'},reject:{bg:'#FEF2F2',e:'❌'},info:{bg:'#EFF6FF',e:'ℹ️'}};

export default function AuditLog(){
  const [logs]=useState(auditLogs);
  const [filter,setFilter]=useState('All');
  const [search,setSearch]=useState('');

  const counts={All:logs.length,approve:logs.filter(l=>l.type==='approve').length,reject:logs.filter(l=>l.type==='reject').length,info:logs.filter(l=>l.type==='info').length};

  const filtered=logs.filter(l=>{
    const mf=filter==='All'||l.type===filter;
    const ms=!search||l.action.toLowerCase().includes(search.toLowerCase())||l.user.toLowerCase().includes(search.toLowerCase())||l.admin.toLowerCase().includes(search.toLowerCase());
    return mf&&ms;
  });

  return(
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Audit Log</h2><p>Complete history of all admin actions and system events.</p></div>
        <button className="btn btn-outline" onClick={()=>window.print()}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Export
        </button>
      </div>

      <div className="chip-row">
        {[['All',counts.All],['approve',counts.approve],['reject',counts.reject],['info',counts.info]].map(([f,c])=>(
          <div key={f} className={`chip${filter===f?' act':''}`} onClick={()=>setFilter(f)}>
            {f==='All'?'📋':cfg[f]?.e} {f==='All'?'All':f[0].toUpperCase()+f.slice(1)}<span className="chip-count">{c}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search actions, users, admins..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="filter-count">{filtered.length} records</div>
        </div>

        <div>
          {filtered.map((log,i)=>{
            const c=cfg[log.type]||cfg.info;
            return(
              <div className="audit-item" key={log.id}>
                <div className="audit-icon" style={{background:c.bg}}>{c.e}</div>
                <div style={{flex:1}}>
                  <div className="audit-act">{log.action}</div>
                  <div className="audit-meta">User: <strong>{log.user}</strong> · Admin: <strong>{log.admin}</strong> · {log.details}</div>
                </div>
                <div className="audit-time">{log.timestamp}</div>
              </div>
            );
          })}
          {filtered.length===0&&<div className="empty">No audit records found.</div>}
        </div>
      </div>
    </div>
  );
}
