import { useNavigate } from 'react-router-dom';
import { kycRequests, notifications } from '../data/mockData';

function DonutChart() {
  const total = 11230, approved = 10850, pending = 245, rejected = 135;
  const r = 68, cx = 88, cy = 88, sw = 18;
  const c = 2 * Math.PI * r;
  const aPct = approved / total;
  const pPct = pending / total;
  return (
    <div className="donut-wrap">
      <div style={{ position:'relative', display:'inline-block' }}>
        <svg width="176" height="176" viewBox="0 0 176 176">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEE2E2" strokeWidth={sw}/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEF3C7" strokeWidth={sw}
            strokeDasharray={`${(aPct+pPct)*c} ${c}`}
            strokeDashoffset={-aPct*c} strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth={sw}
            strokeDasharray={`${aPct*c} ${c}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}/>
        </svg>
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center' }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:21,fontWeight:800,color:'var(--navy)' }}>92.4%</div>
          <div style={{ fontSize:10,color:'var(--gray-400)',fontWeight:600 }}>Success Rate</div>
        </div>
      </div>
      <div className="donut-legend">
        {[['#10B981','Approved','10,850 (92.4%)'],['#F59E0B','Pending','245 (4.2%)'],['#EF4444','Rejected','135 (3.4%)']].map(([c,l,v])=>(
          <div className="legend-row" key={l}>
            <div className="l-label"><div className="l-dot" style={{background:c}}/>{l}</div>
            <div className="l-val">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusBadge = s => {
  const m = { Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed' };
  return <span className={`badge ${m[s]||'b-pending'}`}>{s}</span>;
};

const actIcon = t => {
  if(t==='kyc_approved') return { bg:'#F0FDF4', e:'✅' };
  if(t==='kyc_rejected') return { bg:'#FEF2F2', e:'❌' };
  if(t==='system')       return { bg:'#FFFBEB', e:'⚠️' };
  return { bg:'#EFF6FF', e:'🔔' };
};

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { label:'Total Users',   value:'12,450', change:'+12.5%', up:true,  bg:'#EFF6FF', emoji:'👥' },
    { label:'Pending KYC',   value:'245',    change:'+8.3%',  up:true,  bg:'#FFFBEB', emoji:'⏳' },
    { label:'Approved KYC',  value:'10,850', change:'+14.6%', up:true,  bg:'#F0FDF4', emoji:'✅' },
    { label:'Rejected KYC',  value:'135',    change:'-3.2%',  up:false, bg:'#FEF2F2', emoji:'❌' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Dashboard</h2>
          <p>Welcome back, Admin! Here's what's happening with PayO KYC today.</p>
        </div>
        <button className="btn btn-primary" onClick={()=>navigate('/kyc')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          Review KYC
        </button>
      </div>

      <div className="stats-row">
        {stats.map(s=>(
          <div className="stat-card" key={s.label}>
            <div className="stat-top">
              <div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className={`stat-change ${s.up?'up':'down'}`}>{s.up?'↑':'↓'} {s.change} this month</div>
              </div>
              <div className="stat-icon" style={{background:s.bg,fontSize:22}}>{s.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <h3>Recent KYC Requests</h3>
            <button className="btn btn-outline" style={{fontSize:12,padding:'5px 12px'}} onClick={()=>navigate('/kyc')}>View All</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>User</th><th>Document</th><th>Submitted</th><th>Status</th></tr></thead>
              <tbody>
                {kycRequests.slice(0,7).map(r=>(
                  <tr key={r.id} style={{cursor:'pointer'}} onClick={()=>navigate('/kyc')}>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" style={{background:r.color}}>{r.initials}</div>
                        <div><div className="uname">{r.name}</div><div className="uid">{r.id}</div></div>
                      </div>
                    </td>
                    <td><span className="doc-badge">📄 {r.document}</span></td>
                    <td style={{color:'var(--gray-400)',fontSize:13}}>{r.submitted}</td>
                    <td>{statusBadge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right-col">
          <div className="card">
            <div className="card-header"><h3>KYC Overview</h3></div>
            <DonutChart/>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <button className="btn btn-outline" style={{fontSize:12,padding:'5px 12px'}} onClick={()=>navigate('/notifications')}>View All</button>
            </div>
            <div className="act-list">
              {notifications.slice(0,4).map(n=>{
                const ic=actIcon(n.type);
                return(
                  <div className="act-item" key={n.id}>
                    <div className="act-icon" style={{background:ic.bg}}>{ic.e}</div>
                    <div style={{flex:1}}>
                      <div className="act-title">{n.title}</div>
                      <div className="act-desc">{n.message}</div>
                    </div>
                    <div className="act-time">{n.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
