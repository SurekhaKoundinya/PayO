import { useState } from 'react';
import { notifications as init } from '../data/mockData';

const tCfg={kyc_request:{bg:'#EFF6FF',e:'🔔'},kyc_approved:{bg:'#F0FDF4',e:'✅'},kyc_rejected:{bg:'#FEF2F2',e:'❌'},system:{bg:'#FFFBEB',e:'⚠️'}};

export default function Notifications(){
  const [notifs,setNotifs]=useState(init);
  const [filter,setFilter]=useState('All');

  const unread=notifs.filter(n=>!n.read).length;
  const markAll=()=>setNotifs(p=>p.map(n=>({...n,read:true})));
  const markOne=id=>setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));
  const del=id=>setNotifs(p=>p.filter(n=>n.id!==id));

  const filtered=notifs.filter(n=>{
    if(filter==='Unread')return!n.read;
    if(filter==='Read')return n.read;
    if(filter==='KYC')return n.type.startsWith('kyc');
    if(filter==='System')return n.type==='system';
    return true;
  });

  return(
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Notifications</h2><p>{unread} unread notification{unread!==1?'s':''}.</p></div>
        {unread>0&&<button className="btn btn-outline" onClick={markAll}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          Mark All Read
        </button>}
      </div>

      <div className="notif-tabs">
        {['All','Unread','Read','KYC','System'].map(t=>(
          <button key={t} className={`ntab${filter===t?' act':''}`} onClick={()=>setFilter(t)}>
            {t}{t==='Unread'&&unread>0?` (${unread})`:''}
          </button>
        ))}
      </div>

      <div className="card">
        {filtered.length===0?<div className="empty">No notifications here.</div>:(
          <div>
            {filtered.map(n=>{
              const c=tCfg[n.type]||tCfg.system;
              return(
                <div key={n.id} className={`notif-item${!n.read?' unread':''}`} onClick={()=>markOne(n.id)}>
                  <div className="notif-icon" style={{background:c.bg}}>{c.e}</div>
                  <div style={{flex:1}}>
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-msg">{n.message}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                    {!n.read&&<div className="unread-dot"/>}
                    <button className="btn btn-ghost icon-btn" style={{width:28,height:28}} onClick={e=>{e.stopPropagation();del(n.id);}}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
