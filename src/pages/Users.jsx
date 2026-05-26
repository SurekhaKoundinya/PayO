import { useState } from 'react';
import { users as init } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const sMap={Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed'};
const Badge=({s})=><span className={`badge ${sMap[s]||'b-pending'}`}>{s}</span>;

function UserModal({u,onClose}){
  if(!u)return null;
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:460}}>
        <div className="modal-head"><h3>User Profile</h3>
          <button className="btn btn-ghost icon-btn" onClick={onClose}><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
        <div className="modal-body">
          <div style={{textAlign:'center',marginBottom:22}}>
            <div style={{width:70,height:70,borderRadius:18,background:u.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:'#fff',margin:'0 auto 10px'}}>{u.initials}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:'var(--navy)'}}>{u.name}</div>
            <div style={{fontSize:13,color:'var(--gray-400)',marginTop:2}}>{u.id}</div>
            <div style={{marginTop:8}}><Badge s={u.kyc}/></div>
          </div>
          <div className="detail-grid">
            {[['Email',u.email],['Phone',u.phone],['KYC Status',u.kyc],['Wallet Balance',u.wallet],['Joined',u.joined]].map(([l,v])=>(
              <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
            ))}
          </div>
        </div>
        <div className="modal-foot"><button className="btn btn-outline" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default function Users(){
  const [users]=useState(init);
  const [search,setSearch]=useState('');
  const [fKYC,setFKYC]=useState('All');
  const [sel,setSel]=useState(null);
  const [page,setPage]=useState(1);
  const navigate=useNavigate();
  const per=8;

  const filtered=users.filter(u=>{
    const mk=fKYC==='All'||u.kyc===fKYC;
    const ms=!search||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())||u.id.toLowerCase().includes(search.toLowerCase());
    return mk&&ms;
  });
  const tp=Math.max(1,Math.ceil(filtered.length/per));
  const paged=filtered.slice((page-1)*per,page*per);

  return(
    <div className="page">
      <div className="page-header">
        <div className="page-header-left"><h2>Users</h2><p>Manage all registered PayO users.</p></div>
        <div style={{display:'flex',gap:10}}>
          {[['12,450','Total'],['10,850','Verified'],['245','Pending']].map(([v,l])=>(
            <div key={l} style={{background:'#fff',border:'1.5px solid var(--gray-200)',borderRadius:10,padding:'9px 16px',textAlign:'center'}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:800,color:'var(--navy)'}}>{v}</div>
              <div style={{fontSize:11,color:'var(--gray-400)',fontWeight:600}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name, email or ID..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/>
          </div>
          <select className="filter-select" value={fKYC} onChange={e=>{setFKYC(e.target.value);setPage(1);}}>
            {['All','Pending','In Review','Approved','Failed'].map(s=><option key={s}>{s}</option>)}
          </select>
          <div className="filter-count">{filtered.length} users</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Email</th><th>Phone</th><th>KYC</th><th>Wallet</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {paged.map(u=>(
                <tr key={u.id}>
                  <td><div className="user-cell"><div className="avatar" style={{background:u.color}}>{u.initials}</div><div><div className="uname">{u.name}</div><div className="uid">{u.id}</div></div></div></td>
                  <td style={{fontSize:13,color:'var(--gray-600)'}}>{u.email}</td>
                  <td style={{fontSize:13,color:'var(--gray-600)'}}>{u.phone}</td>
                  <td><Badge s={u.kyc}/></td>
                  <td style={{fontWeight:600,color:u.wallet==='₹0'?'var(--gray-400)':'var(--green)'}}>{u.wallet}</td>
                  <td style={{fontSize:13,color:'var(--gray-400)'}}>{u.joined}</td>
                  <td>
                    <div className="act-group">
                      <button className="btn btn-outline" style={{fontSize:12,padding:'5px 11px'}} onClick={()=>setSel(u)}>View</button>
                      {(u.kyc==='Pending'||u.kyc==='In Review')&&<button className="btn btn-outline" style={{fontSize:12,padding:'5px 11px'}} onClick={()=>navigate('/kyc')}>KYC</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paged.length===0&&<div className="empty">No users found.</div>}
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
      {sel&&<UserModal u={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}
